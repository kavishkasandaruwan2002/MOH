import React from 'react';
import { Link } from 'react-router-dom';
import { Cross, PhoneCall, Mail, MapPin, ShieldCheck, Heart, ExternalLink } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-slate-900 text-slate-300 pt-12 pb-8 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          
          {/* Col 1: Brand & Ministry Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-moh-600 to-teal-400 flex items-center justify-center text-white font-bold shadow-lg">
                <Cross className="w-6 h-6 stroke-[2.5]" />
              </div>
              <div>
                <h3 className="font-extrabold text-white text-lg tracking-tight">MOH SRI LANKA</h3>
                <p className="text-xs text-slate-400">Medical Officer of Health Office Portal</p>
              </div>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              Official public health management portal for Sri Lanka MOH divisions. Dedicated to maternal care, vector-borne disease surveillance, immunization tracking, and community healthcare.
            </p>
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Verified Ministry of Health Infrastructure</span>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div>
            <h4 className="font-bold text-white text-sm mb-3 uppercase tracking-wider text-moh-400">Services</h4>
            <ul className="space-y-2 text-xs">
              <li><Link to="/clinics" className="hover:text-white transition">MOH Clinic Search</Link></li>
              <li><Link to="/appointments" className="hover:text-white transition">Book Appointment</Link></li>
              <li><Link to="/vaccination" className="hover:text-white transition">Immunization Schedule</Link></li>
              <li><Link to="/complaints" className="hover:text-white transition">PHI Complaint Submission</Link></li>
              <li><Link to="/surveillance" className="hover:text-white transition">Dengue Disease Map</Link></li>
            </ul>
          </div>

          {/* Col 3: Resources */}
          <div>
            <h4 className="font-bold text-white text-sm mb-3 uppercase tracking-wider text-moh-400">Resources</h4>
            <ul className="space-y-2 text-xs">
              <li><Link to="/articles" className="hover:text-white transition">Health Library & Tips</Link></li>
              <li><Link to="/downloads" className="hover:text-white transition">Public Health Forms (PDF)</Link></li>
              <li><Link to="/staff" className="hover:text-white transition">Staff Directory & PHIs</Link></li>
              <li><Link to="/faq" className="hover:text-white transition">Frequently Asked Questions</Link></li>
              <li><Link to="/about" className="hover:text-white transition">About MOH Division</Link></li>
            </ul>
          </div>

          {/* Col 4: Emergency Contact */}
          <div>
            <h4 className="font-bold text-white text-sm mb-3 uppercase tracking-wider text-rose-400">Hotlines</h4>
            <ul className="space-y-2.5 text-xs">
              <li className="flex items-center gap-2 text-rose-300 font-bold bg-rose-950/40 p-2 rounded-lg border border-rose-900/50">
                <PhoneCall className="w-4 h-4 text-rose-400 animate-pulse" />
                <span>1990 Suwa Seriya Ambulance</span>
              </li>
              <li className="flex items-center gap-2">
                <PhoneCall className="w-3.5 h-3.5 text-moh-400" />
                <span>+94 11 269 5112 (Epidemiology)</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-moh-400" />
                <span>info@health.gov.lk</span>
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-moh-400" />
                <span>385, Baddegama Wimalawansa Mawatha, Colombo 10</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© 2026 Ministry of Health Sri Lanka. All Rights Reserved.</p>
          <div className="flex items-center gap-6">
            <Link to="/privacy" className="hover:text-slate-300">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-slate-300">Terms of Service</Link>
            <span className="flex items-center gap-1 text-slate-400">
              Built with <Heart className="w-3 h-3 text-rose-500 fill-rose-500" /> for Sri Lankan Public Health
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
