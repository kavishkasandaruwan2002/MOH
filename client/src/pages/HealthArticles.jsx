import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import { seedArticles } from '../data/mohSeedData';
import { Search, BookOpen, Tag, Clock, User, ArrowRight, ChevronRight, X } from 'lucide-react';

export const HealthArticles = () => {
  const { articlesList } = useData();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [activeArticle, setActiveArticle] = useState(null);

  const articles = (articlesList && articlesList.length > 0) ? articlesList : seedArticles;

  const categories = ['All', 'Disease Prevention', 'Maternal Care', 'Public Health Safety', 'General Health'];

  const defaultArticleSvg = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='600' height='400' viewBox='0 0 600 400'><rect width='600' height='400' fill='%232E7D6B'/><text x='50%' y='45%' dominant-baseline='middle' text-anchor='middle' fill='white' font-family='sans-serif' font-size='22' font-weight='bold'>MOH Health Advisory</text><text x='50%' y='60%' dominant-baseline='middle' text-anchor='middle' fill='%234DB6AC' font-family='sans-serif' font-size='15'>Ministry of Health Sri Lanka</text></svg>";

  const filtered = articles.filter(art => {
    const matchesSearch = art.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          art.summary?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCat = selectedCategory === 'All' || art.category === selectedCategory;
    return matchesSearch && matchesCat;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10 font-sans">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-[#2E7D6B] to-[#4DB6AC] rounded-3xl p-8 sm:p-12 text-white shadow-xl space-y-4">
        <span className="px-3.5 py-1 bg-white/20 backdrop-blur-md rounded-full text-xs font-extrabold uppercase">
          Health Promotion & Advisory
        </span>
        <h1 className="text-3xl sm:text-5xl font-black tracking-tight">
          Community Health Education & Articles
        </h1>
        <p className="text-sm sm:text-base text-teal-50 max-w-2xl font-medium">
          Verified medical advisories, disease prevention guides, and child nutrition facts published by Sri Lanka Medical Officers of Health.
        </p>
      </div>

      {/* Search & Filter Bar */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 bg-white dark:bg-slate-800 p-4 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm">
        <div className="relative w-full md:w-96">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
          <input
            type="text"
            placeholder="Search health topics, fever, vaccines..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-slate-100 dark:bg-slate-900 text-slate-900 dark:text-slate-100 rounded-xl text-xs font-medium focus:outline-none focus:ring-2 focus:ring-[#2E7D6B]"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-2 rounded-xl text-xs font-extrabold transition ${
                selectedCategory === cat
                  ? 'bg-[#2E7D6B] text-white shadow-md'
                  : 'bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Articles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {filtered.map(art => (
          <div
            key={art.id}
            className="bg-white dark:bg-slate-800 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl border border-slate-200/80 dark:border-slate-700/80 transition-all flex flex-col justify-between group"
          >
            <div className="h-48 relative overflow-hidden bg-slate-100 dark:bg-slate-700">
              <img 
                src={art.image} 
                alt={art.title} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                onError={(e) => { e.target.onerror = null; e.target.src = defaultArticleSvg; }} 
              />
              <span className="absolute top-3 left-3 px-2.5 py-1 bg-slate-900/80 backdrop-blur-md text-white text-[10px] font-bold rounded-lg uppercase">
                {art.category}
              </span>
            </div>

            <div className="p-6 flex-1 space-y-3">
              <div className="flex items-center gap-3 text-[11px] text-slate-500 dark:text-slate-400 font-medium">
                <span className="flex items-center gap-1"><User className="w-3.5 h-3.5" /> {art.author}</span>
                <span>•</span>
                <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {art.readTime}</span>
              </div>

              <h3 className="font-extrabold text-slate-900 dark:text-white text-base leading-snug group-hover:text-[#2E7D6B] transition">
                {art.title}
              </h3>

              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
                {art.summary}
              </p>
            </div>

            <div className="p-6 pt-0">
              <button
                onClick={() => setActiveArticle(art)}
                className="w-full py-2.5 rounded-xl bg-slate-100 dark:bg-slate-700 hover:bg-[#2E7D6B] hover:text-white text-[#2E7D6B] dark:text-[#4DB6AC] text-xs font-extrabold transition flex items-center justify-center gap-1.5"
              >
                <span>Read Full Advisory</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Article Detail Modal */}
      {activeArticle && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-2xl w-full p-6 sm:p-8 space-y-6 shadow-2xl border border-slate-200 dark:border-slate-800 relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setActiveArticle(null)}
              className="absolute top-4 right-4 p-2 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-slate-900"
            >
              <X className="w-5 h-5" />
            </button>

            <img 
              src={activeArticle.image} 
              alt={activeArticle.title} 
              className="w-full h-56 object-cover rounded-2xl" 
              onError={(e) => { e.target.onerror = null; e.target.src = defaultArticleSvg; }}
            />

            <div className="space-y-2">
              <span className="px-3 py-1 bg-[#2E7D6B]/10 text-[#2E7D6B] font-extrabold text-xs rounded-full uppercase">
                {activeArticle.category}
              </span>
              <h2 className="text-2xl font-black text-slate-900 dark:text-white">{activeArticle.title}</h2>
              <p className="text-xs text-slate-500 font-semibold">By {activeArticle.author} • {activeArticle.readTime}</p>
            </div>

            <div className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-normal bg-slate-50 dark:bg-slate-800 p-5 rounded-2xl border border-slate-100 dark:border-slate-700">
              {activeArticle.content}
            </div>

            <div className="flex flex-wrap gap-2">
              {activeArticle.tags?.map(t => (
                <span key={t} className="px-2.5 py-1 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 text-xs font-semibold rounded-lg">
                  #{t}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
