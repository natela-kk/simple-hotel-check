import { createSlice } from '@reduxjs/toolkit';
import { Hotel } from '../../types/hotel';
import { NameSpace } from '../NameSpace';


type InitialState = {
    favorites: Hotel[],
    filteredFavorites: Hotel[]
}

const initialState: InitialState = {
    favorites: [],
    filteredFavorites: []
};

export const favoriteData = createSlice({
    name: NameSpace.Favorite,
    initialState,
    reducers: {
        setFavoriteList: (state, action) => {
            
        },
        filterByRating: (state, action) => {
            // state.fa = action.payload;
        },
        filterByPrice: (state, action) => {
            // state.price = action.payload;
        }
    }
})

export const { setFavoriteList, filterByRating, filterByPrice } = favoriteData.actions;
