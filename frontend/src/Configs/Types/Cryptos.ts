interface Cryptos {
    bitcoin: number;
    ethereum: number;
    cardano: number;
    ripple: number;
    binancecoin: number;
  }
  
interface State {
    equity: string | null;
    cryptoPrices: Cryptos | null;
    percentageChange: Cryptos | null;
    balance: number | null;
  }