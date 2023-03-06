import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import styles from './MainContent.module.scss';
import carousel_1 from '../../images/carousel/carousel_1.jpg';
import carousel_2 from '../../images/carousel/carousel_2.jpg';
import carousel_3 from '../../images/carousel/carousel_3.jpg';
import carousel_4 from '../../images/carousel/carousel_4.jpg';
import Card from '../Card/Card';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { State } from '../../types/state';
import { Hotel } from '../../types/hotel';
import { NameSpace } from '../../store/NameSpace';
import { fetchHotels } from '../../store/api-actions';
import { setFavorite } from '../../store/hotels-data/hotels-data';
import { getTitleDate } from '../../utils/date-functions';


function MainContent() {
  const dispatch = useAppDispatch();

  const hotelsDoubles = useAppSelector((state: State): Hotel[] => state[NameSpace.Hotels].hotelsDoubles);
  const favorites = useAppSelector((state: State): Hotel[] => state[NameSpace.Hotels].favorites);
  const location = useAppSelector((state: State): string => state[NameSpace.Hotels].location);
  const checkInDate = useAppSelector((state: State): string => state[NameSpace.Hotels].checkInDate);
  const checkOutDate = useAppSelector((state: State): string => state[NameSpace.Hotels].checkOutDate);
  const daysCount = useAppSelector((state: State): number => state[NameSpace.Hotels].daysCount);

  const [isDragStart, setIsDragStart] = useState(false);
  const [prevPageX, setPrevPageX] = useState(0);
  const [prevSrollLeft, setPrevSrollLeft] = useState(0);

  const handleLikeClick = (hotel: Hotel, isSmall: Boolean | undefined) => {
    dispatch(setFavorite({ hotel, isSmall }));
    console.log('like');
  }

  const handleDrag = (e: React.MouseEvent<HTMLUListElement, MouseEvent>) => {
    e.preventDefault();
    setIsDragStart(true);
    setPrevPageX(e.pageX);
    setPrevSrollLeft(e.currentTarget.scrollLeft);
  }

  const handleCouruselTouchEnd = () => {
    setIsDragStart(false);
  }

  const handleMouseMove = (e: React.MouseEvent<HTMLUListElement, MouseEvent>) => {
    if (!isDragStart) return;
    e.preventDefault();
    let positionDiff = e.pageX - prevPageX;
    e.currentTarget.scrollLeft = prevSrollLeft - positionDiff;
  }

  useEffect(() => {
    dispatch(fetchHotels(location, checkInDate, checkOutDate));
  }, [checkInDate, checkOutDate, dispatch, location])

  return (
    <section className={styles.mainContent}>
      <h2 className='visually-hidden'>Список отелей</h2>
      <div className={styles.mainContentTopWrapper}>
        <ul className={styles.mainContentBreadcrumbs}>
          <li className={styles.mainContentBreadcrumbsItem}>Отели</li>
          <li className={styles.mainContentBreadcrumbsItem}>{location}</li>
        </ul>
        <span className={styles.mainContentDate}>{getTitleDate(new Date(checkInDate))}</span>
      </div>
      <ul
        className={classNames(
          styles.mainContentCourusel,
          { [styles.mainContentCourusel__active]: isDragStart }
        )}
        onMouseDown={(e) => {
          handleDrag(e)
        }}
        onMouseUp={handleCouruselTouchEnd}
        onMouseMove={(e) => {
          handleMouseMove(e)
        }}
        onMouseLeave={handleCouruselTouchEnd}
      >
        <li className={styles.mainContentGalleryItem}>
          <img
            src={carousel_1}
            width='164px'
            height='149px'
            alt='carousel item' />
        </li>
        <li className={styles.mainContentGalleryItem}>
          <img
            src={carousel_2}
            width='164px'
            height='149px'
            alt='carousel item' />
        </li>
        <li className={styles.mainContentGalleryItem}>
          <img
            src={carousel_3}
            width='164px'
            height='149px'
            alt='carousel item' />
        </li>
        <li className={styles.mainContentGalleryItem}>
          <img
            src={carousel_4}
            width='164px'
            height='149px'
            alt='carousel item' />
        </li>
      </ul>
      <p className={styles.mainContentFavoritesInfo}>
        Добавлено в Избранное:
        <span className={styles.mainContentFavoritesCount}>{favorites.length}</span>
        отеля
      </p>
      {hotelsDoubles.length ?
        <ul className={styles.mainContentHotelsList}>
          {hotelsDoubles.map((hotel) => (
            <li className={styles.mainContentHotelsItem} key={hotel.hotelId}>
              <Card hotel={hotel} handleLikeClick={handleLikeClick} checkInDate={checkInDate} daysCount={daysCount} />
            </li>
          ))}
        </ul> : <></>}
    </section>
  )
};


export default MainContent;