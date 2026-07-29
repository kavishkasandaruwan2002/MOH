import express from 'express';
import { handleAIChat, evaluateSymptoms } from '../controllers/aiController.js';

const router = express.Router();

router.post('/chat', handleAIChat);
router.post('/symptom-eval', evaluateSymptoms);

export default router;
