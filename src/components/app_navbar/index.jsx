import logo from '../../assets/logo/logo.png';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOut } from '@fortawesome/free-solid-svg-icons';
import { useLocation, useNavigate } from 'react-router-dom';

export default function AppNavbar() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const today = pathname.includes('/today');
  const movies = pathname === '/movies';
  const bookings = pathname === '/bookings';

  const Logout = () => {
    localStorage.clear();
    navigate('/');
  };

  return (
    <div className='flex flex-row items-center justify-between  py-5 px-8 bg-white sticky top-0 z-10'>
      <div className='w-44'>
        <img src={logo} className='flex w-[262px] h-[34px]' />
      </div>
      <div className='flex flex-row items-center justify-around  w-[65%]  font-roboto'>
        <div className='flex items-center gap-[54px] font-medium text-[16px]'>
          <a
            href='/today'
            className={`font-semibold ${
              today ? 'text-red' : 'text-black'
            } hover:text-red`}
          >
            Today
          </a>
          <a
            href='/movies'
            className={`font-semibold ${
              movies ? 'text-red' : 'text-black'
            } hover:text-red`}
          >
            Movies
          </a>
          <a
            href='/bookings'
            className={`font-semibold ${
              bookings ? 'text-red' : 'text-black'
            } hover:text-red`}
          >
            Bookings
          </a>
        </div>
        <div className='right-[24px] absolute'>
          <FontAwesomeIcon
            className='text-red h-[24px] w-[24px] hover:cursor-pointer'
            icon={faSignOut}
            onClick={() => Logout()}
          />
        </div>
      </div>
    </div>
  );
}
