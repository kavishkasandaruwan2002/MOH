import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import { useLanguage } from '../../context/LanguageContext';
import { useAccessibility } from '../../context/AccessibilityContext';
import { VisionMissionModal } from '../common/VisionMissionModal';
import { 
  Cross, Calendar, ShieldAlert, Syringe, FileText, 
  Activity, PhoneCall, LayoutDashboard, Sun, Moon, 
  Globe, Menu, X, User, LogOut, HeartPulse, BookOpen, Search, Sparkles,
  Phone, Mail, Clock, ChevronDown, ChevronRight, Type, Contrast, MapPin, Grid, Image, Info, Award, Users, Target, Shield, Stethoscope, LogIn
} from 'lucide-react';

export const Header = () => {
  const { user, logout } = useAuth();
  const { darkMode, toggleTheme } = useTheme();
  const { lang, setLang, t } = useLanguage();
  const { fontSize, setFontSize, highContrast, setHighContrast } = useAccessibility();
  const location = useLocation();
  const navigate = useNavigate();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [aboutDropdownOpen, setAboutDropdownOpen] = useState(false);
  const [servicesMegaOpen, setServicesMegaOpen] = useState(false);
  const [mobileAboutExpanded, setMobileAboutExpanded] = useState(false);
  const [mobileServicesExpanded, setMobileServicesExpanded] = useState(false);

  // Vision & Mission Modal State
  const [visionModalOpen, setVisionModalOpen] = useState(false);

  // Search Bar state (Expandable inline search)
  const [searchExpanded, setSearchExpanded] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const searchInputRef = useRef(null);

  // Scroll state for sticky navbar blur & shadow
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 15) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (searchExpanded && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [searchExpanded]);

  const languages = [
    { code: 'en', name: 'English', short: 'EN' },
    { code: 'si', name: 'සිංහල', short: 'SI' },
    { code: 'ta', name: 'தமிழ்', short: 'TA' }
  ];

  // About Us Submenu Items
  const aboutItems = [
    { title: 'Vision & Mission', desc: 'Our core health objectives & public mandate', path: '/about#vision', isModalTrigger: true, icon: Target },
    { title: 'MOH Area Profile', desc: 'Demographics & health statistics of Buttala', path: '/about#profile', icon: MapPin },
    { title: 'Our Team', desc: 'Medical officers, SPHI, and nursing staff', path: '/staff', icon: Users }
  ];

  // Mega Dropdown Services Items with Icons
  const megaServices = [
    { title: 'Maternal & Child Health', desc: 'Prenatal, postnatal care & child growth clinics', path: '/clinics', icon: HeartPulse, badge: 'Daily' },
    { title: 'Immunization', desc: 'Free national childhood vaccine schedules', path: '/vaccination', icon: Syringe, badge: 'Free' },
    { title: 'NCD Clinic', desc: 'Screening for Diabetes, Hypertension & BMI', path: '/clinics', icon: Activity, badge: 'Weekly' },
    { title: 'Dental Clinic', desc: 'Oral health exams & school dental care', path: '/clinics', icon: Award, badge: 'Dental' },
    { title: 'School Health', desc: 'Annual medical inspections across 34 schools', path: '/articles', icon: Users, badge: 'Community' },
    { title: 'Dengue Prevention', desc: 'GIS vector mapping & community PHI inspections', path: '/surveillance', icon: ShieldAlert, badge: 'Alerts' }
  ];

  const navLinks = [
    { path: '/', label: 'Home', isExact: true },
    { path: '/about', label: 'About Us', hasDropdown: 'about' },
    { path: '/services', label: 'Services', hasMega: true },
    { path: '/clinics', label: 'Clinic Schedule' },
    { path: '/articles', label: 'Health Education' },
    { path: '/#announcements', label: 'News & Events' },
    { path: '/#gallery', label: 'Gallery' },
    { path: '/contact', label: 'Contact Us' }
  ];

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    setSearchExpanded(false);
    navigate(`/clinics?search=${encodeURIComponent(searchQuery)}`);
  };

  const handleLinkClick = (path, isModalTrigger = false) => {
    setMobileMenuOpen(false);
    setAboutDropdownOpen(false);
    setServicesMegaOpen(false);

    if (isModalTrigger || path === '/about#vision') {
      setVisionModalOpen(true);
      return;
    }

    if (path.includes('#')) {
      const [targetPath, hash] = path.split('#');
      const isCurrentPage = location.pathname === targetPath || (targetPath === '' && path.startsWith('#'));
      
      if (isCurrentPage) {
        const elem = document.getElementById(hash) || document.getElementById('moh-area-profile');
        if (elem) {
          elem.scrollIntoView({ behavior: 'smooth', block: 'start' });
          return;
        }
      }
      navigate(path);
      return;
    }

    navigate(path);
  };

  return (
    <>
      {/* ------------------------------------------------------------- */}
      {/* 1. TOP SLIM BAR (With Official Sri Lanka Emblem Pill Badge) */}
      {/* ------------------------------------------------------------- */}
      <div className="bg-slate-100 dark:bg-slate-950 text-slate-700 dark:text-slate-200 text-xs py-2 px-4 border-b border-slate-200/90 dark:border-slate-800 transition-colors duration-300 font-sans">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-stretch md:items-center justify-between gap-2">
          
          {/* Left: Government of Sri Lanka official emblem & text pill */}
          <div className="flex min-w-0 flex-wrap items-center justify-center md:justify-start gap-2.5 font-semibold text-[11px] sm:text-xs">
            <span className="inline-flex min-w-0 items-center gap-2 px-3 py-1 rounded-full bg-[#2E7D6B]/15 text-[#2E7D6B] dark:text-[#4DB6AC] font-bold border border-[#2E7D6B]/30 shadow-xs">
              <Shield className="w-3.5 h-3.5 text-[#2E7D6B] dark:text-[#4DB6AC]" />
              <span className="truncate">Government of Sri Lanka</span>
            </span>
            <span className="hidden sm:inline text-slate-400">•</span>
            <span className="hidden sm:inline font-medium text-slate-600 dark:text-slate-300">
              Ministry of Health — Monaragala District
            </span>
          </div>

          {/* Right: Language switch, Contact details & Accessibility */}
          <div className="flex min-w-0 flex-wrap items-center justify-center md:justify-end gap-2 sm:gap-5 text-[11px] font-medium">
            
            {/* Sinhala | Tamil | English Language Switch */}
            <div className="hidden sm:flex items-center gap-1 bg-white dark:bg-slate-900 px-2 py-0.5 rounded-full border border-slate-200 dark:border-slate-700 shadow-xs">
              <Globe className="w-3 h-3 text-[#2E7D6B] dark:text-[#4DB6AC]" />
              {languages.map((l, idx) => (
                <React.Fragment key={l.code}>
                  <button
                    onClick={() => setLang(l.code)}
                    className={`px-1.5 py-0.5 rounded transition font-bold ${
                      lang === l.code
                        ? 'bg-[#2E7D6B] text-white shadow-xs'
                        : 'text-slate-600 dark:text-slate-300 hover:text-[#2E7D6B]'
                    }`}
                  >
                    {l.name}
                  </button>
                  {idx < languages.length - 1 && <span className="text-slate-300 dark:text-slate-700">|</span>}
                </React.Fragment>
              ))}
            </div>

            {/* Phone */}
            <a href="tel:+94552273222" className="hidden lg:flex items-center gap-1.5 hover:text-[#2E7D6B] dark:hover:text-[#4DB6AC] transition">
              <Phone className="w-3.5 h-3.5 text-[#2E7D6B] dark:text-[#4DB6AC]" />
              <span>+94 55 227 3222</span>
            </a>

            {/* Email */}
            <a href="mailto:mohbuttala@health.gov.lk" className="hidden xl:flex items-center gap-1.5 hover:text-[#2E7D6B] dark:hover:text-[#4DB6AC] transition">
              <Mail className="w-3.5 h-3.5 text-[#2E7D6B] dark:text-[#4DB6AC]" />
              <span>mohbuttala@health.gov.lk</span>
            </a>

            {/* Office Hours */}
            <div className="hidden lg:flex items-center gap-1.5 text-slate-500 dark:text-slate-400 border-l border-slate-200 dark:border-slate-800 pl-3">
              <Clock className="w-3.5 h-3.5 text-[#4DB6AC]" />
              <span>Mon–Fri 8:00AM–4:00PM</span>
            </div>

            {/* Accessibility Increase Text Size Button */}
            <div className="flex items-center gap-1 bg-white dark:bg-slate-900 px-2 py-0.5 rounded-full border border-slate-200 dark:border-slate-700" title="Accessibility Font Size Controls">
              <Type className="w-3 h-3 text-[#2E7D6B] dark:text-[#4DB6AC]" />
              <button 
                onClick={() => setFontSize('normal')} 
                className={`px-1 text-[11px] rounded ${fontSize === 'normal' ? 'bg-[#2E7D6B] font-bold text-white' : 'text-slate-500 hover:text-slate-900'}`}
              >
                A
              </button>
              <button 
                onClick={() => setFontSize('large')} 
                className={`px-1 text-[11px] rounded ${fontSize === 'large' ? 'bg-[#2E7D6B] font-bold text-white' : 'text-slate-500 hover:text-slate-900'}`}
              >
                A+
              </button>
              <button 
                onClick={() => setFontSize('xlarge')} 
                className={`px-1 text-[11px] rounded ${fontSize === 'xlarge' ? 'bg-[#2E7D6B] font-bold text-white' : 'text-slate-500 hover:text-slate-900'}`}
              >
                A++
              </button>
            </div>

          </div>

        </div>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* 2. MAIN NAVBAR (Sticky with Sign In Button & CTAs) */}
      {/* ------------------------------------------------------------- */}
      <header className={`sticky top-0 z-40 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/95 dark:bg-slate-900/95 backdrop-blur-md shadow-md border-b border-slate-200/80 dark:border-slate-800' 
          : 'bg-white dark:bg-slate-900 border-b border-slate-200/60 dark:border-slate-800'
      }`}>
        <div className="max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-2 h-16 sm:h-20">

            {/* Left: MOH Office Buttala Logo & Titles */}
            <Link to="/" className="flex min-w-0 items-center gap-2 xl:gap-2.5 2xl:gap-3 group py-1">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="h-10 w-10 sm:h-12 sm:w-12 rounded-xl bg-white dark:bg-slate-800 p-1 flex items-center justify-center border border-slate-200 dark:border-slate-700 shadow-xs overflow-hidden shrink-0"
              >
                <img 
                  src="/moh_logo.png" 
                  alt="MOH Office Buttala Official Logo" 
                  className="max-h-full max-w-full object-contain"
                />
              </motion.div>

              <div className="min-w-0 flex flex-col justify-center space-y-0.5">
                <span className="truncate font-extrabold text-sm sm:text-base 2xl:text-lg tracking-tight text-slate-900 dark:text-white group-hover:text-[#2E7D6B] transition-colors leading-tight">
                  MOH OFFICE – BUTTALA
                </span>
                <p className="truncate text-[10px] 2xl:text-[11px] text-[#2E7D6B] dark:text-[#4DB6AC] font-bold leading-tight">
                  Medical Officer of Health – Buttala
                </p>
                <p className="hidden sm:block truncate text-[10px] text-slate-500 dark:text-slate-400 font-semibold leading-none">
                  Uva Province, Sri Lanka
                </p>
              </div>
            </Link>

            {/* Center: Desktop Menu Items */}
            <nav className="hidden xl:flex items-center gap-0.5 2xl:gap-1 shrink-0">
              {navLinks.map((link) => {
                const isActive = link.isExact 
                  ? location.pathname === '/' 
                  : location.pathname === link.path;

                // About Us Dropdown
                if (link.hasDropdown === 'about') {
                  return (
                    <div 
                      key={link.path} 
                      className="relative group"
                      onMouseEnter={() => setAboutDropdownOpen(true)}
                      onMouseLeave={() => setAboutDropdownOpen(false)}
                    >
                      <button
                        className={`relative flex items-center gap-1 px-2.5 2xl:px-3.5 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all duration-200 ${
                          aboutDropdownOpen || location.pathname.startsWith('/about')
                            ? 'text-[#2E7D6B] dark:text-[#4DB6AC] bg-[#2E7D6B]/10'
                            : 'text-slate-700 dark:text-slate-200 hover:text-[#2E7D6B] dark:hover:text-[#4DB6AC] hover:bg-slate-100 dark:hover:bg-slate-800'
                        }`}
                      >
                        <span>{link.label}</span>
                        <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${aboutDropdownOpen ? 'rotate-180 text-[#2E7D6B]' : ''}`} />
                      </button>

                      {/* Dropdown Menu Animation */}
                      <AnimatePresence>
                        {aboutDropdownOpen && (
                          <motion.div
                            initial={{ opacity: 0, y: 8, scale: 0.98 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 8, scale: 0.98 }}
                            transition={{ duration: 0.15 }}
                            className="absolute top-full left-0 mt-1 w-64 bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-slate-200/90 dark:border-slate-800 p-2 z-50 overflow-hidden"
                          >
                            {aboutItems.map((item, i) => {
                              const ItemIcon = item.icon;
                              return (
                                <button
                                  key={i}
                                  onClick={() => handleLinkClick(item.path, item.isModalTrigger)}
                                  className="w-full text-left flex items-start gap-3 p-2.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800/80 transition group/item"
                                >
                                  <div className="p-2 rounded-lg bg-[#2E7D6B]/10 text-[#2E7D6B] dark:text-[#4DB6AC] group-hover/item:bg-[#2E7D6B] group-hover/item:text-white transition">
                                    <ItemIcon className="w-4 h-4" />
                                  </div>
                                  <div>
                                    <h4 className="text-xs font-bold text-slate-900 dark:text-white group-hover/item:text-[#2E7D6B] transition">
                                      {item.title}
                                    </h4>
                                    <p className="text-[10px] text-slate-500 dark:text-slate-400">
                                      {item.desc}
                                    </p>
                                  </div>
                                </button>
                              );
                            })}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                }

                // Services Mega Dropdown
                if (link.hasMega) {
                  return (
                    <div 
                      key={link.path} 
                      className="relative group"
                      onMouseEnter={() => setServicesMegaOpen(true)}
                      onMouseLeave={() => setServicesMegaOpen(false)}
                    >
                      <button
                        className={`relative flex items-center gap-1 px-2.5 2xl:px-3.5 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all duration-200 ${
                          servicesMegaOpen
                            ? 'text-[#2E7D6B] dark:text-[#4DB6AC] bg-[#2E7D6B]/10'
                            : 'text-slate-700 dark:text-slate-200 hover:text-[#2E7D6B] dark:hover:text-[#4DB6AC] hover:bg-slate-100 dark:hover:bg-slate-800'
                        }`}
                      >
                        <span>{link.label}</span>
                        <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${servicesMegaOpen ? 'rotate-180 text-[#2E7D6B]' : ''}`} />
                      </button>

                      {/* Services Mega Dropdown */}
                      <AnimatePresence>
                        {servicesMegaOpen && (
                          <motion.div
                            initial={{ opacity: 0, y: 8, scale: 0.98 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 8, scale: 0.98 }}
                            transition={{ duration: 0.15 }}
                            className="absolute top-full -left-20 mt-1 w-[520px] bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200/90 dark:border-slate-800 p-4 z-50 overflow-hidden"
                          >
                            <div className="px-3 pb-2 border-b border-slate-100 dark:border-slate-800 mb-2 flex items-center justify-between">
                              <span className="text-[11px] font-extrabold uppercase tracking-wider text-[#2E7D6B] dark:text-[#4DB6AC]">
                                Preventive Healthcare Services
                              </span>
                              <span className="text-[10px] text-slate-400 font-medium">MOH Buttala Division</span>
                            </div>

                            <div className="grid grid-cols-2 gap-2">
                              {megaServices.map((srv, i) => {
                                const SrvIcon = srv.icon;
                                return (
                                  <Link
                                    key={i}
                                    to={srv.path}
                                    onClick={() => handleLinkClick(srv.path)}
                                    className="flex items-start gap-3 p-3 rounded-2xl hover:bg-slate-100 dark:hover:bg-slate-800 transition group/srv"
                                  >
                                    <div className="p-2.5 rounded-xl bg-[#2E7D6B]/10 text-[#2E7D6B] dark:text-[#4DB6AC] group-hover/srv:bg-[#2E7D6B] group-hover/srv:text-white transition shrink-0">
                                      <SrvIcon className="w-4 h-4" />
                                    </div>
                                    <div>
                                      <div className="flex items-center gap-1.5">
                                        <h4 className="text-xs font-bold text-slate-900 dark:text-white group-hover/srv:text-[#2E7D6B]">
                                          {srv.title}
                                        </h4>
                                      </div>
                                      <p className="text-[10px] text-slate-500 dark:text-slate-400 leading-snug mt-0.5">
                                        {srv.desc}
                                      </p>
                                    </div>
                                  </Link>
                                );
                              })}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                }

                // Standard Nav Links
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    onClick={() => handleLinkClick(link.path)}
                    className={`relative px-2.5 2xl:px-3.5 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all duration-200 group ${
                      isActive
                        ? 'text-[#2E7D6B] dark:text-[#4DB6AC] font-extrabold'
                        : 'text-slate-700 dark:text-slate-200 hover:text-[#2E7D6B] dark:hover:text-[#4DB6AC] hover:bg-slate-100 dark:hover:bg-slate-800'
                    }`}
                  >
                    <span>{link.label}</span>
                    
                    {/* Active Underline Effect */}
                    {isActive && (
                      <motion.div
                        layoutId="activeUnderline"
                        className="absolute bottom-1 left-2.5 right-2.5 2xl:left-3.5 2xl:right-3.5 h-0.5 bg-[#2E7D6B] dark:bg-[#4DB6AC] rounded-full"
                      />
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* Right Side: Search + Sign In Button + Primary CTA */}
            <div className="flex shrink-0 items-center gap-1.5 2xl:gap-3">

              {/* Search Icon with Inline Expandable Search Bar */}
              <div className="relative hidden md:flex items-center">
                <AnimatePresence>
                  {searchExpanded ? (
                    <motion.form
                      initial={{ width: 0, opacity: 0 }}
                      animate={{ width: 220, opacity: 1 }}
                      exit={{ width: 0, opacity: 0 }}
                      onSubmit={handleSearchSubmit}
                      className="flex items-center bg-slate-100 dark:bg-slate-800 rounded-full px-3 py-1.5 border border-[#2E7D6B]/40 overflow-hidden"
                    >
                      <input
                        ref={searchInputRef}
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search services..."
                        className="w-full text-xs bg-transparent border-0 focus:outline-none text-slate-800 dark:text-slate-100 placeholder:text-slate-400"
                      />
                      <button type="submit" className="p-1 text-[#2E7D6B]">
                        <Search className="w-3.5 h-3.5" />
                      </button>
                      <button 
                        type="button" 
                        onClick={() => setSearchExpanded(false)} 
                        className="p-1 text-slate-400 hover:text-slate-600 ml-1"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </motion.form>
                  ) : (
                    <motion.button
                      whileHover={{ scale: 1.08 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setSearchExpanded(true)}
                      className="p-2.5 rounded-full border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-[#2E7D6B]/10 hover:text-[#2E7D6B] transition"
                      title="Search MOH Services"
                    >
                      <Search className="w-4 h-4" />
                    </motion.button>
                  )}
                </AnimatePresence>
              </div>

              {/* ------------------------------------------------------------- */}
              {/* SIGN IN / USER PROFILE BUTTON */}
              {/* ------------------------------------------------------------- */}
              {user ? (
                <div className="flex items-center gap-2">
                  <Link
                    to={`/dashboard/${user.role ? user.role.toLowerCase() : 'citizen'}`}
                    className="flex items-center gap-2 px-3.5 py-2 rounded-full bg-[#2E7D6B]/15 text-[#2E7D6B] dark:text-[#4DB6AC] border border-[#2E7D6B]/30 font-bold text-xs hover:bg-[#2E7D6B]/25 transition"
                  >
                    <User className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">{user.name || 'My Profile'}</span>
                  </Link>
                  <button
                    onClick={logout}
                    className="p-2 rounded-full text-slate-500 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-slate-800 transition"
                    title="Sign Out"
                  >
                    <LogOut className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}>
                  <Link
                    to="/login"
                    className="hidden sm:flex px-3 2xl:px-4 py-2.5 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-100 font-extrabold text-xs items-center gap-1.5 transition border border-slate-200 dark:border-slate-700 shadow-xs whitespace-nowrap"
                  >
                    <LogIn className="w-4 h-4 text-[#2E7D6B] dark:text-[#4DB6AC]" />
                    <span>Sign In</span>
                  </Link>
                </motion.div>
              )}

              {/* Primary CTA Button: Book Appointment */}
              <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}>
                <Link
                  to="/appointments"
                  className="px-3 2xl:px-5 py-2.5 rounded-full bg-[#2E7D6B] hover:bg-[#236355] text-white font-extrabold text-xs shadow-md shadow-[#2E7D6B]/25 flex items-center gap-2 transition-colors border border-white/20 whitespace-nowrap"
                >
                  <Calendar className="w-4 h-4 stroke-[2.5]" />
                  <span className="hidden sm:inline">Book Appointment</span>
                </Link>
              </motion.div>

              {/* Main Navbar Theme Toggle */}
              <button
                onClick={toggleTheme}
                className="p-2.5 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 transition border border-slate-200 dark:border-slate-700"
                title="Toggle Theme"
              >
                {darkMode ? <Sun className="w-5 h-5 text-amber-400" /> : <Moon className="w-5 h-5 text-[#2E7D6B]" />}
              </button>

              {/* Mobile Hamburger Trigger */}
              <button
                onClick={() => setMobileMenuOpen(true)}
                className="xl:hidden p-2.5 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-200"
              >
                <Menu className="w-6 h-6 text-[#2E7D6B]" />
              </button>

            </div>

          </div>
        </div>
      </header>

      {/* Interactive Vision & Mission Modal */}
      <VisionMissionModal
        isOpen={visionModalOpen}
        onClose={() => setVisionModalOpen(false)}
      />

      {/* ------------------------------------------------------------- */}
      {/* 3. MOBILE SLIDE-IN MENU FROM RIGHT */}
      {/* ------------------------------------------------------------- */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <div className="fixed inset-0 z-50 flex justify-end bg-slate-950/60 backdrop-blur-xs">
            
            {/* Click outside overlay to close */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              className="absolute inset-0"
            />

            {/* Sliding Panel */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="relative w-full max-w-sm bg-white dark:bg-slate-900 h-full shadow-2xl flex flex-col justify-between z-10 overflow-y-auto"
            >
              {/* Header inside Mobile Drawer */}
              <div className="p-5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-white p-0.5 border border-slate-200 flex items-center justify-center shadow-xs overflow-hidden">
                    <img src="/moh_logo.png" alt="MOH Office Buttala Official Logo" className="max-h-full max-w-full object-contain" />
                  </div>
                  <div>
                    <h3 className="font-extrabold text-sm text-slate-900 dark:text-white">MOH OFFICE – BUTTALA</h3>
                    <p className="text-[10px] text-[#2E7D6B] font-bold">Medical Officer of Health</p>
                    <p className="text-[9px] text-slate-500">Uva Province, Sri Lanka</p>
                  </div>
                </div>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2 rounded-xl text-slate-400 hover:text-slate-600 bg-slate-100 dark:bg-slate-800"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Drawer Links List */}
              <div className="p-5 space-y-3 flex-1">
                
                {/* Mobile Search Form */}
                <form onSubmit={handleSearchSubmit} className="mb-4">
                  <div className="flex items-center bg-slate-100 dark:bg-slate-800 rounded-xl px-3 py-2 border border-slate-200 dark:border-slate-700">
                    <Search className="w-4 h-4 text-slate-400 mr-2" />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search clinics & topics..."
                      className="w-full text-xs bg-transparent border-0 focus:outline-none text-slate-900 dark:text-slate-100 placeholder:text-slate-500 dark:placeholder:text-slate-400"
                    />
                  </div>
                </form>

                {/* Mobile Sign In Button */}
                <div className="mb-3">
                  {user ? (
                    <div className="flex items-center justify-between bg-slate-100 dark:bg-slate-800 p-3 rounded-2xl border border-slate-200 dark:border-slate-700">
                      <Link 
                        to={`/dashboard/${user.role ? user.role.toLowerCase() : 'citizen'}`}
                        onClick={() => setMobileMenuOpen(false)}
                        className="flex items-center gap-2 font-bold text-xs text-slate-900 dark:text-white hover:text-[#2E7D6B] transition"
                      >
                        <User className="w-4 h-4 text-[#2E7D6B]" />
                        <span>{user.name} ({user.role} Dashboard)</span>
                      </Link>
                      <button onClick={logout} className="text-xs text-rose-600 font-extrabold ml-2">Sign Out</button>
                    </div>
                  ) : (
                    <Link
                      to="/login"
                      onClick={() => setMobileMenuOpen(false)}
                      className="w-full py-3 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white font-extrabold text-xs flex items-center justify-center gap-2 border border-slate-200 dark:border-slate-700"
                    >
                      <LogIn className="w-4 h-4 text-[#2E7D6B]" />
                      <span>Sign In / Register</span>
                    </Link>
                  )}
                </div>

                {/* Home Link */}
                <Link
                  to="/"
                  onClick={() => handleLinkClick('/')}
                  className="block px-4 py-3 rounded-2xl font-extrabold text-sm bg-[#2E7D6B]/10 text-[#2E7D6B]"
                >
                  Home
                </Link>

                {/* Collapsible About Us */}
                <div className="border-b border-slate-100 dark:border-slate-800 pb-2">
                  <button
                    onClick={() => setMobileAboutExpanded(!mobileAboutExpanded)}
                    className="w-full flex items-center justify-between px-4 py-3 text-sm font-bold text-slate-800 dark:text-slate-200"
                  >
                    <span>About Us</span>
                    <ChevronDown className={`w-4 h-4 transition-transform ${mobileAboutExpanded ? 'rotate-180 text-[#2E7D6B]' : ''}`} />
                  </button>

                  {mobileAboutExpanded && (
                    <div className="pl-6 space-y-2 pt-1 pb-2">
                      {aboutItems.map((item, i) => (
                        <button
                          key={i}
                          onClick={() => handleLinkClick(item.path, item.isModalTrigger)}
                          className="w-full text-left block text-xs font-semibold text-slate-600 dark:text-slate-400 py-1.5 hover:text-[#2E7D6B]"
                        >
                          {item.title}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Collapsible Services */}
                <div className="border-b border-slate-100 dark:border-slate-800 pb-2">
                  <button
                    onClick={() => setMobileServicesExpanded(!mobileServicesExpanded)}
                    className="w-full flex items-center justify-between px-4 py-3 text-sm font-bold text-slate-800 dark:text-slate-200"
                  >
                    <span>Services</span>
                    <ChevronDown className={`w-4 h-4 transition-transform ${mobileServicesExpanded ? 'rotate-180 text-[#2E7D6B]' : ''}`} />
                  </button>

                  {mobileServicesExpanded && (
                    <div className="pl-6 space-y-2 pt-1 pb-2">
                      {megaServices.map((srv, i) => (
                        <Link
                          key={i}
                          to={srv.path}
                          onClick={() => handleLinkClick(srv.path)}
                          className="flex items-center gap-2 text-xs font-semibold text-slate-600 dark:text-slate-400 py-1.5 hover:text-[#2E7D6B]"
                        >
                          <ChevronRight className="w-3 h-3 text-[#2E7D6B]" />
                          <span>{srv.title}</span>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>

                {/* Other Nav Links */}
                {[
                  { path: '/clinics', label: 'Clinic Schedule' },
                  { path: '/articles', label: 'Health Education' },
                  { path: '/#announcements', label: 'News & Events' },
                  { path: '/#gallery', label: 'Gallery' },
                  { path: '/contact', label: 'Contact Us' }
                ].map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => handleLinkClick(item.path)}
                    className="block px-4 py-3 rounded-2xl font-bold text-sm text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
                  >
                    {item.label}
                  </Link>
                ))}

              </div>

              {/* Sticky Mobile Bottom CTA Button */}
              <div className="p-5 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 sticky bottom-0">
                <Link
                  to="/appointments"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full py-3.5 rounded-full bg-[#2E7D6B] hover:bg-[#236355] text-white font-extrabold text-sm text-center block shadow-lg shadow-[#2E7D6B]/30"
                >
                  Book Appointment
                </Link>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};
