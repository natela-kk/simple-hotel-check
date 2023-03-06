import { createAction } from '@reduxjs/toolkit';

export const REQUEST_HOTELS = 'REQUEST_HOTELS';

export const requestHotels = createAction(REQUEST_HOTELS);
