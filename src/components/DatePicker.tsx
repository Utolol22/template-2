
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
    <div className="bg-white p-4 rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-4">
        <button
          onClick={handlePrevMonth}
          className="p-2 rounded-full hover:bg-gray-100"
        >
          &lt;
        </button>
        <h2 className="text-lg font-semibold text-gray-700">
          {calendarData.monthName} {calendarData.year}
        </h2>
        <button
          onClick={handleNextMonth}
          className="p-2 rounded-full hover:bg-gray-100"
        >
          &gt;
        </button>
      </div>
      
      <div className="grid grid-cols-7 gap-1 mb-2">
        {["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"].map((day) => (
          <div key={day} className="text-center text-sm text-gray-600">
            {day}
          </div>
        ))}
      </div>
      
      <div className="grid grid-cols-7 gap-1">
        {calendarData.days.map((dayInfo: CalendarDay) => (
          dayInfo.type === 'empty' ? (
            <div key={dayInfo.id} className="h-8 w-8"></div>
          ) : (
            <button
              key={dayInfo.id}
              onClick={() => dayInfo.date && handleSelectDate(dayInfo.date)}
              className={`h-8 w-8 rounded-full flex items-center justify-center hover:bg-blue-100 ${
                dayInfo.isSelected ? 'bg-blue-500 text-white hover:bg-blue-600' : ''
              }`}
            >
              {dayInfo.day}
            </button>
          )
        ))}
      </div>
    </div>
  );
}
