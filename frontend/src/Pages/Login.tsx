import { FieldValues, useForm } from 'react-hook-form';
import { signInUser } from '../Configs/Redux/accountSlice';
import { useAppDispatch, useAppSelector } from '../Configs/Redux/store';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { PulseLoader } from 'react-spinners';
import LockIcon from '@mui/icons-material/Lock';
import Cookies from 'js-cookie';

export default function Login() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { user } = useAppSelector((state) => state.account);
  const [error, setError] = useState('');
  const {
    handleSubmit,
    register,
    formState: { isValid, isSubmitting },
  } = useForm({
    mode: 'onBlur',
  });

  async function submitForm(data: FieldValues) {
    try {
      await dispatch(signInUser(data));
      const cookieUser = Cookies.get('user');
      if(!cookieUser){
        setError('Invalid username or password');
      }
      else{
        navigate('/')
      }
    } catch (error: any) {
      setError('Invalid username or password');
    }
  }

  console.log(user);
  return (
    <div className="w-screen h-screen flex items-center justify-center flex-col">
      <LockIcon sx={{fill:"#be185d", fontSize: 40, border:"2px solid #be185d",padding: "3px", borderRadius: "50%"}}/>
      <form
        onSubmit={handleSubmit(submitForm)}
        className="flex flex-col w-[80%] 
        lg:w-[50%] gap-1 p-2 shadow-md"
      >
        <p className="text-pink-500 text-[20px] font-medium">Username:</p>
        <input
          type="text"
          {...register('UserName', { required: 'Username is required' })}
          className="h-[3rem] text-[2rem] px-1 py-[1px] mb-[2px] rounded-sm"
        />
        <p className="text-pink-500 text-[20px] font-medium">Password:</p>
        <input
          type="password"
          {...register('Password', { required: 'Password is required' })}
          className="h-[3rem] text-[2rem] px-1 py-[1px] rounded-sm"
        />
        <button
          className={`mt-1 bg-pink-900 text-white text-[20px]  w-full ${
            isValid ? 'hover:opacity-80 ' : 'opacity-50'
          } 
          rounded-md outline-none  font-medium uppercase h-[3rem]`}
          type="submit"
          disabled={!isValid}
        >
          {isSubmitting? <PulseLoader color="#fff"/> :"Login"}
        </button>
        {error && <span className="text-red-500 text-center">{error}</span>}
      </form>
      <div className="font-normal text-white">
        Don't have an account yet? &nbsp;
        <Link to="/register" className="underline">
          Register
        </Link>
      </div>
    </div>
  );
}
