import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { useData } from '../context/DataContext';
import { generateClinicSchedulePDF } from '../utils/pdfGenerator';
import { SymptomCheckerModal } from '../components/ai/SymptomCheckerModal';
import {
  Cross, Calendar, ShieldAlert, Syringe, Activity,
  ArrowRight, PhoneCall, CheckCircle, Sparkles, AlertTriangle,
  ChevronRight, Stethoscope, Users, MapPin, Search, BookOpen, Download,
  HeartPulse, Shield, ChevronDown, FileText, Award, UserCheck, MessageSquare,
  Filter, Eye, X, ExternalLink, Clock, Mail, CheckCircle2, Bell, Sparkle, Building2, User
} from 'lucide-react';

// Smooth Decelerating Number Counter Component
const AnimatedCountNumber = ({ value, decimals = 0, prefix = '', suffix = '' }) => {
  const [displayValue, setDisplayValue] = useState(0);
  const containerRef = React.useRef(null);
  const hasAnimated = React.useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          let startTime = null;
          const duration = 2000; // 2 seconds

          const step = (timestamp) => {
            if (!startTime) startTime = timestamp;
            const progress = Math.min((timestamp - startTime) / duration, 1);
            // Smooth easeOutCubic curve
            const easeOutProgress = 1 - Math.pow(1 - progress, 3);
            setDisplayValue(easeOutProgress * value);

            if (progress < 1) {
              requestAnimationFrame(step);
            }
          };

          requestAnimationFrame(step);
        }
      },
      { threshold: 0.2 }
    );

    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, [value]);

  return (
    <span ref={containerRef} className="inline-block">
      {prefix}
      {displayValue.toLocaleString(undefined, {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals
      })}
      {suffix}
    </span>
  );
};

export const Home = () => {
  const { t } = useLanguage();
  const [symptomModalOpen, setSymptomModalOpen] = useState(false);
  const [activeFaq, setActiveFaq] = useState(0);
  
  // Interactive Clinic Schedule State
  const [selectedClinicFilter, setSelectedClinicFilter] = useState('All');
  
  // Team Bio Modal State
  const [selectedTeamMember, setSelectedTeamMember] = useState(null);
  
  // Gallery Lightbox State
  const [selectedGalleryImage, setSelectedGalleryImage] = useState(null);
  const [galleryFilter, setGalleryFilter] = useState('All');

  // e-Clinic / SMS Registration State
  const [smsPhone, setSmsPhone] = useState('');
  const [smsRegistered, setSmsRegistered] = useState(false);

  // Professional SVG Vector Avatars for Healthcare Officers
  const doctorMaleSvg = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 200' width='200' height='200'><rect width='200' height='200' rx='100' fill='%23134E4A'/><path d='M100 40a35 35 0 1 0 0 70 35 35 0 0 0 0-70z' fill='%23FCD34D'/><path d='M40 185c0-38 27-65 60-65s60 27 60 65z' fill='%232E7D6B'/><path d='M85 120h30v55H85z' fill='white'/><path d='M100 125v22M89 136h22' stroke='%232E7D6B' stroke-width='4' stroke-linecap='round'/><circle cx='82' cy='125' r='6' fill='%234DB6AC'/><circle cx='118' cy='125' r='6' fill='%234DB6AC'/><path d='M82 131v15a18 18 0 0 0 36 0v-15' stroke='%234DB6AC' stroke-width='4' fill='none'/></svg>";
  
  const doctorFemaleSvg = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 200' width='200' height='200'><rect width='200' height='200' rx='100' fill='%230F766E'/><path d='M100 38a35 35 0 1 0 0 70 35 35 0 0 0 0-70z' fill='%23FDE68A'/><path d='M42 185c0-36 26-62 58-62s58 26 58 62z' fill='%230D9488'/><path d='M86 120h28v55H86z' fill='white'/><path d='M100 125v20M90 135h20' stroke='%230D9488' stroke-width='4' stroke-linecap='round'/><path d='M80 73c10-8 30-8 40 0' stroke='%23451A03' stroke-width='4' fill='none'/></svg>";
  
  const inspectorSvg = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 200' width='200' height='200'><rect width='200' height='200' rx='100' fill='%23B45309'/><path d='M100 42a34 34 0 1 0 0 68 34 34 0 0 0 0-68z' fill='%23FDE68A'/><path d='M40 185c0-38 27-65 60-65s60 27 60 65z' fill='%23D97706'/><path d='M70 52h60l-12-16H82z' fill='%2378350F'/><path d='M90 125h20v55H90z' fill='white'/><path d='M95 135h10v10H95z' fill='%23B45309'/></svg>";
  
  const nurseSvg = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 200' width='200' height='200'><rect width='200' height='200' rx='100' fill='%23BE185D'/><path d='M100 42a34 34 0 1 0 0 68 34 34 0 0 0 0-68z' fill='%23FDE68A'/><path d='M42 185c0-36 26-62 58-62s58 26 58 62z' fill='%23DB2777'/><path d='M78 44h44v18H78z' fill='white'/><path d='M100 48v10M95 53h10' stroke='%23BE185D' stroke-width='3' stroke-linecap='round'/></svg>";

  const defaultArticleSvg = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='600' height='400' viewBox='0 0 600 400'><rect width='600' height='400' fill='%232E7D6B'/><text x='50%' y='45%' dominant-baseline='middle' text-anchor='middle' fill='white' font-family='sans-serif' font-size='24' font-weight='bold'>MOH Buttala Health Education</text><text x='50%' y='60%' dominant-baseline='middle' text-anchor='middle' fill='%234DB6AC' font-family='sans-serif' font-size='16'>Ministry of Health Sri Lanka</text></svg>";
  const defaultGallerySvg = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='800' height='500' viewBox='0 0 800 500'><rect width='800' height='500' fill='%23134E4A'/><text x='50%' y='45%' dominant-baseline='middle' text-anchor='middle' fill='white' font-family='sans-serif' font-size='28' font-weight='bold'>MOH Buttala Community Fieldwork</text><text x='50%' y='60%' dominant-baseline='middle' text-anchor='middle' fill='%234DB6AC' font-family='sans-serif' font-size='18'>Official Government Healthcare Activity</text></svg>";

  // Animated Counter Effect
  const [countStats, setCountStats] = useState({
    families: 0,
    phm: 0,
    immunization: 0,
    schools: 0,
    mental: 0
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      setCountStats({
        families: 52400,
        phm: 18,
        immunization: 99.2,
        schools: 34,
        mental: 12500
      });
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  // Quick Services Grid Data
  const quickServices = [
    { 
      id: 'maternal',
      title: 'Maternal & Child Health', 
      desc: 'Complete prenatal, postnatal care, growth monitoring, and infant health clinics in Buttala MOH.', 
      icon: HeartPulse, 
      link: '/clinics', 
      badge: 'Daily Clinic',
      color: 'from-[#2E7D6B] to-[#4DB6AC]' 
    },
    { 
      id: 'immunization',
      title: 'Immunization & Vaccines', 
      desc: 'Free national childhood vaccination programs (BCG, Pentavalent, OPV, MMR, JE, HPV).', 
      icon: Syringe, 
      link: '/vaccination', 
      badge: 'Free Vaccines',
      color: 'from-[#2E7D6B] to-emerald-600' 
    },
    { 
      id: 'oral',
      title: 'Oral Health Care', 
      desc: 'Dental examinations, fluoride treatment, and oral hygiene education for children & adults.', 
      icon: Award, 
      link: '/clinics', 
      badge: 'Dental Unit',
      color: 'from-[#4DB6AC] to-[#2E7D6B]' 
    },
    { 
      id: 'ncd',
      title: 'NCD Screening', 
      desc: 'Early screening for Diabetes, Hypertension, BMI, and cardiovascular risk assessments.', 
      icon: Activity, 
      link: '/clinics', 
      badge: 'Health Check',
      color: 'from-[#2E7D6B] to-teal-700' 
    },
    { 
      id: 'women',
      title: "Women's Health (Well Woman)", 
      desc: 'Cervical cancer screening (Pap smear), breast examination, and reproductive advice.', 
      icon: Cross, 
      link: '/clinics', 
      badge: 'Wednesdays',
      color: 'from-[#4DB6AC] to-emerald-600' 
    },
    { 
      id: 'school',
      title: 'School Health Program', 
      desc: 'Annual health inspections, vision tests, and nutritional tracking across 34 Buttala schools.', 
      icon: Users, 
      link: '/articles', 
      badge: 'Community',
      color: 'from-[#2E7D6B] to-[#4DB6AC]' 
    },
    { 
      id: 'dengue',
      title: 'Dengue Prevention', 
      desc: 'GIS vector mapping, community fogging, and inspection of stagnant water sites by PHIs.', 
      icon: ShieldAlert, 
      link: '/surveillance', 
      badge: 'Live GIS',
      color: 'from-rose-600 to-[#2E7D6B]' 
    },
    { 
      id: 'food',
      title: 'Food Safety & Hygiene', 
      desc: 'Inspection and licensing of food outlets, bakeries, and water sources in Buttala division.', 
      icon: Shield, 
      link: '/complaints', 
      badge: 'PHI Unit',
      color: 'from-teal-800 to-[#2E7D6B]' 
    }
  ];

  // Announcements Data
  const announcements = [
    {
      id: 1,
      date: '29 JUL 2026',
      badge: 'High Priority',
      badgeColor: 'bg-rose-600 text-white',
      title: 'Dengue Vector Fogging Campaign in Pelwatte & Buttala Town',
      summary: 'PHI officers will conduct house-to-house inspections and smoke fogging from 8:00 AM to 2:00 PM. Residents are advised to clear stagnant water vessels.',
      category: 'Dengue Control'
    },
    {
      id: 2,
      date: '25 JUL 2026',
      badge: 'Clinic Notice',
      badgeColor: 'bg-[#2E7D6B] text-white',
      title: 'Special Infant Immunization & Polio Booster Clinic Next Tuesday',
      summary: 'Parents with infants aged 2 to 18 months are invited to the MOH Buttala Central Clinic. Free digital vaccine cards will be issued.',
      category: 'Maternal Care'
    },
    {
      id: 3,
      date: '20 JUL 2026',
      badge: 'Community Alert',
      badgeColor: 'bg-[#4DB6AC] text-slate-950 font-bold',
      title: 'Free Well Woman Clinic & Breast Screening Session',
      summary: 'Comprehensive health checkup for women aged 35+. Includes cervical Pap smear, blood pressure, and Diabetes risk evaluation.',
      category: 'Women Health'
    }
  ];

  const { teamMembers: contextTeamMembers, clinicSchedules: contextClinics, galleryList: contextGallery } = useData();

  // Weekly Clinic Schedule Data
  const defaultClinicSchedule = [
    { day: 'Monday', time: '8:30 AM - 12:30 PM', type: 'Ante-natal & Maternal Clinic', location: 'MOH Buttala Central Clinic', doctor: 'Dr. K. M. Wickramasinghe', tag: 'Maternal' },
    { day: 'Tuesday', time: '9:00 AM - 1:00 PM', type: 'Infant & Child Immunization', location: 'Pelwatte Sub-center', doctor: 'Dr. S. S. Perera', tag: 'Immunization' },
    { day: 'Wednesday', time: '8:30 AM - 12:00 PM', type: 'Well Woman & Cervical Screening', location: 'MOH Buttala Central Clinic', doctor: 'Dr. K. M. Wickramasinghe', tag: 'Well Woman' },
    { day: 'Thursday', time: '9:00 AM - 1:30 PM', type: 'NCD & Diabetes Screening Clinic', location: 'Kukurampola Community Center', doctor: 'Dr. S. S. Perera', tag: 'NCD' },
    { day: 'Friday', time: '8:30 AM - 12:00 PM', type: 'Dental Clinic & School Health', location: 'MOH Dental Unit', doctor: 'Dr. N. H. Ranasinghe', tag: 'Dental' },
    { day: 'Saturday', time: '9:00 AM - 1:00 PM', type: 'Special Advisory & Family Planning', location: 'MOH Buttala Central Clinic', doctor: 'Public Health Nursing Sister', tag: 'Maternal' }
  ];

  const clinicSchedule = (contextClinics && contextClinics.length > 0)
    ? contextClinics.map(c => ({
        day: c.day || 'Monday',
        time: c.time || c.operatingHours || '8:30 AM - 12:30 PM',
        type: c.type || c.name || 'General Clinic',
        location: c.location || c.venue || c.address || 'MOH Buttala Central Clinic',
        doctor: c.doctor || 'Dr. K. M. Wickramasinghe',
        tag: c.tag || (c.categories && c.categories[0]) || 'General'
      }))
    : defaultClinicSchedule;

  const filteredSchedule = selectedClinicFilter === 'All' 
    ? clinicSchedule 
    : clinicSchedule.filter(item => item.tag === selectedClinicFilter || item.type?.toLowerCase().includes(selectedClinicFilter.toLowerCase()));

  // Health Education Data
  const healthEducationCards = [
    {
      title: 'Dengue Prevention & Breeding Control',
      category: 'Dengue Control',
      image: 'https://images.unsplash.com/photo-1584362917165-526a968579e8?auto=format&fit=crop&w=600&q=80',
      desc: 'Learn how to identify Aedes mosquito larvae and destroy breeding spots around your home during rainy seasons.'
    },
    {
      title: 'Healthy Pregnancy & Nutrition Guide',
      category: 'Healthy Pregnancy',
      image: 'https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&w=600&q=80',
      desc: 'Essential dietary recommendations, Folic Acid supplements, and exercise safety for expecting mothers.'
    },
    {
      title: 'Infant Breastfeeding & Complementary Feeding',
      category: 'Breastfeeding',
      image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=600&q=80',
      desc: 'Exclusive breastfeeding for the first 6 months and introducing nutrient-rich local Sri Lankan weaning foods.'
    },
    {
      title: 'Oral Health & Children Tooth Care',
      category: 'Oral Health',
      image: 'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&w=600&q=80',
      desc: 'Proper tooth brushing techniques, fluoride benefits, and avoiding sugar-sweetened snacks.'
    },
    {
      title: 'Preventing Type 2 Diabetes in Rural Communities',
      category: 'Diabetes Prevention',
      image: 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&w=600&q=80',
      desc: 'Managing blood glucose levels through physical activity, reduced sugar intake, and annual NCD screening.'
    },
    {
      title: 'Balanced Sri Lankan Diet & Healthy Eating',
      category: 'Healthy Eating',
      image: 'https://images.unsplash.com/photo-1498837167922-ddd27525d352?auto=format&fit=crop&w=600&q=80',
      desc: 'Incorporating green leafy vegetables (Gotukola, Mukunuwenna), fresh fruits, and whole grains.'
    },
    {
      title: 'Digital Health Literacy for Citizens',
      category: 'Digital Health Literacy',
      image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=600&q=80',
      desc: 'How to use digital MOH appointment passes, check online clinic records, and register for SMS reminders.'
    }
  ];

  // Team Members from Context or Fallback
  const defaultTeamMembers = [
    {
      name: 'Dr. K. M. Wickramasinghe',
      role: 'Medical Officer of Health (MOH)',
      qualifications: 'MBBS (Colombo), MSc (Community Medicine)',
      image: doctorMaleSvg,
      bio: 'Dr. Wickramasinghe has over 14 years of public health experience leading preventative healthcare, maternal mortality reduction, and epidemic vector response in Monaragala district.'
    },
    {
      name: 'Dr. S. S. Perera',
      role: 'Additional Medical Officer of Health',
      qualifications: 'MBBS (Peradeniya), PGDip (Epidemiology)',
      image: doctorFemaleSvg,
      bio: 'Dr. Perera specializes in non-communicable disease surveillance, school health inspection, and rural healthcare accessibility.'
    },
    {
      name: 'Mr. W. A. Jayasuriya',
      role: 'Supervising Public Health Inspector (SPHI)',
      qualifications: 'Dip in Public Health Inspection',
      image: inspectorSvg,
      bio: 'Mr. Jayasuriya leads the field PHI team covering 18 PHM divisions in Buttala, overseeing food hygiene inspections, water safety, and Dengue breeding site control.'
    },
    {
      name: 'Mrs. H. M. Rathnayake',
      role: 'Senior Public Health Nursing Sister',
      qualifications: 'BSc Nursing, Dip in Midwifery',
      image: nurseSvg,
      bio: 'Mrs. Rathnayake coordinates Public Health Midwives (PHMs) across Buttala, focusing on prenatal home visits, infant growth tracking, and immunization.'
    }
  ];

  const teamMembers = (contextTeamMembers && contextTeamMembers.length > 0)
    ? contextTeamMembers.map((m, idx) => ({
        name: m.name,
        role: m.role || m.specialty || 'Medical Officer',
        qualifications: m.qualifications || 'Medical Professional',
        image: m.image || (idx % 2 === 0 ? doctorMaleSvg : doctorFemaleSvg),
        bio: m.bio || `${m.name} serves as ${m.role || 'Medical Officer'} at MOH Buttala.`
      }))
    : defaultTeamMembers;

  // Gallery Images from Context or Fallback
  const defaultGalleryItems = [
    { id: 1, title: 'MOH Office Buttala Main Healthcare Facility', category: 'Facilities', url: '/moh_buttala_building.png' },
    { id: 2, title: 'Infant Immunization Clinic Day', category: 'Clinics', url: 'https://images.unsplash.com/photo-1631815588090-d4bfec5b1cdb?auto=format&fit=crop&w=800&q=80' },
    { id: 3, title: 'PHI Field Dengue Inspection & Fogging', category: 'Dengue Campaigns', url: 'https://images.unsplash.com/photo-1584036561566-baf8f5f1b144?auto=format&fit=crop&w=800&q=80' },
    { id: 4, title: 'School Medical Checkup & Dental Exam', category: 'School Health', url: 'https://images.unsplash.com/photo-1588072432836-e10032774350?auto=format&fit=crop&w=800&q=80' },
    { id: 5, title: 'Maternal Nutrition & Cooking Workshop', category: 'Nutrition Workshops', url: 'https://images.unsplash.com/photo-1498837167922-ddd27525d352?auto=format&fit=crop&w=800&q=80' },
    { id: 6, title: 'Well Woman Health Screening Session', category: 'Clinics', url: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=800&q=80' }
  ];

  const galleryItems = (contextGallery && contextGallery.length > 0)
    ? contextGallery
    : defaultGalleryItems;

  const filteredGallery = galleryFilter === 'All'
    ? galleryItems
    : galleryItems.filter(item => item.category === galleryFilter);

  const downloadPdfSchedule = () => {
    generateClinicSchedulePDF(clinicSchedule);
  };

  const handleSmsSubmit = (e) => {
    e.preventDefault();
    if (!smsPhone.trim()) return;
    setSmsRegistered(true);
    setTimeout(() => {
      setSmsRegistered(false);
      setSmsPhone('');
    }, 4000);
  };

  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.6 }
  };

  return (
    <div className="space-y-20 pb-20 overflow-hidden font-sans">

      {/* ------------------------------------------------------------- */}
      {/* 1. HERO SECTION (100% Full-Width Edge-to-Edge Full Bleed Layout) */}
      {/* ------------------------------------------------------------- */}
      <section className="relative w-full min-h-[80vh] sm:min-h-[90vh] lg:min-h-[100vh] flex items-center justify-center overflow-hidden bg-slate-950 text-white">
        
        {/* Full-bleed Background Image with Subtle Slow Zoom Effect */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <img 
            src="/moh_buttala_building.png" 
            alt="MOH Office Buttala facility building" 
            className="w-full h-full object-cover object-center scale-105 hover:scale-110 transition-transform duration-[10000ms] ease-out filter brightness-95"
            onError={(e) => { e.target.onerror = null; e.target.src = defaultGallerySvg; }}
          />
          {/* Subtle Dark / Green Gradient Overlay (40–60% opacity for text readability) */}
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-[#2E7D6B]/75 to-slate-950/85 backdrop-blur-[1px]"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-slate-950/50"></div>
        </div>

        {/* Hero Content Layer */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Main Text Content Column */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="lg:col-span-8 space-y-6 text-center lg:text-left"
            >
              {/* Division Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/30 text-xs font-extrabold text-[#4DB6AC] shadow-lg">
                <Sparkles className="w-4 h-4 text-amber-300 animate-spin" />
                <span>Medical Officer of Health Office — Buttala Division</span>
              </div>

              {/* Main Heading */}
              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight leading-tight text-white drop-shadow-lg">
                Healthy Communities, <br />
                <span className="bg-gradient-to-r from-[#4DB6AC] via-emerald-300 to-teal-200 bg-clip-text text-transparent">
                  Healthy Future
                </span>
              </h1>

              {/* Short Description */}
              <p className="text-base sm:text-xl text-slate-200 leading-relaxed font-medium max-w-3xl mx-auto lg:mx-0 drop-shadow-md">
                Delivering quality preventive and community healthcare services to the people of the Buttala MOH area. Comprehensive maternal & child care, immunization schedules, non-communicable disease screening, and disease surveillance for Monaragala District.
              </p>

              {/* CTA Buttons (Stack vertically on mobile, horizontal on desktop) */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center lg:justify-start gap-4 pt-4">
                
                {/* Primary CTA: View Clinic Schedule */}
                <motion.a
                  whileHover={{ scale: 1.05, boxShadow: "0 20px 30px -5px rgba(46, 125, 107, 0.5)" }}
                  whileTap={{ scale: 0.96 }}
                  href="#clinic-schedule"
                  className="px-8 py-4 rounded-full bg-[#2E7D6B] hover:bg-[#236355] text-white font-extrabold text-sm sm:text-base shadow-xl shadow-[#2E7D6B]/40 flex items-center justify-center gap-2.5 transition-all border border-white/20"
                >
                  <Calendar className="w-5 h-5 stroke-[2.5]" />
                  <span>View Clinic Schedule</span>
                </motion.a>

                {/* Secondary CTA: Book Appointment (White outline) */}
                <motion.div 
                  whileHover={{ scale: 1.05, boxShadow: "0 10px 20px -5px rgba(255, 255, 255, 0.2)" }} 
                  whileTap={{ scale: 0.96 }}
                >
                  <Link
                    to="/appointments"
                    className="px-8 py-4 rounded-full border-2 border-white bg-white/10 hover:bg-white text-white hover:text-slate-950 font-extrabold text-sm sm:text-base transition-all flex items-center justify-center gap-2.5 shadow-lg backdrop-blur-md"
                  >
                    <BookOpen className="w-5 h-5 stroke-[2.5]" />
                    <span>Book Appointment</span>
                  </Link>
                </motion.div>

                {/* Third CTA: Find a Service */}
                <motion.a
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.96 }}
                  href="#online-services"
                  className="px-6 py-4 rounded-full bg-slate-900/60 hover:bg-slate-800/80 text-teal-200 font-extrabold text-sm flex items-center justify-center gap-2 transition border border-teal-400/30 backdrop-blur-md"
                >
                  <Search className="w-4 h-4 text-[#4DB6AC]" />
                  <span>Find a Service</span>
                </motion.a>

              </div>

              {/* Trust Badges below buttons */}
              <div className="pt-6 flex flex-wrap items-center justify-center lg:justify-start gap-4 text-xs font-bold text-slate-300">
                <span className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/20 shadow-xs">
                  <CheckCircle2 className="w-4 h-4 text-[#4DB6AC]" />
                  <span>Government Approved</span>
                </span>
                <span className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/20 shadow-xs">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Trusted Community Care</span>
                </span>
                <span className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/20 shadow-xs">
                  <CheckCircle2 className="w-4 h-4 text-[#4DB6AC]" />
                  <span>Serving Buttala Community</span>
                </span>
              </div>

            </motion.div>

            {/* Right Card: Live MOH Status Desk */}
            <motion.div 
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="lg:col-span-4"
            >
              <div className="bg-slate-900/80 backdrop-blur-xl p-8 rounded-3xl border border-white/20 text-white space-y-6 shadow-2xl relative">
                <div className="flex items-center justify-between border-b border-white/10 pb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#2E7D6B] to-[#4DB6AC] flex items-center justify-center text-white font-extrabold text-xl shadow-md">
                      <Building2 className="w-6 h-6 stroke-[2.5]" />
                    </div>
                    <div>
                      <h3 className="font-extrabold text-base text-white">MOH Buttala Central</h3>
                      <p className="text-xs text-[#4DB6AC] font-bold">Open Today: 8:00 AM - 4:00 PM</p>
                    </div>
                  </div>
                  <span className="w-3 h-3 rounded-full bg-emerald-400 animate-ping"></span>
                </div>

                <div className="space-y-3 text-xs">
                  <div className="flex justify-between items-center bg-white/10 p-3.5 rounded-2xl border border-white/10">
                    <span className="text-slate-200 font-bold">Today's Active Clinics:</span>
                    <span className="px-3 py-1 rounded-xl bg-emerald-500 text-slate-950 font-black text-xs">
                      Maternal & Infant Care
                    </span>
                  </div>

                  <div className="flex justify-between items-center bg-white/10 p-3.5 rounded-2xl border border-white/10">
                    <span className="text-slate-200 font-bold">Dengue Alert Status:</span>
                    <span className="px-3 py-1 rounded-xl bg-amber-500 text-slate-950 font-black text-xs">
                      MODERATE SURVEILLANCE
                    </span>
                  </div>

                  <div className="flex justify-between items-center bg-white/10 p-3.5 rounded-2xl border border-white/10">
                    <span className="text-slate-200 font-bold">PHI On-Duty Officers:</span>
                    <span className="text-[#4DB6AC] font-black text-xs">18 Officers Active</span>
                  </div>
                </div>

                <button
                  onClick={() => setSymptomModalOpen(true)}
                  className="w-full py-3.5 bg-gradient-to-r from-[#2E7D6B] to-[#4DB6AC] hover:opacity-95 text-white font-extrabold text-xs rounded-2xl flex items-center justify-center gap-2 shadow-lg transition"
                >
                  <Stethoscope className="w-4 h-4 stroke-[2.5]" />
                  <span>Launch AI Health Assistant</span>
                </button>
              </div>
            </motion.div>

          </div>
        </div>

        {/* Smooth Curved Wave Bottom Edge Section Divider */}
        <div className="absolute bottom-0 left-0 right-0 overflow-hidden leading-none pointer-events-none z-10 w-full">
          <svg 
            className="relative block w-full h-16 sm:h-24 lg:h-28 text-white dark:text-slate-900 fill-current" 
            viewBox="0 0 1440 320" 
            preserveAspectRatio="none"
          >
            <path 
              fillOpacity="0.35" 
              fill="#4DB6AC" 
              d="M0,192L48,197.3C96,203,192,213,288,208C384,203,480,181,576,181.3C672,181,768,203,864,213.3C960,224,1056,224,1152,208C1248,192,1344,160,1392,144L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
            ></path>
            <path 
              className="text-white dark:text-slate-900 fill-current"
              d="M0,224L48,213.3C96,203,192,181,288,181.3C384,181,480,203,576,218.7C672,235,768,245,864,234.7C960,224,1056,192,1152,181.3C1248,171,1344,181,1392,186.7L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
            ></path>
          </svg>
        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* ANIMATED STATISTICS BANNER BELOW HERO */}
      {/* ------------------------------------------------------------- */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-20">
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.97 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="bg-white/95 dark:bg-slate-800/95 backdrop-blur-xl rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-200/90 dark:border-slate-700/90 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-center relative overflow-hidden"
        >
          {/* Animated Gradient Accent Bar */}
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#2E7D6B] via-[#4DB6AC] to-emerald-400 animate-pulse" />

          {/* Stat 1: Families Served */}
          <motion.div
            whileHover={{ y: -6, scale: 1.03 }}
            transition={{ type: "spring", stiffness: 350, damping: 20 }}
            className="p-5 rounded-2xl bg-gradient-to-b from-slate-50/80 to-white dark:from-slate-800/80 dark:to-slate-800 border border-slate-100 dark:border-slate-700/60 shadow-sm hover:shadow-xl hover:border-[#2E7D6B]/40 transition-all duration-300 space-y-2 group"
          >
            <div className="w-10 h-10 mx-auto rounded-2xl bg-moh-100 dark:bg-moh-900/60 text-[#2E7D6B] dark:text-[#4DB6AC] flex items-center justify-center group-hover:scale-110 group-hover:bg-[#2E7D6B] group-hover:text-white transition-all duration-300 shadow-sm">
              <Users className="w-5 h-5" />
            </div>
            <div className="text-3xl sm:text-4xl font-black text-[#2E7D6B] dark:text-[#4DB6AC] tracking-tight">
              <AnimatedCountNumber value={52400} suffix="+" />
            </div>
            <div className="text-xs font-extrabold text-slate-800 dark:text-slate-100">Families Served</div>
            <div className="text-[11px] font-medium text-slate-500 dark:text-slate-400">Buttala MOH Division</div>
          </motion.div>

          {/* Stat 2: Immunization Rate */}
          <motion.div
            whileHover={{ y: -6, scale: 1.03 }}
            transition={{ type: "spring", stiffness: 350, damping: 20 }}
            className="p-5 rounded-2xl bg-gradient-to-b from-slate-50/80 to-white dark:from-slate-800/80 dark:to-slate-800 border border-slate-100 dark:border-slate-700/60 shadow-sm hover:shadow-xl hover:border-[#4DB6AC]/40 transition-all duration-300 space-y-2 group"
          >
            <div className="w-10 h-10 mx-auto rounded-2xl bg-teal-100 dark:bg-teal-900/60 text-[#4DB6AC] flex items-center justify-center group-hover:scale-110 group-hover:bg-[#4DB6AC] group-hover:text-white transition-all duration-300 shadow-sm">
              <Shield className="w-5 h-5" />
            </div>
            <div className="text-3xl sm:text-4xl font-black text-[#4DB6AC] tracking-tight">
              <AnimatedCountNumber value={99.2} decimals={1} suffix="%" />
            </div>
            <div className="text-xs font-extrabold text-slate-800 dark:text-slate-100">Immunization Rate</div>
            <div className="text-[11px] font-medium text-slate-500 dark:text-slate-400">National Target Exceeded</div>
          </motion.div>

          {/* Stat 3: PHM Divisions */}
          <motion.div
            whileHover={{ y: -6, scale: 1.03 }}
            transition={{ type: "spring", stiffness: 350, damping: 20 }}
            className="p-5 rounded-2xl bg-gradient-to-b from-slate-50/80 to-white dark:from-slate-800/80 dark:to-slate-800 border border-slate-100 dark:border-slate-700/60 shadow-sm hover:shadow-xl hover:border-[#2E7D6B]/40 transition-all duration-300 space-y-2 group"
          >
            <div className="w-10 h-10 mx-auto rounded-2xl bg-moh-100 dark:bg-moh-900/60 text-[#2E7D6B] dark:text-[#4DB6AC] flex items-center justify-center group-hover:scale-110 group-hover:bg-[#2E7D6B] group-hover:text-white transition-all duration-300 shadow-sm">
              <MapPin className="w-5 h-5" />
            </div>
            <div className="text-3xl sm:text-4xl font-black text-[#2E7D6B] dark:text-[#4DB6AC] tracking-tight">
              <AnimatedCountNumber value={18} suffix=" Areas" />
            </div>
            <div className="text-xs font-extrabold text-slate-800 dark:text-slate-100">PHM Divisions</div>
            <div className="text-[11px] font-medium text-slate-500 dark:text-slate-400">Field Midwife Coverage</div>
          </motion.div>

          {/* Stat 4: Annual Clinic Visits */}
          <motion.div
            whileHover={{ y: -6, scale: 1.03 }}
            transition={{ type: "spring", stiffness: 350, damping: 20 }}
            className="p-5 rounded-2xl bg-gradient-to-b from-slate-50/80 to-white dark:from-slate-800/80 dark:to-slate-800 border border-slate-100 dark:border-slate-700/60 shadow-sm hover:shadow-xl hover:border-teal-500/40 transition-all duration-300 space-y-2 group"
          >
            <div className="w-10 h-10 mx-auto rounded-2xl bg-emerald-100 dark:bg-emerald-900/60 text-emerald-600 dark:text-emerald-300 flex items-center justify-center group-hover:scale-110 group-hover:bg-emerald-600 group-hover:text-white transition-all duration-300 shadow-sm">
              <Activity className="w-5 h-5" />
            </div>
            <div className="text-3xl sm:text-4xl font-black text-teal-600 dark:text-teal-300 tracking-tight">
              <AnimatedCountNumber value={12500} suffix="+" />
            </div>
            <div className="text-xs font-extrabold text-slate-800 dark:text-slate-100">Annual Clinic Visits</div>
            <div className="text-[11px] font-medium text-slate-500 dark:text-slate-400">Maternal, NCD & Child Care</div>
          </motion.div>

        </motion.div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* 2. QUICK SERVICES SECTION (Icon Grid) */}
      {/* ------------------------------------------------------------- */}
      <section id="quick-services" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
        <motion.div {...fadeInUp} className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <span className="px-4 py-1.5 rounded-full bg-[#2E7D6B]/10 text-[#2E7D6B] dark:text-[#4DB6AC] font-extrabold text-xs uppercase tracking-wider border border-[#2E7D6B]/30">
            Government Healthcare Services
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Comprehensive Community Healthcare Services
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
            Standardized healthcare programs delivered directly through the Buttala Medical Officer of Health office and field Public Health Midwives (PHMs).
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {quickServices.map((srv, idx) => {
            const Icon = srv.icon;
            return (
              <motion.div
                key={srv.id}
                {...fadeInUp}
                whileHover={{ y: -8, scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <Link
                  to={srv.link}
                  className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-md p-7 rounded-3xl shadow-lg hover:shadow-2xl border border-slate-200/80 dark:border-slate-700/80 transition-all duration-300 group flex flex-col justify-between h-full relative overflow-hidden"
                >
                  {/* Card Accent */}
                  <div className="absolute top-0 right-0 w-24 h-24 bg-[#4DB6AC]/10 rounded-full blur-2xl group-hover:bg-[#4DB6AC]/20 transition-all"></div>

                  <div className="space-y-4 relative z-10">
                    <div className="flex items-center justify-between">
                      <div className={`w-14 h-14 rounded-2xl bg-gradient-to-tr ${srv.color} text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                        <Icon className="w-7 h-7 stroke-[2.5]" />
                      </div>
                      <span className="px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 font-black text-[10px] uppercase border border-slate-200 dark:border-slate-600">
                        {srv.badge}
                      </span>
                    </div>

                    <h3 className="font-extrabold text-slate-900 dark:text-white text-lg group-hover:text-[#2E7D6B] dark:group-hover:text-[#4DB6AC] transition">
                      {srv.title}
                    </h3>

                    <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
                      {srv.desc}
                    </p>
                  </div>

                  <div className="mt-6 flex items-center gap-2 text-xs font-extrabold text-[#2E7D6B] dark:text-[#4DB6AC] group-hover:gap-3 transition-all pt-4 border-t border-slate-100 dark:border-slate-700/60 relative z-10">
                    <span>Explore Service</span>
                    <ChevronRight className="w-4 h-4" />
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* 3. ANNOUNCEMENTS SECTION */}
      {/* ------------------------------------------------------------- */}
      <section id="announcements" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-[#2E7D6B]/5 via-[#4DB6AC]/10 to-[#2E7D6B]/5 dark:from-slate-900 dark:to-slate-800/90 p-8 sm:p-12 rounded-3xl border border-[#2E7D6B]/20 dark:border-slate-700/80 shadow-xl space-y-8">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200/80 dark:border-slate-700/80 pb-6">
            <div>
              <span className="px-3.5 py-1 rounded-full bg-[#2E7D6B] text-white text-[11px] font-extrabold uppercase tracking-wider shadow-xs">
                Official Bulletins
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mt-2 tracking-tight">
                Latest MOH Notices & Announcements
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
                Official press releases, dengue warnings, and community clinic schedules.
              </p>
            </div>

            <Link
              to="/articles"
              className="px-6 py-3 rounded-2xl bg-[#2E7D6B] hover:bg-[#236355] text-white text-xs font-extrabold shrink-0 flex items-center gap-2 shadow-md transition"
            >
              <span>View All Notices</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {announcements.map((item) => (
              <motion.div
                key={item.id}
                {...fadeInUp}
                whileHover={{ y: -5 }}
                className="bg-white dark:bg-slate-800 p-6 rounded-3xl shadow-md border border-slate-200/80 dark:border-slate-700/80 space-y-4 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-mono font-extrabold text-slate-500 dark:text-slate-400">
                      📅 {item.date}
                    </span>
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-black uppercase ${item.badgeColor}`}>
                      {item.badge}
                    </span>
                  </div>

                  <h3 className="font-extrabold text-slate-900 dark:text-white text-base leading-snug">
                    {item.title}
                  </h3>

                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
                    {item.summary}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100 dark:border-slate-700/60 flex justify-between items-center text-xs font-bold text-[#2E7D6B] dark:text-[#4DB6AC]">
                  <span>Category: {item.category}</span>
                  <ChevronRight className="w-4 h-4" />
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* 4. CLINIC SCHEDULE SECTION */}
      {/* ------------------------------------------------------------- */}
      <section id="clinic-schedule" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div {...fadeInUp} className="space-y-6">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="space-y-2">
              <span className="px-3.5 py-1 rounded-full bg-[#2E7D6B]/10 text-[#2E7D6B] dark:text-[#4DB6AC] font-extrabold text-xs uppercase tracking-wider border border-[#2E7D6B]/30">
                Weekly Timetable
              </span>
              <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                MOH Buttala Clinic Schedule
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
                Weekly schedule for maternal care, immunization, well woman clinics, and NCD screening.
              </p>
            </div>

            {/* Filter Buttons & PDF Download */}
            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={downloadPdfSchedule}
                className="px-5 py-2.5 rounded-xl bg-[#2E7D6B] hover:bg-[#236355] text-white font-extrabold text-xs flex items-center gap-2 shadow-md transition"
              >
                <Download className="w-4 h-4" />
                <span>Download PDF</span>
              </button>
            </div>
          </div>

          {/* Clinic Category Filters */}
          <div className="flex flex-wrap items-center gap-2 bg-slate-100 dark:bg-slate-800/80 p-2 rounded-2xl border border-slate-200 dark:border-slate-700">
            {['All', 'Maternal', 'Immunization', 'Well Woman', 'NCD', 'Dental'].map((filter) => (
              <button
                key={filter}
                onClick={() => setSelectedClinicFilter(filter)}
                className={`px-4 py-2 rounded-xl text-xs font-extrabold transition-all ${
                  selectedClinicFilter === filter
                    ? 'bg-[#2E7D6B] text-white shadow-md'
                    : 'text-slate-600 dark:text-slate-300 hover:bg-white dark:hover:bg-slate-700'
                }`}
              >
                {filter === 'All' ? 'All Clinics' : `${filter} Clinic`}
              </button>
            ))}
          </div>

          {/* Clean Table Design */}
          <div className="bg-white dark:bg-slate-800 rounded-3xl shadow-xl border border-slate-200/80 dark:border-slate-700/80 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-[#2E7D6B] text-white font-extrabold uppercase text-[11px] tracking-wider">
                    <th className="py-4 px-6">Day</th>
                    <th className="py-4 px-6">Time</th>
                    <th className="py-4 px-6">Clinic Type</th>
                    <th className="py-4 px-6">Venue / Location</th>
                    <th className="py-4 px-6">Medical Officer In-Charge</th>
                    <th className="py-4 px-6 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-700/60 font-medium">
                  {filteredSchedule.map((row, idx) => (
                    <tr key={idx} className="hover:bg-slate-50 dark:hover:bg-slate-700/50 transition">
                      <td className="py-4 px-6 font-extrabold text-slate-900 dark:text-white">
                        {row.day}
                      </td>
                      <td className="py-4 px-6 font-mono text-slate-600 dark:text-slate-300">
                        {row.time}
                      </td>
                      <td className="py-4 px-6">
                        <span className={`px-3 py-1 rounded-full font-extrabold text-[10px] uppercase border ${
                          row.tag === 'Maternal' ? 'bg-pink-100 text-pink-800 border-pink-200 dark:bg-pink-950/60 dark:text-pink-300' :
                          row.tag === 'Immunization' ? 'bg-cyan-100 text-cyan-800 border-cyan-200 dark:bg-cyan-950/60 dark:text-cyan-300' :
                          row.tag === 'Well Woman' ? 'bg-purple-100 text-purple-800 border-purple-200 dark:bg-purple-950/60 dark:text-purple-300' :
                          row.tag === 'NCD' ? 'bg-amber-100 text-amber-800 border-amber-200 dark:bg-amber-950/60 dark:text-amber-300' :
                          'bg-emerald-100 text-emerald-800 border-emerald-200 dark:bg-emerald-950/60 dark:text-emerald-300'
                        }`}>
                          {row.type}
                        </span>
                      </td>
                      <td className="py-4 px-6 text-slate-700 dark:text-slate-200 font-semibold">
                        📍 {row.location}
                      </td>
                      <td className="py-4 px-6 text-slate-600 dark:text-slate-300">
                        {row.doctor}
                      </td>
                      <td className="py-4 px-6 text-right">
                        <Link
                          to="/appointments"
                          className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-[#2E7D6B] text-white font-extrabold hover:bg-[#236355] transition"
                        >
                          <span>Book</span>
                          <ChevronRight className="w-3 h-3" />
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </motion.div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* 5. HEALTH EDUCATION SECTION */}
      {/* ------------------------------------------------------------- */}
      <section id="health-education" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div {...fadeInUp} className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <span className="px-4 py-1.5 rounded-full bg-[#2E7D6B]/10 text-[#2E7D6B] dark:text-[#4DB6AC] font-extrabold text-xs uppercase tracking-wider border border-[#2E7D6B]/30">
            Public Awareness & Guides
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Health Education & Community Awareness
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-sm">
            Doctor-approved preventive healthcare guides for families, mothers, and school students in Buttala.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
          {healthEducationCards.map((card, idx) => (
            <motion.div
              key={idx}
              {...fadeInUp}
              whileHover={{ y: -6 }}
              className="bg-white dark:bg-slate-800 rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl border border-slate-200/80 dark:border-slate-700/80 transition-all duration-300 group flex flex-col justify-between"
            >
              {/* Image Container with Hover Overlay & Error Fallback */}
              <div className="h-52 relative overflow-hidden bg-slate-100 dark:bg-slate-700">
                <img
                  src={card.image}
                  alt={card.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  onError={(e) => { e.target.onerror = null; e.target.src = defaultArticleSvg; }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-80 group-hover:opacity-90 transition-opacity"></div>
                <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-[#2E7D6B]/90 backdrop-blur-md text-white font-extrabold text-[10px] uppercase tracking-wider shadow-md">
                  {card.category}
                </span>
              </div>

              {/* Card Body */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <h3 className="font-extrabold text-slate-900 dark:text-white text-base leading-snug group-hover:text-[#2E7D6B] dark:group-hover:text-[#4DB6AC] transition">
                    {card.title}
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
                    {card.desc}
                  </p>
                </div>

                <Link
                  to="/articles"
                  className="pt-3 text-xs font-extrabold text-[#2E7D6B] dark:text-[#4DB6AC] flex items-center gap-1 hover:gap-2 transition-all border-t border-slate-100 dark:border-slate-700/60"
                >
                  <span>Read Full Advisory Guide</span>
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* 6. ONLINE SERVICES SECTION */}
      {/* ------------------------------------------------------------- */}
      <section id="online-services" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div {...fadeInUp} className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <span className="px-4 py-1.5 rounded-full bg-[#2E7D6B]/10 text-[#2E7D6B] dark:text-[#4DB6AC] font-extrabold text-xs uppercase tracking-wider border border-[#2E7D6B]/30">
            Citizen Digital Services
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Online Public Services & Registrations
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-sm">
            Skip queues and access government MOH services online with instant SMS updates.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Card 1: Online Appointment Booking */}
          <motion.div {...fadeInUp} className="bg-white dark:bg-slate-800 p-7 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-lg space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-[#2E7D6B] text-white flex items-center justify-center shadow-md">
                <Calendar className="w-6 h-6" />
              </div>
              <h3 className="font-extrabold text-slate-900 dark:text-white text-lg">Online Appointment Booking</h3>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
                Reserve digital token passes for maternal, immunization, and NCD clinic slots at MOH Buttala Central.
              </p>
            </div>
            <Link to="/appointments" className="w-full py-3 rounded-xl bg-[#2E7D6B] hover:bg-[#236355] text-white font-extrabold text-xs text-center block transition shadow-md">
              Book Clinic Pass
            </Link>
          </motion.div>

          {/* Card 2: Download Medical & MOH Forms */}
          <motion.div {...fadeInUp} className="bg-white dark:bg-slate-800 p-7 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-lg space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-[#4DB6AC] text-slate-950 flex items-center justify-center shadow-md font-bold">
                <FileText className="w-6 h-6" />
              </div>
              <h3 className="font-extrabold text-slate-900 dark:text-white text-lg">Download Official Forms</h3>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
                Download PDF templates for food outlet licensing, health certificates, and immunization charts.
              </p>
            </div>
            <Link to="/downloads" className="w-full py-3 rounded-xl bg-[#4DB6AC] hover:bg-teal-500 text-slate-950 font-extrabold text-xs text-center block transition shadow-md">
              Download PDF Forms
            </Link>
          </motion.div>

          {/* Card 3: PHI Complaints */}
          <motion.div {...fadeInUp} className="bg-white dark:bg-slate-800 p-7 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-lg space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-rose-600 text-white flex items-center justify-center shadow-md">
                <ShieldAlert className="w-6 h-6" />
              </div>
              <h3 className="font-extrabold text-slate-900 dark:text-white text-lg">Complaint Submission</h3>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
                Report mosquito breeding locations, illegal waste dumping, or unhygienic eateries to your area PHI.
              </p>
            </div>
            <Link to="/complaints" className="w-full py-3 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-extrabold text-xs text-center block transition shadow-md">
              Submit PHI Complaint
            </Link>
          </motion.div>

        </div>

        {/* SMS Reminder Box */}
        <div className="mt-8 bg-[#2E7D6B] text-white p-8 rounded-3xl border border-[#2E7D6B]/50 shadow-xl flex flex-col lg:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#4DB6AC]/30 text-white font-extrabold text-[11px] uppercase">
              <Bell className="w-3.5 h-3.5" />
              SMS Reminder Registration
            </div>
            <h3 className="text-xl font-extrabold text-white">Subscribe to Clinic & Vaccine SMS Alerts</h3>
            <p className="text-xs text-teal-100 max-w-lg">
              Receive automatic mobile SMS reminders 24 hours prior to your scheduled MOH clinic date or infant vaccine.
            </p>
          </div>

          <form onSubmit={handleSmsSubmit} className="flex flex-col sm:flex-row items-center gap-3 w-full max-w-md">
            <input
              type="tel"
              value={smsPhone}
              onChange={(e) => setSmsPhone(e.target.value)}
              placeholder="Enter mobile phone number (e.g. 077 123 4567)"
              className="w-full p-3.5 rounded-2xl bg-white text-slate-900 font-medium text-xs border-0 focus:outline-none focus:ring-2 focus:ring-[#4DB6AC] placeholder:text-slate-400"
            />
            <button
              type="submit"
              className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-[#4DB6AC] hover:bg-teal-300 text-slate-950 font-black text-xs shrink-0 transition shadow-md"
            >
              {smsRegistered ? 'Subscribed ✓' : 'Register SMS'}
            </button>
          </form>
        </div>

      </section>

      {/* ------------------------------------------------------------- */}
      {/* 7. MEET OUR TEAM SECTION */}
      {/* ------------------------------------------------------------- */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div {...fadeInUp} className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <span className="px-4 py-1.5 rounded-full bg-[#2E7D6B]/10 text-[#2E7D6B] dark:text-[#4DB6AC] font-extrabold text-xs uppercase tracking-wider border border-[#2E7D6B]/30">
            Dedicated Healthcare Professionals
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Meet Our MOH Buttala Team
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-sm">
            Our team of doctors, supervising public health inspectors, and senior nursing sisters serving Monaragala district.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamMembers.map((member, idx) => (
            <motion.div
              key={idx}
              {...fadeInUp}
              whileHover={{ y: -6 }}
              className="bg-white dark:bg-slate-800 p-6 rounded-3xl border border-slate-200/80 dark:border-slate-700/80 shadow-lg text-center space-y-4 group flex flex-col items-center justify-between"
            >
              <div className="space-y-4 flex flex-col items-center">
                {/* High-Resolution SVG Officer Avatar Container */}
                <div className="w-28 h-28 rounded-full overflow-hidden border-4 border-[#2E7D6B]/30 group-hover:border-[#2E7D6B] shadow-xl transition-all duration-300 bg-slate-900 flex items-center justify-center shrink-0">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>

                <div>
                  <h3 className="font-extrabold text-slate-900 dark:text-white text-base leading-snug">
                    {member.name}
                  </h3>
                  <p className="text-xs font-bold text-[#2E7D6B] dark:text-[#4DB6AC] mt-1">
                    {member.role}
                  </p>
                  <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5">
                    {member.qualifications}
                  </p>
                </div>
              </div>

              <button
                onClick={() => setSelectedTeamMember(member)}
                className="w-full py-2.5 rounded-xl bg-slate-100 dark:bg-slate-700 hover:bg-[#2E7D6B] hover:text-white text-[#2E7D6B] dark:text-[#4DB6AC] font-extrabold text-xs transition border border-slate-200 dark:border-slate-600 mt-2"
              >
                View Officer Bio
              </button>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Team Bio Modal */}
      <AnimatePresence>
        {selectedTeamMember && (
          <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white dark:bg-slate-900 rounded-3xl shadow-2xl max-w-md w-full overflow-hidden border border-slate-200 dark:border-slate-800 p-6 space-y-6"
            >
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
                <h3 className="font-extrabold text-sm text-slate-900 dark:text-white">Officer Biography</h3>
                <button onClick={() => setSelectedTeamMember(null)} className="p-1 text-slate-400 hover:text-slate-600">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-[#2E7D6B] shrink-0 bg-slate-900">
                  <img
                    src={selectedTeamMember.image}
                    alt={selectedTeamMember.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-extrabold text-slate-900 dark:text-white text-base">{selectedTeamMember.name}</h4>
                  <p className="text-xs font-bold text-[#2E7D6B] dark:text-[#4DB6AC]">{selectedTeamMember.role}</p>
                  <p className="text-[11px] text-slate-500">{selectedTeamMember.qualifications}</p>
                </div>
              </div>

              <div className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed bg-slate-50 dark:bg-slate-800 p-4 rounded-2xl">
                {selectedTeamMember.bio}
              </div>

              <button
                onClick={() => setSelectedTeamMember(null)}
                className="w-full py-3 bg-[#2E7D6B] text-white rounded-xl text-xs font-bold hover:bg-[#236355] transition"
              >
                Close Biography
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ------------------------------------------------------------- */}
      {/* 8. GALLERY SECTION */}
      {/* ------------------------------------------------------------- */}
      <section id="gallery" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div {...fadeInUp} className="space-y-6">
          
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <span className="px-3.5 py-1 rounded-full bg-[#2E7D6B]/10 text-[#2E7D6B] dark:text-[#4DB6AC] font-extrabold text-xs uppercase tracking-wider border border-[#2E7D6B]/30">
                Visual Field Work
              </span>
              <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight mt-2">
                MOH Buttala Photo Gallery
              </h2>
            </div>

            {/* Gallery Category Filter */}
            <div className="flex flex-wrap items-center gap-2 bg-slate-100 dark:bg-slate-800 p-1.5 rounded-2xl">
              {['All', 'Facilities', 'Clinics', 'Dengue Campaigns', 'School Health'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setGalleryFilter(cat)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-extrabold transition ${
                    galleryFilter === cat
                      ? 'bg-[#2E7D6B] text-white shadow-xs'
                      : 'text-slate-600 dark:text-slate-300 hover:bg-white'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Grid Layout with Error Fallbacks */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredGallery.map((item) => (
              <motion.div
                key={item.id}
                {...fadeInUp}
                whileHover={{ scale: 1.02 }}
                onClick={() => setSelectedGalleryImage(item)}
                className="group relative h-64 rounded-3xl overflow-hidden shadow-lg cursor-pointer border border-slate-200/80 dark:border-slate-700/80 bg-slate-900"
              >
                <img
                  src={item.url}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  onError={(e) => { e.target.onerror = null; e.target.src = defaultGallerySvg; }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent opacity-80 group-hover:opacity-95 transition-opacity p-6 flex flex-col justify-end">
                  <span className="text-[10px] font-extrabold text-[#4DB6AC] uppercase tracking-wider">
                    {item.category}
                  </span>
                  <h4 className="font-extrabold text-white text-sm mt-1">
                    {item.title}
                  </h4>
                  <div className="mt-2 text-[11px] text-emerald-200 flex items-center gap-1 font-bold">
                    <Eye className="w-3.5 h-3.5" />
                    <span>Click to Expand Lightbox</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

        </motion.div>
      </section>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedGalleryImage && (
          <div className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="max-w-4xl w-full bg-slate-900 rounded-3xl overflow-hidden shadow-2xl border border-slate-800 relative"
            >
              <button
                onClick={() => setSelectedGalleryImage(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-slate-800 text-white hover:bg-rose-600 transition z-10"
              >
                <X className="w-6 h-6" />
              </button>

              <div className="max-h-[70vh] overflow-hidden">
                <img
                  src={selectedGalleryImage.url}
                  alt={selectedGalleryImage.title}
                  className="w-full h-full object-contain"
                  onError={(e) => { e.target.onerror = null; e.target.src = defaultGallerySvg; }}
                />
              </div>

              <div className="p-6 bg-slate-900 text-white flex items-center justify-between">
                <div>
                  <span className="text-xs text-[#4DB6AC] font-extrabold uppercase">{selectedGalleryImage.category}</span>
                  <h3 className="text-lg font-extrabold mt-1">{selectedGalleryImage.title}</h3>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ------------------------------------------------------------- */}
      {/* 9. INTERACTIVE MAP SECTION */}
      {/* ------------------------------------------------------------- */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white dark:bg-slate-800 rounded-3xl p-8 sm:p-12 shadow-xl border border-slate-200/80 dark:border-slate-700/80 space-y-8">
          
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-slate-200/80 dark:border-slate-700/80 pb-6">
            <div>
              <span className="px-3.5 py-1 rounded-full bg-[#2E7D6B]/10 text-[#2E7D6B] dark:text-[#4DB6AC] font-extrabold text-xs uppercase tracking-wider border border-[#2E7D6B]/30">
                Location & Directions
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mt-2 tracking-tight">
                MOH Office Buttala Interactive Location Map
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
                Wellawaya Road, Buttala 91200, Monaragala District, Uva Province, Sri Lanka.
              </p>
            </div>

            <a
              href="https://maps.google.com/?q=Buttala+Medical+Officer+of+Health"
              target="_blank"
              rel="noreferrer"
              className="px-6 py-3.5 bg-[#2E7D6B] hover:bg-[#236355] text-white font-extrabold text-xs rounded-2xl flex items-center gap-2 shadow-md shrink-0 transition"
            >
              <MapPin className="w-4 h-4" />
              <span>Get Directions via Google Maps</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Embedded Google Map Frame */}
            <div className="lg:col-span-8 h-[380px] rounded-3xl overflow-hidden border border-slate-200 dark:border-slate-700 shadow-md relative">
              <iframe
                title="MOH Buttala Map Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15848.455325987114!2d81.24151241577717!3d6.756051515091807!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae4667d4f90bf49%3A0xb36bd2a831e5f8f8!2sButtala!5e0!3m2!1sen!2slk!4v1700000000000!5m2!1sen!2slk"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>

            {/* Quick Contact & Details Box */}
            <div className="lg:col-span-4 space-y-4 text-xs font-semibold bg-slate-50 dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-700">
              <h3 className="font-extrabold text-sm text-slate-900 dark:text-white uppercase tracking-wider border-b border-slate-200 dark:border-slate-800 pb-2">
                Office Information
              </h3>

              <div className="space-y-3 text-slate-700 dark:text-slate-300">
                <div className="flex items-start gap-2.5">
                  <MapPin className="w-4 h-4 text-[#2E7D6B] shrink-0 mt-0.5" />
                  <span>MOH Office, Wellawaya Road, Buttala, Sri Lanka</span>
                </div>

                <div className="flex items-center gap-2.5">
                  <PhoneCall className="w-4 h-4 text-[#2E7D6B] shrink-0" />
                  <span>General Hotline: +94 55 227 3222</span>
                </div>

                <div className="flex items-center gap-2.5">
                  <Mail className="w-4 h-4 text-[#2E7D6B] shrink-0" />
                  <span>Email: mohbuttala@health.gov.lk</span>
                </div>

                <div className="flex items-center gap-2.5">
                  <Clock className="w-4 h-4 text-[#2E7D6B] shrink-0" />
                  <span>Public Hours: Mon - Fri (8:00 AM - 4:00 PM)</span>
                </div>

                <div className="pt-2 border-t border-slate-200 dark:border-slate-800 text-[11px] text-slate-500">
                  🚍 Bus Landmark: 400m from Buttala Central Bus Stand on Wellawaya Road.
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* AI Symptom Checker Modal Trigger */}
      <SymptomCheckerModal
        isOpen={symptomModalOpen}
        onClose={() => setSymptomModalOpen(false)}
      />

    </div>
  );
};
