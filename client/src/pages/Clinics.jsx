import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useData } from '../context/DataContext';
import { seedClinics, seedDoctors } from '../data/mohSeedData.js';
import { Cross, MapPin, Phone, Mail, Clock, Search, Filter, Calendar, Users, Stethoscope } from 'lucide-react';

export const Clinics = () => {
  const { clinicSchedules, teamMembers } = useData();

  // Combine seedClinics with dynamic clinicSchedules from Admin Context
  const allClinics = clinicSchedules && clinicSchedules.length > 0
    ? clinicSchedules.map(c => ({
        id: c.id,
        name: c.name || c.type || 'MOH Primary Care Clinic',
        division: c.division || 'Buttala',
        district: c.district || 'Monaragala',
        address: c.location || c.venue || c.address || 'MOH Buttala Central Clinic',
        phone: c.phone || '+94 55 227 3222',
        email: c.email || 'buttala.moh@health.gov.lk',
        lat: c.lat || 6.7562,
        lng: c.lng || 81.2464,
        categories: c.categories || [c.tag || 'Maternal Care'],
        doctors: [c.doctor || 'Dr. K. M. Wickramasinghe'],
        operatingHours: c.time || c.operatingHours || 'Mon-Sat: 8:30 AM - 4:00 PM',
        capacityPerSlot: c.capacityPerSlot || 15
      }))
    : seedClinics;

  const [divisionFilter, setDivisionFilter] = useState('All');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const divisions = ['All', 'Buttala', 'Colombo Central', 'Kandy Municipal', 'Galle Four Gravets', 'Jaffna', 'Gampaha'];
  const categories = ['All', 'Vaccination', 'Maternal Care', 'Child Health', 'Communicable Diseases', 'Rabies Vaccine', 'NCD Screening'];

  const filteredClinics = allClinics.filter(c => {
    const matchesDiv = divisionFilter === 'All' || c.division === divisionFilter;
    const matchesCat = categoryFilter === 'All' || (c.categories && c.categories.includes(categoryFilter));
    const matchesSearch = !searchQuery || 
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      (c.address && c.address.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (c.district && c.district.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesDiv && matchesCat && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Header */}
      <div className="space-y-3">
        <span className="px-3 py-1 rounded-full bg-moh-100 dark:bg-moh-900/60 text-moh-700 dark:text-moh-300 font-bold text-xs uppercase tracking-wider">
          MOH Primary Healthcare Directory
        </span>
        <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Find MOH Clinics & Medical Centers in Sri Lanka
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-3xl">
          Search MOH clinics by division, service category, or operating hours. Book appointment slots online for hassle-free consultations.
        </p>
      </div>

      {/* Filter & Search Controls */}
      <div className="bg-white dark:bg-slate-800 p-5 rounded-3xl shadow-sm border border-slate-200 dark:border-slate-700 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          
          {/* Search Input */}
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search clinic name, location, district..."
              className="w-full pl-10 pr-4 py-2.5 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 rounded-2xl text-xs border border-slate-300 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-moh-500"
            />
          </div>

          {/* Division Filter */}
          <div>
            <select
              value={divisionFilter}
              onChange={(e) => setDivisionFilter(e.target.value)}
              className="w-full py-2.5 px-3 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 rounded-2xl text-xs border border-slate-300 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-moh-500 font-medium"
            >
              {divisions.map(d => (
                <option key={d} value={d}>Division: {d}</option>
              ))}
            </select>
          </div>

          {/* Category Filter */}
          <div>
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="w-full py-2.5 px-3 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 rounded-2xl text-xs border border-slate-300 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-moh-500 font-medium"
            >
              {categories.map(c => (
                <option key={c} value={c}>Category: {c}</option>
              ))}
            </select>
          </div>

        </div>
      </div>

      {/* Clinic Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredClinics.map(clinic => {
          const clinicDocs = seedDoctors.filter(d => clinic.doctors.includes(d.id));

          return (
            <div
              key={clinic.id}
              className="bg-white dark:bg-slate-800 rounded-3xl p-6 shadow-sm hover:shadow-xl border border-slate-200/80 dark:border-slate-700/80 transition-all flex flex-col justify-between"
            >
              <div className="space-y-4">
                
                <div className="flex items-start justify-between gap-3">
                  <div className="w-11 h-11 rounded-2xl bg-moh-100 dark:bg-moh-900/60 text-moh-700 dark:text-moh-300 flex items-center justify-center font-bold shrink-0">
                    <Cross className="w-6 h-6 stroke-[2.5]" />
                  </div>
                  <span className="px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 text-[11px] font-bold">
                    {clinic.division}
                  </span>
                </div>

                <div>
                  <h3 className="font-extrabold text-slate-900 dark:text-white text-base leading-snug">
                    {clinic.name}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-moh-500 shrink-0" />
                    <span>{clinic.address}</span>
                  </p>
                </div>

                {/* Categories */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {clinic.categories.map((cat, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 rounded-lg bg-teal-50 dark:bg-teal-950/60 text-teal-700 dark:text-teal-300 text-[10px] font-bold border border-teal-200 dark:border-teal-800"
                    >
                      {cat}
                    </span>
                  ))}
                </div>

                {/* Info List */}
                <div className="space-y-2 text-xs text-slate-600 dark:text-slate-300 border-t border-slate-100 dark:border-slate-700/60 pt-3">
                  <div className="flex items-center gap-2">
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                    <span>{clinic.operatingHours}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="w-3.5 h-3.5 text-slate-400" />
                    <span>{clinic.phone}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Stethoscope className="w-3.5 h-3.5 text-slate-400" />
                    <span>Doctors: {clinicDocs.map(d => d.name).join(', ')}</span>
                  </div>
                </div>

              </div>

              {/* Action Button */}
              <div className="pt-5 border-t border-slate-100 dark:border-slate-700/60 mt-4">
                <Link
                  to={`/appointments?clinicId=${clinic.id}`}
                  className="w-full py-2.5 bg-moh-600 hover:bg-moh-700 text-white rounded-xl font-bold text-xs flex items-center justify-center gap-2 shadow-md transition"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Book Appointment at this Clinic</span>
                </Link>
              </div>

            </div>
          );
        })}
      </div>

    </div>
  );
};
