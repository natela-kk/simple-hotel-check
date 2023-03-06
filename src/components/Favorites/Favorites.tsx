import { ChangeEvent, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { filterFavorites, setFavorite } from '../../store/hotels-data/hotels-data';
import { NameSpace } from '../../store/NameSpace';
import { Hotel } from '../../types/hotel';
import { State } from '../../types/state';
import Card from '../Card/Card';
import styles from './Favorites.module.scss';


function Favorites() {

  const dispatch = useAppDispatch();
  const favorites = useAppSelector((state: State): Hotel[] => state[NameSpace.Hotels].favorites);
  const filteredFavorites = useAppSelector((state: State): Hotel[] => state[NameSpace.Hotels].filteredFavorites);
  const checkInDate = useAppSelector((state: State): string => state[NameSpace.Hotels].checkInDate);
  const daysCount = useAppSelector((state: State): number => state[NameSpace.Hotels].daysCount);
  const rating = useAppSelector((state: State): string => state[NameSpace.Hotels].rating);
  const price = useAppSelector((state: State): string => state[NameSpace.Hotels].price);

  const [relevantFavorites, setRelevantFavorites] = useState(filteredFavorites);

  const handleLikeClick = (hotel: Hotel, isSmall: Boolean | undefined) => {
    dispatch(setFavorite({ hotel, isSmall }));
  }

  const handleRatingChange = (e: ChangeEvent<HTMLInputElement>) => {
    const rating = e.currentTarget.value;
    dispatch(filterFavorites({price, rating}));
    setRelevantFavorites(filteredFavorites);
  }

  const handlePriceChange = (e: ChangeEvent<HTMLInputElement>) => {
    const price = e.currentTarget.value;
    dispatch(filterFavorites({price, rating}));
    setRelevantFavorites(filteredFavorites);
  }

  useEffect(() => {
    if (filteredFavorites.length || rating || price) {
      console.log(filteredFavorites);
      console.log(40);
      setRelevantFavorites(filteredFavorites);
    } else {
      console.log(43);
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

export default Favorites;
