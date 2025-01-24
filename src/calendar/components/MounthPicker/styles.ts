import styled from "styled-components";
import { colors } from "../../style/colors";

export const MonthGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 21px;
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
