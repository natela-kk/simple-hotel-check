export const getDate = (date: Date) => {
    return date.toLocaleDateString("fr-CA", { year: "numeric", month: "2-digit", day: "2-digit" });
}


export const getCheckOutDate = (checkIn: string, daysCount: string) => {
    const checkOutDate = new Date();
    const checkInDate = new Date(checkIn);
    checkOutDate.setDate(checkInDate.getDate() + +daysCount);
    return getDate(checkOutDate);
  }