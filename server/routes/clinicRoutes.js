import express from 'express';
import { 
  getClinics, 
  getDoctors, 
  createClinic, 
  updateClinic, 
  deleteClinic,
  createDoctor,
  updateDoctor,
  deleteDoctor
} from '../controllers/clinicController.js';

const router = express.Router();

// Clinics endpoints
router.get('/', getClinics);
router.post('/', createClinic);
router.put('/:id', updateClinic);
router.delete('/:id', deleteClinic);

// Doctors/Officers endpoints
router.get('/doctors', getDoctors);
router.post('/doctors', createDoctor);
router.put('/doctors/:id', updateDoctor);
router.delete('/doctors/:id', deleteDoctor);

export default router;
