
"use client";

import { useState } from "react";
import { useHealth } from "../lib/contexts/HealthContext";
import { formatDate } from "../lib/utils";

export default function EntriesList() {
  const { healthData, removeEntry } = useHealth();
  const [sortBy, setSortBy] = useState<"date" | "weight" | "bloodSugar" | "ketones">("date");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");

  const sortedEntries = [...healthData.entries].sort((a, b) => {
    if (sortBy === "date") {
      return sortOrder === "asc" 
        ? new Date(a.date).getTime() - new Date(b.date).getTime()
        : new Date(b.date).getTime() - new Date(a.date).getTime();
    }
    
    const aValue = a[sortBy] || 0;
    const bValue = b[sortBy] || 0;
    
    return sortOrder === "asc" ? aValue - bValue : bValue - aValue;
  });

  const toggleSort = (field: "date" | "weight" | "bloodSugar" | "ketones") => {
    if (sortBy === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(field);
      setSortOrder("desc");
    }
  };

  if (sortedEntries.length === 0) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-md text-center">
        <p className="text-gray-500">Aucune entrée pour le moment. Ajoutez votre première mesure!</p>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md overflow-x-auto">
      <h2 className="text-xl font-semibold mb-4">Historique des mesures</h2>
      <table className="w-full min-w-full divide-y divide-gray-200">
        <thead>
          <tr>
            <th 
              className="px-4 py-2 text-left text-sm font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
              onClick={() => toggleSort("date")}
            >
              Date {sortBy === "date" && (sortOrder === "asc" ? "↑" : "↓")}
            </th>
            <th 
              className="px-4 py-2 text-left text-sm font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
              onClick={() => toggleSort("weight")}
            >
              Poids (kg) {sortBy === "weight" && (sortOrder === "asc" ? "↑" : "↓")}
            </th>
            <th 
              className="px-4 py-2 text-left text-sm font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
              onClick={() => toggleSort("bloodSugar")}
            >
              Glycémie {sortBy === "bloodSugar" && (sortOrder === "asc" ? "↑" : "↓")}
            </th>
            <th 
              className="px-4 py-2 text-left text-sm font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
              onClick={() => toggleSort("ketones")}
            >
              Cétones {sortBy === "ketones" && (sortOrder === "asc" ? "↑" : "↓")}
            </th>
            <th className="px-4 py-2 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
              Notes
            </th>
            <th className="px-4 py-2"></th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {sortedEntries.map((entry) => (
            <tr key={entry.id}>
              <td className="px-4 py-2 whitespace-nowrap">{formatDate(entry.date)}</td>
              <td className="px-4 py-2">{entry.weight !== undefined ? entry.weight.toFixed(1) : "-"}</td>
              <td className="px-4 py-2">{entry.bloodSugar !== undefined ? entry.bloodSugar.toFixed(1) : "-"}</td>
              <td className="px-4 py-2">{entry.ketones !== undefined ? entry.ketones.toFixed(1) : "-"}</td>
              <td className="px-4 py-2 max-w-xs truncate">{entry.notes || "-"}</td>
              <td className="px-4 py-2 text-right">
                <button
                  onClick={() => removeEntry(entry.id)}
                  className="text-red-600 hover:text-red-800"
                >
                  Supprimer
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
