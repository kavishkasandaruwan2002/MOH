import React, { useState, useRef, useEffect } from 'react';
import { Bot, X, Send, Sparkles, AlertTriangle, ArrowRight, User, RefreshCw, MessageSquare } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export const AIChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      sender: 'bot',
      text: 'Ayubowan! 🙏 I am your MOH Smart Health AI Assistant. Ask me about Dengue fever triage, child vaccination schedules, clinic appointments, or PHI complaint filing.',
      triageLevel: 'INFO'
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef(null);
  const { lang } = useLanguage();

  const quickPrompts = [
    "Dengue fever warning symptoms?",
    "Child vaccine schedule at 9 months",
    "How to file PHI complaint for stagnant water?",
    "Book an appointment with MOH doctor"
  ];

  useEffect(() => {
    if (isOpen) {
      chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  const handleSend = async (customText) => {
    const textToSend = customText || input;
    if (!textToSend.trim()) return;

    const userMsg = { sender: 'user', text: textToSend };
    setMessages(prev => [...prev, userMsg]);
    if (!customText) setInput('');
    setLoading(true);

    try {
      const res = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: textToSend, lang })
      });

      if (res.ok) {
        const data = await res.json();
        setMessages(prev => [...prev, {
          sender: 'bot',
          text: data.reply,
          triageLevel: data.triageLevel,
          recommendedAction: data.recommendedAction
        }]);
      } else {
        throw new Error('API Error');
      }
    } catch (err) {
      // Fallback offline response logic
      let fallbackReply = "I am operating in quick mode. For Dengue fever, if body temp is high with abdominal pain or bleeding, visit your nearest MOH hospital immediately. Call 1990 for emergency ambulance.";
      let level = "MODERATE";
      if (textToSend.toLowerCase().includes('vaccine')) {
        fallbackReply = "Sri Lanka's national schedule provides BCG at birth, Pentavalent & OPV at 2, 4, 6 months, and MMR at 9 months at all MOH clinics.";
        level = "INFO";
      }

      setMessages(prev => [...prev, {
        sender: 'bot',
        text: fallbackReply,
        triageLevel: level
      }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Floating Chat Trigger Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-5 right-4 sm:bottom-6 sm:right-6 z-50 flex items-center gap-2.5 px-3 sm:px-4 py-3 bg-gradient-to-r from-moh-600 to-teal-500 text-white rounded-full shadow-2xl hover:scale-105 transition-all duration-300 ring-4 ring-moh-500/20 group"
        >
          <div className="relative">
            <Bot className="w-6 h-6 stroke-[2.5]" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-emerald-400 rounded-full animate-ping"></span>
          </div>
          <span className="font-bold text-sm hidden sm:inline">MOH AI Health Assistant</span>
        </button>
      )}

      {/* Floating Chat Window */}
      {isOpen && (
        <div className="fixed inset-x-3 bottom-3 sm:inset-x-auto sm:bottom-6 sm:right-6 z-50 w-auto sm:w-96 sm:max-w-[calc(100vw-2rem)] h-[min(520px,calc(100dvh-1.5rem))] bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 flex flex-col overflow-hidden animate-in slide-in-from-bottom-5 duration-300">
          
          {/* Chat Header */}
          <div className="bg-gradient-to-r from-moh-700 via-moh-600 to-teal-600 text-white p-4 flex items-center justify-between shadow-md">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-white/10 backdrop-blur flex items-center justify-center border border-white/20">
                <Bot className="w-5 h-5 text-teal-200" />
              </div>
              <div>
                <h3 className="font-bold text-sm leading-tight flex items-center gap-1.5">
                  MOH Health Assistant
                  <Sparkles className="w-3.5 h-3.5 text-amber-300 fill-amber-300" />
                </h3>
                <p className="text-[11px] text-teal-100/90 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                  AI Triage & Guidance Online
                </p>
              </div>
            </div>
            
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 rounded-lg hover:bg-white/20 text-white/80 hover:text-white transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Chat Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3.5 bg-slate-50/50 dark:bg-slate-900/50 text-xs">
            {messages.map((m, idx) => (
              <div
                key={idx}
                className={`flex gap-2.5 ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {m.sender === 'bot' && (
                  <div className="w-7 h-7 rounded-lg bg-moh-600 text-white flex items-center justify-center shrink-0 mt-0.5 shadow-sm">
                    <Bot className="w-4 h-4" />
                  </div>
                )}

                <div
                  className={`max-w-[80%] p-3 rounded-2xl leading-relaxed shadow-sm ${
                    m.sender === 'user'
                      ? 'bg-moh-600 text-white rounded-br-none'
                      : m.triageLevel === 'CRITICAL'
                      ? 'bg-rose-50 dark:bg-rose-950/60 border border-rose-200 dark:border-rose-800 text-rose-900 dark:text-rose-200 rounded-bl-none'
                      : 'bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 border border-slate-200/80 dark:border-slate-700/80 rounded-bl-none'
                  }`}
                >
                  {m.triageLevel === 'CRITICAL' && (
                    <div className="flex items-center gap-1 text-rose-600 dark:text-rose-400 font-bold mb-1 uppercase tracking-wider text-[10px]">
                      <AlertTriangle className="w-3.5 h-3.5" />
                      Critical Triage Alert
                    </div>
                  )}

                  <p>{m.text}</p>

                  {m.recommendedAction && (
                    <div className="mt-2.5 pt-2 border-t border-slate-200/60 dark:border-slate-700/60 flex items-center justify-between text-moh-600 dark:text-moh-300 font-semibold">
                      <span>Suggested: {m.recommendedAction}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </div>
                  )}
                </div>

                {m.sender === 'user' && (
                  <div className="w-7 h-7 rounded-lg bg-slate-700 text-white flex items-center justify-center shrink-0 mt-0.5 shadow-sm">
                    <User className="w-4 h-4" />
                  </div>
                )}
              </div>
            ))}

            {loading && (
              <div className="flex gap-2.5">
                <div className="w-7 h-7 rounded-lg bg-moh-600 text-white flex items-center justify-center">
                  <Bot className="w-4 h-4 animate-spin" />
                </div>
                <div className="bg-white dark:bg-slate-800 px-3 py-2 rounded-2xl text-slate-400 italic">
                  Analyzing MOH medical guidelines...
                </div>
              </div>
            )}

            <div ref={chatEndRef} />
          </div>

          {/* Quick Prompts */}
          <div className="px-3 py-2 bg-slate-100/70 dark:bg-slate-800/70 border-t border-slate-200 dark:border-slate-700 flex gap-1.5 overflow-x-auto no-scrollbar">
            {quickPrompts.map((p, i) => (
              <button
                key={i}
                onClick={() => handleSend(p)}
                className="whitespace-nowrap px-2.5 py-1 bg-white dark:bg-slate-700 rounded-full border border-slate-200 dark:border-slate-600 text-[11px] text-slate-600 dark:text-slate-300 hover:border-moh-500 hover:text-moh-600 transition shadow-2xs"
              >
                {p}
              </button>
            ))}
          </div>

          {/* Input Box */}
          <form
            onSubmit={(e) => { e.preventDefault(); handleSend(); }}
            className="p-3 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 flex items-center gap-2"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask MOH Assistant..."
              className="flex-1 px-3.5 py-2 bg-slate-100 dark:bg-slate-800 rounded-xl text-xs text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-moh-500 border-none"
            />
            <button
              type="submit"
              disabled={!input.trim() || loading}
              className="p-2 bg-moh-600 hover:bg-moh-700 disabled:opacity-50 text-white rounded-xl transition shadow-md"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>

        </div>
      )}
    </>
  );
};
