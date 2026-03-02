'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Plane, X, Clock, Calendar, User, CreditCard, ChevronRight, ArrowLeft } from 'lucide-react';
import { QRCodeCanvas } from 'qrcode.react';
import { useState, useEffect } from 'react';


// Pricing Constants
const PRICES = {
  single: {
    night: 120
  },
  double: {
    night: 150
  },
  family: {
    night: 180
  }
};

const calculatePrice = (roomType: 'single' | 'double' | 'family', hours: number) => {
  if (roomType === 'single') {
    if (hours === 1) return 30;
    if (hours === 2) return 55;
    if (hours === 3) return 70;
    return 70 + (hours - 3) * 10;
  }
  if (roomType === 'double') {
    if (hours === 1) return 40;
    if (hours === 2) return 65;
    if (hours === 3) return 80;
    return 80 + (hours - 3) * 10;
  }
  if (roomType === 'family') {
    if (hours === 1) return 45;
    if (hours === 2) return 70;
    if (hours === 3) return 85;
    return 85 + (hours - 3) * 10;
  }
  return 0;
};

interface BookingWidgetProps {
  isOpen: boolean;
  onClose: () => void;
  selectedRoomType: 'single' | 'double' | 'family' | undefined;
}

type Step = 'selection' | 'details' | 'payment' | 'success';

export default function BookingWidget({ isOpen, onClose, selectedRoomType }: BookingWidgetProps) {
  const [step, setStep] = useState<Step>('selection');
  
  // Selection State
  const [room, setRoom] = useState<'single' | 'double' | 'family'>(selectedRoomType || 'single');
  const [mode, setMode] = useState<'hours' | 'night'>('hours');
  const [duration, setDuration] = useState<number>(2); // Default to 2, min 1

  // Details State
  const [formData, setFormData] = useState({
    name: '',
    dni: '',
    email: '',
    phone: '',
    flight: ''
  });

  // Payment State
  const [cardData, setCardData] = useState({
    number: '',
    expiry: '',
    cvc: ''
  });

  useEffect(() => {
    if (isOpen) {
        setStep('selection');
        if (selectedRoomType) setRoom(selectedRoomType);
    }
  }, [isOpen, selectedRoomType]);

  const price = mode === 'night' 
    ? PRICES[room].night
    : calculatePrice(room, duration);

  const handleNext = () => {
    if (step === 'selection') setStep('details');
    else if (step === 'details') setStep('payment');
    else if (step === 'payment') {
        // Simulate payment processing
        setTimeout(() => setStep('success'), 1500);
    }
  };

  const handleBack = () => {
    if (step === 'details') setStep('selection');
    else if (step === 'payment') setStep('details');
  };

  return (
      <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50"
          />

          <div className="fixed inset-0 pointer-events-none z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ y: 20, opacity: 0, scale: 0.95 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: 20, opacity: 0, scale: 0.95 }}
              className="pointer-events-auto bg-white dark:bg-slate-800 rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden flex flex-col max-h-[90vh]"
            >
                {/* Header */}
                <div className="p-6 border-b border-slate-100 dark:border-slate-700 flex justify-between items-center bg-slate-50/50 dark:bg-slate-900/50">
                    <div className="flex items-center gap-3">
                        {step !== 'selection' && step !== 'success' && (
                            <button onClick={handleBack} className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-full transition-colors">
                                <ArrowLeft size={20} className="text-slate-500" />
                            </button>
                        )}
                        <h2 className="text-xl font-bold text-slate-800 dark:text-white">
                            {step === 'selection' && 'Configura tu Estancia'}
                            {step === 'details' && 'Datos del Viajero'}
                            {step === 'payment' && 'Pasarela de Pago'}
                            {step === 'success' && '¡Reserva Confirmada!'}
                        </h2>
                    </div>
                     <button onClick={onClose} className="p-2 hover:bg-red-50 hover:text-red-500 rounded-full transition-colors text-slate-400">
                        <X size={20} />
                    </button>
                </div>

                {/* Body */}
                <div className="p-6 overflow-y-auto custom-scrollbar">
                    {step === 'selection' && (
                        <div className="space-y-6">
                            <div className="space-y-3">
                                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Habitación</label>
                                <div className="grid grid-cols-3 gap-3">
                                    <button 
                                        onClick={() => setRoom('single')}
                                        className={`p-4 rounded-xl border-2 text-left transition-all ${room === 'single' ? 'border-blue-500 bg-blue-50/30 dark:bg-blue-900/20' : 'border-slate-100 dark:border-slate-700 hover:border-slate-200 dark:hover:border-slate-600'}`}
                                    >
                                        <div className="font-bold text-slate-800 dark:text-slate-200 text-sm mb-1">Individual</div>
                                        <div className="text-xs text-slate-500 dark:text-slate-400">Desde 30€</div>
                                    </button>
                                    <button 
                                        onClick={() => setRoom('double')}
                                        className={`p-4 rounded-xl border-2 text-left transition-all ${room === 'double' ? 'border-blue-500 bg-blue-50/30 dark:bg-blue-900/20' : 'border-slate-100 dark:border-slate-700 hover:border-slate-200 dark:hover:border-slate-600'}`}
                                    >
                                        <div className="font-bold text-slate-800 dark:text-slate-200 text-sm mb-1">Doble</div>
                                        <div className="text-xs text-slate-500 dark:text-slate-400">Desde 40€</div>
                                    </button>
                                    <button 
                                        onClick={() => setRoom('family')}
                                        className={`p-4 rounded-xl border-2 text-left transition-all ${room === 'family' ? 'border-blue-500 bg-blue-50/30 dark:bg-blue-900/20' : 'border-slate-100 dark:border-slate-700 hover:border-slate-200 dark:hover:border-slate-600'}`}
                                    >
                                        <div className="font-bold text-slate-800 dark:text-slate-200 text-sm mb-1">Familiar</div>
                                        <div className="text-xs text-slate-500 dark:text-slate-400">Desde 45€</div>
                                    </button>
                                </div>
                            </div>

                             <div className="space-y-3">
                                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Duración</label>
                                <div className="flex bg-slate-100 dark:bg-slate-700 p-1 rounded-xl mb-4">
                                     <button onClick={() => setMode('hours')} className={`flex-1 py-2 text-sm font-bold rounded-lg transition-all ${mode === 'hours' ? 'bg-white dark:bg-slate-800 shadow text-blue-600 dark:text-blue-400' : 'text-slate-500 dark:text-slate-400'}`}>Por Horas</button>
                                     <button onClick={() => setMode('night')} className={`flex-1 py-2 text-sm font-bold rounded-lg transition-all ${mode === 'night' ? 'bg-white dark:bg-slate-800 shadow text-blue-600 dark:text-blue-400' : 'text-slate-500 dark:text-slate-400'}`}>Noche Completa</button>
                                </div>

                                {mode === 'hours' && (
                                    <div className="bg-slate-50 dark:bg-slate-900 p-6 rounded-2xl border border-slate-100 dark:border-slate-700">
                                        <div className="flex justify-between items-end mb-6">
                                            <span className="text-slate-500 dark:text-slate-400 text-sm font-medium">Tiempo de estancia</span>
                                            <span className="text-4xl font-bold text-blue-600 dark:text-blue-500 flex items-baseline gap-1">
                                                {duration} <span className="text-lg font-medium text-slate-400">h</span>
                                            </span>
                                        </div>
                                        <div className="relative px-2">
                                            <input 
                                                type="range" 
                                                min="1" 
                                                max="24" 
                                                value={duration} 
                                                onChange={(e) => setDuration(parseInt(e.target.value))}
                                                className="custom-range"
                                            />
                                            <div className="flex justify-between text-xs text-slate-400 mt-4 font-medium px-1">
                                                <span>1h</span>
                                                <span>6h</span>
                                                <span>12h</span>
                                                <span>18h</span>
                                                <span>24h</span>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}

                    {step === 'details' && (
                        <div className="space-y-4">
                            <div>
                                <label className="text-xs font-bold text-slate-500 uppercase mb-1 block">Nombre Completo</label>
                                <div className="relative">
                                    <User className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                                    <input 
                                        type="text" 
                                        value={formData.name}
                                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                                        className="w-full pl-10 pr-4 py-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:focus:ring-blue-900 outline-none transition-all dark:text-white"
                                        placeholder="Ej. Juan Pérez"
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="text-xs font-bold text-slate-500 uppercase mb-1 block">DNI / Pasaporte</label>
                                <input 
                                    type="text" 
                                    value={formData.dni}
                                    onChange={(e) => setFormData({...formData, dni: e.target.value})}
                                    className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:focus:ring-blue-900 outline-none transition-all dark:text-white"
                                    placeholder="Número de documento"
                                />
                            </div>
                             <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="text-xs font-bold text-slate-500 uppercase mb-1 block">Email</label>
                                    <input 
                                        type="email" 
                                        value={formData.email}
                                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                                        className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:focus:ring-blue-900 outline-none transition-all dark:text-white"
                                        placeholder="tu@email.com"
                                    />
                                </div>
                                <div>
                                    <label className="text-xs font-bold text-slate-500 uppercase mb-1 block">Teléfono</label>
                                    <input 
                                        type="tel" 
                                        value={formData.phone}
                                        onChange={(e) => setFormData({...formData, phone: e.target.value})}
                                        className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:focus:ring-blue-900 outline-none transition-all dark:text-white"
                                        placeholder="+34..."
                                    />
                                </div>
                             </div>
                             <div>
                                <label className="text-xs font-bold text-slate-500 uppercase mb-1 block">Vuelo (Opcional)</label>
                                <div className="relative">
                                    <Plane className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                                    <input 
                                        type="text" 
                                        value={formData.flight}
                                        onChange={(e) => setFormData({...formData, flight: e.target.value})}
                                        className="w-full pl-10 pr-4 py-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:focus:ring-blue-900 outline-none transition-all uppercase dark:text-white"
                                        placeholder="Ej. IB3400"
                                    />
                                </div>
                            </div>
                        </div>
                    )}

                    {step === 'payment' && (
                        <div className="space-y-6">
                            {/* Modern Payment Gateway Simulation */}
                            <div className="bg-slate-50 dark:bg-slate-900 p-6 rounded-2xl border border-slate-100 dark:border-slate-700">
                                <h3 className="text-sm font-bold text-slate-500 uppercase mb-4">Método de Pago</h3>
                                
                                <div className="space-y-3">
                                    <label className="flex items-center gap-4 p-4 border border-blue-500 bg-blue-50/50 dark:bg-blue-900/20 rounded-xl cursor-pointer transition-all">
                                        <div className="w-5 h-5 rounded-full border-[5px] border-blue-500 bg-white"></div>
                                        <div className="flex-1">
                                            <div className="font-bold text-slate-800 dark:text-white">Tarjeta de Crédito / Débito</div>
                                            <div className="text-xs text-slate-500">Visa, Mastercard, Amex</div>
                                        </div>
                                        <CreditCard className="text-blue-500" />
                                    </label>
                                    
                                    <label className="flex items-center gap-4 p-4 border border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 rounded-xl cursor-pointer opacity-60">
                                        <div className="w-5 h-5 rounded-full border-2 border-slate-300"></div>
                                        <div className="font-bold text-slate-800 dark:text-white">PayPal</div>
                                    </label>
                                </div>

                                <div className="mt-6 pt-6 border-t border-slate-200 dark:border-slate-700">
                                    <div className="space-y-4">
                                        <div>
                                            <label className="text-xs font-bold text-slate-500 uppercase mb-1 block">Número de Tarjeta</label>
                                            <div className="relative">
                                                <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                                                <input 
                                                    type="text" 
                                                    className="w-full pl-10 pr-4 py-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl outline-none focus:border-blue-500 transition-all font-mono"
                                                    placeholder="0000 0000 0000 0000"
                                                />
                                            </div>
                                        </div>
                                        <div className="flex gap-4">
                                            <div className="flex-1">
                                                <label className="text-xs font-bold text-slate-500 uppercase mb-1 block">Expiración</label>
                                                <input 
                                                    type="text" 
                                                    className="w-full px-4 py-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl outline-none focus:border-blue-500 transition-all font-mono text-center"
                                                    placeholder="MM/YY"
                                                />
                                            </div>
                                            <div className="flex-1">
                                                <label className="text-xs font-bold text-slate-500 uppercase mb-1 block">CVC</label>
                                                <input 
                                                    type="text" 
                                                    className="w-full px-4 py-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl outline-none focus:border-blue-500 transition-all font-mono text-center"
                                                    placeholder="123"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {step === 'success' && (
                        <div className="text-center py-4">
                            <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center text-green-500 mx-auto mb-4 animate-bounce">
                                <ChevronRight size={32} className="stroke-[3]" />
                            </div>
                            <h3 className="text-2xl font-bold text-slate-800 dark:text-white mb-2">¡Pago Completado!</h3>
                            <p className="text-slate-500 dark:text-slate-400 mb-6 text-sm">
                                Tu reserva ha sido confirmada. Escanea este código para acceder a tu habitación.
                            </p>
                            
                            <div className="bg-white p-4 rounded-2xl shadow-lg border border-slate-100 inline-block mb-6">
                                <QRCodeCanvas 
                                    value={`RESERVA-${Date.now()}-${room}`} 
                                    size={200}
                                    level={"H"}
                                    includeMargin={true}
                                />
                            </div>
                            
                            <p className="text-xs text-slate-400">
                                Hemos enviado una copia a <strong>{formData.email || 'tu correo'}</strong>
                            </p>
                        </div>
                    )}
                </div>

                {/* Footer Actions */}
                {step !== 'success' && (
                    <div className="p-6 border-t border-slate-100 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-900/50">
                        <div className="flex items-center justify-between mb-4">
                            <span className="text-sm text-slate-500">
                                Total a pagar {mode === 'night' && <span className="text-blue-600 font-bold ml-1">(Noche Completa)</span>}
                            </span>
                            <span className="text-2xl font-bold text-slate-800 dark:text-white">{price}€</span>
                        </div>
                        <button 
                            onClick={handleNext}
                            className={`w-full py-4 text-white rounded-xl font-bold transition-all shadow-lg active:scale-95 flex items-center justify-center gap-2 ${step === 'payment' ? 'bg-green-600 hover:bg-green-700 hover:shadow-green-500/25' : 'bg-blue-600 hover:bg-blue-700 hover:shadow-blue-500/25'}`}
                        >
                            {step === 'payment' ? 'Pagar y Reservar' : 'Continuar'}
                            <ChevronRight size={20} />
                        </button>
                    </div>
                )}
                {step === 'success' && (
                     <div className="p-6 border-t border-slate-100 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-900/50">
                        <button 
                            onClick={onClose}
                            className="w-full py-4 bg-slate-900 dark:bg-slate-700 text-white rounded-xl font-bold hover:bg-slate-800 dark:hover:bg-slate-600 transition-all shadow-lg active:scale-95"
                        >
                            Finalizar
                        </button>
                    </div>
                )}
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
