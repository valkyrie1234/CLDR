import React from "react";
import {YearItem , YearGrid} from '../style/styles'
import { YearPickerProps } from '../utils/types'

const YearPicker: React.FC<YearPickerProps> = ({ currentYear, onYearSelect }) => {
  const startYear = currentYear - 10;
  const years = Array.from({ length: 20 }, (_, i) => startYear + i);

  return (
    <YearGrid>
      {years.map((year) => (
        <YearItem
          key={year}
          className={year === currentYear ? "selected" : ""}
          onClick={() => onYearSelect(year)}
        >
          {year}
        </YearItem>
      ))}
    </YearGrid>
  );
};

export default YearPicker;
