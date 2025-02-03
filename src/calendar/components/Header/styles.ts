import styled from "styled-components";
import { colors } from '@rgs-ui/design-tokens';
import { Input } from "@rgs-ui/input";

export const HeaderWrapper = styled.div<{$range: boolean, $timePicker: boolean | undefined}>`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  box-sizing: border-box;
  width: 100%;
  height: fit-content;
  gap: 12px;

  .header-top {
    display: flex;
    flex-direction: column;
    gap: 10px;
    width: 100%;
  };

  .input-container {
    display: flex;
    display: ${({$range, $timePicker}) => ($range || $timePicker ? "flex" : "block")};
    gap: 10px;
    justify-content: center;
  };

  .dropdown-arrow {
    position: absolute;
    right: 10px;
    top: 50%;
    transform: translateY(-50%) rotate(90deg);
    cursor: pointer;
    transition: transform 0.2s ease;

    &.open {
      transform: translateY(-50%) rotate(270deg);
    };
  };

  .dropdown-menu {
    position: absolute;
    top: 100%;
    right: 0;
    background: white;
    border: 1px solid ${colors.gray[60]};
    border-radius: 4px;
    box-shadow: 0 2px 4px ${colors.gray[50]};
    z-index: 10;
    width: 100%;
    max-width: 200px;
    margin-top: 5px;
  };

  .dropdown-item {
    padding: 8px 12px;
    cursor: pointer;

    &:hover {
      background: ${colors.gray[40]};
    };
  };

  select {
    width: 100%;
    padding: 8px;
    border: 1px solid ${colors.gray[60]};
    border-radius: 4px;
    font-size: 14px;
  };
`;

export const PeriodInputStyled = styled(Input)`
  height: 40px;
  flex: 1;
  min-width: fit-content;
  font-size: 14px;
  border-radius: 7px;

  & ::placeholder {
    color: ${colors.gray[80]} !important;
  };
`;

export const SingleInputStyled = styled(Input)`
max-height: 40px;
border-radius: 7px; 
font-size: 14px;
width: 100%;

& ::placeholder {
  color: ${colors.gray[80]} !important;
};
`;

export const HeaderControls = styled.div<{ mode: "day" | "month" | "year" }>`
  display: flex;
  align-items: center;
  justify-content: ${(props) => (props.mode === "month" ? "center" : "space-between")};
  width: 100%;
  height: 40px;

  button {
    background: none;
    border: none;
    cursor: pointer;
    font-size: 16px;

    &:hover {
      background-color: ${colors.gray[60]};
      border-radius: 20%;
    }

    &:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
  }
`;

export const CurrentDateWrapper = styled.div`
  width:100%;
  display: flex;
  justify-content: center;
`

export const ResetButton = styled.button`
  margin-bottom: 10px;
  padding: 8px 12px;
  background-color: ${colors.brandRed.red};
  color: ${colors.gray[0]};
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-left: auto;

  &:hover {
    background-color: ${colors.brandRed.darkRed};
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
  color: ${colors.gray[120]};
`;

export const Slider = styled.span`
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: ${colors.gray[60]};
  transition: 0.4s;
  border-radius: 34px;

  &:before {
    position: absolute;
    content: "";
    height: 26px;
    width: 26px;
    left: 4px;
    bottom: 4px;
    background-color: ${colors.gray[0]};
    transition: 0.4s;
    border-radius: 50%;
  };
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
      background-color: ${colors.brandRed.red};
    };

    &:focus + ${Slider} {
      box-shadow: 0 0 1px ${colors.brandRed.red};
    };

    &:checked + ${Slider}:before {
      transform: translateX(26px);
    };
  };
`;

export const ClickableDateMode = styled.span`
  cursor: pointer;

  &:hover {
    background-color: ${colors.gray[60]};
    border-radius: 7px;
  };

  &.non-clickable {
    cursor: default;
    color: ${colors.gray[200]};
  };
`;
