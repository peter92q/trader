import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { RegisterFormData } from '../Configs/Types/RegisterFormData';
import axios from 'axios';
import { PulseLoader } from 'react-spinners';
import HowToRegIcon from '@mui/icons-material/HowToReg';

export default function Register() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setError,
    watch,
    formState: { isValid, errors, isSubmitting },
  } = useForm({
    mode: 'onBlur',
  });

  function handleApiErrors(error: any) {
    if (error.response && error.response.data && error.response.data.errors) {
      const apiErrors = error.response.data.errors;
      Object.keys(apiErrors).forEach((key) => {
        const errorMessages = apiErrors[key];
        errorMessages.forEach((errorMessage: string) => {
          if (errorMessage.includes('Password')) {
            setError('password', { message: errorMessage });
          } else if (errorMessage.includes('Email')) {
            setError('email', { message: errorMessage });
          } else if (errorMessage.includes('Username')) {
            setError('username', { message: errorMessage });
          }
        });
      });
    } else {
      throw new Error(`Unexpected error: ${error.message}`);
    }
  }

  async function submitForm(data: RegisterFormData) {
    try {
      const response = await axios.post(
        'http://localhost:5223/api/account/register',
        data
      );
      if (response.status === 201) {
        navigate('/login');
      } else {
        throw new Error(`Unexpected response status: ${response.status}`);
      }
    } catch (error: any) {
      handleApiErrors(error);
    }
  }

  return (
    <div
      className="flex flex-col w-screen h-screen items-center justify-center
       text-pink-500 text-[20px] font-medium"
    >
       <HowToRegIcon sx={{fill:"#be185d", fontSize: 40, border:"2px solid #be185d",padding: "3px", borderRadius: "50%"}}/>
      <form
        onSubmit={handleSubmit(submitForm)}
        className="flex flex-col w-[80%] lg:w-[50%] gap-1 p-2 
        rounded-md shadow-md"
      >
        <p>Username:</p>
        <input
          type="text"
          {...register('userName', { required: 'Username is required' })}
          className="h-[3rem] text-[2rem] px-1 py-[1px] rounded-sm text-black"
        />
        {errors.username && (
          <p className="text-red-500">{errors.username.message.toString()}</p>
        )}
        <p>Email:</p>
        <input
          type="email"
          {...register('email', {
            required: 'Email required',
            pattern: {
              value: /^([a-zA-Z0-9_\-.]+)@([a-zA-Z0-9_\-.]+)\.([a-zA-Z]{2,5})$/,
              message: 'Not a valid email address',
            },
          })}
          className="h-[3rem] text-[2rem] px-1 py-[1px] rounded-sm text-black"
        />
        {errors.email && (
          <p className="text-red-500">{errors.email.message.toString()}</p>
        )}
        <p>Password:</p>
        <input
          type="password"
          {...register('password', {
            required: 'Password required',
            pattern: {
              value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/,
              message: 'Password does not meet complexity requirements',
            },
          })}
          className="h-[3rem] text-[2rem] px-1 py-[1px] rounded-sm text-black"
        />
        {errors.password && (
          <p className="text-red-500">{errors.password.message.toString()}</p>
        )}
        <p>Confirm password:</p>
        <input
          type="password"
          {...register('confirmPassword', {
            required: 'Confirm password required',
            validate: (value) =>
              value === watch('password') || 'The passwords do not match.',
          })}
          className="h-[3rem] text-[2rem] px-1 py-[1px] rounded-sm text-black"
        />
        <button
          className={`mt-1 bg-pink-900 w-full ${
            isValid ? ' hover:opacity-80' : 'opacity-50'
          } 
          rounded-md outline-none  text-[20px] font-medium uppercase h-[3rem] text-white`}
          type="submit"
          disabled={!isValid}
        >
          {isSubmitting? <PulseLoader color="#fff"/> :"Submit"}
        </button>
      </form>
      <div className="font-normal text-white">
        Already have an account yet? &nbsp;
        <Link to="/login" className="underline">
          Login
        </Link>
      </div>
    </div>
  );
}
