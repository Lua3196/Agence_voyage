import React from 'react';

// Définition de l'interface pour une voyage
export interface Voyage {
  id_voyage: number;
  nom_voyage: string;
  prix: number;
  localisation: string;
  image?: string;
  date_relative?: string;
  timestamp: number;
}

interface VoyageCardProps {
  voyage: Voyage;
}

export default function VoyageCard({ voyage }: VoyageCardProps) {
  // Gestion de la source de l'image (comme le helper asset() de Laravel)
  const imageSrc: string = voyage.image
    ? voyage.image.startsWith('http')
      ? voyage.image
      : `/storage/${voyage.image}`
    : 'https://placehold.co/600x400';

  return (
    <article className="group bg-surface-light rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-border-color flex flex-col h-full">
      <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
        <img
          src={imageSrc}
          alt={voyage.nom_voyage}
          className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
        />

        <button className="absolute top-3 right-3 p-2 rounded-full bg-white/80 text-gray-500 hover:text-red-500 hover:bg-white transition-all opacity-0 group-hover:opacity-100 backdrop-blur-sm">
          <span className="material-symbols-outlined text-[20px] block">favorite</span>
        </button>
      </div>

      <div className="p-4 flex flex-col flex-1">
        <div className="flex justify-between items-start gap-2 mb-2">
          <h3 className="font-semibold text-text-main line-clamp-2 leading-tight group-hover:text-primary transition-colors">
            <a href={`/voyages/${voyage.id_voyage}`}>{voyage.nom_voyage}</a>
          </h3>
        </div>
        <p className="text-primary font-bold text-lg mb-2">{voyage.prix} €</p>
        <div className="mt-auto flex items-center gap-1 text-text-secondary text-xs">
          <span className="material-symbols-outlined text-[14px]">location_on</span>
          <span className="truncate">{voyage.localisation}</span>
          <span className="mx-1">•</span>
          <span>{voyage.date_relative || "Il y a 2 jours"}</span>
        </div>
      </div>
    </article>
  );
}