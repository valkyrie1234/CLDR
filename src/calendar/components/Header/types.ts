import { Dayjs } from "dayjs";

export interface IHeader {
  /** Текущая дата, отображаемая в календаре */
  date: Dayjs;

  /** Функция для изменения месяца */
  changeMonth: (month: number) => void;

  /** Функция для изменения года */
  changeYear: (year: number) => void;

  /** Функция для сброса даты к начальному значению */
  resetDate: () => void;

  /** Флаг, указывающий, включен ли режим выбора диапазона дат */
  range: boolean;

  /** Начальная дата диапазона (если выбран диапазон) */
  endDate: Dayjs | null;

  /** Конечная дата диапазона (если выбран диапазон) */
  startDate: Dayjs | null;

  /** Колбэк, вызываемый при изменении начальной даты */
  onStartDateChange: (value: string) => void;

  /** Колбэк, вызываемый при изменении конечной даты */
  onEndDateChange: (value: string) => void;

  /** Режим отображения календаря (день, месяц, год) */
  mode: "day" | "month" | "year";

  /** Функция для изменения режима отображения */
  setMode: (mode: "day" | "month" | "year") => void;

  /** Флаг, указывающий, отображается ли переключатель диапазона */
  showToggle: boolean;

  /** Функция для переключения режима диапазона */
  toggleRangeMode: () => void;

  /** Значение даты в инпуте */
  inputDateValue: string;

  /** Колбэк, вызываемый при изменении значения в инпуте */
  onDateInputChange: (value: string) => void;

  /** Колбэк, вызываемый при потере фокуса инпутом */
  onDateInputBlur: () => void;

  /** Флаг, указывающий, отображается ли выбор времени */
  timePicker?: boolean;

  /** Колбэк, вызываемый при изменении времени */
  onTimeChange: (value: string) => void;

  /** Значение времени */
  timeValue: string;
  
  /**  Флаг указывающий на дизейбл стрелочки*/
  canGoToPreviousMonth: () => boolean;

  /**  Флаг указывающий на дизейбл стрелочки*/
  canGoToNextMonth: () => boolean;

  /**  Флаг указывающий на дизейбл стрелочки*/
  canGoToPreviousYear: () => boolean;

  /**  Флаг указывающий на дизейбл стрелочки*/
  canGoToNextYear: () => boolean;
};

export interface DateInputsProps {
  /** Флаг, указывающий, включен ли режим выбора диапазона дат */
  range: boolean;

  /** Начальная дата диапазона (если выбран диапазон) */
  startDate: Dayjs | null;

  /** Конечная дата диапазона (если выбран диапазон) */
  endDate: Dayjs | null;

  /** Колбэк, вызываемый при изменении начальной даты */
  onStartDateChange: (value: string) => void;

  /** Колбэк, вызываемый при изменении конечной даты */
  onEndDateChange: (value: string) => void;

  /** Значение даты в инпуте */
  inputDateValue: string;

  /** Колбэк, вызываемый при изменении значения в инпуте */
  onDateInputChange: (value: string) => void;

  /** Колбэк, вызываемый при потере фокуса инпутом */
  onDateInputBlur: () => void;

  /** Флаг, указывающий, отображается ли выбор времени */
  timePicker?: boolean;

  /** Колбэк, вызываемый при изменении времени */
  onTimeChange?: (value: string) => void;

  /** Значение времени */
  timeValue?: string;
};

export interface HeaderControlsProps {
  /** Режим отображения календаря (день, месяц, год) */
  mode: "day" | "month" | "year";

  /** Текущая дата, отображаемая в календаре */
  date: Dayjs;

  /** Функция для изменения года */
  changeYear: (year: number) => void;

  /** Функция для изменения месяца */
  changeMonth: (month: number) => void;

  /** Функция для изменения режима отображения */
  setMode: (mode: "day" | "month" | "year") => void;

  /** Функция для прокрутки годов */
  handleYearScroll: (direction: "prev" | "next") => void;
  
  /**  Флаг указывающий на дизейбл стрелочки*/
  canGoToPreviousMonth: () => boolean;

  /**  Флаг указывающий на дизейбл стрелочки*/
  canGoToNextMonth: () => boolean;

  /**  Флаг указывающий на дизейбл стрелочки*/
  canGoToPreviousYear: () => boolean;

  /**  Флаг указывающий на дизейбл стрелочки*/
  canGoToNextYear: () => boolean;
};