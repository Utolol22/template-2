
"use client";

import { useHealth } from "../lib/contexts/HealthContext";

export default function HealthStats() {
  const { healthData } = useHealth();
  
  // Si aucune entrée, afficher un message
  if (healthData.entries.length === 0) {
    return null;
  }

  // Calculer les statistiques
  const calculateStats = () => {
    // Trier les entrées par date (la plus récente en premier)
    const sortedEntries = [...healthData.entries].sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );

    const weights = sortedEntries.filter(e => e.weight !== undefined).map(e => e.weight!);
    const bloodSugars = sortedEntries.filter(e => e.bloodSugar !== undefined).map(e => e.bloodSugar!);
    const ketones = sortedEntries.filter(e => e.ketones !== undefined).map(e => e.ketones!);
    
    // Calcul de tendance: comparer la valeur actuelle avec la moyenne des 3 dernières
    const getWeightTrend = () => {
      if (weights.length < 2) return "stable";
      const latest = weights[0];
      const prevAvg = weights.slice(1, 4).reduce((sum, val, _, arr) => sum + val / arr.length, 0);
      const diff = latest - prevAvg;
      if (Math.abs(diff) < 0.5) return "stable";
      return diff > 0 ? "up" : "down";
    };

    const getBloodSugarTrend = () => {
      if (bloodSugars.length < 2) return "stable";
      const latest = bloodSugars[0];
      const prevAvg = bloodSugars.slice(1, 4).reduce((sum, val, _, arr) => sum + val / arr.length, 0);
      const diff = latest - prevAvg;
      if (Math.abs(diff) < 0.3) return "stable";
      return diff > 0 ? "up" : "down";
    };

    const getKetonesTrend = () => {
      if (ketones.length < 2) return "stable";
      const latest = ketones[0];
      const prevAvg = ketones.slice(1, 4).reduce((sum, val, _, arr) => sum + val / arr.length, 0);
      const diff = latest - prevAvg;
      if (Math.abs(diff) < 0.2) return "stable";
      return diff > 0 ? "up" : "down";
    };
    
    return {
      weight: {
        latest: weights.length > 0 ? weights[0] : null,
        min: weights.length > 0 ? Math.min(...weights) : null,
        max: weights.length > 0 ? Math.max(...weights) : null,
        avg: weights.length > 0 ? Math.round((weights.reduce((a, b) => a + b, 0) / weights.length) * 10) / 10 : null,
        trend: getWeightTrend()
      },
      bloodSugar: {
        latest: bloodSugars.length > 0 ? bloodSugars[0] : null,
        min: bloodSugars.length > 0 ? Math.min(...bloodSugars) : null,
        max: bloodSugars.length > 0 ? Math.max(...bloodSugars) : null,
        avg: bloodSugars.length > 0 ? Math.round((bloodSugars.reduce((a, b) => a + b, 0) / bloodSugars.length) * 10) / 10 : null,
        trend: getBloodSugarTrend()
      },
      ketones: {
        latest: ketones.length > 0 ? ketones[0] : null,
        min: ketones.length > 0 ? Math.min(...ketones) : null,
        max: ketones.length > 0 ? Math.max(...ketones) : null,
        avg: ketones.length > 0 ? Math.round((ketones.reduce((a, b) => a + b, 0) / ketones.length) * 10) / 10 : null,
        trend: getKetonesTrend()
      }
    };
  };

  const stats = calculateStats();

  // Icônes de tendance
  const renderTrendIcon = (trend: string) => {
    if (trend === "up") {
      return (
        <span className="inline-block ml-1 text-red-500">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
          </svg>
        </span>
      );
    } else if (trend === "down") {
      return (
        <span className="inline-block ml-1 text-green-500">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M14.707 10.293a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L9 12.586V5a1 1 0 012 0v7.586l2.293-2.293a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
        </span>
      );
    } else {
      return (
        <span className="inline-block ml-1 text-gray-500">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
          </svg>
        </span>
      );
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold text-blue-800 mb-4">Statistiques</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Statistiques de poids */}
        <div className="bg-blue-50 p-4 rounded-lg">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-lg font-medium text-blue-800">Poids</h3>
            {stats.weight.latest !== null && (
              <div className="flex items-center text-xl font-bold text-blue-900">
                {stats.weight.latest} kg
                {renderTrendIcon(stats.weight.trend)}
              </div>
            )}
          </div>
          
          {stats.weight.latest !== null ? (
            <div className="grid grid-cols-3 gap-2 text-center">
              <div>
                <p className="text-sm text-gray-500">Min</p>
                <p className="font-semibold">{stats.weight.min} kg</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Moy</p>
                <p className="font-semibold">{stats.weight.avg} kg</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Max</p>
                <p className="font-semibold">{stats.weight.max} kg</p>
              </div>
            </div>
          ) : (
            <p className="text-sm text-gray-500 text-center">Pas de données</p>
          )}
        </div>
        
        {/* Statistiques de glycémie */}
        <div className="bg-red-50 p-4 rounded-lg">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-lg font-medium text-red-800">Glycémie</h3>
            {stats.bloodSugar.latest !== null && (
              <div className="flex items-center text-xl font-bold text-red-900">
                {stats.bloodSugar.latest} mmol/L
                {renderTrendIcon(stats.bloodSugar.trend)}
              </div>
            )}
          </div>
          
          {stats.bloodSugar.latest !== null ? (
            <div className="grid grid-cols-3 gap-2 text-center">
              <div>
                <p className="text-sm text-gray-500">Min</p>
                <p className="font-semibold">{stats.bloodSugar.min} mmol/L</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Moy</p>
                <p className="font-semibold">{stats.bloodSugar.avg} mmol/L</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Max</p>
                <p className="font-semibold">{stats.bloodSugar.max} mmol/L</p>
              </div>
            </div>
          ) : (
            <p className="text-sm text-gray-500 text-center">Pas de données</p>
          )}
        </div>
        
        {/* Statistiques de cétones */}
        <div className="bg-green-50 p-4 rounded-lg">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-lg font-medium text-green-800">Cétones</h3>
            {stats.ketones.latest !== null && (
              <div className="flex items-center text-xl font-bold text-green-900">
                {stats.ketones.latest} mmol/L
                {renderTrendIcon(stats.ketones.trend)}
              </div>
            )}
          </div>
          
          {stats.ketones.latest !== null ? (
            <div className="grid grid-cols-3 gap-2 text-center">
              <div>
                <p className="text-sm text-gray-500">Min</p>
                <p className="font-semibold">{stats.ketones.min} mmol/L</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Moy</p>
                <p className="font-semibold">{stats.ketones.avg} mmol/L</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Max</p>
                <p className="font-semibold">{stats.ketones.max} mmol/L</p>
              </div>
            </div>
          ) : (
            <p className="text-sm text-gray-500 text-center">Pas de données</p>
          )}
        </div>
      </div>
    </div>
  );
}
