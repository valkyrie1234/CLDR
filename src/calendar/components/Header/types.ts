import { Dayjs } from "dayjs";

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
    timePicker?: boolean;
    onTimeChange: (value: string) => void;
    timeValue: string;
  }