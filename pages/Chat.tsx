import React, { useState, useEffect, useRef } from 'react';
import { ArrowLeft, Send, Sparkles, MoreVertical } from 'lucide-react';
import { Match, ChatMessage } from '../types';
import { getIcebreaker } from '../services/geminiService';

interface ChatProps {
  match: Match;
  myGroupName: string;
  onBack: () => void;
}

export const Chat: React.FC<ChatProps> = ({ match, myGroupName, onBack }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputText, setInputText] = useState('');
  const [generatingIcebreaker, setGeneratingIcebreaker] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMessages([
      {
        id: 'sys-1',
        senderId: 'system',
        text: `¡Hicieron match con ${match.group.name}!`,
        timestamp: Date.now(),
        isSystem: true
      }
    ]);
  }, [match]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(scrollToBottom, [messages]);

  const handleSend = () => {
    if (!inputText.trim()) return;
    const newMsg: ChatMessage = {
      id: Date.now().toString(),
      senderId: 'me',
      text: inputText,
      timestamp: Date.now()
    };
    setMessages([...messages, newMsg]);
    setInputText('');
    
    setTimeout(() => {
        const reply: ChatMessage = {
            id: (Date.now() + 1).toString(),
            senderId: 'them',
            text: "¡Dale! Nosotros ponemos las achuras. ¿Qué día les queda bien?",
            timestamp: Date.now()
        };
        setMessages(prev => [...prev, reply]);
    }, 2000);
  };

  const handleIcebreaker = async () => {
    setGeneratingIcebreaker(true);
    const text = await getIcebreaker(myGroupName, match.group.name);
    setInputText(text);
    setGeneratingIcebreaker(false);
  };

  return (
    <div className="flex flex-col h-screen bg-[#FDFBF7] max-w-md mx-auto relative">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-lg border-b border-stone-100 p-4 pt-4 flex items-center justify-between sticky top-0 z-20">
        <div className="flex items-center gap-3">
          <button onClick={onBack} className="text-stone-400 hover:text-stone-700 transition-colors p-1 rounded-full hover:bg-stone-50">
            <ArrowLeft size={22} />
          </button>
          <div className="relative">
            <img src={match.group.imageUrl} className="w-10 h-10 rounded-full object-cover ring-2 ring-stone-50" alt="" />
            <span className="absolute bottom-0 right-0 block h-2.5 w-2.5 rounded-full ring-2 ring-white bg-emerald-400" />
          </div>
          <div>
              <h3 className="font-bold text-stone-700 text-sm">{match.group.name}</h3>
              <p className="text-xs text-rose-400 font-medium">Asado pendiente</p>
          </div>
        </div>
        <button className="text-stone-300 p-2 hover:text-stone-500">
            <MoreVertical size={20} />
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg) => {
            if (msg.isSystem) {
                return (
                    <div key={msg.id} className="flex flex-col items-center justify-center my-6">
                        <span className="text-[10px] uppercase tracking-wider text-stone-300 font-bold mb-1">Nuevo Match</span>
                        <div className="bg-stone-100 h-px w-32 mb-2"></div>
                        <p className="text-xs text-stone-400">{msg.text}</p>
                    </div>
                );
            }
            const isMe = msg.senderId === 'me';
            return (
                <div key={msg.id} className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[80%] px-4 py-3 rounded-2xl text-sm shadow-sm ${
                      isMe 
                      ? 'bg-rose-100 text-stone-800 border border-rose-200/50 rounded-br-sm' 
                      : 'bg-white text-stone-600 border border-stone-100 rounded-bl-sm'
                    }`}>
                        {msg.text}
                    </div>
                </div>
            );
        })}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-4 bg-white border-t border-stone-100 pb-safe">
        <div className="flex items-center justify-between mb-3">
            <button 
                onClick={handleIcebreaker}
                disabled={generatingIcebreaker}
                className="text-xs bg-white border border-violet-100 text-violet-500 px-3 py-1.5 rounded-full flex items-center gap-1.5 hover:bg-violet-50 hover:border-violet-200 transition-all font-medium shadow-sm hover:-translate-y-0.5"
            >
                <Sparkles size={14} className={generatingIcebreaker ? 'animate-pulse' : ''} />
                {generatingIcebreaker ? 'Pensando...' : 'Pedir ayuda a IA'}
            </button>
        </div>
        <div className="flex items-center gap-2">
            <input 
                type="text" 
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Escribe un mensaje..."
                className="flex-1 bg-stone-50 text-stone-800 rounded-full px-5 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-rose-100 focus:bg-white transition-all placeholder-stone-400 shadow-inner"
            />
            <button 
                onClick={handleSend}
                disabled={!inputText.trim()}
                className="bg-gradient-to-r from-rose-300 to-amber-200 text-white p-3 rounded-full hover:shadow-lg hover:shadow-rose-200/50 transition-all disabled:opacity-50 disabled:shadow-none hover:-translate-y-0.5 hover:scale-105"
            >
                <Send size={18} fill="white" className="text-white drop-shadow-sm" />
            </button>
        </div>
      </div>
    </div>
  );
};