import styled, { css } from "styled-components";
import { colors } from '@rgs-ui/design-tokens';

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
  $isToday?: boolean;
  $isStart?: boolean;
  $isEnd?: boolean;
  $isBetween?: boolean;
  $isBetweenHover?: boolean;
  $isMuted?: boolean;
  $isDisabled?: boolean;
  $shouldHover?: boolean;
  $hasStartDate?: boolean;
  $hasEndDate?: boolean;
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
    props.$isToday &&
    css`
      font-weight: bold;
      color: ${colors.brandRed.red};
    `}

  ${(props) =>
    props.$isMuted &&
    css`
      color: ${colors.gray[50]};
    `}

  ${(props) =>
    props.$isDisabled &&
    css`
      color: ${colors.gray[60]};
      pointer-events: none;
    `}

  ${(props) =>
    props.$shouldHover &&
    !(props.$hasStartDate && !props.$hasEndDate) &&
    css`
      &:hover {
        background-color: ${colors.gray[60]};
        border-radius: 7px;
      }
    `}
    
  ${(props) =>
    props.$isBetween &&
    css`
      background-color: ${colors.additionalRed[20]};
    `}

  ${(props) =>
    props.$isBetweenHover &&
    !props.$isEnd &&
    css`
      background-color: ${colors.additionalRed[20]};
    `}

  ${(props) =>
    (props.$isStart || props.$isEnd) &&
    css`
      background-color: ${colors.brandRed.red};
      color: ${colors.gray[0]};
      border-radius: 7px;
    `}
`;
