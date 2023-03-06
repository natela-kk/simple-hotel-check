import { useNavigate } from 'react-router-dom';
import { AppRoute } from '../../AppRoute';
import styles from './Header.module.scss';


function Header() {

  const navigate = useNavigate();

  const handleClick = () => {
    localStorage.clear();
    navigate(AppRoute.LogIn);
  }

  return (
    <header className={styles.header}>
      <h1 className={styles.headerTitle}>Simple Hotel Check</h1>
      <button
        className={styles.headerLogoutButton}
        type='button'
        onClick={handleClick}
      >Выйти</button>
    </header>
  );
}

export default Header;
