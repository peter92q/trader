using Microsoft.AspNetCore.Identity;

public class User : IdentityUser
{
    public decimal Balance { get; set; } = 1000;
    public List<CryptoPurchase> CryptoPurchases { get; set; } = new List<CryptoPurchase>();
}

public class CryptoPurchase
{   
    public int Id {get; set;}
    public string CryptoType { get; set; }
    public int InvestedAmount { get; set; }
    public int Leverage { get; set; }
    public decimal InvestedPrice { get; set; }
    public decimal TradeClosedAt { get; set; }
    public decimal GainsLosses { get; set; }
    public Boolean IsTradeActive { get; set; } = true;
    public DateTime PurchaseDateTime { get; set; }
}
