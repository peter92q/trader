import { useEffect, useState } from 'react';
import TradeCard from '../../Components/PortfolioPageComponents/TradeCard';
import { TradeData } from '../../Configs/Types/TradeData';
import agent from '../../Configs/Axios/axios';
import PieChart from '../../Components/PortfolioPageComponents/PieChart';
import { cryptos } from '../../StaticData/cryptos';
import { ScaleLoader } from 'react-spinners';
import Balance_Equity from '../../Components/PortfolioPageComponents/Balance_Equity';

const styles = {
    mainContainer: `flex lg:flex-row flex-col items-center justify-center lg:items-start lg:justify-center mt-[100px] sm:px-0`,
    pieChartWrapper: `flex flex-col justify-center items-center mb-[1rem] w-full lg:w-[40%]`,
    secondaryContainer: `flex flex-col z-[10] border-[0.01rem] border-pink-900/40 p-0 w-[97%] lg:w-[60%] lg:mr-[50px]`,
    listAndSelectWrapper: `flex flex-row flex-grow justify-between w-full border-b-[0.01rem] md:px-2 md:py-1 border-pink-900/40 pb-[5px] sm:pb-0`,
    ul: `flex flex-row gap-[1rem] text-white flex-wrap sm:px-0 px-2 text-[20px] font-light`,
    tradesWrapper: `flex flex-col font-medium text-white text-[20px] md:text-[30px] overflow-y-auto max-h-[500px]`,
    select: `mt-[8px] md:mt-[4px] mr-[5px] h-[20px] px-[5px] rounded-sm text-[12px]`,
    icon: `h-6 w-6 sm:h-5 sm:w-5 mt-[6px] sm:mt-[4px]`,
    noDataWrapper: `mt-[50px] text-[15px] lg:text-[20px] flex justify-center items-center text-center translate-y-[-40px]`,
    shimmerLoadingBox: `h-[40vh] w-[80vw] lg:mr-[50px] flex flex-col items-center lg:items-start z-[10] shimmer`,
  }; 
  
  export default function MainComponent() { 
    const [bigData, setBigData] = useState<TradeData[]>([]);
    const [selectedCrypto, setSelectedCrypto] = useState('bitcoin');
    const [tradeType, setTradeType] = useState('opened');
    const [loading, setLoading] = useState(false);
  
    useEffect(() => {
      async function fetchTradeData() {
        setLoading(true);
        try {
          const response = await agent.requests.post('/Investment/getAllTrades', {
            OpenedOrClosed: tradeType,
            CryptoType: selectedCrypto,
          });
          setBigData(response);
        } catch (error: any) {
          console.log(error.message);
        }
        setLoading(false);
      }
      fetchTradeData();
    }, [selectedCrypto, tradeType]);
  
    const handleTradeTypeChange = (event) => {
      setTradeType(event.target.value);
    };
  
    const handleSellItem = (index: number) => {
      setBigData((prev) => {
        const newData = [...prev];
        newData.splice(index, 1);
        return newData;
      });
    };
  
    return (
      <>
        <Balance_Equity />
        <div className={`${styles.mainContainer} relative`}>
          <div className={`${styles.pieChartWrapper}`}>
            <PieChart />
          </div>
  
          {bigData !== null && !loading ? (
            <div className={`${styles.secondaryContainer} relative`}>
              <div className="flex flex-row mb-[20px]">
                <div className={`${styles.listAndSelectWrapper}`}>
                  <ul className={`${styles.ul}`}>
                    {cryptos.map((item, index) => (
                      <li
                        className={`cursor-pointer duration-300 flex flex-row gap-1
                    ${
                      selectedCrypto === item.title
                        ? 'opacity-100'
                        : 'opacity-20 text-gray-500'
                    }`}
                        key={index}
                        onClick={() => setSelectedCrypto(item.title)}
                      >
                        <img src={item.icon} className={`${styles.icon}`} />
                        <span className="first-letter:uppercase hidden sm:block">
                          {item.title === 'binancecoin' ? 'BNB' : item.title}
                        </span>
                      </li>
                    ))}
                  </ul>
                  <select
                    className={`${styles.select}`}
                    value={tradeType}
                    onChange={handleTradeTypeChange}
                  >
                    <option value="opened">Opened</option>
                    <option value="closed">Closed</option>
                  </select>
                </div>
              </div>
  
              <div className={`${styles.tradesWrapper}`}>
                {bigData?.length > 0 ? (
                  bigData
                    .sort(
                      (a, b) =>
                        new Date(b.PurchaseDateTime).getTime() -
                        new Date(a.PurchaseDateTime).getTime()
                    )
                    .map((data, index) => ( 
                      <TradeCard
                        key={index + data.Id}
                        data={data}
                        index={index}
                        handleSellItem={handleSellItem}
                      />
                    ))
                ) : (
                  <div className={`${styles.noDataWrapper}`}>
                    {loading ? (
                      <ScaleLoader color="#fff" className="scale-110" />
                    ) : (
                      'You have no trade data for this currency.'
                    )}
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className={`${styles.shimmerLoadingBox}`} />
          )}
        </div>
      </>
    );
  }
  
  