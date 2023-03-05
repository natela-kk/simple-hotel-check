import { useAppSelector } from '../../hooks';
import { NameSpace } from '../../store/NameSpace';
import { Hotel } from '../../types/hotel';
import { State } from '../../types/state';
import Card from '../Card/Card';
import styles from './Favorites.module.scss';


function Favorites() {

  const favorites = useAppSelector((state: State): Hotel[] => state[NameSpace.Hotels].favorites);

  return (
    <section className={styles.favorites}>
      <h2 className={styles.favoritesTitle}>Избранное</h2>
      <div className={styles.favoritesFilterWrapper}>
        <input
          className={styles.favoritesFilterInput}
          type="number"
          name="rating"
          step={1}
          min={1}
          max={5}
          placeholder='Рейтинг'
          onChange={()}
        />
        <input
          className={styles.favoritesFilterInput}
          type="number"
          name="price"
          step={1}
          min={1000}
          max={50000}
          placeholder='Цена'
        />
      </div>
      <ul className={styles.favoritesList}>
        {favorites.map((favorite) => (
          <li className={styles.favoritesItem} key={favorite.hotelId}><Card hotel={favorite} isSmall /></li>
        ))}
      </ul>
    </section>
  );
}

export default Favorites;
