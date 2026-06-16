import React from 'react';

// Interfaces TypeScript pour la structure du voyage
interface ItineraireStep {
  jour: string;
  ville: string;
  activite: string;
}

interface Voyage {
  titre: string;
  destination: string;
  duree: string;
  prix: number;
  imagePrincipale: string;
  description: string;
  inclus: string[];
  itineraire: ItineraireStep[];
}

export default function VoyageDetail() {
  const voyage: Voyage = {
    titre: "Exploration Traditionnelle & Moderne du Japon",
    destination: "Tokyo, Kyoto & Osaka",
    duree: "12 Jours / 11 Nuits",
    prix: 2490,
    imagePrincipale: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=1200",
    description: "Plongez dans un contraste saisissant où les néons futuristes de Tokyo côtoient la sérénité des temples séculaires de Kyoto. Ce circuit sur mesure vous fera découvrir l'essence même de la culture nippone, sa gastronomie raffinée et ses paysages à couper le souffle au pied du Mont Fuji.",
    inclus: [
      "Vols internationaux A/R",
      "Hébergement en hôtels 3* et Ryokan traditionnel",
      "Japan Rail Pass (Transports illimités)",
      "4 Visites guidées avec un guide francophone",
      "Assistance 24h/24 sur place"
    ],
    itineraire: [
      { jour: "Jours 1 - 4", ville: "Tokyo", activite: "Découverte de Shibuya, Akihabara et les jardins du Palais Impérial." },
      { jour: "Jour 5", ville: "Mont Fuji", activite: "Nuit en Ryokan avec bain thermal (Onsen) traditionnel face au mont." },
      { jour: "Jours 6 - 9", ville: "Kyoto", activite: "Visite du Pavillon d'Or, de la bambouseraie d'Arashiyama et des sanctuaires Torii." },
      { jour: "Jours 10 - 12", ville: "Osaka", activite: "Exploration culinaire à Dotonbori et retour vers votre pays d'origine." }
    ]
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <a href="/" className="inline-flex items-center gap-2 text-sm text-text-secondary hover:text-primary mb-6 transition-colors">
        <span className="material-symbols-outlined text-[18px]">arrow_back</span>
        Retour aux offres
      </a>

      <div className="relative h-[300px] sm:h-[450px] rounded-2xl overflow-hidden shadow-md mb-8">
        <img 
          src={voyage.imagePrincipale} 
          alt={voyage.titre} 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent flex items-end p-6 sm:p-8">
          <div>
            <span className="bg-primary text-white text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wider">
              Circuit Accompagné
            </span>
            <h1 className="text-2xl sm:text-4xl font-bold text-white mt-2 tracking-tight">{voyage.titre}</h1>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <div>
            <h2 className="text-xl font-bold text-text-main mb-3">À propos de ce voyage</h2>
            <p className="text-text-secondary leading-relaxed text-sm sm:text-base">{voyage.description}</p>
          </div>

          <hr className="border-border-color" />

          <div>
            <h2 className="text-xl font-bold text-text-main mb-4">L'itinéraire pas à pas</h2>
            <div className="space-y-4 relative before:absolute before:inset-0 before:right-auto before:left-3.5 before:w-0.5 before:bg-gray-200">
              {voyage.itineraire.map((step, index) => (
                <div key={index} className="flex gap-4 relative">
                  <div className="w-7 h-7 rounded-full bg-primary/10 border-2 border-primary flex items-center justify-center text-primary text-xs font-bold z-10 bg-white">
                    {index + 1}
                  </div>
                  <div className="bg-surface-light p-4 rounded-xl border border-border-color flex-1">
                    <span className="text-xs font-bold text-primary uppercase">{step.jour}</span>
                    <h3 className="font-semibold text-text-main text-base">{step.ville}</h3>
                    <p className="text-text-secondary text-sm mt-1">{step.activite}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="lg:col-span-1">
          <div className="sticky top-6 bg-surface-light border border-border-color rounded-2xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <span className="text-text-secondary text-sm">Prix par personne</span>
              <p className="text-2xl font-black text-primary">{voyage.prix} €</p>
            </div>

            <div className="space-y-3 mb-6">
              <div className="flex items-center gap-2 text-text-main text-sm">
                <span className="material-symbols-outlined text-[18px] text-gray-400">schedule</span>
                <strong>Durée :</strong> {voyage.duree}
              </div>
              <div className="flex items-center gap-2 text-text-main text-sm">
                <span className="material-symbols-outlined text-[18px] text-gray-400">distance</span>
                <strong>Destination :</strong> {voyage.destination}
              </div>
            </div>

            <hr className="border-border-color my-4" />

            <div className="mb-6">
              <h4 className="font-semibold text-text-main text-xs uppercase tracking-wider mb-3">Prestations incluses</h4>
              <ul className="space-y-2">
                {voyage.inclus.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-xs text-text-secondary">
                    <span className="material-symbols-outlined text-[14px] text-green-500 mt-0.5">check_circle</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <button className="w-full bg-primary hover:bg-primary-dark text-white font-medium py-3 px-4 rounded-xl transition-colors shadow-sm text-center">
              Vérifier les disponibilités
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}