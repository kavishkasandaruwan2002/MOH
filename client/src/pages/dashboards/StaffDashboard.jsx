import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { seedAppointments } from '../../data/mohSeedData.js';
import { Stethoscope, CheckCircle2, Clock, Users, Calendar, Scan, Plus, Check, X } from 'lucide-react';

export const StaffDashboard = () => {
  const { user } = useAuth();
  const [appointments, setAppointments] = useState(seedAppointments);
  const [scannedResult, setScannedResult] = useState(null);

  const handleSimulateScan = () => {
    setScannedResult({
      id: "APT-2026-109",
      citizenName: "Sunethra Ranasinghe",
      nic: "199056781234",
      serviceCategory: "Maternal Care",
      status: "CONFIRMED"
    });
  };

  const updateStatus = (id, newStatus) => {
    setAppointments(appointments.map(a => a.id === id ? { ...a, status: newStatus } : a));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Staff Header Banner */}
      <div className="bg-gradient-to-r from-teal-800 to-moh-800 text-white rounded-3xl p-6 sm:p-8 shadow-xl flex items-center justify-between">
        <div>
          <span className="px-2.5 py-0.5 rounded bg-teal-400/20 text-teal-300 font-extrabold text-xs uppercase">
            MOH Clinical Desk
          </span>
          <h1 className="text-2xl font-extrabold text-white mt-1">{user?.name || 'Dr. K. L. Perera'}</h1>
          <p className="text-xs text-teal-100">Division: {user?.division || 'Colombo Central'} • Total Queue Today: {appointments.length} Patients</p>
        </div>

        <button
          onClick={handleSimulateScan}
          className="px-5 py-3 bg-white text-teal-900 rounded-2xl font-bold text-xs shadow-lg hover:scale-105 transition flex items-center gap-2"
        >
          <Scan className="w-4 h-4 text-teal-600" />
          <span>Simulate QR Ticket Scanner</span>
        </button>
      </div>

      {scannedResult && (
        <div className="bg-emerald-50 dark:bg-emerald-950/60 p-4 rounded-2xl border border-emerald-300 flex justify-between items-center text-xs">
          <div>
            <span className="font-bold text-emerald-800 dark:text-emerald-200">Scanned Patient Verified:</span> {scannedResult.citizenName} ({scannedResult.nic}) - {scannedResult.serviceCategory}
          </div>
          <button onClick={() => updateStatus(scannedResult.id, 'COMPLETED')} className="px-3 py-1 bg-emerald-600 text-white rounded-lg font-bold">
            Mark Attended & Completed
          </button>
        </div>
      )}

      {/* Today's Patients Queue */}
      <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 shadow-xl border border-slate-200 dark:border-slate-700 space-y-4">
        <h3 className="font-extrabold text-slate-900 dark:text-white text-base">Today's Appointment Queue</h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 dark:bg-slate-900 text-slate-500 font-bold uppercase text-[10px]">
              <tr>
                <th className="p-3">Ticket ID</th>
                <th className="p-3">Patient Name</th>
                <th className="p-3">NIC</th>
                <th className="p-3">Category</th>
                <th className="p-3">Time Slot</th>
                <th className="p-3">Status</th>
                <th className="p-3">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-700 font-medium">
              {appointments.map(apt => (
                <tr key={apt.id}>
                  <td className="p-3 font-mono font-bold text-moh-600">{apt.id}</td>
                  <td className="p-3 font-bold text-slate-900 dark:text-white">{apt.citizenName}</td>
                  <td className="p-3 font-mono">{apt.nic}</td>
                  <td className="p-3">{apt.serviceCategory}</td>
                  <td className="p-3 font-bold">{apt.appointmentTime}</td>
                  <td className="p-3">
                    <span className={`px-2 py-0.5 rounded font-bold text-[10px] ${
                      apt.status === 'COMPLETED' ? 'bg-emerald-100 text-emerald-800' : 'bg-blue-100 text-blue-800'
                    }`}>
                      {apt.status}
                    </span>
                  </td>
                  <td className="p-3 flex gap-1">
                    <button onClick={() => updateStatus(apt.id, 'COMPLETED')} className="p-1 rounded bg-emerald-500 text-white" title="Complete"><Check className="w-4 h-4" /></button>
                    <button onClick={() => updateStatus(apt.id, 'CANCELLED')} className="p-1 rounded bg-rose-500 text-white" title="Cancel"><X className="w-4 h-4" /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
