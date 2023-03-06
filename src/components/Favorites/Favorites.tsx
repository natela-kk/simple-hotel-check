import { ChangeEvent, useCallback, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useAppDispatch } from '../../hooks';
import { filterFavorites, setFavorite } from '../../store/hotels-data/hotels-data';
import { Hotel } from '../../types/hotel';
import { State } from '../../types/state';
import Card from '../Card/Card';
import styles from './Favorites.module.scss';

type FavoritesProps = {
  favorites: Hotel[],
  filteredFavorites: Hotel[],
  location: string,
  checkInDate: string,
  daysCount: number,
  rating: string,
  price: string,
}

function Favorites({ filteredFavorites, favorites, location, checkInDate, daysCount, rating, price }: FavoritesProps) {

  const dispatch = useAppDispatch();

  const [relevantFavorites, setRelevantFavorites] = useState(filteredFavorites);

  const handleLikeClick = useCallback((e: any) => {
    const id = e.currentTarget.closest('div').dataset.id;
    const small = e.currentTarget.closest('div').dataset.small;
    dispatch(setFavorite({ id, small }));
  }, [dispatch])

  const handleRatingChange = (e: ChangeEvent<HTMLInputElement>) => {
    const rating = e.currentTarget.value;
    dispatch(filterFavorites({ price, rating }));
    setRelevantFavorites(filteredFavorites);
  }

  const handlePriceChange = (e: ChangeEvent<HTMLInputElement>) => {
    const price = e.currentTarget.value;
    dispatch(filterFavorites({ price, rating }));
    setRelevantFavorites(filteredFavorites);
  }

  useEffect(() => {
    if (filteredFavorites.length || rating || price) {
      setRelevantFavorites(filteredFavorites);
    } else {
      setRelevantFavorites(favorites);
    }
  }, [favorites, filteredFavorites, price, rating])


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
          onChange={(e) => {
            handleRatingChange(e);
          }}
        />
        <input
          className={styles.favoritesFilterInput}
          type="number"
          name="price"
          step={1000}
          min={1000}
          max={50000}
          placeholder='Цена'
          onChange={(e) => {
            handlePriceChange(e);
          }}
        />
      </div>
      {relevantFavorites.length ?
        <ul className={styles.favoritesList}>
          {relevantFavorites.map((favorite) => (
            <li className={styles.favoritesItem} key={favorite.hotelId}><Card hotel={favorite} handleLikeClick={handleLikeClick} checkInDate={checkInDate} daysCount={daysCount} isSmall /></li>
          ))}
        </ul> :
        <p className={styles.favoritesEmpty}>Список избранного пуст</p>
      }
    </section>
  );
}

const mapStateToProps = (state: State) => ({
  favorites: state.HOTELS.favorites,
  filteredFavorites: state.HOTELS.filteredFavorites,
  location: state.HOTELS.location,
  checkInDate: state.HOTELS.checkInDate,
  daysCount: state.HOTELS.daysCount,
  rating: state.HOTELS.rating,
  price: state.HOTELS.price,
})

export default connect(mapStateToProps)(Favorites);
