import { FC } from 'react';
import {
  DATE_MASK,
  DATE_PLACEHOLDER,
  TIME_MASK,
  TIME_PLACEHOLDER,
} from '@rgs-ui/date-utils';
import { PeriodInputStyled, SingleInputStyled } from '../styles';
import { ISingleInput } from '../types';

const SingleInput: FC<ISingleInput> = ({
  timeValue,
  timePicker,
  inputDateValue,
  onDateInputChange,
  onDateInputBlur,
  onTimeChange,
}) => {
  return timePicker ? (
    <>
      <PeriodInputStyled
        invalid={false}
        errorMessage="Введите корректную дату"
        value={inputDateValue}
        onChange={(e) => onDateInputChange(e.target.value, 'inputDateValue')}
        onBlur={onDateInputBlur}
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
        mask={{
          alias: TIME_MASK,
          showMaskOnHover: false,
          placeholder: TIME_PLACEHOLDER,
        }}
        label={'Время'}
        large={false}
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
      onBlur={onDateInputBlur}
      placeholder={DATE_PLACEHOLDER}
      label={'Введите дату'}
      large={false}
    />
  );
};

export default SingleInput;
