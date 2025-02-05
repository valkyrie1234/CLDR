import { Dayjs } from "dayjs";

export interface ICalendar {
  /** Флаг, указывающий, включен ли режим выбора диапазона дат */
  range?: boolean;

  /** Флаг, указывающий, отображается ли кнопка "Сегодня" */
  showTodayButton?: boolean;

  /** Начальная дата календаря */
  initialDate?: Dayjs;

  /** Флаг, указывающий, отображается ли переключатель диапазона */
  showToggle?: boolean;

  /** Минимальная допустимая дата (если ограничение задано) */
  minDate?: Dayjs;

  /** Максимальная допустимая дата (если ограничение задано) */
  maxDate?: Dayjs;

  /** Флаг, указывающий, отображается ли выбор времени */
  timePicker?: boolean;

  /** Обработчик изменения даты */
  onChange?: (date: Date) => void;

  /** Обработчик изменения начальной даты диапазона */
  onStartDateChange?: (date: Date | null) => void;

  /** Обработчик изменения конечной даты диапазона */
  onEndDateChange?: (date: Date | null) => void;
};
