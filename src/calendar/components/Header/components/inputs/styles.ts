import { colors } from "@rgs-ui/design-tokens";
import { Input } from "@rgs-ui/input";
import styled from "styled-components";

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
