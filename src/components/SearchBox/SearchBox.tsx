import { useState } from 'react';
import { useAppDispatch } from '../../hooks';
import { fetchHotels } from '../../store/api-actions';
import { setCheckInDate, setCheckOutDate, setDaysCountState, setLocationState } from '../../store/hotels-data/hotels-data';
import { getCheckOutDate, getDate } from '../../utils/date-functions';
import styles from './SearchBox.module.scss';


function SearchBox() {

  const dispatch = useAppDispatch();

  const [location, setLocation] = useState('Москва');
  const [daysCount, setDaysCount] = useState('1');
  const [checkIn, setCheckIn] = useState(getDate(new Date()));


  const handleSubmit = (e: { preventDefault: () => void; }) => {
    const checkOut = getCheckOutDate(checkIn, daysCount);
    e.preventDefault();
    console.log('submit');
    dispatch(setLocationState(location));
    dispatch(setCheckInDate(checkIn));
    dispatch(setCheckOutDate(checkOut));
    dispatch(setDaysCountState(daysCount));
    dispatch(fetchHotels(location, checkIn, checkOut));
  }

  return (
    <section className={styles.searchBox}>
      <h2 className="visually-hidden">Search parameters</h2>
      <form
        className={styles.searchForm}
        action=''
        method='post'
        onSubmit={handleSubmit}
      >
        <div className={styles.searchFormInputWrapper}>
          <label className={styles.searchFormLabel}>Локация</label>
          <input
            className={styles.searchFormInput}
            type="text"
            name="location"
            value={location}
            required
            onChange={(e) => {
              setLocation(e.currentTarget.value)
            }}
          />
        </div>
        <div className={styles.searchFormInputWrapper}>
          <label className={styles.searchFormLabel}>Дата заселения</label>
          <input
            className={styles.searchFormInput}
            type="date"
            name="date"
            value={checkIn}
            onChange={(e) => {
              setCheckIn(e.currentTarget.value)
            }}
            required
          />
        </div>
        <div className={styles.searchFormInputWrapper}>
          <label className={styles.searchFormLabel}>Количество дней</label>
          <input
            className={styles.searchFormInput}
            type="number"
            name="days count"
            value={daysCount}
            min={1}
            max={31}
            required
            onChange={(e) => {
              setDaysCount(e.currentTarget.value)
            }}
          />
        </div>
        <button
          className={styles.loginFormSubmitBtn}
          type="submit"
        >
          Найти
        </button>
      </form>
    </section>
  );
}

export default SearchBox;
