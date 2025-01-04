import { Dayjs } from "dayjs";

export interface ICalendar {
  range?: boolean;
  showTodayButton?: boolean;
  initialDate?: Dayjs;
  showToggle?: boolean;
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
