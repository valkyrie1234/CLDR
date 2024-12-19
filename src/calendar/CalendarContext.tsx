import React, { createContext, useContext, useState } from 'react';
import dayjs, { Dayjs } from 'dayjs';

interface CalendarContextProps {
  date: Dayjs;
  startDate: Dayjs | null;
  endDate: Dayjs | null;
  setDate: (date: Dayjs) => void;
  setStartDate: (date: Dayjs | null) => void;
  setEndDate: (date: Dayjs | null) => void;
  resetDates: () => void;
  changeMonth: (month: number) => void;
  changeYear: (year: number) => void;
  selectRange: (rangeType: "week" | "month" | "quarter" | "year") => void;
}

const CalendarContext = createContext<CalendarContextProps | undefined>(undefined);

export const CalendarProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [date, setDate] = useState<Dayjs>(dayjs());
  const [startDate, setStartDate] = useState<Dayjs | null>(null);
  const [endDate, setEndDate] = useState<Dayjs | null>(null);

  // Сброс дат к текущей дате
  const resetDates = () => {
    setStartDate(null);
    setEndDate(null);
    setDate(dayjs());
  };

  // Изменение месяца
  const changeMonth = (month: number) => {
    setDate((prevDate) => prevDate.month(month));
  };

  // Изменение года
  const changeYear = (year: number) => {
    setDate((prevDate) => prevDate.year(year));
  };

  // Выбор диапазона дат
  const selectRange = (rangeType: "week" | "month" | "quarter" | "year") => {
    const today = dayjs();
    let start, end;

    switch (rangeType) {
      case "week":
        start = today.startOf("week");
        end = today.endOf("week");
        break;
      case "month":
        start = today.startOf("month");
        end = today.endOf("month");
        break;
      case "quarter":
        start = today.startOf("quarter");
        end = today.endOf("quarter");
        break;
      case "year":
        start = today.startOf("year");
        end = today.endOf("year");
        break;
      default:
        return;
    }

    setStartDate(start);
    setEndDate(end);
  };

  return (
    <CalendarContext.Provider value={{
      date,
      startDate,
      endDate,
      setDate,
      setStartDate,
      setEndDate,
      resetDates,
      changeMonth,
      changeYear,
      selectRange,
    }}>
      {children}
    </CalendarContext.Provider>
  );
};

export const useCalendar = () => {
  const context = useContext(CalendarContext);
  if (!context) {
    throw new Error("useCalendar must be used within a CalendarProvider");
  }
  return context;
};
