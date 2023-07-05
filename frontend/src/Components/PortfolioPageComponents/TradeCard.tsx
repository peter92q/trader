import axios from 'axios';
import { TradeData } from '../../Configs/Types/TradeData';
import { useAppDispatch } from '../../Configs/Redux/store';
import { setBalance } from '../../Configs/Redux/accountSlice';
import { useState } from 'react';
import { motion } from 'framer-motion';
import SellButton from './SellButton';

const styles = {
  mainContainer: `w-full
  border-b-[0.01rem] border-b-gray-400/40 pb-[5px] pt-[4px] z-[10] px-[5px] sm:px-[10px]`,
  img: `h-[35px] w-[50px] sm:h-[55px] sm:w-[70px] z-[-1] translate-x-[-2rem] md:translate-x-[-0.2rem] lg:translate-x-[10px]`,
  pText: `font-normal text-[15px] sm:text-[20px]`,
  activeTrue: `table mt-[3px] text-end w-[130px] md:w-[140px] lg:w-[150px]`,
  leverage: `text-[12px] text-gray-400 ml-[5px] text-white absolute`,
};

interface Children {
  data: TradeData;
  index: number;
  handleSellItem: (index: number) => void;
}

interface BackendResponse {
  Balance: number;
  GainsLosses: number;
  TradeClosedAt: string;
}

export default function TradeCard({ data, index, handleSellItem }: Children) {
  const [clicked, setClicked] = useState(false);
  const dispatch = useAppDispatch();
 
  async function sellCrypto() {
    setClicked(true);
    setTimeout(async () => {
      try {
        const type = data.CryptoType;
        const id = data.Id;
        const response = await axios.post<BackendResponse>(
          'http://localhost:5223/api/investment/closecryptotrade',
          {
            Id: id,
            CryptoType: type,
          }
        );
        dispatch(setBalance(response.data.Balance));
        handleSellItem(index);
        setClicked(false);
      } catch (error: any) {
        console.log(error.message);
      }
    }, 400);
  } 

  const date = data.PurchaseDateTime.toLocaleString();
  const value =
    data.GainsOrLosses > 0
      ? (
          Number(data.InvestedAmount) + Number(Math.abs(data.GainsOrLosses))
        ).toFixed(2)
      : (
          Number(data.InvestedAmount) - Number(Math.abs(data.GainsOrLosses))
        ).toFixed(2);
  const lossesCheck =
    data.GainsOrLosses <= -data.InvestedAmount
      ? -data.InvestedAmount.toFixed(2)
      : data.GainsOrLosses.toFixed(2);

  return (
    <motion.div
      key={index}
      initial={{ opacity: 0, y: -20, rotateX: -90 }}
      animate={{ opacity: 1, y: 0, rotateX: 0 }}
      transition={{ duration: 0.2, delay: index / 10 }}
      className={`${styles.mainContainer}`}
    >
      <div className="flex flex-row justify-between">
        <p className="font-light text-[10px]">trade id: {data.Id}</p>
        <p className="font-light text-[10px]">Purchase time: {date}</p>
      </div>
      <div className="w-full flex flex-row justify-between items-center">
        <div className="flex flex-col">
          <p className={`${styles.pText}`}>
            Opened{' '}
            <span className="bg-green-500 rounded-md mr-[30px] lg:mr-[30px] py-0 pl-[4px]">
              ${data.InvestedAmount}        <span className={`${styles.leverage}`}>x{data.Leverage}</span>{' '}
            </span>
            at <span className="text-gray-400">${data.InvestedPrice}</span>
            /coin 
          </p>
          <p className={`${styles.pText} xl:translate-y-[4px]`}>
            {data.GainsOrLosses > 0 ? 'Profits' : 'Losses'}
            :&nbsp;
            {data.GainsOrLosses > 0 && (
              <span className="text-green-500">+</span>
            )}
            <span
              className={`${
                data.GainsOrLosses > 0 ? 'text-green-500' : 'text-red-500'
              }`}
            >
              {data.GainsOrLosses > 0
                ? Number(data.GainsOrLosses).toFixed(2)
                : lossesCheck}
              $
            </span>
          </p>
        </div>
        <img
          src={`${
            data.GainsOrLosses > 0 ? './uptrend.png' : './downtrend.png'
          }`}
          className={`${styles.img}`}
        />
        {data.IsTradeActive ? (
          <div className={`${styles.activeTrue}`}>
            <p className={`${styles.pText}`}>
              Value:{' '}
              <span
                className={`${
                  data.GainsOrLosses > 0 ? 'text-green-500' : 'text-red-500'
                }`}
              >
                {value}$
              </span>
            </p>
            <SellButton clicked={clicked} sellCrypto={sellCrypto}/>
          </div>
        ) : (
          <div className="flex flex-col mt-[3px] text-end">
            <p className="font-normal text-[20px]">
              Closed at:{' '}
              <span className=" text-gray-400">${data.TradeClosedAt}</span>
            </p>
            <div />
          </div>
        )}
      </div>
    </motion.div>
  );
}
