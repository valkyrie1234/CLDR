
import dayjs from "dayjs";
import Calendar from "./calendar/calendar";

function App() {
  return (
    <>
      <Calendar range  />
      <Calendar showTodayButton initialDate={dayjs("2023-01-01")} />
    </>
  );
}

export default App;
