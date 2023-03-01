import React, { FC } from 'react';
import FavoriteItem from '../FavoriteItem/FavoriteItem';
import styles from './Favorites.module.scss';

interface FavoritesProps { }

const Favorites: FC<FavoritesProps> = () => (
  <section className={styles.favorites}>
    <h2 className={styles.favoritesTitle}>Избранное</h2>
    <div className='favoritesFilterWrapper'>
      <input
        className='favoritesFilter'
        type="number"
        name="rating"
        step="1"
        placeholder='Рейтинг'
      />
      <input
        className='favoritesFilter'
        type="number"
        name="price"
        step="1"
        placeholder='Цена'
      />
    </div>
    <ul className={styles.favoritesList}>
      <li className={styles.favoritesItem}><FavoriteItem /></li>
      <li className={styles.favoritesItem}><FavoriteItem /></li>
      <li className={styles.favoritesItem}><FavoriteItem /></li>
    </ul>
  </section>
);

export default Favorites;
