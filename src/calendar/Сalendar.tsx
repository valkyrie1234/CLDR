import { FC, useEffect, useState, useCallback } from "react";
import dayjs, { Dayjs } from "dayjs";
import isBetween from "dayjs/plugin/isBetween";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
import customParseFormat from "dayjs/plugin/customParseFormat";

import MonthPicker from "./components/YearAndMounthPickers/MounthPicker/MounthPicker";
import YearPicker from "./components/YearAndMounthPickers/YearPicker/YearPicker";
import { TodayButton, CalendarWrapper } from "./style/styles";
import Header from "./components/Header/Header";
import Days from "./components/DayPicker/Days";
import { format } from "./consts";
import { ICalendar } from "./types";

dayjs.extend(customParseFormat);
dayjs.extend(isBetween);
dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrBefore);

const Calendar: FC<ICalendar> = ({
  showTodayButton = false,
  showToggle = false,
  timePicker = false,
  range = false,
  initialDate,
  minDate,
  maxDate,
}) => {
  const [calendarState, setCalendarState] = useState({
    date: initialDate || dayjs(),
    startDate: null as Dayjs | null,
    endDate: null as Dayjs | null,
    isRangeMode: range,
    initialDate: initialDate || dayjs(),
    mode: "day" as "day" | "month" | "year",
    inputDateValue: "",
    timeValue: "00:00",
  });

  // Парсинг даты из строки
  const parseDateFromInput = useCallback((value: string): Dayjs | null => {
    const parsedDate = dayjs(value, format, true);
    return parsedDate.isValid() ? parsedDate : null;
  }, []);

  // Обработка выбора года
  const handleYearSelect = useCallback((year: number) => {
    setCalendarState((prevState) => ({
      ...prevState,
      date: prevState.date.year(year),
      mode: "month",
    }));
  }, []);

  // Изменение месяца
  const changeMonth = useCallback((month: number) => {
    setCalendarState((prevState) => ({
      ...prevState,
      date: prevState.date.month(month),
      mode: "day",
    }));
  }, []);

  // Изменение года
  const changeYear = useCallback((year: number) => {
    setCalendarState((prevState) => ({
      ...prevState,
      date: prevState.date.year(year),
    }));
    if (calendarState.mode === "year") {
      setCalendarState((prevState) => ({ ...prevState, mode: "year" }));
    } else {
      setCalendarState((prevState) => ({ ...prevState, mode: "day" }));
    }
  }, [calendarState.mode]);

  // Обработка выбора месяца
  const handleMonthSelect = useCallback((month: number) => {
    setCalendarState((prevState) => ({
      ...prevState,
      date: prevState.date.month(month),
      mode: "day",
    }));
  }, []);

  // Сброс даты к начальному значению или текущей дате
  const resetDate = useCallback(() => {
    setCalendarState((prevState) => ({
      ...prevState,
      date: prevState.initialDate,
      startDate: null,
      endDate: null,
      inputDateValue: "",
      timeValue: "00:00",
    }));
  }, []);

  // Изменение выбранной даты
  const changeDate = useCallback((selectedDate: Dayjs) => {
    setCalendarState((prevState) => {
      const { startDate, endDate, isRangeMode } = prevState;

      if (!isRangeMode) {
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
  }, []);

  const canGoToPreviousMonth = useCallback(() => {
    const previousMonth = calendarState.date.subtract(1, 'month');
    return !minDate || previousMonth.isSameOrAfter(minDate, 'month');
  }, [calendarState.date, minDate]);
  
  const canGoToNextMonth = useCallback(() => {
    const nextMonth = calendarState.date.add(1, 'month');
    return !maxDate || nextMonth.isSameOrBefore(maxDate, 'month');
  }, [calendarState.date, maxDate]);
  
  const canGoToPreviousYear = useCallback(() => {
    const previousYear = calendarState.date.subtract(1, 'year');
    return !minDate || previousYear.isSameOrAfter(minDate, 'year');
  }, [calendarState.date, minDate]);
  
  const canGoToNextYear = useCallback(() => {
    const nextYear = calendarState.date.add(1, 'year');
    return !maxDate || nextYear.isSameOrBefore(maxDate, 'year');
  }, [calendarState.date, maxDate]);

  // Обработка изменения даты через инпут
  const handleDateChange = useCallback((value: string, type: "startDate" | "endDate") => {
    setCalendarState((prevState) => {
      const parsedDate = parseDateFromInput(value);

      return {
        ...prevState,
        [type]: parsedDate,
      };
    });
  }, [parseDateFromInput]);

  // Упрощаем передачу колбеков для onStartDateChange и onEndDateChange
  const handleStartDateChange = useCallback((value: string) => handleDateChange(value, "startDate"), [handleDateChange]);
  const handleEndDateChange = useCallback((value: string) => handleDateChange(value, "endDate"), [handleDateChange]);

  // Обработка изменения значения инпута
  const handleDateInputChange = useCallback((value: string) => {
    setCalendarState((prevState) => ({
      ...prevState,
      inputDateValue: value,
    }));
  }, []);

  // Выбор текущей даты
  const selectToday = useCallback(() => {
    setCalendarState((prevState) => ({
      ...prevState,
      date: dayjs(),
      startDate: null,
      endDate: null,
    }));
    changeDate(dayjs());
  }, [changeDate]);

  // Обработка потери фокуса инпутом
  const handleDateInputBlur = useCallback(() => {
    const parsedDate = parseDateFromInput(calendarState.inputDateValue);

    if (parsedDate && parsedDate.isValid()) {
      setCalendarState((prevState) => ({
        ...prevState,
        date: parsedDate,
        startDate: parsedDate,
        endDate: prevState.isRangeMode ? parsedDate : null,
        inputDateValue: parsedDate.format(format),
      }));
    } else {
      setCalendarState((prevState) => ({
        ...prevState,
        inputDateValue: "",
      }));
    }
  }, [calendarState.inputDateValue, parseDateFromInput]);

  // Обработка изменения времени
  const handleTimeChange = useCallback((value: string) => {
    setCalendarState((prevState) => ({
      ...prevState,
      timeValue: value,
    }));
  }, []);

  // Логика переключения режима диапазона
  const toggleRangeMode = useCallback(() => {
    setCalendarState((prevState) => ({
      ...prevState,
      isRangeMode: !prevState.isRangeMode,
    }));
  }, []);

  const setMode = useCallback((newMode: "day" | "month" | "year") => {
    setCalendarState((prevState) => ({ ...prevState, mode: newMode }));
  }, []);

  const { date, startDate, endDate, isRangeMode, mode, inputDateValue, timeValue } = calendarState;

  // Синхронизация инпута с календарем
  useEffect(() => {
    setCalendarState((prevState) => ({
      ...prevState,
      inputDateValue: startDate ? startDate.format(format) : "",
    }));
  }, [startDate]);

  return (
    <CalendarWrapper>
      <Header
        date={date}
        changeMonth={changeMonth}
        changeYear={changeYear}
        resetDate={resetDate}
        range={isRangeMode}
        endDate={endDate}
        startDate={startDate}
        onStartDateChange={handleStartDateChange}
        onEndDateChange={handleEndDateChange}
        mode={mode}
        setMode={setMode}
        showToggle={showToggle}
        toggleRangeMode={toggleRangeMode}
        inputDateValue={inputDateValue}
        onDateInputChange={handleDateInputChange}
        onDateInputBlur={handleDateInputBlur}
        timePicker={timePicker}
        onTimeChange={handleTimeChange}
        timeValue={timeValue}
        canGoToPreviousMonth={canGoToPreviousMonth}
        canGoToNextMonth={canGoToNextMonth}
        canGoToPreviousYear={canGoToPreviousYear}
        canGoToNextYear={canGoToNextYear}
      />
      {mode === "day" && (
        <Days
          onClick={changeDate}
          date={date}
          startDate={startDate}
          endDate={endDate}
          range={isRangeMode}
          minDate={minDate}
          maxDate={maxDate}
        />
      )}
{mode === "year" && (
  <YearPicker
    currentYear={date.year()}
    onYearSelect={handleYearSelect}
    minDate={minDate}
    maxDate={maxDate}
  />
)}
{mode === "month" && (
  <MonthPicker
    currentMonth={date.month()}
    onMonthSelect={handleMonthSelect}
    minDate={minDate}
    maxDate={maxDate}
    currentYear={date.year()}
  />
)}
      {showTodayButton && (
        <TodayButton onClick={selectToday}>
          Сегодня
        </TodayButton>
      )}
    </CalendarWrapper>
  );
};

export default Calendar;
