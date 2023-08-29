import PropTypes from 'prop-types';
import style from './Search.module.css';

export const Search = ({ onSubmit }) => {
  const handleSubmit = e => {
    e.preventDefault();
    const { query } = e.target.elements;
    onSubmit(query.value);
    e.target.reset();
  };

  return (
    <div>
      <form className={style.form} onSubmit={handleSubmit}>
        <label className={style.label}>
          <input className={style.input} type="text" name="query" />
        </label>
        <button type="submit" className={style.btn}>
          Search
        </button>
      </form>
    </div>
  );
};

Search.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
