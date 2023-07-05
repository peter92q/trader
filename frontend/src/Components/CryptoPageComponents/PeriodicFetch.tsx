import axios from 'axios';
import { useState, useEffect } from 'react';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import BuyCrypto from './BuyCrypto';
import { TooltipMarketCap, TooltipVolume } from './Tooltip';

interface CryptoData {
  Symbol: string;
  Price: number;
  MarketCap: number;
  PriceChangePercentage: number;
  Volume24h: number;
}

export default function PeriodicFetch( {selectedCrypto}: {selectedCrypto: string} ) {
  const [crypto, setCrypto] = useState<CryptoData | null>(null);

  useEffect(() => {
    const fetchMarketData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5223/api/CoinGecko/crypto-data?symbol=${selectedCrypto}`
        );
        setCrypto(response.data);
      } catch (error) {
        console.error('Error fetching market data:', error);
      }
    };

    fetchMarketData();

    const intervalId = setInterval(fetchMarketData, 10000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return (
    <div className="text-white flex flex-row sm:flex-col space-x-10 sm:space-x-0">
      <div className="flex flex-col w-[40vw] sm:w-full">
        <div className="flex flex-row gap-1">
          <p className="text-[20px] lg:text-[30px] text-white mb-1">${crypto?.Price}</p>
          <sup
            className={`text-[12px] sm:text-[15px] translate-y-[7px]
          ${
            crypto?.PriceChangePercentage > 0
              ? 'text-green-500 rounded-[5px]'
              : 'text-red-500 rounded-[5px]'
          }`}
          >
            {crypto?.PriceChangePercentage.toFixed(2)}%
            {crypto?.PriceChangePercentage > 0 ? (
              <ArrowDropUpIcon sx={{fontSize:15}} />
            ) : (
              <ArrowDropDownIcon sx={{fontSize:15}} />
            )}

          </sup>
        </div> 
        <p className="responsive-text4 text-gray-400">Market cap: </p>
        <p className="text-[15px] lg:text-[20px] text-white mb-2 flex flex-row items-center">
          ${crypto?.MarketCap.toLocaleString()} <TooltipMarketCap/>
        </p>
        <p className="responsive-text4 text-gray-400">Volume{'(24h)'}: </p>
        <p className="text-[15px] lg:text-[20px] text-white mb-2 flex flex-row items-center">
          ${crypto?.Volume24h.toLocaleString()} <TooltipVolume/>
        </p>
      </div>
      <BuyCrypto selectedCrypto={selectedCrypto} Price={crypto?.Price} />
    </div>
  );
}
