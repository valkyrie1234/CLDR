import { Dayjs } from 'dayjs';

export interface IHeader {
  /** Значение даты в первом инпуте диапазона*/
  endDateInputValue: string;

  /** Значение даты во втором инпуте диапазона*/
  startDateInputValue: string;

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
  mode: 'day' | 'month' | 'year';

  /** Функция для изменения режима отображения */
  setMode: (mode: 'day' | 'month' | 'year') => void;

  /** Флаг, указывающий, отображается ли переключатель диапазона */
  showToggle: boolean;

  /** Функция для переключения режима диапазона */
  toggleRangeMode: () => void;

  /** Значение даты в инпуте */
  inputDateValue: string;

  /** Колбэк, вызываемый при изменении значения в инпуте */
  onDateInputChange: (value: string, key: string) => void;

  /** Колбэк, вызываемый при потере фокуса инпутом */
  onDateInputBlur: () => void;

  /** Флаг, указывающий, отображается ли выбор времени */
  timePicker?: boolean;

  /** Колбэк, вызываемый при изменении времени */
  onTimeChange: (value: string) => void;

  /** Значение времени */
  timeValue: string;

  /** Функции для дизейбла стрелочек*/
  navigationControls: {
    canGoToPreviousMonth: () => boolean;
    canGoToNextMonth: () => boolean;
    canGoToPreviousYear: () => boolean;
    canGoToNextYear: () => boolean;
  };
};

export interface HeaderControlsProps {
  /** Режим отображения календаря (день, месяц, год) */
  mode: 'day' | 'month' | 'year';

  /** Текущая дата, отображаемая в календаре */
  date: Dayjs;

  /** Функция для изменения года */
  changeYear: (year: number) => void;

  /** Функция для изменения месяца */
  changeMonth: (month: number) => void;

  /** Функция для изменения режима отображения */
  setMode: (mode: 'day' | 'month' | 'year') => void;

  /** Функция для прокрутки годов */
  handleYearScroll: (direction: 'prev' | 'next') => void;

  /** Функции для дизейбла стрелочек*/
  navigationControls: {
    canGoToPreviousMonth: () => boolean;
    canGoToNextMonth: () => boolean;
    canGoToPreviousYear: () => boolean;
    canGoToNextYear: () => boolean;
  };
};

export type DropDownProps = {
  handleSelectionChange: (value?: string) => void;
  isMobile?: boolean;
};

export interface ISingleInput {
  /** Флаг, указывающий, отображается ли выбор времени */
  timePicker: boolean | undefined;

  /** Значение даты в инпуте */
  inputDateValue: string;

  /** Колбэк, вызываемый при изменении значения в инпуте */
  onDateInputChange: (value: string, key: string) => void;

  /** Колбэк, вызываемый при потере фокуса инпутом */
  onDateInputBlur: () => void;

  /** Колбэк, вызываемый при изменении конечной даты */
  onEndDateChange: (value: string) => void;
  
  /** Колбэк, вызываемый при изменении времени */
  onTimeChange: (value: string) => void;

  /** Значение времени */
  timeValue: string;
};

export interface IPeriodInput {
  /** Значение даты 1 инпуте диапазона*/
  endDateInputValue: string;

  /** Значение даты 2 инпуте диапазона*/
  startDateInputValue: string;

  /** Колбэк, вызываемый при изменении значения в инпуте */
  onDateInputChange: (value: string, key: string) => void;

  /** Колбэк, вызываемый при изменении начальной даты */
  onStartDateChange: (value: string) => void;

  /** Колбэк, вызываемый при изменении конечной даты */
  onEndDateChange: (value: string) => void;

  /** Функция обработки выбора диапазона дат*/
  handleSelectionChange: (value: string) => void;
};
