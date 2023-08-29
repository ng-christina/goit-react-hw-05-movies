import { Link, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import { ApiMoviesService } from '../../Api';
import { nanoid } from 'nanoid';
import style from './MovieL.module.css';

export const MovieL = ({ movies }) => {
  const location = useLocation();

  return (
    <ul className={style.ul}>
      {movies.map(movie => {
        const movieId = nanoid();
        return (
          <li className={style.li} key={movieId}>
            <p className={style.p}>
              {movie.title} <span>{movie.vote_average.toFixed(2)}</span>
            </p>
            <Link to={`/movies/${movie.id}`} state={{ from: location }}>
              <img
                className={style.img}
                src={
                  movie.poster_path
                    ? `${ApiMoviesService.BASE_URL}${movie.poster_path}`
                    : ApiMoviesService.defaultImg
                }
                alt={movie.title}
                width="200"
              />
            </Link>
          </li>
        );
      })}
    </ul>
  );
};

MovieL.propTypes = {
  movies: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
    })
  ),
};
