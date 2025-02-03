import { Dayjs } from "dayjs";

export interface YearPickerProps {
  /** Текущий выбранный год */
  currentYear: number;

  /** Колбэк, вызываемый при выборе года */
  onYearSelect: (year: number) => void;

  /** Минимальная допустимая дата (если ограничение задано) */
  minDate?: Dayjs;

  /** Максимальная допустимая дата (если ограничение задано) */
  maxDate?: Dayjs;
};
