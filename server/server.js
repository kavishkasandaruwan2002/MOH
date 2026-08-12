import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import fs from 'fs';
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
import { setupSwagger } from './config/swaggerConfig.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '.env') });

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB Database & Seed initial data
connectDB().then((connected) => {
  if (connected) {
    seedDatabase();
  }
});

// Middleware to ensure DB connection is ready on serverless environments (Vercel)
app.use(async (req, res, next) => {
  if (req.path.startsWith('/api')) {
    const isConnected = await connectDB();
    if (!isConnected && mongoose.connection.readyState !== 1) {
      return res.status(503).json({
        message: "Database connection initializing or unavailable. Please check MONGODB_URI on Vercel."
      });
    }
  }
  next();
});

// Enable CORS for Vercel production domains & local development
app.use(cors({
  origin: (origin, callback) => {
    // Allow all requesting origins in production/staging while preserving credentials
    callback(null, true);
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
}));

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
    dbState: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected',
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

// Serve built frontend static assets if available (Unified monorepo)
const clientDistPath = path.resolve(__dirname, '../client/dist');
if (fs.existsSync(clientDistPath)) {
  app.use(express.static(clientDistPath));
  app.get('*', (req, res, next) => {
    if (req.path.startsWith('/api')) return next();
    res.sendFile(path.join(clientDistPath, 'index.html'));
  });
}

// Listen on port in local environment
if (process.env.NODE_ENV !== 'production' || !process.env.VERCEL) {
  const server = app.listen(PORT, () => {
    console.log(`====================================================`);
    console.log(`🏥 MOH Sri Lanka Portal & Backend Server running on port ${PORT}`);
    console.log(`🔗 Web Application: http://localhost:${PORT}`);
    console.log(`====================================================`);
  });

  server.on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
      console.error(`❌ Port ${PORT} is already in use by another server process!`);
      process.exit(1);
    } else {
      console.error(`❌ Server Error: ${err.message}`);
    }
  });
}

export default app;
