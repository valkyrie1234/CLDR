import { colors, typography } from "@rgs-ui/design-tokens";
import styled from "styled-components";

export const StyledHeaderControls = styled.div<{ mode: "day" | "month" | "year" }>`
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

export const List = styled.div<{ isMobile?: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 4px 0 12px;
  min-height: 144px;
  border-radius: 2px;
  box-shadow: ${props => (!props?.isMobile ? '0 3px 16px rgb(42 49 56 / 8%)' : 'none')};
  background: ${colors.gray[0]};
  cursor: pointer;
  gap: 4px;
`;

export const ListItem = styled.div<{ isMobile?: boolean }>`
  box-sizing: border-box;
  padding: ${props => (!props?.isMobile ? '8px 12px' : '16px 12px')};
  width: 100%;
  height: ${props => (!props?.isMobile ? '32px' : '48px')};
  color: ${colors.gray[200]};
  border-bottom: ${props => (!props?.isMobile ? 'none' : `1px solid ${colors.gray[40]}`)};
  ${typography.TEXT_2}

  &:hover {
    background: ${colors.gray[40]};
  }
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

export const StyledToggle = styled.label`
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
