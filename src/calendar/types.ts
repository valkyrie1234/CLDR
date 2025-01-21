import { Dayjs } from "dayjs";

export interface ICalendar {
  range?: boolean;
  showTodayButton?: boolean;
  initialDate?: Dayjs;
  showToggle?: boolean;
  minDate?: Dayjs;
  maxDate?: Dayjs;
  timePicker?: boolean;
}

export interface IDayProps {
  isToday?: boolean;
  isActive?: boolean;
  isStart?: boolean;
  isEnd?: boolean;
  isBetween?: boolean;
  isBetweenHover?: boolean;
  isMuted?: boolean;
  isHoverEnd?: boolean;
}
