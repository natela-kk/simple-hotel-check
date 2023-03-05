import styles from './Card.module.scss';
import classNames from 'classnames';
import { useEffect, useState } from 'react';
import { Hotel } from '../../types/hotel';
import { setFavorite } from '../../store/hotels-data/hotels-data';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { State } from '../../types/state';
import { NameSpace } from '../../store/NameSpace';
// import dayjs from 'dayjs';

type CardProps = {
  hotel: Hotel;
  isSmall?: boolean
}

const getDate = (date: { toLocaleString: (arg0: string, arg1: { readonly year: "numeric"; readonly month: "long"; readonly day: "numeric"; }) => any; }) => {
  return date.toLocaleString("ru", options);
}

const options = {
  year: 'numeric',
  month: 'long',
  day: 'numeric'
} as const;


function Card({ hotel, isSmall }: CardProps) {
  const dispatch = useAppDispatch();
  const checkInDate = useAppSelector((state: State): string => state[NameSpace.Hotels].checkInDate);
  const daysCount = useAppSelector((state: State): number => state[NameSpace.Hotels].daysCount);

  const { hotelName, hotelId, location: { name: city }, priceFrom, stars } = hotel;

  const [like, setLike] = useState(false);

  const handleClick = () => {
    like ? setLike(false) : setLike(true);
    dispatch(setFavorite({ hotel, isSmall }));
    console.log('like');
  }

  const getDaysCount = () => {
    const remainder = daysCount % 10;

    if (remainder === 1 && daysCount !== 11) return `${daysCount} день`;
    else if (remainder > 1 && remainder < 5 && (daysCount < 10 || daysCount > 20)) return `${daysCount} дня`;
    else if ((daysCount > 4 && daysCount < 21) || remainder === 0 || (remainder > 4 && remainder < 10)) return `${daysCount} дней`;
  }

  useEffect(() => {
    if (isSmall) { setLike(true) }
  }, [isSmall])

  return (
    <div className={styles.card}>
      <div className={styles.cardTopWrapper}>
        <h3 className={styles.cardTitle}>{hotelName}</h3>
        <button
          className={classNames(
            styles.cardLikeButton,
            { [styles.cardLikeButton_active]: like }
          )}
          type="button"
          onClick={handleClick}
        >
          <svg width="23" height="20" viewBox="0 0 23 20" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path d="M20.3807 2.59133C19.8676 2.08683 19.2583 1.68663 18.5878 1.41358C17.9172 1.14054 17.1985 1 16.4727 1C15.7468 1 15.0281 1.14054 14.3576 1.41358C13.687 1.68663 13.0778 2.08683 12.5646 2.59133L11.4997 3.63785L10.4348 2.59133C9.39834 1.57276 7.99258 1.00053 6.52679 1.00053C5.06099 1.00053 3.65523 1.57276 2.61876 2.59133C1.58229 3.6099 1 4.99139 1 6.43187C1 7.87235 1.58229 9.25383 2.61876 10.2724L3.68367 11.3189L11.4997 19L19.3158 11.3189L20.3807 10.2724C20.8941 9.76814 21.3013 9.16942 21.5791 8.51045C21.857 7.85148 22 7.14517 22 6.43187C22 5.71857 21.857 5.01225 21.5791 4.35328C21.3013 3.69431 20.8941 3.09559 20.3807 2.59133Z" fill="currentColor" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>
      <div className={styles.cardDateWrapper}>
        <span className={styles.cardDate}>{getDate(new Date(checkInDate))}</span>
        <b
          className={classNames(
            styles.cardDateCount,
            { [styles.cardDateCount__favorite]: isSmall }
          )}>
          {getDaysCount()}</b>
      </div>
      <div className={styles.cardBottomWrapper}>
        <div className={classNames(
          styles.cardRating,
          { [styles.cardRating__favorite]: isSmall }
        )}>
          <span style={{ width: `${Math.round(stars) / 5 * 100}%` }}></span>
          <span className="visually-hidden">Rating</span>
        </div>
        <span className={classNames(
          styles.cardPrice,
          { [styles.cardPrice__favorite]: isSmall }
        )}>
          Price:
          <b className={styles.cardPriceValue}>{priceFrom}</b>
        </span>
      </div>
    </div>
  );
}

export default Card;
