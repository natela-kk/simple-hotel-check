import React, { FC } from 'react';
import Favorites from '../../components/Favorites/Favorites';
import Header from '../../components/Header/Header';
import MainContent from '../../components/MainContent/MainContent';
import SearchBox from '../../components/SearchBox/SearchBox';
import styles from './Main.module.scss';

interface MainProps { }

const Main: FC<MainProps> = () => (
  <div className={styles.mainWrapper}>
    <Header />
    <main className={styles.main}>
      <h1 className="visually-hidden">Main page</h1>
      <div className={styles.mainLeftBar}>
        <SearchBox />
        <Favorites />
      </div>
      <MainContent />
    </main>
  </div>
);

export default Main;
