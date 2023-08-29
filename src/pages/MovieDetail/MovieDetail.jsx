import style from '../MovieDetail/MovieDetail.module.css';
import { useState, useEffect, Suspense } from 'react';
import { Outlet, useParams, useLocation, NavLink } from 'react-router-dom';
import { Loader } from '../../components/Loader/Loader';
import { ApiMoviesService } from '../../Api';

const MovieDetails = () => {
  const { id: movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const location = useLocation();

  useEffect(() => {
    ApiMoviesService.getMovieById(movieId).then(setMovie);
  }, [movieId]);

  if (!movie) {
    return null;
  }

  const {
    poster_path,
    original_title,
    original_name,
    release_date,
    first_air_date,
    vote_average,
    genres,
    overview,
  } = movie;

  return (
    <>
      <div>
        <NavLink to={location.state?.from ?? '/'} className={style.back}>
          Go back
        </NavLink>
      </div>
      <div>
        <img
          className={style.img}
          src={
            poster_path
              ? `${ApiMoviesService.BASE_URL}${poster_path}`
              : ApiMoviesService.defaultImg
          }
          alt={original_title || original_name}
          width="300"
        />
        <div className={style.div}>
          <h2 className={style.name}>
            {original_title || original_name} ({release_date || first_air_date})
          </h2>
          <p>User Score: {`${Math.round(vote_average * 10)}%`}</p>
          <h3 className={style.overviewTitle}>Overview</h3>
          <p className={style.overview}>{overview}</p>
          <h3>Genres</h3>
          <ul className={style.ul}>
            {genres.map(genre => (
              <li key={genre.id} style={{ marginRight: '10px' }}>
                {genre.name}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div>
        <h3 className={style.info}>Additional Information</h3>
        <ul>
          <li>
            <NavLink to="cast" state={location.state}>
              Cast
            </NavLink>{' '}
          </li>
          <li>
            <NavLink to="reviews" state={location.state}>
              Reviews
            </NavLink>{' '}
          </li>
        </ul>
      </div>
      <Suspense fallback={<Loader />}>
        <Outlet />
      </Suspense>
    </>
  );
};

export default MovieDetails;
