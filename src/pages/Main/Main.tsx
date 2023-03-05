import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppRoute } from '../../AppRoute';
import Favorites from '../../components/Favorites/Favorites';
import Header from '../../components/Header/Header';
import MainContent from '../../components/MainContent/MainContent';
import SearchBox from '../../components/SearchBox/SearchBox';
import styles from './Main.module.scss';


function Main() {
  const navigate = useNavigate();
  const loginInfo = localStorage.getItem('loginInfo');

  console.log(loginInfo);

  useEffect(() => {
    if(!loginInfo) {
      navigate(AppRoute.LogIn);
    }
  })

  if (!loginInfo) {
    return <></>;
  }

  return (
    <div className={styles.mainContainer}>
      <Header />
      <div className={styles.mainWrapper}>
        <main className={styles.main}>
          <h1 className="visually-hidden">Main page</h1>
          <div className={styles.mainLeftBar}>
            <SearchBox />
            <Favorites />
          </div>
          <MainContent />
        </main>
      </div>
    </div>
  );
}

export default Main;
