import styled from "styled-components";
import { colors } from "./colors";

export const ToggleAndButton = styled.div`
  display: flex;
  width: 100%; 
  align-items: center;
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