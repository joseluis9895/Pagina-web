'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronUp } from 'lucide-react';

export default function LandingOverlay() {
  const [isVisible, setIsVisible] = useState(true);

  const handleEnter = () => {
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 0 }}
          exit={{ y: '-100%', transition: { duration: 1, ease: [0.22, 1, 0.36, 1] } }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center text-white overflow-hidden"
        >
          {/* Background Image */}
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: 'url(/images/landing_bg.png)' }}
          >
             <div className="absolute inset-0 bg-black/30" />
          </div>

          {/* Content */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 1 }}
            className="relative z-10 text-center flex flex-col items-center"
          >
            <h1 className="text-7xl md:text-9xl font-bold tracking-tighter mb-2 text-white drop-shadow-lg">
              AirNap
            </h1>
            <p className="text-lg md:text-xl font-light tracking-[0.2em] uppercase mb-16 text-white/90">
              Terminal 4 • Madrid
            </p>
            
            <button 
              onClick={handleEnter}
              className="group flex flex-col items-center gap-3 text-white transition-colors cursor-pointer"
            >
              <div className="w-16 h-16 rounded-full border border-white/30 flex items-center justify-center group-hover:bg-white/10 group-hover:border-white/60 transition-all backdrop-blur-sm bg-white/5">
                <ChevronUp className="w-8 h-8 animate-bounce" strokeWidth={1.5} />
              </div>
              <span className="text-sm font-medium tracking-widest uppercase opacity-80 group-hover:opacity-100">Deslizar</span>
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
