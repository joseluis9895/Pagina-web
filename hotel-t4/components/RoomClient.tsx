'use client';

import Link from 'next/link';
import { ArrowLeft, Wifi, Wind, MapPin, Coffee, Bath, Monitor } from 'lucide-react';
import Header from './Header';
import BookingWidget from './BookingWidget';
import { useState } from 'react';

export default function RoomClient({ type }: { type: 'single' | 'double' | 'family' }) {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const roomData = {
    single: {
      title: 'Solo Express - Habitación Individual',
      price: 'Desde 30€',
      description: 'Disfruta de tu propia habitación de hotel privada dentro de la T4. Un espacio insonorizado y perfectamente equipado para descansar, trabajar o refrescarte antes de tu vuelo. Sin ventanas exteriores para garantizar un descanso profundo en cualquier zona horaria.',
      amenities: [
        { icon: Wifi, label: 'WiFi 5G Alta Velocidad' },
        { icon: Wind, label: 'Climatización Individual' },
        { icon: Bath, label: 'Baño Privado con Ducha' },
        { icon: Monitor, label: 'Smart TV' },
        { icon: Coffee, label: 'Escritorio de Trabajo' },
      ],
      images: ['/images/single_room_standard.png', '/images/single_room_2.png', '/images/single_room_3.png']
    },
    double: {
      title: 'Dúo Comfort - Habitación Doble',
      price: 'Desde 40€',
      description: 'Ideal para parejas o compañeros de viaje. Cuenta con una cama Queen Size, mayor amplitud y todas las comodidades para dos personas. Privacidad y confort absoluto en el corazón de la terminal.',
      amenities: [
        { icon: Wifi, label: 'WiFi 5G Alta Velocidad' },
        { icon: Wind, label: 'Climatización Individual' },
        { icon: Bath, label: 'Baño Completo Privado' },
        { icon: Monitor, label: 'Smart TV 4K' },
        { icon: Coffee, label: 'Mesa para Dos' },
      ],
      images: ['/images/double_room_comfort.png', '/images/double_room_2.png', '/images/double_room_3.png']
    },
    family: {
      title: 'Transit Group - Habitación Familiar (Max 4)',
      price: 'Desde 45€',
      description: 'La solución perfecta para familias o pequeños grupos. Una habitación amplia con cama Queen y posibilidad de litera o supletoria. Espacio para maletas, baño completo y zona de estar. Ideal para esperas largas con total comodidad.',
      amenities: [
        { icon: Wifi, label: 'WiFi 5G Multidispositivo' },
        { icon: Wind, label: 'Climatización Individual' },
        { icon: Bath, label: 'Baño Amplio Privado' },
        { icon: Monitor, label: 'Smart TV 4K' },
        { icon: Coffee, label: 'Mesa Auxiliar' },
      ],
      images: ['/images/family_room_standard.png', '/images/family_room_2.png', '/images/family_room_3.png']
    }
  };

  const data = roomData[type] || roomData.single;

  return (
    <main className="min-h-screen bg-slate-50 relative selection:bg-blue-100 selection:text-blue-900">
      <Header />
      
      {/* Hero Image */}
      <div 
        className="h-[50vh] relative w-full overflow-hidden cursor-pointer group"
        onClick={() => setIsFullscreen(true)}
      >
        <div 
            className="absolute inset-0 bg-cover bg-center transition-all duration-500 group-hover:scale-105"
            style={{ backgroundImage: `url(${data.images[selectedImageIndex]})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent" />
        
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/20">
             <div className="bg-white/20 backdrop-blur-md px-6 py-3 rounded-full text-white font-medium border border-white/50 shadow-xl">
                 Ver galería a pantalla completa
             </div>
        </div>
        
        <div className="absolute bottom-0 left-0 right-0 p-8 container mx-auto">
            <Link href="/" className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-4 transition-colors backdrop-blur-sm bg-black/20 px-4 py-2 rounded-full">
                <ArrowLeft size={20} />
                Volver al Inicio
            </Link>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">{data.title}</h1>
            <p className="text-xl text-white/90 font-medium">{data.price} <span className="text-sm font-normal opacity-75">/ hora</span></p>
        </div>
      </div>

      <div className="container mx-auto px-6 py-12 max-w-4xl">
        <div className="grid md:grid-cols-3 gap-12">
            
            {/* Main Info */}
            <div className="md:col-span-2 space-y-8">
                <section>
                    <h2 className="text-2xl font-bold text-slate-800 mb-4">Descripción</h2>
                    <p className="text-slate-600 leading-relaxed text-lg">
                        {data.description}
                    </p>
                </section>

                <section>
                    <h2 className="text-2xl font-bold text-slate-800 mb-6">Servicios Incluidos</h2>
                    <div className="grid grid-cols-2 gap-4">
                        {data.amenities.map((item, idx) => (
                            <div key={idx} className="flex items-center gap-3 p-4 bg-white rounded-xl border border-slate-100 shadow-sm">
                                <item.icon className="text-blue-500" size={20} />
                                <span className="text-slate-700 font-medium">{item.label}</span>
                            </div>
                        ))}
                    </div>
                </section>
            </div>

            {/* Gallery Section */}
            {data.images.length > 1 && (
                <div className="md:col-span-2 mt-8">
                    <h2 className="text-2xl font-bold text-slate-800 mb-6">Galería de Imágenes</h2>
                    <div className="flex gap-4 overflow-x-auto pb-4 custom-scrollbar">
                        {data.images.map((img, idx) => (
                            <button 
                                key={idx} 
                                onClick={() => setSelectedImageIndex(idx)}
                                className={`flex-shrink-0 relative overflow-hidden rounded-2xl w-48 h-32 transition-all ${selectedImageIndex === idx ? 'ring-4 ring-blue-500 scale-105 opacity-100' : 'opacity-70 hover:opacity-100 hover:scale-105'}`}
                            >
                                <img src={img} alt={`Vista ${idx + 1} de la habitación`} className="object-cover w-full h-full" />
                            </button>
                        ))}
                    </div>
                </div>
            )}

            {/* Sticky Sidebar Action */}
            <div className="md:col-span-1">
                <div className="bg-white p-6 rounded-2xl shadow-xl border border-slate-100 sticky top-32">
                    <h3 className="text-lg font-bold text-slate-800 mb-2">Reserva tu descanso</h3>
                    <p className="text-slate-500 text-sm mb-6">Sin salir de la terminal. Pago seguro y acceso inmediato.</p>
                    
                    <button 
                        onClick={() => setIsBookingOpen(true)}
                        className="w-full py-4 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-all shadow-lg hover:shadow-blue-500/25 active:scale-95 flex items-center justify-center gap-2"
                    >
                        Reservar Ahora
                    </button>
                    
                    <div className="mt-6 pt-6 border-t border-slate-100 space-y-3">
                        <div className="flex items-center gap-3 text-xs text-slate-500">
                             <MapPin size={16} />
                             <span>Terminal T4 - Salidas</span>
                        </div>
                        <div className="flex items-center gap-3 text-xs text-slate-500">
                             <Wind size={16} />
                             <span>Ventilación HEPA</span>
                        </div>
                    </div>
                </div>
            </div>

        </div>
      </div>
      
      <BookingWidget 
        isOpen={isBookingOpen} 
        onClose={() => setIsBookingOpen(false)} 
        selectedRoomType={type} 
      />

      {/* Fullscreen Lightbox Modal */}
      {isFullscreen && (
        <div className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-sm flex flex-col items-center justify-center animate-fade-in">
            <div className="absolute top-6 right-6 z-50 flex gap-4">
                <button 
                    onClick={() => setIsFullscreen(false)}
                    className="w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-colors backdrop-blur-md"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                </button>
            </div>
            
            <div className="w-full h-full max-w-7xl max-h-[80vh] p-4 flex items-center justify-center relative">
                <img 
                    src={data.images[selectedImageIndex]} 
                    alt={`Vista ampliada de la habitación`} 
                    className="max-w-full max-h-full object-contain rounded-lg shadow-2xl" 
                />
            </div>

            <div className="absolute bottom-8 left-0 right-0 p-4">
                <div className="flex gap-4 overflow-x-auto justify-center custom-scrollbar">
                    {data.images.map((img, idx) => (
                        <button 
                            key={idx} 
                            onClick={() => setSelectedImageIndex(idx)}
                            className={`flex-shrink-0 relative overflow-hidden rounded-xl w-32 h-20 transition-all ${selectedImageIndex === idx ? 'ring-4 ring-white scale-110 opacity-100 z-10' : 'opacity-50 hover:opacity-100'}`}
                        >
                            <img src={img} alt={`Miniatura ${idx + 1}`} className="object-cover w-full h-full" />
                        </button>
                    ))}
                </div>
            </div>
        </div>
      )}

    </main>
  );
}
