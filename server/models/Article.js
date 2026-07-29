import mongoose from 'mongoose';

const articleSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  category: { type: String, required: true },
  readTime: { type: String },
  author: { type: String },
  summary: { type: String, required: true },
  content: { type: String, required: true },
  image: { type: String },
  tags: [{ type: String }]
}, { timestamps: true });

export const Article = mongoose.model('Article', articleSchema);
export default Article;
