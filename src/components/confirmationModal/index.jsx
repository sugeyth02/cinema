import React, { useState } from 'react';
import * as AlertDialog from '@radix-ui/react-alert-dialog';
import cinemaService from '../../services/cinema';

export default function ConfirmationModal({
  isOpen,
  setOpen,
  idSchedule,
  total,
}) {
  const [message, setMessage] = useState();
  const deleteReserve = async () => {
    try {
      const reserve = await cinemaService.deleteReserve(idSchedule);
      setMessage('Reserve deleted!');
      console.log(reserve);
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <AlertDialog.Root open={isOpen} onOpenChange={setOpen}>
      <AlertDialog.Portal>
        <AlertDialog.Overlay className='fixed w-screen h-screen top-0 left-0 bg-zinc-800 opacity-70 z-30' />
        <AlertDialog.Content className='fixed  w-screen h-screen top-0 left-0  flex items-center justify-center z-30'>
          <div className='bg-white py-10 px-6 rounded-md flex flex-col justify-center items-start gap-12 w-[80%] sm:w-[50%] lg:w-[40%] text-black'>
            <div className='flex flex-col items-center gap-8 w-full'>
              <h1 className='font-roboto  text-xl font-normal text-black'>
                Tickets reserved succesfully!
              </h1>
              <p className='font-roboto text-2xl text-red font-medium'>
                TOTAL ${total?.toFixed(2)}
              </p>
              <p className='font-roboto text-normal text-red font-medium'>
                {message}
              </p>
            </div>

            <div className='flex flex-col gap-4 w-full md:flex-row justify-around md:justify-end items-center px-4'>
              <button
                className='rounded-lg px-8 py-2 border  text-white bg-red border-red hover:cursor-pointer hover:bg-white  hover:text-red font-roboto font-bold'
                onClick={() => {
                  deleteReserve();
                  setTimeout(function () {
                    setOpen(false);
                    setMessage('');
                  }, 2000);
                }}
              >
                DELETE
              </button>

              <AlertDialog.Cancel asChild>
                <button
                  className='rounded-lg px-8 py-2 border  text-white bg-green border-green hover:cursor-pointer hover:bg-white  hover:text-green font-roboto font-bold'
                  onClick={() => {
                    setOpen(false);
                  }}
                >
                  OK
                </button>
              </AlertDialog.Cancel>
            </div>
          </div>
        </AlertDialog.Content>
      </AlertDialog.Portal>
    </AlertDialog.Root>
  );
}
