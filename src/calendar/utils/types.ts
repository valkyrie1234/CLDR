import { Dayjs } from "dayjs";

export interface ICalendar {
  range?: boolean;
  showTodayButton?: boolean;
  initialDate?: Dayjs;
  showToggle?: boolean;
}

export interface IDays {
  date: Dayjs;
  startDate: Dayjs | null;
  endDate: Dayjs | null;
  onClick: (selectedDate: Dayjs) => void;
  range: boolean;
}

export interface IDay extends IDays {
  currentDate: Dayjs;
  onMouseEnter: () => void,
  onMouseLeave: () => void
}

export interface IHeading {
  date: Dayjs;
  changeMonth: (month: number) => void;
  changeYear: (year: number) => void;
  resetDate: () => void;
  range: boolean;
  endDate: Dayjs | null;
  startDate: Dayjs | null;
  onStartDateChange: (value: string) => void;
  onEndDateChange: (value: string) => void;
  mode: "day" | "month" | "year";
  setMode: (mode: "day" | "month" | "year") => void;
  showToggle: boolean;
  toggleRangeMode: () => void;
  inputDateValue: string;
  onDateInputChange: (value: string) => void;
  onDateInputBlur: () => void;
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
