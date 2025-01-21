import { Dayjs } from "dayjs";

export interface IHeader {
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

export interface DateInputsProps {
  range: boolean;
  startDate: Dayjs | null;
  endDate: Dayjs | null;
  onStartDateChange: (value: string) => void;
  onEndDateChange: (value: string) => void;
  inputDateValue: string;
  onDateInputChange: (value: string) => void;
  onDateInputBlur: () => void;
  timePicker?: boolean;
  onTimeChange?: (value: string) => void;
  timeValue?: string;
}
export interface HeaderControlsProps {
  mode: "day" | "month" | "year";
  date: Dayjs;
  changeYear: (year: number) => void;
  changeMonth: (month: number) => void;
  setMode: (mode: "day" | "month" | "year") => void;
  handleYearScroll: (direction: "prev" | "next") => void;
}