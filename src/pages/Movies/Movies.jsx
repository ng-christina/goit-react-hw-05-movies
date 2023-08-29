import { ApiMoviesService } from 'Api';
import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search } from 'components/Search/Search';
import { MovieL } from 'components/MovieL/MovieL';
import { Btn } from 'components/Button/Button';
import style from './Movies.module.css';

const Movies = () => {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [total_results, setTotalResults] = useState(null);
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
      setTotalResults(r.total_results);
    });
  }, [query, page]);

  const loadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  return (
    <main className={style.main}>
      <Search onSubmit={formSubmit} />
      {movies.length > 0 && query && <MovieL movies={movies} />}
      {total_results / 20 >= page && (
        <Btn text="Load more" status="search" onClick={loadMore} />
      )}
    </main>
  );
};

export default Movies;
