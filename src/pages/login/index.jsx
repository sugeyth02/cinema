import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../../assets/logo/logo.png';
import userService from '../../services/user';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const onSubmit = async (evt) => {
    evt.preventDefault();
    try {
      localStorage.clear();
      await userService.logIn(email, password);
      navigate('/today');
    } catch (err) {
      setError(true);
      console.log(err)
    }
  };

  return (
    <div className='h-screen w-full flex flex-col items-center justify-center align-middle font-roboto bg-white'>
      <img src={logo} alt='logo' className='flex max-w-sm mb-10' />
      <form
        className='flex flex-col max-w-lg w-full m-4 gap-4'
        onSubmit={onSubmit}
      >
        <div className='flex flex-row items-center gap-4'>
          <label
            htmlFor='email'
            className='block mb-2 text-[20px] w-1/3 font-light'
          >
            Email
          </label>
          <input
            type='email'
            id='email'
            onChange={(evt) => {
              setEmail(evt.target.value);
              setError(false);
            }}
            className='w-2/3 bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block max-w-md py-2 px-4'
            required
          />
        </div>
        <div className='flex flex-row items-center gap-4'>
          <label
            htmlFor='password'
            className='block mb-2 text-[20px] w-1/3 font-light'
          >
            Password
          </label>
          <input
            type='password'
            id='password'
            onChange={(evt) => {
              setPassword(evt.target.value);
              setError(false);
            }}
            className='w-2/3 bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block max-w-md py-2 px-4'
            required
          />
        </div>
        {error && (
          <p className='text-sm text-red text-center mt-4'>Invalid credentials, try again!</p>
        )}

        <button
          type='submit'
          className='mt-10 mb-4 text-white bg-red hover:opacity-80 focus:ring-4 focus:outline-none focus:ring-red-300 font-bold rounded-lg text-[16px] w-full sm:w-auto px-5 py-2.5 text-center'
        >
          LOGIN
        </button>
        <div className='flex flex-row gap-2 items-center justify-center font-semibold'>
          <span>Not a member yet? </span>
          <a href='/register' className='text-red hover:underline '>
            Create an account.
          </a>
        </div>
      </form>
    </div>
  );
}
