import React, { FC } from 'react';
import styles from './LogInFormBox.module.scss';

interface LogInFormProps { }

const LogInFormBox: FC<LogInFormProps> = () => (
  <section className={styles.loginFormBox}>
    <h1 className={styles.loginFormTitle}>Simple Hotel Check</h1>
    <form
      // className={styles.loginForm}
      action=''
      method='post'
    // onSubmit={}
    >
      <div className={`${styles.loginFormInputWrapper} ${styles.loginFormInputLoginWrapper}`}>
        <label className={styles.loginFormLabel}>Логин</label>
        <input
          // ref={emailRef}
          className={styles.loginFormInput}
          type="text"
          name="login"
          // placeholder="Email"
          // onChange={handleEmailChange}
          required
        />
      </div>
      <div className={`${styles.loginFormInputWrapper} ${styles.loginFormInputPasswordWrapper}`}>
        <label className={styles.loginFormLabel}>Пароль</label>
        <input
          // ref={passwordRef}
          className={styles.loginFormInput}
          type="password"
          name="password"
          // placeholder="Email"
          // onChange={handlePasswordChange}
          required
        />
      </div>
      <button
        className={styles.loginFormSubmit}
        type="submit"
      >
        Войти
      </button>
    </form>
  </section >
);

export default LogInFormBox;
