import React, { useState } from 'react';
import { HelpCircle, ChevronDown, Search } from 'lucide-react';

export const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(0);

  const faqs = [
    {
      q: "How do I book an MOH clinic consultation online?",
      a: "Navigate to the 'Book Appointment' page, select your MOH division, choose your doctor and service category, select a date & slot, and enter your NIC to receive a digital QR ticket pass."
    },
    {
      q: "What should I do immediately if I suspect Dengue fever?",
      a: "If fever lasts more than 48 hours, obtain a Full Blood Count (FBC) blood test. Drink ORS, Jeevani, or king coconut water. Avoid taking aspirin, ibuprofen, or mefenamic acid as they increase bleeding risks."
    },
    {
      q: "How can I report stagnant water or mosquito breeding sites to my PHI?",
      a: "Use our PHI Complaints portal. You can pin the GPS location on the map, upload photo evidence, and receive a tracking code to monitor inspection progress."
    },
    {
      q: "Are vaccines provided at MOH clinics free of charge?",
      a: "Yes! All vaccines included under Sri Lanka's National Immunization Program (BCG, Pentavalent, OPV, MMR, JE, HPV, aTd) are provided 100% free of charge at all MOH clinics islandwide."
    },
    {
      q: "How do I contact Suwa Seriya ambulance in an emergency?",
      a: "Dial 1990 toll-free from any mobile phone or landline in Sri Lanka for 24/7 emergency medical dispatch."
    }
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <div className="text-center space-y-2">
        <span className="px-3 py-1 rounded-full bg-moh-100 dark:bg-moh-900/60 text-moh-700 dark:text-moh-300 font-bold text-xs uppercase tracking-wider">
          Frequently Asked Questions
        </span>
        <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          MOH Sri Lanka Help & FAQ Center
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
          Find answers to common questions about clinic appointments, Dengue care, vaccines, and PHI services.
        </p>
      </div>

      <div className="space-y-4">
        {faqs.map((faq, idx) => (
          <div key={idx} className="bg-white dark:bg-slate-800 rounded-3xl border border-slate-200 dark:border-slate-700 overflow-hidden shadow-sm">
            <button
              onClick={() => setOpenIndex(openIndex === idx ? -1 : idx)}
              className="w-full p-5 text-left font-bold text-slate-900 dark:text-white text-sm sm:text-base flex justify-between items-center gap-4"
            >
              <span>{faq.q}</span>
              <ChevronDown className={`w-5 h-5 transition-transform ${openIndex === idx ? 'rotate-180 text-moh-600' : 'text-slate-400'}`} />
            </button>
            {openIndex === idx && (
              <div className="px-5 pb-5 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed border-t border-slate-100 dark:border-slate-700/60 pt-3">
                {faq.a}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
