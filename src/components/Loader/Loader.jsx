import React from 'react';
import { Vortex } from 'react-loader-spinner';
import style from './Loader.module.css';

export const Loader = () => (
  <div className={style.loader}>
    <Vortex
      visible={true}
      height="150"
      width="150"
      ariaLabel="vortex-loading"
      wrapperStyle={{}}
      wrapperClass="vortex-wrapper"
      colors={['red', 'green', 'blue', 'yellow', 'orange', 'purple']}
    />
  </div>
);
