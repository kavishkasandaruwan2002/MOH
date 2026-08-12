// In-memory / Mock DB gallery controller for MOH portal
let galleryStore = [
  { id: 'gal-buttala-01', title: 'Office of the Medical Officer of Health - Buttala', category: 'Facilities', url: '/gallery/moh_buttala_office_building.jpg', desc: 'Main administrative & clinical headquarters serving Buttala division, Monaragala district.' },
  { id: 'gal-buttala-02', title: 'Official MOH Buttala Main Entrance Signboard', category: 'Facilities', url: '/gallery/moh_buttala_signboard.jpg', desc: 'Official trilingual signage of the Medical Officer of Health Office, Buttala.' },
  { id: 'gal-buttala-03', title: 'Maternal & Clinical Medical Examination Session', category: 'Clinics', url: '/gallery/moh_buttala_clinical_examination.jpg', desc: 'Doctor and Nursing Officer conducting maternal health examination and stethoscope checkup at MOH clinic.' },
  { id: 'gal-01', title: 'MOH Office Buttala Main Healthcare Facility', category: 'Facilities', url: '/moh_buttala_building.png', desc: 'Main administrative and clinic facility serving Monaragala district.' },
  { id: 'gal-02', title: 'Infant Immunization Clinic Day', category: 'Clinics', url: 'https://images.unsplash.com/photo-1631815588090-d4bfec5b1cdb?auto=format&fit=crop&w=800&q=80', desc: 'Weekly maternal & infant growth tracking and national vaccination clinic.' },
  { id: 'gal-03', title: 'PHI Field Dengue Inspection & Fogging', category: 'Dengue Campaigns', url: 'https://images.unsplash.com/photo-1584036561566-baf8f5f1b144?auto=format&fit=crop&w=800&q=80', desc: 'Vector surveillance and smoke fogging operations in high-risk PHM divisions.' },
  { id: 'gal-04', title: 'School Medical Checkup & Dental Exam', category: 'School Health', url: 'https://images.unsplash.com/photo-1588072432836-e10032774350?auto=format&fit=crop&w=800&q=80', desc: 'Annual health inspections, vision screening, and dental exams in Buttala schools.' },
  { id: 'gal-05', title: 'Maternal Nutrition & Cooking Workshop', category: 'Nutrition Workshops', url: 'https://images.unsplash.com/photo-1498837167922-ddd27525d352?auto=format&fit=crop&w=800&q=80', desc: 'Nutritional advisory sessions for expecting and lactating mothers.' },
  { id: 'gal-06', title: 'Well Woman Health Screening Session', category: 'Clinics', url: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=800&q=80', desc: 'Cervical Pap smear, breast screening, and NCD risk assessment sessions.' }
];

export const getGallery = async (req, res) => {
  return res.json({ count: galleryStore.length, gallery: galleryStore });
};

export const createGalleryItem = async (req, res) => {
  try {
    const newItem = {
      id: req.body.id || `gal-${Date.now()}`,
      title: req.body.title,
      category: req.body.category || 'Facilities',
      url: req.body.url || '/moh_buttala_building.png',
      desc: req.body.desc || req.body.summary || ''
    };
    galleryStore.unshift(newItem);
    return res.status(201).json({ message: "Gallery photo added successfully", item: newItem });
  } catch (error) {
    return res.status(500).json({ message: "Error adding gallery photo", error: error.message });
  }
};

export const updateGalleryItem = async (req, res) => {
  try {
    const { id } = req.params;
    const index = galleryStore.findIndex(g => g.id === id);
    if (index === -1) return res.status(404).json({ message: "Gallery photo not found" });

    galleryStore[index] = { ...galleryStore[index], ...req.body };
    return res.json({ message: "Gallery photo updated successfully", item: galleryStore[index] });
  } catch (error) {
    return res.status(500).json({ message: "Error updating gallery photo", error: error.message });
  }
};

export const deleteGalleryItem = async (req, res) => {
  try {
    const { id } = req.params;
    galleryStore = galleryStore.filter(g => g.id !== id);
    return res.json({ message: "Gallery photo deleted successfully", id });
  } catch (error) {
    return res.status(500).json({ message: "Error deleting gallery photo", error: error.message });
  }
};
