import { FC, useEffect, useRef } from 'react';
import { DATE_FORMAT } from '@rgs-ui/date-utils';
import { DateInputsProps } from '../types';
import PeriodInput from './PeriodInput';
import SingleInput from './SingleInputStyled';

const DateInputs: FC<DateInputsProps> = ({
  range,
  endDate,
  timeValue,
  startDate,
  timePicker,
  inputDateValue,
  endDateInputValue,
  startDateInputValue,
  handleSelectionChange,
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

  return (
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
  );
};

export default DateInputs;
