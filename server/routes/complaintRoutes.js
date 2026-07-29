import express from 'express';
import { getComplaints, submitComplaint, updateComplaintStatus } from '../controllers/complaintController.js';

const router = express.Router();

router.get('/', getComplaints);
router.post('/', submitComplaint);
router.patch('/:id/status', updateComplaintStatus);

export default router;
