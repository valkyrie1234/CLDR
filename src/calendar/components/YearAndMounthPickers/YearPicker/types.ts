export interface YearPickerProps {
  /** Текущий выбранный год */
  currentYear: number;

  /** Колбэк, вызываемый при выборе года */
  onYearSelect: (year: number) => void;
};
