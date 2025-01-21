import styled, { css } from "styled-components";

export const CalendarDays = styled.nav`
  font-size: 0;

  span {
    width: 14.28571%;
    display: inline-block;
    text-align: center;
    user-select: none;
    cursor: pointer;
    margin: 0;
    line-height: 34px;
    position: relative;
    font-size: 16px;

    &.label {
      text-transform: uppercase;
      font-weight: 700;
      color: black;
      font-size: 14px;
      cursor: initial;
    }
  }
`;

export const DayWrapper = styled.span<{
  isToday?: boolean;
  isStart?: boolean;
  isEnd?: boolean;
  isBetween?: boolean;
  isBetweenHover?: boolean;
  isMuted?: boolean;
  isDisabled?: boolean;
  shouldHover?: boolean;
  hasStartDate?: boolean;
  hasEndDate?: boolean;
}>`
  display: inline-block;
  width: 14.28571%;
  text-align: center;
  user-select: none;
  cursor: pointer;
  line-height: 34px;
  font-size: 16px;
  position: relative;

  ${(props) =>
    props.isToday &&
    css`
      font-weight: bold;
      color: red;
    `}

  ${(props) =>
    props.isMuted &&
    css`
      color: rgba(0, 0, 0, 0.3);
    `}

  ${(props) =>
    props.isDisabled &&
    css`
      color: #ccc;
      pointer-events: none;
    `}

  ${(props) =>
    props.shouldHover &&
    !(props.hasStartDate && !props.hasEndDate) && // Условие: не применять, если есть startDate, но нет endDate
    css`
      &:hover {
        background-color: rgba(211, 211, 211, 0.404);
      }
    `}
    
  ${(props) =>
    props.isBetween &&
    css`
      background-color: rgb(255, 221, 221);
    `}

  ${(props) =>
    props.isBetweenHover &&
    !props.isEnd &&
    css`
      background-color: rgb(255, 221, 221);
    `}

  ${(props) =>
    (props.isStart || props.isEnd) &&
    css`
      background-color: #a50505;
      color: white;
    `}
`;
