import { Dayjs } from "dayjs";

export interface ICalendar {
  range?: boolean;
  showTodayButton?: boolean;
  initialDate?: Dayjs;
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
  startDate: Dayjs | null;
  endDate: Dayjs | null;
  range: boolean;
  date: Dayjs;
  changeMonth: (date: number) => void;
  resetDate: () => void;
  onStartDateChange: (value: string) => void;
  onEndDateChange: (value: string) => void;
  mode: "day" | "month" | "year";
  setMode: React.Dispatch<React.SetStateAction<"day" | "month" | "year">>;
  changeYear: (year: number) => void;
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