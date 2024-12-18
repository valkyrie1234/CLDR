import React from "react";
import dayjs, { Dayjs } from "dayjs";
import Heading from "./Header";
import Days from "./Days";
import isBetween from "dayjs/plugin/isBetween";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";

import { ICalendar } from "./utils/types";
import "./../App.scss";
import { ClassicButton, PeriodInputStyled } from "./style/styles";
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
  const [inputDateValue, setInputDateValue] = React.useState<string>("");

  // Сброс даты к начальному значению или текущей дате
  const resetDate = () => {
    setState({
      date: initialDate || dayjs(),
      startDate: null,
      endDate: null,
    });
    setInputDateValue("");
  };

  // Изменение месяца
  const changeMonth = (month: number) => {
    setState((prevState) => ({
      ...prevState,
      date: prevState.date.month(month),
    }));
    setMode("day");
  };

  // Изменение года
  const changeYear = (year: number) => {
    setState((prevState) => ({
      ...prevState,
      date: prevState.date.year(year),
    }));
    setMode("day");
  };

  // Изменение выбранной даты
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

  // Парсинг даты из строки
  const parseDateFromInput = (value: string): Dayjs | null => {
    const format = "DD-MM-YYYY";
    const parsedDate = dayjs(value, format, true);
    return parsedDate.isValid() ? parsedDate : null;
  };

  // Обработка изменения даты через инпут
  const handleDateChange = (value: string, type: "startDate" | "endDate") => {
    setState((prevState) => {
      const parsedDate = parseDateFromInput(value);

      return {
        ...prevState,
        [type]: parsedDate,
      };
    });
  };

  // Выбор текущей даты
  const selectToday = () => {
    setState({
      date: dayjs(),
      startDate: null,
      endDate: null,
    });
    changeDate(dayjs());
  };

  // Обработка изменения значения инпута
  const handleDateInputChange = (value: string) => {
    setInputDateValue(value);
  };

  // Обработка потери фокуса инпутом
  const handleDateInputBlur = () => {
    const parsedDate = parseDateFromInput(inputDateValue);
    if (parsedDate) {
      setState((prevState) => ({
        ...prevState,
        date: parsedDate,
        startDate: parsedDate,
        endDate: range ? parsedDate : null,
      }));
    }
  };

  const { date, startDate, endDate } = state;

  // Синхронизация инпута с календарем
  React.useEffect(() => {
    if (startDate) {
      setInputDateValue(startDate.format("DD-MM-YYYY"));
    } else {
      setInputDateValue("");
    }
  }, [startDate]);

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
        {!range && (
            <PeriodInputStyled
              type="text"
              placeholder="DD-MM-YYYY"
              value={inputDateValue}
              onChange={(e) => handleDateInputChange(e.target.value)}
              onBlur={handleDateInputBlur}
            />
        )}
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
        <ClassicButton
         onClick={selectToday}>
          Сегодня
        </ClassicButton>
      )}
    </div>
  );
};

export default Calendar;
