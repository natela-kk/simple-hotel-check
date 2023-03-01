import React, { FC } from 'react';
import styles from './Hotel.module.scss';

interface HotelProps {}

const Hotel: FC<HotelProps> = () => (
  <div className={styles.hotel}>
    <h3 className={styles.hotelTitle}>Moscow Marriott Grand Hotel</h3>
    <span className={styles.hotelDate}>7 июля 2020</span>
    <span className={styles.hotelDaysCount}>-  1 день</span>
    <div>сердечки</div>
     <span className={styles.hotelPriceTitle}>Price:</span>
     <span className={styles.hotelPriceCount}>23 924 ₽</span>
  </div>
);

export default Hotel;
