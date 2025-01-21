import { Dayjs } from "dayjs";

export interface IDays {
    date: Dayjs;
    startDate: Dayjs | null;
    endDate: Dayjs | null;
    onClick: (selectedDate: Dayjs) => void;
    range: boolean;
  };
  
export interface IDay extends IDays {
    currentDate: Dayjs;
    onMouseEnter: () => void,
    onMouseLeave: () => void
  };