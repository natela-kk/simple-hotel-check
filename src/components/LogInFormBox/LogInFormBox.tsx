import classNames from 'classnames';
import { ChangeEvent, FormEvent, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppRoute } from '../../AppRoute';
import styles from './LogInFormBox.module.scss';

const LOGIN_REGEXP = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const PASSWORD_REGEXP = /(?=.{8,}$)(?=.*[a-zA-Z0-9])/;

function LogInFormBox() {

  const navigate = useNavigate();
  const passwordRef = useRef<HTMLInputElement | null>(null);
  const loginRef = useRef<HTMLInputElement | null>(null);

  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [invalidLogin, setinvalidLogin] = useState(false);
  const [invalidPassword, setinvalidPassword] = useState(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const password = passwordRef.current;
    const login = loginRef.current;

    if (password && login) {
      const isValidEmail = LOGIN_REGEXP.test(login.value);
      isValidEmail ? setinvalidLogin(false) : setinvalidLogin(true);

      const isValidPassword = PASSWORD_REGEXP.test(password.value);
      isValidPassword ? setinvalidPassword(false) : setinvalidPassword(true);

      if (isValidEmail && isValidPassword) {
        navigate(AppRoute.Main);
        const loginInfo = {
          login: login.value,
          password: password.value,
        }
        localStorage.setItem('loginInfo', JSON.stringify(loginInfo))
      }

    }
  };

  const handleLoginChange = (e: ChangeEvent<HTMLInputElement>) => {
    setLogin(e.target.value);
    setinvalidLogin(false);
    setinvalidPassword(false);
  }


  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.currentTarget.value);
    setinvalidPassword(false);
    setinvalidLogin(false);
  };

  return (
    <section className={styles.loginFormBox}>
      <h1 className={styles.loginFormTitle}>Simple Hotel Check</h1>
      <form
        action='#'
        method='post'
        noValidate
        onSubmit={handleSubmit}
      >
        <div className={classNames(
          styles.loginFormInputWrapper,
          styles.loginFormInputLoginWrapper,
          { [styles.loginFormLoginInvalid]: invalidLogin }
        )}>
          <label className={styles.loginFormLabel} htmlFor="email">Логин</label>
          <input
            className={styles.loginFormInput}
            id="email"
            type="email"
            name="email"
            value={login}
            ref={loginRef}
            required
            onChange={(e) => {
              handleLoginChange(e);
            }}
          />
        </div>
        <div className={classNames(
          styles.loginFormInputWrapper,
          styles.loginFormInputPasswordWrapper,
          { [styles.loginFormPasswordInvalid]: invalidPassword }
        )}>
          <label className={styles.loginFormLabel} htmlFor="password">Пароль</label>
          <input
            className={styles.loginFormInput}
            id="password"
            type="password"
            name="password"
            value={password}
            ref={passwordRef}
            required
            onChange={(e) => {
              handlePasswordChange(e)
            }}
          />
        </div>
        <button
          className={styles.loginFormSubmitBtn}
          type="submit"
        >
          Войти
        </button>
      </form>
    </section >
  );
}

export default LogInFormBox;
