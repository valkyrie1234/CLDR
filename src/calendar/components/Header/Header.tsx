import { FC } from "react";
import dayjs from "dayjs";
import quarterOfYear from "dayjs/plugin/quarterOfYear";
import "dayjs/locale/ru";
import { DATE_FORMAT } from "@rgs-ui/date-utils";

import { IHeader } from "./types";
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
    if(start && end){
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
    <HeaderWrapper
              $timePicker={timePicker}
              $range={range}
    >
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
              handleSelectionChange={handleSelectionChange}
              endDateInputValue={endDateInputValue}
              startDateInputValue={startDateInputValue}
              range={range}
              startDate={startDate}
              endDate={endDate}
              onStartDateChange={onStartDateChange}
              onEndDateChange={onEndDateChange}
              inputDateValue={inputDateValue}
              onDateInputChange={onDateInputChange}
              onDateInputBlur={onDateInputBlur}
              timePicker={timePicker}
              onTimeChange={onTimeChange}
              timeValue={timeValue}
            />
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
