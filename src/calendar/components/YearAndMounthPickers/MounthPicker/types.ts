import { Dayjs } from "dayjs";

export interface MonthPickerProps {
  /** Текущий выбранный месяц */
  currentMonth: number;

  /** Колбэк, вызываемый при выборе месяца */
  onMonthSelect: (month: number) => void;
  
  /** Минимальная допустимая дата (если ограничение задано) */
  minDate?: Dayjs;

  /** Максимальная допустимая дата (если ограничение задано) */
  maxDate?: Dayjs;

  /** Текущий год */
  currentYear?: number;
};
