import { call, put, select, takeEvery } from '@redux-saga/core/effects';
import { requestHotels } from './api-actions';
import { hideAlert, showAlert } from './error-data/error-data';
import { setHotels, setHotelsDoubles } from './hotels-data/hotels-data';

interface ResponseGenerator {
    config?: any,
    data?: any,
    headers?: any,
    request?: any,
    status?: number,
    statusText?: string
}

type FetchHotelsArgs = {
    location: string,
    checkInDate: string,
    checkOutDate: string,
}


export function* sagaWatcher() {
    yield takeEvery(requestHotels, sagaWorker)
}

function* sagaWorker({payload}: any) {
    const { location, checkInDate, checkOutDate } = yield select((state) => state.HOTELS);
    try {
        const data: ResponseGenerator = yield call(fetchHotels, { location, checkInDate, checkOutDate });
        yield put(setHotels(data))
        yield put(setHotelsDoubles())
        yield put(hideAlert());
    } catch (error) {
        yield (showAlert())
    }
}

async function fetchHotels({location, checkInDate, checkOutDate}: FetchHotelsArgs) {
    const response = await fetch(`https://engine.hotellook.com/api/v2/cache.json?location=${location}&currency=rub&checkIn=${checkInDate}&checkOut=${checkOutDate}&limit=10`);
    const result = await response.json();
    return result;
}