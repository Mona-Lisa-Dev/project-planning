import React from 'react';
// import { useDispatch, useSelector } from 'react-redux';

import exit from './images/exitIcon.svg';

import styles from './UserBar.module.scss';

export default function UserBar() {
  //   const dispatch = useDispatch();
  //   const email = useSelector(); // заготовка под получение имени\мыла юзвера
  const onLogout = () => {
    console.log('Dont click on me!');
  };

  return (
    <div className={styles.cont}>
      <p className={styles.user}>Username</p>
      <button type="button" onClick={onLogout} className={styles.button}>
        <img
          src={exit}
          alt=""
          width="18px"
          height="18px"
          className={styles.exit}
        />
        Log Out
      </button>
    </div>
  );
}
