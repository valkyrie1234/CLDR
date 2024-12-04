export const inputMask = (value:string): string => {
    const numbers = value.replace(/\D/g, '');

    const day = numbers.slice(0, 2);
    const month = numbers.slice(2, 4);
    const year = numbers.slice(4, 8);
  
    if (numbers.length <= 2) return day;
    if (numbers.length <= 4) return `${day}-${month}`;
    return `${day}-${month}-${year}`;
};
