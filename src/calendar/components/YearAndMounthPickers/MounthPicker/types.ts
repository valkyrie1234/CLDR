export interface MonthPickerProps {
  /** Текущий выбранный месяц */
  currentMonth: number;

  /** Колбэк, вызываемый при выборе месяца */
  onMonthSelect: (month: number) => void;
};
