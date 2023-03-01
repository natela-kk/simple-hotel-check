import React, { FC } from 'react';
import styles from './FavoriteItem.module.scss';

interface FavoriteItemProps { }

const FavoriteItem: FC<FavoriteItemProps> = () => (
  <div className={styles.favoriteItem}>
    <h3 className={styles.favoriteItemTitle}>Moscow Marriott Grand Hotel</h3>
    {/* <input
    type="submit"
    >сердечко</input> */}
    <span className={styles.favoriteItemDate}>28 June, 2020  -  1 день</span>
    <div className={styles.favoriteItemStars}>stars</div>
     <span className={styles.favoriteItemPriceTitle}>Price:</span>
     <span className={styles.favoriteItemPriceCount}>23 924 ₽</span>
  </div>
);

export default FavoriteItem;
