import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../../assets/logo/logo.png';
import userService from '../../services/user';


export default function Register() {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState(false);
  const [noMatch, setNoMatch] = useState(false);
  const navigate = useNavigate();

  const checkPassword = () => {
    if (password !== confirmPassword) {
      setNoMatch(true);
      return false;
    }
    return true;
  };

  const onSubmit = async (evt) => {
    evt.preventDefault();
    try {
      if (!checkPassword()) throw new Error();
      await userService.signUp(email, password, username);
      navigate('/');
    } catch (err) {
      setError(true);
      console.log(err);
    }
  };

  return (
    <div className='h-screen w-full flex flex-col items-center justify-center align-middle font-roboto bg-white'>
      <img src={logo} alt='logo' className='flex max-w-sm mb-8' />
      <form
        className='flex flex-col max-w-lg w-full m-4 gap-4'
        onSubmit={onSubmit}
      >
        <div className='flex flex-row items-center gap-4'>
          <label
            htmlFor='username'
            className='block mb-2 text-[20px] w-1/3 font-light'
          >
            Username
          </label>
          <input
            type='text'
            id='username'
            onChange={(evt) => {
              setUsername(evt.target.value);
              setError(false);
            }}
            className='w-2/3 bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block max-w-md py-2 px-4'
            placeholder='John Doe'
            required
          />
        </div>
        <div className='flex flex-row items-center gap-4'>
          <label
            htmlFor='email'
            className='block mb-2 text-[20px] w-1/3 font-light'
          >
            Email
          </label>
          <input
            type='text'
            id='email'
            className='w-2/3 bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block max-w-md py-2 px-4'
            placeholder='email@example.com'
            onChange={(evt) => {
              setEmail(evt.target.value);
              setError(false);
            }}
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
              setNoMatch(false);
            }}
            className='w-2/3 bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block max-w-md py-2 px-4'
            required
          />
        </div>
        <div className='flex flex-row items-center gap-4'>
          <label
            htmlFor='confirm_password'
            className='block mb-2 text-[20px] w-1/3 font-light'
          >
            Confirm Password
          </label>
          <input
            type='password'
            id='confirm_password'
            onChange={(evt) => {
              setConfirmPassword(evt.target.value);
              setError(false);
              setNoMatch(false);
            }}
            className='w-2/3 bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block max-w-md py-2 px-4'
            required
          />
        </div>
        {noMatch && (
          <p className='text-sm text-red text-center mt-4'>
            Password no match!
          </p>
        )}
        {error && (
          <p className='text-sm text-red text-center mt-4'>
            Check your info and try again!
          </p>
        )}
        <button
          type='submit'
          className='mt-10 mb-4 text-white bg-red hover:opacity-80 focus:ring-4 focus:outline-none focus:ring-red-300 font-bold rounded-lg text-[16px] w-full sm:w-auto px-5 py-2.5 text-center'
        >
          REGISTER
        </button>
      </form>
    </div>
  );
}
