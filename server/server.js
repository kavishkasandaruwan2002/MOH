import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

import { connectDB } from './config/db.js';
import { seedDatabase } from './seed/seeder.js';

// Route Imports
import authRoutes from './routes/authRoutes.js';
import clinicRoutes from './routes/clinicRoutes.js';
import appointmentRoutes from './routes/appointmentRoutes.js';
import complaintRoutes from './routes/complaintRoutes.js';
import surveillanceRoutes from './routes/surveillanceRoutes.js';
import aiRoutes from './routes/aiRoutes.js';
import analyticsRoutes from './routes/analyticsRoutes.js';
import newsRoutes from './routes/newsRoutes.js';
import articleRoutes from './routes/articleRoutes.js';
import galleryRoutes from './routes/galleryRoutes.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB Database
connectDB().then(() => {
  // Seed Database with initial mock collections if they are empty
  seedDatabase();
});

app.use(cors());
app.use(express.json());

// Health Check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'online',
    service: 'MOH Sri Lanka Public Health Portal API',
    timestamp: new Date().toISOString()
  });
});

// RESTful Route Registrations
app.use('/api/auth', authRoutes);
app.use('/api/clinics', clinicRoutes);
app.use('/api/appointments', appointmentRoutes);
app.use('/api/complaints', complaintRoutes);
app.use('/api/surveillance', surveillanceRoutes);
app.use('/api/ai', aiRoutes);
app.use('/api/analytics', analyticsRoutes);
app.use('/api/news', newsRoutes);
app.use('/api/articles', articleRoutes);
app.use('/api/gallery', galleryRoutes);

// Serve static frontend dist bundle
const distPath = path.join(__dirname, '../client/dist');
app.use(express.static(distPath));

// Fallback all SPA routes to index.html
app.get('*', (req, res, next) => {
  if (req.path.startsWith('/api')) return next();
  res.sendFile(path.join(distPath, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`====================================================`);
  console.log(`🏥 MOH Sri Lanka Portal & Backend Server running on port ${PORT}`);
  console.log(`🔗 Web Application: http://localhost:${PORT}`);
  console.log(`====================================================`);
});
