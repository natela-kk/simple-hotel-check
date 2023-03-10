import { createSlice } from '@reduxjs/toolkit';
import { Hotel } from '../../types/hotel';
import { getCheckOutDate, getDate } from '../../utils/date-functions';
import { NameSpace } from '../NameSpace';

type InitialState = {
    hotels: Hotel[],
    hotelsDoubles: Hotel[],
    favorites: Hotel[],
    filteredFavorites: Hotel[],
    location: string
    checkInDate: string,
    checkOutDate: string,
    daysCount: number,
    rating: string,
    price: string,
}

const initialState: InitialState = {
    hotels: [],
    hotelsDoubles: [],
    favorites: [],
    filteredFavorites: [],
    location: 'Москва',
    checkInDate: getDate(new Date()),
    checkOutDate: getCheckOutDate(getDate(new Date()), '1'),
    daysCount: 1,
    rating: '',
    price: '',
};

export const hotelsData = createSlice({
    name: NameSpace.Hotels,
    initialState,
    reducers: {
        setHotels: (state, action) => {
            state.hotels = action.payload;
        },
        setHotelsDoubles: (state) => {
            state.hotelsDoubles = state.hotels.map((hotel: Hotel) => {
                return hotel = { ...hotel, isFavorite: false }
            })
            state.hotelsDoubles.forEach((hotel, ind) => {
                const favoriteIndex = state.favorites.findIndex((favoriteHotel) => favoriteHotel.hotelId === hotel.hotelId);
                if (favoriteIndex !== -1) {
                    state.hotelsDoubles = [
                        ...state.hotelsDoubles.slice(0, ind),
                        { ...state.hotelsDoubles[ind], isFavorite: true },
                        ...state.hotelsDoubles.slice(ind + 1,),
                    ]
                }
            })
        },
        setFavorite: (state, action) => {
            const id = +action.payload.id;
            const small = action.payload.small ? true : false;

            const updatedHotelIndexInFav = state.favorites.findIndex((hotel) => hotel.hotelId === id);
            const updatedHotelIndexInHotels = state.hotelsDoubles.findIndex((hotel) => hotel.hotelId === id);

            if (updatedHotelIndexInFav !== -1 || small) {
                const dislikedHotel = { ...state.favorites[updatedHotelIndexInFav], isFavorite: false };
                state.favorites[updatedHotelIndexInFav] = dislikedHotel;
                state.favorites = state.favorites.filter((hotel) => hotel.hotelId !== id)
                if (!small || (updatedHotelIndexInHotels !== -1 && small)) {
                    state.hotelsDoubles = [
                        ...state.hotelsDoubles.slice(0, updatedHotelIndexInHotels),
                        dislikedHotel,
                        ...state.hotelsDoubles.slice(updatedHotelIndexInHotels + 1,),
                    ]
                }
            } else {
                const likedHotel = { ...state.hotelsDoubles[updatedHotelIndexInHotels], isFavorite: true };
                state.favorites = [
                    ...state.favorites, likedHotel
                ]
                state.hotelsDoubles = [
                    ...state.hotelsDoubles.slice(0, updatedHotelIndexInHotels),
                    likedHotel,
                    ...state.hotelsDoubles.slice(updatedHotelIndexInHotels + 1,),
                ]
            }

            if (state.rating && !state.price) state.filteredFavorites = state.favorites.filter(({ stars }) => stars === +state.rating);
            else if (state.price && !state.rating) state.filteredFavorites = state.favorites.filter(({ priceFrom }) => priceFrom <= +state.price);
            else if (state.rating && state.price) {
                state.filteredFavorites = state.favorites
                    .filter(({ stars }) => stars === +state.rating)
                    .filter(({ priceFrom }) => priceFrom <= +state.price)
            }
        },
        setLocationState: (state, action) => {
            state.location = action.payload;
        },
        setCheckInDate: (state, action) => {
            state.checkInDate = action.payload;
        },
        setCheckOutDate: (state, action) => {
            state.checkOutDate = action.payload;
        },
        setDaysCountState: (state, action) => {
            state.daysCount = action.payload;
        },
        filterFavorites: (state, action) => {
            const { price, rating } = action.payload;
            state.price = price;
            state.rating = rating;
            if (price) state.filteredFavorites = state.favorites.filter(({ priceFrom }) => priceFrom <= +price);
            if (rating) state.filteredFavorites = state.favorites.filter(({ stars }) => stars === +rating);
            if (state.price && state.rating) {
                state.filteredFavorites = state.favorites
                    .filter(({ stars }) => stars === +rating)
                    .filter(({ priceFrom }) => priceFrom <= +price)
            }
        },
    }
})

export const { setHotels, setHotelsDoubles, setFavorite, setLocationState, setCheckInDate, setCheckOutDate, setDaysCountState, filterFavorites } = hotelsData.actions;