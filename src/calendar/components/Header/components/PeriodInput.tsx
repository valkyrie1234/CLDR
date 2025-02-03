import { FC, useCallback, useState } from "react";
import { DATE_MASK, DATE_PLACEHOLDER } from "@rgs-ui/date-utils";
import { Tooltip } from "@rgs-ui/tooltip";
import { Popover } from "@rgs-ui/popover";
import DropDown from "./DropDown";
import { PeriodChips, PeriodInputStyled, StyledPopover } from "../styles";
import { IPeriodInput } from "../types";

const PeriodInput: FC<IPeriodInput> = ({
  endDateInputValue,
  startDateInputValue,
  handleSelectionChange,
  onStartDateChange,
  onDateInputChange,
  onEndDateChange,
}) => {
  const [open, setOpen] = useState(false);

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

  return (
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
