import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import { useLanguage } from '../../context/LanguageContext';
import { 
  Cross, Calendar, ShieldAlert, Syringe, FileText, 
  Activity, PhoneCall, LayoutDashboard, Sun, Moon, 
  Globe, Menu, X, User, LogOut, HeartPulse, BookOpen, Search, Sparkles
} from 'lucide-react';

export const Navbar = () => {
  const { user, logout } = useAuth();
  const { darkMode, toggleTheme } = useTheme();
  const { lang, setLang, t } = useLanguage();
  const location = useLocation();
  const navigate = useNavigate();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const navLinks = [
    { path: '/', label: t('home'), icon: HeartPulse },
    { path: '/clinics', label: t('clinics'), icon: Cross },
    { path: '/appointments', label: t('appointments'), icon: Calendar },
    { path: '/vaccination', label: t('vaccination'), icon: Syringe },
    { path: '/complaints', label: t('complaints'), icon: ShieldAlert },
    { path: '/surveillance', label: t('surveillance'), icon: Activity },
    { path: '/articles', label: t('articles'), icon: BookOpen },
    { path: '/emergency', label: t('emergency'), icon: PhoneCall, highlight: true }
  ];

  const languages = [
    { code: 'en', name: 'English', flag: '🇬🇧' },
    { code: 'si', name: 'සිංහල', flag: '🇱🇰' },
    { code: 'ta', name: 'தமிழ்', flag: '🇱🇰' }
  ];

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    setSearchModalOpen(false);
    navigate(`/clinics?search=${encodeURIComponent(searchQuery)}`);
  };

  return (
    <>
      <header className="sticky top-0 z-40 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-b border-slate-200/80 dark:border-slate-800/80 shadow-xs transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20 py-2">
            
            {/* Brand Emblem & Name */}
            <Link to="/" className="flex items-center gap-3 group">
              <motion.div
                whileHover={{ scale: 1.06, rotate: 3 }}
                className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-moh-600 via-teal-500 to-emerald-400 flex items-center justify-center text-white shadow-md shadow-moh-600/20 border border-white/30"
              >
                <Cross className="w-6 h-6 stroke-[2.5]" />
              </motion.div>

              <div>
                <div className="flex items-center gap-2">
                  <span className="font-extrabold text-lg sm:text-xl tracking-tight bg-gradient-to-r from-slate-900 via-moh-800 to-teal-700 dark:from-white dark:via-teal-200 dark:to-emerald-300 bg-clip-text text-transparent">
                    MOH SRI LANKA
                  </span>
                  <span className="inline-flex items-center gap-1 text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 font-extrabold border border-emerald-500/30">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping"></span>
                    PORTAL
                  </span>
                </div>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 font-bold leading-tight">
                  Medical Officer of Health Platform
                </p>
              </div>
            </Link>

            {/* Desktop Navigation Links Pill */}
            <nav className="hidden xl:flex items-center gap-1 bg-slate-100/90 dark:bg-slate-800/80 p-1.5 rounded-2xl border border-slate-200/70 dark:border-slate-700/70 shadow-xs">
              {navLinks.map((link) => {
                const Icon = link.icon;
                const isActive = location.pathname === link.path;
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`relative flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-extrabold transition-all duration-200 ${
                      link.highlight
                        ? 'bg-rose-600 text-white shadow-xs hover:bg-rose-700'
                        : isActive
                        ? 'bg-gradient-to-r from-moh-600 to-teal-600 text-white shadow-md shadow-moh-600/20'
                        : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-white/80 dark:hover:bg-slate-700/60'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{link.label}</span>
                  </Link>
                );
              })}
            </nav>

            {/* Right Action Toolbar */}
            <div className="flex items-center gap-2">
              
              {/* Quick Search Button */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSearchModalOpen(true)}
                className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
                title="Search MOH Clinics & Health Topics"
              >
                <Search className="w-4 h-4 text-moh-600 dark:text-moh-400" />
              </motion.button>

              {/* Language Selector Dropdown */}
              <div className="relative">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setLangDropdownOpen(!langDropdownOpen)}
                  className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-extrabold border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
                >
                  <Globe className="w-4 h-4 text-teal-600 dark:text-teal-400" />
                  <span className="uppercase font-mono">{lang}</span>
                </motion.button>

                <AnimatePresence>
                  {langDropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      className="absolute right-0 mt-2 w-40 bg-white dark:bg-slate-800 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-700 py-1.5 z-50 overflow-hidden"
                    >
                      {languages.map(l => (
                        <button
                          key={l.code}
                          onClick={() => {
                            setLang(l.code);
                            setLangDropdownOpen(false);
                          }}
                          className={`w-full flex items-center justify-between px-3.5 py-2 text-xs font-bold text-left transition ${
                            lang === l.code
                              ? 'bg-moh-50 dark:bg-slate-700 text-moh-600 dark:text-teal-300'
                              : 'text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700/50'
                          }`}
                        >
                          <span>{l.name}</span>
                          <span>{l.flag}</span>
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Dark Mode Toggle */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={toggleTheme}
                className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
                title="Toggle Theme"
              >
                {darkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-700" />}
              </motion.button>

              {/* User Account / Sign In Action */}
              {user ? (
                <div className="flex items-center gap-2">
                  <Link
                    to={`/dashboard/${user.role.toLowerCase()}`}
                    className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-extrabold bg-gradient-to-r from-moh-600 to-teal-600 text-white shadow-md hover:opacity-95 transition"
                  >
                    <LayoutDashboard className="w-4 h-4" />
                    <span className="hidden sm:inline">{user.role} {t('dashboard')}</span>
                  </Link>
                  <button
                    onClick={logout}
                    title="Sign Out"
                    className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-rose-50 hover:text-rose-600 dark:hover:bg-rose-950/40 transition"
                  >
                    <LogOut className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <Link
                  to="/login"
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-extrabold bg-gradient-to-r from-moh-600 to-teal-600 hover:from-moh-700 hover:to-teal-700 text-white shadow-md shadow-moh-600/20 transition"
                >
                  <User className="w-4 h-4" />
                  <span>Sign In</span>
                </Link>
              )}

              {/* Mobile Drawer Trigger */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="xl:hidden p-2 rounded-xl text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>

            </div>

          </div>
        </div>

        {/* Mobile Menu Drawer */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="xl:hidden bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 px-4 pt-2 pb-5 space-y-2 overflow-hidden"
            >
              {navLinks.map((link) => {
                const Icon = link.icon;
                const isActive = location.pathname === link.path;
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-extrabold transition ${
                      link.highlight
                        ? 'bg-rose-600 text-white shadow-md'
                        : isActive
                        ? 'bg-moh-600 text-white shadow-md'
                        : 'text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span>{link.label}</span>
                  </Link>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Quick Search Modal */}
      <AnimatePresence>
        {searchModalOpen && (
          <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-start justify-center pt-24 px-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -20 }}
              className="bg-white dark:bg-slate-900 rounded-3xl shadow-2xl max-w-lg w-full overflow-hidden border border-slate-200 dark:border-slate-800 p-5 space-y-4"
            >
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
                <h3 className="font-extrabold text-sm text-slate-900 dark:text-white flex items-center gap-2">
                  <Search className="w-4 h-4 text-moh-600" />
                  <span>Search MOH Portal</span>
                </h3>
                <button onClick={() => setSearchModalOpen(false)} className="p-1 text-slate-400 hover:text-slate-600">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSearchSubmit} className="space-y-3">
                <input
                  type="text"
                  autoFocus
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Type clinic, Dengue symptoms, vaccine schedule..."
                  className="w-full p-3.5 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 rounded-2xl text-xs font-medium border border-slate-300 dark:border-slate-700 placeholder:text-slate-500 dark:placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-moh-500"
                />
                <button
                  type="submit"
                  className="w-full py-3 bg-moh-600 text-white rounded-xl text-xs font-bold hover:bg-moh-700 transition"
                >
                  Find Clinics & Services
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

