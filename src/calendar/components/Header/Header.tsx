import { FC } from "react";
import dayjs from "dayjs";
import quarterOfYear from "dayjs/plugin/quarterOfYear";
import "dayjs/locale/ru";

import { IHeading } from "./types";
import {
  HeaderWrapper,
  ResetButton,
  Slider,
  Toggle,
  ToggleAndButton,
  ToggleContainer,
  ToggleLabel,
} from "./styles";
import DateInputs from "./components/DateInputs";
import HeaderControls from "./components/HeaderControls";

dayjs.extend(quarterOfYear);
dayjs.locale("ru");

const Heading: FC<IHeading> = ({
  date,
  changeMonth,
  resetDate,
  range,
  endDate,
  startDate,
  onStartDateChange,
  onEndDateChange,
  changeYear,
  showToggle,
  toggleRangeMode,
  inputDateValue,
  onDateInputChange,
  onDateInputBlur,
  mode,
  setMode,
}) => {

  // Обработка выбора диапазона дат
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

  // Обработка пролистывания годов
  const handleYearScroll = (direction: "prev" | "next") => {
    const yearOffset = direction === "prev" ? -10 : 10;
    changeYear(date.year() + yearOffset);
  };

  return (
    <HeaderWrapper>
      <ToggleAndButton>
        {showToggle && (
          <ToggleContainer>
            <Toggle>
              <input type="checkbox" checked={range} onChange={toggleRangeMode} />
              <Slider />
            </Toggle>
            <ToggleLabel>{range ? "Диапазон" : "Одна дата"}</ToggleLabel>
          </ToggleContainer>
        )}
        <ResetButton onClick={resetDate}>Сбросить</ResetButton>
      </ToggleAndButton>
      <div className="header-top">
        <DateInputs
          range={range}
          startDate={startDate}
          endDate={endDate}
          onStartDateChange={onStartDateChange}
          onEndDateChange={onEndDateChange}
          inputDateValue={inputDateValue}
          onDateInputChange={onDateInputChange}
          onDateInputBlur={onDateInputBlur}
        />
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
      <HeaderControls
        mode={mode}
        date={date}
        changeYear={changeYear}
        changeMonth={changeMonth}
        setMode={setMode}
        handleYearScroll={handleYearScroll}
      />
    </HeaderWrapper>
  );
};

export default Heading;
