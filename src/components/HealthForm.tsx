
"use client";

import { useState } from "react";
import { useHealth } from "../lib/contexts/HealthContext";

export default function HealthForm() {
  const { addEntry } = useHealth();
  const [weight, setWeight] = useState<string>("");
  const [bloodSugar, setBloodSugar] = useState<string>("");
  const [ketones, setKetones] = useState<string>("");
  const [notes, setNotes] = useState<string>("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    addEntry({
      date: new Date().toISOString(),
      weight: weight ? parseFloat(weight) : undefined,
      bloodSugar: bloodSugar ? parseFloat(bloodSugar) : undefined,
      ketones: ketones ? parseFloat(ketones) : undefined,
      notes: notes || undefined,
    });
    
    // Reset form
    setWeight("");
    setBloodSugar("");
    setKetones("");
    setNotes("");
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Ajouter une entrée</h2>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="weight" className="block text-sm font-medium text-gray-700 mb-1">
              Poids (kg)
            </label>
            <input
              type="number"
              id="weight"
              step="0.1"
              min="0"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <div>
            <label htmlFor="bloodSugar" className="block text-sm font-medium text-gray-700 mb-1">
              Glycémie (mmol/L)
            </label>
            <input
              type="number"
              id="bloodSugar"
              step="0.1"
              min="0"
              value={bloodSugar}
              onChange={(e) => setBloodSugar(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <div>
            <label htmlFor="ketones" className="block text-sm font-medium text-gray-700 mb-1">
              Cétones (mmol/L)
            </label>
            <input
              type="number"
              id="ketones"
              step="0.1"
              min="0"
              value={ketones}
              onChange={(e) => setKetones(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <div className="md:col-span-2">
            <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-1">
              Notes
            </label>
            <textarea
              id="notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows={3}
            />
          </div>
        </div>
        
        <button
          type="submit"
          className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition-colors"
        >
          Ajouter
        </button>
      </form>
    </div>
  );
}
