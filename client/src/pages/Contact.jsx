import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle2 } from 'lucide-react';

export const Contact = () => {
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <div className="text-center space-y-2 max-w-3xl mx-auto">
        <span className="px-3 py-1 rounded-full bg-moh-100 dark:bg-moh-900/60 text-moh-700 dark:text-moh-300 font-bold text-xs uppercase tracking-wider">
          Official Inquiries
        </span>
        <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Contact Ministry of Health Headquarters
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
          Have an inquiry, feedback, or administrative message for the MOH head office? Reach out below.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Contact Details */}
        <div className="lg:col-span-5 bg-slate-900 text-white p-8 rounded-3xl space-y-6 shadow-xl">
          <h3 className="font-extrabold text-lg text-white">Headquarters Information</h3>
          
          <div className="space-y-4 text-xs">
            <div className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-moh-400 shrink-0 mt-0.5" />
              <div>
                <b className="block text-slate-200">Address:</b>
                <span className="text-slate-400">385, Baddegama Wimalawansa Mawatha, Colombo 10, Sri Lanka</span>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Phone className="w-5 h-5 text-moh-400 shrink-0 mt-0.5" />
              <div>
                <b className="block text-slate-200">Phone Hotlines:</b>
                <span className="text-slate-400">+94 11 269 4033 / +94 11 269 5112</span>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Mail className="w-5 h-5 text-moh-400 shrink-0 mt-0.5" />
              <div>
                <b className="block text-slate-200">Official Email:</b>
                <span className="text-slate-400">info@health.gov.lk</span>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="lg:col-span-7 bg-white dark:bg-slate-800 p-8 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-xl">
          {!submitted ? (
            <form onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Your Full Name:</label>
                <input required type="text" placeholder="e.g. Nimal Perera" className="w-full p-3 bg-slate-50 dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-700" />
              </div>
              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Email Address:</label>
                <input required type="email" placeholder="nimal@example.com" className="w-full p-3 bg-slate-50 dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-700" />
              </div>
              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Message Subject:</label>
                <input required type="text" placeholder="Clinic schedule inquiry..." className="w-full p-3 bg-slate-50 dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-700" />
              </div>
              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Detailed Message:</label>
                <textarea required rows="4" placeholder="Write your inquiry..." className="w-full p-3 bg-slate-50 dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-700"></textarea>
              </div>

              <button type="submit" className="w-full py-3.5 bg-moh-600 hover:bg-moh-700 text-white rounded-2xl font-bold flex items-center justify-center gap-2 shadow-md">
                <span>Send Message to MOH HQ</span>
                <Send className="w-4 h-4" />
              </button>
            </form>
          ) : (
            <div className="text-center py-12 space-y-3">
              <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto" />
              <h3 className="font-extrabold text-xl text-slate-900 dark:text-white">Message Delivered</h3>
              <p className="text-xs text-slate-500">Thank you. An MOH officer will review your inquiry within 24 hours.</p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
