
"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { HealthData, HealthEntry } from "../../types/health";
import { getHealthData, saveHealthData, addHealthEntry, deleteHealthEntry, updateHealthEntry } from "../healthDataService";

interface HealthContextType {
  healthData: HealthData;
  addEntry: (entry: Omit<HealthEntry, "id">) => HealthEntry;
  removeEntry: (id: string) => void;
  updateEntry: (entry: HealthEntry) => void;
}

const HealthContext = createContext<HealthContextType | undefined>(undefined);

export function HealthProvider({ children }: { children: ReactNode }) {
  const [healthData, setHealthData] = useState<HealthData>({ entries: [] });

  useEffect(() => {
    setHealthData(getHealthData());
  }, []);

  const handleAddEntry = (entry: Omit<HealthEntry, "id">) => {
    const newEntry = addHealthEntry(entry);
    setHealthData(getHealthData());
    return newEntry;
  };

  const handleRemoveEntry = (id: string) => {
    deleteHealthEntry(id);
    setHealthData(getHealthData());
  };

  const handleUpdateEntry = (entry: HealthEntry) => {
    updateHealthEntry(entry);
    setHealthData(getHealthData());
  };

  return (
    <HealthContext.Provider
      value={{
        healthData,
        addEntry: handleAddEntry,
        removeEntry: handleRemoveEntry,
        updateEntry: handleUpdateEntry,
      }}
    >
      {children}
    </HealthContext.Provider>
  );
}

export function useHealth() {
  const context = useContext(HealthContext);
  if (context === undefined) {
    throw new Error("useHealth must be used within a HealthProvider");
  }
  return context;
}
