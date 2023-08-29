import { useState, useEffect } from 'react';
import { ApiMoviesService } from 'Api';
import { useParams } from 'react-router-dom';
import style from './Cast.module.css';

const Cast = () => {
  const { id } = useParams();
  const [castList, setCastList] = useState([]);

  useEffect(() => {
    ApiMoviesService.getMovieCast(id).then(setCastList);
  }, [id]);

  if (castList.length === 0) {
    return <p>No cast info available for this movie</p>;
  }

  return (
    <div className={style.div}>
      <ul className={style.ul}>
        {castList.map(el => (
          <li key={el.id} className={style.li}>
            <figure className={style.figure}>
              <img
                src={
                  el.profile_path
                    ? `${ApiMoviesService.BASE_URL}${el.profile_path}`
                    : ApiMoviesService.defaultImg
                }
                alt={el.name}
                className={style.img}
              />
              <figcaption className={style.description}>
                <p className={style.name}>{el.name}</p>
                <p className={style.character}>Character: {el.character}</p>
              </figcaption>
            </figure>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Cast;
