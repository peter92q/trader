using System.Text.Json.Serialization;

public class InvestedDto
{
    public decimal Balance {get; set;}
    public int Id {get; set;}
    public int InvestedAmount { get; set; }
    public int Leverage {get; set;}
    public decimal InvestedPrice { get; set; }
    public string CryptoType { get; set; }
    public string PurchaseDateTime { get; set; }

    public Boolean IsTradeActive {get; set;}
}
