import React, { useState } from 'react';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ConfirmationModal from '../../components/confirmationModal';
import Counter from '../../components/Counter';
import cinemaService from '../../services/cinema';

export default function Reserve() {
  const { id } = useParams();
  const [movie, setMovie] = useState({});
  const [tickets, setTickets] = useState(1);
  const [capacity, setCapacity] = useState(0);
  const [open, setOpen] = useState(false);
  const [reserve, setReserve] = useState();

  const handleReserve = async () => {
    try {
      const reserve = await cinemaService.reserve(id, tickets);
      setReserve(reserve);
      console.log(reserve);
      setOpen(true);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    const getData = async () => {
      try {
        const moviesRes = await cinemaService.todayId(id);
        setMovie(moviesRes);
        setCapacity(moviesRes.capacity);
      } catch (err) {
        console.log(err);
      }
    };
    getData();
  }, [id]);

  return (
    <div className='flex flex-col  pb-[63px] font-roboto'>
      <img
        src={movie.picture}
        alt='Movie Image'
        className='flex w-full h-[373px] object-cover brightness-75 drop-shadow'
      />
      <div className='flex'>
        <img
          src={movie.thumbnail}
          alt='Movie Image'
          className='flex w-[210px] h-[316px] object-cover mt-[-138px] z-[1] ml-20 drop-shadow-sm'
        />

        <div className='flex flex-col gap-9 pt-6 w-full items-start pl-[10%]'>
          <div className='flex flex-col gap-[17px]'>
            <h2 className='font-normal text-2xl text-black'>{movie.title}</h2>
            <span className='px-2 py-1 border border-gray w-fit rounded-[4px] text-base  text-gray '>
              {movie.length + 15} min
            </span>
            <span className=' px-2 py-1  bg-orange rounded-[8px] w-fit text-base text-white '>
              {movie.category}
            </span>
          </div>
          <div className='flex flex-col gap-[17px] w-full'>
            <h2 className='font-normal text-xl text-black '>
              How many Tickets?
            </h2>
            {capacity && (
              <Counter value={tickets} setter={setTickets} max={capacity} />
            )}
            <div className='flex justify-between w-full'>
              <button
                className='bg-red100 text-white hover:bg-red  hover:cursor-pointer font-bold rounded-lg text-[16px] w-full sm:w-auto px-5 py-2 text-center'
                onClick={() => handleReserve()}
              >
                RESERVE
              </button>
              <span className='h-fit px-5 py-1 bg-green text-white mr-[24px] font-bold'>
                ${movie.price} c/u
              </span>
            </div>
          </div>
        </div>
      </div>
      <ConfirmationModal
        isOpen={open}
        setOpen={setOpen}
        idSchedule={id}
        total={reserve?.totalPrice}
      />
    </div>
  );
}
