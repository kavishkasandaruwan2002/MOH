import bcrypt from 'bcryptjs';
import { User } from '../models/User.js';
import { Doctor } from '../models/Doctor.js';
import { Clinic } from '../models/Clinic.js';
import { Appointment } from '../models/Appointment.js';
import { Complaint } from '../models/Complaint.js';
import { Alert } from '../models/Alert.js';
import { News } from '../models/News.js';
import { Article } from '../models/Article.js';
import { Gallery } from '../models/Gallery.js';

import {
  seedClinics,
  seedDoctors,
  seedHotspots,
  seedComplaints,
  seedAppointments,
  seedNews,
  seedArticles
} from '../data/mohSeedData.js';

// Default mock gallery data for seeding MongoDB
const seedGallery = [
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

// Default mock users matching frontend login configurations
const mockUsers = [
  {
    name: "Admin Officer",
    email: "admin@moh.gov.lk",
    password: "password123",
    role: "ADMIN",
    nic: "198012345678",
    phone: "+94 11 269 0000",
    division: "Colombo Central"
  },
  {
    name: "Dr. K. L. Perera",
    email: "doctor@moh.gov.lk",
    password: "password123",
    role: "STAFF",
    nic: "197899887766",
    phone: "+94 77 123 4567",
    division: "Colombo Central"
  },
  {
    name: "PHI - Nimal Bandara",
    email: "phi@moh.gov.lk",
    password: "password123",
    role: "PHI",
    nic: "198544332211",
    phone: "+94 71 888 9900",
    division: "Colombo Central"
  },
  {
    name: "Sunethra Ranasinghe",
    email: "citizen@example.com",
    password: "password123",
    role: "CITIZEN",
    nic: "199056781234",
    phone: "+94 77 999 8877",
    division: "Colombo Central"
  }
];

export const seedDatabase = async () => {
  try {
    // 1. Seed Users
    try {
      const userCount = await User.countDocuments();
      if (userCount === 0) {
        console.log('👤 Seeding mock users...');
        const hashedUsers = await Promise.all(mockUsers.map(async (u) => {
          const hashedPassword = await bcrypt.hash(u.password, 10);
          return { ...u, password: hashedPassword };
        }));
        await User.insertMany(hashedUsers, { ordered: false });
        console.log('✅ Mock users seeded successfully.');
      }
    } catch (e) {
      console.warn('⚠️ User seed notice:', e.message);
    }

    // 2. Seed Doctors
    try {
      const doctorCount = await Doctor.countDocuments();
      if (doctorCount === 0) {
        console.log('🥼 Seeding doctors...');
        await Doctor.insertMany(seedDoctors, { ordered: false });
        console.log('✅ Doctors seeded successfully.');
      }
    } catch (e) {
      console.warn('⚠️ Doctor seed notice:', e.message);
    }

    // 3. Seed Clinics
    try {
      const clinicCount = await Clinic.countDocuments();
      if (clinicCount === 0) {
        console.log('🏥 Seeding clinics...');
        await Clinic.insertMany(seedClinics, { ordered: false });
        console.log('✅ Clinics seeded successfully.');
      }
    } catch (e) {
      console.warn('⚠️ Clinic seed notice:', e.message);
    }

    // 4. Seed Appointments
    try {
      const appointmentCount = await Appointment.countDocuments();
      if (appointmentCount === 0) {
        console.log('📅 Seeding appointments...');
        await Appointment.insertMany(seedAppointments, { ordered: false });
        console.log('✅ Appointments seeded successfully.');
      }
    } catch (e) {
      console.warn('⚠️ Appointment seed notice:', e.message);
    }

    // 5. Seed Complaints
    try {
      const complaintCount = await Complaint.countDocuments();
      if (complaintCount === 0) {
        console.log('🚨 Seeding complaints...');
        await Complaint.insertMany(seedComplaints, { ordered: false });
        console.log('✅ Complaints seeded successfully.');
      }
    } catch (e) {
      console.warn('⚠️ Complaint seed notice:', e.message);
    }

    // 6. Seed Alerts (Hotspots)
    try {
      const alertCount = await Alert.countDocuments();
      if (alertCount === 0) {
        console.log('🦟 Seeding Dengue alerts...');
        await Alert.insertMany(seedHotspots, { ordered: false });
        console.log('✅ Dengue alerts seeded successfully.');
      }
    } catch (e) {
      console.warn('⚠️ Alert seed notice:', e.message);
    }

    // 7. Seed News
    try {
      const newsCount = await News.countDocuments();
      if (newsCount === 0) {
        console.log('📰 Seeding news notices...');
        await News.insertMany(seedNews, { ordered: false });
        console.log('✅ News notices seeded successfully.');
      }
    } catch (e) {
      console.warn('⚠️ News seed notice:', e.message);
    }

    // 8. Seed Articles
    try {
      const articleCount = await Article.countDocuments();
      if (articleCount === 0) {
        console.log('📖 Seeding articles...');
        await Article.insertMany(seedArticles, { ordered: false });
        console.log('✅ Articles seeded successfully.');
      }
    } catch (e) {
      console.warn('⚠️ Article seed notice:', e.message);
    }

    // 9. Seed Gallery
    try {
      const galleryCount = await Gallery.countDocuments();
      if (galleryCount === 0) {
        console.log('🖼️ Seeding gallery items...');
        await Gallery.insertMany(seedGallery, { ordered: false });
        console.log('✅ Gallery items seeded successfully.');
      }
    } catch (e) {
      console.warn('⚠️ Gallery seed notice:', e.message);
    }

    console.log('🎉 Database seeding checks completed.');
  } catch (error) {
    console.error(`❌ Database Seeding Error: ${error.message}`);
  }
};
