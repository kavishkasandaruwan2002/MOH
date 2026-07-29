import express from 'express';
import { getHotspots, getImmunizationSchedule, getNews, getArticles, getEmergencyNumbers } from '../controllers/surveillanceController.js';

const router = express.Router();

router.get('/hotspots', getHotspots);
router.get('/vaccines/schedule', getImmunizationSchedule);
router.get('/news', getNews);
router.get('/articles', getArticles);
router.get('/emergencies', getEmergencyNumbers);

export default router;
