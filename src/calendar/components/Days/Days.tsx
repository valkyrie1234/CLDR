import React from "react";
import dayjs, { Dayjs } from "dayjs";
import isBetween from "dayjs/plugin/isBetween";
import Day from "./components/Day";
import { daysOfWeek, format } from "../../utils/consts";
import { IDays } from "./types";
import { CalendarDays } from "./styles";

dayjs.extend(isBetween);

const Days: React.FC<IDays & { minDate?: Dayjs; maxDate?: Dayjs }> = ({
  date,
  startDate,
  endDate,
  onClick,
  range,
  minDate,
  maxDate,
}) => {
  const [hoveredDate, setHoveredDate] = React.useState<Dayjs | null>(null);

  const firstDayOfMonth = date.startOf("month").day() === 0 ? 6 : date.startOf("month").day() - 1;
  const daysInMonth = date.daysInMonth();
  const previousMonth = date.subtract(1, "month");
  const previousMonthDays = previousMonth.daysInMonth();

  const days: React.ReactElement[] = [];
  const labels: React.ReactElement[] = [];

  // Создание меток дней недели
  for (let i = 0; i < 7; i++) {
    labels.push(
      <span className="label" key={`label-${i}`}>
        {daysOfWeek[i]}
      </span>
    );
  }

  // Добавление дней предыдущего месяца
  for (let i = 0; i < firstDayOfMonth; i++) {
    const prevDate = previousMonth.date(previousMonthDays - firstDayOfMonth + i + 1);
    days.push(
      <Day
        key={`prev-${prevDate.format(format)}`}
        onClick={onClick}
        currentDate={date}
        date={prevDate}
        startDate={startDate}
        endDate={endDate}
        range={range}
        hoveredDate={hoveredDate}
        onMouseEnter={() => setHoveredDate(prevDate)}
        onMouseLeave={() => setHoveredDate(null)}
        minDate={minDate}
        maxDate={maxDate}
      />
    );
  }

  // Добавление дней текущего месяца
  for (let i = 1; i <= daysInMonth; i++) {
    const currentDate = date.date(i);
    days.push(
      <Day
        key={currentDate.format(format)}
        onClick={onClick}
        currentDate={date}
        date={currentDate}
        startDate={startDate}
        endDate={endDate}
        range={range}
        hoveredDate={hoveredDate}
        onMouseEnter={() => setHoveredDate(currentDate)}
        onMouseLeave={() => setHoveredDate(null)}
        minDate={minDate}
        maxDate={maxDate}
      />
    );
  }

  // Добавление дней следующего месяца, чтобы заполнить календарь
  const totalDaysDisplayed = days.length;
  for (let i = 1; i <= 42 - totalDaysDisplayed; i++) {
    const nextDate = date.add(1, "month").date(i);
    days.push(
      <Day
        key={`next-${nextDate.format(format)}`}
        onClick={onClick}
        currentDate={date}
        date={nextDate}
        startDate={startDate}
        endDate={endDate}
        range={range}
        hoveredDate={hoveredDate}
        onMouseEnter={() => setHoveredDate(nextDate)}
        onMouseLeave={() => setHoveredDate(null)}
        minDate={minDate}
        maxDate={maxDate}
      />
    );
  }

  return <CalendarDays>{[...labels, ...days]}</CalendarDays>;
};

export default Days;
