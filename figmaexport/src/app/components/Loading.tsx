import { motion } from 'motion/react';

export function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center p-8">
      <motion.div
        className="w-12 h-12 border-4 border-gray-800 border-t-[#00FF41] rounded-full"
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
      />
    </div>
  );
}

export function LoadingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 via-black to-gray-950 flex items-center justify-center">
      <div className="text-center">
        <LoadingSpinner />
        <p className="text-gray-400 mt-4">Cargando...</p>
      </div>
    </div>
  );
}
