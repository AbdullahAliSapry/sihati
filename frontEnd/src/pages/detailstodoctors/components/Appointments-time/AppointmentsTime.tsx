/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../../store/Store";

export default function AppointmentsTime({
  setAvilableTime,
}: {
  setAvilableTime: any;
}) {
  const [isOpen, setIsOpen] = useState(true);
  const { data } = useSelector((state: RootState) => state.Doctor);
  // Example dates (replace these with your actual dates)
  const [options1, setOptions1] = useState<string[]>([]);

  useEffect(() => {
    if (
      data?.data.doctor.scheduleStart &&
      data?.data.doctor.scheduleEnd &&
      data?.data.doctor.scheduleInterval
    ) {
      const scheduleStart = new Date(data?.data.doctor.scheduleStart);
      const scheduleEnd = new Date(data?.data.doctor.scheduleEnd);
      const interval = data?.data.doctor.scheduleInterval; // Single interval in minutes

      // Ensure the dates are valid
      if (!isNaN(scheduleStart.getTime()) && !isNaN(scheduleEnd.getTime())) {
        // Initialize an array to store available times
        const availableTimes = [];

        // Start from the scheduleStart and keep adding intervals until scheduleEnd
        let currentTime = scheduleStart;

        while (currentTime <= scheduleEnd) {
          // Get hours and minutes from the current time
          let hours = currentTime.getHours();
          const minutes = currentTime.getMinutes();
          const ampm = hours >= 12 ? "PM" : "AM";

          // Convert to 12-hour format
          hours = hours % 12;
          hours = hours ? hours : 12; // The hour '0' should be '12'

          // Format hours and minutes into a readable string
          const formattedTime = `${hours.toString().padStart(2, "0")}:${minutes
            .toString()
            .padStart(2, "0")} ${ampm}`;
          availableTimes.push(formattedTime);

          // Increment the current time by the schedule interval
          currentTime = new Date(currentTime.getTime() + interval * 60000); // 60000 ms in one minute
        }

        // Update the state with the available times
        setOptions1(availableTimes);
      } else {
        console.log("Invalid date(s)");
      }
    } else {
      console.log("Missing data or interval is not provided");
    }
  }, [data]);

  const handleSelect = (option: string) => {
    setAvilableTime(option);
    setIsOpen(false);
  };
  return (
    <div className="select-container">
      <div
        className={`custom-select ${isOpen ? "open" : ""}`}
        onClick={() => setIsOpen(!isOpen)}>
        المواعيد المتاحه
        <span className="arrow">&#9662;</span>
      </div>
      {isOpen && (
        <div className="options-container">
          {options1.map((option, index) => (
            <div
              key={index}
              className="custom-option"
              onClick={() => handleSelect(option)}>
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
