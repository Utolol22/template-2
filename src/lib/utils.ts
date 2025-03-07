
import { format, parseISO, isValid } from 'date-fns';
import { fr } from 'date-fns/locale';

export const formatDate = (dateString: string): string => {
  const date = parseISO(dateString);
  if (!isValid(date)) return 'Date invalide';
  return format(date, 'dd MMMM yyyy à HH:mm', { locale: fr });
};

export const formatShortDate = (dateString: string): string => {
  const date = parseISO(dateString);
  if (!isValid(date)) return 'Date invalide';
  return format(date, 'dd/MM/yyyy', { locale: fr });
};

export interface CalendarDay {
  id: string;
  type: 'empty' | 'day';
  day?: number;
  date?: Date;
  isSelected?: boolean;
}

export interface CalendarData {
  days: CalendarDay[];
  monthName: string;
  year: number;
}

export const generateCalendarData = (
  date: Date,
  selectedDate: Date | null
): CalendarData => {
  const year = date.getFullYear();
  const month = date.getMonth();
  
  // Premier jour du mois (0 = Dimanche, 1 = Lundi, etc.)
  const firstDay = new Date(year, month, 1).getDay();
  // Convertir pour commencer par Lundi (0 = Lundi, 6 = Dimanche)
  const adjustedFirstDay = firstDay === 0 ? 6 : firstDay - 1;
  
  // Nombre de jours dans le mois
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  
  const days: CalendarDay[] = [];
  
  // Ajout des jours vides au début
  for (let i = 0; i < adjustedFirstDay; i++) {
    days.push({ id: `empty-${i}`, type: 'empty' });
  }
  
  // Ajout des jours du mois
  for (let i = 1; i <= daysInMonth; i++) {
    const currentDate = new Date(year, month, i);
    const isSelected = selectedDate ? 
      selectedDate.getDate() === i && 
      selectedDate.getMonth() === month && 
      selectedDate.getFullYear() === year : false;
      
    days.push({ 
      id: `day-${i}`, 
      type: 'day', 
      day: i, 
      date: currentDate,
      isSelected 
    });
  }
  
  const monthNames = [
    "Janvier", "Février", "Mars", "Avril", "Mai", "Juin",
    "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"
  ];
  
  return {
    days,
    monthName: monthNames[month],
    year
  };
};

// Fonction pour calculer des statistiques
export const calculateStats = (data: any[], field: string) => {
  if (!data || data.length === 0) return { min: 0, max: 0, avg: 0, last: 0 };
  
  const validValues = data
    .filter(item => item[field] !== undefined && item[field] !== null)
    .map(item => Number(item[field]));
  
  if (validValues.length === 0) return { min: 0, max: 0, avg: 0, last: 0 };
  
  const min = Math.min(...validValues);
  const max = Math.max(...validValues);
  const avg = validValues.reduce((a, b) => a + b, 0) / validValues.length;
  const last = validValues[validValues.length - 1];
  
  return { min, max, avg: parseFloat(avg.toFixed(1)), last };
};
