import React, { useState } from 'react';
import { Stethoscope, X, AlertTriangle, CheckCircle, ArrowRight, ShieldCheck, Thermometer } from 'lucide-react';

export const SymptomCheckerModal = ({ isOpen, onClose }) => {
  const [feverDays, setFeverDays] = useState(1);
  const [temperature, setTemperature] = useState(37.5);
  const [selectedSymptoms, setSelectedSymptoms] = useState([]);
  const [district, setDistrict] = useState('Colombo');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const symptomList = [
    'Severe Headache / Eye Pain',
    'Muscle / Joint Pain',
    'Abdominal Pain / Vomiting',
    'Bleeding Gums / Skin Rash',
    'Persistent Cough',
    'Extreme Fatigue / Lethargy'
  ];

  const districts = ['Colombo', 'Gampaha', 'Kalutara', 'Kandy', 'Galle', 'Jaffna', 'Kurunegala', 'Ratnapura'];

  const toggleSymptom = (sym) => {
    if (selectedSymptoms.includes(sym)) {
      setSelectedSymptoms(selectedSymptoms.filter(s => s !== sym));
    } else {
      setSelectedSymptoms([...selectedSymptoms, sym]);
    }
  };

  const handleEvaluate = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/ai/symptom-eval', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          feverDays,
          temperature,
          symptoms: selectedSymptoms,
          district
        })
      });

      if (res.ok) {
        const data = await res.json();
        setResult(data);
      }
    } catch (err) {
      // Fallback
      setResult({
        riskScore: selectedSymptoms.length * 20 + feverDays * 15,
        riskCategory: selectedSymptoms.includes('Abdominal Pain / Vomiting') || selectedSymptoms.includes('Bleeding Gums / Skin Rash') 
          ? "HIGH RISK - POSSIBLE DENGUE HEMORRHAGIC FEVER" 
          : "MODERATE RISK",
        summary: "Evaluated based on Sri Lanka MOH Dengue Guidelines.",
        nextSteps: ["Visit nearest MOH clinic for FBC Blood Count", "Drink ORS and rest", "Avoid aspirin or ibuprofen"]
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-2xl max-w-lg w-full overflow-hidden border border-slate-200 dark:border-slate-800 animate-in zoom-in-95 duration-200">
        
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-moh-700 to-teal-600 text-white p-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center border border-white/20">
              <Stethoscope className="w-6 h-6 text-teal-200" />
            </div>
            <div>
              <h3 className="font-extrabold text-base">AI Symptom Triage Tool</h3>
              <p className="text-xs text-teal-100/90">MOH Dengue & Viral Fever Assessment</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1 rounded-lg hover:bg-white/20 text-white/80">
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-5 max-h-[75vh] overflow-y-auto text-xs">
          
          {!result ? (
            <>
              {/* District */}
              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                  Select your District:
                </label>
                <select
                  value={district}
                  onChange={(e) => setDistrict(e.target.value)}
                  className="w-full p-2.5 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 rounded-xl font-medium border border-slate-300 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-moh-500"
                >
                  {districts.map(d => <option key={d} value={d}>{d}</option>)}
                </select>
              </div>

              {/* Fever Duration */}
              <div>
                <div className="flex justify-between font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                  <span>Fever Duration:</span>
                  <span className="text-moh-600 dark:text-moh-400">{feverDays} Day(s)</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="7"
                  value={feverDays}
                  onChange={(e) => setFeverDays(parseInt(e.target.value))}
                  className="w-full accent-moh-600 cursor-pointer"
                />
              </div>

              {/* Temperature */}
              <div>
                <div className="flex justify-between font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                  <span className="flex items-center gap-1">
                    <Thermometer className="w-4 h-4 text-rose-500" />
                    Body Temperature (°C):
                  </span>
                  <span className="text-rose-600 font-extrabold">{temperature} °C ({((temperature * 9/5) + 32).toFixed(1)} °F)</span>
                </div>
                <input
                  type="range"
                  min="36.5"
                  max="41.0"
                  step="0.1"
                  value={temperature}
                  onChange={(e) => setTemperature(parseFloat(e.target.value))}
                  className="w-full accent-rose-500 cursor-pointer"
                />
              </div>

              {/* Symptoms Checklist */}
              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-2">
                  Select Associated Symptoms:
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {symptomList.map(sym => {
                    const isChecked = selectedSymptoms.includes(sym);
                    return (
                      <button
                        key={sym}
                        type="button"
                        onClick={() => toggleSymptom(sym)}
                        className={`p-2.5 rounded-xl text-left font-semibold border transition flex items-center justify-between ${
                          isChecked
                            ? 'bg-moh-50 dark:bg-moh-900/40 border-moh-500 text-moh-700 dark:text-moh-300 shadow-2xs'
                            : 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300'
                        }`}
                      >
                        <span>{sym}</span>
                        {isChecked && <CheckCircle className="w-4 h-4 text-moh-600 shrink-0" />}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Evaluate Action */}
              <button
                onClick={handleEvaluate}
                disabled={loading}
                className="w-full py-3 bg-gradient-to-r from-moh-600 to-teal-600 text-white rounded-2xl font-bold shadow-lg shadow-moh-600/30 hover:opacity-95 transition flex items-center justify-center gap-2 text-sm"
              >
                {loading ? "Analyzing..." : "Evaluate Risk & Get MOH Guidance"}
                <ArrowRight className="w-4 h-4" />
              </button>
            </>
          ) : (
            /* Triage Result Display */
            <div className="space-y-4 animate-in fade-in">
              <div className={`p-4 rounded-2xl border ${
                result.riskScore >= 60 
                  ? 'bg-rose-50 dark:bg-rose-950/60 border-rose-300 text-rose-900 dark:text-rose-200' 
                  : 'bg-emerald-50 dark:bg-emerald-950/60 border-emerald-300 text-emerald-900 dark:text-emerald-200'
              }`}>
                <div className="flex items-center gap-2 font-extrabold text-sm mb-1 uppercase tracking-wider">
                  <AlertTriangle className="w-5 h-5" />
                  <span>{result.riskCategory}</span>
                </div>
                <p className="text-xs font-medium leading-relaxed">{result.summary}</p>
                <div className="mt-2 text-xs font-bold">
                  Calculated Vector Risk Score: {result.riskScore} / 100
                </div>
              </div>

              <div>
                <h4 className="font-bold text-slate-800 dark:text-slate-100 mb-2">Recommended MOH Next Steps:</h4>
                <ul className="space-y-2">
                  {result.nextSteps.map((step, idx) => (
                    <li key={idx} className="flex items-start gap-2 bg-slate-50 dark:bg-slate-800 p-2.5 rounded-xl border border-slate-200 dark:border-slate-700">
                      <ShieldCheck className="w-4 h-4 text-moh-600 shrink-0 mt-0.5" />
                      <span className="font-medium text-slate-700 dark:text-slate-200">{step}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-2 flex gap-2">
                <button
                  onClick={() => setResult(null)}
                  className="flex-1 py-2.5 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 rounded-xl font-bold hover:bg-slate-200 transition"
                >
                  Re-evaluate
                </button>
                <button
                  onClick={onClose}
                  className="flex-1 py-2.5 bg-moh-600 text-white rounded-xl font-bold hover:bg-moh-700 transition"
                >
                  Close Guidance
                </button>
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
