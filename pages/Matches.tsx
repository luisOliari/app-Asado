import React from 'react';
import { Match, AppScreen } from '../types';
import { MessageCircle, Flame } from 'lucide-react';

interface MatchesProps {
  matches: Match[];
  onSelectMatch: (matchId: string) => void;
}

export const Matches: React.FC<MatchesProps> = ({ matches, onSelectMatch }) => {
  return (
    <div className="min-h-screen bg-stone-50 pt-4 px-4 pb-24 max-w-md mx-auto">
      <div className="flex items-center justify-between mb-6 px-2">
        <h2 className="text-2xl font-bold text-stone-800">Tus Matches</h2>
        <span className="bg-orange-100 text-orange-600 px-2.5 py-1 rounded-lg text-xs font-bold">
          {matches.length} nuevos
        </span>
      </div>
      
      {matches.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-[60vh] text-stone-400 text-center px-8">
          <div className="bg-stone-100 p-6 rounded-3xl mb-4 border border-stone-200">
             <Flame size={40} className="text-stone-300" />
          </div>
          <h3 className="text-stone-700 font-bold text-lg mb-2">Aún no hay fuego</h3>
          <p className="text-sm">Seguí deslizando para encontrar grupos compatibles para tu asado.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {matches.map((match) => (
            <div 
              key={match.id}
              onClick={() => onSelectMatch(match.id)}
              className="group bg-white p-3 rounded-2xl shadow-sm hover:shadow-md border border-stone-100 flex items-center gap-4 transition-all duration-300 active:scale-[0.98] cursor-pointer"
            >
              <div className="relative">
                <img 
                  src={match.group.imageUrl} 
                  alt={match.group.name} 
                  className="w-16 h-16 rounded-xl object-cover ring-2 ring-stone-100 group-hover:ring-orange-200 transition-all"
                />
                <div className="absolute -bottom-1 -right-1 bg-green-500 w-4 h-4 rounded-full border-2 border-white"></div>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-start">
                  <h3 className="font-bold text-stone-800 truncate pr-2 group-hover:text-orange-600 transition-colors">{match.group.name}</h3>
                  <span className="text-[10px] text-stone-400 font-medium">Ahora</span>
                </div>
                <p className="text-sm text-stone-500 truncate mt-0.5 font-medium">{match.lastMessage || "¡Nuevo match! Saludá 👋"}</p>
              </div>
              {/* Chevron/Indicator */}
              <div className="pr-2 text-stone-300 group-hover:text-orange-400 transition-colors">
                 <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};