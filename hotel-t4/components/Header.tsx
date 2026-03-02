'use client';

import { Menu, X } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';

export default function Header() {
  const { t, language, setLanguage } = useLanguage();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const scrollToSection = (id: string) => {
    if (pathname !== '/') {
      router.push(`/#${id}`);
    } else {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
    setIsMenuOpen(false);
  };

  const navItems = [
    { label: t.nav.home, action: () => scrollToSection('hero') },
    { label: t.nav.services, action: () => scrollToSection('services') },
    { label: t.nav.location, action: () => scrollToSection('location') },
    { label: t.nav.contact, action: () => scrollToSection('contact') },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-6 py-6 flex justify-between items-center transition-all duration-300">
      {/* Brand */}
      <div className="cursor-pointer" onClick={() => scrollToSection('hero')}>
        <h1 className="text-2xl font-bold tracking-tighter text-slate-800 dark:text-white bg-white/80 dark:bg-slate-800/80 backdrop-blur-md px-4 py-2 rounded-full shadow-lg border border-white/50 dark:border-slate-700/50 hover:scale-105 transition-transform">
          AIRNAP <span className="text-blue-500 font-light">T4</span>
        </h1>
      </div>

      {/* Navigation */}
      <div className="flex items-center gap-4">
        {/* Desktop Nav */}
        <nav className="hidden md:flex gap-4">
          {navItems.map((item) => (
             <button 
               key={item.label} 
               onClick={item.action}
               className="px-5 py-2.5 rounded-full bg-white/70 dark:bg-slate-900/70 backdrop-blur-sm text-slate-600 dark:text-slate-300 text-sm font-medium hover:bg-white dark:hover:bg-slate-800 hover:text-blue-600 dark:hover:text-blue-400 hover:shadow-lg transition-all border border-transparent hover:border-blue-100 dark:hover:border-blue-900"
             >
               {item.label}
             </button>
          ))}
        </nav>

        {/* Language Selector (Desktop) */}
        <div className="hidden md:block relative group p-2">
            <button className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-white/70 dark:bg-slate-900/70 backdrop-blur-sm text-slate-600 dark:text-slate-300 text-sm font-medium hover:bg-white dark:hover:bg-slate-800 hover:text-blue-600 dark:hover:text-blue-400 hover:shadow-lg transition-all border border-transparent hover:border-blue-100 dark:hover:border-blue-900">
                <img src="/globe.svg" alt="Language" className="w-5 h-5 opacity-70" />
                <span className="hidden sm:inline">{language.toUpperCase()}</span>
            </button>
            
            <div className="absolute right-0 top-full -mt-2 pt-4 w-32 hidden group-hover:block">
                <div className="bg-white dark:bg-slate-800 rounded-xl shadow-xl border border-slate-100 dark:border-slate-700 overflow-hidden p-1">
                    <button 
                    onClick={() => setLanguage('es')}
                    className={`w-full text-left px-4 py-2 text-sm rounded-lg transition-colors flex items-center justify-between ${language === 'es' ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400' : 'text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700'}`}
                    >
                        <span>Español</span>
                        {language === 'es' && <span className="text-blue-500 text-xs">●</span>}
                    </button>
                    <button 
                    onClick={() => setLanguage('en')}
                    className={`w-full text-left px-4 py-2 text-sm rounded-lg transition-colors flex items-center justify-between ${language === 'en' ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400' : 'text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700'}`}
                    >
                        <span>English</span>
                        {language === 'en' && <span className="text-blue-500 text-xs">●</span>}
                    </button>
                </div>
            </div>
        </div>

        {/* Mobile Menu Button */}
        <button 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden p-3 rounded-full bg-white/70 dark:bg-slate-900/70 backdrop-blur-sm text-slate-800 dark:text-white shadow-lg border border-white/50 dark:border-slate-700/50"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="absolute top-full left-0 right-0 mt-4 p-4 mx-4 bg-white dark:bg-slate-800 rounded-2xl shadow-2xl border border-slate-100 dark:border-slate-700 flex flex-col gap-2 md:hidden animate-fade-in-up">
           {navItems.map((item) => (
             <button 
               key={item.label} 
               onClick={item.action}
               className="w-full text-left px-4 py-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-medium transition-colors"
             >
               {item.label}
             </button>
           ))}
           <div className="h-px bg-slate-100 dark:bg-slate-700 my-2"></div>
           <div className="flex justify-between items-center px-4 py-2">
              <span className="text-sm text-slate-500 dark:text-slate-400">Idioma</span>
              <div className="flex gap-2">
                 <button 
                    onClick={() => setLanguage('es')} 
                    className={`px-3 py-1 rounded-lg text-sm font-bold ${language === 'es' ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400' : 'text-slate-500'}`}
                 >
                    ES
                 </button>
                 <button 
                    onClick={() => setLanguage('en')} 
                    className={`px-3 py-1 rounded-lg text-sm font-bold ${language === 'en' ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400' : 'text-slate-500'}`}
                 >
                    EN
                 </button>
              </div>
           </div>
        </div>
      )}
    </header>
  );
}
