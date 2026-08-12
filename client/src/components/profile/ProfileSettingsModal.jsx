import React, { useState, useRef } from 'react';
import { useAuth } from '../../context/AuthContext';
import { 
  X, Camera, User, Mail, Phone, ShieldCheck, MapPin, 
  UploadCloud, CheckCircle2, Save, FileText, Stethoscope, Sparkles 
} from 'lucide-react';

export const ProfileSettingsModal = ({ isOpen, onClose }) => {
  const { user, updateProfile } = useAuth();
  const fileInputRef = useRef(null);

  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    nic: user?.nic || '',
    division: user?.division || 'Buttala',
    avatar: user?.avatar || '',
    designation: user?.designation || (user?.role === 'DOCTOR' ? 'Medical Officer' : user?.role === 'PHI' ? 'Public Health Inspector' : 'Registered User'),
    bio: user?.bio || '',
    qualifications: user?.qualifications || ''
  });

  const [isDragging, setIsDragging] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');

  if (!isOpen) return null;

  const handleFileSelect = (file) => {
    if (!file || !file.type.startsWith('image/')) {
      alert("Please select a valid image file (PNG, JPG, WEBP, etc.)");
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      setFormData(prev => ({
        ...prev,
        avatar: e.target.result
      }));
    };
    reader.readAsDataURL(file);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFileSelect(e.dataTransfer.files[0]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateProfile(formData);
    setSuccessMsg("Profile details and photo updated successfully!");
    setTimeout(() => {
      setSuccessMsg('');
      onClose();
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4 font-sans">
      <div className="bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 rounded-3xl shadow-2xl max-w-xl w-full p-6 space-y-5 border border-slate-200 dark:border-slate-800 animate-in zoom-in-95 duration-200 relative max-h-[90vh] overflow-y-auto">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4">
          <div>
            <span className="px-2.5 py-0.5 rounded bg-moh-100 text-moh-800 dark:bg-moh-900/60 dark:text-moh-300 font-extrabold text-[11px] uppercase tracking-wider">
              {user?.role} Account Profile
            </span>
            <h2 className="text-xl font-black text-slate-900 dark:text-white mt-1">
              Edit My Profile & Photo
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-700 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Success Alert Banner */}
        {successMsg && (
          <div className="p-3 bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800 rounded-2xl text-xs font-bold flex items-center gap-2 animate-in fade-in">
            <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
            <span>{successMsg}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          
          {/* Avatar Upload Dropzone & Circular Preview */}
          <div className="flex flex-col sm:flex-row items-center gap-5 p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-200/80 dark:border-slate-700/80">
            <div className="relative shrink-0 group">
              <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-white dark:border-slate-800 shadow-md bg-moh-600 text-white flex items-center justify-center font-black text-3xl">
                {formData.avatar ? (
                  <img src={formData.avatar} alt="Profile Avatar" className="w-full h-full object-cover" />
                ) : (
                  <span>{formData.name ? formData.name.charAt(0).toUpperCase() : 'U'}</span>
                )}
              </div>
              <button
                type="button"
                onClick={() => fileInputRef.current && fileInputRef.current.click()}
                className="absolute bottom-0 right-0 bg-moh-600 hover:bg-moh-700 text-white p-2 rounded-full shadow-lg transition border-2 border-white dark:border-slate-900 cursor-pointer"
                title="Upload Photo"
              >
                <Camera className="w-4 h-4" />
              </button>
            </div>

            <div className="flex-1 text-center sm:text-left space-y-2 w-full">
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                  if (e.target.files && e.target.files[0]) {
                    handleFileSelect(e.target.files[0]);
                  }
                }}
              />

              <div
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current && fileInputRef.current.click()}
                className={`border-2 border-dashed rounded-xl p-3 text-center cursor-pointer transition-all ${
                  isDragging
                    ? 'border-moh-500 bg-moh-50 dark:bg-moh-950/40'
                    : 'border-slate-300 dark:border-slate-700 hover:border-moh-400 bg-white dark:bg-slate-800'
                }`}
              >
                <p className="font-extrabold text-slate-800 dark:text-slate-200 text-xs">
                  Drag & Drop profile photo, or <span className="text-moh-600 dark:text-teal-400 underline">Browse File</span>
                </p>
                <p className="text-[10px] text-slate-400 mt-0.5">Supports PNG, JPG, WEBP formats</p>
              </div>

              {formData.avatar && (
                <button
                  type="button"
                  onClick={() => setFormData(prev => ({ ...prev, avatar: '' }))}
                  className="text-[11px] font-bold text-rose-500 hover:underline"
                >
                  Remove Photo
                </button>
              )}
            </div>
          </div>

          {/* Form Fields Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-bold mb-1 text-slate-700 dark:text-slate-300">Full Name *</label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full pl-9 pr-3 py-2 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-moh-500 font-semibold"
                />
              </div>
            </div>

            <div>
              <label className="block font-bold mb-1 text-slate-700 dark:text-slate-300">Email Address *</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full pl-9 pr-3 py-2 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-moh-500 font-semibold"
                />
              </div>
            </div>

            <div>
              <label className="block font-bold mb-1 text-slate-700 dark:text-slate-300">Phone Number</label>
              <div className="relative">
                <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                <input
                  type="text"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="+94 77 123 4567"
                  className="w-full pl-9 pr-3 py-2 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-moh-500 font-semibold"
                />
              </div>
            </div>

            <div>
              <label className="block font-bold mb-1 text-slate-700 dark:text-slate-300">NIC Number</label>
              <div className="relative">
                <ShieldCheck className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                <input
                  type="text"
                  value={formData.nic}
                  onChange={(e) => setFormData({ ...formData, nic: e.target.value })}
                  placeholder="199012345678"
                  className="w-full pl-9 pr-3 py-2 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-moh-500 font-mono"
                />
              </div>
            </div>

            <div>
              <label className="block font-bold mb-1 text-slate-700 dark:text-slate-300">MOH Division / Region</label>
              <div className="relative">
                <MapPin className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                <input
                  type="text"
                  value={formData.division}
                  onChange={(e) => setFormData({ ...formData, division: e.target.value })}
                  className="w-full pl-9 pr-3 py-2 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-moh-500 font-semibold"
                />
              </div>
            </div>

            <div>
              <label className="block font-bold mb-1 text-slate-700 dark:text-slate-300">Title / Designation</label>
              <div className="relative">
                <Stethoscope className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                <input
                  type="text"
                  value={formData.designation}
                  onChange={(e) => setFormData({ ...formData, designation: e.target.value })}
                  placeholder="e.g. Senior Public Health Inspector"
                  className="w-full pl-9 pr-3 py-2 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-moh-500 font-semibold"
                />
              </div>
            </div>
          </div>

          <div>
            <label className="block font-bold mb-1 text-slate-700 dark:text-slate-300">Profile Bio / Public Summary</label>
            <textarea
              rows="3"
              value={formData.bio}
              onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
              placeholder="Short description of your role or responsibilities..."
              className="w-full p-2.5 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-moh-500"
            ></textarea>
          </div>

          <div className="pt-2 flex gap-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2.5 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-xl font-bold hover:bg-slate-200 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 py-2.5 bg-moh-600 hover:bg-moh-700 text-white rounded-xl font-bold transition shadow-md flex items-center justify-center gap-2"
            >
              <Save className="w-4 h-4" />
              <span>Save Profile Changes</span>
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};
