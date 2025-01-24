import { FC, useRef, useEffect } from "react";
import { InputStyled } from "../styles";
import { DateInputsProps } from "../types";
import { format } from "../../../utils/consts";

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
      startDateInput.current.value = startDate ? startDate.format(format) : "";
    }
  }, [startDate]);

  useEffect(() => {
    if (endDateInput.current) {
      endDateInput.current.value = endDate ? endDate.format(format) : "";
    }
  }, [endDate]);

  return (
    <div className="input-container">
      {range ? (
        <>
          <InputStyled
            ref={startDateInput}
            type="text"
            placeholder={format}
            onBlur={(e) => onStartDateChange(e.target.value)}
          />
          <InputStyled
            ref={endDateInput}
            type="text"
            placeholder={format}
            onBlur={(e) => onEndDateChange(e.target.value)}
          />
        </>
      ) : (
        <>
          <InputStyled
            type="text"
            placeholder={format}
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
