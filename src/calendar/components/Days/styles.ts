import styled from "styled-components";

export const CalendarDays = styled.nav`
  font-size: 0;

  span {
    width: 14.28571%;
    display: inline-block;
    text-align: center;
    user-select: none;
    cursor: pointer;
    margin: 0;
    line-height: 34px;
    position: relative;
    font-size: 16px;

    &.label {
      text-transform: uppercase;
      font-weight: 700;
      color: black;
      font-size: 14px;
      cursor: initial;
    }

    &.active {
      font-weight: 700;
      background-color: #a50505;
      color: #fff;
    }

    &.muted {
      color: rgba(0, 0, 0, 0.3);
    }

    &.between {
      border-radius: 0;
    }

    &.between-hover {
      background-color: rgb(255, 221, 221);
    }

    &.start,
    &.end {
      background-color: #a50505;
      color: #fff;
      font-weight: 400;
    }

    &.between:nth-child(7n):after,
    &.start:nth-child(7n):after {
      content: "";
      position: absolute;
      top: 0;
      bottom: 0;
      left: 100%;
      width: 20px;
    }

    &.between:nth-child(7n + 1):after,
    &.end:nth-child(7n + 1):after {
      content: "";
      position: absolute;
      top: 0;
      bottom: 0;
      right: 100%;
      width: 20px;
    }

    &.start.end:after {
      display: none;
    }
  }
`;
