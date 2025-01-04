import { Dayjs } from "dayjs";
import { IDays } from "../Days/types";

export interface IDay extends IDays {
    currentDate: Dayjs;
    onMouseEnter: () => void,
    onMouseLeave: () => void
  }