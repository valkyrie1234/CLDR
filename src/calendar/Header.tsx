import React from "react";
import dayjs from "dayjs";
import quarterOfYear from "dayjs/plugin/quarterOfYear";
import { monthNames } from "./utils/consts";
import { IHeading } from "./utils/types";
import "dayjs/locale/ru";
import { HeaderWrapper, PeriodInputStyled, HeaderControls } from "./style/styles";

dayjs.extend(quarterOfYear);

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
  // mode,
  // setMode,
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

    onStartDateChange(start.format("MM-DD-YYYY"));
    onEndDateChange(end.format("MM-DD-YYYY"));
  };

  return (
    <HeaderWrapper>
      <button className="classic-button" onClick={resetDate}>Сбросить</button>
      <div className="header-top">
        {range && (
          <div className="input-container">
            <PeriodInputStyled
              ref={startDateInput}
              type="text"
              placeholder="DD-MM-YYYY"
              onChange={(e) => onStartDateChange(e.target.value)}
            />
            <PeriodInputStyled
              ref={endDateInput}
              type="text"
              placeholder="DD-MM-YYYY"
              onChange={(e) => onEndDateChange(e.target.value)}
            />
          </div>
        )}
        {range && (
          <select onChange={(e) => handleSelectionChange(e.target.value)}>
            <option value="">Выберите диапазон</option>
            <option value="current-week">Текущая неделя</option>
            <option value="current-month">Текущий месяц</option>
            <option value="current-quarter">Текущий квартал</option>
            <option value="current-year">Текущий год</option>
          </select>
        )}
      </div>
      <HeaderControls>
        <button onClick={() => changeYear(date.year() - 1)}>&#8656;</button>
        <button onClick={() => changeMonth(date.month() - 1)}>&#8249;</button>
        <h1 className="month-year-title">
          {monthNames[date.month()]} <small>{date.year()}</small>
        </h1>
        <button onClick={() => changeMonth(date.month() + 1)}>&#8250;</button>
        <button onClick={() => changeYear(date.year() + 1)}>&#8658;</button>
      </HeaderControls>
    </HeaderWrapper>
  );
};

export default Heading;
