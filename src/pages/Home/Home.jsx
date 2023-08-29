import style from './Home.module.css';
import { useState, useEffect } from 'react';
import { Btn } from 'components/Button/Button';
import { ApiMoviesService } from 'Api';
import { MovieL } from 'components/MovieL/MovieL';

// const Home = () => {
//   const [movies, setMovies] = useState([]);
//   const [page, setPage] = useState(1);
//   const [total_results, setTotalResults] = useState(null);

//   const loadMovies = pageNumber => {
//     ApiMoviesService.getPopularMovies(pageNumber).then(data => {
//       setMovies(prevMovies => [...prevMovies, ...data.results]);
//       setTotalResults(data.total_results);
//     });
//   };

//   const handleScroll = () => {
//     if (
//       window.innerHeight + document.documentElement.scrollTop ===
//       document.documentElement.offsetHeight
//     ) {
//       if (total_results / 20 >= page) {
//         setPage(prevPage => prevPage + 1);
//       }
//     }
//   };

//   useEffect(() => {
//     loadMovies(page);
//     window.addEventListener('scroll', handleScroll);
//     return () => {
//       window.removeEventListener('scroll', handleScroll);
//     };
//   }, [page]);

//   return (
//     <main className={style.maine}>
//       <h2 className={style.trendTitle}>Trending today </h2>
//       <MovieL movies={movies} />
//     </main>
//   );
// };

// export default Home;

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [total_results, setTotalResults] = useState(null);

  useEffect(() => {
    ApiMoviesService.getPopularMovies(page).then(data => {
      setMovies(movies => [...movies, ...data.results]);
      setTotalResults(data.total_results);
    });
  }, [page]);

  const loadMore = () => {
    setPage(page => page + 1);
  };

  return (
    <main className={style.maine}>
      <h2 className={style.trendTitle}>Trending today </h2>
      <MovieL movies={movies} />
      {total_results / 20 >= page && (
        <Btn text="Load more" status="search" onClick={loadMore} />
      )}
    </main>
  );
};

export default Home;
