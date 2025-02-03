import { FC, useEffect, useRef } from "react";
import { DATE_FORMAT, DATE_MASK, DATE_PLACEHOLDER, TIME_MASK, TIME_PLACEHOLDER } from "@rgs-ui/date-utils";
import { PeriodInputStyled, SingleInputStyled } from "../styles";
import { DateInputsProps } from "../types";

const DateInputs: FC<DateInputsProps> = ({
  range,
  endDate,
  timeValue,
  startDate,
  timePicker,
  inputDateValue,
  endDateInputValue,
  startDateInputValue,
  onStartDateChange,
  onDateInputChange,
  onEndDateChange,
  onDateInputBlur,
  onTimeChange,
}) => {
  const startDateInput = useRef<HTMLInputElement | null>(null);
  const endDateInput = useRef<HTMLInputElement | null>(null);

  // Синхронизация инпутов с выбранными датами
  useEffect(() => {
    if (startDateInput.current) {
      startDateInput.current.value = startDate ? startDate.format(DATE_FORMAT) : "";
    }
  }, [startDate]);

  useEffect(() => {
    if (endDateInput.current) {
      endDateInput.current.value = endDate ? endDate.format(DATE_FORMAT) : "";
    }
  }, [endDate]);

  return (
    <div className="input-container">
      {range ? (
        <>
          <PeriodInputStyled
            value={startDateInputValue}
            onChange={(e) => onDateInputChange(e.target.value, "startDateInputValue")}
            onBlur={(e) => onStartDateChange(e.target.value)}
            mask={{ mask: DATE_MASK, showMaskOnHover: false, placeholder: DATE_PLACEHOLDER }}
            label={"Начало"}
            large={false}
          />

          <PeriodInputStyled
            value={endDateInputValue}
            onChange={(e) => onDateInputChange(e.target.value, "endDateInputValue")}
            onBlur={(e) => onEndDateChange(e.target.value)}
            mask={{ mask: DATE_MASK, showMaskOnHover: false, placeholder: DATE_PLACEHOLDER }}
            label={"Конец"}
            large={false}
          />
        </>
      ) : timePicker ? (
        <>
          <PeriodInputStyled
            value={inputDateValue}
            onChange={(e) => onDateInputChange(e.target.value, "inputDateValue")}
            onBlur={onDateInputBlur}
            mask={{ mask: DATE_MASK, showMaskOnHover: false, placeholder: DATE_PLACEHOLDER }}
            label={"Дата"}
            large={false}
          />

          <PeriodInputStyled
            value={timeValue === "00:00" ? undefined : timeValue}
            onChange={(e) => onTimeChange(e.target.value)}
            mask={{ alias: TIME_MASK, showMaskOnHover: false, placeholder: TIME_PLACEHOLDER }}
            label={"Время"}
            large={false}
          />
        </>
      ) : (
        <SingleInputStyled
          mask={{ mask: DATE_MASK, showMaskOnHover: false, placeholder: DATE_PLACEHOLDER }}
          value={inputDateValue}
          onChange={(e) => onDateInputChange(e.target.value, "inputDateValue")}
          onBlur={onDateInputBlur}
          placeholder={DATE_PLACEHOLDER}
          label={"Введите дату"}
          large={false}
        />
      )}
    </div>
  );
};

export default DateInputs;
