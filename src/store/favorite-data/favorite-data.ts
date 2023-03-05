import { createSlice } from '@reduxjs/toolkit';
import { Hotel } from '../../types/hotel';
import { NameSpace } from '../NameSpace';


type InitialState = {
    favorites1: Hotel[],
}

const initialState: InitialState = {
    favorites1: [],
};

export const favoriteData = createSlice({
    name: NameSpace.Favorite,
    initialState,
    reducers: {
        setFavorite: (state, action) => {
            const updatedHotel = action.payload;
            const updatedHotelIndex = state.favorites1.findIndex((hotel) => hotel.hotelId === updatedHotel.hotel.id);
            console.log("updatedHotel.id");
            console.log(state.favorites1);
            
            if (updatedHotelIndex !== -1) {
                console.log(updatedHotelIndex);
                state.favorites1 = state.favorites1.filter((hotel) => hotel.hotelId !== updatedHotel.hotel.id)
            } else {
                console.log(updatedHotel.hotel);
                console.log(state.favorites1);
                state.favorites1 = [
                    ...state.favorites1, updatedHotel.hotel
                ]
                console.log(state.favorites1);
            }
        }
    }
})

export const { setFavorite } = favoriteData.actions;
