import mongoose from 'mongoose';

const gallerySchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  category: { type: String, default: 'Facilities' },
  url: { type: String, required: true },
  desc: { type: String, default: '' }
}, { timestamps: true });

export const Gallery = mongoose.model('Gallery', gallerySchema);
export default Gallery;
