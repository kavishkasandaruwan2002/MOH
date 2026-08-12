import { Article } from '../models/Article.js';

export const getArticles = async (req, res) => {
  try {
    const articlesList = await Article.find().sort({ createdAt: -1 });
    return res.json({ count: articlesList.length, articles: articlesList });
  } catch (error) {
    return res.status(500).json({ message: "Error fetching articles", error: error.message });
  }
};

export const createArticle = async (req, res) => {
  try {
    const newArticle = new Article({
      id: req.body.id || `art-${Date.now()}`,
      title: req.body.title,
      category: req.body.category || 'General Health',
      readTime: req.body.readTime || '5 min read',
      author: req.body.author || 'MOH Medical Officer',
      summary: req.body.summary,
      content: req.body.content || req.body.summary,
      image: req.body.image || '',
      tags: req.body.tags || ['Health', 'MOH']
    });

    await newArticle.save();
    return res.status(201).json({ message: "Article created successfully", article: newArticle });
  } catch (error) {
    return res.status(500).json({ message: "Error creating article", error: error.message });
  }
};

export const updateArticle = async (req, res) => {
  try {
    const { id } = req.params;
    const updated = await Article.findOneAndUpdate(
      { $or: [{ id }, { _id: id.match(/^[0-9a-fA-F]{24}$/) ? id : null }] },
      { $set: req.body },
      { new: true }
    );
    if (!updated) return res.status(404).json({ message: "Article not found" });
    return res.json({ message: "Article updated successfully", article: updated });
  } catch (error) {
    return res.status(500).json({ message: "Error updating article", error: error.message });
  }
};

export const deleteArticle = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Article.findOneAndDelete({
      $or: [{ id }, { _id: id.match(/^[0-9a-fA-F]{24}$/) ? id : null }]
    });
    if (!deleted) return res.status(404).json({ message: "Article not found" });
    return res.json({ message: "Article deleted successfully", id });
  } catch (error) {
    return res.status(500).json({ message: "Error deleting article", error: error.message });
  }
};
