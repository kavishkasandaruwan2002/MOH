import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, ArrowUp, PhoneCall, Sparkles } from 'lucide-react';

export const FloatingActionControls = () => {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-3 pointer-events-none">
      
      {/* Floating "Book Appointment" CTA Button */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="pointer-events-auto shadow-2xl rounded-full"
      >
        <Link
          to="/appointments"
          className="flex items-center gap-2.5 px-5 py-3.5 rounded-full bg-gradient-to-r from-teal-600 via-emerald-600 to-teal-700 text-white font-extrabold text-xs shadow-xl shadow-teal-600/40 border border-white/30 hover:brightness-110 transition group"
        >
          <Calendar className="w-4 h-4 stroke-[2.5] group-hover:rotate-12 transition-transform" />
          <span>Book Appointment</span>
          <span className="w-2 h-2 rounded-full bg-amber-300 animate-pulse"></span>
        </Link>
      </motion.div>

      {/* Scroll To Top Button */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.5, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.5, y: 10 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={scrollToTop}
            className="pointer-events-auto p-3 rounded-full bg-slate-900/90 dark:bg-white/90 text-white dark:text-slate-900 shadow-xl border border-slate-700 dark:border-slate-200 hover:bg-teal-600 dark:hover:bg-teal-400 dark:hover:text-white transition group"
            title="Scroll to Top"
          >
            <ArrowUp className="w-4 h-4 stroke-[2.5]" />
          </motion.button>
        )}
      </AnimatePresence>

    </div>
  );
};
