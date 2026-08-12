import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';
import { 
  ResponsiveContainer, AreaChart, Area, BarChart, Bar, 
  XAxis, YAxis, Tooltip, CartesianGrid 
} from 'recharts';
import { 
  Users, Calendar, ShieldAlert, Activity, Cross, UserCheck, 
  Plus, Edit3, Trash2, Search, X, CheckCircle2, AlertCircle, 
  Stethoscope, MapPin, FileText, Newspaper, Sparkles
} from 'lucide-react';

export const AdminDashboard = () => {
  const { user } = useAuth();
  const { 
    teamMembers, addTeamMember, updateTeamMember, deleteTeamMember,
    clinicSchedules, addClinicSchedule, updateClinicSchedule, deleteClinicSchedule,
    newsList, addNews, updateNews, deleteNews,
    articlesList, addArticle, updateArticle, deleteArticle
  } = useData();

  const [analytics, setAnalytics] = useState(null);
  const [activeTab, setActiveTab] = useState('team'); // 'team' | 'clinics' | 'news' | 'articles'
  const [searchTerm, setSearchTerm] = useState('');
  
  // Notification Toast
  const [toastMessage, setToastMessage] = useState(null);

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null); // null for create, item object for edit

  // Form Field States
  const [formData, setFormData] = useState({});

  useEffect(() => {
    fetch('/api/analytics/dashboard')
      .then(res => res.json())
      .then(data => setAnalytics(data))
      .catch(() => {
        setAnalytics({
          overviewStats: {
            totalCitizensRegistered: 48250,
            monthlyAppointmentsBooked: 3410,
            activePHIComplaints: 28,
            resolvedComplaintsThisMonth: 184,
            dengueHotspotsMonitored: 12,
            vaccinationCoverageRate: "98.4%"
          },
          monthlyAppointmentsTrend: [
            { month: "Jan", appointments: 2100 },
            { month: "Feb", appointments: 2450 },
            { month: "Mar", appointments: 2800 },
            { month: "Apr", appointments: 3100 },
            { month: "May", appointments: 3250 },
            { month: "Jun", appointments: 3600 },
            { month: "Jul", appointments: 3410 }
          ],
          dengueByDistrict: [
            { district: "Colombo", cases: 420 },
            { district: "Gampaha", cases: 380 },
            { district: "Kandy", cases: 290 },
            { district: "Galle", cases: 180 },
            { district: "Jaffna", cases: 110 }
          ]
        });
      });
  }, []);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  };

  const handleOpenAddModal = () => {
    setEditingItem(null);
    if (activeTab === 'team') {
      setFormData({ name: '', role: 'Medical Officer of Health', qualifications: '', experience: '5 years', division: 'Buttala', bio: '' });
    } else if (activeTab === 'clinics') {
      setFormData({ day: 'Monday', time: '8:30 AM - 12:30 PM', type: '', location: 'MOH Buttala Central Clinic', doctor: 'Dr. K. M. Wickramasinghe', tag: 'Maternal' });
    } else if (activeTab === 'news') {
      setFormData({ title: '', category: 'Alert & Campaign', summary: '', content: '', date: new Date().toISOString().split('T')[0] });
    } else if (activeTab === 'articles') {
      setFormData({ title: '', category: 'Disease Prevention', author: 'Dr. K. M. Wickramasinghe', summary: '', content: '', readTime: '4 min read' });
    }
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (item) => {
    setEditingItem(item);
    setFormData({ ...item });
    setIsModalOpen(true);
  };

  const handleDeleteItem = (id, name) => {
    if (!window.confirm(`Are you sure you want to delete "${name}"? This action will immediately remove it from the frontend.`)) return;

    if (activeTab === 'team') {
      deleteTeamMember(id);
    } else if (activeTab === 'clinics') {
      deleteClinicSchedule(id);
    } else if (activeTab === 'news') {
      deleteNews(id);
    } else if (activeTab === 'articles') {
      deleteArticle(id);
    }

    showToast(`"${name}" was deleted successfully. Changes updated on frontend.`);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    if (editingItem) {
      // Update
      if (activeTab === 'team') {
        updateTeamMember(editingItem.id, formData);
      } else if (activeTab === 'clinics') {
        updateClinicSchedule(editingItem.id, formData);
      } else if (activeTab === 'news') {
        updateNews(editingItem.id, formData);
      } else if (activeTab === 'articles') {
        updateArticle(editingItem.id, formData);
      }
      showToast(`Updated "${formData.name || formData.title || formData.type}" successfully! Live on frontend.`);
    } else {
      // Add
      if (activeTab === 'team') {
        addTeamMember(formData);
      } else if (activeTab === 'clinics') {
        addClinicSchedule(formData);
      } else if (activeTab === 'news') {
        addNews(formData);
      } else if (activeTab === 'articles') {
        addArticle(formData);
      }
      showToast(`Added "${formData.name || formData.title || formData.type}" successfully! Live on frontend.`);
    }

    setIsModalOpen(false);
  };

  if (!analytics) return <div className="p-10 text-center text-slate-500 font-bold">Loading Admin Central Analytics...</div>;

  const { overviewStats, monthlyAppointmentsTrend, dengueByDistrict } = analytics;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-20 right-5 z-50 bg-emerald-700 text-white px-5 py-3 rounded-2xl shadow-2xl flex items-center gap-3 border border-emerald-500 text-xs font-bold animate-in fade-in slide-in-from-top-4">
          <CheckCircle2 className="w-5 h-5 text-emerald-300 shrink-0" />
          <span>{toastMessage}</span>
          <button onClick={() => setToastMessage(null)} className="ml-2 hover:text-emerald-200">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Admin Header */}
      <div className="bg-gradient-to-r from-blue-900 via-slate-900 to-moh-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <span className="px-2.5 py-0.5 rounded bg-blue-400/20 text-blue-300 font-extrabold text-xs uppercase border border-blue-400/30">
            Ministry of Health Central Administrator
          </span>
          <h1 className="text-2xl font-extrabold text-white mt-1">National Public Health Command Dashboard</h1>
          <p className="text-xs text-slate-300">Logged in as: {user?.name || 'Central Admin'} • Live Dynamic Item Management</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-emerald-400 animate-pulse"></span>
          <span className="text-xs font-bold text-emerald-300">Frontend Live Sync Active</span>
        </div>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <div className="bg-white dark:bg-slate-800 p-4 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm">
          <div className="text-xs text-slate-500 font-bold">Registered Citizens</div>
          <div className="text-xl font-extrabold text-slate-900 dark:text-white mt-1">{overviewStats.totalCitizensRegistered.toLocaleString()}</div>
        </div>
        <div className="bg-white dark:bg-slate-800 p-4 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm">
          <div className="text-xs text-slate-500 font-bold">Monthly Appointments</div>
          <div className="text-xl font-extrabold text-moh-600 mt-1">{overviewStats.monthlyAppointmentsBooked.toLocaleString()}</div>
        </div>
        <div className="bg-white dark:bg-slate-800 p-4 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm">
          <div className="text-xs text-slate-500 font-bold">Active PHI Complaints</div>
          <div className="text-xl font-extrabold text-amber-500 mt-1">{overviewStats.activePHIComplaints}</div>
        </div>
        <div className="bg-white dark:bg-slate-800 p-4 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm">
          <div className="text-xs text-slate-500 font-bold">Resolved Complaints</div>
          <div className="text-xl font-extrabold text-emerald-500 mt-1">{overviewStats.resolvedComplaintsThisMonth}</div>
        </div>
        <div className="bg-white dark:bg-slate-800 p-4 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm">
          <div className="text-xs text-slate-500 font-bold">Dengue Hotspots</div>
          <div className="text-xl font-extrabold text-rose-500 mt-1">{overviewStats.dengueHotspotsMonitored}</div>
        </div>
        <div className="bg-white dark:bg-slate-800 p-4 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm">
          <div className="text-xs text-slate-500 font-bold">Vaccine Coverage</div>
          <div className="text-xl font-extrabold text-teal-500 mt-1">{overviewStats.vaccinationCoverageRate}</div>
        </div>
      </div>

      {/* ================================================================= */}
      {/* SYSTEM ADMIN ITEM MANAGEMENT CONSOLE (ADD / EDIT / DELETE)       */}
      {/* ================================================================= */}
      <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-200 dark:border-slate-700 space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-700 pb-5">
          <div>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-moh-100 dark:bg-moh-900/60 text-moh-700 dark:text-moh-300 font-extrabold text-xs uppercase tracking-wider mb-1">
              <Sparkles className="w-3.5 h-3.5" />
              Dynamic Content Control Center
            </span>
            <h2 className="text-xl font-extrabold text-slate-900 dark:text-white">
              Manage Portal Items (Add, Edit, Delete)
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Add or update items here to immediately display updated information to users on the frontend.
            </p>
          </div>

          <button
            onClick={handleOpenAddModal}
            className="px-5 py-3 bg-gradient-to-r from-moh-600 to-teal-600 hover:from-moh-700 hover:to-teal-700 text-white font-extrabold text-xs rounded-xl shadow-lg flex items-center justify-center gap-2 transition"
          >
            <Plus className="w-4 h-4 stroke-[3]" />
            <span>
              Add New {activeTab === 'team' ? 'Team Member' : activeTab === 'clinics' ? 'Clinic Schedule' : activeTab === 'news' ? 'Announcement' : 'Article'}
            </span>
          </button>
        </div>

        {/* Tab Selection */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex gap-2 p-1.5 bg-slate-100 dark:bg-slate-900 rounded-2xl">
            <button
              onClick={() => { setActiveTab('team'); setSearchTerm(''); }}
              className={`px-4 py-2 rounded-xl text-xs font-extrabold transition flex items-center gap-2 ${
                activeTab === 'team' ? 'bg-moh-600 text-white shadow-md' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
              }`}
            >
              <Stethoscope className="w-4 h-4" />
              <span>MOH Team ({teamMembers.length})</span>
            </button>

            <button
              onClick={() => { setActiveTab('clinics'); setSearchTerm(''); }}
              className={`px-4 py-2 rounded-xl text-xs font-extrabold transition flex items-center gap-2 ${
                activeTab === 'clinics' ? 'bg-moh-600 text-white shadow-md' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
              }`}
            >
              <Calendar className="w-4 h-4" />
              <span>Clinic Schedules ({clinicSchedules.length})</span>
            </button>

            <button
              onClick={() => { setActiveTab('news'); setSearchTerm(''); }}
              className={`px-4 py-2 rounded-xl text-xs font-extrabold transition flex items-center gap-2 ${
                activeTab === 'news' ? 'bg-moh-600 text-white shadow-md' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
              }`}
            >
              <Newspaper className="w-4 h-4" />
              <span>News & Events ({newsList.length})</span>
            </button>

            <button
              onClick={() => { setActiveTab('articles'); setSearchTerm(''); }}
              className={`px-4 py-2 rounded-xl text-xs font-extrabold transition flex items-center gap-2 ${
                activeTab === 'articles' ? 'bg-moh-600 text-white shadow-md' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
              }`}
            >
              <FileText className="w-4 h-4" />
              <span>Articles ({articlesList.length})</span>
            </button>
          </div>

          {/* Search Filter */}
          <div className="relative min-w-[240px]">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search items..."
              className="w-full pl-9 pr-3 py-2 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100 rounded-xl text-xs border border-slate-300 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-moh-500"
            />
          </div>
        </div>

        {/* Tab 1: MOH Team Members Table */}
        {activeTab === 'team' && (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-100 dark:bg-slate-900 text-slate-500 font-bold uppercase text-[10px]">
                <tr>
                  <th className="p-3">Officer Name</th>
                  <th className="p-3">Role / Specialty</th>
                  <th className="p-3">Qualifications</th>
                  <th className="p-3">Division</th>
                  <th className="p-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-700 font-medium">
                {teamMembers
                  .filter(m => m.name?.toLowerCase().includes(searchTerm.toLowerCase()) || m.role?.toLowerCase().includes(searchTerm.toLowerCase()))
                  .map((m) => (
                    <tr key={m.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition">
                      <td className="p-3 font-bold text-slate-900 dark:text-white flex items-center gap-2">
                        <div className="w-7 h-7 rounded-lg bg-moh-100 text-moh-700 font-bold flex items-center justify-center text-xs shrink-0">
                          {m.name.charAt(0)}
                        </div>
                        <span>{m.name}</span>
                      </td>
                      <td className="p-3 font-bold text-moh-600 dark:text-teal-400">{m.role || m.specialty}</td>
                      <td className="p-3 text-slate-600 dark:text-slate-300">{m.qualifications || 'N/A'}</td>
                      <td className="p-3"><span className="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-700 font-bold">{m.division || 'Buttala'}</span></td>
                      <td className="p-3 text-right space-x-2">
                        <button
                          onClick={() => handleOpenEditModal(m)}
                          className="px-3 py-1 bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-200 font-bold rounded-lg transition inline-flex items-center gap-1"
                        >
                          <Edit3 className="w-3.5 h-3.5 text-blue-500" />
                          <span>Edit</span>
                        </button>
                        <button
                          onClick={() => handleDeleteItem(m.id, m.name)}
                          className="px-3 py-1 bg-rose-50 dark:bg-rose-950/50 text-rose-600 hover:bg-rose-100 font-bold rounded-lg transition inline-flex items-center gap-1 border border-rose-200 dark:border-rose-800"
                        >
                          <Trash2 className="w-3.5 h-3.5 text-rose-500" />
                          <span>Delete</span>
                        </button>
                      </td>
                    </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Tab 2: Clinic Schedules Table */}
        {activeTab === 'clinics' && (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-100 dark:bg-slate-900 text-slate-500 font-bold uppercase text-[10px]">
                <tr>
                  <th className="p-3">Day</th>
                  <th className="p-3">Time</th>
                  <th className="p-3">Clinic Type / Name</th>
                  <th className="p-3">Location / Venue</th>
                  <th className="p-3">Medical Officer In-Charge</th>
                  <th className="p-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-700 font-medium">
                {clinicSchedules
                  .filter(c => (c.type || c.name)?.toLowerCase().includes(searchTerm.toLowerCase()) || (c.location || c.venue)?.toLowerCase().includes(searchTerm.toLowerCase()))
                  .map((c) => (
                    <tr key={c.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition">
                      <td className="p-3 font-bold text-slate-900 dark:text-white">{c.day}</td>
                      <td className="p-3 font-mono text-slate-600 dark:text-slate-300">{c.time || c.operatingHours}</td>
                      <td className="p-3 font-bold text-moh-600 dark:text-teal-400">{c.type || c.name}</td>
                      <td className="p-3 text-slate-600 dark:text-slate-300">{c.location || c.venue}</td>
                      <td className="p-3 font-medium">{c.doctor || 'Dr. K. M. Wickramasinghe'}</td>
                      <td className="p-3 text-right space-x-2">
                        <button
                          onClick={() => handleOpenEditModal(c)}
                          className="px-3 py-1 bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-200 font-bold rounded-lg transition inline-flex items-center gap-1"
                        >
                          <Edit3 className="w-3.5 h-3.5 text-blue-500" />
                          <span>Edit</span>
                        </button>
                        <button
                          onClick={() => handleDeleteItem(c.id, c.type || c.name)}
                          className="px-3 py-1 bg-rose-50 dark:bg-rose-950/50 text-rose-600 hover:bg-rose-100 font-bold rounded-lg transition inline-flex items-center gap-1 border border-rose-200 dark:border-rose-800"
                        >
                          <Trash2 className="w-3.5 h-3.5 text-rose-500" />
                          <span>Delete</span>
                        </button>
                      </td>
                    </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Tab 3: News & Announcements Table */}
        {activeTab === 'news' && (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-100 dark:bg-slate-900 text-slate-500 font-bold uppercase text-[10px]">
                <tr>
                  <th className="p-3">Date</th>
                  <th className="p-3">Category</th>
                  <th className="p-3">Title</th>
                  <th className="p-3">Summary</th>
                  <th className="p-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-700 font-medium">
                {newsList
                  .filter(n => n.title?.toLowerCase().includes(searchTerm.toLowerCase()) || n.summary?.toLowerCase().includes(searchTerm.toLowerCase()))
                  .map((n) => (
                    <tr key={n.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition">
                      <td className="p-3 font-mono font-bold text-slate-500">{n.date}</td>
                      <td className="p-3"><span className="px-2 py-0.5 rounded bg-moh-100 text-moh-700 font-bold text-[10px] uppercase">{n.category}</span></td>
                      <td className="p-3 font-bold text-slate-900 dark:text-white max-w-xs truncate">{n.title}</td>
                      <td className="p-3 text-slate-600 dark:text-slate-300 max-w-sm truncate">{n.summary}</td>
                      <td className="p-3 text-right space-x-2 whitespace-nowrap">
                        <button
                          onClick={() => handleOpenEditModal(n)}
                          className="px-3 py-1 bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-200 font-bold rounded-lg transition inline-flex items-center gap-1"
                        >
                          <Edit3 className="w-3.5 h-3.5 text-blue-500" />
                          <span>Edit</span>
                        </button>
                        <button
                          onClick={() => handleDeleteItem(n.id, n.title)}
                          className="px-3 py-1 bg-rose-50 dark:bg-rose-950/50 text-rose-600 hover:bg-rose-100 font-bold rounded-lg transition inline-flex items-center gap-1 border border-rose-200 dark:border-rose-800"
                        >
                          <Trash2 className="w-3.5 h-3.5 text-rose-500" />
                          <span>Delete</span>
                        </button>
                      </td>
                    </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Tab 4: Health Articles Table */}
        {activeTab === 'articles' && (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-100 dark:bg-slate-900 text-slate-500 font-bold uppercase text-[10px]">
                <tr>
                  <th className="p-3">Category</th>
                  <th className="p-3">Article Title</th>
                  <th className="p-3">Author</th>
                  <th className="p-3">Read Time</th>
                  <th className="p-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-700 font-medium">
                {articlesList
                  .filter(a => a.title?.toLowerCase().includes(searchTerm.toLowerCase()) || a.category?.toLowerCase().includes(searchTerm.toLowerCase()))
                  .map((a) => (
                    <tr key={a.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition">
                      <td className="p-3"><span className="px-2 py-0.5 rounded bg-teal-100 text-teal-800 font-bold text-[10px] uppercase">{a.category}</span></td>
                      <td className="p-3 font-bold text-slate-900 dark:text-white max-w-xs truncate">{a.title}</td>
                      <td className="p-3 font-semibold text-slate-600 dark:text-slate-300">{a.author || 'MOH Officer'}</td>
                      <td className="p-3 font-mono text-slate-500">{a.readTime}</td>
                      <td className="p-3 text-right space-x-2 whitespace-nowrap">
                        <button
                          onClick={() => handleOpenEditModal(a)}
                          className="px-3 py-1 bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-200 font-bold rounded-lg transition inline-flex items-center gap-1"
                        >
                          <Edit3 className="w-3.5 h-3.5 text-blue-500" />
                          <span>Edit</span>
                        </button>
                        <button
                          onClick={() => handleDeleteItem(a.id, a.title)}
                          className="px-3 py-1 bg-rose-50 dark:bg-rose-950/50 text-rose-600 hover:bg-rose-100 font-bold rounded-lg transition inline-flex items-center gap-1 border border-rose-200 dark:border-rose-800"
                        >
                          <Trash2 className="w-3.5 h-3.5 text-rose-500" />
                          <span>Delete</span>
                        </button>
                      </td>
                    </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

      </div>

      {/* ================================================================= */}
      {/* MODAL FORM FOR ADD / EDIT ITEM                                   */}
      {/* ================================================================= */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-2xl max-w-lg w-full p-6 space-y-4 border border-slate-200 dark:border-slate-800 animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <h3 className="font-extrabold text-base text-slate-900 dark:text-white">
                {editingItem ? 'Edit Item' : 'Add New Item'} ({activeTab.toUpperCase()})
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleFormSubmit} className="space-y-4 text-xs">
              
              {/* Active Tab: TEAM MEMBER FORM */}
              {activeTab === 'team' && (
                <>
                  <div>
                    <label className="block font-bold mb-1 text-slate-700 dark:text-slate-300">Officer / Doctor Name *</label>
                    <input
                      type="text"
                      required
                      value={formData.name || ''}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Dr. K. M. Wickramasinghe"
                      className="w-full p-2.5 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 border border-slate-300 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-moh-500"
                    />
                  </div>

                  <div>
                    <label className="block font-bold mb-1 text-slate-700 dark:text-slate-300">Official Designation / Role *</label>
                    <input
                      type="text"
                      required
                      value={formData.role || formData.specialty || ''}
                      onChange={(e) => setFormData({ ...formData, role: e.target.value, specialty: e.target.value })}
                      placeholder="e.g. Medical Officer of Health (MOH)"
                      className="w-full p-2.5 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 border border-slate-300 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-moh-500"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block font-bold mb-1 text-slate-700 dark:text-slate-300">Qualifications</label>
                      <input
                        type="text"
                        value={formData.qualifications || ''}
                        onChange={(e) => setFormData({ ...formData, qualifications: e.target.value })}
                        placeholder="MBBS, MSc..."
                        className="w-full p-2.5 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 border border-slate-300 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-moh-500"
                      />
                    </div>
                    <div>
                      <label className="block font-bold mb-1 text-slate-700 dark:text-slate-300">MOH Division</label>
                      <input
                        type="text"
                        value={formData.division || 'Buttala'}
                        onChange={(e) => setFormData({ ...formData, division: e.target.value })}
                        className="w-full p-2.5 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 border border-slate-300 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-moh-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-bold mb-1 text-slate-700 dark:text-slate-300">Officer Biography / Overview</label>
                    <textarea
                      rows="3"
                      value={formData.bio || ''}
                      onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                      placeholder="Bio overview shown in officer popup..."
                      className="w-full p-2.5 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 border border-slate-300 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-moh-500"
                    ></textarea>
                  </div>
                </>
              )}

              {/* Active Tab: CLINIC SCHEDULE FORM */}
              {activeTab === 'clinics' && (
                <>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block font-bold mb-1 text-slate-700 dark:text-slate-300">Day of Week *</label>
                      <select
                        value={formData.day || 'Monday'}
                        onChange={(e) => setFormData({ ...formData, day: e.target.value })}
                        className="w-full p-2.5 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 border border-slate-300 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-moh-500"
                      >
                        <option value="Monday">Monday</option>
                        <option value="Tuesday">Tuesday</option>
                        <option value="Wednesday">Wednesday</option>
                        <option value="Thursday">Thursday</option>
                        <option value="Friday">Friday</option>
                        <option value="Saturday">Saturday</option>
                      </select>
                    </div>

                    <div>
                      <label className="block font-bold mb-1 text-slate-700 dark:text-slate-300">Operating Time *</label>
                      <input
                        type="text"
                        required
                        value={formData.time || formData.operatingHours || ''}
                        onChange={(e) => setFormData({ ...formData, time: e.target.value, operatingHours: e.target.value })}
                        placeholder="8:30 AM - 12:30 PM"
                        className="w-full p-2.5 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 border border-slate-300 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-moh-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-bold mb-1 text-slate-700 dark:text-slate-300">Clinic Type / Title *</label>
                    <input
                      type="text"
                      required
                      value={formData.type || formData.name || ''}
                      onChange={(e) => setFormData({ ...formData, type: e.target.value, name: e.target.value })}
                      placeholder="e.g. Ante-natal & Maternal Clinic"
                      className="w-full p-2.5 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 border border-slate-300 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-moh-500"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block font-bold mb-1 text-slate-700 dark:text-slate-300">Location / Venue *</label>
                      <input
                        type="text"
                        required
                        value={formData.location || formData.venue || ''}
                        onChange={(e) => setFormData({ ...formData, location: e.target.value, venue: e.target.value })}
                        placeholder="e.g. MOH Buttala Central Clinic"
                        className="w-full p-2.5 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 border border-slate-300 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-moh-500"
                      />
                    </div>
                    <div>
                      <label className="block font-bold mb-1 text-slate-700 dark:text-slate-300">Medical Officer</label>
                      <input
                        type="text"
                        value={formData.doctor || ''}
                        onChange={(e) => setFormData({ ...formData, doctor: e.target.value })}
                        placeholder="e.g. Dr. K. M. Wickramasinghe"
                        className="w-full p-2.5 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 border border-slate-300 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-moh-500"
                      />
                    </div>
                  </div>
                </>
              )}

              {/* Active Tab: NEWS / ANNOUNCEMENT FORM */}
              {activeTab === 'news' && (
                <>
                  <div>
                    <label className="block font-bold mb-1 text-slate-700 dark:text-slate-300">Announcement Title *</label>
                    <input
                      type="text"
                      required
                      value={formData.title || ''}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      placeholder="e.g. National Dengue Control Campaign"
                      className="w-full p-2.5 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 border border-slate-300 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-moh-500"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block font-bold mb-1 text-slate-700 dark:text-slate-300">Category</label>
                      <input
                        type="text"
                        value={formData.category || 'Alert & Campaign'}
                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                        className="w-full p-2.5 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 border border-slate-300 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-moh-500"
                      />
                    </div>
                    <div>
                      <label className="block font-bold mb-1 text-slate-700 dark:text-slate-300">Date</label>
                      <input
                        type="date"
                        value={formData.date || ''}
                        onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                        className="w-full p-2.5 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 border border-slate-300 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-moh-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-bold mb-1 text-slate-700 dark:text-slate-300">Summary *</label>
                    <textarea
                      rows="2"
                      required
                      value={formData.summary || ''}
                      onChange={(e) => setFormData({ ...formData, summary: e.target.value })}
                      placeholder="Brief announcement summary..."
                      className="w-full p-2.5 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 border border-slate-300 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-moh-500"
                    ></textarea>
                  </div>
                </>
              )}

              {/* Active Tab: ARTICLE FORM */}
              {activeTab === 'articles' && (
                <>
                  <div>
                    <label className="block font-bold mb-1 text-slate-700 dark:text-slate-300">Article Title *</label>
                    <input
                      type="text"
                      required
                      value={formData.title || ''}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      placeholder="e.g. Dengue Fever Warning Signs in Children"
                      className="w-full p-2.5 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 border border-slate-300 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-moh-500"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block font-bold mb-1 text-slate-700 dark:text-slate-300">Category</label>
                      <input
                        type="text"
                        value={formData.category || 'Disease Prevention'}
                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                        className="w-full p-2.5 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 border border-slate-300 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-moh-500"
                      />
                    </div>
                    <div>
                      <label className="block font-bold mb-1 text-slate-700 dark:text-slate-300">Author</label>
                      <input
                        type="text"
                        value={formData.author || 'Dr. K. M. Wickramasinghe'}
                        onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                        className="w-full p-2.5 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 border border-slate-300 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-moh-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-bold mb-1 text-slate-700 dark:text-slate-300">Summary / Overview *</label>
                    <textarea
                      rows="3"
                      required
                      value={formData.summary || ''}
                      onChange={(e) => setFormData({ ...formData, summary: e.target.value })}
                      placeholder="Summary of the article..."
                      className="w-full p-2.5 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 border border-slate-300 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-moh-500"
                    ></textarea>
                  </div>
                </>
              )}

              <div className="pt-2 flex gap-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 py-2.5 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-xl font-bold hover:bg-slate-200 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 bg-moh-600 hover:bg-moh-700 text-white rounded-xl font-bold transition shadow-md"
                >
                  {editingItem ? 'Update & Sync to Frontend' : 'Add Item & Publish to Frontend'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Analytics Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Appointments Area Chart */}
        <div className="bg-white dark:bg-slate-800 p-6 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-xl space-y-3">
          <h3 className="font-extrabold text-slate-900 dark:text-white text-base">Monthly Digital Appointments Volume</h3>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={monthlyAppointmentsTrend}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.15} />
                <XAxis dataKey="month" stroke="#888888" fontSize={11} />
                <YAxis stroke="#888888" fontSize={11} />
                <Tooltip />
                <Area type="monotone" dataKey="appointments" stroke="#0d9488" fill="#14b8a6" fillOpacity={0.4} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Dengue Cases Bar Chart */}
        <div className="bg-white dark:bg-slate-800 p-6 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-xl space-y-3">
          <h3 className="font-extrabold text-slate-900 dark:text-white text-base">Dengue Cases Reported by District</h3>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={dengueByDistrict}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.15} />
                <XAxis dataKey="district" stroke="#888888" fontSize={11} />
                <YAxis stroke="#888888" fontSize={11} />
                <Tooltip />
                <Bar dataKey="cases" fill="#e11d48" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>

    </div>
  );
};

export default AdminDashboard;
