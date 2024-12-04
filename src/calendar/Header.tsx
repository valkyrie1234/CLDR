import React from "react";
import dayjs from "dayjs";
import { monthNames } from "./utils/consts";
import { IHeading } from "./utils/types";
import "dayjs/locale/ru";
import { HeaderWrapper } from "./style/styles";

dayjs.locale("ru");

const Heading: React.FC<IHeading> = ({
  date,
  changeMonth,
  resetDate,
  range,
  endDate,
  startDate,
  onStartDateChange,
  onEndDateChange,
  mode,
  setMode,
  changeYear,
}) => {
  const startDateInput = React.useRef<HTMLInputElement | null>(null);
  const endDateInput = React.useRef<HTMLInputElement | null>(null);

  React.useEffect(() => {
    if (startDate && startDateInput.current) {
      startDateInput.current.value = startDate.format("DD-MM-YYYY");
    }
  }, [startDate]);

  React.useEffect(() => {
    if (endDate && endDateInput.current) {
      endDateInput.current.value = endDate.format("DD-MM-YYYY");
    }
  }, [endDate]);

  const handleSelectionChange = (value: string) => {
    const today = dayjs();
    let start, end;

    switch (value) {
      case "current-week":
        start = today.startOf("week");
        end = today.endOf("week");
        break;
      case "current-month":
        start = today.startOf("month");
        end = today.endOf("month");
        break;
      case "current-quarter":
        start = today.startOf("quarter");
        end = today.endOf("quarter");
        break;
      case "current-year":
        start = today.startOf("year");
        end = today.endOf("year");
        break;
      default:
        return;
    }

    onStartDateChange(start.format("DD-MM-YYYY"));
    onEndDateChange(end.format("DD-MM-YYYY"));
  };

  return (
    <HeaderWrapper>
      <button onClick={resetDate}>Reset</button>
      {range && (
        <div>
          <select onChange={(e) => handleSelectionChange(e.target.value)}>
            <option value="">Выберите диапазон</option>
            <option value="current-week">Текущая неделя</option>
            <option value="current-month">Текущий месяц</option>
            <option value="current-quarter">Текущий квартал</option>
            <option value="current-year">Текущий год</option>
          </select>
          <input
            ref={startDateInput}
            type="text"
            placeholder="DD-MM-YYYY"
            onChange={(e) => onStartDateChange(e.target.value)}
          />
          <input
            ref={endDateInput}
            type="text"
            placeholder="DD-MM-YYYY"
            onChange={(e) => onEndDateChange(e.target.value)}
          />
        </div>
      )}
      <h1>
        {monthNames[date.month()]} <small>{date.year()}</small>
      </h1>
      <button onClick={() => changeMonth(date.month() - 1)}>&#8249;</button>
      <button onClick={() => changeMonth(date.month() + 1)}>&#8250;</button>
    </HeaderWrapper>
  );
};

export default Heading;