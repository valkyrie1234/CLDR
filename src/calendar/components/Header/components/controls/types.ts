import { Dayjs } from "dayjs";

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
  