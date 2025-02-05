import { FC, useCallback, useEffect, useState } from 'react';
import {
  DATE_FORMAT,
  DATE_MASK,
  DATE_PLACEHOLDER,
  TIME_MASK,
  TIME_PLACEHOLDER,
} from '@rgs-ui/date-utils';
import dayjs from 'dayjs';
import { PeriodInputStyled, SingleInputStyled } from './styles';
import { ISingleInput } from './types';
import useDebounce from "./useDebounce";

const SingleInput: FC<ISingleInput> = ({
  minDate,
  maxDate,
  timeValue,
  timePicker,
  inputDateValue,
  onDateInputChange,
  onDateInputBlur,
  onTimeChange,
}) => {
  const [dateError, setDateError] = useState<string | null>(null);
  const [timeError, setTimeError] = useState<string | null>(null);
  const debouncedInputValue = useDebounce(inputDateValue, 300); 
  const debouncedTimeValue = useDebounce(timeValue, 300); 

  /** Валидация даты */
  const validateDate = useCallback((value: string) => {
    const date = dayjs(value, DATE_FORMAT, true);
    if (!date.isValid() && value !== "" && value[9] !== "Г") {
      return "Неверный формат даты";
    }
    if (minDate && date.isBefore(minDate, "day")) {
      return `Дата не может быть раньше ${minDate.format(DATE_FORMAT)}`;
    }
    if (maxDate && date.isAfter(maxDate, "day")) {
      return `Дата не может быть позже ${maxDate.format(DATE_FORMAT)}`;
    }
    return null;
  }, [maxDate, minDate]);

  /** Функция для валидации времени */
  const validateTime = useCallback((value: string) => {
    const timePattern = /^(2[0-3]|[01][0-9]):[0-5][0-9]$/;
    if (!timePattern.test(value) && value !== "" && value[4] !== 'М') {
      return "Введите корректное значение времени";
    }
    return null;
  }, []);

  /** Обработка потери фокуса на поле даты */
  const handleDateBlur = (value: string) => {
    const error = validateDate(value);
    setDateError(error);
    if (!error) {
      onDateInputBlur();
    }
  };

  /** Обработка потери фокуса на поле времени */
  const handleTimeBlur = (value: string) => {
    const testLength = value.split('').filter(el => el !== ":" && el !== "Г" && el !== "М").length
    const error = validateTime(value);
    setTimeError(error);
    if (!error) {
      onTimeChange(value);
    }
    if(value[4] === 'М' && testLength === 3){
      setTimeError("Введите время до конца");
    }
  };

  useEffect(() => {
    setDateError(validateDate(debouncedInputValue));
  }, [debouncedInputValue, validateDate]);

  useEffect(() => {
    setTimeError(validateTime(debouncedTimeValue));
  }, [debouncedTimeValue, validateTime]);

  return timePicker ? (
    <>
      <PeriodInputStyled
        invalid={!!dateError}
        errorMessage={dateError || ""}
        value={inputDateValue}
        onChange={(e) => onDateInputChange(e.target.value, 'inputDateValue')}
        onBlur={(e) => handleDateBlur(e.target.value)}
        mask={{
          mask: DATE_MASK,
          showMaskOnHover: false,
          placeholder: DATE_PLACEHOLDER,
        }}
        label={'Дата'}
        large={false}
      />

      <PeriodInputStyled
        value={timeValue === '00:00' ? undefined : timeValue}
        onChange={(e) => onTimeChange(e.target.value)}
        onBlur={(e) => handleTimeBlur(e.target.value)}
        mask={{
          alias: TIME_MASK,
          showMaskOnHover: false,
          placeholder: TIME_PLACEHOLDER,
        }}
        label={'Время'}
        large={false}
        invalid={!!timeError}
        errorMessage={timeError || ""}
      />
    </>
  ) : (
    <SingleInputStyled
      mask={{
        mask: DATE_MASK,
        showMaskOnHover: false,
        placeholder: DATE_PLACEHOLDER,
      }}
      value={inputDateValue}
      onChange={(e) => onDateInputChange(e.target.value, 'inputDateValue')}
      onBlur={(e) => handleDateBlur(e.target.value)}
      placeholder={DATE_PLACEHOLDER}
      label={'Введите дату'}
      large={false}
      invalid={!!dateError}
      errorMessage={dateError || ""}
    />
  );
};

export default SingleInput;
