import { FC, useCallback, useEffect, useState } from "react";
import { DATE_FORMAT, DATE_MASK, DATE_PLACEHOLDER } from "@rgs-ui/date-utils";
import { Tooltip } from "@rgs-ui/tooltip";
import { Popover } from "@rgs-ui/popover";
import dayjs from "dayjs";
import DropDown from "../controls/DropDownList";
import { PeriodChips, PeriodInputStyled, StyledPopover } from "./styles";
import { IPeriodInput } from "./types";
import useDebounce from "./useDebounce";

const PeriodInput: FC<IPeriodInput> = ({
  minDate,
  maxDate,
  endDateInputValue,
  startDateInputValue,
  handleSelectionChange,
  onStartDateChange,
  onDateInputChange,
  onEndDateChange,
}) => {
  const [open, setOpen] = useState(false);
  const [startDateError, setStartDateError] = useState<string | null>(null);
  const [endDateError, setEndDateError] = useState<string | null>(null);
  const debouncedStartValue = useDebounce(startDateInputValue); 
  const debouncedEndValue = useDebounce(endDateInputValue); 


  const handleSelection = (value?: string) => {
    if (value) {
      handleSelectionChange(value);
    }
    setOpen(!open);
  };

  const toggleOpen: React.MouseEventHandler<HTMLButtonElement> = useCallback(
    (event) => {
      event.stopPropagation();
      setOpen(!open);
    },
    [open]
  );

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

  const handleStartDateBlur = (value: string) => {
    const error = validateDate(value);
    setStartDateError(error);
    if (!error) {
      onStartDateChange(value);
    }
  };

  const handleEndDateBlur = (value: string) => {
    const error = validateDate(value);
    setEndDateError(error);
    if (!error) {
      onEndDateChange(value);
    }
  };

    useEffect(() => {
      setStartDateError(validateDate(debouncedStartValue))
    }, [debouncedStartValue, validateDate]);


    useEffect(() => {
      setEndDateError(validateDate(debouncedEndValue))
    }, [debouncedEndValue, validateDate]);
    
  return (
    <>
      <PeriodInputStyled
        value={startDateInputValue}
        onChange={(e) => onDateInputChange(e.target.value, "startDateInputValue")}
        onBlur={(e) => handleStartDateBlur(e.target.value)}
        mask={{ mask: DATE_MASK, showMaskOnHover: false, placeholder: DATE_PLACEHOLDER }}
        label={"Начало"}
        large={false}
        invalid={!!startDateError}
        errorMessage={startDateError || ""}
      />

      <PeriodInputStyled
        value={endDateInputValue}
        onChange={(e) => onDateInputChange(e.target.value, "endDateInputValue")}
        onBlur={(e) => handleEndDateBlur(e.target.value)}
        mask={{ mask: DATE_MASK, showMaskOnHover: false, placeholder: DATE_PLACEHOLDER }}
        label={"Конец"}
        large={false}
        invalid={!!endDateError}
        errorMessage={endDateError || ""}
      />
      <StyledPopover>
        <Popover
          content={<DropDown handleSelectionChange={handleSelection} />}
          open={open}
          align="end"
          position="bottom"
          container={undefined}
        >
          <Tooltip
            position="right"
            delayDuration={0}
            offset={4}
            container={undefined}
          >
            <PeriodChips
              $isOpen={open}
              onClick={toggleOpen}
              rightIcon={open ? 'ArrowCloseIcon' : 'ArrowOpenIcon'}
              aria-label='Выбрать диапазон дат'
            />
          </Tooltip>
        </Popover>
      </StyledPopover>
    </>
  );
};

export default PeriodInput;
