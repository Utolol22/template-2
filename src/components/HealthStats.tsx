
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
    const weights = healthData.entries.filter(e => e.weight !== undefined).map(e => e.weight!);
    const bloodSugars = healthData.entries.filter(e => e.bloodSugar !== undefined).map(e => e.bloodSugar!);
    const ketones = healthData.entries.filter(e => e.ketones !== undefined).map(e => e.ketones!);
    
    return {
      weight: {
        latest: weights.length > 0 ? weights[0] : null,
        min: weights.length > 0 ? Math.min(...weights) : null,
        max: weights.length > 0 ? Math.max(...weights) : null,
        avg: weights.length > 0 ? weights.reduce((a, b) => a + b, 0) / weights.length : null,
      },
      bloodSugar: {
        latest: bloodSugars.length > 0 ? bloodSugars[0] : null,
        min: bloodSugars.length > 0 ? Math.min(...bloodSugars) : null,
        max: bloodSugars.length > 0 ? Math.max(...bloodSugars) : null,
        avg: bloodSugars.length > 0 ? bloodSugars.reduce((a, b) => a + b, 0) / bloodSugars.length : null,
      },
      ketones: {
        latest: ketones.length > 0 ? ketones[0] : null,
        min: ketones.length > 0 ? Math.min(...ketones) : null,
        max: ketones.length > 0 ? Math.max(...ketones) : null,
        avg: ketones.length > 0 ? ketones.reduce((a, b) => a + b, 0) / ketones.length : null,
      }
    };
  };

  const stats = calculateStats();

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Statistiques</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Statistiques de poids */}
        <div className="p-4 border border-gray-200 rounded-md">
          <h3 className="font-medium text-lg mb-2">Poids (kg)</h3>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-500">Dernier:</span>
              <span className="font-medium">{stats.weight.latest !== null ? stats.weight.latest.toFixed(1) : "-"}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Min:</span>
              <span className="font-medium">{stats.weight.min !== null ? stats.weight.min.toFixed(1) : "-"}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Max:</span>
              <span className="font-medium">{stats.weight.max !== null ? stats.weight.max.toFixed(1) : "-"}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Moyenne:</span>
              <span className="font-medium">{stats.weight.avg !== null ? stats.weight.avg.toFixed(1) : "-"}</span>
            </div>
          </div>
        </div>
        
        {/* Statistiques de glycémie */}
        <div className="p-4 border border-gray-200 rounded-md">
          <h3 className="font-medium text-lg mb-2">Glycémie (mmol/L)</h3>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-500">Dernière:</span>
              <span className="font-medium">{stats.bloodSugar.latest !== null ? stats.bloodSugar.latest.toFixed(1) : "-"}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Min:</span>
              <span className="font-medium">{stats.bloodSugar.min !== null ? stats.bloodSugar.min.toFixed(1) : "-"}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Max:</span>
              <span className="font-medium">{stats.bloodSugar.max !== null ? stats.bloodSugar.max.toFixed(1) : "-"}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Moyenne:</span>
              <span className="font-medium">{stats.bloodSugar.avg !== null ? stats.bloodSugar.avg.toFixed(1) : "-"}</span>
            </div>
          </div>
        </div>
        
        {/* Statistiques de cétones */}
        <div className="p-4 border border-gray-200 rounded-md">
          <h3 className="font-medium text-lg mb-2">Cétones (mmol/L)</h3>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-500">Dernières:</span>
              <span className="font-medium">{stats.ketones.latest !== null ? stats.ketones.latest.toFixed(1) : "-"}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Min:</span>
              <span className="font-medium">{stats.ketones.min !== null ? stats.ketones.min.toFixed(1) : "-"}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Max:</span>
              <span className="font-medium">{stats.ketones.max !== null ? stats.ketones.max.toFixed(1) : "-"}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Moyenne:</span>
              <span className="font-medium">{stats.ketones.avg !== null ? stats.ketones.avg.toFixed(1) : "-"}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
