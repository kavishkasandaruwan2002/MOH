import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { 
  ResponsiveContainer, AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell, 
  XAxis, YAxis, Tooltip, CartesianGrid, Legend 
} from 'recharts';
import { 
  Users, Calendar, ShieldAlert, Activity, Cross, UserCheck, 
  BarChart3, Settings, FileText, CheckCircle2, Shield 
} from 'lucide-react';

export const AdminDashboard = () => {
  const { user } = useAuth();
  const [analytics, setAnalytics] = useState(null);

  useEffect(() => {
    fetch('/api/analytics/dashboard')
      .then(res => res.json())
      .then(data => setAnalytics(data))
      .catch(() => {
        // Fallback analytics
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
          ],
          complaintStatusBreakdown: [
            { name: "Submitted", value: 12, color: "#3b82f6" },
            { name: "Under Investigation", value: 24, color: "#f59e0b" },
            { name: "Resolved", value: 184, color: "#10b981" }
          ]
        });
      });
  }, []);

  if (!analytics) return <div className="p-10 text-center">Loading Admin Central Analytics...</div>;

  const { overviewStats, monthlyAppointmentsTrend, dengueByDistrict, complaintStatusBreakdown } = analytics;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Admin Header */}
      <div className="bg-gradient-to-r from-blue-900 via-slate-900 to-moh-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl flex items-center justify-between">
        <div>
          <span className="px-2.5 py-0.5 rounded bg-blue-400/20 text-blue-300 font-extrabold text-xs uppercase border border-blue-400/30">
            Ministry of Health Central Administrator
          </span>
          <h1 className="text-2xl font-extrabold text-white mt-1">National Public Health Command Dashboard</h1>
          <p className="text-xs text-slate-300">Logged in as: {user?.name || 'Central Admin'} • Central Server Operations</p>
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

      {/* Recharts Analytics Grid */}
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
