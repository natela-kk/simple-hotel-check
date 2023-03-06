export const getDate = (date: Date) => {
    return date.toLocaleDateString("fr-CA", { year: "numeric", month: "2-digit", day: "2-digit" });
}


export const getCheckOutDate = (checkIn: string, daysCount: string) => {
    const checkOutDate = new Date();
    const checkInDate = new Date(checkIn);
    checkOutDate.setDate(checkInDate.getDate() + +daysCount);
    return getDate(checkOutDate);
}

export const getDaysCount = (daysCount: number) => {
    const remainder = daysCount % 10;

    if (remainder === 1 && daysCount !== 11) return `${daysCount} день`;
    else if (remainder > 1 && remainder < 5 && (daysCount < 10 || daysCount > 20)) return `${daysCount} дня`;
    else if ((daysCount > 4 && daysCount < 21) || remainder === 0 || (remainder > 4 && remainder < 10)) return `${daysCount} дней`;
}

  
const cardOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  } as const;
  

export const getCardDate = (date: { toLocaleString: (arg0: string, arg1: { readonly year: "numeric"; readonly month: "long"; readonly day: "numeric"; }) => any; }) => {
    const dateString = date.toLocaleString("ru", cardOptions);
    return dateString.substring(0, dateString.length - 2);
  }

    
const titleOptions = {
    year: 'numeric',
    month: 'long',
    day: '2-digit'
  } as const;
  

export const getTitleDate = (date: { toLocaleString: (arg0: string, arg1: { readonly year: "numeric"; readonly month: "long"; readonly day: "2-digit"; }) => any; }) => {
    const dateString = date.toLocaleString("ru", titleOptions);
    return dateString.substring(0, dateString.length - 2);
  }