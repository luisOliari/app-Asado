import React, { useState } from 'react';
import { Sparkles, ArrowRight, Loader2, Flame } from 'lucide-react';
import { generateGroupMotto } from '../services/geminiService';
import { GroupProfile, AppScreen } from '../types';

interface OnboardingProps {
  onComplete: (profile: GroupProfile) => void;
}

export const Onboarding: React.FC<OnboardingProps> = ({ onComplete }) => {
  const [step, setStep] = useState(1);
  const [name, setName] = useState('');
  const [members, setMembers] = useState(3);
  const [vibeDesc, setVibeDesc] = useState('');
  const [motto, setMotto] = useState('');
  const [loadingAI, setLoadingAI] = useState(false);

  const handleGenerateMotto = async () => {
    if (!name) return;
    setLoadingAI(true);
    const result = await generateGroupMotto(name, vibeDesc);
    setMotto(result);
    setLoadingAI(false);
  };

  const handleFinish = () => {
    const newProfile: GroupProfile = {
      id: 'user-group',
      name,
      membersCount: members,
      motto: motto || "Listos para el fuego",
      imageUrl: `https://picsum.photos/400/600?random=${Math.floor(Math.random() * 1000)}`,
      availability: 'Sabado Noche',
      location: 'Playa de la Viuda',
      vibe: {
        party: Math.random() * 100,
        foodie: Math.random() * 100,
        chill: Math.random() * 100
      }
    };
    onComplete(newProfile);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-100 via-rose-100 to-amber-50 animate-gradient flex flex-col justify-center px-6 relative overflow-hidden">
      
      <div className="max-w-md mx-auto w-full relative z-10">
        <div className="mb-8 text-center">
          <div className="bg-white/60 w-24 h-24 rounded-[2rem] flex items-center justify-center mx-auto mb-6 backdrop-blur-md shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white/80">
            <Flame size={48} className="text-rose-400 fill-rose-100" />
          </div>
          <h1 className="text-4xl font-bold mb-2 tracking-tight text-stone-700 drop-shadow-sm">Asado Match</h1>
          <p className="text-stone-500 font-medium text-lg">Conectá, comé y disfrutá.</p>
        </div>

        <div className="bg-white/80 backdrop-blur-xl rounded-[2.5rem] p-8 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.05)] border border-white/60 transition-all duration-500">
          {step === 1 && (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <h2 className="text-2xl font-bold text-stone-700">Creá tu Grupo</h2>
              
              <div className="space-y-2">
                <label className="text-sm font-semibold text-stone-500 ml-1">Nombre del Grupo</label>
                <input 
                  type="text" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Ej: Los del Fondo"
                  className="w-full bg-white border border-stone-200 rounded-2xl p-4 text-stone-700 placeholder-stone-400 focus:ring-4 focus:ring-rose-100 focus:border-rose-200 outline-none transition-all shadow-sm"
                />
              </div>

              <div className="space-y-3">
                <div className="flex justify-between items-center ml-1">
                  <label className="text-sm font-semibold text-stone-500">Integrantes</label>
                  <span className="text-sm font-bold text-rose-500 bg-rose-50 px-3 py-1 rounded-xl">{members}</span>
                </div>
                <input 
                  type="range" 
                  min="2" max="10"
                  value={members}
                  onChange={(e) => setMembers(parseInt(e.target.value))}
                  className="w-full accent-rose-400 h-2 bg-stone-200 rounded-lg appearance-none cursor-pointer"
                />
                <div className="flex justify-between text-xs text-stone-400 px-1">
                  <span>2</span>
                  <span>10</span>
                </div>
              </div>

              <button 
                onClick={() => setStep(2)}
                disabled={!name}
                className="w-full bg-gradient-to-r from-rose-300 to-amber-200 text-stone-700 font-bold py-4 rounded-full shadow-lg shadow-rose-200/50 hover:-translate-y-1 hover:shadow-xl hover:shadow-rose-200/60 active:translate-y-0 transition-all duration-300 disabled:opacity-50 disabled:shadow-none mt-6 flex items-center justify-center gap-2"
              >
                Siguiente <ArrowRight size={20} className="text-stone-600" />
              </button>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
              <h2 className="text-2xl font-bold text-stone-700">Definí la Onda</h2>
              
              <div className="space-y-2">
                <label className="text-sm font-semibold text-stone-500 ml-1">¿Cómo son ustedes?</label>
                <textarea 
                  value={vibeDesc}
                  onChange={(e) => setVibeDesc(e.target.value)}
                  placeholder="Ej: Nos gusta el cachengue... (Opcional, la IA improvisa)"
                  className="w-full bg-white border border-stone-200 rounded-2xl p-4 text-stone-700 placeholder-stone-400 focus:ring-4 focus:ring-rose-100 focus:border-rose-200 outline-none h-28 resize-none shadow-sm"
                />
              </div>
              
              <div className="bg-gradient-to-br from-rose-50 to-amber-50 p-5 rounded-3xl border border-rose-100 relative overflow-hidden group">
                <div className="flex justify-between items-center mb-3 relative z-10">
                  <label className="text-sm font-bold text-stone-600">Lema del Grupo</label>
                  <button 
                    onClick={handleGenerateMotto}
                    disabled={loadingAI}
                    className="text-xs flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-full shadow-sm text-rose-500 font-semibold hover:text-rose-600 hover:shadow-md transition-all border border-rose-100 hover:-translate-y-0.5"
                  >
                    {loadingAI ? <Loader2 className="animate-spin" size={14}/> : <Sparkles size={14} />}
                    {motto ? 'Regenerar' : 'Crear con IA'}
                  </button>
                </div>
                <div className="relative z-10">
                  <input 
                    type="text"
                    value={motto}
                    onChange={(e) => setMotto(e.target.value)}
                    placeholder={loadingAI ? "Pensando una genialidad..." : "Tu lema aparecerá aquí..."}
                    className="w-full bg-transparent border-b border-rose-200 p-2 text-lg font-medium text-stone-700 placeholder-rose-300/50 outline-none focus:border-rose-400 transition-colors italic"
                  />
                </div>
              </div>

              <button 
                onClick={handleFinish}
                disabled={!motto && !vibeDesc}
                className="w-full bg-gradient-to-r from-rose-300 to-amber-200 text-stone-700 font-bold py-4 rounded-full shadow-lg shadow-rose-200/50 hover:-translate-y-1 hover:shadow-xl hover:shadow-rose-200/60 active:translate-y-0 transition-all duration-300 disabled:opacity-50 disabled:shadow-none mt-6"
              >
                ¡Encender el Fuego!
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};