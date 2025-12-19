import React, { useState } from 'react';
import { Heart, MapPin, Users, Flame } from 'lucide-react';
import { GroupProfile } from '../types';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer } from 'recharts';

interface SwipeDeckProps {
  onMatch: (group: GroupProfile) => void;
}

// Custom Component: Burnt Logs (The Cross)
const BurntLogsCross = () => (
  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="transform rotate-0">
    {/* Log 1 (Diagonal down) */}
    <path d="M5 5C5 5 8 4 10 6L18 18C19 19 19 20 18 20C17 20 16 19 15 18L7 8C5 6 4 6 5 5Z" fill="#57534e" /> 
    <path d="M6 6L17 19" stroke="#44403c" strokeWidth="1.5" strokeLinecap="round" />
    
    {/* Log 2 (Diagonal up) */}
    <path d="M19 5C19 5 16 4 14 6L6 18C5 19 5 20 6 20C7 20 8 19 9 18L17 8C19 6 20 6 19 5Z" fill="#57534e" />
    <path d="M18 6L7 19" stroke="#44403c" strokeWidth="1.5" strokeLinecap="round" />
    
    {/* Texture details (cracks) */}
    <path d="M9 8L10 9" stroke="#a8a29e" strokeWidth="1" strokeLinecap="round" />
    <path d="M15 14L14 15" stroke="#a8a29e" strokeWidth="1" strokeLinecap="round" />
  </svg>
);

// Custom Component: Wood Log (For the heart)
const WoodLogSVG = ({ className }: { className?: string }) => (
  <svg width="32" height="8" viewBox="0 0 32 8" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <rect x="0" y="0" width="32" height="8" rx="2" fill="#92400e" />
    <path d="M4 2H10" stroke="#b45309" strokeWidth="1" strokeLinecap="round" />
    <path d="M14 5H28" stroke="#b45309" strokeWidth="1" strokeLinecap="round" />
    <path d="M2 5H6" stroke="#b45309" strokeWidth="1" strokeLinecap="round" />
  </svg>
);

// Mock Data
const MOCK_GROUPS: GroupProfile[] = [
  {
    id: '1',
    name: 'Las Reinas de la Noche',
    motto: "Si hay música, bailamos.",
    membersCount: 4,
    imageUrl: 'https://picsum.photos/400/600?random=1',
    availability: 'Viernes Noche',
    location: 'Rivero',
    vibe: { party: 90, foodie: 40, chill: 20 }
  },
  {
    id: '2',
    name: 'Los Parrilleros del Sur',
    motto: "El punto justo o nada.",
    membersCount: 3,
    imageUrl: 'https://picsum.photos/400/600?random=2',
    availability: 'Sábado Mediodía',
    location: 'La Viuda',
    vibe: { party: 30, foodie: 95, chill: 60 }
  },
  {
    id: '3',
    name: 'Tranqui 120',
    motto: "Guitarreada y vino frente al mar.",
    membersCount: 5,
    imageUrl: 'https://picsum.photos/400/600?random=3',
    availability: 'Domingo Atardecer',
    location: 'El Navío',
    vibe: { party: 50, foodie: 60, chill: 90 }
  },
];

export const SwipeDeck: React.FC<SwipeDeckProps> = ({ onMatch }) => {
  const [profiles, setProfiles] = useState<GroupProfile[]>(MOCK_GROUPS);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [lastDirection, setLastDirection] = useState<string | null>(null);

  const currentProfile = profiles[currentIndex];

  const handleSwipe = (direction: 'left' | 'right') => {
    setLastDirection(direction);
    
    if (direction === 'right') {
      setTimeout(() => {
         onMatch(currentProfile);
      }, 300);
    }

    setTimeout(() => {
      if (currentIndex < profiles.length - 1) {
        setCurrentIndex(prev => prev + 1);
        setLastDirection(null);
      } else {
        setCurrentIndex(0);
        setLastDirection(null);
      }
    }, 300);
  };

  const chartData = currentProfile ? [
    { subject: 'Fiesta', A: currentProfile.vibe.party, fullMark: 100 },
    { subject: 'Comida', A: currentProfile.vibe.foodie, fullMark: 100 },
    { subject: 'Relax', A: currentProfile.vibe.chill, fullMark: 100 },
  ] : [];

  if (!currentProfile) return <div className="flex h-full items-center justify-center text-stone-400 font-medium bg-stone-50">No más grupos cerca.</div>;

  return (
    <div className="h-full flex flex-col pt-4 pb-24 px-4 max-w-md mx-auto relative">
      <div className="flex justify-between items-center mb-4 px-2">
        <h2 className="text-2xl font-bold text-stone-700 tracking-tight">Descubrir</h2>
        <div className="flex items-center text-stone-500 gap-1.5 bg-white px-3 py-1.5 rounded-full text-xs font-bold border border-stone-200 shadow-sm">
          <MapPin size={14} className="text-rose-400" /> Punta del Diablo
        </div>
      </div>

      <div className={`flex-1 relative bg-white rounded-[2.5rem] shadow-[0_20px_50px_-12px_rgba(0,0,0,0.1)] overflow-hidden transition-all duration-300 transform border border-stone-100/50 ${lastDirection === 'left' ? '-translate-x-full rotate-[-15deg] opacity-0' : lastDirection === 'right' ? 'translate-x-full rotate-[15deg] opacity-0' : ''}`}>
        {/* Image Section */}
        <div className="h-[65%] relative group">
          <img 
            src={currentProfile.imageUrl} 
            alt={currentProfile.name} 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-stone-900/80 via-transparent to-transparent p-6 flex flex-col justify-end text-white">
            <h3 className="text-3xl font-bold leading-tight mb-1 shadow-black drop-shadow-md">{currentProfile.name}</h3>
            <p className="text-base text-stone-200 italic font-medium mb-3 opacity-90">"{currentProfile.motto}"</p>
            
            <div className="flex flex-wrap gap-2 text-xs font-bold tracking-wide">
              <span className="flex items-center gap-1.5 bg-white/20 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10 text-white shadow-sm">
                <Users size={14} className="text-teal-200"/> 
                {currentProfile.membersCount} integrantes
              </span>
              <span className="flex items-center gap-1.5 bg-white/20 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10 text-white shadow-sm">
                {currentProfile.availability}
              </span>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="h-[35%] p-2 flex flex-col justify-center items-center bg-white relative">
          <div className="absolute top-0 w-12 h-1 bg-stone-100 rounded-full mt-3"></div>
          <div className="w-full h-full max-w-[280px]">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="65%" data={chartData}>
                <PolarGrid stroke="#f5f5f4" />
                <PolarAngleAxis dataKey="subject" tick={{ fill: '#a8a29e', fontSize: 11, fontWeight: 600 }} />
                <Radar
                  name="Vibe"
                  dataKey="A"
                  stroke="#fb7185" // rose-400
                  strokeWidth={2.5}
                  fill="#fda4af" // rose-300
                  fillOpacity={0.4}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="absolute bottom-[6.5rem] left-0 right-0 flex justify-center items-center gap-8 z-20 pointer-events-none">
        
        {/* REJECT BUTTON (Burnt Logs) */}
        <button 
          onClick={() => handleSwipe('left')}
          className="pointer-events-auto bg-white p-5 rounded-full shadow-xl shadow-stone-200/50 hover:bg-stone-50 transition-all duration-300 transform hover:scale-110 hover:-translate-y-1 border border-stone-100 flex items-center justify-center group"
          aria-label="Reject"
        >
          <div className="opacity-80 group-hover:opacity-100 transition-opacity">
            <BurntLogsCross />
          </div>
        </button>

        {/* MATCH BUTTON (Burning Logs Heart) */}
        <button 
          onClick={() => handleSwipe('right')}
          className="pointer-events-auto bg-gradient-to-r from-rose-400 to-amber-300 p-3 rounded-full shadow-2xl shadow-rose-300/40 hover:shadow-rose-400/60 transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 flex flex-col items-center justify-center w-24 h-24 relative overflow-hidden ring-4 ring-white/30"
          aria-label="Match"
        >
          {/* Top Log & Fire */}
          <div className="flex flex-col items-center translate-y-2 relative z-10">
            <Flame size={16} className="text-amber-100 fill-amber-100 animate-pulse drop-shadow-sm absolute -top-3" />
            <WoodLogSVG />
          </div>

          {/* Heart */}
          <Heart size={32} fill="white" className="text-white relative z-20 my-0.5 drop-shadow-md" strokeWidth={2.5} />

          {/* Bottom Log & Fire */}
          <div className="flex flex-col items-center -translate-y-2 relative z-10">
            <WoodLogSVG />
            <Flame size={16} className="text-amber-100 fill-amber-100 animate-pulse drop-shadow-sm absolute -bottom-2.5 rotate-180 scale-x-[-1]" />
          </div>
          
          {/* Internal Glow */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-rose-400/20 to-transparent pointer-events-none mix-blend-overlay"></div>
        </button>
      </div>
    </div>
  );
};