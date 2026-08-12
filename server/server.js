import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

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
import { setupSwagger } from './config/swaggerConfig.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB Database
connectDB().then((connected) => {
  if (connected) {
    // Seed Database with initial mock collections if they are empty
    seedDatabase();
  } else {
    console.warn(`⚠️ Skipping database seeding due to MongoDB connection failure.`);
  }
});

app.use(cors());
app.use(express.json({ limit: '20mb' }));
app.use(express.urlencoded({ limit: '20mb', extended: true }));

// Setup Interactive Swagger UI Documentation at /api-docs
setupSwagger(app);

// Health Check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'online',
    service: 'MOH Sri Lanka Public Health Portal API',
    swaggerDocs: '/api-docs',
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

app.listen(PORT, () => {
  console.log(`====================================================`);
  console.log(`🏥 MOH Sri Lanka Portal & Backend Server running on port ${PORT}`);
  console.log(`🔗 Web Application: http://localhost:${PORT}`);
  console.log(`====================================================`);
});
