import styled from "styled-components";
import { colors } from '@rgs-ui/design-tokens';

export const CalendarWrapper = styled.div`
  width: 360px;
  padding: 15px;
  box-shadow: 1px 1px 20px 0 ${colors.gray[50]};
  overflow: hidden;
`;

export const TodayButton = styled.button`
  margin-top: 10px;
  background-color: ${colors.brandRed.red};
  width: 100%;
  padding: 8px 120px;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  text-align: center;

  &:hover {
    background-color: ${colors.brandRed.darkRed};
  }
`;
