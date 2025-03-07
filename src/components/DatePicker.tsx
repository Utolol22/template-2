
"use client";

import { useState } from "react";
import { CalendarData, CalendarDay, generateCalendarData } from "../lib/utils";

interface DatePickerProps {
  selectedDate: Date;
  onDateChange: (date: Date) => void;
}

export default function DatePicker({ selectedDate, onDateChange }: DatePickerProps) {
  const [currentDate, setCurrentDate] = useState(new Date(selectedDate));
  const calendarData = generateCalendarData(currentDate, selectedDate);

  const handlePrevMonth = () => {
    const newDate = new Date(currentDate);
    newDate.setMonth(newDate.getMonth() - 1);
    setCurrentDate(newDate);
  };

  const handleNextMonth = () => {
    const newDate = new Date(currentDate);
    newDate.setMonth(newDate.getMonth() + 1);
    setCurrentDate(newDate);
  };

  const handleSelectDate = (date: Date) => {
    onDateChange(date);
  };

  return (
    <div className="card p-5 border border-gray-200 dark:border-gray-700 transition-all">
      <div className="flex justify-between items-center mb-5">
        <button
          onClick={handlePrevMonth}
          className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          aria-label="Mois précédent"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
          </svg>
        </button>
        <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
          {calendarData.monthName} {calendarData.year}
        </h2>
        <button
          onClick={handleNextMonth}
          className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          aria-label="Mois suivant"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
          </svg>
        </button>
      </div>
      
      <div className="grid grid-cols-7 gap-1 mb-3">
        {["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"].map((day) => (
          <div key={day} className="calendar-header text-center text-sm">
            {day}
          </div>
        ))}
      </div>
      
      <div className="grid grid-cols-7 gap-1">
        {calendarData.days.map((dayInfo: CalendarDay) => (
          dayInfo.type === 'empty' ? (
            <div key={dayInfo.id} className="calendar-day empty"></div>
          ) : (
            <button
              key={dayInfo.id}
              onClick={() => dayInfo.date && handleSelectDate(dayInfo.date)}
              className={`calendar-day ${dayInfo.isSelected ? 'selected' : ''}`}
            >
              {dayInfo.day}
            </button>
          )
        ))}
      </div>
    </div>
  );
}
