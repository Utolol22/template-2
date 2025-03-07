import { HealthProvider } from "../lib/contexts/HealthContext";
import HealthForm from "../components/HealthForm";
import EntriesList from "../components/EntriesList";
import HealthStats from "../components/HealthStats";
import HealthCharts from "../components/HealthCharts";

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-blue-800">Suivi Régime Cétogène</h1>
          <p className="text-gray-600 mt-2">
            Suivez vos données de santé pour votre régime cétogène
          </p>
        </header>

        <HealthProvider>
          <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <HealthForm />
              <HealthStats />
            </div>
            <HealthCharts />
            <EntriesList />
          </div>
        </HealthProvider>
      </div>
    </main>
  );
}