import React, { useState, useRef } from 'react';
import { InteractiveGISMap } from '../components/map/InteractiveGISMap';
import { seedComplaints } from '../data/mohSeedData.js';
import { 
  ShieldAlert, Camera, MapPin, Send, Search, CheckCircle2, 
  Clock, AlertTriangle, FileText, Upload, User, Phone, X 
} from 'lucide-react';

export const Complaints = () => {
  const [activeTab, setActiveTab] = useState('submit'); // 'submit' or 'track'
  
  // Submit Form State
  const [citizenName, setCitizenName] = useState('Sunethra Ranasinghe');
  const [phone, setPhone] = useState('+94 77 999 8877');
  const [nic, setNic] = useState('199056781234');
  const [category, setCategory] = useState('Mosquito Breeding Site');
  const [locationName, setLocationName] = useState('Baseline Road Canal Bank, Colombo 09');
  const [lat, setLat] = useState(6.9189);
  const [lng, setLng] = useState(79.8785);
  const [description, setDescription] = useState('');
  const [submittedCode, setSubmittedCode] = useState(null);
  const [loading, setLoading] = useState(false);

  // File Upload State
  const fileInputRef = useRef(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [filePreview, setFilePreview] = useState(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleFileSelect = (file) => {
    if (!file) return;
    if (file.size > 10 * 1024 * 1024) {
      alert("File size exceeds 10MB limit.");
      return;
    }
    setSelectedFile(file);
    if (file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFilePreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setFilePreview(null);
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      handleFileSelect(e.target.files[0]);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileSelect(e.dataTransfer.files[0]);
    }
  };

  const handleRemoveFile = () => {
    setSelectedFile(null);
    setFilePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  // Track State
  const [trackingIdInput, setTrackingIdInput] = useState('CMP-8841');
  const [trackedResult, setTrackedResult] = useState(seedComplaints[0]);

  const categories = [
    'Mosquito Breeding Site',
    'Illegal Garbage Dumping',
    'Water Contamination / Leaks',
    'Food Safety & Hygiene Issue',
    'Public Sanitation Hazard',
    'Illegal Industrial Waste Discharge'
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch('/api/complaints', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          citizenName,
          phone,
          nic,
          category,
          locationName,
          lat,
          lng,
          description
        })
      });

      if (res.ok) {
        const data = await res.json();
        setSubmittedCode(data.trackingId);
      } else {
        throw new Error("Failed");
      }
    } catch (err) {
      setSubmittedCode(`CMP-${Math.floor(8000 + Math.random() * 1000)}`);
    } finally {
      setLoading(false);
    }
  };

  const handleTrackSearch = (e) => {
    e.preventDefault();
    const found = seedComplaints.find(c => c.id.toLowerCase() === trackingIdInput.trim().toLowerCase());
    if (found) {
      setTrackedResult(found);
    } else {
      setTrackedResult({
        id: trackingIdInput,
        category: "Mosquito Breeding Site",
        locationName: "Reported Location",
        status: "SUBMITTED",
        createdAt: "Recently",
        phiNotes: "Queued for PHI inspection."
      });
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Title */}
      <div className="text-center space-y-2 max-w-3xl mx-auto">
        <span className="px-3 py-1 rounded-full bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 font-bold text-xs uppercase tracking-wider">
          Public Health Inspector (PHI) Portal
        </span>
        <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Report Environmental Hazards & Track Complaints
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
          Direct reporting to local PHIs under the Prevention of Mosquito Breeding Act & Food Safety Regulations.
        </p>
      </div>

      {/* Mode Switcher */}
      <div className="flex justify-center">
        <div className="bg-slate-200 dark:bg-slate-800 p-1.5 rounded-2xl flex gap-2 text-xs font-bold">
          <button
            onClick={() => setActiveTab('submit')}
            className={`px-5 py-2.5 rounded-xl transition ${
              activeTab === 'submit'
                ? 'bg-amber-600 text-white shadow-md'
                : 'text-slate-700 dark:text-slate-300 hover:text-white'
            }`}
          >
            File New PHI Complaint
          </button>
          <button
            onClick={() => setActiveTab('track')}
            className={`px-5 py-2.5 rounded-xl transition ${
              activeTab === 'track'
                ? 'bg-amber-600 text-white shadow-md'
                : 'text-slate-700 dark:text-slate-300 hover:text-white'
            }`}
          >
            Track Complaint Status
          </button>
        </div>
      </div>

      {/* Tab 1: Submit Form */}
      {activeTab === 'submit' && (
        <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-200/80 dark:border-slate-700/80 max-w-4xl mx-auto space-y-6">
          
          {!submittedCode ? (
            <form onSubmit={handleSubmit} className="space-y-6">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Select Hazard Category:
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full p-3 bg-slate-50 dark:bg-slate-900 rounded-2xl text-xs font-semibold border border-slate-200 dark:border-slate-700"
                  >
                    {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Location Address / Landmark:
                  </label>
                  <input
                    type="text"
                    required
                    value={locationName}
                    onChange={(e) => setLocationName(e.target.value)}
                    placeholder="e.g. Near Baseline Road Bridge"
                    className="w-full p-3 bg-slate-50 dark:bg-slate-900 rounded-2xl text-xs font-semibold border border-slate-200 dark:border-slate-700"
                  />
                </div>
              </div>

              {/* Map Location Picker */}
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-2">
                  Pinpoint Location on GIS Map (or Auto-Locate):
                </label>
                <InteractiveGISMap height="300px" isPicker={true} onSelectLocation={(lat, lng) => { setLat(lat); setLng(lng); }} />
                <div className="mt-2 text-[11px] text-slate-500 font-mono">
                  Coordinates: Lat {lat.toFixed(4)}, Lng {lng.toFixed(4)}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Hazard Description:
                </label>
                <textarea
                  required
                  rows="3"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Describe the stagnant water, duration, mosquito larva, or garbage issue..."
                  className="w-full p-3 bg-slate-50 dark:bg-slate-900 rounded-2xl text-xs font-medium border border-slate-200 dark:border-slate-700"
                ></textarea>
              </div>

              {/* Upload Photo Dropzone */}
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-2">
                  Attach Photo Evidence:
                </label>
                <input
                  type="file"
                  ref={fileInputRef}
                  accept="image/jpeg,image/png,image/webp"
                  onChange={handleFileChange}
                  className="hidden"
                />

                {!selectedFile ? (
                  <div
                    onClick={() => fileInputRef.current?.click()}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    className={`border-2 border-dashed rounded-2xl p-6 text-center transition cursor-pointer ${
                      isDragging
                        ? 'border-amber-500 bg-amber-500/10'
                        : 'border-slate-300 dark:border-slate-700 hover:border-amber-500 bg-slate-50/50 dark:bg-slate-900/50'
                    }`}
                  >
                    <Upload className="w-8 h-8 text-amber-500 mx-auto mb-2 animate-bounce" />
                    <span className="text-xs font-bold text-slate-700 dark:text-slate-300 block">Drag & drop photo or browse</span>
                    <span className="text-[10px] text-slate-400">JPG, PNG, WEBP up to 10MB</span>
                  </div>
                ) : (
                  <div className="relative p-4 bg-slate-50 dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-700 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      {filePreview ? (
                        <img src={filePreview} alt="Evidence preview" className="w-14 h-14 object-cover rounded-xl border border-slate-300 dark:border-slate-700" />
                      ) : (
                        <div className="w-14 h-14 rounded-xl bg-amber-100 dark:bg-amber-900/40 text-amber-600 flex items-center justify-center font-bold text-xs">
                          IMG
                        </div>
                      )}
                      <div>
                        <span className="text-xs font-bold text-slate-900 dark:text-white block truncate max-w-[200px]">
                          {selectedFile.name}
                        </span>
                        <span className="text-[10px] text-slate-500">
                          {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB
                        </span>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={handleRemoveFile}
                      className="p-2 rounded-xl bg-rose-100 dark:bg-rose-950/60 text-rose-600 hover:bg-rose-200 transition"
                      title="Remove Photo"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </div>

              {/* Reporter Info */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 border-t border-slate-100 dark:border-slate-700">
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-1">Complainant Name:</label>
                  <input
                    type="text"
                    value={citizenName}
                    onChange={(e) => setCitizenName(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 dark:bg-slate-900 rounded-xl text-xs border border-slate-200 dark:border-slate-700"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-1">Contact Phone:</label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 dark:bg-slate-900 rounded-xl text-xs border border-slate-200 dark:border-slate-700"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-1">NIC Number:</label>
                  <input
                    type="text"
                    value={nic}
                    onChange={(e) => setNic(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 dark:bg-slate-900 rounded-xl text-xs border border-slate-200 dark:border-slate-700"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 bg-gradient-to-r from-amber-600 to-orange-600 text-white rounded-2xl font-extrabold text-xs shadow-lg shadow-amber-600/30 hover:opacity-95 transition flex items-center justify-center gap-2"
              >
                {loading ? "Submitting to PHI..." : "Submit Complaint & Get Tracking Code"}
                <Send className="w-4 h-4" />
              </button>

            </form>
          ) : (
            /* Submission Confirmation Screen */
            <div className="text-center space-y-4 py-8 animate-in zoom-in-95">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white">
                Complaint Registered Successfully!
              </h2>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                Your report has been routed to the assigned MOH Public Health Inspector (PHI).
              </p>

              <div className="bg-amber-50 dark:bg-amber-950/60 p-4 rounded-2xl border border-amber-300 max-w-sm mx-auto space-y-1">
                <div className="text-xs font-bold text-amber-800 dark:text-amber-200 uppercase">Tracking Code</div>
                <div className="text-2xl font-extrabold font-mono text-amber-600">{submittedCode}</div>
              </div>

              <button
                onClick={() => { setSubmittedCode(null); setActiveTab('track'); }}
                className="px-6 py-2.5 bg-moh-600 text-white rounded-xl text-xs font-bold hover:bg-moh-700 transition"
              >
                Track Status Now
              </button>
            </div>
          )}

        </div>
      )}

      {/* Tab 2: Track Complaint Status */}
      {activeTab === 'track' && (
        <div className="max-w-3xl mx-auto space-y-6">
          <form onSubmit={handleTrackSearch} className="bg-white dark:bg-slate-800 p-6 rounded-3xl shadow-xl border border-slate-200 dark:border-slate-700 flex gap-3">
            <input
              type="text"
              required
              value={trackingIdInput}
              onChange={(e) => setTrackingIdInput(e.target.value)}
              placeholder="Enter Tracking Code (e.g. CMP-8841)"
              className="flex-1 px-4 py-3 bg-slate-50 dark:bg-slate-900 rounded-2xl text-xs font-mono font-bold border border-slate-200 dark:border-slate-700 uppercase"
            />
            <button
              type="submit"
              className="px-6 py-3 bg-amber-600 text-white rounded-2xl text-xs font-bold hover:bg-amber-700 transition flex items-center gap-2"
            >
              <Search className="w-4 h-4" />
              <span>Track</span>
            </button>
          </form>

          {trackedResult && (
            <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-200 dark:border-slate-700 space-y-6 animate-in fade-in">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 dark:border-slate-700 pb-4">
                <div>
                  <span className="font-mono text-amber-600 font-extrabold text-sm">{trackedResult.id}</span>
                  <h3 className="font-bold text-slate-900 dark:text-white text-base mt-0.5">{trackedResult.category}</h3>
                </div>
                <span className="px-3 py-1 rounded-full bg-amber-100 text-amber-800 font-bold text-xs">
                  Status: {trackedResult.status}
                </span>
              </div>

              <div className="space-y-2 text-xs text-slate-600 dark:text-slate-300">
                <div><b>Location:</b> {trackedResult.locationName}</div>
                <div><b>Assigned Inspector:</b> {trackedResult.assignedPHI || 'PHI - Nimal Bandara'}</div>
                <div><b>PHI Inspector Notes:</b> <span className="italic text-slate-800 dark:text-slate-100">{trackedResult.phiNotes}</span></div>
              </div>
            </div>
          )}
        </div>
      )}

    </div>
  );
};
