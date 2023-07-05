using System.Text.Json;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

[ApiController]
[Route("api/equity")]
public class CryptoPriceController : ControllerBase
{
    private readonly HttpClient _httpClient;

    private readonly UserManager<User> _userManager;

    public CryptoPriceController(UserManager<User> userManager)
    {
        _httpClient = new HttpClient();
        _userManager = userManager;
    }

    [HttpGet]
    public async Task<ActionResult<Dictionary<string, decimal>>> GetPrices()
    {
        var user = await _userManager.Users
            .Include(u => u.CryptoPurchases)
            .FirstOrDefaultAsync(u => u.UserName == User.Identity.Name);
            
        var cryptoSymbols = new List<string> { "bitcoin", "ethereum", "cardano", "ripple", "binancecoin" };
        var cryptoPrices = new Dictionary<string, decimal>();
        var cryptoStats = new Dictionary<string, decimal>();
        try
        {
            var url = $"https://api.coingecko.com/api/v3/simple/price?ids={string.Join(",", cryptoSymbols)}&vs_currencies=usd&include_24hr_change=true";
            var response = await _httpClient.GetAsync(url);

            if (response.IsSuccessStatusCode)
            {
                var jsonResponse = await response.Content.ReadAsStringAsync();
                var responseData = JsonSerializer.Deserialize<Dictionary<string, Dictionary<string, decimal>>>(jsonResponse);

                foreach (var symbol in cryptoSymbols)
                {
                    if (responseData.TryGetValue(symbol, out var priceData) && priceData.TryGetValue("usd", out var price))
                    {
                        cryptoPrices[symbol] = price;

                        if (priceData.TryGetValue("usd_24h_change", out var change))
                        {
                            cryptoStats[symbol] = change;
                        }
                    }
                }

                decimal equity = user.Balance;

                foreach (var cryptoPurchase in user.CryptoPurchases.Where(p => p.IsTradeActive))
                {
                    if (cryptoPrices.TryGetValue(cryptoPurchase.CryptoType.ToLower(), out var currentPrice))
                    {
                        decimal leveragedPrice = cryptoPurchase.InvestedAmount * cryptoPurchase.Leverage;
                        decimal gainsOrLosses = leveragedPrice * ((currentPrice - cryptoPurchase.InvestedPrice) / cryptoPurchase.InvestedPrice);
                        equity += cryptoPurchase.InvestedAmount;
                        if(gainsOrLosses<0)
                        {
                          equity -= -gainsOrLosses;
                        }
                        else{
                          equity += gainsOrLosses;
                        }
                        
                    }
                }

                return Ok(new{
                    equity,
                    cryptoPrices,
                    cryptoStats,
                    user.Balance  
                });
                
            }
            else
            {
                return StatusCode((int)response.StatusCode, $"Failed to fetch crypto prices. Status Code: {response.StatusCode}");
            }
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"An error occurred while fetching crypto prices: {ex.Message}");
        }
    }
}
