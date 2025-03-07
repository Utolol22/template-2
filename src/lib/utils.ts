import React, { useState } from "react";

export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('fr-FR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
}

interface CalendarProps {
  selectedDate: Date;
  onSelectDate: (date: Date) => void;
}

export function Calendar({ selectedDate, onSelectDate }: CalendarProps) {
  const [currentMonth, setCurrentMonth] = useState(new Date(selectedDate));

  const daysInMonth = (year: number, month: number) => new Date(year, month + 1, 0).getDate();
  const firstDayOfMonth = (year: number, month: number) => new Date(year, month, 1).getDay();

  const year = currentMonth.getFullYear();
  const month = currentMonth.getMonth();

  const prevMonth = () => {
    setCurrentMonth(new Date(year, month - 1, 1));
  };

  const nextMonth = () => {
    setCurrentMonth(new Date(year, month + 1, 1));
  };

  const renderDays = () => {
    const days = [];
    const totalDays = daysInMonth(year, month);
    const firstDay = firstDayOfMonth(year, month);

    // Ajout des jours vides au début
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="h-8 w-8"></div>);
    }

    // Ajout des jours du mois
    for (let i = 1; i <= totalDays; i++) {
      const date = new Date(year, month, i);
      const isSelected = 
        date.getDate() === selectedDate.getDate() && 
        date.getMonth() === selectedDate.getMonth() && 
        date.getFullYear() === selectedDate.getFullYear();

      days.push(
        <button
          key={`day-${i}`}
          onClick={() => onSelectDate(date)}
          className={`h-8 w-8 rounded-full flex items-center justify-center hover:bg-blue-100 ${
            isSelected ? 'bg-blue-500 text-white hover:bg-blue-600' : ''
          }`}
        >
          {i}
        </button>
      );
    }

    return days;
  };

  const monthNames = [
    "Janvier", "Février", "Mars", "Avril", "Mai", "Juin",
    "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"
  ];

  return (
    <div className="calendar w-64">
      <div className="flex justify-between items-center mb-2">
        <button onClick={prevMonth} className="p-1 hover:bg-gray-100 rounded">
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <div className="font-semibold">
          {monthNames[month]} {year}
        </div>
        <button onClick={nextMonth} className="p-1 hover:bg-gray-100 rounded">
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
      <div className="grid grid-cols-7 gap-1 text-center text-xs text-gray-500 mb-1">
        <div>D</div>
        <div>L</div>
        <div>M</div>
        <div>M</div>
        <div>J</div>
        <div>V</div>
        <div>S</div>
      </div>
      <div className="grid grid-cols-7 gap-1">
        {renderDays()}
      </div>
    </div>
  );
}