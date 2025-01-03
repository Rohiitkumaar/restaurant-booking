// import React, { useState, useEffect } from "react";

// const BookingForm = ({
//   onSubmit,
//   selectedSlot,
//   selectedDate,
//   availableTables,
// }) => {
//   const formatDate = (date) => {
//     const d = new Date(date);
//     const year = d.getFullYear();
//     const month = String(d.getMonth() + 1).padStart(2, "0");
//     const day = String(d.getDate()).padStart(2, "0");
//     let UpdatedDate = `${year}-${month}-${day}`;
//     return UpdatedDate;
//   };

//   const formatTime = (slot) => {
//     const [timePart, meridian] = slot.split(" ");
//     let [hours, minutes] = timePart.split(":").map(Number);

//     // Convert to 24-hour format
//     if (meridian === "PM" && hours !== 12) {
//       hours += 12;
//     } else if (meridian === "AM" && hours === 12) {
//       hours = 0;
//     }

//     return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(
//       2,
//       "0"
//     )}`;
//   };

//   const [formData, setFormData] = useState({
//     date: selectedDate ? formatDate(selectedDate) : "",
//     slot: selectedSlot ? formatTime(selectedSlot) : "",
//     guests: 1,
//     name: "",
//     contact: "",
//     table: "T1",
//   });

//   const [errors, setErrors] = useState({});

//   useEffect(() => {
//     if (selectedDate instanceof Date && !isNaN(selectedDate)) {
//       setFormData((prevData) => ({
//         ...prevData,
//         date: formatDate(selectedDate),
//       }));
//     } else {
//       console.error("Invalid selectedDate:", selectedDate);
//     }
//   }, [selectedDate]);


//   useEffect(() => {
//     setFormData((prevData) => ({
//       ...prevData,
//       slot: selectedSlot ? formatTime(selectedSlot) : prevData.slot,
//     }));
//   }, [selectedSlot]);

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const validate = () => {
//     const newErrors = {};
//     if (!formData.date) newErrors.date = "Date is required";
//     if (!formData.slot) newErrors.slot = "Time is required";
//     if (!formData.guests || formData.guests <= 0)
//       newErrors.guests = "Guests must be greater than 0";
//     if (!formData.name) newErrors.name = "Name is required";
//     if (!formData.contact || !/^\d{10}$/.test(formData.contact))
//       newErrors.contact = "Contact must be a valid 10-digit number";
//     if (!formData.table) newErrors.table = "Table number is required";
//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (validate()) {
//       onSubmit(formData);
//     }
//   };

//   const handleFocus = (field) => {
//     setErrors((prevErrors) => ({
//       ...prevErrors,
//       [field]: "",
//     }));
//   };

//   return (
//     <div className="flex justify-center items-center bg-gray-100 p-4">
//       <div className="w-full sm:w-96 bg-white p-8 rounded-lg shadow-lg">
//         <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">
//           Reservation Form
//         </h2>
//         <form onSubmit={handleSubmit} className="space-y-4">
//           <div>
//             <label className="block font-medium text-gray-700">Date</label>
//             <input
//               id="date"
//               type="date"
//               name="date"
//               value={formData.date}
//               onChange={handleChange}
//               onFocus={() => handleFocus("date")}
//               className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800 focus:border-blue-500"
//               disabled={formData.date !== ""}
//             />
//             {errors.date && (
//               <p className="text-red-500 text-sm">{errors.date}</p>
//             )}
//           </div>

//           <div>
//             <label className="block font-medium text-gray-700">Time</label>
//             <input
//               type="slot"
//               name="slot"
//               value={formData.slot}
//               onChange={handleChange}
//               onFocus={() => handleFocus("slot")}
//               className="w-full border text-gray-800 border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//               disabled={formData.slot !== ""}
//             />
//             {errors.slot && (
//               <p className="text-red-500 text-sm">{errors.slot}</p>
//             )}
//           </div>

//           <div>
//             <label className="block font-medium text-gray-700">
//               Number of Guests
//             </label>
//             <input
//               type="number"
//               name="guests"
//               value={formData.guests}
//               onChange={handleChange}
//               onFocus={() => handleFocus("guests")}
//               className="w-full border text-gray-800 border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//             />
//             {errors.guests && (
//               <p className="text-red-500 text-sm">{errors.guests}</p>
//             )}
//           </div>

//           <div>
//             <label className="block font-medium text-gray-700">Name</label>
//             <input
//               type="text"
//               name="name"
//               value={formData.name}
//               onChange={handleChange}
//               onFocus={() => handleFocus("name")}
//               className="w-full border text-gray-800 border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//             />
//             {errors.name && (
//               <p className="text-red-500 text-sm">{errors.name}</p>
//             )}
//           </div>

//           <div>
//             <label className="block font-medium text-gray-700">Contact</label>
//             <input
//               type="tel"
//               name="contact"
//               value={formData.contact}
//               onChange={handleChange}
//               onFocus={() => handleFocus("contact")}
//               className="w-full border text-gray-800 border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//             />
//             {errors.contact && (
//               <p className="text-red-500 text-sm">{errors.contact}</p>
//             )}
//           </div>

//           <div>
//             <label className="block font-medium text-gray-700">
//               Table Number
//             </label>
//             <select
//               name="tableNumber"
//               value={formData.tableNumber}
//               onChange={handleChange}
//               onFocus={() => handleFocus("tableNumber")}
//               className="w-full border text-gray-800 border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//             >
//               {/* Add a fallback if availableTables is undefined or null */}
//               {(availableTables || []).map((table) => (
//                 <option key={table} value={table}>
//                   {table}
//                 </option>
//               ))}
//             </select>
//             {errors.tableNumber && (
//               <p className="text-red-500 text-sm">{errors.tableNumber}</p>
//             )}
//           </div>

//           <div>
//             <button
//               type="submit"
//               className="w-full bg-blue-500 text-white py-3 rounded-md hover:bg-blue-600 transition duration-200"
//             >
//               Submit
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default BookingForm;

import React, { useState, useEffect } from "react";

const BookingForm = ({
  onSubmit,
  selectedSlot,
  selectedDate,
  availableTables,
}) => {
  const formatDate = (date) => {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const formatTime = (slot) => {
    const [timePart, meridian] = slot.split(" ");
    let [hours, minutes] = timePart.split(":").map(Number);

    if (meridian === "PM" && hours !== 12) {
      hours += 12;
    } else if (meridian === "AM" && hours === 12) {
      hours = 0;
    }

    return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(
      2,
      "0"
    )}`;
  };

  const [formData, setFormData] = useState({
    date: selectedDate ? formatDate(selectedDate) : "",
    slot: selectedSlot ? formatTime(selectedSlot) : "",
    guests: 1,
    name: "",
    contact: "",
    tableNumber: "T1", // Default tableNumber value
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (selectedDate instanceof Date && !isNaN(selectedDate)) {
      setFormData((prevData) => ({
        ...prevData,
        date: formatDate(selectedDate),
      }));
    } else {
      console.error("Invalid selectedDate:", selectedDate);
    }
  }, [selectedDate]);

  useEffect(() => {
    setFormData((prevData) => ({
      ...prevData,
      slot: selectedSlot ? formatTime(selectedSlot) : prevData.slot,
    }));
  }, [selectedSlot]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.date) newErrors.date = "Date is required";
    if (!formData.slot) newErrors.slot = "Time is required";
    if (!formData.guests || formData.guests <= 0)
      newErrors.guests = "Guests must be greater than 0";
    if (!formData.name) newErrors.name = "Name is required";
    if (!formData.contact || !/^\d{10}$/.test(formData.contact))
      newErrors.contact = "Contact must be a valid 10-digit number";
    if (!formData.tableNumber)
      newErrors.tableNumber = "Table number is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      onSubmit(formData);
    }
  };

  const handleFocus = (field) => {
    setErrors((prevErrors) => ({
      ...prevErrors,
      [field]: "",
    }));
  };

  return (
    <div className="flex justify-center items-center bg-gray-100 p-4">
      <div className="w-full sm:w-96 bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">
          Reservation Form
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block font-medium text-gray-700">Date</label>
            <input
              id="date"
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              onFocus={() => handleFocus("date")}
              className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800 focus:border-blue-500"
              disabled={formData.date !== ""}
            />
            {errors.date && (
              <p className="text-red-500 text-sm">{errors.date}</p>
            )}
          </div>

          <div>
            <label className="block font-medium text-gray-700">Time</label>
            <input
              type="text"
              name="slot"
              value={formData.slot}
              onChange={handleChange}
              onFocus={() => handleFocus("slot")}
              className="w-full border text-gray-800 border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled={formData.slot !== ""}
            />
            {errors.slot && (
              <p className="text-red-500 text-sm">{errors.slot}</p>
            )}
          </div>

          <div>
            <label className="block font-medium text-gray-700">
              Number of Guests
            </label>
            <input
              type="number"
              name="guests"
              value={formData.guests}
              onChange={handleChange}
              onFocus={() => handleFocus("guests")}
              className="w-full border text-gray-800 border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.guests && (
              <p className="text-red-500 text-sm">{errors.guests}</p>
            )}
          </div>

          <div>
            <label className="block font-medium text-gray-700">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              onFocus={() => handleFocus("name")}
              className="w-full border text-gray-800 border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.name && (
              <p className="text-red-500 text-sm">{errors.name}</p>
            )}
          </div>

          <div>
            <label className="block font-medium text-gray-700">Contact</label>
            <input
              type="tel"
              name="contact"
              value={formData.contact}
              onChange={handleChange}
              onFocus={() => handleFocus("contact")}
              className="w-full border text-gray-800 border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.contact && (
              <p className="text-red-500 text-sm">{errors.contact}</p>
            )}
          </div>

          <div>
            <label className="block font-medium text-gray-700">
              Table Number
            </label>
            <select
              name="tableNumber"
              value={formData.tableNumber}
              onChange={handleChange}
              onFocus={() => handleFocus("tableNumber")}
              className="w-full border text-gray-800 border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {(availableTables || []).map((table) => (
                <option key={table} value={table}>
                  {table}
                </option>
              ))}
            </select>
            {errors.tableNumber && (
              <p className="text-red-500 text-sm">{errors.tableNumber}</p>
            )}
          </div>

          <div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-3 rounded-md hover:bg-blue-600 transition duration-200"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BookingForm;
