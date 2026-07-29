import bcrypt from 'bcryptjs';
import { User } from '../models/User.js';
import { Doctor } from '../models/Doctor.js';
import { Clinic } from '../models/Clinic.js';
import { Appointment } from '../models/Appointment.js';
import { Complaint } from '../models/Complaint.js';
import { Alert } from '../models/Alert.js';
import { News } from '../models/News.js';
import { Article } from '../models/Article.js';

import {
  seedClinics,
  seedDoctors,
  seedHotspots,
  seedComplaints,
  seedAppointments,
  seedNews,
  seedArticles
} from '../data/mohSeedData.js';

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
    const userCount = await User.countDocuments();
    if (userCount === 0) {
      console.log('👤 Seeding mock users...');
      const hashedUsers = await Promise.all(mockUsers.map(async (u) => {
        const hashedPassword = await bcrypt.hash(u.password, 10);
        return { ...u, password: hashedPassword };
      }));
      await User.insertMany(hashedUsers);
      console.log('✅ Mock users seeded successfully.');
    }

    // 2. Seed Doctors
    const doctorCount = await Doctor.countDocuments();
    if (doctorCount === 0) {
      console.log('🥼 Seeding doctors...');
      await Doctor.insertMany(seedDoctors);
      console.log('✅ Doctors seeded successfully.');
    }

    // 3. Seed Clinics
    const clinicCount = await Clinic.countDocuments();
    if (clinicCount === 0) {
      console.log('🏥 Seeding clinics...');
      await Clinic.insertMany(seedClinics);
      console.log('✅ Clinics seeded successfully.');
    }

    // 4. Seed Appointments
    const appointmentCount = await Appointment.countDocuments();
    if (appointmentCount === 0) {
      console.log('📅 Seeding appointments...');
      await Appointment.insertMany(seedAppointments);
      console.log('✅ Appointments seeded successfully.');
    }

    // 5. Seed Complaints
    const complaintCount = await Complaint.countDocuments();
    if (complaintCount === 0) {
      console.log('🚨 Seeding complaints...');
      await Complaint.insertMany(seedComplaints);
      console.log('✅ Complaints seeded successfully.');
    }

    // 6. Seed Alerts (Hotspots)
    const alertCount = await Alert.countDocuments();
    if (alertCount === 0) {
      console.log('🦟 Seeding Dengue alerts...');
      await Alert.insertMany(seedHotspots);
      console.log('✅ Dengue alerts seeded successfully.');
    }

    // 7. Seed News
    const newsCount = await News.countDocuments();
    if (newsCount === 0) {
      console.log('📰 Seeding news notices...');
      await News.insertMany(seedNews);
      console.log('✅ News notices seeded successfully.');
    }

    // 8. Seed Articles
    const articleCount = await Article.countDocuments();
    if (articleCount === 0) {
      console.log('📖 Seeding articles...');
      await Article.insertMany(seedArticles);
      console.log('✅ Articles seeded successfully.');
    }

    console.log('🎉 Database seeding checks completed.');
  } catch (error) {
    console.error(`❌ Database Seeding Error: ${error.message}`);
  }
};
