import React from 'react';
import { Link } from 'react-router-dom';
import {
  Cross, PhoneCall, Mail, MapPin, Clock, ExternalLink,
  ShieldCheck, HeartPulse, ChevronRight, Globe, Facebook, Youtube, Twitter, MessageSquare
} from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-gradient-to-b from-teal-950 via-slate-950 to-slate-900 text-slate-300 border-t border-teal-800/50 pt-16 pb-12 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* 4 Column Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-slate-800/80">

          {/* Col 1: About MOH Buttala with Official Logo */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-14 h-14 rounded-2xl bg-white p-1 flex items-center justify-center shadow-lg border border-teal-500/30 overflow-hidden shrink-0">
                <img
                  src="/moh_logo.png"
                  alt="MOH Office Buttala Official Logo"
                  className="w-full h-full object-contain"
                />
              </div>
              <div>
                <h3 className="font-extrabold text-lg text-white tracking-tight">
                  MOH Office – Buttala
                </h3>
                <p className="text-[11px] text-[#4DB6AC] font-bold">
                  සෙනෙහසේ සුව පියස • බුත්තල
                </p>
              </div>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed">
              Official government healthcare portal of the Medical Officer of Health (MOH) Office, Buttala Division. Dedicated to maternal & child care, disease surveillance, and community health.
            </p>

            <div className="pt-2">
              <div className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs font-bold shadow-xs">
                <PhoneCall className="w-4 h-4 text-rose-400 animate-pulse" />
                <span>24/7 Ambulance: <strong>1990</strong> (Suwa Seriya)</span>
              </div>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div className="space-y-4">
            <h4 className="font-extrabold text-sm text-white uppercase tracking-wider border-b border-teal-800/60 pb-2 inline-block">
              Quick Navigation
            </h4>
            <ul className="space-y-2.5 text-xs font-semibold">
              {[
                { label: 'Home', href: '/' },
                { label: 'About Us', href: '/about' },
                { label: 'Clinic Schedule', href: '/clinics' },
                { label: 'Health Education', href: '/articles' },
                { label: 'Vaccination Portal', href: '/vaccination' },
                { label: 'PHI Complaints & Issues', href: '/complaints' },
                { label: 'Dengue Surveillance GIS', href: '/surveillance' },
                { label: 'Contact Us', href: '/contact' }
              ].map((link, idx) => (
                <li key={idx}>
                  <Link
                    to={link.href}
                    className="flex items-center gap-2 text-slate-400 hover:text-[#4DB6AC] transition group"
                  >
                    <ChevronRight className="w-3.5 h-3.5 text-[#2E7D6B] group-hover:translate-x-1 transition-transform" />
                    <span>{link.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Ministry & Public Links */}
          <div className="space-y-4">
            <h4 className="font-extrabold text-sm text-white uppercase tracking-wider border-b border-teal-800/60 pb-2 inline-block">
              Government Links
            </h4>
            <ul className="space-y-2.5 text-xs font-semibold">
              {[
                { label: 'Ministry of Health Sri Lanka', href: 'https://www.health.gov.lk' },
                { label: 'Health Promotion Bureau (HPB)', href: 'https://hpb.health.gov.lk' },
                { label: 'Epidemiology Unit Sri Lanka', href: 'https://www.epid.gov.lk' },
                { label: 'Regional Director of Health (Monaragala)', href: 'https://www.rdhsmonaragala.lk' },
                { label: 'Uva Provincial Dept. of Health Services', href: '#' },
                { label: 'National Dengue Control Unit (NDCU)', href: 'https://dengue.health.gov.lk' }
              ].map((link, idx) => (
                <li key={idx}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-between text-slate-400 hover:text-[#4DB6AC] transition group"
                  >
                    <span className="flex items-center gap-2">
                      <ChevronRight className="w-3.5 h-3.5 text-[#4DB6AC] group-hover:translate-x-1 transition-transform" />
                      <span>{link.label}</span>
                    </span>
                    <ExternalLink className="w-3 h-3 text-slate-500 opacity-70 group-hover:opacity-100" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Contact Info & Social Media */}
          <div className="space-y-4">
            <h4 className="font-extrabold text-sm text-white uppercase tracking-wider border-b border-teal-800/60 pb-2 inline-block">
              MOH Office Buttala Contact
            </h4>

            <div className="space-y-3 text-xs text-slate-300 font-medium">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#4DB6AC] shrink-0 mt-0.5" />
                <span>Wellawaya Road, Buttala 91200, Monaragala District, Sri Lanka</span>
              </div>

              <div className="flex items-center gap-2.5">
                <PhoneCall className="w-4 h-4 text-[#4DB6AC] shrink-0" />
                <a href="tel:+94552273222" className="hover:text-[#4DB6AC] transition">+94 55 227 3222</a>
              </div>

              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#4DB6AC] shrink-0" />
                <a href="mailto:mohbuttala@health.gov.lk" className="hover:text-[#4DB6AC] transition">mohbuttala@health.gov.lk</a>
              </div>

              <div className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-[#4DB6AC] shrink-0" />
                <span>Mon - Fri: 8:00 AM - 4:00 PM</span>
              </div>
            </div>

            {/* Social Media Links */}
            <div className="pt-2">
              <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">Connect With Us</p>
              <div className="flex items-center gap-2">
                {[
                  { icon: Facebook, label: 'Facebook', href: '#' },
                  { icon: Youtube, label: 'YouTube', href: '#' },
                  { icon: Twitter, label: 'Twitter', href: '#' },
                  { icon: MessageSquare, label: 'WhatsApp Channel', href: '#' }
                ].map((s, i) => {
                  const SIcon = s.icon;
                  return (
                    <a
                      key={i}
                      href={s.href}
                      title={s.label}
                      className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-[#4DB6AC] hover:bg-[#2E7D6B]/40 hover:border-teal-700 transition"
                    >
                      <SIcon className="w-4 h-4" />
                    </a>
                  );
                })}
              </div>
            </div>

          </div>

        </div>

        {/* Bottom Legal & Copyright Bar with Small Official Logo */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500 font-medium">
          <div className="flex items-center gap-3 text-slate-400">
            <div className="w-6 h-6 rounded-md bg-white p-0.5 flex items-center justify-center shrink-0 border border-slate-700">
              <img src="/moh_logo.png" alt="MOH Emblem" className="w-full h-full object-contain" />
            </div>
            <span>Official Portal of Medical Officer of Health (MOH) — Buttala Division</span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 text-slate-400">
            <Link to="/privacy" className="hover:text-[#4DB6AC] transition">Privacy Policy</Link>
            <span>•</span>
            <Link to="/terms" className="hover:text-[#4DB6AC] transition">Disclaimer</Link>
            <span>•</span>
            <span className="hover:text-[#4DB6AC] cursor-pointer transition">Accessibility</span>
          </div>

          <div>
            © {new Date().getFullYear()} MOH Office Buttala. All Rights Reserved.
          </div>
        </div>

      </div>
    </footer>
  );
};
