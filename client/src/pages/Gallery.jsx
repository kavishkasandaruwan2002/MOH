import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useData } from '../context/DataContext';
import { Eye, X, Filter, Camera, Download, ExternalLink, Sparkles, Building2 } from 'lucide-react';

export const Gallery = () => {
  const { galleryList } = useData();
  const [galleryFilter, setGalleryFilter] = useState('All');
  const [selectedGalleryImage, setSelectedGalleryImage] = useState(null);

  const defaultGallerySvg = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='800' height='500' viewBox='0 0 800 500'><rect width='800' height='500' fill='%23134E4A'/><text x='50%' y='45%' dominant-baseline='middle' text-anchor='middle' fill='white' font-family='sans-serif' font-size='28' font-weight='bold'>MOH Buttala Community Fieldwork</text><text x='50%' y='60%' dominant-baseline='middle' text-anchor='middle' fill='%234DB6AC' font-family='sans-serif' font-size='18'>Official Government Healthcare Activity</text></svg>";

  const galleryItems = galleryList && galleryList.length > 0 ? galleryList : [
    { id: 1, title: 'MOH Office Buttala Main Healthcare Facility', category: 'Facilities', url: '/moh_buttala_building.png', desc: 'Main administrative and clinic facility serving Monaragala district.' },
    { id: 2, title: 'Infant Immunization Clinic Day', category: 'Clinics', url: 'https://images.unsplash.com/photo-1631815588090-d4bfec5b1cdb?auto=format&fit=crop&w=800&q=80', desc: 'Weekly maternal & infant growth tracking and national vaccination clinic.' },
    { id: 3, title: 'PHI Field Dengue Inspection & Fogging', category: 'Dengue Campaigns', url: 'https://images.unsplash.com/photo-1584036561566-baf8f5f1b144?auto=format&fit=crop&w=800&q=80', desc: 'Vector surveillance and smoke fogging operations in high-risk PHM divisions.' },
    { id: 4, title: 'School Medical Checkup & Dental Exam', category: 'School Health', url: 'https://images.unsplash.com/photo-1588072432836-e10032774350?auto=format&fit=crop&w=800&q=80', desc: 'Annual health inspections, vision screening, and dental exams in Buttala schools.' }
  ];

  const categories = ['All', 'Facilities', 'Clinics', 'Dengue Campaigns', 'School Health', 'Nutrition Workshops'];

  const filteredGallery = galleryFilter === 'All'
    ? galleryItems
    : galleryItems.filter(item => item.category === galleryFilter);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 font-sans">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-moh-900 via-slate-900 to-teal-900 rounded-3xl p-8 sm:p-12 text-white shadow-2xl space-y-4">
        <span className="px-3 py-1 bg-teal-400/20 text-teal-300 border border-teal-400/30 backdrop-blur-md rounded-full text-xs font-extrabold uppercase tracking-wider">
          Visual Fieldwork & Facilities
        </span>
        <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white">
          MOH Buttala Official Photo Gallery
        </h1>
        <p className="text-sm sm:text-base text-slate-300 max-w-2xl font-medium">
          Official photography of MOH healthcare operations, PHI mosquito control campaigns, school medical inspections, and community clinics across Monaragala district.
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center justify-between gap-4 bg-white dark:bg-slate-800 p-4 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm">
        <div className="flex items-center gap-2 text-xs font-extrabold text-slate-500">
          <Filter className="w-4 h-4 text-moh-600" />
          <span>Filter Category:</span>
        </div>

        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setGalleryFilter(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-extrabold transition ${
                galleryFilter === cat
                  ? 'bg-moh-600 text-white shadow-md'
                  : 'bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Gallery Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredGallery.map((item) => (
          <motion.div
            key={item.id}
            layout
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            whileHover={{ y: -6 }}
            className="group bg-white dark:bg-slate-800 rounded-3xl overflow-hidden border border-slate-200 dark:border-slate-700 shadow-lg hover:shadow-2xl transition-all cursor-pointer flex flex-col justify-between"
            onClick={() => setSelectedGalleryImage(item)}
          >
            <div className="relative aspect-4/3 overflow-hidden bg-slate-900">
              <img
                src={item.url}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                onError={(e) => { e.target.onerror = null; e.target.src = defaultGallerySvg; }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <div className="w-12 h-12 rounded-full bg-white/90 text-moh-700 flex items-center justify-center shadow-2xl transform group-hover:scale-110 transition-transform">
                  <Eye className="w-6 h-6" />
                </div>
              </div>
              <span className="absolute top-3 left-3 px-3 py-1 bg-slate-900/80 backdrop-blur-md text-teal-300 border border-teal-400/30 text-[10px] font-extrabold uppercase rounded-full">
                {item.category}
              </span>
            </div>

            <div className="p-5 space-y-2">
              <h3 className="font-extrabold text-slate-900 dark:text-white text-base leading-snug group-hover:text-moh-600 dark:group-hover:text-teal-400 transition-colors">
                {item.title}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2">
                {item.desc}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Gallery Lightbox Modal */}
      <AnimatePresence>
        {selectedGalleryImage && (
          <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-slate-900 text-white rounded-3xl overflow-hidden max-w-4xl w-full border border-slate-800 shadow-2xl relative"
            >
              <button
                onClick={() => setSelectedGalleryImage(null)}
                className="absolute top-4 right-4 z-10 p-2 rounded-full bg-slate-800/80 text-slate-300 hover:text-white hover:bg-slate-700 transition"
              >
                <X className="w-6 h-6" />
              </button>

              <div className="aspect-16/9 bg-slate-950 overflow-hidden">
                <img
                  src={selectedGalleryImage.url}
                  alt={selectedGalleryImage.title}
                  className="w-full h-full object-contain"
                  onError={(e) => { e.target.onerror = null; e.target.src = defaultGallerySvg; }}
                />
              </div>

              <div className="p-6 space-y-2 border-t border-slate-800">
                <span className="text-xs text-[#4DB6AC] font-extrabold uppercase tracking-wider">
                  {selectedGalleryImage.category}
                </span>
                <h3 className="text-xl font-extrabold text-white">
                  {selectedGalleryImage.title}
                </h3>
                <p className="text-xs text-slate-300">
                  {selectedGalleryImage.desc}
                </p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
};

export default Gallery;
