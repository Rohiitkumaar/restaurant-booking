
import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

const Availability = ({ fetchAvailableSlots, onSlotSelect }) => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [availableSlots, setAvailableSlots] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [slotAvailability, setSlotAvailability] = useState({});
  const [availableTables, setAvailableTables] = useState([]); 

  useEffect(() => {
    const fetchSlots = async () => {
      const slots = await fetchAvailableSlots(selectedDate);
      setAvailableSlots(slots);
      setSelectedSlot(null);
      setSlotAvailability({});
      setAvailableTables([]); 
      slots.forEach((slot) => {
        checkTableAvailability(slot);
      });
    };
    fetchSlots();
  }, [selectedDate, fetchAvailableSlots]);

  const checkTableAvailability = async (slot) => {
    const availability = await fetchAvailableTablesForSlot(selectedDate, slot);
    setSlotAvailability((prevState) => ({
      ...prevState,
      [slot]: availability.isAvailable,
    }));
  };

  const formatDateToLocalString = (date) => {
    const day = date.getDate().toString().padStart(2, "0"); // Day (2 digits)
    const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Month (2 digits)
    const year = date.getFullYear(); // Year (4 digits)
    return `${year}-${month}-${day}`; // Format as "yyyy-mm-dd"
  };

  const fetchAvailableTablesForSlot = async (date, slot) => {
    const normalizedDate = normalizeDate(date);
    const formattedDate = formatDateToLocalString(normalizedDate);

    // Remove "AM" or "PM" from slot
    const formattedSlot = slot.replace(/\s?(AM|PM)/, ""); 

    const response = await fetch(
      `http://localhost:5000/api/bookings/checkTables?date=${formattedDate}&slot=${formattedSlot}`
    );
    const data = await response.json();
    return data;
  };

  const normalizeDate = (date) => {
    // Create a new date object to avoid direct mutation of the original date
    const normalizedDate = new Date(date);

    // Set the time to midnight in the local timezone
    normalizedDate.setHours(0, 0, 0, 0); // Set time to 00:00:00:000

    return normalizedDate;
  };

  const handleSlotClick = (slot) => {
    if (selectedSlot !== slot) {
      console.log("Slot clicked:", slot); // Log clicked slot
      setSelectedSlot(slot);
      fetchAvailableTablesForSlot(selectedDate, slot).then((response) => {
        const tables = response.availableTables;
        console.log("Tables for slot:", slot, ":", tables);
        setAvailableTables(tables);
        onSlotSelect(selectedDate, slot, tables);
      });
    }
  };

  const handleDateChange = (date) => {
    // Normalize the date to midnight in the local time zone
    const normalizedDate = normalizeDate(date);

    // Log both the selected date and the normalized date
    console.log("Selected date from calendar:", date);
    console.log("Normalized selected date:", normalizedDate);

    setSelectedDate(normalizedDate);
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md flex flex-col items-center max-w-screen-lg mx-auto">
      <h2 className="text-2xl font-semibold mb-4 text-gray-800">
        Select a Date
      </h2>

      <Calendar
        onChange={handleDateChange}
        value={selectedDate}
        className="calendar-custom mb-6 border-2 border-gray-300 rounded-lg shadow-sm hover:shadow-md transition duration-200"
      />

      <h3 className="text-xl font-medium text-gray-700 mb-2">
        Available Slots:
      </h3>

      {availableSlots.length > 0 ? (
        <ul className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {availableSlots.map((slot, index) => (
            <li
              key={index}
              className={`text-center cursor-pointer py-2 px-4 rounded-md transition-colors duration-300 
                ${
                  selectedSlot === slot
                    ? "bg-blue-600 text-white font-semibold"
                    : "bg-gray-100 text-gray-700"
                }
                hover:bg-blue-500 hover:text-white`}
              onClick={() => handleSlotClick(slot)}
            >
              {slot}
              {slotAvailability[slot] === undefined ? (
                <span className="block text-sm text-gray-400">Checking...</span>
              ) : slotAvailability[slot] ? (
                <span className="block text-sm text-green-500">Available</span>
              ) : (
                <span className="block text-sm text-red-500">
                  Not Available
                </span>
              )}
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500">
          No slots available for the selected date.
        </p>
      )}

      {/* Display available tables for the selected slot */}
      {selectedSlot && availableTables.length > 0 && (
        <div className="mt-6">
          <h4 className="text-lg font-medium text-gray-700 mb-2">
            Available Tables:
          </h4>
          <ul className="list-disc pl-5">
            {availableTables.map((table, index) => (
              <li key={index} className="text-gray-700">
                {table}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Availability;

