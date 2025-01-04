import { Dayjs } from "dayjs";

export interface CalendarContextProps {
    date: Dayjs;
    startDate: Dayjs | null;
    endDate: Dayjs | null;
    setDate: (date: Dayjs) => void;
    setStartDate: (date: Dayjs | null) => void;
    setEndDate: (date: Dayjs | null) => void;
    resetDates: () => void;
    changeMonth: (month: number) => void;
    changeYear: (year: number) => void;
    selectRange: (rangeType: "week" | "month" | "quarter" | "year") => void;
  }