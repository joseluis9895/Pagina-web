import { Bed, Users, Wifi, Wind, ArrowRight } from 'lucide-react';
import Link from 'next/link';

interface RoomCardProps {
  type: 'single' | 'double' | 'family';
  title: string;
  description: string;
  price: string;
  onBook: () => void;
  index: number;
}

export default function RoomCard({ type, title, description, price, onBook, index }: RoomCardProps) {
  return (
    <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-3xl p-5 shadow-xl border border-white/60 dark:border-slate-700/60 hover:shadow-2xl hover:bg-white/90 dark:hover:bg-slate-800/90 transition-all group h-full flex flex-col">
      {/* Image Container */}
      <div className="h-48 rounded-2xl mb-4 relative overflow-hidden group-hover:shadow-md transition-all">
          {/* We will use a real image background here */}
          <div 
            className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
            style={{ 
                backgroundImage: type === 'single' 
                    ? 'url(/images/single_room_standard.png)' 
                    : type === 'double'
                    ? 'url(/images/double_room_comfort.png)'
                    : 'url(/images/family_room_standard.png)' 
            }} 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-60" />
          
          <span className="absolute top-3 right-3 bg-white/90 px-3 py-1 rounded-full text-xs font-bold text-slate-700 shadow-sm z-10 flex items-center gap-1">
            <Users size={12} />
            {type === 'single' ? 'Max 1' : type === 'double' ? 'Max 2' : 'Max 4'}
          </span>
          
          {/* View Details Overlay Button */}
          <Link 
            href={`/rooms/${type}`}
            className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20 bg-black/20"
          >
             <span className="px-5 py-2 bg-white/90 rounded-full text-sm font-bold text-slate-800 shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                Ver Fotos
             </span>
          </Link>
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col">
        <div className="flex justify-between items-start mb-2">
            <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100">{title}</h3>
            <div className="flex gap-2">
                 <span className="p-1.5 bg-slate-50 dark:bg-slate-700 rounded-lg text-slate-400 dark:text-slate-300" title="WiFi 5G">
                    <Wifi size={14} />
                </span>
                 <span className="p-1.5 bg-slate-50 dark:bg-slate-700 rounded-lg text-slate-400 dark:text-slate-300" title="Climatización">
                    <Wind size={14} />
                </span>
            </div>
        </div>
        
        <p className="text-slate-500 dark:text-slate-400 text-sm mb-6 leading-relaxed flex-1">{description}</p>
        
        {/* Footer */}
        <div className="flex items-center justify-between mt-auto pt-4 border-t border-slate-100 dark:border-slate-700">
            <div className="flex flex-col">
                <span className="text-xs text-slate-400 uppercase font-bold tracking-wider">Desde</span>
                <span className="font-bold text-slate-800 dark:text-white text-lg">{price}</span>
            </div>
          <button 
            onClick={onBook}
            className="px-6 py-2.5 bg-slate-900 dark:bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-600 dark:hover:bg-blue-700 transition-colors shadow-lg hover:shadow-blue-500/30 active:scale-95 flex items-center gap-2"
          >
            Reservar <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
