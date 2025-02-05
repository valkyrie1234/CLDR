import { FC, useEffect, useState, useCallback } from "react";
import dayjs, { Dayjs } from "dayjs";
import isBetween from "dayjs/plugin/isBetween";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { DATE_FORMAT } from "@rgs-ui/date-utils";

import MonthPicker from "./components/mods/Months/MounthPicker";
import YearPicker from "./components/mods/Years/YearPicker";
import Days from "./components/mods/Days/Days";
import Header from "./components/Header/Header";
import { TodayButton, CalendarWrapper } from "./styles";
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
  onChange,
  onStartDateChange,
  onEndDateChange,
}) => {
  const [calendarState, setCalendarState] = useState({
    date: initialDate || dayjs(),
    startDate: null as Dayjs | null,
    endDate: null as Dayjs | null,
    isRangeMode: range,
    initialDate: initialDate || dayjs(),
    mode: "day" as "day" | "month" | "year",
    timeValue: "00:00",
    inputDateValue: "",
    startDateInputValue: "",
    endDateInputValue: "",
  });

  /** Парсинг даты из строки */
  const parseDateFromInput = useCallback((value: string): Dayjs | null => {
    const parsedDate = dayjs(value, DATE_FORMAT, true);
    return parsedDate.isValid() ? parsedDate : null;
  }, []);

  /** Обработка выбора года */
  const handleYearSelect = useCallback((year: number) => {
    setCalendarState((prevState) => ({
      ...prevState,
      date: prevState.date.year(year),
      mode: "month",
    }));
  }, []);

  /** Изменение месяца */
  const changeMonth = useCallback((month: number) => {
    setCalendarState((prevState) => ({
      ...prevState,
      date: prevState.date.month(month),
      mode: "day",
    }));
  }, []);

  /** Изменение года */
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

  /** Обработка выбора месяца */
  const handleMonthSelect = useCallback((month: number) => {
    setCalendarState((prevState) => ({
      ...prevState,
      date: prevState.date.month(month),
      mode: "day",
    }));
  }, []);

  /** Сброс даты к начальному значению или текущей дате */
  const resetDate = useCallback(() => {
    setCalendarState((prevState) => ({
      ...prevState,
      date: prevState.initialDate,
      startDate: null,
      endDate: null,
      inputDateValue: "",
      timeValue: "00:00",
      mode: "day",
      endDateInputValue: "",
      startDateInputValue: "",
    }));
  }, []);

  /** Изменение выбранной даты */
  const changeDate = useCallback((selectedDate: Dayjs) => {
    setCalendarState((prevState) => {
      const { startDate, endDate, isRangeMode } = prevState;

      if (!isRangeMode) {
        onChange?.(selectedDate.toDate());
        return {
          ...prevState,
          startDate: selectedDate,
          endDate: selectedDate,
          startDateInputValue: selectedDate.format(DATE_FORMAT),
          endDateInputValue: selectedDate.format(DATE_FORMAT),
        };
      };

      if (!startDate || (startDate && endDate)) {
        onStartDateChange?.(selectedDate.toDate());
        return {
          ...prevState,
          startDate: selectedDate,
          endDate: null,
          date: selectedDate,
          startDateInputValue: selectedDate.format(DATE_FORMAT),
          endDateInputValue: "",
        };
      };

      // Если выбрана дата до начальной даты, то она становится новой начальной датой,
      // а текущая начальная дата становится новой конечной датой.
       
      if (selectedDate.isBefore(startDate, "day")) {
        onStartDateChange?.(selectedDate.toDate());
        onEndDateChange?.(startDate.toDate());
        return {
          ...prevState,
          startDate: selectedDate,
          endDate: startDate,
          startDateInputValue: selectedDate.format(DATE_FORMAT),
          endDateInputValue: startDate.format(DATE_FORMAT),
        };
      };

      // Если выбрана дата после начальной даты, то она становится новой конечной датой.
      onEndDateChange?.(selectedDate.toDate());
      return {
        ...prevState,
        endDate: selectedDate,
        endDateInputValue: selectedDate.format(DATE_FORMAT),
      };
    });
  }, [onChange, onStartDateChange, onEndDateChange]);

  const canGoToPreviousMonth = useCallback(() => {
    const previousMonth = calendarState.date.subtract(1, "month");
    return !minDate || previousMonth.isSameOrAfter(minDate, "month");
  }, [calendarState.date, minDate]);
  
  const canGoToNextMonth = useCallback(() => {
    const nextMonth = calendarState.date.add(1, "month");
    return !maxDate || nextMonth.isSameOrBefore(maxDate, "month");
  }, [calendarState.date, maxDate]);
  
  const canGoToPreviousYear = useCallback(() => {
    const previousYear = calendarState.date.subtract(1, "year");
    return !minDate || previousYear.isSameOrAfter(minDate, "year");
  }, [calendarState.date, minDate]);
  
  const canGoToNextYear = useCallback(() => {
    const nextYear = calendarState.date.add(1, "year");
    return !maxDate || nextYear.isSameOrBefore(maxDate, "year");
  }, [calendarState.date, maxDate]);
  
  /** Функции дизейбла стрелочек переключения месяцев и лет */
  const navigationControls = {
    canGoToPreviousMonth,
    canGoToNextMonth,
    canGoToPreviousYear,
    canGoToNextYear,
  };

/** Обработка изменения начальной даты */
const handleStartDateChange = useCallback(
  (value: string) => {
    const parsedDate = parseDateFromInput(value);

    setCalendarState((prevState) => ({
      ...prevState,
      date: parsedDate || prevState.initialDate,
      startDateInputValue: value,
      startDate: parsedDate,
    }));
    if (parsedDate) onStartDateChange?.(parsedDate.toDate());
  },
  [parseDateFromInput, onStartDateChange]
);

/** Обработка изменения конечной даты */
const handleEndDateChange = useCallback(
  (value: string) => {
    const parsedDate = parseDateFromInput(value);

    setCalendarState((prevState) => ({
      ...prevState,
      date: parsedDate || prevState.initialDate,
      endDateInputValue: value,
      endDate: parsedDate,
    }));
    if (parsedDate) onEndDateChange?.(parsedDate.toDate());
  },
  [parseDateFromInput, onEndDateChange]
);

  /** Обработка изменения значения инпута */
  const handleDateInputChange = useCallback((value: string, key: string) => {
    setCalendarState((prevState) => ({
      ...prevState,
      [key]: value,
    }));
  }, []);

  /** Выбор текущей даты */
  const selectToday = useCallback(() => {
    const today = dayjs();
    setCalendarState((prevState) => ({
      ...prevState,
      date: today,
      startDate: null,
      endDate: null,
    }));
    changeDate(today);
  }, [changeDate]);

  /** Обработка потери фокуса инпутом */
  const handleDateInputBlur = useCallback(() => {
    const parsedDate = parseDateFromInput(calendarState.inputDateValue);

    if (parsedDate && parsedDate.isValid()) {
      setCalendarState((prevState) => ({
        ...prevState,
        date: parsedDate,
        startDate: parsedDate,
        endDate: prevState.isRangeMode ? parsedDate : null,
        inputDateValue: parsedDate.format(DATE_FORMAT),
      }));
      onChange?.(parsedDate.toDate());
    } else {
      setCalendarState((prevState) => ({
        ...prevState,
        inputDateValue: "",
      }));
    }
  }, [calendarState.inputDateValue, parseDateFromInput, onChange]);

  /** Обработка изменения времени */
  const handleTimeChange = useCallback((value: string) => {
    setCalendarState((prevState) => ({
      ...prevState,
      timeValue: value,
    }));
  }, []);

  /** Логика переключения режима диапазона */
  const toggleRangeMode = useCallback(() => {
    resetDate();
    setCalendarState((prevState) => ({
      ...prevState,
      isRangeMode: !prevState.isRangeMode,
    }));
  }, [resetDate]);

  const setMode = useCallback((newMode: "day" | "month" | "year") => {
    setCalendarState((prevState) => ({ ...prevState, mode: newMode }));
  }, []);

  const {
    date,
    startDate,
    endDate,
    isRangeMode,
    mode,
    inputDateValue,
    timeValue,
    endDateInputValue,
    startDateInputValue,
  } = calendarState;

  // Синхронизация инпута с календарем 
  useEffect(() => {
    setCalendarState((prevState) => ({
      ...prevState,
      inputDateValue: startDate ? startDate.format(DATE_FORMAT) : "",
    }));
  }, [startDate]);

  return (
    <CalendarWrapper>
      <Header
        date={date}
        mode={mode}
        maxDate={maxDate}
        minDate={minDate}
        range={isRangeMode}
        timeValue={timeValue}
        inputDateValue={inputDateValue}
        endDateInputValue={endDateInputValue}
        navigationControls={navigationControls}
        startDateInputValue={startDateInputValue}
        showToggle={showToggle}
        timePicker={timePicker}
        setMode={setMode}
        resetDate={resetDate}
        changeYear={changeYear}
        changeMonth={changeMonth}
        onTimeChange={handleTimeChange}
        toggleRangeMode={toggleRangeMode}
        onDateInputBlur={handleDateInputBlur}
        onEndDateChange={handleEndDateChange}
        onStartDateChange={handleStartDateChange}
        onDateInputChange={handleDateInputChange}
      />
      {mode === "day" && (
        <Days
        date={date}
        endDate={endDate}
        range={isRangeMode}
        startDate={startDate}
        minDate={minDate}
        maxDate={maxDate}
        onClick={changeDate}
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
        currentYear={date.year()}
          currentMonth={date.month()}
          minDate={minDate}
          maxDate={maxDate}
          onMonthSelect={handleMonthSelect}
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
