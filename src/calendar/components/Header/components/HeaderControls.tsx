import { FC } from "react";
import { HeaderControls as StyledHeaderControls, ClickableDateMode } from "../styles";
import { monthNames } from "../../../utils/consts";
import { HeaderControlsProps } from "../types";

const HeaderControls: FC<HeaderControlsProps> = ({
  mode,
  date,
  changeYear,
  changeMonth,
  setMode,
  handleYearScroll,
}) => {
  return (
    <StyledHeaderControls mode={mode}>
      {mode === "day" ? (
        <>
          <button onClick={() => changeYear(date.year() - 1)}>&#8656;</button>
          <button onClick={() => changeMonth(date.month() - 1)}>&#8249;</button>
          <h1>
            <ClickableDateMode onClick={() => setMode("month")}>
              {monthNames[date.month()]}
            </ClickableDateMode>{" "}
            <ClickableDateMode onClick={() => setMode("year")}>
              {date.year()}
            </ClickableDateMode>
          </h1>
          <button onClick={() => changeMonth(date.month() + 1)}>&#8250;</button>
          <button onClick={() => changeYear(date.year() + 1)}>&#8658;</button>
        </>
      ) : mode === "month" ? (
        <>
          <h1 className="year-mode-title">
            <span>{monthNames[date.month()]}</span>{" "}
            <ClickableDateMode onClick={() => setMode("year")}>
              {date.year()}
            </ClickableDateMode>
          </h1>
        </>
      ) : (
        <>
          <button onClick={() => handleYearScroll("prev")}>&#8656;</button>
          <h1>
            <span>{date.year()}</span>
          </h1>
          <button onClick={() => handleYearScroll("next")}>&#8658;</button>
        </>
      )}
    </StyledHeaderControls>
  );
};

export default HeaderControls;
