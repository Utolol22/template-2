import { HealthProvider } from "../lib/contexts/HealthContext";
import HealthForm from "../components/HealthForm";
import EntriesList from "../components/EntriesList";
import HealthStats from "../components/HealthStats";
import HealthCharts from "../components/HealthCharts";
import ThemeToggle from "../components/ThemeToggle"; // Assuming this component exists

export default function Home() {
  return (
    <main className="container mx-auto p-4 md:p-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold text-blue-600 dark:text-blue-400">Suivi Régime Cétogène</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">Suivez vos données de santé pour votre régime cétogène</p>
        </div>
        <ThemeToggle />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="card p-6">
          <HealthForm />
        </div>
        <div className="space-y-8">
          <HealthStats />
          <HealthCharts />
        </div>
      </div>

      <div className="mt-10">
        <EntriesList />
      </div>
    </main>
  );
}