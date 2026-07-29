import express from 'express';
import { getAppointments, createAppointment, updateAppointmentStatus, cancelAppointment, lookupAppointmentStatus } from '../controllers/appointmentController.js';

const router = express.Router();

router.get('/', getAppointments);
router.get('/lookup', lookupAppointmentStatus);
router.post('/', createAppointment);
router.patch('/:id/status', updateAppointmentStatus);
router.delete('/:id', cancelAppointment);

export default router;

