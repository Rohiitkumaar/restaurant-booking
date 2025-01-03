import React, { useState, useEffect } from "react";
import {
  MdLocationOn,
  MdContactMail,
  MdRestaurant,
} from "react-icons/md"; 
import { Geist, Geist_Mono } from "next/font/google";
import Availability from "../components/Availability";
import BookingForm from "../components/BookingForm";
import BookingSummary from "../components/BookingSummary";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function Home() {
  const [step, setStep] = useState(1); 
  const [formData, setFormData] = useState(null); 
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedSlot, setSelectedSlot] = useState([]);
  const [availableTables , setAvailableTables] = useState([]);

  const fetchAvailableSlots = async (selectedDate) => {
    const slots = [ "9:00 PM" , "12:00 PM", "2:00 PM", "6:00 PM"];
    return slots;
  };

  const handleSlotSelect = (date, slot,tables) => {
    setSelectedDate(date);
    setSelectedSlot(slot);
    setAvailableTables(tables);
    
    setStep(2);
  };
  const handleFormSubmit = (data) => {
    setFormData({ ...data, time: selectedSlot });
    setStep(3); // Go to booking summary
  };

  const handleStepChange = (newStep) => {
    setStep(newStep);
  }; 

  const handleBack = () => setStep(step - 1);

  return (
    <div
      className={`${geistSans.variable} ${geistMono.variable} flex flex-col items-center justify-between min-h-screen min-w-fit bg-gray-900 font-[family-name:var(--font-geist-sans)] `}
      style={{
        height: "100dvh",
        minHeight: "100vh",
      }}
    >
      {/* Navbar */}
      <nav className="w-full py-4 px-6 bg-gray-800 flex justify-between items-center shadow-lg">
        <div className="flex items-center gap-2 text-white">
          <MdRestaurant size={28} />
          <span className="text-2xl font-bold">Restaurant Booking</span>
        </div>
        <button className="text-white bg-blue-600 px-5 py-2 rounded-lg hover:bg-blue-500 transition duration-300">
          Login
        </button>
      </nav>

      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start w-full max-w-xl px-4 py-8 bg-gray-900 rounded-lg shadow-lg">
        {step === 1 && (
          <Availability
            fetchAvailableSlots={fetchAvailableSlots}
            onSlotSelect={handleSlotSelect}
          />
        )}
        {step === 2 && selectedDate && selectedSlot && (
          <BookingForm
            onSubmit={handleFormSubmit}
            selectedSlot={selectedSlot}
            selectedDate={selectedDate}
            availableTables={availableTables}
          />
        )}
        {/* {step === 3 && <BookingSummary bookingDetails={formData} />} */}
        {step === 3 && (
          <BookingSummary
            bookingDetails={formData}
            onConfirmBooking={() => handleStepChange(1)} // Redirect to Step 1
          />
        )}

        {step > 1 && (
          <button
            onClick={handleBack}
            className="mt-4 bg-gray-500 text-white px-4 py-2 rounded"
          >
            Back
          </button>
        )}
      </main>

      {/* Footer */}
      {/* <footer className="w-full bg-gray-800 text-white py-6 mt-2">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex gap-6">
            <a
              className="flex items-center gap-2 hover:underline hover:underline-offset-4"
              href="#"
              target="_blank"
              rel="noopener noreferrer"
            >
              <MdLocationOn size={20} />
              Find us
            </a>
            <a
              className="flex items-center gap-2 hover:underline hover:underline-offset-4"
              href="#"
              target="_blank"
              rel="noopener noreferrer"
            >
              <MdContactMail size={20} />
              Contact us
            </a>
          </div>
          <div className="text-sm">
            &copy; 2025 Restaurant Booking. All rights reserved.
          </div>
        </div>
      </footer> */}
      <footer className="w-full bg-gray-800 text-white py-6 mt-2  bottom-0">
        <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-4 ">
          <div className="flex flex-row gap-16">
            <a
              className="flex items-center gap-2 hover:underline hover:underline-offset-4"
              href="#"
              target="_blank"
              rel="noopener noreferrer"
            >
              <MdLocationOn size={20} />
              Find us
            </a>
            <a
              className="flex items-center gap-2 hover:underline hover:underline-offset-4"
              href="#"
              target="_blank"
              rel="noopener noreferrer"
            >
              <MdContactMail size={20} />
              Contact us
            </a>
          </div>
          <div className="text-sm text-center md:text-right">
            &copy; 2025 Restaurant Booking. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
