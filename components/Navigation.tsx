import React from 'react';
import { Flame, MessageCircle, ClipboardList, User } from 'lucide-react';
import { AppScreen } from '../types';

interface NavigationProps {
  currentScreen: AppScreen;
  setScreen: (screen: AppScreen) => void;
}

export const Navigation: React.FC<NavigationProps> = ({ currentScreen, setScreen }) => {
  const navItems = [
    { id: AppScreen.SWIPE, icon: Flame, label: 'Asado', color: 'text-orange-500', bg: 'bg-orange-50' },
    { id: AppScreen.MATCHES, icon: MessageCircle, label: 'Chats', color: 'text-rose-500', bg: 'bg-rose-50' },
    { id: AppScreen.KIT, icon: ClipboardList, label: 'Kit', color: 'text-emerald-500', bg: 'bg-emerald-50' },
    { id: AppScreen.PROFILE, icon: User, label: 'Perfil', color: 'text-violet-500', bg: 'bg-violet-50' },
  ];

  if (currentScreen === AppScreen.ONBOARDING) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-xl border-t border-stone-100 pb-safe pt-3 px-6 shadow-[0_-10px_40px_-15px_rgba(0,0,0,0.05)] z-50">
      <div className="flex justify-between items-center max-w-md mx-auto pb-2">
        {navItems.map((item) => {
          const isActive = currentScreen === item.id || (item.id === AppScreen.MATCHES && currentScreen === AppScreen.CHAT);
          return (
            <button
              key={item.id}
              onClick={() => setScreen(item.id)}
              className="group flex flex-col items-center justify-center w-16 relative"
            >
              <div className={`p-2.5 rounded-2xl transition-all duration-300 ${
                isActive 
                  ? `${item.bg} ${item.color} translate-y-[-2px]` 
                  : 'text-stone-400 hover:text-stone-500 hover:bg-stone-50'
              }`}>
                <item.icon 
                  size={24} 
                  strokeWidth={isActive ? 2.5 : 2} 
                  className={`transition-transform duration-300 ${isActive ? 'scale-105' : ''}`}
                />
              </div>
              <span className={`text-[10px] font-semibold mt-1.5 transition-colors ${
                isActive ? item.color : 'text-stone-300'
              }`}>
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};