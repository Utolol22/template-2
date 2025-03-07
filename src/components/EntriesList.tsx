
"use client";

import { useState } from "react";
import { useHealth } from "../lib/contexts/HealthContext";
import { formatDate } from "../lib/utils";

export default function EntriesList() {
  const { healthData, removeEntry } = useHealth();
  const [sortBy, setSortBy] = useState<"date" | "weight" | "bloodSugar" | "ketones">("date");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [filterType, setFilterType] = useState<"all" | "weight" | "bloodSugar" | "ketones">("all");
  const [searchValue, setSearchValue] = useState("");

  // Filtre des entrées
  const filteredEntries = healthData.entries.filter(entry => {
    // Filtrer par type si un filtre est sélectionné
    if (filterType !== "all" && entry[filterType] === undefined) {
      return false;
    }
    
    // Filtrer par recherche dans les notes
    if (searchValue && entry.notes) {
      return entry.notes.toLowerCase().includes(searchValue.toLowerCase());
    } else if (searchValue) {
      return false;
    }
    
    return true;
  });

  // Tri des entrées
  const sortedEntries = [...filteredEntries].sort((a, b) => {
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

  if (healthData.entries.length === 0) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-md text-center">
        <p className="text-gray-500">Aucune entrée pour le moment. Ajoutez votre première mesure!</p>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold text-blue-800 mb-4">Historique</h2>

      <div className="flex flex-col md:flex-row justify-between mb-4 space-y-2 md:space-y-0 md:space-x-2">
        <div className="flex flex-1 space-x-2">
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="Rechercher dans les notes..."
              className="w-full px-4 py-2 border border-gray-300 rounded-md"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
            />
            {searchValue && (
              <button
                onClick={() => setSearchValue("")}
                className="absolute right-2 top-2 text-gray-400 hover:text-gray-600"
              >
                <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </button>
            )}
          </div>
        </div>

        <select
          className="px-4 py-2 border border-gray-300 rounded-md"
          value={filterType}
          onChange={(e) => setFilterType(e.target.value as any)}
        >
          <option value="all">Toutes les mesures</option>
          <option value="weight">Poids uniquement</option>
          <option value="bloodSugar">Glycémie uniquement</option>
          <option value="ketones">Cétones uniquement</option>
        </select>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th 
                scope="col" 
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                onClick={() => toggleSort("date")}
              >
                <div className="flex items-center">
                  Date
                  {sortBy === "date" && (
                    <span className="ml-1">
                      {sortOrder === "asc" ? "↑" : "↓"}
                    </span>
                  )}
                </div>
              </th>
              <th 
                scope="col" 
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                onClick={() => toggleSort("weight")}
              >
                <div className="flex items-center">
                  Poids (kg)
                  {sortBy === "weight" && (
                    <span className="ml-1">
                      {sortOrder === "asc" ? "↑" : "↓"}
                    </span>
                  )}
                </div>
              </th>
              <th 
                scope="col" 
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                onClick={() => toggleSort("bloodSugar")}
              >
                <div className="flex items-center">
                  Glycémie (mmol/L)
                  {sortBy === "bloodSugar" && (
                    <span className="ml-1">
                      {sortOrder === "asc" ? "↑" : "↓"}
                    </span>
                  )}
                </div>
              </th>
              <th 
                scope="col" 
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                onClick={() => toggleSort("ketones")}
              >
                <div className="flex items-center">
                  Cétones (mmol/L)
                  {sortBy === "ketones" && (
                    <span className="ml-1">
                      {sortOrder === "asc" ? "↑" : "↓"}
                    </span>
                  )}
                </div>
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Notes
              </th>
              <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {sortedEntries.map((entry) => (
              <tr key={entry.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {formatDate(entry.date).split(' à ')[0]}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {entry.weight !== undefined ? entry.weight : "-"}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {entry.bloodSugar !== undefined ? entry.bloodSugar : "-"}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {entry.ketones !== undefined ? entry.ketones : "-"}
                </td>
                <td className="px-6 py-4 text-sm text-gray-900 max-w-xs overflow-hidden text-ellipsis">
                  {entry.notes || "-"}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button
                    onClick={() => removeEntry(entry.id)}
                    className="text-red-600 hover:text-red-900"
                  >
                    Supprimer
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
