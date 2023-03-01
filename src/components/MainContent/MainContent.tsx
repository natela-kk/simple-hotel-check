import React, { FC } from 'react';
import Hotel from '../Hotel/Hotel';
import styles from './MainContent.module.scss';

interface MainContentProps { }

const MainContent: FC<MainContentProps> = () => (
  <section className={styles.mainContent}>
    <h2 className='visually-hidden'>Список отелей</h2>
    <ul className={styles.mainContentBreadcrumbs}>
      <li className={styles.mainContentBreadcrumbsItem}>Отели</li>
      <li className={styles.mainContentBreadcrumbsItem}>Москва</li>
    </ul>
    <span className={styles.mainContentDate}>07 июля 2020</span>
    <div className={styles.mainContentGallery}></div>
    <p className={styles.mainContentFavoritesInfo}>Добавлено в Избранное:  
      <span className={styles.mainContentFavoritesCount}>3</span> отеля</p>
    <ul className={styles.mainContentHotelsList}>
      <li className={styles.mainContentHotelsItem}>
        <Hotel />
      </li>
      <li className={styles.mainContentHotelsItem}>
        <Hotel />
      </li>
      <li className={styles.mainContentHotelsItem}>
        <Hotel />
      </li>
      <li className={styles.mainContentHotelsItem}>
        <Hotel />
      </li>
      <li className={styles.mainContentHotelsItem}>
        <Hotel />
      </li>
    </ul>
  </section>
);

export default MainContent;
