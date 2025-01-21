import React from "react";
import dayjs, { Dayjs } from "dayjs";
import { IDay } from "../types";
import { DayWrapper } from "../styles";

const Day: React.FC<IDay & { hoveredDate: dayjs.Dayjs | null; minDate?: Dayjs; maxDate?: Dayjs }> = ({
  currentDate,
  date,
  startDate,
  endDate,
  onClick,
  range,
  hoveredDate,
  onMouseEnter,
  onMouseLeave,
  minDate,
  maxDate,
}) => {
  // Проверка, находится ли дата в допустимом диапазоне
  const isDisabled = (minDate && date.isBefore(minDate, "day")) || (maxDate && date.isAfter(maxDate, "day"));

  // Определение состояний для стилей
  const isToday = dayjs().isSame(date, "day") || undefined;
  const isStart = (startDate && date.isSame(startDate, "day")) || undefined;
  const isEnd = (endDate && date.isSame(endDate, "day")) || undefined;
  const isBetween = (range && startDate && endDate && date.isBetween(startDate, endDate, null, "[]")) || undefined;
  const isBetweenHover = (range && startDate && hoveredDate && date.isBetween(startDate, hoveredDate, null, "[]")) || undefined;
  const isMuted = (!date.isSame(currentDate, "month")) || undefined;

  // Проверка, является ли дата частью выделенного диапазона
  const isPartOfRange = range && startDate && endDate && date.isBetween(startDate, endDate, null, "[]");

  // Проверка, является ли дата граничной (начало или конец диапазона)
  const isBoundary = isStart || isEnd;

  return (
    <DayWrapper
      isToday={isToday}
      isStart={isStart}
      isEnd={isEnd}
      isBetween={isBetween}
      isBetweenHover={isBetweenHover}
      isMuted={isMuted}
      isDisabled={isDisabled}
      shouldHover={!isPartOfRange && !isBoundary}
      onClick={() => !isDisabled && onClick(date)}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {date.date()}
    </DayWrapper>
  );
};

export default Day;
