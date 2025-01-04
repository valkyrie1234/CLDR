import { FC, useRef, useEffect } from "react";
import { PeriodInputStyled } from "../styles";
import { Dayjs } from "dayjs";

interface DateInputsProps {
  range: boolean;
  startDate: Dayjs | null;
  endDate: Dayjs | null;
  onStartDateChange: (value: string) => void;
  onEndDateChange: (value: string) => void;
  inputDateValue: string;
  onDateInputChange: (value: string) => void;
  onDateInputBlur: () => void;
}

const DateInputs: FC<DateInputsProps> = ({
  range,
  startDate,
  endDate,
  onStartDateChange,
  onEndDateChange,
  inputDateValue,
  onDateInputChange,
  onDateInputBlur,
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
        </>
      ) : (
        <PeriodInputStyled
          type="text"
          placeholder="DD-MM-YYYY"
          value={inputDateValue}
          onChange={(e) => onDateInputChange(e.target.value)}
          onBlur={onDateInputBlur}
        />
      )}
    </div>
  );
};

export default DateInputs;
