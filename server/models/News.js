import mongoose from 'mongoose';

const newsSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  date: { type: String, required: true },
  category: { type: String, required: true },
  summary: { type: String, required: true },
  content: { type: String, required: true },
  image: { type: String },
  important: { type: Boolean, default: false }
}, { timestamps: true });

export const News = mongoose.model('News', newsSchema);
export default News;
