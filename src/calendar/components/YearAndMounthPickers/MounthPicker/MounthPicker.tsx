import React from "react";
import { monthNames } from "../../../consts";
import { MonthItem, MonthGrid } from './styles'
import { MonthPickerProps } from './types'

const MonthPicker: React.FC<MonthPickerProps> = React.memo(({ currentMonth, onMonthSelect }) => {
  return (
    <MonthGrid>
      {monthNames.map((month, index) => (
        <MonthItem
          key={month}
          className={index === currentMonth ? "selected" : ""}
          onClick={() => onMonthSelect(index)}
        >
          {month}
        </MonthItem>
      ))}
    </MonthGrid>
  );
});

export default MonthPicker;
