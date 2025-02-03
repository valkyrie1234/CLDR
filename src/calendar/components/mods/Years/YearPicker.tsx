import React from "react";
import { YearItem, YearGrid } from './styles';
import { YearPickerProps } from './types';

const YearPicker: React.FC<YearPickerProps> = ({ currentYear, onYearSelect, minDate, maxDate }) => {
  const startYear = currentYear - 8;
  const years = Array.from({ length: 16 }, (_, i) => startYear + i);

  const isYearDisabled = (year: number) => {
    if (minDate && year < minDate.year()) return true;
    if (maxDate && year > maxDate.year()) return true;
    return false;
  };

  return (
    <YearGrid>
      {years.map((year) => (
        <YearItem
          key={year}
          className={year === currentYear ? "selected" : ""}
          onClick={() => !isYearDisabled(year) && onYearSelect(year)}
          disabled={isYearDisabled(year)}
        >
          {year}
        </YearItem>
      ))}
    </YearGrid>
  );
};

export default YearPicker;
