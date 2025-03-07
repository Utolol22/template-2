
"use client";

import { useState } from "react";
import { useHealth } from "../lib/contexts/HealthContext";
import DatePicker from "./DatePicker";

export default function HealthForm() {
  const { addEntry } = useHealth();
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [weight, setWeight] = useState<string>("");
  const [bloodSugar, setBloodSugar] = useState<string>("");
  const [ketones, setKetones] = useState<string>("");
  const [notes, setNotes] = useState<string>("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    addEntry({
      date: selectedDate.toISOString(),
      weight: weight ? parseFloat(weight) : undefined,
      bloodSugar: bloodSugar ? parseFloat(bloodSugar) : undefined,
      ketones: ketones ? parseFloat(ketones) : undefined,
      notes: notes || undefined,
    });
    
    // Ne pas réinitialiser la date à aujourd'hui
    setWeight("");
    setBloodSugar("");
    setKetones("");
    setNotes("");
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold text-blue-800 mb-4">Ajouter une mesure</h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <DatePicker 
          selectedDate={selectedDate}
          onChange={setSelectedDate}
        />
        
        <div>
          <label htmlFor="weight" className="block text-sm font-medium text-gray-700 mb-1">
            Poids (kg)
          </label>
          <input
            type="number"
            id="weight"
            step="0.1"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Votre poids en kg"
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
            value={bloodSugar}
            onChange={(e) => setBloodSugar(e.target.value)}
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Votre taux de sucre sanguin"
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
            value={ketones}
            onChange={(e) => setKetones(e.target.value)}
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Votre taux de cétones"
          />
        </div>
        
        <div>
          <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-1">
            Notes
          </label>
          <textarea
            id="notes"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Observations, repas, activités, etc."
            rows={3}
          />
        </div>
        
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Enregistrer
        </button>
      </form>
    </div>
  );
}
