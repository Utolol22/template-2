
import { HealthEntry, HealthData } from "../types/health";

const STORAGE_KEY = "keto-health-tracker-data";

export function saveHealthData(data: HealthData): void {
  if (typeof window !== "undefined") {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  }
}

export function getHealthData(): HealthData {
  if (typeof window === "undefined") {
    return { entries: [] };
  }
  
  const data = localStorage.getItem(STORAGE_KEY);
  if (!data) {
    return { entries: [] };
  }
  
  try {
    return JSON.parse(data) as HealthData;
  } catch (e) {
    console.error("Error parsing health data:", e);
    return { entries: [] };
  }
}

export function addHealthEntry(entry: Omit<HealthEntry, "id">): HealthEntry {
  const data = getHealthData();
  const newEntry: HealthEntry = {
    ...entry,
    id: Date.now().toString(),
  };
  
  data.entries.push(newEntry);
  saveHealthData(data);
  
  return newEntry;
}

export function deleteHealthEntry(id: string): void {
  const data = getHealthData();
  data.entries = data.entries.filter(entry => entry.id !== id);
  saveHealthData(data);
}

export function updateHealthEntry(updatedEntry: HealthEntry): void {
  const data = getHealthData();
  data.entries = data.entries.map(entry => 
    entry.id === updatedEntry.id ? updatedEntry : entry
  );
  saveHealthData(data);
}
