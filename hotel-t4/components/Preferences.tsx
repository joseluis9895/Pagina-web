'use client';

import { useState } from 'react';
import { Settings, Moon, Sun, X } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';

export default function Preferences() {
  const { theme, toggleTheme } = useTheme();
  const { t } = useLanguage(); // Assuming translations needed, or I'll just use Spanish/English based on context
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-6 left-6 z-50">
      {isOpen ? (
        <div className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-md border border-slate-200 dark:border-slate-700 rounded-2xl shadow-2xl p-4 w-64 animate-in slide-in-from-bottom-5 fade-in duration-300">
            <div className="flex justify-between items-center mb-4 pb-2 border-b border-slate-200 dark:border-slate-700">
                <h3 className="font-semibold text-slate-800 dark:text-slate-100 flex items-center gap-2">
                    <Settings size={18} />
                    Configuración
                </h3>
                <button 
                    onClick={() => setIsOpen(false)}
                    className="text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 transition-colors"
                >
                    <X size={18} />
                </button>
            </div>
            
            <div className="space-y-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-slate-700 dark:text-slate-200">
                        {theme === 'dark' ? <Moon size={18} /> : <Sun size={18} />}
                        <span className="text-sm font-medium">Tema Oscuro</span>
                    </div>
                    
                    <button 
                        onClick={toggleTheme}
                        className={`w-12 h-6 rounded-full p-1 transition-colors duration-300 ease-in-out ${theme === 'dark' ? 'bg-blue-600' : 'bg-slate-300'}`}
                    >
                        <div className={`w-4 h-4 rounded-full bg-white shadow-sm transform transition-transform duration-300 ${theme === 'dark' ? 'translate-x-6' : 'translate-x-0'}`} />
                    </button>
                </div>
            </div>
        </div>
      ) : (
        <button
          onClick={() => setIsOpen(true)}
          className="p-3 bg-white dark:bg-slate-800 text-slate-700 dark:text-white rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all border border-slate-200 dark:border-slate-700 group"
          aria-label="Preferencias"
        >
          <Settings size={24} className="group-hover:rotate-45 transition-transform duration-500" />
        </button>
      )}
    </div>
  );
}
