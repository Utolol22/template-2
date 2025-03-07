
"use client";

import { useState } from "react";
import { Calendar } from "../lib/utils";

interface DatePickerProps {
  onChange: (date: Date) => void;
  selectedDate: Date;
}

export default function DatePicker({ onChange, selectedDate }: DatePickerProps) {
  const [showCalendar, setShowCalendar] = useState(false);

  const formatDate = (date: Date): string => {
    return date.toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  const handleDateSelect = (date: Date) => {
    onChange(date);
    setShowCalendar(false);
  };

  return (
    <div className="relative">
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
        <div className="flex">
          <button
            type="button"
            onClick={() => setShowCalendar(!showCalendar)}
            className="bg-white border border-gray-300 rounded-md py-2 px-3 flex items-center justify-between w-full text-left text-sm"
          >
            {formatDate(selectedDate)}
            <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </button>
        </div>
      </div>

      {showCalendar && (
        <div className="absolute z-10 mt-1 bg-white shadow-lg border border-gray-200 rounded-md p-2">
          <Calendar 
            selectedDate={selectedDate} 
            onSelectDate={handleDateSelect} 
          />
        </div>
      )}
    </div>
  );
}
