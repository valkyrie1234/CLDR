import styled from "styled-components";

export const CalendarWrapper = styled.div`
  width: 360px;
  padding: 15px;
  box-shadow: 1px 1px 20px 0 rgba(0, 0, 0, 0.4);
  overflow: hidden;
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
