using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("api/[controller]")]
public class CoinGeckoController : ControllerBase
{
    private readonly HttpClient _httpClient;
    private readonly CoingeckoService _coingeckoService;
    public CoinGeckoController(CoingeckoService coingeckoService)
    {
        _httpClient = new HttpClient();
        _coingeckoService = coingeckoService;
    }

    [HttpGet("crypto-data")]
    public async Task<ActionResult<CoinGeckoCryptoData>> GetCryptoData(string symbol)
    {
        try
        {
            var cryptoData = await _coingeckoService.GetCryptoData(symbol);
            return cryptoData;
        }
        catch (Exception ex)
        {
            return StatusCode(500, ex.Message);
        }
    }
}

