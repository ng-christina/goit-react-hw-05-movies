import style from './Reviews.module.css';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { ApiMoviesService } from 'Api';

const Reviews = () => {
  const { id } = useParams();
  const [reviews, setReviews] = useState(null);

  useEffect(() => {
    ApiMoviesService.getMovieReview(id).then(setReviews);
  }, [id]);

  if (reviews === null) {
    return null;
  }

  return (
    <div>
      {reviews.length !== 0 ? (
        <ul className={style.list}>
          {reviews.map(review => (
            <li key={review.id} className={style.element}>
              <h3 className={style.author}>Author: {review.author} </h3>
              <p className={style.content}>{review.content}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p> We don't have any reviews for this movie</p>
      )}
    </div>
  );
};

export default Reviews;
