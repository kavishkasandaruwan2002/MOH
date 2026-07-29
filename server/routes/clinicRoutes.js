import express from 'express';
import { getClinics, getDoctors, createClinic } from '../controllers/clinicController.js';

const router = express.Router();

router.get('/', getClinics);
router.get('/doctors', getDoctors);
router.post('/', createClinic);

export default router;
