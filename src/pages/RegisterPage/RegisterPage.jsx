import React, { Component } from 'react';

import { Formik } from 'formik';
import * as yup from 'yup';

import styles from './RegisterPage.module.scss';

class RegisterPage extends Component {
  state = {
    email: '',
    password: '',
  };

  render() {
    const updateState = values => {
      this.setState({ email: values.email, password: values.password });
    };

    const validationsSchema = yup.object().shape({
      email: yup.string().email('Type correct email').required('Required'),
      password: yup
        .string()
        .typeError('Must be a string')
        .min(6)
        .required('Required'),
      confirmPassword: yup
        .string()
        .oneOf([yup.ref('password')], 'Passwords do not match')
        .required('Required'),
    });

    return (
      <Formik
        initialValues={{
          email: '',
          password: '',
          repeatPassword: '',
        }}
        validateOnBlur
        onSubmit={(values, { resetForm }) => {
          updateState(values);
          resetForm();
        }}
        validationSchema={validationsSchema}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          isValid,
          handleSubmit,
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
            <form className={styles.form} autoComplete="off">
              <h1 className={styles.title}>Registration</h1>
              <label className={styles.labelForm}>
                <input
                  className={styles.inputForm}
                  placeholder=" "
                  type={'email'}
                  name={'email'}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.email}
                />
                <span className={styles.nameInput}>E-mail</span>
                {touched.email && errors.email && (
                  <p className={styles.error}>{errors.email}</p>
                )}
              </label>

              <label className={styles.labelForm}>
                <input
                  className={styles.inputForm}
                  placeholder=" "
                  type={'password'}
                  name={'password'}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.password}
                />
                <span className={styles.nameInput}>Password</span>
                {touched.password && errors.password && (
                  <p className={styles.error}>{errors.password}</p>
                )}
              </label>

              <label className={styles.labelForm}>
                <input
                  className={styles.inputForm}
                  placeholder=" "
                  type={'password'}
                  name={'confirmPassword'}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.confirmPassword}
                />
                <span className={styles.nameInput}>Repeat password</span>
                {touched.confirmPassword && errors.confirmPassword && (
                  <p className={styles.error}>{errors.confirmPassword}</p>
                )}
              </label>

              <button
                className={styles.btnReg}
                disabled={!isValid}
                onClick={handleSubmit}
                type={'submit'}
              >
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
        )}
      </Formik>
    );
  }
}

export default RegisterPage;
