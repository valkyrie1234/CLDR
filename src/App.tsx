import dayjs from "dayjs";
import Calendar from "./calendar/Сalendar";
import { useState } from "react";

function App() {
  const [dateRange, setDateRange] = useState<{ startDate: Date | undefined; endDate: Date | undefined} | undefined>(undefined);
  const [date, setDate] = useState<Date | undefined>(undefined);

  console.log(dateRange);
  console.log(date);

  return (
    <>
      <Calendar 
        range 
        onStartDateChange={startDate => setDateRange(prev => ({
          startDate: startDate!,
          endDate: prev?.endDate
        }))} 
        onEndDateChange={endDate => setDateRange(prev => ({
          startDate: prev?.startDate,
          endDate: endDate! 
        }))} 
      />
      <Calendar onChange={newDate => setDate(newDate)} showTodayButton initialDate={dayjs("2023.01.01")} timePicker maxDate={dayjs("2023.10.01")} minDate={dayjs("2021.01.01")}/>
        
    </>
  );
}

export default App;
