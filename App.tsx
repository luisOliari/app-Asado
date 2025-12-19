import React, { useState } from 'react';
import { HashRouter } from 'react-router-dom';
import { Onboarding } from './pages/Onboarding';
import { SwipeDeck } from './pages/SwipeDeck';
import { Matches } from './pages/Matches';
import { Chat } from './pages/Chat';
import { Kit } from './pages/Kit';
import { Navigation } from './components/Navigation';
import { AppScreen, GroupProfile, Match } from './types';
import { User } from 'lucide-react';

const App = () => {
  const [currentScreen, setCurrentScreen] = useState<AppScreen>(AppScreen.ONBOARDING);
  const [myProfile, setMyProfile] = useState<GroupProfile | null>(null);
  const [matches, setMatches] = useState<Match[]>([]);
  const [activeMatchId, setActiveMatchId] = useState<string | null>(null);

  const handleOnboardingComplete = (profile: GroupProfile) => {
    setMyProfile(profile);
    setCurrentScreen(AppScreen.SWIPE);
  };

  const handleMatch = (group: GroupProfile) => {
    const newMatch: Match = {
      id: Math.random().toString(36).substr(2, 9),
      group: group,
    };
    // In a real app, this waits for backend. Here we add instantly for demo.
    setMatches(prev => [newMatch, ...prev]);
  };

  const handleSelectMatch = (matchId: string) => {
    setActiveMatchId(matchId);
    setCurrentScreen(AppScreen.CHAT);
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case AppScreen.ONBOARDING:
        return <Onboarding onComplete={handleOnboardingComplete} />;
      case AppScreen.SWIPE:
        return <SwipeDeck onMatch={handleMatch} />;
      case AppScreen.MATCHES:
        return <Matches matches={matches} onSelectMatch={handleSelectMatch} />;
      case AppScreen.CHAT:
        const match = matches.find(m => m.id === activeMatchId);
        if (!match || !myProfile) return <Matches matches={matches} onSelectMatch={handleSelectMatch} />;
        return <Chat match={match} myGroupName={myProfile.name} onBack={() => setCurrentScreen(AppScreen.MATCHES)} />;
      case AppScreen.KIT:
        return <Kit />;
      case AppScreen.PROFILE:
        return (
          <div className="flex flex-col items-center justify-center h-screen bg-[#FDFBF7]">
            <div className="bg-white p-10 rounded-[3rem] shadow-xl shadow-stone-200/50 flex flex-col items-center border border-stone-100 max-w-sm w-full mx-4">
              <h1 className="text-xl font-bold mb-6 text-stone-700">Mi Perfil</h1>
              <div className="bg-violet-50 p-8 rounded-full mb-6 relative">
                <User size={64} className="text-violet-300" />
                <div className="absolute bottom-0 right-0 w-6 h-6 bg-emerald-400 border-4 border-white rounded-full"></div>
              </div>
              <h2 className="text-2xl font-bold text-stone-800 mb-2">{myProfile?.name || "Sin Nombre"}</h2>
              <p className="text-stone-500 text-center text-sm italic mb-8 px-4">"{myProfile?.motto || '...'}"</p>
              
              <button 
                className="w-full py-3 text-stone-600 font-bold text-sm bg-gradient-to-r from-rose-200 to-amber-100 rounded-full hover:shadow-lg hover:shadow-rose-100 transition-all hover:-translate-y-0.5"
                onClick={() => setCurrentScreen(AppScreen.ONBOARDING)}
              >
                Cerrar Sesión
              </button>
            </div>
            <div className="pb-24"></div>
          </div>
        );
      default:
        return <SwipeDeck onMatch={handleMatch} />;
    }
  };

  return (
    <HashRouter>
      <div className="antialiased text-stone-800 bg-[#FDFBF7] min-h-screen">
        {renderScreen()}
        <Navigation currentScreen={currentScreen} setScreen={setCurrentScreen} />
      </div>
    </HashRouter>
  );
};

export default App;