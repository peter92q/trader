export interface TradeData
{
    Id: number;
    InvestedAmount: number;
    InvestedPrice: number;
    Leverage: number;
    TradeClosedAt: number;
    CurrentPrice: number;
    CryptoType: string;
    PurchaseDateTime: string;
    GainsOrLosses: number;
    IsTradeActive: boolean;
}