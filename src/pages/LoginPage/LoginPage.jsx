import { useState, useEffect } from 'react';
import Spinner from 'components/Loader/Loader';
import { useDispatch, useSelector } from 'react-redux';
import authOperations from 'redux/auth/auth-operations';

import { getLoadingUser } from 'redux/auth/auth-selectors';

import styles from './LoginPage.module.scss';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [emailDirty, setEmailDirty] = useState(false);
  const [passwordDirty, setPasswordDirty] = useState(false);
  const [emailError, setEmailError] = useState('Empty field');
  const [passwordError, setPasswordError] = useState('Empty field');
  const [validForm, setValidForm] = useState(false);

  const loading = useSelector(getLoadingUser);

  const dispatch = useDispatch();

  useEffect(() => {
    if (emailError || passwordError) {
      setValidForm(false);
    } else {
      setValidForm(true);
    }
  }, [emailError, passwordError]);

  const handleChange = event => {
    const { name, value } = event.currentTarget;

    switch (name) {
      case 'email':
        setEmail(value);
        const re =
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (!re.test(String(email).toLowerCase())) {
          setEmailError('Error');
        } else {
          setEmailError('');
        }
        break;

      case 'password':
        setPassword(value);
        if (
          event.currentTarget.value.length < 3 ||
          event.currentTarget.value.length > 8
        ) {
          setPasswordError('Wrong password');
        } else {
          setPasswordError('');
        }
        break;

      default:
        return;
    }
  };

  const handleFormSubmit = e => {
    e.preventDefault();

    const user = { email, password };
    dispatch(authOperations.login(user));

    reset();
  };

  const reset = () => {
    setPassword('');
  };

  const blurHandler = event => {
    switch (event.currentTarget.name) {
      case 'email':
        setEmailDirty(true);
        break;

      case 'password':
        setPasswordDirty(true);
        break;

      default:
        return;
    }
  };

  return (
    <div className={styles.backgroundMain}>
      <div className={styles.registration}>
        <div className={`${styles.general} ${styles.ellipse1}`}></div>
        <div className={`${styles.general} ${styles.ellipse2}`}></div>
        <div className={`${styles.general} ${styles.ellipse3}`}></div>
        <div className={`${styles.general} ${styles.ellipse4}`}></div>
        <div className={`${styles.general} ${styles.ellipse5}`}></div>
        <div className={`${styles.general} ${styles.ellipse6}`}></div>
        <div className={`${styles.general} ${styles.ellipse7}`}></div>
        <div className={`${styles.general} ${styles.ellipse8}`}></div>
        <div className={`${styles.general} ${styles.ellipse9}`}></div>
        <div className={`${styles.general} ${styles.ellipse10}`}></div>
      </div>
      <form
        onSubmit={handleFormSubmit}
        className={styles.form}
        autoComplete="off"
      >
        <h1 className={styles.title}>Enter</h1>
        <label className={styles.labelForm}>
          <input
            className={styles.inputForm}
            placeholder=" "
            type={'email'}
            name={'email'}
            onChange={handleChange}
            onBlur={blurHandler}
            value={email}
            required
          />
          <span className={styles.nameInput}>E-mail</span>
          {emailDirty && emailError && (
            <p className={styles.error}>{emailError}</p>
          )}
        </label>
        <label className={styles.labelForm}>
          <input
            className={styles.inputForm}
            placeholder=" "
            type={'password'}
            name={'password'}
            onChange={handleChange}
            onBlur={blurHandler}
            values={password}
            required
          />
          <span className={styles.nameInput}>Password</span>
          {passwordDirty && passwordError && (
            <p className={styles.error}>{passwordError}</p>
          )}
        </label>
        <button className={styles.btnLog} type={'submit'} disabled={!validForm}>
          Enter
        </button>

        {loading && <Spinner />}

        <div className={styles.login}>
          <p className={styles.question}> No account? </p>
          <a className={styles.auth} href="/users/signup">
            Register
          </a>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
