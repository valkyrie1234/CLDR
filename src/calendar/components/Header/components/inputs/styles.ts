import { Chips } from "@rgs-ui/chips";
import { colors } from "@rgs-ui/design-tokens";
import { Input } from "@rgs-ui/input";
import styled, { css } from "styled-components";

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

export const StyledPopover = styled.div`
margin-top: 8px;
`;

export const PeriodChips = styled(Chips)<{ $isOpen: boolean }>`
  z-index: 1000;
  margin: 0;
  padding: 0;
  width: 20px;
  height: 20px;
  border: none;
  background: transparent;
  color: ${colors.gray[80]};

  &:hover {
    background: ${colors.gray[40]};
  }

  ${({ $isOpen }) =>
    $isOpen &&
    css`
      background: ${colors.gray[60]}!important;
    `};
`;