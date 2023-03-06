import { combineReducers } from '@reduxjs/toolkit'
import { errorData } from './error-data/error-data'
import { hotelsData } from './hotels-data/hotels-data'
import { NameSpace } from './NameSpace'

export const rootReducer = combineReducers({
    [NameSpace.Hotels]: hotelsData.reducer,
    [NameSpace.Error]: errorData.reducer,
})