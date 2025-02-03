import { FC } from "react";
import { HeaderControls as StyledHeaderControls, ClickableDateMode, CurrentDateWrapper } from "../styles";
import { monthNames } from "../../../consts";
import { HeaderControlsProps } from "../types";
import { ArrowExpandIcon, ArrowHideIcon, MenuClosedIcon, MenuOpenedIcon } from "@rgs-ui/icons";

const HeaderControls: FC<HeaderControlsProps> = ({
  date,
  mode,
  navigationControls,
  handleYearScroll,
  changeMonth,
  changeYear,
  setMode,
}) => {
  const {
    canGoToPreviousMonth,
    canGoToNextMonth,
    canGoToPreviousYear,
    canGoToNextYear,
  } = navigationControls;
  return (
    <StyledHeaderControls mode={mode}>
      {mode === "day" ? (
        <>
          <button
            onClick={() => changeYear(date.year() - 1)}
            disabled={!canGoToPreviousYear()}
          >
            <MenuOpenedIcon />
          </button>
          <button
            onClick={() => changeMonth(date.month() - 1)}
            disabled={!canGoToPreviousMonth()}
          >
           <ArrowHideIcon />
          </button>
          <CurrentDateWrapper>
          <h2>
          <ClickableDateMode onClick={() => setMode("month")}>
              {monthNames[date.month()]}
            </ClickableDateMode>{" "}
            <ClickableDateMode onClick={() => setMode("year")}>
              {date.year()}
            </ClickableDateMode>
          </h2>
          </CurrentDateWrapper>
          <button
            onClick={() => changeMonth(date.month() + 1)}
            disabled={!canGoToNextMonth()}
          >
            <ArrowExpandIcon />
          </button>
          <button
            onClick={() => changeYear(date.year() + 1)}
            disabled={!canGoToNextYear()}
          >
            <MenuClosedIcon />
          </button>
        </>
      ) : mode === "month" ? (
        <>
          <h2 className="year-mode-title">
            <span>{monthNames[date.month()]}</span>{" "}
            <ClickableDateMode onClick={() => setMode("year")}>
              {date.year()}
            </ClickableDateMode>
          </h2>
        </>
      ) : (
        <>
          <button
            onClick={() => handleYearScroll("prev")}
            disabled={!canGoToPreviousYear()}
          >
            <MenuOpenedIcon />
          </button>
          <h2>
            <span>{date.year()}</span>
          </h2>
          <button
            onClick={() => handleYearScroll("next")}
            disabled={!canGoToNextYear()}
          >
            <MenuClosedIcon />
          </button>
        </>
      )}
    </StyledHeaderControls>
  );
};

export default HeaderControls;
