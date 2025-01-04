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
  range = false,
  showTodayButton = false,
  initialDate,
  showToggle = false,
  minDate,
  maxDate,
}) => {
  const [state, setState] = useState<{
    date: Dayjs;
    startDate: Dayjs | null;
    endDate: Dayjs | null;
    isRangeMode: boolean;
    initialDate: Dayjs;
  }>({
    date: initialDate || dayjs(),
    startDate: null,
    endDate: null,
    isRangeMode: range,
    initialDate: initialDate || dayjs(),
  });

  const [mode, setMode] = useState<"day" | "month" | "year">("day");
  const [inputDateValue, setInputDateValue] = useState<string>("");

  // Обработка выбора года
  const handleYearSelect = (year: number) => {
    setState((prevState) => ({
      ...prevState,
      date: prevState.date.year(year),
    }));
    setMode("month");
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
    if (mode === "year") {
      setMode("year");
    } else {
      setMode("day");
    }
  };

  // Обработка выбора месяца
  const handleMonthSelect = (month: number) => {
    setState((prevState) => ({
      ...prevState,
      date: prevState.date.month(month),
    }));
    setMode("day");
  };

  // Сброс даты к начальному значению или текущей дате
  const resetDate = () => {
    setState((prevState) => ({
      ...prevState,
      date: prevState.initialDate,
      startDate: null,
      endDate: null,
    }));
    setInputDateValue("");
  };

  // Изменение выбранной даты
  const changeDate = (selectedDate: Dayjs) => {
    setState((prevState) => {
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
    setState((prevState) => ({
      ...prevState,
      date: dayjs(),
      startDate: null,
      endDate: null,
    }));
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
        endDate: state.isRangeMode ? parsedDate : null,
      }));
    }
  };

  const { date, startDate, endDate, isRangeMode } = state;

  // Синхронизация инпута с календарем
  useEffect(() => {
    if (startDate) {
      setInputDateValue(startDate.format("DD-MM-YYYY"));
    } else {
      setInputDateValue("");
    }
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
        onStartDateChange={(value) => handleDateChange(value, "startDate")}
        onEndDateChange={(value) => handleDateChange(value, "endDate")}
        mode={mode}
        setMode={setMode}
        showToggle={showToggle}
        toggleRangeMode={() => setState((prev) => ({ ...prev, isRangeMode: !prev.isRangeMode }))}
        inputDateValue={inputDateValue}
        onDateInputChange={handleDateInputChange}
        onDateInputBlur={handleDateInputBlur}
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
