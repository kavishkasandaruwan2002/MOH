import React, { createContext, useContext, useState, useEffect } from 'react';
import { seedDoctors, seedClinics, seedNews, seedArticles } from '../data/mohSeedData.js';

// Default initial team members matching Home.jsx UI
const defaultTeamMembers = [
  {
    id: "doc-buttala-01",
    name: 'Dr. K. M. Wickramasinghe',
    role: 'Medical Officer of Health (MOH)',
    specialty: 'Medical Officer of Health (MOH)',
    qualifications: 'MBBS (Colombo), MSc (Community Medicine)',
    experience: '14 years',
    division: 'Buttala',
    image: '',
    bio: 'Dr. Wickramasinghe has over 14 years of public health experience leading preventative healthcare, maternal mortality reduction, and epidemic vector response in Monaragala district.'
  },
  {
    id: "doc-buttala-02",
    name: 'Dr. S. S. Perera',
    role: 'Additional Medical Officer of Health',
    specialty: 'Additional Medical Officer of Health',
    qualifications: 'MBBS (Peradeniya), PGDip (Epidemiology)',
    experience: '10 years',
    division: 'Buttala',
    image: '',
    bio: 'Dr. Perera specializes in non-communicable disease surveillance, school health inspection, and rural healthcare accessibility.'
  },
  {
    id: "doc-buttala-03",
    name: 'Mr. W. A. Jayasuriya',
    role: 'Supervising Public Health Inspector (SPHI)',
    specialty: 'Supervising Public Health Inspector (SPHI)',
    qualifications: 'Dip in Public Health Inspection',
    experience: '12 years',
    division: 'Buttala',
    image: '',
    bio: 'Mr. Jayasuriya leads the field PHI team covering 18 PHM divisions in Buttala, overseeing food hygiene inspections, water safety, and Dengue breeding site control.'
  },
  {
    id: "doc-buttala-04",
    name: 'Mrs. H. M. Rathnayake',
    role: 'Senior Public Health Nursing Sister',
    specialty: 'Senior Public Health Nursing Sister',
    qualifications: 'BSc Nursing, Dip in Midwifery',
    experience: '15 years',
    division: 'Buttala',
    image: '',
    bio: 'Mrs. Rathnayake coordinates Public Health Midwives (PHMs) across Buttala, focusing on prenatal home visits, infant growth tracking, and immunization.'
  }
];

// Default initial clinic schedules matching Home.jsx & Clinics.jsx
const defaultClinicSchedules = [
  {
    id: "sched-01",
    day: 'Monday',
    time: '8:30 AM - 12:30 PM',
    type: 'Ante-natal & Maternal Clinic',
    name: 'Ante-natal & Maternal Clinic',
    location: 'MOH Buttala Central Clinic',
    venue: 'MOH Buttala Central Clinic',
    doctor: 'Dr. K. M. Wickramasinghe',
    tag: 'Maternal',
    division: 'Buttala',
    district: 'Monaragala',
    operatingHours: 'Mon: 8:30 AM - 12:30 PM',
    categories: ['Maternal Care', 'Prenatal']
  },
  {
    id: "sched-02",
    day: 'Tuesday',
    time: '9:00 AM - 1:00 PM',
    type: 'Infant & Child Immunization',
    name: 'Infant & Child Immunization',
    location: 'Pelwatte Sub-center',
    venue: 'Pelwatte Sub-center',
    doctor: 'Dr. S. S. Perera',
    tag: 'Immunization',
    division: 'Buttala',
    district: 'Monaragala',
    operatingHours: 'Tue: 9:00 AM - 1:00 PM',
    categories: ['Vaccination', 'Child Health']
  },
  {
    id: "sched-03",
    day: 'Wednesday',
    time: '8:30 AM - 12:00 PM',
    type: 'Well Woman & Cervical Screening',
    name: 'Well Woman & Cervical Screening',
    location: 'MOH Buttala Central Clinic',
    venue: 'MOH Buttala Central Clinic',
    doctor: 'Dr. K. M. Wickramasinghe',
    tag: 'Well Woman',
    division: 'Buttala',
    district: 'Monaragala',
    operatingHours: 'Wed: 8:30 AM - 12:00 PM',
    categories: ['Women Health', 'Screening']
  },
  {
    id: "sched-04",
    day: 'Thursday',
    time: '9:00 AM - 1:30 PM',
    type: 'NCD & Diabetes Screening Clinic',
    name: 'NCD & Diabetes Screening Clinic',
    location: 'Kukurampola Community Center',
    venue: 'Kukurampola Community Center',
    doctor: 'Dr. S. S. Perera',
    tag: 'NCD',
    division: 'Buttala',
    district: 'Monaragala',
    operatingHours: 'Thu: 9:00 AM - 1:30 PM',
    categories: ['NCD Screening', 'Diabetes']
  },
  {
    id: "sched-05",
    day: 'Friday',
    time: '8:30 AM - 12:00 PM',
    type: 'Dental Clinic & School Health',
    name: 'Dental Clinic & School Health',
    location: 'MOH Dental Unit',
    venue: 'MOH Dental Unit',
    doctor: 'Dr. N. H. Ranasinghe',
    tag: 'Dental',
    division: 'Buttala',
    district: 'Monaragala',
    operatingHours: 'Fri: 8:30 AM - 12:00 PM',
    categories: ['Dental', 'School Health']
  }
];

// Default System Users
const defaultUsersList = [
  {
    id: "usr-01",
    _id: "usr-01",
    name: "Dr. K. M. Wickramasinghe",
    email: "admin@moh.gov.lk",
    role: "ADMIN",
    nic: "791823456V",
    phone: "+94 77 123 4567",
    division: "Buttala"
  },
  {
    id: "usr-02",
    _id: "usr-02",
    name: "Dr. S. S. Perera",
    email: "doctor@moh.gov.lk",
    role: "DOCTOR",
    nic: "842918273V",
    phone: "+94 71 987 6543",
    division: "Buttala"
  },
  {
    id: "usr-03",
    _id: "usr-03",
    name: "Mr. W. A. Jayasuriya",
    email: "phi@moh.gov.lk",
    role: "PHI",
    nic: "810293847V",
    phone: "+94 70 333 4444",
    division: "Buttala"
  },
  {
    id: "usr-04",
    _id: "usr-04",
    name: "Mrs. H. M. Rathnayake",
    email: "staff@moh.gov.lk",
    role: "STAFF",
    nic: "875647382V",
    phone: "+94 72 555 6666",
    division: "Buttala"
  },
  {
    id: "usr-05",
    _id: "usr-05",
    name: "Kavishka Sandaruwan",
    email: "citizen@moh.gov.lk",
    role: "CITIZEN",
    nic: "200212345678",
    phone: "+94 78 888 9999",
    division: "Buttala"
  }
];

// Default Gallery Items
const defaultGalleryList = [
  { id: 'gal-buttala-01', title: 'Office of the Medical Officer of Health - Buttala', category: 'Facilities', url: '/gallery/moh_buttala_office_building.jpg', desc: 'Main administrative & clinical headquarters serving Buttala division, Monaragala district.' },
  { id: 'gal-buttala-02', title: 'Official MOH Buttala Main Entrance Signboard', category: 'Facilities', url: '/gallery/moh_buttala_signboard.jpg', desc: 'Official trilingual signage of the Medical Officer of Health Office, Buttala.' },
  { id: 'gal-buttala-03', title: 'Maternal & Clinical Medical Examination Session', category: 'Clinics', url: '/gallery/moh_buttala_clinical_examination.jpg', desc: 'Doctor and Nursing Officer conducting maternal health examination and stethoscope checkup at MOH clinic.' },
  { id: 'gal-buttala-04', title: 'Community Healthcare & Field Outreach Session', category: 'Clinics', url: '/gallery/moh_buttala_community_health.jpeg', desc: 'MOH staff and PHI field officers conducting rural healthcare consultation.' },
  { id: 'gal-buttala-05', title: 'Clinical Diagnostics & Patient Care Room', category: 'Clinics', url: '/gallery/moh_buttala_clinic_session.jpeg', desc: 'Doctor and nursing team evaluating patient records and clinical vitals.' },
  { id: 'gal-buttala-06', title: 'MOH Buttala Field Inspection & Health Center', category: 'Facilities', url: '/gallery/moh_buttala_field_inspection.jpg', desc: 'Field inspection and health center facilities serving Buttala community.' },
  { id: 'gal-01', title: 'MOH Office Buttala Main Healthcare Facility', category: 'Facilities', url: '/moh_buttala_building.png', desc: 'Main administrative and clinic facility serving Monaragala district.' },
  { id: 'gal-02', title: 'Infant Immunization Clinic Day', category: 'Clinics', url: 'https://images.unsplash.com/photo-1631815588090-d4bfec5b1cdb?auto=format&fit=crop&w=800&q=80', desc: 'Weekly maternal & infant growth tracking and national vaccination clinic.' },
  { id: 'gal-03', title: 'PHI Field Dengue Inspection & Fogging', category: 'Dengue Campaigns', url: 'https://images.unsplash.com/photo-1584036561566-baf8f5f1b144?auto=format&fit=crop&w=800&q=80', desc: 'Vector surveillance and smoke fogging operations in high-risk PHM divisions.' }
];

const DataContext = createContext();

export const DataProvider = ({ children }) => {
  // Load saved local cache if available
  const getInitialState = (key, fallback) => {
    try {
      const saved = localStorage.getItem(`moh_${key}`);
      return saved ? JSON.parse(saved) : fallback;
    } catch (e) {
      return fallback;
    }
  };

  const [teamMembers, setTeamMembers] = useState(() => getInitialState('team_members', defaultTeamMembers));
  const [clinicSchedules, setClinicSchedules] = useState(() => getInitialState('clinic_schedules', defaultClinicSchedules));
  const [newsList, setNewsList] = useState(() => getInitialState('news_list', seedNews));
  const [articlesList, setArticlesList] = useState(() => getInitialState('articles_list', seedArticles));
  const [usersList, setUsersList] = useState(() => getInitialState('users_list', defaultUsersList));
  const [galleryList, setGalleryList] = useState(() => {
    const list = getInitialState('gallery_list', defaultGalleryList);
    // Ensure all 6 MOH Buttala photos exist in state
    const hasNewPhotos = list.some(item => item.id === 'gal-buttala-04');
    if (!hasNewPhotos) {
      return defaultGalleryList;
    }
    return list;
  });

  // Persist to localStorage whenever state changes
  useEffect(() => {
    localStorage.setItem('moh_team_members', JSON.stringify(teamMembers));
  }, [teamMembers]);

  useEffect(() => {
    localStorage.setItem('moh_clinic_schedules', JSON.stringify(clinicSchedules));
  }, [clinicSchedules]);

  useEffect(() => {
    localStorage.setItem('moh_news_list', JSON.stringify(newsList));
  }, [newsList]);

  useEffect(() => {
    localStorage.setItem('moh_articles_list', JSON.stringify(articlesList));
  }, [articlesList]);

  useEffect(() => {
    localStorage.setItem('moh_users_list', JSON.stringify(usersList));
  }, [usersList]);

  useEffect(() => {
    localStorage.setItem('moh_gallery_list', JSON.stringify(galleryList));
  }, [galleryList]);

  // Fetch initial data from server APIs when available
  useEffect(() => {
    // 1. Fetch Doctors / Team
    fetch('/api/clinics/doctors')
      .then(res => res.json())
      .then(data => {
        if (data.doctors && data.doctors.length > 0) {
          const apiDocs = data.doctors.map(d => ({
            id: d.id || d._id,
            name: d.name,
            role: d.specialty || d.role || "Medical Officer",
            specialty: d.specialty || d.role || "Medical Officer",
            qualifications: d.qualifications || "",
            experience: d.experience || "",
            division: d.division || "Buttala",
            image: d.image || "",
            bio: d.bio || ""
          }));
          // Merge API doctors with default team members ensuring no duplicates by id
          setTeamMembers(prev => {
            const map = new Map();
            prev.forEach(item => map.set(item.id, item));
            apiDocs.forEach(item => map.set(item.id, item));
            return Array.from(map.values());
          });
        }
      })
      .catch(() => {});

    // 2. Fetch Clinics / Schedules
    fetch('/api/clinics')
      .then(res => res.json())
      .then(data => {
        if (data.clinics && data.clinics.length > 0) {
          const apiClinics = data.clinics.map(c => ({
            id: c.id || c._id,
            day: c.day || 'Monday',
            time: c.operatingHours || c.time || '8:30 AM - 12:30 PM',
            type: c.name || c.type,
            name: c.name,
            location: c.address || c.location || 'MOH Central Clinic',
            venue: c.address || c.venue || 'MOH Central Clinic',
            doctor: c.doctor || 'Dr. K. M. Wickramasinghe',
            tag: c.tag || 'Maternal',
            division: c.division || 'Buttala',
            district: c.district || 'Monaragala',
            operatingHours: c.operatingHours || '8:30 AM - 12:30 PM',
            categories: c.categories || ['Maternal Care']
          }));
          setClinicSchedules(prev => {
            const map = new Map();
            prev.forEach(item => map.set(item.id, item));
            apiClinics.forEach(item => map.set(item.id, item));
            return Array.from(map.values());
          });
        }
      })
      .catch(() => {});

    // 3. Fetch News
    fetch('/api/news')
      .then(res => res.json())
      .then(data => {
        if (data.news && data.news.length > 0) {
          setNewsList(prev => {
            const map = new Map();
            prev.forEach(item => map.set(item.id, item));
            data.news.forEach(item => map.set(item.id, item));
            return Array.from(map.values());
          });
        }
      })
      .catch(() => {});

    // 4. Fetch Articles
    fetch('/api/articles')
      .then(res => res.json())
      .then(data => {
        if (data.articles && data.articles.length > 0) {
          setArticlesList(prev => {
            const map = new Map();
            prev.forEach(item => map.set(item.id, item));
            data.articles.forEach(item => map.set(item.id, item));
            return Array.from(map.values());
          });
        }
      })
      .catch(() => {});

    // 5. Fetch Users
    fetch('/api/auth/users')
      .then(res => res.json())
      .then(data => {
        if (data.users && data.users.length > 0) {
          const apiUsers = data.users.map(u => ({
            id: u._id || u.id,
            _id: u._id || u.id,
            name: u.name,
            email: u.email,
            role: u.role,
            nic: u.nic,
            phone: u.phone,
            division: u.division
          }));
          setUsersList(prev => {
            const map = new Map();
            prev.forEach(item => map.set(item.id || item._id, item));
            apiUsers.forEach(item => map.set(item.id || item._id, item));
            return Array.from(map.values());
          });
        }
      })
      .catch(() => {});

    // 6. Fetch Gallery
    fetch('/api/gallery')
      .then(res => res.json())
      .then(data => {
        if (data.gallery && data.gallery.length > 0) {
          setGalleryList(prev => {
            const map = new Map();
            prev.forEach(item => map.set(item.id, item));
            data.gallery.forEach(item => map.set(item.id, item));
            return Array.from(map.values());
          });
        }
      })
      .catch(() => {});
  }, []);

  // --- TEAM MEMBER CRUD ---
  const addTeamMember = async (member) => {
    const newMember = {
      id: `doc-${Date.now()}`,
      name: member.name,
      role: member.role || member.specialty || "Medical Officer",
      specialty: member.role || member.specialty || "Medical Officer",
      qualifications: member.qualifications || "",
      experience: member.experience || "5 years",
      division: member.division || "Buttala",
      image: member.image || "",
      bio: member.bio || ""
    };

    setTeamMembers(prev => [newMember, ...prev]);

    try {
      await fetch('/api/clinics/doctors', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newMember)
      });
    } catch (e) {}
    return newMember;
  };

  const updateTeamMember = async (id, memberData) => {
    setTeamMembers(prev => prev.map(m => m.id === id ? { ...m, ...memberData } : m));

    try {
      await fetch(`/api/clinics/doctors/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(memberData)
      });
    } catch (e) {}
  };

  const deleteTeamMember = async (id) => {
    setTeamMembers(prev => prev.filter(m => m.id !== id));

    try {
      await fetch(`/api/clinics/doctors/${id}`, {
        method: 'DELETE'
      });
    } catch (e) {}
  };

  // --- CLINIC SCHEDULE CRUD ---
  const addClinicSchedule = async (clinic) => {
    const newClinic = {
      id: `sched-${Date.now()}`,
      day: clinic.day || 'Monday',
      time: clinic.time || '8:30 AM - 12:30 PM',
      type: clinic.type || clinic.name || 'MOH Clinic',
      name: clinic.name || clinic.type || 'MOH Clinic',
      location: clinic.location || clinic.venue || 'MOH Buttala Central Clinic',
      venue: clinic.venue || clinic.location || 'MOH Buttala Central Clinic',
      doctor: clinic.doctor || 'Dr. K. M. Wickramasinghe',
      tag: clinic.tag || 'Maternal',
      division: clinic.division || 'Buttala',
      district: clinic.district || 'Monaragala',
      operatingHours: clinic.time || '8:30 AM - 12:30 PM',
      categories: clinic.categories || [clinic.tag || 'General']
    };

    setClinicSchedules(prev => [newClinic, ...prev]);

    try {
      await fetch('/api/clinics', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newClinic)
      });
    } catch (e) {}
    return newClinic;
  };

  const updateClinicSchedule = async (id, clinicData) => {
    setClinicSchedules(prev => prev.map(c => c.id === id ? { ...c, ...clinicData } : c));

    try {
      await fetch(`/api/clinics/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(clinicData)
      });
    } catch (e) {}
  };

  const deleteClinicSchedule = async (id) => {
    setClinicSchedules(prev => prev.filter(c => c.id !== id));

    try {
      await fetch(`/api/clinics/${id}`, {
        method: 'DELETE'
      });
    } catch (e) {}
  };

  // --- NEWS CRUD ---
  const addNews = async (news) => {
    const newNews = {
      id: `news-${Date.now()}`,
      title: news.title,
      date: news.date || new Date().toISOString().split('T')[0],
      category: news.category || 'General Alert',
      summary: news.summary,
      content: news.content || news.summary,
      image: news.image || 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=800&q=80',
      important: news.important || false
    };

    setNewsList(prev => [newNews, ...prev]);

    try {
      await fetch('/api/news', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newNews)
      });
    } catch (e) {}
    return newNews;
  };

  const updateNews = async (id, newsData) => {
    setNewsList(prev => prev.map(n => n.id === id ? { ...n, ...newsData } : n));

    try {
      await fetch(`/api/news/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newsData)
      });
    } catch (e) {}
  };

  const deleteNews = async (id) => {
    setNewsList(prev => prev.filter(n => n.id !== id));

    try {
      await fetch(`/api/news/${id}`, {
        method: 'DELETE'
      });
    } catch (e) {}
  };

  // --- ARTICLE CRUD ---
  const addArticle = async (article) => {
    const newArticle = {
      id: `art-${Date.now()}`,
      title: article.title,
      category: article.category || 'Disease Prevention',
      readTime: article.readTime || '4 min read',
      author: article.author || 'MOH Medical Officer',
      summary: article.summary,
      content: article.content || article.summary,
      image: article.image || 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=800&q=80',
      tags: article.tags || ['Health', 'MOH']
    };

    setArticlesList(prev => [newArticle, ...prev]);

    try {
      await fetch('/api/articles', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newArticle)
      });
    } catch (e) {}
    return newArticle;
  };

  const updateArticle = async (id, articleData) => {
    setArticlesList(prev => prev.map(a => a.id === id ? { ...a, ...articleData } : a));

    try {
      await fetch(`/api/articles/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(articleData)
      });
    } catch (e) {}
  };

  const deleteArticle = async (id) => {
    setArticlesList(prev => prev.filter(a => a.id !== id));

    try {
      await fetch(`/api/articles/${id}`, {
        method: 'DELETE'
      });
    } catch (e) {}
  };

  // --- USER ROLE MANAGEMENT CRUD ---
  const updateUserRole = async (userId, newRole, updatedFields = {}) => {
    setUsersList(prev => prev.map(u => (u.id === userId || u._id === userId) ? { ...u, role: newRole, ...updatedFields } : u));

    try {
      await fetch(`/api/auth/users/${userId}/role`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ role: newRole, ...updatedFields })
      });
    } catch (e) {}
  };

  const addUser = async (userData) => {
    const newUser = {
      id: `usr-${Date.now()}`,
      _id: `usr-${Date.now()}`,
      name: userData.name,
      email: userData.email,
      role: (userData.role || 'CITIZEN').toUpperCase(),
      nic: userData.nic || `NIC-${Date.now().toString().slice(-8)}`,
      phone: userData.phone || '+94 77 123 4567',
      division: userData.division || 'Buttala'
    };

    setUsersList(prev => [newUser, ...prev]);

    try {
      await fetch('/api/auth/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newUser)
      });
    } catch (e) {}
    return newUser;
  };

  const deleteUser = async (userId) => {
    setUsersList(prev => prev.filter(u => u.id !== userId && u._id !== userId));

    try {
      await fetch(`/api/auth/users/${userId}`, {
        method: 'DELETE'
      });
    } catch (e) {}
  };

  // --- GALLERY CRUD ---
  const addGalleryItem = async (item) => {
    const newItem = {
      id: `gal-${Date.now()}`,
      title: item.title,
      category: item.category || 'Facilities',
      url: item.url || '/moh_buttala_building.png',
      desc: item.desc || item.summary || ''
    };

    setGalleryList(prev => [newItem, ...prev]);

    try {
      await fetch('/api/gallery', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newItem)
      });
    } catch (e) {}
    return newItem;
  };

  const updateGalleryItem = async (id, itemData) => {
    setGalleryList(prev => prev.map(g => g.id === id ? { ...g, ...itemData } : g));

    try {
      await fetch(`/api/gallery/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(itemData)
      });
    } catch (e) {}
  };

  const deleteGalleryItem = async (id) => {
    setGalleryList(prev => prev.filter(g => g.id !== id));

    try {
      await fetch(`/api/gallery/${id}`, {
        method: 'DELETE'
      });
    } catch (e) {}
  };

  return (
    <DataContext.Provider value={{
      teamMembers,
      addTeamMember,
      updateTeamMember,
      deleteTeamMember,
      clinicSchedules,
      addClinicSchedule,
      updateClinicSchedule,
      deleteClinicSchedule,
      newsList,
      addNews,
      updateNews,
      deleteNews,
      articlesList,
      addArticle,
      updateArticle,
      deleteArticle,
      usersList,
      updateUserRole,
      addUser,
      deleteUser,
      galleryList,
      addGalleryItem,
      updateGalleryItem,
      deleteGalleryItem
    }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => useContext(DataContext);
