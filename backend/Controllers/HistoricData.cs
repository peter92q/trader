
using Microsoft.AspNetCore.Mvc;
using System.Text.Json;
using System.Text.Json.Serialization;

[ApiController]
[Route("api/[controller]")]
public class HistoricDataController : ControllerBase
{
    private const string BaseUrl = "https://api.coingecko.com/api/v3";

[HttpGet]
public ActionResult<List<ChartDataPoint>> GetHistoricData(string interval, string currency)
{
    string days;
    
    switch (interval.ToLower())
    {    
        case "1d":
            days = "1";
            break;
        case "7d":
            days = "7";
            break;
        case "30d":
            days = "30";
            break;
        case "1y":
            days = "365";
            break;
        default:
            return BadRequest("Invalid interval");
    }

    string url = $"{BaseUrl}/coins/{currency.ToLower()}/market_chart?vs_currency=usd&days={days}";

    using (HttpClient client = new HttpClient())
    {
        HttpResponseMessage response = client.GetAsync(url).Result;
        if (response.IsSuccessStatusCode)
        {
            var content = response.Content.ReadAsStringAsync().Result;
            var data = JsonSerializer.Deserialize<ChartDataResponse>(content);
            var chartData = data.Prices.Select(p => new ChartDataPoint
            {
                Timestamp = DateTimeOffset.FromUnixTimeMilliseconds((long)p[0]).UtcDateTime,
                Price = p[1]
            }).ToList();
            return Ok(chartData);
        }
        else
        {
            return StatusCode(500);
        }
    }
}

}

public class ChartDataResponse
{
    [JsonPropertyName("prices")]
    public List<List<decimal>> Prices { get; set; }
}

public class ChartDataPoint
{
    public DateTime Timestamp { get; set; }
    public decimal Price { get; set; }
}

