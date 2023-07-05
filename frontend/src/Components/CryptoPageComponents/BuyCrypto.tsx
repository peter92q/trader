import axios from 'axios';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useAppDispatch, useAppSelector } from '../../Configs/Redux/store';
import { setBalance } from '../../Configs/Redux/accountSlice';
import { Snackbar, Alert } from '@mui/material';

const styles = {
  plusAndMinus: `cursor-pointer flex items-center text-[2.5rem] mb-[1px] font-bold
  text-[#ac1161] border-[2px] border-pink-900 bg-pink-900 text-white px-1 h-[2.43rem]`,
  button: `bg-gradient-to-r from-[#ac1161] via-[#690d3d] to-[#600333] text-white 
  uppercase px-[2.4rem] rounded-sm mt-[5px] text-[25px] hover:opacity-70`,
  inputField: `w-[3rem] text-[1.45rem] mb-[5px] sm:mb-[1px] bg-transparent flex items-center text-center 
  justify-center text-white`,
  dollarSign: `text-[1.45rem] mb-[1px] text-white pr-2`,

};

export default function BuyCrypto( {selectedCrypto, Price}:{selectedCrypto: string , Price: number} ) 
{
  const [leverage, setLeverage] = useState<number>(1);
  const [clicked, setClicked] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.account);
  const [priceSelector, setPriceSelector] = useState<number>(0);
  const { register, handleSubmit, setValue } = useForm();
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const handleClick = () => {
    setClicked(true);
    setOpenSnackbar(true);

    setTimeout(() => {
      setClicked(false);
    }, 200);

    setTimeout(() => {
      setOpenSnackbar(false);
    }, 1000);
  };

  const onSubmit = async (data) => {
    try {
      const response = await axios.post(
        `http://localhost:5223/api/investment/investInCrypto`,
        {
          ...data,
          InvestedPrice: Price,
          CryptoType: selectedCrypto,
          Leverage: leverage,
        }
      );
      const { Balance } = response.data;
      dispatch(setBalance(Balance));
      setPriceSelector(0);
      setValue('InvestedAmount', 0);
      // Update state or perform any necessary actions with the response data
    } catch (error) {
      console.error('Error submitting buy order:', error);
    }
  };

  const handleDecrease = () => {
    if (priceSelector > 24) {
      const updatedPrice = priceSelector - 25;
      setPriceSelector(updatedPrice);
      setValue('InvestedAmount', updatedPrice);
    }
  };
 
  const handleIncrease = () => {
    if (priceSelector < user.Balance) {
      const updatedPrice = priceSelector + 25;
      setPriceSelector(updatedPrice);
      setValue('InvestedAmount', updatedPrice);
    }
  };

  const handleLeverage = (value: number) => {
    setLeverage(value);
    setValue('Leverage', value);
  };

  if (!Price) return <div>Loading prices</div>;

  const list = [1, 5, 25, 50];
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-[20vw]"
    >
      <div className="flex flex-row items-center">
        <div
          onClick={handleDecrease}
          className={`${styles.plusAndMinus} rounded-tl-sm rounded-bl-sm`}
        >
          -
        </div>
        <input
          id="customInput"
          value={priceSelector!}
          type="number"
          {...register('InvestedAmount', { required: 'Select an amount' })}
          className={`${styles.inputField}`}
          onChange={(e) => setPriceSelector(Number(e.target.value))}
        />
        <p className={`${styles.dollarSign}`}>$</p>
        <div
          onClick={handleIncrease}
          className={`${styles.plusAndMinus} rounded-tr-sm rounded-br-sm`}
        >
          +
        </div>
      </div>
      <div className="text-[20px] flex flex-row gap-1.5 my-[15px] sm:my-[10px] duration-500 ">
        {list.map((item) => (
          <span
            onClick={() => handleLeverage(item)}
            className={`${
              leverage === item && 'bg-pink-800 rounded-sm'
            } px-1 cursor-pointer`}
          >
            x{String(item)}
          </span>
        ))}
      </div>
      <button
        type="submit"
        onClick={handleClick}
        className={`${styles.button} duration-200 ${
          clicked ? 'scale-105 ring-2 ring-pink-400' : ''
        }`}
      >
        Buy
      </button>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={2000}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        onClose={() => setOpenSnackbar(false)}
      >
        <Alert severity="success" variant="filled">
          Purchase successful!
        </Alert>
      </Snackbar>
    </form>
  );
} 
