
import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center p-8 bg-gradient-to-b from-blue-50 to-white">
      {/* Hero Section */}
      <div className="w-full max-w-4xl text-center py-12">
        <h1 className="text-5xl md:text-6xl font-bold text-blue-700 mb-4">Faites un don aujourd'hui</h1>
        <h2 className="text-xl md:text-2xl text-gray-600 max-w-2xl mx-auto">
          Votre générosité alimente notre mission et aide à créer un impact positif
        </h2>
      </div>

      {/* Donation Card */}
      <div className="w-full max-w-4xl bg-white rounded-xl shadow-lg p-8 mb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <h3 className="text-2xl font-semibold text-gray-800">Soutenez notre cause</h3>
            <p className="text-gray-600">
              Chaque don nous aide à continuer notre travail important. Choisissez le montant qui vous convient et faites la différence dès aujourd'hui.
            </p>
            <div className="grid grid-cols-3 gap-3 pt-2">
              <button className="bg-blue-100 hover:bg-blue-200 text-blue-800 font-medium py-3 rounded-lg transition-colors">
                10 €
              </button>
              <button className="bg-blue-100 hover:bg-blue-200 text-blue-800 font-medium py-3 rounded-lg transition-colors">
                25 €
              </button>
              <button className="bg-blue-100 hover:bg-blue-200 text-blue-800 font-medium py-3 rounded-lg transition-colors">
                50 €
              </button>
              <button className="bg-blue-100 hover:bg-blue-200 text-blue-800 font-medium py-3 rounded-lg transition-colors">
                100 €
              </button>
              <button className="bg-blue-100 hover:bg-blue-200 text-blue-800 font-medium py-3 rounded-lg transition-colors">
                250 €
              </button>
              <button className="bg-blue-100 hover:bg-blue-200 text-blue-800 font-medium py-3 rounded-lg transition-colors">
                Autre
              </button>
            </div>
            <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-colors mt-4">
              Faire un don maintenant
            </button>
          </div>
          <div className="rounded-lg overflow-hidden h-64 relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-blue-600 flex items-center justify-center">
              <div className="text-white text-center p-6">
                <div className="text-4xl font-bold mb-2">230+</div>
                <div className="text-lg">Projets financés cette année</div>
                <div className="mt-4 text-4xl font-bold">15K+</div>
                <div className="text-lg">Donateurs comme vous</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Impact Section */}
      <div className="w-full max-w-4xl mb-12">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Votre impact</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <div className="text-blue-600 text-2xl font-bold mb-2">Éducation</div>
            <p className="text-gray-600">
              Vos dons ont permis de financer 50 bourses d'études pour des étudiants défavorisés.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <div className="text-blue-600 text-2xl font-bold mb-2">Environnement</div>
            <p className="text-gray-600">
              Nous avons planté 10 000 arbres et nettoyé 15 km de côtes grâce à votre générosité.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <div className="text-blue-600 text-2xl font-bold mb-2">Santé</div>
            <p className="text-gray-600">
              Plus de 2 000 personnes ont reçu des soins médicaux essentiels dans des régions reculées.
            </p>
          </div>
        </div>
      </div>

      {/* Testimonials */}
      <div className="w-full max-w-4xl mb-12">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Ce que disent nos donateurs</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <p className="text-gray-600 italic mb-4">
              "Donner régulièrement à cette organisation m'a permis de voir l'impact concret de ma contribution. C'est incroyablement gratifiant."
            </p>
            <div className="font-semibold">Marie L.</div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <p className="text-gray-600 italic mb-4">
              "La transparence de cette organisation est ce qui me pousse à continuer à donner. Je sais exactement où va mon argent."
            </p>
            <div className="font-semibold">Pierre M.</div>
          </div>
        </div>
      </div>

      {/* Newsletter Signup */}
      <div className="w-full max-w-4xl bg-blue-50 rounded-xl p-8 mb-12">
        <div className="text-center">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">Restez informé de nos actions</h3>
          <p className="text-gray-600 mb-6">
            Inscrivez-vous à notre newsletter pour recevoir des mises à jour sur nos projets et l'impact de vos dons.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Votre adresse email"
              className="flex-grow px-4 py-3 rounded-lg border focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            />
            <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-colors">
              S'inscrire
            </button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="w-full max-w-4xl text-center text-gray-600 py-8 border-t">
        <div className="mb-4">
          <Link href="#" className="mx-2 hover:text-blue-600 transition-colors">
            À propos
          </Link>
          <Link href="#" className="mx-2 hover:text-blue-600 transition-colors">
            Contact
          </Link>
          <Link href="#" className="mx-2 hover:text-blue-600 transition-colors">
            Confidentialité
          </Link>
          <Link href="#" className="mx-2 hover:text-blue-600 transition-colors">
            Conditions
          </Link>
        </div>
        <div>© {new Date().getFullYear()} Plateforme de dons. Tous droits réservés.</div>
      </footer>
    </main>
  );
}
