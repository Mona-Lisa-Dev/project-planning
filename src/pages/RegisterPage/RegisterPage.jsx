import { useState, useEffect } from 'react';

import Spinner from 'components/Loader/Loader';
import { useDispatch, useSelector } from 'react-redux';

import authOperations from 'redux/auth/auth-operations';

import { getLoadingUser, getErrorSignup } from 'redux/auth/auth-selectors';

import styles from './RegisterPage.module.scss';
import swal from 'sweetalert';

const RegisterPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [confirmPassword, setConfirmPassword] = useState('');
  const [emailDirty, setEmailDirty] = useState(false);
  const [passwordDirty, setPasswordDirty] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] =
    useState('Empty field');
  const [confirmPasswordDirty, setConfirmPasswordDirty] = useState(false);
  const [validPassword, setValidPassword] = useState(false);
  const [validForm, setValidForm] = useState(false);

  const loading = useSelector(getLoadingUser);
  const Error = useSelector(getErrorSignup);

  const dispatch = useDispatch();

  useEffect(() => {
    Error &&
      swal({
        text: `${Error}`,
        icon: 'error',
        button: { text: 'OK', className: `${styles.swalButton}` },
      });
    setValidForm(false);
  }, [Error]);

  useEffect(() => {
    if (emailError || passwordError || confirmPasswordError || !validPassword) {
      setValidForm(false);
      return;
    }
    setValidForm(true);
  }, [emailError, passwordError, validPassword, confirmPasswordError]);

  const handleChange = event => {
    const { name, value } = event.currentTarget;

    switch (name) {
      case 'email':
        setEmail(value);
        const re =
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (!re.test(String(email).toLowerCase())) {
          setEmailError('');
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

      case 'confirmPassword':
        setConfirmPassword(value);
        if (value !== password) {
          setValidPassword(false);
          setConfirmPasswordError('Passwords do not match');
        } else {
          setValidPassword(true);
          setConfirmPasswordError('');
        }
        break;

      default:
        return;
    }
  };

  const handleFormSubmit = event => {
    event.preventDefault();

    const user = { email, password };
    dispatch(authOperations.signup(user));

    reset();
  };

  const reset = () => {
    setEmail('');
    setPassword('');
    setConfirmPassword('');
  };

  const blurHandler = event => {
    switch (event.currentTarget.name) {
      case 'email':
        setEmailDirty(true);
        break;

      case 'password':
        setPasswordDirty(true);
        break;

      case 'confirmPassword':
        setConfirmPasswordDirty(true);
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
        <h1 className={styles.title}>Registration</h1>
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
            value={password}
            required
          />
          <span className={styles.nameInput}>Password</span>
          {passwordDirty && passwordError && (
            <p className={styles.error}>{passwordError}</p>
          )}
        </label>

        <label className={styles.labelForm}>
          <input
            className={styles.inputForm}
            placeholder=" "
            type={'password'}
            name={'confirmPassword'}
            onChange={handleChange}
            onBlur={blurHandler}
            value={confirmPassword}
            required
          />
          <span className={styles.nameInput}>Repeat password</span>
          {confirmPasswordDirty && confirmPasswordError && validPassword && (
            <p className={styles.error}>{confirmPasswordError}</p>
          )}
        </label>

        <button disabled={!validForm} className={styles.btnReg} type={'submit'}>
          Register
        </button>

        {loading && <Spinner />}

        <div className={styles.login}>
          <p className={styles.question}> Do you have an account?</p>
          <a className={styles.auth} href="/login">
            Log in
          </a>
        </div>
      </form>
    </div>
  );
};

export default RegisterPage;
