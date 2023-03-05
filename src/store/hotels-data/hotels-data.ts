import { createSlice } from '@reduxjs/toolkit';
import { Hotel } from '../../types/hotel';
import { getCheckOutDate, getDate } from '../../utils/date';
import { NameSpace } from '../NameSpace';

type InitialState = {
    hotels: Hotel[],
    favorites: Hotel[],
    location: string
    checkInDate: string,
    checkOutDate: string,
    daysCount: number,

    // isDataLoaded: Boolean,
}

const initialState: InitialState = {
    hotels: [],
    favorites: [],
    location: 'Москва',
    checkInDate: getDate(new Date()),
    checkOutDate: getCheckOutDate(getDate(new Date()), '1'),
    daysCount: 1,

    // isDataLoaded: false,
    // isLoading: false,
    // sorting: SortingOption.Default,
};

export const hotelsData = createSlice({
    name: NameSpace.Hotels,
    initialState,
    reducers: {
        setHotels: (state, action) => {
            console.log('action.payload', action.payload)
            state.hotels = action.payload;
            console.log(25, state.hotels)
        },
        setFavorite: (state, action) => {
            const updatedHotel = action.payload.hotel;
            const isFavoriteItem = action.payload.isSmall;

            const updatedHotelIndex = state.favorites.findIndex((hotel) => hotel.hotelId === updatedHotel.hotelId);

            if (updatedHotelIndex !== -1) {
                state.favorites = state.favorites.filter((hotel) => hotel.hotelId !== updatedHotel.hotelId)
            } else {
                state.favorites = [
                    ...state.favorites, updatedHotel
                ]
            }

            // пытаюсь обработать дизлайк из избранного
            if (isFavoriteItem) {
                const updatedHotelIndex = state.hotels.findIndex((hotel) => hotel.hotelId === updatedHotel.hotelId);
                state.hotels[updatedHotelIndex] = updatedHotel;
                state.hotels = [
                    ...state.hotels.slice(0, updatedHotelIndex),
                    updatedHotel,
                    ...state.hotels.slice(updatedHotelIndex + 1,),
                ]
            }
        },
        setLocationState: (state, action) => {
            state.location = action.payload;
            console.log(state.location);
        },
        setCheckInDate: (state, action) => {
            state.checkInDate = action.payload;
            console.log(state.checkInDate);
        },
        setCheckOutDate: (state, action) => {
            state.checkOutDate = action.payload;
            console.log(state.checkOutDate);
        },
        setDaysCountState: (state, action) => {
            state.daysCount = action.payload;
            console.log(state.daysCount);
        },
    }
})

export const { setHotels, setFavorite, setLocationState, setCheckInDate, setCheckOutDate, setDaysCountState } = hotelsData.actions;