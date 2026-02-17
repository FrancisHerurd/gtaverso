"use client";

import { motion } from "framer-motion";

export function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center p-8">
      <motion.div
        className="h-12 w-12 animate-spin rounded-full border-4 border-black/20 border-t-[var(--gta-green)] shadow-lg"
        aria-label="Cargando"
      />
    </div>
  );
}

export function LoadingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-950 to-black flex items-center justify-center p-8">
      <div className="text-center">
        <LoadingSpinner />
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-4 text-lg font-medium text-white/80 tracking-wide"
        >
          Cargando GTAVerso...
        </motion.p>
      </div>
    </div>
  );
}