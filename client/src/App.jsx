import React, { Component } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import { LanguageProvider } from './context/LanguageContext';
import { AccessibilityProvider } from './context/AccessibilityContext';

import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { FloatingActionControls } from './components/common/FloatingActionControls';
import { AIChatbot } from './components/ai/AIChatbot';

import { Home } from './pages/Home';
import { Clinics } from './pages/Clinics';
import { Appointments } from './pages/Appointments';
import { Vaccination } from './pages/Vaccination';
import { Complaints } from './pages/Complaints';
import { DiseaseSurveillance } from './pages/DiseaseSurveillance';
import { HealthArticles } from './pages/HealthArticles';
import { Emergency } from './pages/Emergency';
import { AboutMOH } from './pages/AboutMOH';
import { StaffDirectory } from './pages/StaffDirectory';
import { Downloads } from './pages/Downloads';
import { FAQ } from './pages/FAQ';
import { Contact } from './pages/Contact';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { PrivacyPolicy } from './pages/PrivacyPolicy';
import { Terms } from './pages/Terms';

import { CitizenDashboard } from './pages/dashboards/CitizenDashboard';
import { StaffDashboard } from './pages/dashboards/StaffDashboard';
import { PHIDashboard } from './pages/dashboards/PHIDashboard';
import { AdminDashboard } from './pages/dashboards/AdminDashboard';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("MOH Application Error Boundary Caught:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-slate-900 text-white flex flex-col items-center justify-center p-6 text-center space-y-4">
          <div className="w-16 h-16 rounded-2xl bg-emerald-600/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center font-extrabold text-2xl">
            🏥
          </div>
          <h1 className="text-2xl font-extrabold">MOH Sri Lanka System Recovery</h1>
          <p className="text-xs text-slate-400 max-w-md">
            An application error occurred. Click below to reload the MOH portal interface.
          </p>
          <pre className="p-3 bg-slate-950 rounded-xl text-[11px] font-mono text-rose-300 max-w-lg overflow-x-auto text-left">
            {this.state.error?.toString()}
          </pre>
          <button
            onClick={() => { this.setState({ hasError: false }); window.location.href = '/'; }}
            className="px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-bold text-xs shadow-lg transition"
          >
            Reload Home Page
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

export function App() {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <ThemeProvider>
          <LanguageProvider>
            <AccessibilityProvider>
              <Router>
                <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-100 transition-colors duration-200">
                  <Header />

                  <main className="flex-1">
                    <Routes>
                      <Route path="/" element={<Home />} />
                      <Route path="/clinics" element={<Clinics />} />
                      <Route path="/appointments" element={<Appointments />} />
                      <Route path="/vaccination" element={<Vaccination />} />
                      <Route path="/complaints" element={<Complaints />} />
                      <Route path="/surveillance" element={<DiseaseSurveillance />} />
                      <Route path="/articles" element={<HealthArticles />} />
                      <Route path="/emergency" element={<Emergency />} />
                      <Route path="/about" element={<AboutMOH />} />
                      <Route path="/staff" element={<StaffDirectory />} />
                      <Route path="/downloads" element={<Downloads />} />
                      <Route path="/faq" element={<FAQ />} />
                      <Route path="/contact" element={<Contact />} />
                      <Route path="/login" element={<Login />} />
                      <Route path="/register" element={<Register />} />
                      <Route path="/privacy" element={<PrivacyPolicy />} />
                      <Route path="/terms" element={<Terms />} />

                      {/* Multi-Role Dashboards */}
                      <Route path="/dashboard/citizen" element={<CitizenDashboard />} />
                      <Route path="/dashboard/staff" element={<StaffDashboard />} />
                      <Route path="/dashboard/phi" element={<PHIDashboard />} />
                      <Route path="/dashboard/admin" element={<AdminDashboard />} />
                    </Routes>
                  </main>

                  <AIChatbot />
                  <FloatingActionControls />
                  <Footer />
                </div>
              </Router>
            </AccessibilityProvider>
          </LanguageProvider>
        </ThemeProvider>
      </AuthProvider>
    </ErrorBoundary>
  );
}

export default App;
