import { useState } from 'react';

import styles from './RegisterPage.module.scss';

const RegisterPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleChange = event => {
    const { name, value } = event.currentTarget;

    switch (name) {
      case 'email':
        setEmail(value);
        break;

      case 'password':
        setPassword(value);
        break;

      default:
        return;
    }
  };

  const handleFormSubmit = event => {
    event.preventDefault();

    // const user = { email, password };
    // dispatch(authOperations.signUp(user));

    // setNeedVerify(true);

    reset();
  };

  const reset = () => {
    setEmail('');
    setPassword('');
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
            value={email}
          />
          <span className={styles.nameInput}>E-mail</span>
        </label>

        <label className={styles.labelForm}>
          <input
            className={styles.inputForm}
            placeholder=" "
            type={'password'}
            name={'password'}
            onChange={handleChange}
            value={password}
          />
          <span className={styles.nameInput}>Password</span>
        </label>

        <label className={styles.labelForm}>
          <input
            className={styles.inputForm}
            placeholder=" "
            type={'password'}
            name={'confirmPassword'}
            onChange={handleChange}
            pattern="^[a-z0-9_-]{7,18}$"
            // value={confirmPassword}
          />
          <span className={styles.nameInput}>Repeat password</span>
        </label>

        <button className={styles.btnReg} type={'submit'}>
          Register
        </button>
        <div className={styles.login}>
          <p className={styles.question}> Do you have an account?</p>
          <a className={styles.auth} href="users/login">
            Log in
          </a>
        </div>
      </form>
    </div>
  );
};

export default RegisterPage;
