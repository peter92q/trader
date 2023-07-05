import { useEffect, useState } from 'react';
import agent from '../../Configs/Axios/axios';
import BarChartIcon from '@mui/icons-material/BarChart';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import BalanceIcon from '@mui/icons-material/Balance';
import LivePrices from './LivePrices';

const styles = {
  mainContainer: `w-screen flex flex-col md:flex-row flex-1 justify-center items-center
  flex-grow px-3 lg:px-5 xl:px-10 gap-2 mt-[2rem] text-[18px] md:text-[20px] lg:text-[22px] xl:text-[25px]`,
  Balance_Equity_Container: `md:w-[33.3333%] w-full border-[0.01rem] border-pink-900/40
  text-white h-[27vh] px-2 py-1 rounded-sm z-10 flex justify-center items-center flex-col`,
  liveCharts: `md:w-[33.3333%] w-full text-white h-[27vh] px-2 pt-2 sm:pt-3 rounded-sm z-10 border-[0.01rem] border-pink-900/40`,
  pText: `font-medium text-[22px] pt-1 lg:pt-0 lg:text-[27px]`,
};

export function Shimmy() {
  return (
    <div
      className="md:w-[33%] w-full text-white h-[27vh] px-2 py-1 
    rounded-sm z-10 flex justify-center shimmer flex-col"
    />
  );
}

export default function Balance_Equity() {
  const [data, setData] = useState<State>({
    equity: null,
    balance: null,
    cryptoPrices: null,
    percentageChange: null
  });

  useEffect(() => {
    async function fetchEquity() {
      const response = await agent.requests.get('/equity');
      const { equity, cryptoPrices, Balance, cryptoStats } = response;
      setData({ equity: equity, balance: Balance, cryptoPrices: cryptoPrices, percentageChange: cryptoStats });
    }
    fetchEquity();
  }, []);

  return (
    <div className={`${styles.mainContainer}`}>
      {data.balance ? 
      (
        <div className={`${styles.Balance_Equity_Container}`}>
          <div className="flex flex-row">
            <AccountBalanceIcon
              sx={{
                fontSize: 25,
                fill: '#ab196a',
                marginBottom: '5px',
                marginTop: '5px',
                marginRight: '5px',
              }}
            />
            <p className={`${styles.pText}`}>Balance</p>
          </div>
          <p className="text-[25px] lg:text-[32px]">
            {'$' + Number(data.balance).toFixed(2)}
          </p>
        </div>
      ) 
      : 
      (
        <Shimmy />
      )}

      {data.equity ? 
      (
        <div className={`${styles.Balance_Equity_Container}`}>
          <div className="flex flex-row">
            <BalanceIcon
              sx={{
                fontSize: 25,
                fill: '#ab196a',
                marginBottom: '5px',
                marginTop: '5px',
                marginRight: '5px',
              }}
            />
            <p className={`${styles.pText}`}>Equity</p>
          </div>
          <p className="text-[25px] lg:text-[32px]">
            {'$' + Number(data.equity).toFixed(2)}
          </p>
        </div>
      ) 
      : 
      (
        <Shimmy />
      )}
  
      {data.cryptoPrices ? 
      (
        <div className={`${styles.liveCharts}`}>
          <p className="responsive-text6 font-medium">
            <BarChartIcon
              sx={{ fontSize: 25, fill: '#ab196a', marginBottom: '5px' }}
            />
            &nbsp;Live prices
          </p>
          <div className="w-full flex flex-col pl-[0.2rem] gap-[2px]">
            <table>
              <tbody>
                {Object.entries(data.cryptoPrices).map(
                  ([crypto, value], index) => {
                    const percentageChangeValues = Object.values(data.percentageChange);
                    const percentChange = percentageChangeValues[index];
                    return (
                      <LivePrices
                        key={index + percentChange}
                        crypto={crypto}
                        value={value}
                        index={index}
                        percentChange={percentChange} 
                      />
                    );
                  }
                )}
              </tbody>
            </table>
          </div>
        </div>
      ) 
      : 
      (
        <Shimmy />
      )}
    </div>
  );  
}
