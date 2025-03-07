"use client";

import { useEffect, useState } from "react";
import { useHealth } from "../lib/contexts/HealthContext";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  TimeScale,
} from "chart.js";
import { Line } from "react-chartjs-2";
import "chart.js/auto";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  TimeScale
);

export default function HealthCharts() {
  const { healthData } = useHealth();
  const [chartData, setChartData] = useState<any>({
    weight: { labels: [], data: [] },
    bloodSugar: { labels: [], data: [] },
    ketones: { labels: [], data: [] },
  });

  useEffect(() => {
    if (healthData.entries.length > 0) {
      // Trier par date
      const sortedEntries = [...healthData.entries].sort(
        (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
      );

      // Formater les données pour les graphiques
      const weightData = {
        labels: sortedEntries
          .filter((entry) => entry.weight !== undefined)
          .map((entry) => formatDateForChart(entry.date)),
        data: sortedEntries
          .filter((entry) => entry.weight !== undefined)
          .map((entry) => entry.weight),
      };

      const bloodSugarData = {
        labels: sortedEntries
          .filter((entry) => entry.bloodSugar !== undefined)
          .map((entry) => formatDateForChart(entry.date)),
        data: sortedEntries
          .filter((entry) => entry.bloodSugar !== undefined)
          .map((entry) => entry.bloodSugar),
      };

      const ketonesData = {
        labels: sortedEntries
          .filter((entry) => entry.ketones !== undefined)
          .map((entry) => formatDateForChart(entry.date)),
        data: sortedEntries
          .filter((entry) => entry.ketones !== undefined)
          .map((entry) => entry.ketones),
      };

      setChartData({
        weight: weightData,
        bloodSugar: bloodSugarData,
        ketones: ketonesData,
      });
    }
  }, [healthData]);

  const formatDateForChart = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("fr-FR", {
      day: "2-digit",
      month: "2-digit",
    });
  };

  // Si pas assez de données, afficher un message
  if (healthData.entries.length < 2) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-md text-center dark:bg-gray-800 dark:text-gray-200">
        <p className="text-gray-500 dark:text-gray-400">
          Ajoutez au moins deux entrées pour voir des graphiques de tendance.
        </p>
      </div>
    );
  }

  // Définir les options de graphique avec des échelles adaptées
  const getChartOptions = (dataPoints: number[]) => {
    if (dataPoints.length === 0) return defaultChartOptions;

    // Calculer les valeurs min et max avec une marge
    const min = Math.min(...dataPoints);
    const max = Math.max(...dataPoints);
    const range = max - min;

    // Ajouter une marge de 10% en haut et en bas
    const padding = range * 0.1;
    const minValue = Math.max(0, min - padding); // Ne pas descendre sous 0 pour certaines mesures
    const maxValue = max + padding;

    return {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: false,
        },
        tooltip: {
          callbacks: {
            label: function (context: any) {
              const value = context.raw;
              return `${value}`;
            },
          },
        },
      },
      scales: {
        y: {
          beginAtZero: false,
          min: minValue,
          max: maxValue,
          ticks: {
            color: "rgba(100, 116, 139, 0.8)",
          },
          grid: {
            color: "rgba(226, 232, 240, 0.5)",
          },
        },
        x: {
          ticks: {
            color: "rgba(100, 116, 139, 0.8)",
          },
          grid: {
            color: "rgba(226, 232, 240, 0.5)",
          },
        },
      },
    };
  };

  const defaultChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: 'rgba(17, 24, 39, 0.8)',
        titleFont: {
          family: "'Inter', sans-serif",
          size: 14,
          weight: 'bold'
        },
        bodyFont: {
          family: "'Inter', sans-serif",
          size: 13
        },
        padding: 12,
        borderColor: 'rgba(255, 255, 255, 0.1)',
        borderWidth: 1,
        displayColors: false,
        callbacks: {
          label: function(context) {
            return `${context.formattedValue} ${context.dataset.unit}`;
          }
        }
      }
    },
    scales: {
      y: {
        beginAtZero: false,
        grid: {
          color: 'rgba(156, 163, 175, 0.1)',
          drawBorder: false,
        },
        ticks: {
          font: {
            family: "'Inter', sans-serif",
            size: 11
          },
          padding: 8,
          color: 'rgb(107, 114, 128)'
        }
      },
      x: {
        grid: {
          display: false,
          drawBorder: false,
        },
        ticks: {
          font: {
            family: "'Inter', sans-serif",
            size: 11
          },
          padding: 8,
          color: 'rgb(107, 114, 128)'
        }
      }
    },
    elements: {
      line: {
        borderWidth: 3
      },
      point: {
        radius: 4,
        hoverRadius: 6,
        borderWidth: 2,
      }
    },
    interaction: {
      mode: 'index',
      intersect: false,
    },
    layout: {
      padding: {
        left: 10,
        right: 10,
        top: 5,
        bottom: 5
      }
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md transition-all duration-300">
      <h2 className="text-xl font-bold text-blue-700 dark:text-blue-400 mb-6 font-sans tracking-tight">
        Tendances de santé
      </h2>

      <div className="grid grid-cols-1 gap-8">
        {chartData.weight.data.length > 0 && (
          <div className="h-72 bg-slate-50/60 dark:bg-gray-900/60 p-5 rounded-xl shadow-sm">
            <h3 className="text-lg font-semibold text-gray-700 mb-3 dark:text-gray-300 font-sans tracking-tight">
              Évolution du poids <span className="text-sm font-normal opacity-70">(kg)</span>
            </h3>
            <div className="relative h-[calc(100%-2rem)]">
              <Line
                data={{
                  labels: chartData.weight.labels,
                  datasets: [
                    {
                      data: chartData.weight.data,
                      borderColor: "rgba(59, 130, 246, 0.8)",
                      backgroundColor: "rgba(59, 130, 246, 0.1)",
                      tension: 0.3,
                      pointBackgroundColor: "rgba(59, 130, 246, 1)",
                      pointBorderColor: "#fff",
                      pointRadius: 4,
                      pointHoverRadius: 6,
                      fill: true,
                      unit: "kg"
                    },
                  ],
                }}
                options={{
                  ...getChartOptions(chartData.weight.data),
                  scales: {
                    ...defaultChartOptions.scales,
                    y: {
                      ...defaultChartOptions.scales.y,
                      min: Math.floor(Math.min(...chartData.weight.data) - 1),
                      max: Math.ceil(Math.max(...chartData.weight.data) + 1),
                    }
                  }
                }}
              />
            </div>
          </div>
        )}

        {chartData.bloodSugar.data.length > 0 && (
          <div className="h-72 bg-slate-50/60 dark:bg-gray-900/60 p-5 rounded-xl shadow-sm">
            <h3 className="text-lg font-semibold text-gray-700 mb-3 dark:text-gray-300 font-sans tracking-tight">
              Évolution de la glycémie <span className="text-sm font-normal opacity-70">(mmol/L)</span>
            </h3>
            <div className="relative h-[calc(100%-2rem)]">
              <Line
                data={{
                  labels: chartData.bloodSugar.labels,
                  datasets: [
                    {
                      data: chartData.bloodSugar.data,
                      borderColor: "rgba(239, 68, 68, 0.8)",
                      backgroundColor: "rgba(239, 68, 68, 0.1)",
                      tension: 0.3,
                      pointBackgroundColor: "rgba(239, 68, 68, 1)",
                      pointBorderColor: "#fff",
                      pointRadius: 4,
                      pointHoverRadius: 6,
                      fill: true,
                      unit: "mmol/L"
                    },
                  ],
                }}
                options={{
                  ...getChartOptions(chartData.bloodSugar.data),
                  scales: {
                    ...defaultChartOptions.scales,
                    y: {
                      ...defaultChartOptions.scales.y,
                      min: Math.floor(Math.min(...chartData.bloodSugar.data) - 0.2),
                      max: Math.ceil(Math.max(...chartData.bloodSugar.data) + 0.2),
                    }
                  }
                }}
              />
            </div>
          </div>
        )}

        {chartData.ketones.data.length > 0 && (
          <div className="h-72 bg-slate-50/60 dark:bg-gray-900/60 p-5 rounded-xl shadow-sm">
            <h3 className="text-lg font-semibold text-gray-700 mb-3 dark:text-gray-300 font-sans tracking-tight">
              Évolution des cétones <span className="text-sm font-normal opacity-70">(mmol/L)</span>
            </h3>
            <div className="relative h-[calc(100%-2rem)]">
              <Line
                data={{
                  labels: chartData.ketones.labels,
                  datasets: [
                    {
                      data: chartData.ketones.data,
                      borderColor: "rgba(16, 185, 129, 0.8)",
                      backgroundColor: "rgba(16, 185, 129, 0.1)",
                      tension: 0.3,
                      pointBackgroundColor: "rgba(16, 185, 129, 1)",
                      pointBorderColor: "#fff",
                      pointRadius: 4,
                      pointHoverRadius: 6,
                      fill: true,
                      unit: "mmol/L"
                    },
                  ],
                }}
                options={{
                  ...getChartOptions(chartData.ketones.data),
                  scales: {
                    ...defaultChartOptions.scales,
                    y: {
                      ...defaultChartOptions.scales.y,
                      min: Math.floor(Math.min(...chartData.ketones.data) - 0.2),
                      max: Math.ceil(Math.max(...chartData.ketones.data) + 0.2),
                    }
                  }
                }}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}