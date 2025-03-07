
export interface HealthEntry {
  id: string;
  date: string;
  weight?: number; // en kg
  bloodSugar?: number; // en mmol/L
  ketones?: number; // en mmol/L
  notes?: string;
}

export interface HealthData {
  entries: HealthEntry[];
}
