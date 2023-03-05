import { setHotels } from './hotels-data/hotels-data';


export const fetchHotels = (location: string, checkIn: string, checkOut: string) => {
  console.log('fetchHotels start')
  return async (dispatch: (arg0: { payload: any; type: "HOTELS/setHotels"; }) => void) => {
    try {
    } catch (error) {
    }
    const response = await fetch(`http://engine.hotellook.com/api/v2/cache.json?location=${location}&currency=rub&checkIn=${checkIn}&checkOut=${checkOut}&limit=10`);
    const json = await response.json();
    console.log(json)
    dispatch(setHotels(json));
  }
}