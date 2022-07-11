import { Pagination } from '@mui/material';
import { useEffect, useState } from 'react';
import cinemaService from '../../services/cinema';

export default function Movies() {
  const [movies, setMovies] = useState([]);
  const [categories, setCategories] = useState([]);
  const [filter, setFilter] = useState();
  const [page, setPage] = useState(0);
  const [pageCount, setPageCount] = useState(1);

  useEffect(() => {
    const getData = async () => {
      try {
        if (filter) {
          const moviesRes = await cinemaService.moviesByCategory(filter, page);
          setMovies(moviesRes.content);
          setPageCount(moviesRes.totalPages);
        } else {
          const moviesRes = await cinemaService.movies(page);
          setMovies(moviesRes.content);
          setPageCount(moviesRes.totalPages);
        }
      } catch (err) {
        console.log(err);
      }
    };
    getData();
  }, [page, filter]);

  useEffect(() => {
    const getData = async () => {
      try {
        const categoriesRes = await cinemaService.categories();
        setCategories(categoriesRes);
      } catch (err) {
        console.log(err);
      }
    };
    getData();
  }, []);

  const handleChange = (event, value) => {
    setPage(value - 1);
  };

  return (
    <div className='flex flex-row gap-[20%] px-8 py-[63px]'>
      <div className='flex flex-col  w-[173px] gap-2'>
        <h6 className='font-normal text-red'>FILTER BY</h6>
        <div className='flex flex-col gap-4 rounded'>
          {categories.map((e) => {
            return (
              <div
                onClick={() => setFilter(e.code)}
                key={e.code}
                className={`flex px-2 py-1 border border-gray w-fit rounded-[8px] hover:cursor-pointer  ${
                  e.code === filter
                    ? 'text-white bg-red border-red'
                    : 'text-gray'
                }`}
              >
                {e.name}
              </div>
            );
          })}
        </div>
      </div>
      <div className='flex flex-col gap-10 w-full'>
        <div className='flex flex-col gap-[45px]'>
          {movies?.map((movie) => {
            return (
              <div
                key={movie.code}
                className='flex flex-row gap-[44px] font-roboto'
              >
                <img
                  src={movie.thumbnail}
                  alt='Movie Image'
                  className='flex w-[210px] h-[316px] object-cover'
                />
                <div className='flex flex-col gap-2'>
                  <h2 className='font-normal text-xl text-black'>
                    {movie.title}
                  </h2>
                  <span className='px-2 py-1 border border-gray w-fit rounded-[4px] text-sm  text-gray '>
                    {movie.length + 15} min
                  </span>
                  <span className=' px-2 py-1  bg-orange rounded-[8px] w-fit text-sm text-white '>
                    {movie.category.name}
                  </span>
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
    </div>
  );
}
