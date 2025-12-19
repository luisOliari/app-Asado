import React, { useState } from 'react';
import { CheckCircle2, Circle, Bot, Send, Flame } from 'lucide-react';
import { AsadoItem } from '../types';
import { getAsadoTips } from '../services/geminiService';

const DEFAULT_ITEMS: AsadoItem[] = [
  { id: '1', name: 'Carbón / Leña', category: 'Fuego', checked: false },
  { id: '2', name: 'Fósforos y Diario', category: 'Fuego', checked: false },
  { id: '3', name: 'Tira de Asado', category: 'Carne', checked: false },
  { id: '4', name: 'Chorizos y Morcilla', category: 'Carne', checked: false },
  { id: '5', name: 'Pan flauta', category: 'Varios', checked: false },
  { id: '6', name: 'Sal Parrillera', category: 'Varios', checked: false },
  { id: '7', name: 'Fernet Branca', category: 'Bebida', checked: false },
  { id: '8', name: 'Coca-Cola', category: 'Bebida', checked: false },
  { id: '9', name: 'Hielo (2 bolsas)', category: 'Bebida', checked: false },
];

const getCategoryStyles = (category: string): { bg: string; text: string; border: string } => {
    switch (category) {
        case 'Fuego': return { bg: 'bg-orange-50', text: 'text-orange-600', border: 'border-orange-100' };
        case 'Carne': return { bg: 'bg-rose-50', text: 'text-rose-600', border: 'border-rose-100' };
        case 'Bebida': return { bg: 'bg-sky-50', text: 'text-sky-600', border: 'border-sky-100' };
        default: return { bg: 'bg-stone-100', text: 'text-stone-600', border: 'border-stone-200' };
    }
}

export const Kit: React.FC = () => {
  const [items, setItems] = useState<AsadoItem[]>(DEFAULT_ITEMS);
  const [guruOpen, setGuruOpen] = useState(false);
  const [guruQuery, setGuruQuery] = useState('');
  const [guruResponse, setGuruResponse] = useState('');
  const [loadingGuru, setLoadingGuru] = useState(false);

  const toggleItem = (id: string) => {
    setItems(items.map(item => 
      item.id === id ? { ...item, checked: !item.checked } : item
    ));
  };

  const askGuru = async () => {
    if (!guruQuery) return;
    setLoadingGuru(true);
    const response = await getAsadoTips(guruQuery);
    setGuruResponse(response);
    setLoadingGuru(false);
  };

  const categories: string[] = Array.from(new Set(items.map(i => i.category)));
  const totalItems = items.length;
  const checkedItems = items.filter(i => i.checked).length;
  const progress = Math.round((checkedItems / totalItems) * 100);

  return (
    <div className="min-h-screen bg-[#FDFBF7] pt-6 px-4 pb-24 max-w-md mx-auto">
      <div className="flex justify-between items-end mb-6">
        <div>
          <h2 className="text-3xl font-bold text-stone-700">Kit Asador</h2>
          <div className="flex items-center gap-3 mt-1.5">
            <div className="w-32 h-2.5 bg-stone-200 rounded-full overflow-hidden">
              <div className="h-full bg-emerald-400 transition-all duration-500 rounded-full" style={{ width: `${progress}%` }}></div>
            </div>
            <span className="text-xs font-bold text-stone-400">{progress}% Listo</span>
          </div>
        </div>
        <button 
          onClick={() => setGuruOpen(!guruOpen)}
          className={`px-4 py-2 rounded-full flex items-center gap-2 text-xs font-bold shadow-md transition-all hover:-translate-y-0.5 ${
            guruOpen 
              ? 'bg-gradient-to-r from-rose-300 to-amber-200 text-stone-700 shadow-rose-200/50' 
              : 'bg-white text-stone-600 border border-stone-200 hover:border-rose-200'
          }`}
        >
          <Bot size={18} /> {guruOpen ? 'Cerrar' : 'Gaucho IA'}
        </button>
      </div>

      {guruOpen && (
        <div className="bg-white p-5 rounded-[2rem] shadow-xl shadow-stone-200/50 border border-stone-100 mb-8 animate-in slide-in-from-top-4 fade-in">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-orange-100 p-2.5 rounded-2xl text-orange-500">
               <Flame size={20} />
            </div>
            <div className="flex-1">
               <h3 className="font-bold text-stone-700 text-sm">El Gaucho IA</h3>
               <p className="text-xs text-stone-400">¿Dudas con el fuego?</p>
            </div>
          </div>
          
          {guruResponse ? (
            <div className="bg-stone-50 p-4 rounded-2xl text-sm text-stone-600 italic border border-stone-100 mb-4 relative">
              "{guruResponse}"
              <button onClick={() => setGuruResponse('')} className="block mt-2 text-xs text-rose-500 font-bold hover:underline">Otra consulta</button>
            </div>
          ) : (
             <div className="flex gap-2 mb-1">
                <input 
                 value={guruQuery}
                 onChange={(e) => setGuruQuery(e.target.value)}
                 onKeyDown={(e) => e.key === 'Enter' && askGuru()}
                 placeholder="Ej: ¿Cómo prendo el fuego rápido?"
                 className="flex-1 bg-stone-50 text-stone-700 text-sm px-4 py-3 rounded-2xl outline-none focus:ring-2 focus:ring-stone-200 transition-all border border-transparent focus:bg-white"
                />
                <button 
                 onClick={() => askGuru()}
                 disabled={loadingGuru}
                 className="bg-gradient-to-r from-rose-300 to-amber-200 text-white p-3 rounded-2xl hover:shadow-lg hover:shadow-rose-200/40 hover:-translate-y-0.5 transition-all"
                >
                  {loadingGuru ? <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /> : <Send size={16} className="text-stone-700" />}
                </button>
             </div>
          )}
        </div>
      )}

      <div className="space-y-6">
        {categories.map((cat) => {
            const style = getCategoryStyles(cat);
            return (
                <div key={cat}>
                    <h3 className={`text-xs font-bold uppercase tracking-widest mb-3 ml-1 ${style.text.replace('600', '400')}`}>{cat}</h3>
                    <div className="grid gap-2.5">
                    {items.filter(i => i.category === cat).map((item) => (
                        <div 
                        key={item.id}
                        onClick={() => toggleItem(item.id)}
                        className={`p-4 rounded-2xl flex items-center justify-between border cursor-pointer transition-all duration-300 ${
                            item.checked 
                            ? 'bg-stone-50 border-transparent opacity-50' 
                            : `bg-white ${style.border} shadow-sm hover:shadow-md hover:-translate-y-0.5`
                        }`}
                        >
                        <span className={`font-medium text-sm ${item.checked ? 'line-through text-stone-400' : 'text-stone-600'}`}>{item.name}</span>
                        {item.checked 
                            ? <CheckCircle2 className="text-emerald-400" size={22} /> 
                            : <Circle className={`text-stone-200 group-hover:${style.text}`} size={22} />
                        }
                        </div>
                    ))}
                    </div>
                </div>
            )
        })}
      </div>
    </div>
  );
};