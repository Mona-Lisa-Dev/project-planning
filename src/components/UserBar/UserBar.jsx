import { useDispatch, useSelector } from 'react-redux';

// import { logout } from '../../redux/auth/auth-operations';

import authOperations from 'redux/auth/auth-operations';

import { getUserName } from 'redux/auth/auth-selectors';

// import exit from './images/exitIcon.svg';

import styles from './UserBar.module.scss';

export default function UserBar() {
  const dispatch = useDispatch();
  const name = useSelector(getUserName);

  const onLogout = () => dispatch(authOperations.logout());

  return (
    <div className={styles.cont}>
      <p className={styles.user}>{name}</p>
      <button type="button" onClick={onLogout} className={styles.button}>
        <svg
          className={styles.exit}
          width="18px"
          height="18px"
          viewBox="0 0 18 18"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="m15.058 6.3238v-5e-5c0.2159-0.21603 0.5662-0.21607 0.7823 3e-5l1.5744 1.5745c0.6269 0.62683 0.6269 1.647 0 2.2738l-1.5744 1.5744c-0.1081 0.1081-0.2494 0.1621-0.3912 0.1621s-0.283-0.054-0.3911-0.1621c-0.2161-0.2159-0.2161-0.5661 0-0.7821l1.1199-1.1201 0.2561-0.25606h-8.8046c-0.30553 0-0.55313-0.2476-0.55313-0.55312 0-0.30553 0.2476-0.55313 0.55313-0.55313h8.8046l-0.2561-0.25606-1.1199-1.12v-4e-5c-0.2161-0.21593-0.2161-0.56614 0-0.78208zm-2.4809 7.4574v1.4063c0 1.468-1.1945 2.6625-2.6625 2.6625h-7.0664c-1.468 0-2.6625-1.1945-2.6625-2.6625v-12.375c0-1.468 1.1945-2.6625 2.6625-2.6625h7.0664c1.468 0 2.6625 1.1945 2.6625 2.6625v1.4062c0 0.30552-0.2476 0.55312-0.5532 0.55312-0.3055 0-0.5531-0.2476-0.5531-0.55312v-1.4062c0-0.8582-0.698-1.5562-1.5562-1.5562h-7.0664c-0.85821 0-1.5562 0.69805-1.5562 1.5562v12.375c0 0.8582 0.69804 1.5562 1.5562 1.5562h7.0664c0.85824 0 1.5562-0.698 1.5562-1.5562v-1.4063c0-0.3055 0.2476-0.5531 0.5531-0.5531 0.3056 0 0.5532 0.2476 0.5532 0.5531z"
            stroke="#fff"
            strokeWidth=".3"
          />
        </svg>
        Log Out
      </button>
    </div>
  );
}
