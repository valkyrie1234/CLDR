
// import dayjs from "dayjs";
import Calendar from "./calendar/Сalendar";

function App() {
  return (
    <>
      <Calendar range showToggle />
      {/* <Calendar showTodayButton initialDate={dayjs("2023-01-01")} timePicker /> */}
    </>
  );
}

export default App;
