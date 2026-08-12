import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { seedAppointments, seedComplaints } from '../../data/mohSeedData.js';
import { 
  User, Calendar, Syringe, ShieldAlert, Bell, FileText, 
  CheckCircle2, Clock, Download, ArrowRight, Camera, Edit3 
} from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';
import { ProfileSettingsModal } from '../../components/profile/ProfileSettingsModal';

export const CitizenDashboard = () => {
  const { user } = useAuth();
  const [appointments] = useState(seedAppointments);
  const [complaints] = useState(seedComplaints.filter(c => c.citizenName.includes('Kamal') || c.citizenName.includes('Sunethra')));
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Profile Settings Modal */}
      <ProfileSettingsModal
        isOpen={isProfileModalOpen}
        onClose={() => setIsProfileModalOpen(false)}
      />

      {/* Citizen Profile Banner */}
      <div className="bg-gradient-to-r from-moh-800 to-teal-700 text-white rounded-3xl p-6 sm:p-8 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-white/10 border border-white/20 overflow-hidden flex items-center justify-center font-extrabold text-2xl text-teal-300 shrink-0">
            {user?.avatar ? (
              <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
            ) : (
              <span>{user?.name?.[0] || 'C'}</span>
            )}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-extrabold text-white">{user?.name || 'Sunethra Ranasinghe'}</h1>
              <span className="px-2.5 py-0.5 rounded bg-emerald-400/20 text-emerald-300 font-bold text-[10px] uppercase border border-emerald-400/30">
                Verified Citizen
              </span>
            </div>
            <p className="text-xs text-teal-100 mt-1">NIC: {user?.nic || '199056781234'} • MOH Division: {user?.division || 'Buttala'}</p>
          </div>
        </div>

        <button
          onClick={() => setIsProfileModalOpen(true)}
          className="px-4 py-2.5 bg-white/15 hover:bg-white/25 text-white backdrop-blur-md rounded-2xl font-bold text-xs border border-white/20 transition flex items-center gap-2"
        >
          <Camera className="w-4 h-4 text-teal-300" />
          <span>Edit Profile & Photo</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Appointments & Vaccines */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* Upcoming Appointments Card */}
          <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 shadow-xl border border-slate-200 dark:border-slate-700 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-700 pb-3">
              <h3 className="font-extrabold text-slate-900 dark:text-white text-base flex items-center gap-2">
                <Calendar className="w-5 h-5 text-moh-600" />
                <span>My Clinic Appointments</span>
              </h3>
              <span className="text-xs font-bold text-moh-600">{appointments.length} Active</span>
            </div>

            <div className="space-y-3">
              {appointments.map(apt => (
                <div key={apt.id} className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <div className="space-y-1 text-xs">
                    <span className="font-mono text-moh-600 font-extrabold">{apt.id}</span>
                    <h4 className="font-bold text-slate-900 dark:text-white text-sm">{apt.clinicName}</h4>
                    <p className="text-slate-600 dark:text-slate-300">Doctor: <b>{apt.doctorName}</b> ({apt.serviceCategory})</p>
                    <p className="text-slate-500">Date: <b className="text-moh-700 dark:text-moh-300">{apt.appointmentDate} @ {apt.appointmentTime}</b></p>
                  </div>
                  <span className="px-3 py-1 bg-emerald-100 text-emerald-800 text-[11px] font-bold rounded-full">
                    {apt.status}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* My Complaints History */}
          <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 shadow-xl border border-slate-200 dark:border-slate-700 space-y-4">
            <h3 className="font-extrabold text-slate-900 dark:text-white text-base flex items-center gap-2">
              <ShieldAlert className="w-5 h-5 text-amber-500" />
              <span>My Filed Environmental Complaints</span>
            </h3>

            <div className="space-y-3">
              {complaints.map(cmp => (
                <div key={cmp.id} className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 space-y-2 text-xs">
                  <div className="flex justify-between items-center">
                    <span className="font-mono text-amber-600 font-bold">{cmp.id}</span>
                    <span className="px-2.5 py-0.5 bg-amber-100 text-amber-800 rounded-full font-bold text-[10px]">{cmp.status}</span>
                  </div>
                  <div className="font-bold text-slate-900 dark:text-white text-sm">{cmp.category}</div>
                  <p className="text-slate-600 dark:text-slate-400">{cmp.locationName}</p>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Right Column: Quick Notifications */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 shadow-xl border border-slate-200 dark:border-slate-700 space-y-4">
            <h3 className="font-extrabold text-slate-900 dark:text-white text-sm flex items-center gap-2">
              <Bell className="w-4 h-4 text-moh-600" />
              <span>Health Notifications</span>
            </h3>

            <div className="space-y-3 text-xs">
              <div className="p-3 rounded-2xl bg-teal-50 dark:bg-teal-950/60 border border-teal-200 dark:border-teal-800 text-teal-900 dark:text-teal-200">
                <span className="font-bold block">MMR Vaccine Due</span>
                Child booster due on August 15 at Colombo Central MOH Clinic.
              </div>
              <div className="p-3 rounded-2xl bg-rose-50 dark:bg-rose-950/60 border border-rose-200 dark:border-rose-800 text-rose-900 dark:text-rose-200">
                <span className="font-bold block">Dengue Alert in your Zone</span>
                Active fogging scheduled for Baseline Road on Sunday morning.
              </div>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};
