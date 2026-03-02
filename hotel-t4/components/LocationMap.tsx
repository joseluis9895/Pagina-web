'use client';

import { useState } from 'react';
import { Map, LayoutTemplate, ExternalLink } from 'lucide-react';
import Image from 'next/image';

export default function LocationMap() {
  const [activeView, setActiveView] = useState<'google' | 'schematic'>('schematic');

  return (
    <div className="w-full max-w-5xl mx-auto">
      {/* Controls */}
      <div className="flex justify-center mb-8">
        <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-md p-1.5 rounded-full border border-slate-200 dark:border-slate-700 shadow-lg inline-flex">
          <button
            onClick={() => setActiveView('google')}
            className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all flex items-center gap-2 ${
              activeView === 'google'
                ? 'bg-blue-600 text-white shadow-md'
                : 'text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400'
            }`}
          >
            <Map size={16} />
            Google Maps
          </button>
          <button
            onClick={() => setActiveView('schematic')}
            className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all flex items-center gap-2 ${
              activeView === 'schematic'
                ? 'bg-blue-600 text-white shadow-md'
                : 'text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400'
            }`}
          >
            <LayoutTemplate size={16} />
            Guía Terminal
          </button>
        </div>
      </div>

      {/* Content Container */}
      <div className="relative aspect-video w-full bg-slate-100 dark:bg-slate-900 rounded-3xl overflow-hidden border border-white/50 dark:border-slate-700/50 shadow-2xl">
        
        {/* Google Maps View */}
        <div 
            className={`absolute inset-0 transition-opacity duration-500 flex flex-col ${
                activeView === 'google' ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
            }`}
        >
            <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3033.5663731633973!2d-3.5939269234407817!3d40.49444327142699!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd42316655c68dc9%3A0xe546b30707c923d!2sTerminal%20T4%20Adolfo%20Su%C3%A1rez%20Madrid-Barajas%20Airport!5e0!3m2!1sen!2ses!4v1714000000000!5m2!1sen!2ses" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen={true} 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full grayscale-[0.2] hover:grayscale-0 transition-all duration-500"
            ></iframe>
             <div className="absolute bottom-4 right-4 bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm px-4 py-2 rounded-lg text-xs font-medium border border-slate-200 shadow-lg text-slate-600 pointer-events-none">
                📍 Terminal T4, Madrid Barajas
            </div>
        </div>

        {/* Schematic View */}
        <div 
            className={`absolute inset-0 transition-opacity duration-500 flex items-center justify-center bg-slate-50 dark:bg-slate-800 ${
                activeView === 'schematic' ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
            }`}
        >
            <div className="relative w-full h-full p-8 md:p-12 flex items-center justify-center">
                <div className="relative w-full h-full max-w-4xl max-h-[80vh]">
                     <Image
                        src="/images/t4_indoor_schematic.png"
                        alt="Plano Esquemático AirNap T4"
                        fill
                        className="object-contain drop-shadow-2xl"
                        priority
                     />
                </div>
                
                {/* Overlay Highlights (Animated) */}
                <div className="absolute bottom-8 left-8 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md p-4 rounded-2xl border border-blue-100 dark:border-blue-900 shadow-xl max-w-xs animate-fade-in-up">
                    <h4 className="font-bold text-blue-600 dark:text-blue-400 mb-1 flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"/> 
                        Cómo llegar
                    </h4>
                    <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                        Dirígete a la zona de embarque J. Busca el letrero de "AirNap" cerca de la puerta J50.
                    </p>
                </div>
            </div>
        </div>

      </div>
    </div>
  );
}
