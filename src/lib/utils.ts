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

// Cette section a été supprimée pour éliminer les fonctionnalités calendrier


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