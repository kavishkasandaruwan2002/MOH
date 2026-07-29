import { Alert } from '../models/Alert.js';
import { News } from '../models/News.js';
import { Article } from '../models/Article.js';
import { seedImmunizationSchedule, seedEmergencyNumbers } from '../data/mohSeedData.js';

export const getHotspots = async (req, res) => {
  try {
    const hotspots = await Alert.find({});
    return res.json({ hotspots });
  } catch (error) {
    return res.status(500).json({ message: "Error fetching hotspots", error: error.message });
  }
};

export const getImmunizationSchedule = (req, res) => {
  return res.json({ schedule: seedImmunizationSchedule });
};

export const getNews = async (req, res) => {
  try {
    const newsList = await News.find({}).sort({ date: -1 });
    return res.json({ news: newsList });
  } catch (error) {
    return res.status(500).json({ message: "Error fetching news", error: error.message });
  }
};

export const getArticles = async (req, res) => {
  try {
    const { category, search } = req.query;
    let query = {};

    if (category && category !== 'All') {
      query.category = category;
    }

    if (search) {
      const regexSearch = { $regex: search, $options: 'i' };
      query.$or = [
        { title: regexSearch },
        { summary: regexSearch }
      ];
    }

    const list = await Article.find(query).sort({ createdAt: -1 });
    return res.json({ articles: list });
  } catch (error) {
    return res.status(500).json({ message: "Error fetching articles", error: error.message });
  }
};

export const getEmergencyNumbers = (req, res) => {
  return res.json({ emergencies: seedEmergencyNumbers });
};
