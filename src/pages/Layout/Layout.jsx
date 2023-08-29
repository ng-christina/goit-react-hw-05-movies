import { Outlet, NavLink } from 'react-router-dom';
import { Suspense } from 'react';
import { Loader } from 'components/Loader/Loader';
import style from './Layout.module.css';
export const Layout = () => {
  return (
    <div className={style.div}>
      <header className={style.header}>
        <nav className={style.nav}>
          <NavLink to="/" end className={style.link}>
            Home
          </NavLink>
          <NavLink to="/movies" className={style.link}>
            Movies
          </NavLink>
        </nav>
      </header>
      <Suspense fallback={<Loader />}>
        <Outlet />
      </Suspense>
    </div>
  );
};
