import { FC, useRef, useEffect } from "react";
import dayjs from "dayjs";
import quarterOfYear from "dayjs/plugin/quarterOfYear";
import "dayjs/locale/ru";
import { monthNames } from "../../utils/consts";
import { IHeading } from "./types";
import { HeaderWrapper, PeriodInputStyled, HeaderControls, ResetButton, Slider, Toggle, ToggleAndButton, ToggleContainer, ToggleLabel } from "./styles";

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
  const startDateInput = useRef<HTMLInputElement | null>(null);
  const endDateInput = useRef<HTMLInputElement | null>(null);

  // Синхронизация инпутов с выбранными датами
  useEffect(() => {
    if (startDateInput.current) {
      startDateInput.current.value = startDate ? startDate.format("DD-MM-YYYY") : "";
    }
  }, [startDate]);

  useEffect(() => {
    if (endDateInput.current) {
      endDateInput.current.value = endDate ? endDate.format("DD-MM-YYYY") : "";
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
        {range ? (
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
        ) : (
          <div className="input-container">
            <PeriodInputStyled
              type="text"
              placeholder="DD-MM-YYYY"
              value={inputDateValue}
              onChange={(e) => onDateInputChange(e.target.value)}
              onBlur={onDateInputBlur}
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
        {mode === "day" ? (
          <>
            <button onClick={() => changeYear(date.year() - 1)}>&#8656;</button>
            <button onClick={() => changeMonth(date.month() - 1)}>&#8249;</button>
            <h1>
              <span onClick={() => setMode("month")}>{monthNames[date.month()]}</span>{" "}
              <small onClick={() => setMode("year")}>{date.year()}</small>
            </h1>
            <button onClick={() => changeMonth(date.month() + 1)}>&#8250;</button>
            <button onClick={() => changeYear(date.year() + 1)}>&#8658;</button>
          </>
        ) : mode === "month" ? (
          <>
            <h1>
              <span>{monthNames[date.month()]}</span>{" "}
              <small>{date.year()}</small>
            </h1>
          </>
        ) : (
          <>
            <button onClick={() => handleYearScroll("prev")}>&#8656;</button>
            <h1>
              <span>{date.year()}</span>
            </h1>
            <button onClick={() => handleYearScroll("next")}>&#8658;</button>
          </>
        )}
      </HeaderControls>
    </HeaderWrapper>
  );
};

export default Heading;
