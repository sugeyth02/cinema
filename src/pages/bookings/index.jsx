import { Pagination } from '@mui/material';
import { useEffect, useState } from 'react';
import cinemaService from '../../services/cinema';

export default function Bookings() {
  const [bookings, setBookings] = useState([]);
  const [page, setPage] = useState(0);
  const [pageCount, setPageCount] = useState(1);

  useEffect(() => {
    const getData = async () => {
      try {
        const bookingRes = await cinemaService.booking(page);
        setBookings(bookingRes.content);
        setPageCount(bookingRes.totalPages);
      } catch (err) {
        console.log(err);
      }
    };
    getData();
  }, [page]);

  const handleChange = (event, value) => {
    setPage(value - 1);
  };

  return (
    <div className='flex bg-gray-100 flex-col items-center font-roboto px-8 py-[63px]'>
      <div className='p-4 flex flex-col gap-4 justify-start max-w-3xl w-full'>
        {bookings.map((e) => {
          return (
            <div
              key={e.id}
              className='flex flex-row justify-between w-full px-10 py-6 border border-gray rounded-md text-black'
            >
              <div className='flex flex-col gap-4'>
                <h6 className='font-normal text-lg'>{e.title}</h6>
                <p className='text-gray font-bold text-sm'>
                  {e.startTime.substring(11).slice(0, -13)} -
                  {e.finishTime.substring(11).slice(0, -13)}
                </p>
                <p className='text-sm'>Tickets x{e.quantity}</p>
              </div>
              <div className='flex flex-col justify-between items-end'>
                <p className='text-gray font-bold text-base'>
                  {e.buyDate.slice(0, -19)}
                </p>
                <h5 className='text-lg font-bold  text-red'>
                  TOTAL: ${e.totalPrice.toFixed(2)}
                </h5>
              </div>
            </div>
          );
        })}
      </div>

      <Pagination
        count={pageCount}
        page={page + 1}
        onChange={handleChange}
        shape='rounded'
      />
    </div>
  );
}
