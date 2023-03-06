import React, { useCallback, useEffect, useState } from 'react';
import classNames from 'classnames';
import { connect } from 'react-redux';
import styles from './MainContent.module.scss';
import carousel_1 from '../../images/carousel/carousel_1.jpg';
import carousel_2 from '../../images/carousel/carousel_2.jpg';
import carousel_3 from '../../images/carousel/carousel_3.jpg';
import carousel_4 from '../../images/carousel/carousel_4.jpg';
import Card from '../Card/Card';
import Alert from '../Alert/Alert';
import { useAppDispatch } from '../../hooks';
import { State } from '../../types/state';
import { Hotel } from '../../types/hotel';
import { requestHotelsAction } from '../../store/api-actions';
import { setFavorite } from '../../store/hotels-data/hotels-data';
import { getTitleDate } from '../../utils/date-functions';

type MainContentProps = {
  hotelsDoubles: Hotel[],
  favorites: Hotel[],
  location: string,
  checkInDate: string,
  checkOutDate: string,
  daysCount: number,
  alert: Boolean;
}

function MainContent({ hotelsDoubles, favorites, location, checkInDate, checkOutDate, daysCount, alert }: MainContentProps) {
  const dispatch = useAppDispatch();

  const [isDragStart, setIsDragStart] = useState(false);
  const [prevPageX, setPrevPageX] = useState(0);
  const [prevSrollLeft, setPrevSrollLeft] = useState(0);

  const handleLikeClick = useCallback((e: any) => {
    const id = e.currentTarget.closest('div').dataset.id;
    const small = e.currentTarget.closest('div').dataset.small;
    dispatch(setFavorite({ id, small }));
  }, [dispatch])

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
    console.log(requestHotelsAction);
    dispatch(requestHotelsAction());
    // dispatch(fetchHotels(location, checkInDate, checkOutDate));
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
      {alert ?
        <Alert text={'Что-то пошло не так'} /> :
        <ul className={styles.mainContentHotelsList}>
          {hotelsDoubles.map((hotel) => (
            <li className={styles.mainContentHotelsItem} key={hotel.hotelId}>
              <Card hotel={hotel} handleLikeClick={handleLikeClick} checkInDate={checkInDate} daysCount={daysCount} />
            </li>
          ))}
        </ul>
      }
    </section>
  )
};

const mapDispatchToProps = {

}

const mapStateToProps = (state: State) => ({
  hotelsDoubles: state.HOTELS.hotelsDoubles,
  favorites: state.HOTELS.favorites,
  location: state.HOTELS.location,
  checkInDate: state.HOTELS.checkInDate,
  checkOutDate: state.HOTELS.checkOutDate,
  daysCount: state.HOTELS.daysCount,
  alert: state.ERROR.alert
})

export default connect(mapStateToProps, mapDispatchToProps)(MainContent);