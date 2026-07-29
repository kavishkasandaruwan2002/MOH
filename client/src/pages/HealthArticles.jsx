import React, { useState } from 'react';
import { seedArticles } from '../data/mohSeedData.js';
import { BookOpen, Search, Clock, Tag, User, ChevronRight, X } from 'lucide-react';

export const HealthArticles = () => {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [activeArticle, setActiveArticle] = useState(null);

  const categories = ['All', 'Disease Prevention', 'Maternal Care', 'Public Health Safety'];

  const filtered = seedArticles.filter(a => {
    const matchCat = selectedCategory === 'All' || a.category === selectedCategory;
    const matchSearch = !search || a.title.toLowerCase().includes(search.toLowerCase()) || a.summary.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Title */}
      <div className="space-y-2">
        <span className="px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 font-bold text-xs uppercase tracking-wider">
          Health Education & Prevention
        </span>
        <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Verified MOH Health Articles & Advice
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-3xl">
          Evidence-based medical articles written by MOH doctors and epidemiologists on Dengue care, nutrition, maternal wellness, and first aid.
        </p>
      </div>

      {/* Search & Filters */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between bg-white dark:bg-slate-800 p-4 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-sm">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search health topics, Dengue symptoms, rabies..."
            className="w-full pl-10 pr-4 py-2.5 bg-slate-50 dark:bg-slate-900 rounded-2xl text-xs border border-slate-200 dark:border-slate-700"
          />
        </div>

        <div className="flex gap-2 overflow-x-auto">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2.5 rounded-2xl text-xs font-bold transition whitespace-nowrap ${
                selectedCategory === cat
                  ? 'bg-moh-600 text-white shadow-sm'
                  : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Article Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {filtered.map(art => (
          <div
            key={art.id}
            className="bg-white dark:bg-slate-800 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl border border-slate-200/80 dark:border-slate-700/80 transition-all flex flex-col justify-between group"
          >
            <div className="h-48 relative overflow-hidden">
              <img src={art.image} alt={art.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
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

              <h3 className="font-extrabold text-slate-900 dark:text-white text-base leading-snug group-hover:text-moh-600 transition">
                {art.title}
              </h3>

              <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-3 leading-relaxed">
                {art.summary}
              </p>
            </div>

            <div className="p-6 pt-0">
              <button
                onClick={() => setActiveArticle(art)}
                className="w-full py-2.5 bg-slate-100 dark:bg-slate-700 hover:bg-moh-600 hover:text-white text-slate-800 dark:text-slate-200 font-bold text-xs rounded-xl flex items-center justify-center gap-2 transition"
              >
                <span>Read Full Article</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Article Reader Modal */}
      {activeArticle && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-2xl w-full p-6 space-y-4 max-h-[85vh] overflow-y-auto border border-slate-200 dark:border-slate-800 shadow-2xl animate-in zoom-in-95">
            <div className="flex justify-between items-start">
              <div>
                <span className="text-xs font-bold text-moh-600 uppercase">{activeArticle.category}</span>
                <h2 className="text-xl font-extrabold text-slate-900 dark:text-white mt-1">{activeArticle.title}</h2>
                <div className="text-xs text-slate-500 mt-1">By {activeArticle.author} • {activeArticle.readTime}</div>
              </div>
              <button onClick={() => setActiveArticle(null)} className="p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800">
                <X className="w-6 h-6 text-slate-500" />
              </button>
            </div>

            <img src={activeArticle.image} alt={activeArticle.title} className="w-full h-56 object-cover rounded-2xl" />

            <div className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed space-y-3">
              <p className="font-semibold text-slate-900 dark:text-white">{activeArticle.summary}</p>
              <p>{activeArticle.content}</p>
            </div>

            <div className="pt-4 flex justify-end">
              <button onClick={() => setActiveArticle(null)} className="px-5 py-2 bg-moh-600 text-white rounded-xl text-xs font-bold">
                Close Article
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
