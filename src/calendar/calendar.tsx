// Calendar.tsx
import React from "react";
import dayjs, { Dayjs } from "dayjs";
import Heading from "./Header";
import Days from "./Days";
import isBetween from "dayjs/plugin/isBetween";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";

import { ICalendar } from "./utils/types";
import "./../App.scss";
dayjs.extend(isBetween);
dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrBefore);

const Calendar: React.FC<ICalendar> = ({ range = false, showTodayButton = false, initialDate }) => {
  const [state, setState] = React.useState<{
    date: Dayjs;
    startDate: Dayjs | null;
    endDate: Dayjs | null;
  }>({
    date: initialDate || dayjs(),
    startDate: null,
    endDate: null,
  });

  const [mode, setMode] = React.useState<"day" | "month" | "year">("day");

  const resetDate = () => {
    setState({
      date: dayjs(),
      startDate: null,
      endDate: null,
    });
  };

  const changeMonth = (month: number) => {
    setState((prevState) => ({
      ...prevState,
      date: prevState.date.month(month),
    }));
    setMode("day");
  };

  const changeYear = (year: number) => {
    setState((prevState) => ({
      ...prevState,
      date: prevState.date.year(year),
    }));
    setMode("month");
  };

  const changeDate = (selectedDate: Dayjs) => {
    setState((prevState) => {
      const { startDate, endDate } = prevState;
  
      if (!range) {
        return { ...prevState, startDate: selectedDate, endDate: selectedDate };
      }
  
      if (!startDate || (startDate && endDate)) {
        return {
          ...prevState,
          startDate: selectedDate,
          endDate: null,
          date: selectedDate,
        };
      }
  
      // Если выбрана дата до начальной даты, то она становится новой начальной датой,
      // а текущая начальная дата становится новой конечной датой.
      if (selectedDate.isBefore(startDate, "day")) {
        return {
          ...prevState,
          startDate: selectedDate,
          endDate: startDate,
        };
      }
  
      // Если выбрана дата после начальной даты, то она становится новой конечной датой.
      return {
        ...prevState,
        endDate: selectedDate,
      };
    });
  };

  const parseDateFromInput = (value: string): Dayjs | null => {
    const format = "DD-MM-YYYY";
    const parsedDate = dayjs(value, format, true);
    return parsedDate.isValid() ? parsedDate : null;
  };

  const handleDateChange = (value: string, type: "startDate" | "endDate") => {
    setState((prevState) => {
      const parsedDate = parseDateFromInput(value);

      return {
        ...prevState,
        [type]: parsedDate,
      };
    });
  };

  const selectToday = () => {
    resetDate()
    changeDate(dayjs())
  }

  const { date, startDate, endDate } = state;

  return (
    <div className="calendar">
      <Heading
        date={date}
        changeMonth={changeMonth}
        changeYear={changeYear}
        resetDate={resetDate}
        range={range}
        endDate={endDate}
        startDate={startDate}
        onStartDateChange={(value) => handleDateChange(value, "startDate")}
        onEndDateChange={(value) => handleDateChange(value, "endDate")}
        mode={mode}
        setMode={setMode}
      />
      {mode === "day" && (
        <Days
          onClick={changeDate}
          date={date}
          startDate={startDate}
          endDate={endDate}
          range={range}
        />
      )}
            {showTodayButton && (
        <button className="classic-button" onClick={selectToday}>
          Сегодня
        </button>
      )}
    </div>
  );  
};

export default Calendar;
