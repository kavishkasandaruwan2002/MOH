import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'MOH Sri Lanka Public Health Portal API',
      version: '1.0.0',
      description: 'Official Interactive Swagger API Documentation for Ministry of Health (MOH) Buttala Public Health Portal. Use this interactive console to test, inspect, and verify all RESTful endpoints.',
      contact: {
        name: 'MOH Buttala Technical Team',
        email: 'support@mohbuttala.gov.lk',
        url: 'https://mohbuttala.gov.lk'
      }
    },
    servers: [
      {
        url: 'http://localhost:5000',
        description: 'Local Express Development Server'
      },
      {
        url: 'https://moh-srilanka-portal.vercel.app',
        description: 'Production Vercel Cloud Server'
      }
    ],
    components: {
      securitySchemes: {
        BearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
          description: 'Enter your JWT authorization token (e.g. "demo-jwt-token")'
        }
      }
    },
    tags: [
      { name: 'Authentication & Users', description: 'User login, registration, role management, and profile photo updates' },
      { name: 'Photo Gallery', description: 'System Admin gallery photo CRUD management' },
      { name: 'Clinic Schedules', description: 'MOH clinic timetables and weekly service rosters' },
      { name: 'Appointments', description: 'Patient booking and QR pass lookup' },
      { name: 'PHI Complaints', description: 'Environmental health complaint lodgement and field inspection tracking' },
      { name: 'Disease Surveillance', description: 'Dengue GIS hotspot mapping and disease outbreak tracking' },
      { name: 'News & Health Articles', description: 'Public health advisories and health education articles' },
      { name: 'AI Symptom Checker', description: 'AI-assisted medical symptom triage engine' },
      { name: 'Analytics', description: 'Central Admin command dashboard statistics' }
    ],
    paths: {
      '/api/health': {
        get: {
          summary: 'Check API Server Health Status',
          tags: ['Analytics'],
          responses: {
            200: {
              description: 'Server is online and responding cleanly',
              content: {
                'application/json': {
                  example: { status: 'online', service: 'MOH Sri Lanka Public Health Portal API', timestamp: '2026-08-12T10:45:00.000Z' }
                }
              }
            }
          }
        }
      },
      '/api/gallery': {
        get: {
          summary: 'Fetch All Photo Gallery Items',
          tags: ['Photo Gallery'],
          responses: {
            200: { description: 'List of gallery photos with titles, categories, URLs, and captions' }
          }
        },
        post: {
          summary: 'Add a New Photo to Gallery (Admin)',
          tags: ['Photo Gallery'],
          requestBody: {
            required: true,
            content: {
              'application/json': {
                example: { title: 'MOH Maternity Ward Inspection', category: 'Facilities', url: 'https://images.unsplash.com/...', desc: 'Field inspection of new maternity wing.' }
              }
            }
          },
          responses: {
            201: { description: 'Gallery photo created successfully' }
          }
        }
      },
      '/api/gallery/{id}': {
        put: {
          summary: 'Update Gallery Photo Details',
          tags: ['Photo Gallery'],
          parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }],
          requestBody: { required: true, content: { 'application/json': { example: { title: 'Updated Title', category: 'Clinics' } } } },
          responses: { 200: { description: 'Photo updated' } }
        },
        delete: {
          summary: 'Delete Gallery Photo',
          tags: ['Photo Gallery'],
          parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }],
          responses: { 200: { description: 'Photo deleted' } }
        }
      },
      '/api/auth/login': {
        post: {
          summary: 'User Login & JWT Token Issue',
          tags: ['Authentication & Users'],
          requestBody: {
            required: true,
            content: { 'application/json': { example: { email: 'admin@moh.gov.lk', password: 'password123' } } }
          },
          responses: { 200: { description: 'JWT token and user profile returned' } }
        }
      },
      '/api/auth/users/{id}': {
        put: {
          summary: 'Update User Profile Details & Photo (Saved to MongoDB)',
          tags: ['Authentication & Users'],
          parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }],
          requestBody: {
            required: true,
            content: {
              'application/json': {
                example: { name: 'Dr. K. M. Wickramasinghe', phone: '+94 77 123 4567', division: 'Buttala', avatar: 'data:image/png;base64,...', bio: 'Senior Medical Officer of Health' }
              }
            }
          },
          responses: { 200: { description: 'Profile updated and saved to MongoDB' } }
        }
      },
      '/api/clinics': {
        get: {
          summary: 'Fetch All MOH Clinic Schedules',
          tags: ['Clinic Schedules'],
          responses: { 200: { description: 'Clinic timetable list' } }
        }
      },
      '/api/appointments': {
        get: { summary: 'Fetch Patient Appointments', tags: ['Appointments'] },
        post: {
          summary: 'Book New Clinic Appointment',
          tags: ['Appointments'],
          requestBody: {
            required: true,
            content: { 'application/json': { example: { citizenName: 'Sunethra Ranasinghe', nic: '199056781234', phone: '+94 77 999 8877', clinicName: 'MOH Central Clinic', appointmentDate: '2026-08-20', appointmentTime: '09:00 AM' } } }
          },
          responses: { 201: { description: 'Appointment ticket generated' } }
        }
      },
      '/api/complaints': {
        get: { summary: 'Fetch PHI Environmental Health Complaints', tags: ['PHI Complaints'] },
        post: {
          summary: 'Lodge New Health Complaint',
          tags: ['PHI Complaints'],
          requestBody: {
            required: true,
            content: { 'application/json': { example: { citizenName: 'Kamal Silva', phone: '+94 71 222 3344', category: 'Dengue Mosquito Breeding', location: 'Pelwatte Road, Buttala', description: 'Stagnant water near construction site' } } }
          },
          responses: { 201: { description: 'Complaint lodged for PHI inspection' } }
        }
      },
      '/api/surveillance/gis-map': {
        get: { summary: 'Fetch Dengue Outbreak GIS Mapping Points', tags: ['Disease Surveillance'] }
      },
      '/api/ai/symptom-check': {
        post: {
          summary: 'Execute AI Medical Symptom Triage Assessment',
          tags: ['AI Symptom Checker'],
          requestBody: { required: true, content: { 'application/json': { example: { symptoms: ['High fever for 3 days', 'Severe headache', 'Joint pain'], age: 34, gender: 'Female' } } } },
          responses: { 200: { description: 'AI triage assessment & advisory recommendation' } }
        }
      },
      '/api/analytics/dashboard': {
        get: { summary: 'Fetch Central Command Dashboard Analytics', tags: ['Analytics'] }
      }
    }
  },
  apis: []
};

const swaggerSpec = swaggerJSDoc(swaggerOptions);

export const setupSwagger = (app) => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, {
    customCss: '.swagger-ui .topbar { background-color: #134E4A; } .swagger-ui .topbar a span { display: none; }',
    customSiteTitle: 'MOH Sri Lanka API Swagger Documentation'
  }));

  // JSON Endpoint for raw swagger spec
  app.get('/api-docs.json', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(swaggerSpec);
  });
};
