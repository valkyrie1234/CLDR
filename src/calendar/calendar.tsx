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

const Calendar: React.FC<ICalendar> = ({ range = false }) => {
  const [state, setState] = React.useState<{
    date: Dayjs;
    startDate: Dayjs | null;
    endDate: Dayjs | null;
  }>({
    date: dayjs(),
    startDate: null,
    endDate: null,
  });

  const [mode, setMode] = React.useState<"day" | "month" | "year">("day");

  const resetDate = () => {
    setState((prevState) => ({
      ...prevState,
      date: dayjs(),
    }));
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

      if (selectedDate.isBefore(startDate, "day")) {
        return { ...prevState, startDate: selectedDate };
      }

      return { ...prevState, endDate: selectedDate };
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
    </div>
  );
};

export default Calendar;
