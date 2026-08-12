import express from 'express';
import { getNews, createNews, updateNews, deleteNews } from '../controllers/newsController.js';

const router = express.Router();

router.get('/', getNews);
router.post('/', createNews);
router.put('/:id', updateNews);
router.delete('/:id', deleteNews);

export default router;
