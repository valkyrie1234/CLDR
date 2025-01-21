import dayjs, { Dayjs } from "dayjs";

  // Парсинг даты из строки
export const parseDateFromInput = (value: string): Dayjs | null => {
    const format = "DD-MM-YYYY";
    const parsedDate = dayjs(value, format, true);
    return parsedDate.isValid() ? parsedDate : null;
  };

  // Форматирование даты
export const fixDateFormat = (value: string): string => {
    const numbers = value.replace(/\D/g, '');

    const part1 = numbers.slice(0, 2);
    const part2 = numbers.slice(2, 4);
    const year = numbers.slice(4, 8);

    return `${part2}-${part1}-${year}`;
  };
