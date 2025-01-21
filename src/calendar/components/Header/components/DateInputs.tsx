import { FC, useRef, useEffect } from "react";
import { InputStyled } from "../styles";
import { DateInputsProps } from "../types";

const DateInputs: FC<DateInputsProps> = ({
  range,
  startDate,
  endDate,
  onStartDateChange,
  onEndDateChange,
  inputDateValue,
  onDateInputChange,
  onDateInputBlur,
  timePicker,
  onTimeChange,
  timeValue,
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

  return (
    <div className="input-container">
      {range ? (
        <>
          <InputStyled
            ref={startDateInput}
            type="text"
            placeholder="DD-MM-YYYY"
            onChange={(e) => onStartDateChange(e.target.value)}
          />
          <InputStyled
            ref={endDateInput}
            type="text"
            placeholder="DD-MM-YYYY"
            onChange={(e) => onEndDateChange(e.target.value)}
          />
        </>
      ) : (
        <>
          <InputStyled
            type="text"
            placeholder="DD-MM-YYYY"
            value={inputDateValue}
            onChange={(e) => onDateInputChange(e.target.value)}
            onBlur={onDateInputBlur}
          />
          {timePicker && (
            <InputStyled
              type="time"
              value={timeValue}
              onChange={(e) => onTimeChange?.(e.target.value)}
            />
          )}
        </>
      )}
    </div>
  );
};

export default DateInputs;
