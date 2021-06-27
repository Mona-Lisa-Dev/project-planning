import React from 'react';
import { NavLink } from 'react-router-dom';

import styles from './AppBar.module.scss';

import result from './images/logo.svg';

import routes from 'routes';

import UserBar from 'components/UserBar';

export default function AppBar() {
  // const isAuthenticated = useSelector(getIsAuthenticated); // заготовка под публичные и приватные рауты

  return (
    <header className={styles.header}>
      <NavLink to={routes.signup}>
        <img src={result} alt="companyLogo" className={styles.logo} />
      </NavLink>
      {/* {isAuthenticated && (
        <NavLink to={routes.projects}>
          <img src={result} alt="companyLogo" className={styles.logo} />
        </NavLink> // заготовка под публичные и приватные роуты, на сайте примера залогиненого юзера ведёт на проекты не залогиненого на регистер
      )} */}
      <UserBar />
      {/* Cделать потом  юзер бар только ис аутефинкейтед */}
    </header>
  );
}
