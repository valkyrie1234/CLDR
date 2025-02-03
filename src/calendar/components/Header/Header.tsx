import { FC, useEffect, useRef } from "react";
import dayjs from "dayjs";
import quarterOfYear from "dayjs/plugin/quarterOfYear";
import "dayjs/locale/ru";
import { DATE_FORMAT } from "@rgs-ui/date-utils";

import { IHeader } from "./types";
import {
  HeaderWrapper,
  ResetButton,
  ToggleAndButtonContainer,
} from "./styles";
import HeaderControls from "./components/controls/HeaderControls";
import PeriodInput from "./components/inputs/PeriodInput";
import SingleInput from "./components/inputs/SingleInput";
import Toggle from "./components/controls/Toggle";

dayjs.extend(quarterOfYear);
dayjs.locale("ru");

const Header: FC<IHeader> = ({
  mode,
  date,
  range,
  endDate,
  timeValue,
  startDate,
  showToggle,
  timePicker,
  inputDateValue,
  endDateInputValue,
  navigationControls,
  startDateInputValue,
  onDateInputChange,
  onStartDateChange,
  toggleRangeMode,
  onEndDateChange,
  onDateInputBlur,
  onTimeChange,
  changeMonth,
  changeYear,
  resetDate,
  setMode,
}) => {
  const startDateInput = useRef<HTMLInputElement | null>(null);
  const endDateInput = useRef<HTMLInputElement | null>(null);

  // Синхронизация инпутов с выбранными датами
  useEffect(() => {
    if (startDateInput.current) {
      startDateInput.current.value = startDate
        ? startDate.format(DATE_FORMAT)
        : '';
    }
  }, [startDate]);

  useEffect(() => {
    if (endDateInput.current) {
      endDateInput.current.value = endDate ? endDate.format(DATE_FORMAT) : '';
    }
  }, [endDate]);

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
    if (start && end) {
      onStartDateChange(start.format(DATE_FORMAT));
      onEndDateChange(end.format(DATE_FORMAT));
    }
  };

  // Обработка пролистывания годов
  const handleYearScroll = (direction: "prev" | "next") => {
    const yearOffset = direction === "prev" ? -10 : 10;
    changeYear(date.year() + yearOffset);
  };

  return (
    <HeaderWrapper $timePicker={timePicker} $range={range}>
      <ToggleAndButtonContainer>
        <Toggle
        range={range}
        showToggle={showToggle}
        toggleRangeMode={toggleRangeMode}
        />
        <ResetButton onClick={resetDate}>Сбросить</ResetButton>
      </ToggleAndButtonContainer>
      <div className="header-top">
        <div className="input-container">
          {range ? (
            <PeriodInput
              startDateInputValue={startDateInputValue}
              endDateInputValue={endDateInputValue}
              onDateInputChange={onDateInputChange}
              onStartDateChange={onStartDateChange}
              onEndDateChange={onEndDateChange}
              handleSelectionChange={handleSelectionChange}
            />
          ) : (
            <SingleInput
              inputDateValue={inputDateValue}
              onDateInputBlur={onDateInputBlur}
              onDateInputChange={onDateInputChange}
              onEndDateChange={onEndDateChange}
              onTimeChange={onTimeChange}
              timePicker={timePicker}
              timeValue={timeValue}
            />
          )}
        </div>
      </div>
      <HeaderControls
        mode={mode}
        date={date}
        changeYear={changeYear}
        changeMonth={changeMonth}
        setMode={setMode}
        handleYearScroll={handleYearScroll}
        navigationControls={navigationControls}
      />
    </HeaderWrapper>
  );
};

export default Header;
