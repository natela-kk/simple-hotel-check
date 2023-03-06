export type Hotel = {
  hotelId: number;
  hotelName: string;
  location: {
    name: string;
  }
  priceFrom: number;
  stars: number;
  isFavorite?: Boolean;
};
