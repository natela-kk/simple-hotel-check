import { hideAlert, showAlert } from './error-data/error-data';
import { setHotels, setHotelsDoubles } from './hotels-data/hotels-data';


export const fetchHotels = (location: string, checkIn: string, checkOut: string) => {
  return async (dispatch: (arg0: { payload: any; }) => void) => {
    try {
      const response = await fetch(`http://engine.hotellook.com/api/v2/cache.json?location=${location}&currency=rub&checkIn=${checkIn}&checkOut=${checkOut}&limit=10`);
      const json = await response.json();
      dispatch(setHotels(json));
      dispatch(setHotelsDoubles());
      dispatch(hideAlert());
    } catch (error) {
      dispatch(showAlert());
    }

  }
}