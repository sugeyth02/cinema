import React, { useCallback} from 'react';

export default function Counter({ value, setter, max }) {
  const sum = useCallback(() => {
    setter((last) => (last + 1 <= max ? last + 1 : last ));
  }, []);

  const subtract = useCallback(() => {
    setter((last) => (last - 1 < 0 ? 0 : last - 1));
  }, []);
  
  return (
    <div className='flex flex-row  items-center border-[1.5px] border-gray rounded-xl gap-3 w-fit'>
      <button
        className='flex rounded-xl  text-gray font-roboto bg-none border-none px-4 py-1 hover:bg-neutral-100 hover:cursor-pointer disabled:cursor-not-allowed'
        disabled={value === 1}
        onClick={() => subtract()}
      >
        -
      </button>
      <p className='flex text-gray font-roboto'>{value}</p>
      <button
        className='flex rounded-xl  text-gray font-roboto bg-none border-none px-4 py-1 hover:bg-neutral-100 hover:cursor-pointer'
        onClick={() => sum()}
      >
        +
      </button>
    </div>
  );
}
