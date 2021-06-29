import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Formik } from 'formik';
import * as yup from 'yup';
import styles from './LoginPage.module.scss';

import authOperations from 'redux/auth/auth-operations';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();

  const validationSchema = yup.object().shape({
    email: yup.string().email('Type correct email').required('Required'),
    password: yup
      .string()
      .typeError('Must be a string')
      .min(6, 'Wrong password')
      // .matches('/^(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z]).{8,}$/', 'Wrong password')
      .required('Required'),
  });

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

  const handleFormSubmit = e => {
    e.preventDefault();

    const user = { email, password };
    dispatch(authOperations.login(user));

    reset();
  };

  const reset = () => {
    setPassword('');
  };

  return (
    <div>
      <Formik
        initialValues={{
          email: '',
          password: '',
        }}
        validateOnBlur
        onSubmit={(values, { reset }) => {
          handleFormSubmit({ email: values.email, password: values.password });
          reset();
        }}
        validationSchema={validationSchema}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          isValid,
          handleSubmit,
          dirty,
        }) => (
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
                  onBlur={handleBlur}
                  className={styles.inputForm}
                  placeholder=" "
                  type={'email'}
                  name={'email'}
                  onChange={handleChange}
                  value={values.email}
                />
                <span className={styles.nameInput}>E-mail</span>
                {touched.email && errors.email && (
                  <p className={styles.error}>{errors.email}</p>
                )}
              </label>

              <label className={styles.labelForm}>
                <input
                  onBlur={handleBlur}
                  className={styles.inputForm}
                  placeholder=" "
                  type={'password'}
                  name={'password'}
                  onChange={handleChange}
                  value={values.password}
                />
                <span className={styles.nameInput}>Password</span>
                {touched.password && errors.password && (
                  <p className={styles.error}>{errors.password}</p>
                )}
              </label>
              <button
                disabled={!isValid || !dirty}
                onClick={handleSubmit}
                className={styles.btnLog}
                type={'submit'}
              >
                Enter
              </button>
              <div className={styles.login}>
                <p className={styles.question}> No account? </p>
                <a className={styles.auth} href="/users/signup">
                  Register
                </a>
              </div>
            </form>
          </div>
        )}
      </Formik>
    </div>
  );
};

export default LoginPage;
