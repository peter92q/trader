using System.Text.Json;
public interface ICoinGeckoService
{
    Task<CoinGeckoCryptoData> GetCryptoData(string symbol);
}

public class CoingeckoService : ICoinGeckoService
{
    private readonly HttpClient _httpClient;

    public CoingeckoService()
    {
        _httpClient = new HttpClient();
    }
 
    public async Task<CoinGeckoCryptoData> GetCryptoData(string symbol)
    {
        string url = $"https://api.coingecko.com/api/v3/simple/price?ids={symbol}&vs_currencies=usd&include_market_cap=true&include_24hr_change=true&include_24hr_vol=true";
        HttpResponseMessage response = await _httpClient.GetAsync(url);

        if (response.IsSuccessStatusCode)
        {
            string jsonResponse = await response.Content.ReadAsStringAsync();
            var responseData = JsonSerializer.Deserialize<JsonElement>(jsonResponse);
            if (responseData.TryGetProperty(symbol, out var cryptoDataJson))
            {
                var cryptoData = new CoinGeckoCryptoData
                {
                    Symbol = symbol,
                    Price = cryptoDataJson.GetProperty("usd").GetDecimal(),
                    MarketCap = cryptoDataJson.GetProperty("usd_market_cap").GetDecimal(),
                    PriceChangePercentage = cryptoDataJson.GetProperty("usd_24h_change").GetDecimal(),
                    Volume24h = cryptoDataJson.GetProperty("usd_24h_vol").GetDecimal()
                };

                return cryptoData;
            }
            else
            {
                throw new Exception($"Cryptocurrency '{symbol}' not found.");
            }
        }

        throw new Exception($"API request failed with status code {response.StatusCode}");
    }
}

public class CoinGeckoCryptoData
{
    public string Symbol { get; set; }
    public decimal Price { get; set; }
    public decimal MarketCap { get; set; }
    public decimal PriceChangePercentage { get; set; }
    public decimal Volume24h { get; set; }
}
