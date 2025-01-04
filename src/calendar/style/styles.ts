import styled from "styled-components";
import { colors } from "./colors";

// Объявляем Slider перед его использованием
export const Slider = styled.span`
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  transition: 0.4s;
  border-radius: 34px;

  &:before {
    position: absolute;
    content: "";
    height: 26px;
    width: 26px;
    left: 4px;
    bottom: 4px;
    background-color: white;
    transition: 0.4s;
    border-radius: 50%;
  }
`;

export const ToggleAndButton = styled.div`
  display: flex;
  width: 100%; 
  align-items: center;
`;

export const ToggleContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
`;

export const ToggleLabel = styled.div`
  margin-left: 10px;
  font-size: 14px;
  color: #333;
`;

export const Toggle = styled.label`
  position: relative;
  display: inline-block;
  width: 60px;
  height: 34px;

  input {
    opacity: 0;
    width: 0;
    height: 0;

    &:checked + ${Slider} {
      background-color: ${colors.brandRed.red}; // Используем цвет из вашей палитры
    }

    &:focus + ${Slider} {
      box-shadow: 0 0 1px ${colors.brandRed.red}; // Используем цвет из вашей палитры
    }

    &:checked + ${Slider}:before {
      transform: translateX(26px);
    }
  }
`;

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

    &.active {
      font-weight: 700;
      background-color: #a50505;
      color: #fff;
    }

    &.muted {
      color: rgba(0, 0, 0, 0.3);
    }

    &.between {
      border-radius: 0;
    }

    &.between-hover {
      background-color: rgb(255, 221, 221);
    }

    &.start,
    &.end {
      background-color: #a50505;
      color: #fff;
      font-weight: 400;
    }

    &.between:nth-child(7n):after,
    &.start:nth-child(7n):after {
      content: "";
      position: absolute;
      top: 0;
      bottom: 0;
      left: 100%;
      width: 20px;
    }

    &.between:nth-child(7n + 1):after,
    &.end:nth-child(7n + 1):after {
      content: "";
      position: absolute;
      top: 0;
      bottom: 0;
      right: 100%;
      width: 20px;
    }

    &.start.end:after {
      display: none;
    }
  }
`;

export const CalendarWrapper = styled.div`
  width: 360px;
  padding: 15px;
  box-shadow: 1px 1px 20px 0 rgba(0, 0, 0, 0.4);
  overflow: hidden;
`;

export const HeaderWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  box-sizing: border-box;
  padding: 12px;
  width: 100%;
  height: fit-content;
  gap: 12px;

  .header-top {
    display: flex;
    flex-direction: column;
    gap: 10px;
    width: 100%;
  }

  .input-container {
    display: flex;
    gap: 10px;
    width: 100%;
    position: relative;
  }

  .dropdown-arrow {
    position: absolute;
    right: 10px;
    top: 50%;
    transform: translateY(-50%) rotate(90deg);
    cursor: pointer;
    transition: transform 0.2s ease;

    &.open {
      transform: translateY(-50%) rotate(270deg);
    }
  }

  .dropdown-menu {
    position: absolute;
    top: 100%;
    right: 0;
    background: white;
    border: 1px solid ${colors.gray[60]};
    border-radius: 4px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    z-index: 10;
    width: 100%;
    max-width: 200px;
    margin-top: 5px;
  }

  .dropdown-item {
    padding: 8px 12px;
    cursor: pointer;

    &:hover {
      background: ${colors.gray[40]};
    }
  }

  select {
    width: 100%;
    padding: 8px;
    border: 1px solid ${colors.gray[60]};
    border-radius: 4px;
    font-size: 14px;
  }
`;

export const LabelControl = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  gap: 0.4rem;
`;

export const PeriodInputStyled = styled.input`
  flex: 1;
  min-width: 0;
  padding: 8px;
  border: 1px solid ${colors.gray[60]};
  border-radius: 4px;
  font-size: 14px;

  & ::placeholder {
    color: ${colors.gray[80]} !important;
  }
`;

export const InputWrapper = styled.div`
  display: flex;
  align-items: flex-start;
  padding: 0;
  width: 100%;
  min-height: 40px;
  gap: 4px;

  & input {
    &::selection {
      background: ${colors.blue[40]};
    }

    height: 40px;
    font-size: 14px;
  }
`;

export const TodayButton = styled.button`
  margin-top: 10px;
  background-color: #ac0404;
  width: 100%;
  padding: 8px 120px;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  text-align: center;

  &:hover {
    background-color: #ac0404;
  }
`;

export const ResetButton = styled.button`
  margin-bottom: 10px;
  padding: 8px 12px;
  background-color: #ac0404;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-left: auto;

  &:hover {
    background-color: #ac0404;
  }
`;

export const HeaderControls = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;

  .month-year-title {
    margin: 0;
    flex: 1;
    text-align: center;
    cursor: pointer;
  }

  button {
    background: none;
    border: none;
    cursor: pointer;
    font-size: 16px;
  }
`;

export const MonthGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
  padding: 10px;
`;

export const MonthItem = styled.div`
  text-align: center;
  padding: 10px;
  cursor: pointer;
  border-radius: 4px;
  transition: background-color 0.2s;

  &:hover {
    background-color: ${colors.gray[40]};
  }

  &.selected {
    background-color: ${colors.brandRed.red};
    color: white;
  }
`;

export const YearGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px;
  padding: 10px;
`;

export const YearItem = styled.div`
  text-align: center;
  padding: 10px;
  cursor: pointer;
  border-radius: 4px;
  transition: background-color 0.2s;

  &:hover {
    background-color: ${colors.gray[40]};
  }

  &.selected {
    background-color: ${colors.brandRed.red};
    color: white;
  }
`;
