
import React, { useState } from "react";

const BookingSummary = ({ bookingDetails, onConfirmBooking }) => {
  const [isPopupVisible, setPopupVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  if (!bookingDetails) {
    return (
      <p className="text-center text-gray-500">No booking details available.</p>
    );
  }

  const { date, slot, guests, name, contact, tableNumber } = bookingDetails;

  const formattedDate = new Date(date).toLocaleDateString();

  const handleConfirmBooking = async () => {
    try {
      const response = await fetch("https://booking-system-h7pz.onrender.com/api/bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          date,
          slot,
          guests,
          name,
          contact,
          tableNumber,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to confirm booking.");
      }

      // Show success popup
      setPopupVisible(true);

      // Close popup and call the onConfirmBooking callback
      setTimeout(() => {
        setPopupVisible(false);
        if (onConfirmBooking) {
          onConfirmBooking(); // Redirect to Step 1
        }
      }, 3000);
    } catch (error) {
      setErrorMessage(error.message || "An error occurred. Please try again.");
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white border border-gray-200 rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-semibold text-blue-600 mb-4 text-center">
        Booking Summary
      </h2>
      <div className="space-y-3">
        <p className="text-gray-700">
          <strong>Date:</strong> {formattedDate}
        </p>
        <p className="text-gray-700">
          <strong>Slot:</strong> {slot}
        </p>
        <p className="text-gray-700">
          <strong>Guests:</strong> {guests}
        </p>
        <p className="text-gray-700">
          <strong>Name:</strong> {name}
        </p>
        <p className="text-gray-700">
          <strong>Contact:</strong> {contact}
        </p>
        <p className="text-gray-700">
          <strong>Table Number:</strong> {tableNumber}
        </p>
      </div>
      {errorMessage && (
        <p className="text-red-500 text-sm mt-2 text-center">{errorMessage}</p>
      )}
      <button
        onClick={handleConfirmBooking}
        className="w-full mt-6 bg-blue-500 text-white py-3 rounded-md text-lg font-medium hover:bg-blue-600 transition duration-200"
      >
        Confirm Booking
      </button>

      {isPopupVisible && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <h3 className="text-lg font-bold text-green-600">
              Booking Successful!
            </h3>
            <p className="text-gray-700 mt-2">
              Your reservation has been confirmed. Thank you!
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookingSummary;

