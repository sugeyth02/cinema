import { Pagination } from "@mui/material";
import { useEffect, useState } from "react";
import MovieCard from "../../components/MovieCard";
import cinemaService from "../../services/cinema";

export default function TodayMovies() {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(0);
  const [pageCount, setPageCount] = useState(1);

  useEffect(() => {
    const getData = async () => {
      try {
        const moviesRes = await cinemaService.today(page);
        setMovies(moviesRes.content);
        setPageCount(moviesRes.totalPages);
      } catch (err) {
        console.log(err);
      }
    };
    getData();
  }, [page]);

  const handleChange = (event, value) => {
    setPage(value-1);
  };

  return (
    <div className="flex flex-col items-center gap-10 px-8 py-[63px]">
      <div className="grid align-middle grid-cols-4  grid-rows-2 gap-[33px]">
        {movies.map((e) => (
          <MovieCard
            key={e.id}
            id={e.id}
            image={e.thumbnail}
            finishHour={e.finishTime}
            startHour={e.startTime}
            title={e.title}
          />
        ))}
      </div>

      <Pagination
        count={pageCount}
        page={page+1}
        onChange={handleChange}
        shape="rounded"
      />
    </div>
  );
}
