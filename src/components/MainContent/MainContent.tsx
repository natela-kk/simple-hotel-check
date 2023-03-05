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


function MainContent() {
  const dispatch = useAppDispatch();

  const hotels = useAppSelector((state: State): Hotel[] => state[NameSpace.Hotels].hotels);
  const location = useAppSelector((state: State): string => state[NameSpace.Hotels].location);
  const checkInDate = useAppSelector((state: State): string => state[NameSpace.Hotels].checkInDate);
  const checkOutDate = useAppSelector((state: State): string => state[NameSpace.Hotels].checkOutDate);

  const [isDragStart, setIsDragStart] = useState(false);
  const [prevPageX, setPrevPageX] = useState(0);
  const [prevSrollLeft, setPrevSrollLeft] = useState(0);

  const images = [
    <img
      src={carousel_1}
      width='164px'
      height='149px'
      alt='carousel item' />,
    <img
      src={carousel_2}
      width='164px'
      height='149px'
      alt='carousel item' />,
    <img
      src={carousel_3}
      width='164px'
      height='149px'
      alt='carousel item' />,
    <img
      src={carousel_4}
      width='164px'
      height='149px'
      alt='carousel item' />
  ]

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

    // console.log(e.currentTarget.children[firstImage].getBoundingClientRect().left)
    // if (positionDiff < -270 || positionDiff > 170) {
    //   setFirstImage(firstImage === images.length - 1 ? 0 : firstImage + 1)
    // }
  }

  // Индекс текущего слайда
  // const [firstImage, setFirstImage] = useState(0);
  // const [firstImageLeft, setfirstImageLeft] = useState(0);

  // Хук Effect
  // useEffect(() => {
  //   setfirstImageLeft()
  // Запускаем интервал
  // setInterval(() => {
  // Меняем состояние
  // setActiveIndex((current: number) => {
  // Вычисляем индекс следующего слайда, который должен вывестись
  // const res = current === images.length - 1 ? 0 : current + 1
  // Возвращаем индекс
  //     return res
  // })
  // }, 3000)
  // Выключаем интервал
  //   return () => clearInterval(0)
  // }, [])

  // Вычисляем индекс предыдущего слайда
  // const firstImage = activeIndex ? activeIndex - 1 : images.length - 1
  // const firstImage = 0;
  // Вычисляем индекс следующего слайда
  // const nextImgIndex = activeIndex === images.length - 1 ? 0 : activeIndex + 1

  useEffect(() => {
    dispatch(fetchHotels(location, checkInDate, checkOutDate));
  }, [checkInDate, checkOutDate, dispatch, location])

  if (hotels.length) {
    return (
      <section className={styles.mainContent}>
        <h2 className='visually-hidden'>Список отелей</h2>
        <div className={styles.mainContentTopWrapper}>
          <ul className={styles.mainContentBreadcrumbs}>
            <li className={styles.mainContentBreadcrumbsItem}>Отели</li>
            <li className={styles.mainContentBreadcrumbsItem}>Москва</li>
          </ul>
          <span className={styles.mainContentDate}>07 июля 2020</span>
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
          {images.map((item, ind) => (
            <li className={styles.mainContentGalleryItem} key={ind}>
              {item}
            </li>
          ))}
        </ul>
        <p className={styles.mainContentFavoritesInfo}>
          Добавлено в Избранное:
          <span className={styles.mainContentFavoritesCount}>3</span>
          отеля
        </p>
        <ul className={styles.mainContentHotelsList}>
          {hotels.map((hotel) => (
            <li className={styles.mainContentHotelsItem} key={hotel.hotelId}>
              <Card hotel={hotel} />
            </li>
          ))}
        </ul>
      </section>
    )
  }
  return <></>;
};

export default MainContent;