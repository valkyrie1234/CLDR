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
}

const CalendarContext = createContext<CalendarContextProps | undefined>(undefined);

export const CalendarProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [date, setDate] = useState<Dayjs>(dayjs());
  const [startDate, setStartDate] = useState<Dayjs | null>(null);
  const [endDate, setEndDate] = useState<Dayjs | null>(null);

  const resetDates = () => {
    setStartDate(null);
    setEndDate(null);
  };

  return (
    <CalendarContext.Provider value={{ date, startDate, endDate, setDate, setStartDate, setEndDate, resetDates }}>
      {children}
    </CalendarContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useCalendar = () => {
  const context = useContext(CalendarContext);
  if (!context) {
    throw new Error("useCalendar must be used within a CalendarProvider");
  }
  return context;
};