
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
  