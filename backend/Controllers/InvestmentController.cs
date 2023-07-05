using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

[ApiController]
[Route("api/[controller]")]
public class InvestmentController : ControllerBase
{
    private readonly UserManager<User> _userManager;
    private readonly MyDbContext _context;
    private readonly CoingeckoService _coingeckoService;
    public InvestmentController(UserManager<User> userManager, MyDbContext context, 
        CoingeckoService coingeckoService)
    {   
        _context = context;
        _userManager = userManager;
        _coingeckoService = coingeckoService;
    }

    [HttpPost("investInCrypto")]
    public async Task<ActionResult> InvestInCrypto(InvestDto investDto) 
    {  
        var user = await _userManager.FindByNameAsync(User.Identity.Name);

        if (user == null)  
        {
            return Unauthorized();
        }
        if (investDto.InvestedAmount > user.Balance)
        {
            throw new Exception("Insufficient funds");
        }

        user.Balance -= investDto.InvestedAmount; 
        
        var cryptoPurchase = new CryptoPurchase 
        {
            CryptoType = investDto.CryptoType,
            InvestedAmount = investDto.InvestedAmount,
            Leverage = investDto.Leverage,
            InvestedPrice = investDto.InvestedPrice,
            PurchaseDateTime = DateTime.Now.ToUniversalTime()
        }; 

        user.CryptoPurchases.Add(cryptoPurchase);

        await _context.SaveChangesAsync();
        
        return Ok(new  
        {
            Balance = user.Balance,
            Id = cryptoPurchase.Id,
            InvestedAmount = cryptoPurchase.InvestedAmount,
            Leverage = cryptoPurchase.Leverage,
            CryptoType = cryptoPurchase.CryptoType,
            InvestedPrice = cryptoPurchase.InvestedPrice,
            PurchaseDateTime = cryptoPurchase.PurchaseDateTime.ToString("yyyy-MM-dd HH:mm:ss")
        });
    }  

    [HttpPost("closeCryptoTrade")] 
    public async Task<IActionResult> CloseCryptoTrade(CloseTradeDto closeTradeDto)
    {   
        var user = await _userManager.Users
            .Include(u => u.CryptoPurchases)
            .FirstOrDefaultAsync(u => u.UserName == User.Identity.Name);
        if (user == null)
        {
            return Unauthorized();
        }

        var cryptoPurchase = user.CryptoPurchases.FirstOrDefault(p => p.Id == closeTradeDto.Id);
        if (cryptoPurchase == null || !cryptoPurchase.IsTradeActive)
        {
            return NotFound("Crypto purchase not found or closed");
        } 

        var newPrice = await _coingeckoService.GetCryptoData(closeTradeDto.CryptoType);
        var currentCryptoPrice= newPrice.Price;

        try
        { 
            var leveragedPrice = cryptoPurchase.InvestedAmount * cryptoPurchase.Leverage;
            var priceChange = currentCryptoPrice - cryptoPurchase.InvestedPrice;
            var estGainsOrLosses = priceChange / cryptoPurchase.InvestedPrice;
            var gainsOrLosses =  leveragedPrice * estGainsOrLosses;
            if(gainsOrLosses >0){
                user.Balance += cryptoPurchase.InvestedAmount + gainsOrLosses;
                cryptoPurchase.TradeClosedAt = currentCryptoPrice;
                cryptoPurchase.GainsLosses = gainsOrLosses;
                cryptoPurchase.IsTradeActive = false; 
            }
            else{
                user.Balance -= -gainsOrLosses;
                user.Balance += cryptoPurchase.InvestedAmount;
                cryptoPurchase.TradeClosedAt = currentCryptoPrice;
                cryptoPurchase.GainsLosses = gainsOrLosses;
                cryptoPurchase.IsTradeActive = false;  
            }

            await _context.SaveChangesAsync();

            return Ok(new
            {
                Balance = user.Balance,
                GainsLosses = gainsOrLosses,
                TradeClosedAt = currentCryptoPrice
            });
        }
        catch (Exception ex)
        {
            return StatusCode(500, ex.Message);
        }
    }
    
    [HttpPost("getAllTrades")]
    public async Task<ActionResult> GetAllTrades(TradesDto tradeDto)
    {
        string openedOrClosed = tradeDto.OpenedOrClosed;
        var user = await _userManager.Users
            .Include(u => u.CryptoPurchases)
            .FirstOrDefaultAsync(u => u.UserName == User.Identity.Name);

        if (user == null)
        {
            return Unauthorized();
        }

        var tradesQuery = user.CryptoPurchases
            .Where(p => p.CryptoType == tradeDto.CryptoType);

        var currentPriceData = await _coingeckoService.GetCryptoData(tradeDto.CryptoType);
        var currentPrice = currentPriceData.Price;

        var trades = tradesQuery.Select(async p =>
        {
            var leveragedAmount = p.Leverage * p.InvestedAmount;
            var checkPriceDrop = currentPrice - p.InvestedPrice;
            var estLosses = checkPriceDrop / p.InvestedPrice;
            var gainsOrLosses = leveragedAmount * estLosses;
            if (gainsOrLosses <= -p.InvestedAmount)
            {
                p.IsTradeActive = false;
                p.TradeClosedAt = currentPrice;
                p.GainsLosses = -p.InvestedAmount;
                await _context.SaveChangesAsync();
            }

            return new
            {
                Id = p.Id,
                InvestedAmount = p.InvestedAmount,
                InvestedPrice = p.InvestedPrice,
                Leverage = p.Leverage,
                TradeClosedAt = p.TradeClosedAt,
                CryptoType = p.CryptoType,
                IsTradeActive = p.IsTradeActive,
                PurchaseDateTime = p.PurchaseDateTime.ToString("yyyy-MM-dd HH:mm:ss"),
                GainsOrLosses = gainsOrLosses  
            };
        });

        var tradeResults = await Task.WhenAll(trades);
        var filteredTradeResults = tradeResults.Where(t => openedOrClosed == "opened" ? t.IsTradeActive : !t.IsTradeActive);

        return Ok(filteredTradeResults);
    }


    //for the pie chart
    [HttpGet("purchases")]
    public async Task<IActionResult> GetUserPurchases()
    {
        var user = await _userManager.Users
        .Include(u => u.CryptoPurchases)
        .FirstOrDefaultAsync(u => u.UserName == User.Identity.Name);

        if (user == null)
        {
        return NotFound();
        }

        var purchases = user.CryptoPurchases
        .Where(p => p.IsTradeActive)
        .GroupBy(p => p.CryptoType)
        .Select(g => new { CryptoType = g.Key, TotalInvestedAmount = g.Sum(p => p.InvestedAmount) });

        return Ok(purchases);
    }
} 

