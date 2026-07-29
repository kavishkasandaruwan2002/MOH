import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { InteractiveGISMap } from '../components/map/InteractiveGISMap';
import { SymptomCheckerModal } from '../components/ai/SymptomCheckerModal';
import { seedClinics, seedNews, seedEmergencyNumbers, seedHotspots } from '../data/mohSeedData.js';
import {
  Cross, Calendar, ShieldAlert, Syringe, Activity,
  ArrowRight, PhoneCall, CheckCircle, Sparkles, AlertTriangle,
  ChevronRight, Stethoscope, Users, MapPin, Search, BookOpen, Download,
  HeartPulse, Shield, ChevronDown
} from 'lucide-react';

export const Home = () => {
  const { t } = useLanguage();
  const [symptomModalOpen, setSymptomModalOpen] = useState(false);
  const [activeFaq, setActiveFaq] = useState(0);

  const stats = [
    { label: t('vaccinesGiven'), value: "98.4%", desc: "Childhood Immunization Rate", color: "from-emerald-500 to-teal-600", shadow: "shadow-emerald-500/20" },
    { label: t('activeClinics'), value: "350+", desc: "Islandwide Divisions", color: "from-blue-500 to-cyan-600", shadow: "shadow-blue-500/20" },
    { label: t('dengueHotspots'), value: "12 Zones", desc: "Active Vector Surveillance", color: "from-rose-500 to-pink-600", shadow: "shadow-rose-500/20" },
    { label: "Issues Resolved", value: "1,840+", desc: "PHI Community Inspections", color: "from-amber-500 to-orange-600", shadow: "shadow-amber-500/20" }
  ];

  const quickServices = [
    { title: "Book Clinic Slot", desc: "Schedule prenatal, child health, or general MOH medical consultation", icon: Calendar, link: "/appointments", badge: "Online Pass", color: "from-teal-500 to-emerald-600" },
    { title: "Vaccination Portal", desc: "View national immunization schedules and download digital vaccine card", icon: Syringe, link: "/vaccination", badge: "Verified Card", color: "from-blue-500 to-indigo-600" },
    { title: "Report Environmental Issue", desc: "Submit stagnant water or illegal garbage complaints directly to your PHI", icon: ShieldAlert, link: "/complaints", badge: "GPS Pin", color: "from-amber-500 to-orange-600" },
    { title: "Dengue GIS Surveillance", desc: "Interactive map tracking high-risk vector zones and fogging schedules", icon: Activity, link: "/surveillance", badge: "Live GIS", color: "from-rose-500 to-pink-600" },
    { title: "Health Articles & Advice", desc: "MOH verified guides on Dengue prevention, nutrition, and maternal care", icon: BookOpen, link: "/articles", badge: "Doctor Verified", color: "from-emerald-500 to-teal-600" },
    { title: "Public Downloads", desc: "Download immunization charts, MOH form templates, and brochures", icon: Download, link: "/downloads", badge: "PDF Forms", color: "from-indigo-500 to-purple-600" }
  ];

  const faqs = [
    { q: "How do I book an MOH clinic consultation online?", a: "Go to the Book Appointment page, select your MOH division, choose your doctor and service category, select a date & slot, and enter your NIC to receive a digital QR ticket pass instantly." },
    { q: "What should I do immediately if I suspect Dengue fever?", a: "If fever lasts more than 48 hours, obtain a Full Blood Count (FBC) blood test. Drink ORS, Jeevani, or king coconut water. Avoid taking aspirin, ibuprofen, or mefenamic acid." },
    { q: "How can I report stagnant water or mosquito breeding sites to my PHI?", a: "Use our PHI Complaints portal. You can pin the GPS location on the map, upload photo evidence, and receive a tracking code to monitor inspection progress." },
    { q: "Are vaccines provided at MOH clinics free of charge?", a: "Yes! All vaccines under Sri Lanka's National Immunization Program (BCG, Pentavalent, OPV, MMR, JE, HPV, aTd) are 100% free at all MOH clinics." }
  ];

  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.6 }
  };

  const staggerContainer = {
    initial: {},
    whileInView: { transition: { staggerChildren: 0.1 } },
    viewport: { once: true }
  };

  return (
    <div className="space-y-16 pb-20 overflow-hidden gradient-mesh">

      {/* Hero Section - Light & Dark Mode Adaptive */}
      <section className="relative overflow-hidden pt-12 pb-20 bg-gradient-to-br from-emerald-50/90 via-teal-50/40 to-slate-50 dark:from-slate-950 dark:via-moh-950 dark:to-slate-900 border-b border-slate-200/60 dark:border-slate-800/80 transition-colors duration-300">

        {/* Glow Blobs Background */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-teal-500/15 rounded-full blur-3xl animate-pulse-glow pointer-events-none"></div>
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-rose-500/10 rounded-full blur-3xl animate-pulse-glow pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

            {/* Hero Left Content */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="lg:col-span-7 space-y-6"
            >

              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-teal-500/10 dark:bg-teal-400/10 border border-teal-500/30 text-xs font-extrabold text-teal-800 dark:text-teal-300 shadow-xs">
                <Sparkles className="w-4 h-4 text-amber-500 fill-amber-500 animate-spin" />
                <span>Smart Public Health System Sri Lanka</span>
              </div>

              <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight leading-tight text-slate-900 dark:text-white">
                Empowering Sri Lanka's <span className="bg-gradient-to-r from-moh-700 via-teal-600 to-emerald-600 dark:from-teal-300 dark:via-emerald-300 dark:to-cyan-300 bg-clip-text text-transparent">Health & Wellbeing</span>
              </h1>

              <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed font-normal max-w-2xl">
                {t('heroSubtitle')}
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                  <Link
                    to="/appointments"
                    className="px-7 py-4 rounded-2xl bg-gradient-to-r from-moh-600 to-teal-600 hover:from-moh-700 hover:to-teal-700 text-white font-extrabold text-sm shadow-xl shadow-moh-600/30 transition-all flex items-center gap-2.5"
                  >
                    <Calendar className="w-5 h-5 stroke-[2.5]" />
                    <span>{t('bookAppointmentBtn')}</span>
                  </Link>
                </motion.div>

                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => setSymptomModalOpen(true)}
                  className="px-6 py-4 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200/90 dark:border-slate-700 text-slate-800 dark:text-white hover:bg-slate-50 dark:hover:bg-slate-700 font-extrabold text-sm transition-all flex items-center gap-2 shadow-md"
                >
                  <Stethoscope className="w-5 h-5 text-teal-600 dark:text-teal-400" />
                  <span>AI Symptom Checker</span>
                </motion.button>

                <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                  <Link
                    to="/complaints"
                    className="px-6 py-4 rounded-2xl bg-amber-500/10 dark:bg-amber-500/20 border border-amber-400/40 text-amber-900 dark:text-amber-300 hover:bg-amber-500/20 font-extrabold text-sm transition-all flex items-center gap-2 shadow-xs"
                  >
                    <ShieldAlert className="w-5 h-5 text-amber-600 dark:text-amber-400" />
                    <span>{t('reportIssueBtn')}</span>
                  </Link>
                </motion.div>
              </div>

              {/* Emergency Quick Hotlines Strip */}
              <div className="pt-4 flex items-center gap-4 text-xs font-semibold">
                <span className="flex items-center gap-2 text-rose-700 dark:text-rose-300 font-extrabold bg-rose-50 dark:bg-rose-950/60 px-4 py-2 rounded-2xl border border-rose-200 dark:border-rose-800 shadow-xs animate-pulse">
                  <PhoneCall className="w-4 h-4 text-rose-600 dark:text-rose-400" />
                  EMERGENCY HOTLINE: 1990
                </span>
                <span className="hidden sm:inline text-slate-500 dark:text-slate-400 font-medium">Free 24/7 Islandwide Suwa Seriya Ambulance</span>
              </div>

            </motion.div>

            {/* Hero Right Widget - Live MOH Desk */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="lg:col-span-5"
            >
              <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl p-7 rounded-3xl border border-slate-200/80 dark:border-slate-800/80 text-slate-900 dark:text-white space-y-6 shadow-2xl relative animate-float">

                <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-2xl bg-teal-500/10 dark:bg-teal-500/20 border border-teal-500/30 flex items-center justify-center text-teal-600 dark:text-teal-300 font-bold shadow-xs">
                      <Cross className="w-6 h-6 stroke-[2.5]" />
                    </div>
                    <div>
                      <h3 className="font-extrabold text-base text-slate-900 dark:text-white">Live MOH Operational Desk</h3>
                      <p className="text-xs text-teal-700 dark:text-teal-300 font-extrabold">Western & Central Provinces</p>
                    </div>
                  </div>
                  <span className="w-3 h-3 rounded-full bg-emerald-500 animate-ping"></span>
                </div>

                <div className="space-y-3 text-xs">
                  <div className="flex justify-between items-center bg-slate-50/90 dark:bg-slate-800/70 p-4 rounded-2xl border border-slate-200/70 dark:border-slate-700/60">
                    <span className="text-slate-700 dark:text-slate-200 font-extrabold">Today's Dengue Alert Level:</span>
                    <span className="px-3 py-1 rounded-xl bg-rose-600 text-white font-black text-xs shadow-xs">
                      HIGH - MONSOON
                    </span>
                  </div>

                  <div className="flex justify-between items-center bg-slate-50/90 dark:bg-slate-800/70 p-4 rounded-2xl border border-slate-200/70 dark:border-slate-700/60">
                    <span className="text-slate-700 dark:text-slate-200 font-extrabold">Available Clinic Slots Today:</span>
                    <span className="text-teal-700 dark:text-teal-300 font-black text-sm">142 Slots Open</span>
                  </div>

                  <div className="flex justify-between items-center bg-slate-50/90 dark:bg-slate-800/70 p-4 rounded-2xl border border-slate-200/70 dark:border-slate-700/60">
                    <span className="text-slate-700 dark:text-slate-200 font-extrabold">PHI On-Duty Officers:</span>
                    <span className="text-emerald-700 dark:text-emerald-300 font-black text-sm">84 Officers Active</span>
                  </div>
                </div>

                <Link
                  to="/clinics"
                  className="w-full py-3.5 bg-gradient-to-r from-moh-600 to-teal-600 hover:from-moh-700 hover:to-teal-700 text-white rounded-2xl font-extrabold text-xs flex items-center justify-center gap-2 shadow-lg shadow-moh-600/25 transition"
                >
                  <span>Explore MOH Clinic Schedule</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* Health Statistics Cards */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 relative z-20">
        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="whileInView"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
        >
          {stats.map((s, idx) => (
            <motion.div
              key={idx}
              variants={fadeInUp}
              whileHover={{ y: -6, scale: 1.02 }}
              className={`bg-white dark:bg-slate-800 p-6 rounded-3xl shadow-lg ${s.shadow} border border-slate-200/80 dark:border-slate-700/80 transition-all duration-300 group`}
            >
              <div className={`w-13 h-13 rounded-2xl bg-gradient-to-tr ${s.color} text-white flex items-center justify-center font-extrabold text-xl mb-4 shadow-md group-hover:scale-110 transition-transform`}>
                <Cross className="w-6 h-6 stroke-[2.5]" />
              </div>
              <div className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                {s.value}
              </div>
              <div className="font-bold text-xs text-moh-700 dark:text-moh-300 mt-1">
                {s.label}
              </div>
              <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                {s.desc}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Quick Services Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div {...fadeInUp} className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <span className="px-4 py-1.5 rounded-full bg-moh-100 dark:bg-moh-900/60 text-moh-700 dark:text-moh-300 font-bold text-xs uppercase tracking-wider border border-moh-200 dark:border-moh-700">
            Public Healthcare Access
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Key MOH Digital Services
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-sm">
            Streamlined digital access for citizens, mothers, and healthcare workers across Sri Lanka.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
          {quickServices.map((srv, idx) => {
            const Icon = srv.icon;
            return (
              <motion.div
                key={idx}
                {...fadeInUp}
                whileHover={{ y: -6, scale: 1.01 }}
                transition={{ duration: 0.3 }}
              >
                <Link
                  to={srv.link}
                  className="bg-white dark:bg-slate-800 p-7 rounded-3xl shadow-md hover:shadow-xl border border-slate-200/80 dark:border-slate-700/80 transition-all duration-300 group flex flex-col justify-between h-full relative overflow-hidden"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className={`w-13 h-13 rounded-2xl bg-gradient-to-tr ${srv.color} text-white flex items-center justify-center shadow-md group-hover:scale-110 transition-transform`}>
                        <Icon className="w-6 h-6 stroke-[2.5]" />
                      </div>
                      <span className="px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 font-extrabold text-[10px] uppercase border border-slate-200 dark:border-slate-600">
                        {srv.badge}
                      </span>
                    </div>

                    <h3 className="font-extrabold text-slate-900 dark:text-white text-lg group-hover:text-moh-600 dark:group-hover:text-moh-400 transition">
                      {srv.title}
                    </h3>
                    <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                      {srv.desc}
                    </p>
                  </div>

                  <div className="mt-8 flex items-center gap-2 text-xs font-extrabold text-moh-600 dark:text-moh-400 group-hover:gap-3 transition-all pt-4 border-t border-slate-100 dark:border-slate-700/60">
                    <span>Access Portal</span>
                    <ChevronRight className="w-4 h-4" />
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* GIS Dengue & Disease Map Preview Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div {...fadeInUp} className="bg-slate-900 text-white rounded-3xl p-8 sm:p-10 shadow-2xl relative overflow-hidden space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-6">
            <div>
              <span className="px-3.5 py-1 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/30 text-xs font-bold uppercase tracking-wider">
                GIS Live Surveillance
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-2">
                Sri Lanka Dengue Risk & MOH Clinic Map
              </h2>
              <p className="text-xs sm:text-sm text-slate-400">
                Interactive real-time map tracking high-risk breeding zones, MOH clinics, and PHI field complaints.
              </p>
            </div>
            <Link
              to="/surveillance"
              className="px-6 py-3 bg-moh-600 hover:bg-moh-500 text-white text-xs font-bold rounded-2xl flex items-center gap-2 shrink-0 transition shadow-lg"
            >
              <span>Full Screen GIS Dashboard</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <InteractiveGISMap height="460px" />
        </motion.div>
      </section>

      {/* Latest Health Alerts & News */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div {...fadeInUp} className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              MOH Notices & Dengue Alerts
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
              Official press releases, health advisories, and national campaigns.
            </p>
          </div>
          <Link to="/articles" className="text-xs font-bold text-moh-600 dark:text-moh-400 hover:underline">
            View All Articles →
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
          {seedNews.map(item => (
            <motion.div
              key={item.id}
              {...fadeInUp}
              whileHover={{ y: -6 }}
              className="bg-white dark:bg-slate-800 rounded-3xl overflow-hidden shadow-md hover:shadow-xl border border-slate-200/80 dark:border-slate-700/80 transition-all group flex flex-col justify-between"
            >
              <div className="h-48 relative overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                {item.important && (
                  <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-rose-600 text-white font-extrabold text-[10px] uppercase shadow-md flex items-center gap-1">
                    <AlertTriangle className="w-3 h-3" />
                    High Priority
                  </span>
                )}
              </div>
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <span className="text-[11px] font-bold text-moh-600 dark:text-moh-400 uppercase tracking-wider">
                    {item.category} • {item.date}
                  </span>
                  <h3 className="font-extrabold text-slate-900 dark:text-white text-base mt-1.5 leading-snug line-clamp-2">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-400 mt-2 line-clamp-3 leading-relaxed">
                    {item.summary}
                  </p>
                </div>
                <Link
                  to="/articles"
                  className="pt-3 text-xs font-extrabold text-moh-600 dark:text-moh-400 flex items-center gap-1 hover:gap-2 transition-all border-t border-slate-100 dark:border-slate-700/60"
                >
                  <span>Read Full Notice</span>
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* FAQ Accordion Section */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div {...fadeInUp} className="text-center space-y-3 mb-10">
          <span className="px-4 py-1.5 rounded-full bg-moh-100 dark:bg-moh-900/60 text-moh-700 dark:text-moh-300 font-bold text-xs uppercase tracking-wider border border-moh-200 dark:border-moh-700">
            Got Questions?
          </span>
          <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Frequently Asked Questions
          </h2>
        </motion.div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <motion.div
              key={idx}
              {...fadeInUp}
              className="bg-white dark:bg-slate-800 rounded-3xl border border-slate-200/80 dark:border-slate-700/80 overflow-hidden shadow-xs hover:shadow-md transition"
            >
              <button
                type="button"
                onClick={() => setActiveFaq(activeFaq === idx ? -1 : idx)}
                className="w-full p-6 text-left font-bold text-slate-900 dark:text-white text-base flex justify-between items-center gap-4"
              >
                <span>{faq.q}</span>
                <ChevronDown className={`w-5 h-5 transition-transform duration-300 ${activeFaq === idx ? 'rotate-180 text-moh-600' : 'text-slate-400'}`} />
              </button>
              {activeFaq === idx && (
                <div className="px-6 pb-6 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed border-t border-slate-100 dark:border-slate-700/60 pt-4 animate-in fade-in duration-200">
                  {faq.a}
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </section>

      {/* AI Symptom Checker Trigger Modal */}
      <SymptomCheckerModal
        isOpen={symptomModalOpen}
        onClose={() => setSymptomModalOpen(false)}
      />

    </div>
  );
};
