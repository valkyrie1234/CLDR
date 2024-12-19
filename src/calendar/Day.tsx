import React from "react";
import dayjs from "dayjs";
import { IDay } from "./utils/types";

const Day: React.FC<IDay & { hoveredDate: dayjs.Dayjs | null }> = ({
  currentDate,
  date,
  startDate,
  endDate,
  onClick,
  range,
  hoveredDate,
  onMouseEnter,
  onMouseLeave,
}) => {
  const className: string[] = [];

  // Добавление класса для текущей даты
  if (dayjs().isSame(date, "day")) {
    className.push("today");
  }

  // Добавление класса для активной даты
  if (startDate && date.isSame(startDate, "day")) {
    className.push("start");
  }

  // Обработка диапазона дат
  if (range) {
    if (startDate && endDate) {
      if (date.isSame(startDate, "day")) className.push("start");
      if (date.isSame(endDate, "day")) className.push("end");
      if (date.isBetween(startDate, endDate, null, "[]")) className.push("between");
    } else if (startDate && hoveredDate) {
      if (date.isSame(startDate, "day")) className.push("start");
      if (date.isBetween(startDate, hoveredDate, null, "[]")) className.push("between-hover");
    }
  } else {
    // Обработка выделения для одиночной даты
    if (hoveredDate && date.isSame(hoveredDate, "day") && !startDate?.isSame(date, "day")) {
      className.push("hover-end");
    }
  }

  // Добавление класса для дней другого месяца
  if (!date.isSame(currentDate, "month")) {
    className.push("muted");
  }

  return (
    <span
      onClick={() => onClick(date)}
      className={className.join(" ")}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {date.date()}
    </span>
  );
};

export default Day;
