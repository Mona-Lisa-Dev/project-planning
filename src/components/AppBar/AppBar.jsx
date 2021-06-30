import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';

import UserBar from 'components/UserBar';
import { getIsAuthenticated } from 'redux/auth/auth-selectors';
import routes from 'routes';

import result from './images/logo.svg';
import styles from './AppBar.module.scss';

export default function AppBar() {
  const isAuthorized = useSelector(getIsAuthenticated);

  return (
    <header className={styles.header}>
      <NavLink to={isAuthorized ? routes.projects : routes.signup}>
        <img src={result} alt="companyLogo" className={styles.logo} />
      </NavLink>

      {/* {isAuthenticated && (
        <NavLink to={routes.projects}>
          <img src={result} alt="companyLogo" className={styles.logo} />
        </NavLink> // заготовка под публичные и приватные роуты, на сайте примера залогиненого юзера ведёт на проекты не залогиненого на регистер
      )} */}

      {isAuthorized && <UserBar />}
      {/* Cделать потом  юзер бар только ис аутефинкейтед */}
    </header>
  );
}
