import { call, put, takeEvery } from '@redux-saga/core/effects';
import { REQUEST_HOTELS } from './api-actions';
import { hideAlert, showAlert } from './error-data/error-data';
import { setHotels, setHotelsDoubles } from './hotels-data/hotels-data';

interface ResponseGenerator{
    config?:any,
    data?:any,
    headers?:any,
    request?:any,
    status?:number,
    statusText?:string
}

export function* sagaWatcher() {
    yield takeEvery(REQUEST_HOTELS, sagaWorker)
}

function* sagaWorker() {
    try {
        const payload:ResponseGenerator = yield call(fetchHotels)
        yield put(setHotels(payload))
        yield put(setHotelsDoubles())
        yield put(hideAlert());
    } catch (error) {
        yield(showAlert())
    }
}
const location = 'Москва'; 
const checkIn = '2023-05-05';
const checkOut = '2023-05-06';
async function fetchHotels() {
    const response = await fetch(`https://engine.hotellook.com/api/v2/cache.json?location=${location}&currency=rub&checkIn=${checkIn}&checkOut=${checkOut}&limit=10`);
    console.log(response);
    console.log(response.json());
    return await response.json();
}