import React from "react";
import { monthNames } from "../utils/consts";
import { MonthItem, MonthGrid } from '../style/styles'
import { MonthPickerProps } from '../utils/types'

const MonthPicker: React.FC<MonthPickerProps> = ({ currentMonth, onMonthSelect }) => {
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
};

export default MonthPicker;
