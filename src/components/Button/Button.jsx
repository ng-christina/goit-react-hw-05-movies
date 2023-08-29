import PropTypes from 'prop-types';
import style from './Button.module.css';

export const Btn = ({ onBtnClick }) => {
  return (
    <div className={style.btnContainer}>
      <button className={style.button} type="button" onClick={onBtnClick}>
        Load more
      </button>
    </div>
  );
};

Btn.propTypes = {
  onButtonClick: PropTypes.func,
};
