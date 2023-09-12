import React, { useState } from "react";
import Calendar from "react-calendar";
import "./Calendar.css";

interface CalendarProps {
  getDates: (dates: any) => void;
  events: any
}

function CalendarUI({ getDates, events }: CalendarProps) {
  const [dateRange, setDateRange] = useState([new Date(), new Date()]);
  const [startDate, endDate] = dateRange;


  // Function to check if a date is in the markedDates array
  const isDateMarked = (date) =>
  events.some((d) => new Date(d).toDateString() === date.toDateString());

  // Function to render custom content for marked dates
  const tileContent = ({ date, view }) => {
    if (view === "month" && isDateMarked(date)) {
      return <div className="mark"></div>;
      
    }
    return null;
  };

  return (
    <div className="app-calendar">
      <div className="calendar-container">
        <Calendar
          // dateFormat="dd MM yyyy"
          locale="ja"
          onChange={(newValue) => {
            setDateRange(newValue);
            getDates(newValue);
            // console.log(newValue);
          }}
          lang={"jp"}
          value={dateRange}
          selectRange={true}
          tileContent={tileContent} // Apply custom content to marked dates
          onClickDay={(newDate) => {
            // console.log("onClick property", `clicked single date is ${newDate}`)
            // getDates(newDate)
          }}
        />
      </div>
      <div className="date-inputs">
        <div>
          <label>Start Date:</label>
          <input
            className="formSelect"
            type="date"
            value={startDate.toLocaleDateString('en-CA', {timeZone: 'Asia/Tokyo'})}
            onChange={(e) => {
              const newStartDate = new Date(e.target.value);
              setDateRange([newStartDate, endDate]);
            }}
          />
        </div>

        <div>
          <label>End Date:</label>
          <input
            className="formSelect"
            type="date"
            value={endDate.toISOString().split("T")[0]}
            onChange={(e) => {
              const newEndDate = new Date(e.target.value);
              setDateRange([startDate, newEndDate]);
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default CalendarUI;
