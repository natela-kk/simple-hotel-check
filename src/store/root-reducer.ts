import { combineReducers } from '@reduxjs/toolkit'
import { favoriteData } from './favorite-data/favorite-data'
import { hotelsData } from './hotels-data/hotels-data'
import { NameSpace } from './NameSpace'

export const rootReducer = combineReducers({
    [NameSpace.Hotels]: hotelsData.reducer,
    [NameSpace.Favorite]: favoriteData.reducer,
})