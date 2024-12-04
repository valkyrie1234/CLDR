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

  if (dayjs().isSame(date, "day")) {
    className.push("today");
  }

  if (startDate && date.isSame(startDate, "day")) {
    className.push("active");
  }

  if (range) {
    if (startDate && endDate) {
      if (date.isSame(startDate, "day")) className.push("start");
      if (date.isSame(endDate, "day")) className.push("end");
      if (date.isBetween(startDate, endDate, null, "[]")) className.push("between");
    } else if (startDate && hoveredDate) {
      if (date.isSame(startDate, "day")) className.push("start");
      if (date.isSame(hoveredDate, "day")) className.push("hover-end");
      if (date.isBetween(startDate, hoveredDate, null, "[]")) className.push("between-hover");
    }
  }

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