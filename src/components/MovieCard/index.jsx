import React from 'react'
import { useLocation, useNavigate} from 'react-router-dom';

export default function MovieCard({ image, startHour, finishHour, title, id }) {
  const { pathname } = useLocation();
  const navigate = useNavigate();
    
  return (
    <div className='flex flex-col font-roboto w-[210px] hover:cursor-pointer' onClick={()=>navigate(`${id}`)}>
      <img
        src={image}
        alt='Movie Image'
        className='flex w-[210px] h-[316px] object-cover'
      />
      <div className='flex flex-col'>
        {pathname === '/today' && (
          <div className='flex bg-red100 w-full text-xs text-center font-bold items-center justify-center text-white'>
            {startHour.substring(11).slice(0, -13)} - {finishHour.substring(11).slice(0, -13)}
          </div>
        )}
        <div className='flex bg-red w-full  text-white text-[16px] font-bold text-center items-center justify-center'>
          {title}
        </div>
      </div>
    </div>
  );
}
