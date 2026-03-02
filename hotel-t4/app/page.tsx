'use client';

import { useState } from 'react';
import Link from 'next/link';
import Header from '../components/Header';
import RoomCard from '../components/RoomCard';
import BookingWidget from '../components/BookingWidget';
import { MapPin, Info, Wifi, ShowerHead, Monitor, Moon, Shield, Clock, Mail, Phone } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

import LandingOverlay from '../components/LandingOverlay';
import LocationMap from '../components/LocationMap';

export default function Home() {
  const { t } = useLanguage();
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [selectedType, setSelectedType] = useState<'single' | 'double' | 'family' | undefined>(undefined);

  const openBooking = (type: 'single' | 'double' | 'family') => {
    setSelectedType(type);
    setIsBookingOpen(true);
  };

  // Generate rooms dynamically based on language
  const rooms = [
    { id: 1, type: 'single', title: t.rooms.singleTitle, price: t.rooms.priceSingle },
    { id: 2, type: 'double', title: t.rooms.doubleTitle, price: t.rooms.priceDouble },
    { id: 3, type: 'family', title: t.rooms.familyTitle, price: t.rooms.priceFamily },
  ] as const;

  return (
    <main className="min-h-screen relative text-slate-800 dark:text-slate-100 overflow-x-hidden selection:bg-blue-100 selection:text-blue-900 dark:selection:bg-blue-900 dark:selection:text-blue-100">
      
      <LandingOverlay />

      {/* Background Image with Overlay */}
      <div 
        className="fixed inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: 'url(/images/terminal_bg.png)' }}
      >
        <div className="absolute inset-0 bg-slate-50/80 dark:bg-slate-900/80 backdrop-blur-[2px]" />
      </div>

      <div className="relative z-10">
      
      <Header />

      <div className="container mx-auto px-6 pt-32 pb-20 relative z-10">
        
        {/* Intro / Hero */}
        <section id="hero" className="text-center mb-24 max-w-4xl mx-auto pt-10">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100/50 rounded-full text-blue-700 text-sm font-bold tracking-wide mb-6 border border-blue-200 backdrop-blur-sm animate-fade-in-up">
                <MapPin size={16} />
                {t.hero.locationBadge}
              </div>
           
              <h1 className="text-6xl md:text-8xl font-bold mb-6 tracking-tight text-slate-900 dark:text-white leading-tight animate-fade-in-up delay-100">
                {t.hero.title} <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">
                  {t.hero.subtitle}
                </span>
              </h1>

              <p className="text-xl text-slate-500 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed animate-fade-in-up delay-200">
                {t.hero.description}
              </p>
        </section>

        {/* Room Grid */}
        <section id="rooms" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-32">
           {rooms.map((room, index) => (
             <RoomCard
               key={room.id}
               type={room.type}
               title={room.title}
               description={room.type === 'single' ? t.rooms.singleDesc : room.type === 'double' ? t.rooms.doubleDesc : t.rooms.familyDesc}
               price={room.price}
               index={index}
               onBook={() => openBooking(room.type)}
             />
           ))}
        </section>

        {/* Services Section */}
        <section id="services" className="mb-32">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">{t.services.title}</h2>
            <p className="text-slate-500 dark:text-slate-400 max-w-2xl mx-auto">{t.services.subtitle}</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
             <div className="p-6 bg-white/60 dark:bg-slate-800/60 backdrop-blur-md rounded-2xl border border-white/50 dark:border-slate-700/50 shadow-sm hover:shadow-md transition-all text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 mx-auto mb-4">
                  <Wifi size={24} />
                </div>
                <h3 className="font-semibold text-slate-800 dark:text-slate-200">{t.services.wifi}</h3>
             </div>
             
             <div className="p-6 bg-white/60 backdrop-blur-md rounded-2xl border border-white/50 shadow-sm hover:shadow-md transition-all text-center">
                <div className="w-12 h-12 bg-cyan-100 rounded-full flex items-center justify-center text-cyan-600 mx-auto mb-4">
                  <ShowerHead size={24} />
                </div>
                <h3 className="font-semibold text-slate-800 dark:text-slate-200">{t.services.shower}</h3>
             </div>

             <div className="p-6 bg-white/60 backdrop-blur-md rounded-2xl border border-white/50 shadow-sm hover:shadow-md transition-all text-center">
                <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600 mx-auto mb-4">
                  <Monitor size={24} />
                </div>
                <h3 className="font-semibold text-slate-800 dark:text-slate-200">{t.services.desk}</h3>
             </div>

             <div className="p-6 bg-white/60 backdrop-blur-md rounded-2xl border border-white/50 shadow-sm hover:shadow-md transition-all text-center">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center text-purple-600 mx-auto mb-4">
                  <Moon size={24} />
                </div>
                <h3 className="font-semibold text-slate-800 dark:text-slate-200">{t.services.sleep}</h3>
             </div>
             
             {/* Extra Services to fill grid if needed, or keep to 4 */}
             <div className="p-6 bg-white/60 backdrop-blur-md rounded-2xl border border-white/50 shadow-sm hover:shadow-md transition-all text-center hidden md:block">
                <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600 mx-auto mb-4">
                  <Shield size={24} />
                </div>
                <h3 className="font-semibold text-slate-800 dark:text-slate-200">{t.services.security}</h3>
             </div>

             <div className="p-6 bg-white/60 backdrop-blur-md rounded-2xl border border-white/50 shadow-sm hover:shadow-md transition-all text-center hidden md:block">
                <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center text-orange-600 mx-auto mb-4">
                  <Clock size={24} />
                </div>
                <h3 className="font-semibold text-slate-800 dark:text-slate-200">{t.services.reception}</h3>
             </div>
          </div>
        </section>

        {/* Location Section */}
        <section id="location" className="mt-24 text-center">
             <div className="mb-12">
                <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">{t.nav.location}</h2>
                <p className="text-slate-500 dark:text-slate-400 max-w-2xl mx-auto">
                    Nos encontramos en el corazón de la Terminal 4. Fácil acceso desde cualquier puerta de embarque.
                </p>
             </div>
             
             <LocationMap />

             <div className="mt-12 inline-flex flex-col md:flex-row items-center gap-6 px-8 py-6 bg-white/60 dark:bg-slate-800/60 backdrop-blur-md rounded-2xl border border-white/50 dark:border-slate-700/50 shadow-lg text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
                <div className="flex items-center gap-3 w-full md:w-auto">
                    <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-600 flex-shrink-0">
                        <Info size={20} />
                    </div>
                    <div className="text-left">
                        <span className="block font-bold text-slate-800 dark:text-slate-100 text-sm">{t.location.security}</span>
                        <span className="text-xs">{t.location.securityDesc}</span>
                    </div>
                </div>
                <div className="w-full h-px md:w-px md:h-10 bg-slate-200 dark:bg-slate-700"></div>
                <div className="flex items-center gap-3 w-full md:w-auto">
                    <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 flex-shrink-0">
                        <MapPin size={20} />
                    </div>
                    <div className="text-left">
                        <span className="block font-bold text-slate-800 dark:text-slate-100 text-sm">{t.location.transit}</span>
                        <span className="text-xs">{t.location.transitDesc}</span>
                    </div>
                </div>
             </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="mt-32 pt-16 border-t border-slate-200 dark:border-slate-800">
           <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center md:text-left">
              <div>
                 <h4 className="font-bold text-lg mb-4 text-slate-800 dark:text-slate-100">AIRNAP T4</h4>
                 <p className="text-slate-500 dark:text-slate-400 text-sm">
                   El primer hotel de tránsito en la zona de embarque de la T4.
                 </p>
              </div>
              
              <div>
                <h4 className="font-bold text-lg mb-4 text-slate-800 dark:text-slate-100">{t.nav.contact}</h4>
                <div className="flex flex-col gap-2 text-slate-600 dark:text-slate-400 text-sm items-center md:items-start">
                   <a href="mailto:airnapzz@gmail.com" className="flex items-center gap-2 hover:text-blue-600 dark:hover:text-blue-400">
                      <Mail size={16} /> airnapzz@gmail.com
                   </a>
                   <a href="tel:+34912345678" className="flex items-center gap-2 hover:text-blue-600 dark:hover:text-blue-400">
                      <Phone size={16} /> +34 91 123 45 67
                   </a>
                </div>
              </div>

              <div>
                 <h4 className="font-bold text-lg mb-4 text-slate-800 dark:text-slate-100">Links</h4>
                 <div className="flex flex-col gap-2 text-slate-600 dark:text-slate-400 text-sm">
                    <a href="#" className="hover:text-blue-600 dark:hover:text-blue-400">Privacy Policy</a>
                    <a href="#" className="hover:text-blue-600 dark:hover:text-blue-400">Terms of Service</a>
                 </div>
              </div>
           </div>
           <div className="mt-12 text-center text-slate-400 dark:text-slate-600 text-xs">
              © 2026 AirNap T4. All rights reserved.
           </div>
        </section>

      </div>

      </div>
      <BookingWidget 
        isOpen={isBookingOpen} 
        onClose={() => setIsBookingOpen(false)} 
        selectedRoomType={selectedType}
      />
    </main>
  );
}
