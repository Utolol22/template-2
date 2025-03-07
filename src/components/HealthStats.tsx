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
      if (Math.abs(diff) < 0.1) return "stable";
      return diff > 0 ? "up" : "down";
    };

    const getKetonesTrend = () => {
      if (ketones.length < 2) return "stable";
      const latest = ketones[0];
      const prevAvg = ketones.slice(1, 4).reduce((sum, val, _, arr) => sum + val / arr.length, 0);
      const diff = latest - prevAvg;
      if (Math.abs(diff) < 0.1) return "stable";
      return diff > 0 ? "up" : "down";
    };

    return {
      weight: {
        latest: weights.length > 0 ? weights[0] : null,
        min: weights.length > 0 ? Math.min(...weights) : null,
        max: weights.length > 0 ? Math.max(...weights) : null,
        avg: weights.length > 0 ? Math.round(weights.reduce((a, b) => a + b, 0) / weights.length * 10) / 10 : null,
        trend: getWeightTrend(),
      },
      bloodSugar: {
        latest: bloodSugars.length > 0 ? bloodSugars[0] : null,
        min: bloodSugars.length > 0 ? Math.min(...bloodSugars) : null,
        max: bloodSugars.length > 0 ? Math.max(...bloodSugars) : null,
        avg: bloodSugars.length > 0 ? Math.round(bloodSugars.reduce((a, b) => a + b, 0) / bloodSugars.length * 10) / 10 : null,
        trend: getBloodSugarTrend(),
      },
      ketones: {
        latest: ketones.length > 0 ? ketones[0] : null,
        min: ketones.length > 0 ? Math.min(...ketones) : null,
        max: ketones.length > 0 ? Math.max(...ketones) : null,
        avg: ketones.length > 0 ? Math.round(ketones.reduce((a, b) => a + b, 0) / ketones.length * 10) / 10 : null,
        trend: getKetonesTrend(),
      },
    };
  };

  const stats = calculateStats();

  // Icônes pour les tendances
  const renderTrendIcon = (trend: string) => {
    if (trend === "up") {
      return <span className="ml-1 text-red-400 dark:text-red-300">↑</span>;
    } else if (trend === "down") {
      return <span className="ml-1 text-green-500 dark:text-green-400">↓</span>;
    }
    return <span className="ml-1 text-gray-400">→</span>;
  };

  const StatCard = ({ title, value, unit, trend, min, avg, max, bgColor, textColor }: {
    title: string;
    value: number | null;
    unit: string;
    trend: string;
    min: number | null;
    avg: number | null;
    max: number | null;
    bgColor: string;
    textColor: string;
  }) => {
    return (
      <div className={`${bgColor} backdrop-blur-sm p-5 rounded-xl shadow-lg transition-all duration-300 hover:shadow-xl dark:shadow-gray-900/30`}>
        <div className="flex justify-between items-center mb-3">
          <h3 className={`text-lg font-semibold ${textColor} font-sans tracking-tight`}>{title}</h3>
          {value !== null && (
            <div className="flex items-center">
              <span className={`text-2xl font-bold ${textColor} font-mono`}>
                {value}
              </span>
              <span className={`ml-1 text-sm ${textColor} font-light`}>{unit}</span>
              {renderTrendIcon(trend)}
            </div>
          )}
        </div>

        {value !== null ? (
          <div className="grid grid-cols-3 gap-3 text-center mt-4">
            <div className="p-2 bg-white/30 dark:bg-gray-800/30 rounded-lg">
              <p className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Min</p>
              <p className="font-semibold text-gray-700 dark:text-gray-300">{min} <span className="text-xs">{unit}</span></p>
            </div>
            <div className="p-2 bg-white/30 dark:bg-gray-800/30 rounded-lg">
              <p className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Moy</p>
              <p className="font-semibold text-gray-700 dark:text-gray-300">{avg} <span className="text-xs">{unit}</span></p>
            </div>
            <div className="p-2 bg-white/30 dark:bg-gray-800/30 rounded-lg">
              <p className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Max</p>
              <p className="font-semibold text-gray-700 dark:text-gray-300">{max} <span className="text-xs">{unit}</span></p>
            </div>
          </div>
        ) : (
          <div className="text-center py-4 rounded-lg bg-white/30 dark:bg-gray-800/30">
            <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">Pas de données</p>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md transition-all duration-300">
      <h2 className="text-xl font-bold text-blue-700 dark:text-blue-400 mb-6 font-sans tracking-tight">Statistiques</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <StatCard 
          title="Poids" 
          value={stats.weight.latest} 
          unit="kg" 
          trend={stats.weight.trend} 
          min={stats.weight.min} 
          avg={stats.weight.avg} 
          max={stats.weight.max} 
          bgColor="bg-blue-50/80 dark:bg-blue-900/20" 
          textColor="text-blue-800 dark:text-blue-300" 
        />

        <StatCard 
          title="Glycémie" 
          value={stats.bloodSugar.latest} 
          unit="mmol/L" 
          trend={stats.bloodSugar.trend} 
          min={stats.bloodSugar.min} 
          avg={stats.bloodSugar.avg} 
          max={stats.bloodSugar.max} 
          bgColor="bg-red-50/80 dark:bg-red-900/20" 
          textColor="text-red-800 dark:text-red-300" 
        />

        <StatCard 
          title="Cétones" 
          value={stats.ketones.latest} 
          unit="mmol/L" 
          trend={stats.ketones.trend} 
          min={stats.ketones.min} 
          avg={stats.ketones.avg} 
          max={stats.ketones.max} 
          bgColor="bg-green-50/80 dark:bg-green-900/20" 
          textColor="text-green-800 dark:text-green-300" 
        />
      </div>
    </div>
  );
}