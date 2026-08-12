import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { seedComplaints } from '../../data/mohSeedData.js';
import { Shield, AlertCircle, CheckCircle2, MapPin, FileText, Check, Clock, Camera } from 'lucide-react';
import { ProfileSettingsModal } from '../../components/profile/ProfileSettingsModal';

export const PHIDashboard = () => {
  const { user } = useAuth();
  const [complaints, setComplaints] = useState(seedComplaints);
  const [selectedCmp, setSelectedCmp] = useState(null);
  const [phiNotesInput, setPhiNotesInput] = useState('');
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);

  const updateStatus = (id, newStatus) => {
    setComplaints(complaints.map(c => c.id === id ? {
      ...c,
      status: newStatus,
      phiNotes: phiNotesInput || c.phiNotes
    } : c));
    setSelectedCmp(null);
    setPhiNotesInput('');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Profile Settings Modal */}
      <ProfileSettingsModal
        isOpen={isProfileModalOpen}
        onClose={() => setIsProfileModalOpen(false)}
      />

      {/* Header Banner */}
      <div className="bg-gradient-to-r from-amber-700 to-orange-800 text-white rounded-3xl p-6 sm:p-8 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-white/10 border border-white/20 overflow-hidden flex items-center justify-center font-extrabold text-2xl text-amber-300 shrink-0">
            {user?.avatar ? (
              <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
            ) : (
              <span>{user?.name?.[0] || 'P'}</span>
            )}
          </div>
          <div>
            <span className="px-2.5 py-0.5 rounded bg-amber-400/20 text-amber-300 font-extrabold text-xs uppercase">
              Public Health Inspector Field Desk
            </span>
            <h1 className="text-2xl font-extrabold text-white mt-1">{user?.name || 'PHI - Nimal Bandara'}</h1>
            <p className="text-xs text-amber-100">Assigned Division: {user?.division || 'Buttala'} • Total Inspections Pending: {complaints.filter(c => c.status !== 'RESOLVED').length}</p>
          </div>
        </div>

        <button
          onClick={() => setIsProfileModalOpen(true)}
          className="px-4 py-2.5 bg-white/15 hover:bg-white/25 text-white backdrop-blur-md rounded-2xl font-bold text-xs border border-white/20 transition flex items-center gap-2"
        >
          <Camera className="w-4 h-4 text-amber-300" />
          <span>Edit Profile & Photo</span>
        </button>
      </div>

      {/* Field Complaints Table */}
      <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 shadow-xl border border-slate-200 dark:border-slate-700 space-y-4">
        <h3 className="font-extrabold text-slate-900 dark:text-white text-base">Assigned Field Complaints</h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 dark:bg-slate-900 text-slate-500 font-bold uppercase text-[10px]">
              <tr>
                <th className="p-3">Tracking Code</th>
                <th className="p-3">Category</th>
                <th className="p-3">Location & Landmark</th>
                <th className="p-3">Complainant</th>
                <th className="p-3">Status</th>
                <th className="p-3">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-700 font-medium">
              {complaints.map(cmp => (
                <tr key={cmp.id}>
                  <td className="p-3 font-mono font-bold text-amber-600">{cmp.id}</td>
                  <td className="p-3 font-bold text-slate-900 dark:text-white">{cmp.category}</td>
                  <td className="p-3">{cmp.locationName}</td>
                  <td className="p-3">{cmp.citizenName} ({cmp.phone})</td>
                  <td className="p-3">
                    <span className={`px-2 py-0.5 rounded font-bold text-[10px] ${
                      cmp.status === 'RESOLVED' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                    }`}>
                      {cmp.status}
                    </span>
                  </td>
                  <td className="p-3">
                    <button
                      onClick={() => setSelectedCmp(cmp)}
                      className="px-3 py-1 bg-amber-600 text-white font-bold rounded-lg hover:bg-amber-700"
                    >
                      Update Inspection
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal for PHI Inspection Update */}
      {selectedCmp && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-md w-full p-6 space-y-4 border border-slate-200 dark:border-slate-800">
            <h3 className="font-extrabold text-base text-slate-900 dark:text-white">Update PHI Inspection: {selectedCmp.id}</h3>
            
            <p className="text-xs text-slate-600 dark:text-slate-400"><b>Category:</b> {selectedCmp.category} @ {selectedCmp.locationName}</p>

            <div>
              <label className="block text-xs font-bold mb-1">Inspection Notes / Legal Notices Served:</label>
              <textarea
                rows="3"
                value={phiNotesInput}
                onChange={(e) => setPhiNotesInput(e.target.value)}
                placeholder="Served notice under Mosquito Breeding Act..."
                className="w-full p-2.5 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 border border-slate-300 dark:border-slate-700 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-amber-500"
              ></textarea>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => updateStatus(selectedCmp.id, 'ACTION_TAKEN')}
                className="flex-1 py-2 bg-amber-600 text-white rounded-xl text-xs font-bold"
              >
                Mark Action Taken
              </button>
              <button
                onClick={() => updateStatus(selectedCmp.id, 'RESOLVED')}
                className="flex-1 py-2 bg-emerald-600 text-white rounded-xl text-xs font-bold"
              >
                Mark Resolved
              </button>
            </div>
            
            <button onClick={() => setSelectedCmp(null)} className="w-full py-2 bg-slate-200 text-slate-700 rounded-xl text-xs font-bold">
              Cancel
            </button>
          </div>
        </div>
      )}

    </div>
  );
};
