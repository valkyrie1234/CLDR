
import dayjs from "dayjs";
import Calendar from "./calendar/Сalendar";

function App() {
  return (
    <>
      <Calendar range showToggle />
      <Calendar showTodayButton initialDate={dayjs("2023-01-01")} timePicker  maxDate={dayjs("2023-10-01")} minDate={dayjs("2021-01-01")}/>
    </>
  );
}

export default App;
