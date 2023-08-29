import { ApiMoviesService } from 'Api';
import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search } from 'components/Search/Search';
import { MovieL } from 'components/MovieL/MovieL';
import style from './Movies.module.css';

const Movies = () => {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('query') ?? '';

  const formSubmit = inputQuery => {
    setPage(1);
    setMovies([]);
    setSearchParams(inputQuery !== '' ? { query: inputQuery } : {});
  };

  useEffect(() => {
    if (query === '') {
      return;
    }

    ApiMoviesService.getMovieByQuery(query, page).then(r => {
      setMovies(prevMovies => {
        const updatedMovies = [...prevMovies];
        r.results.forEach(movie => {
          if (
            !updatedMovies.some(existingMovie => existingMovie.id === movie.id)
          ) {
            updatedMovies.push(movie);
          }
        });
        return updatedMovies;
      });
    });
  }, [query, page]);

  return (
    <main className={style.main}>
      <Search onSubmit={formSubmit} />
      {movies.length > 0 && query && <MovieL movies={movies} />}
    </main>
  );
};

export default Movies;
