import { useEffect, useState, FC } from "react";
import dayjs, { Dayjs } from "dayjs";
import Heading from "./components/Header/Header";
import Days from "./components/Days/Days";
import isBetween from "dayjs/plugin/isBetween";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";

import YearPicker from "./components/YearPicker/YearPicker";
import MonthPicker from "./components/MounthPicker/MounthPicker";
import { ICalendar } from "./utils/types";
import { TodayButton, CalendarWrapper } from "./style/styles";
import "./../App.scss";

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
  });

  const [mode, setMode] = useState<"day" | "month" | "year">("day");
  const [inputDateValue, setInputDateValue] = useState<string>("");
  const [timeValue, setTimeValue] = useState<string>("00:00");

  // Обработка выбора года
  const handleYearSelect = (year: number) => {
    setCalendarState((prevState) => ({
      ...prevState,
      date: prevState.date.year(year),
    }));
    setMode("month");
  };

  // Изменение месяца
  const changeMonth = (month: number) => {
    setCalendarState((prevState) => ({
      ...prevState,
      date: prevState.date.month(month),
    }));
    setMode("day");
  };

  // Форматирование даты
  const fixDateFormat = (value: string): string => {
    const numbers = value.replace(/\D/g, '');
  
    const part1 = numbers.slice(0, 2);
    const part2 = numbers.slice(2, 4);
    const year = numbers.slice(4, 8);
  
    return `${part2}-${part1}-${year}`;
  };

  // Изменение года
  const changeYear = (year: number) => {
    setCalendarState((prevState) => ({
      ...prevState,
      date: prevState.date.year(year),
    }));
    if (mode === "year") {
      setMode("year");
    } else {
      setMode("day");
    }
  };

  // Обработка выбора месяца
  const handleMonthSelect = (month: number) => {
    setCalendarState((prevState) => ({
      ...prevState,
      date: prevState.date.month(month),
    }));
    setMode("day");
  };

  // Сброс даты к начальному значению или текущей дате
  const resetDate = () => {
    setCalendarState((prevState) => ({
      ...prevState,
      date: prevState.initialDate,
      startDate: null,
      endDate: null,
    }));
    setInputDateValue("");
    setTimeValue("00:00");
  };

  // Изменение выбранной даты
  const changeDate = (selectedDate: Dayjs) => {
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
  };

  // Парсинг даты из строки
  const parseDateFromInput = (value: string): Dayjs | null => {
    const format = "DD-MM-YYYY";
    const parsedDate = dayjs(value, format, true);
    return parsedDate.isValid() ? parsedDate : null;
  };

  // Обработка изменения даты через инпут
  const handleDateChange = (value: string, type: "startDate" | "endDate") => {
    setCalendarState((prevState) => {
      const parsedDate = parseDateFromInput(value);

      return {
        ...prevState,
        [type]: parsedDate,
      };
    });
  };

  // Упрощаем передачу колбеков для onStartDateChange и onEndDateChange
  const handleStartDateChange = (value: string) => handleDateChange(value, "startDate");
  const handleEndDateChange = (value: string) => handleDateChange(value, "endDate");

  // Обработка изменения значения инпута
  const handleDateInputChange = (value: string) => setInputDateValue(value);

  // Выбор текущей даты
  const selectToday = () => {
    setCalendarState((prevState) => ({
      ...prevState,
      date: dayjs(),
      startDate: null,
      endDate: null,
    }));
    changeDate(dayjs());
  };

  // Обработка потери фокуса инпутом
  const handleDateInputBlur = () => {
    const fixedDate = fixDateFormat(inputDateValue);
    const parsedDate = parseDateFromInput(fixedDate);
  
    if (parsedDate && parsedDate.isValid()) {
      setCalendarState((prevState) => ({
        ...prevState,
        date: parsedDate,
        startDate: parsedDate,
        endDate: calendarState.isRangeMode ? parsedDate : null,
      }));
      setInputDateValue(parsedDate.format("DD-MM-YYYY"));
    } else {
      setInputDateValue("");
    }
  };

  // Обработка изменения времени
  const handleTimeChange = (value: string) => {
    setTimeValue(value);
  };

  // Логика переключения режима диапазона
  const toggleRangeMode = () => {
    setCalendarState((prevState) => ({
      ...prevState,
      isRangeMode: !prevState.isRangeMode,
    }));
  };

  const { date, startDate, endDate, isRangeMode } = calendarState;

  // Синхронизация инпута с календарем
  useEffect(() => {
    setInputDateValue(startDate ? startDate.format("DD-MM-YYYY") : "");
  }, [startDate]);

  return (
    <CalendarWrapper>
      <Heading
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
        <YearPicker currentYear={date.year()} onYearSelect={handleYearSelect} />
      )}
      {mode === "month" && (
        <MonthPicker currentMonth={date.month()} onMonthSelect={handleMonthSelect} />
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
