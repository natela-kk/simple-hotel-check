import React, { FC } from 'react';
import styles from './SearchBox.module.scss';

interface SearchBoxProps { }

const SearchBox: FC<SearchBoxProps> = () => (
  <section className={styles.searchBox}>
    <h2 className="visually-hidden">Search parameters</h2>
    <form
      className={styles.searchForm}
      action=''
      method='post'
    // onSubmit={}
    >
      <div className={styles.searchFormInputWrapper}>
        <label className={styles.searchFormLabel}>Локация</label>
        <input
          className={styles.searchFormInput}
          type="text"
          name="location"
          placeholder='Москва'
          required
        />
      </div>
      <div className={styles.searchFormInputWrapper}>
        <label className={styles.searchFormLabel}>Дата заселения</label>
        <input
          className={styles.searchFormInput}
          type="date"
          name="date"
          placeholder='07.07.2020'
          required
        />
      </div>
      <div className={styles.searchFormInputWrapper}>
        <label className={styles.searchFormLabel}>Количество дней</label>
        <input
          className={styles.searchFormInput}
          type="number"
          name="days count"
          placeholder='1'
          required
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

export default SearchBox;
