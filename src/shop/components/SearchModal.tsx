// import { useState } from "react";
import { Input } from '@/components/ui/input';
import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import type { KeyboardEvent } from 'react';
import { useNavigate } from 'react-router';

interface SearchModalProps {
  open: boolean;
  onClose: () => void;
}

export default function SearchModal({ open, onClose }: SearchModalProps) {
  const navigate = useNavigate();

  const menuItems = [
    'BLACK FRIDAY',
    'SNEAKERS',
    'STREETWEAR',
    'MARCAS',
    'NOVEDADES',
    'ENTREGA 24 - 48 HORAS 📦',
  ];

  const onSearch = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== 'Enter') return;

    const target = e.target as HTMLInputElement;

    const query = target.value;

    if (query.length === 0) return;

    onClose();
    navigate(`/search?query=${query.toLowerCase().trim()}`);
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 flex items-start justify-center bg-black/40 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            initial={{ y: -40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -40, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="w-full max-w-3xl bg-white rounded-lg shadow-xl p-8 mt-10 relative"
          >
            {/* Botón cerrar */}
            <button
              onClick={onClose}
              className="absolute right-6 top-6 text-black hover:opacity-60 transition"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Input buscar */}
            <Input
              placeholder="Buscar..."
              className="text-2xl font-semibold border-b rounded-none border-l-0 border-r-0 border-t-0 focus-visible:ring-0 focus-visible:border-black py-4 px-1"
              onKeyDown={onSearch}
            />

            {/* Menú principal */}
            <div className="mt-8">
              <p className="text-sm text-gray-500 font-medium mb-4">
                Menú principal
              </p>

              <ul className="space-y-4">
                {menuItems.map((item) => (
                  <li
                    key={item}
                    className="text-xl font-semibold cursor-pointer hover:opacity-70 transition"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
