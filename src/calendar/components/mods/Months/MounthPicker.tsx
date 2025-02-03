import React from "react";
import { monthNames } from "../../../consts";
import { MonthItem, MonthGrid } from './styles';
import { MonthPickerProps } from './types';
import dayjs from "dayjs";

const MonthPicker: React.FC<MonthPickerProps> = React.memo(({ currentMonth, onMonthSelect, minDate, maxDate, currentYear }) => {
  const isMonthDisabled = (month: number) => {
    if(currentYear){
      const date = dayjs().year(currentYear).month(month);
      if (minDate && date.isBefore(minDate, 'month')) return true;
      if (maxDate && date.isAfter(maxDate, 'month')) return true;
      return false;
    }
  };

  return (
    <MonthGrid>
      {monthNames.map((month, index) => (
        <MonthItem
          key={month}
          className={index === currentMonth ? "selected" : ""}
          onClick={() => !isMonthDisabled(index) && onMonthSelect(index)}
          disabled={isMonthDisabled(index)}
        >
          {month}
        </MonthItem>
      ))}
    </MonthGrid>
  );
});

export default MonthPicker;
