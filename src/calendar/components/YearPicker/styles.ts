import styled from "styled-components";
import { colors } from '@rgs-ui/design-tokens';

export const YearGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 21px;
  padding: 10px;
`;

export const YearItem = styled.div`
  text-align: center;
  padding: 10px;
  cursor: pointer;
  border-radius: 7px;
  transition: background-color 0.2s;

  &:hover {
    background-color: ${colors.gray[40]};
  }

  &.selected {
    background-color: ${colors.brandRed.red};
    color: ${colors.gray[0]};
  }
`;
