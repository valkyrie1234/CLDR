import styled from "styled-components";
import { colors } from '@rgs-ui/design-tokens';

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

export const ToggleAndButtonContainer = styled.div`
  display: flex;
  width: 100%; 
  align-items: center;
`;
