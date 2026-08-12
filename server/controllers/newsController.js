import { News } from '../models/News.js';

export const getNews = async (req, res) => {
  try {
    const newsList = await News.find().sort({ createdAt: -1 });
    return res.json({ count: newsList.length, news: newsList });
  } catch (error) {
    return res.status(500).json({ message: "Error fetching news", error: error.message });
  }
};

export const createNews = async (req, res) => {
  try {
    const newNews = new News({
      id: req.body.id || `news-${Date.now()}`,
      title: req.body.title,
      date: req.body.date || new Date().toISOString().split('T')[0],
      category: req.body.category || 'General Alert',
      summary: req.body.summary,
      content: req.body.content || req.body.summary,
      image: req.body.image || '',
      important: req.body.important || false
    });

    await newNews.save();
    return res.status(201).json({ message: "News created successfully", news: newNews });
  } catch (error) {
    return res.status(500).json({ message: "Error creating news", error: error.message });
  }
};

export const updateNews = async (req, res) => {
  try {
    const { id } = req.params;
    const updated = await News.findOneAndUpdate(
      { $or: [{ id }, { _id: id.match(/^[0-9a-fA-F]{24}$/) ? id : null }] },
      { $set: req.body },
      { new: true }
    );
    if (!updated) return res.status(404).json({ message: "News item not found" });
    return res.json({ message: "News updated successfully", news: updated });
  } catch (error) {
    return res.status(500).json({ message: "Error updating news", error: error.message });
  }
};

export const deleteNews = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await News.findOneAndDelete({
      $or: [{ id }, { _id: id.match(/^[0-9a-fA-F]{24}$/) ? id : null }]
    });
    if (!deleted) return res.status(404).json({ message: "News item not found" });
    return res.json({ message: "News deleted successfully", id });
  } catch (error) {
    return res.status(500).json({ message: "Error deleting news", error: error.message });
  }
};
