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
    <div className="bg-white p-6 rounded-lg shadow-md dark:bg-gray-800 dark:text-gray-200">
      <h2 className="text-xl font-semibold text-blue-600 dark:text-blue-400 mb-6">Ajouter une mesure</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="mb-6">
          <DatePicker selectedDate={selectedDate} onChange={setSelectedDate} />
        </div>

        <div className="mb-5">
          <label htmlFor="weight" className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
            Poids (kg)
          </label>
          <input
            type="number"
            id="weight"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            placeholder="Votre poids en kg"
            className="w-full p-3 rounded-lg transition-all focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
          />
        </div>

        <div className="mb-5">
          <label htmlFor="bloodSugar" className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
            Glycémie (mmol/L)
          </label>
          <input
            type="number"
            id="bloodSugar"
            value={bloodSugar}
            onChange={(e) => setBloodSugar(e.target.value)}
            placeholder="Votre taux de sucre sanguin"
            className="w-full p-3 rounded-lg transition-all focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
          />
        </div>

        <div className="mb-5">
          <label htmlFor="ketones" className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
            Cétones (mmol/L)
          </label>
          <input
            type="number"
            id="ketones"
            value={ketones}
            onChange={(e) => setKetones(e.target.value)}
            placeholder="Votre taux de cétones"
            className="w-full p-3 rounded-lg transition-all focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
          />
        </div>

        <div className="mb-6">
          <label htmlFor="notes" className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
            Notes
          </label>
          <textarea
            id="notes"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Notes supplémentaires"
            className="w-full p-3 rounded-lg transition-all focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
            rows={3}
          />
        </div>

        <button
          type="submit"
          className="w-full py-3 px-4 bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-500 dark:to-indigo-500 text-white font-semibold rounded-lg hover:opacity-90 transition-all duration-300 shadow-md"
        >
          Enregistrer
        </button>
      </form>
    </div>
  );
}