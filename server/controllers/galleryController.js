import { Gallery } from '../models/Gallery.js';

export const getGallery = async (req, res) => {
  try {
    const galleryItems = await Gallery.find().sort({ createdAt: -1 });
    return res.json({ count: galleryItems.length, gallery: galleryItems });
  } catch (error) {
    return res.status(500).json({ message: "Error fetching gallery items", error: error.message });
  }
};

export const createGalleryItem = async (req, res) => {
  try {
    const newItem = new Gallery({
      id: req.body.id || `gal-${Date.now()}`,
      title: req.body.title,
      category: req.body.category || 'Facilities',
      url: req.body.url || '/moh_buttala_building.png',
      desc: req.body.desc || req.body.summary || ''
    });

    await newItem.save();
    return res.status(201).json({ message: "Gallery photo added successfully", item: newItem });
  } catch (error) {
    return res.status(500).json({ message: "Error adding gallery photo", error: error.message });
  }
};

export const updateGalleryItem = async (req, res) => {
  try {
    const { id } = req.params;
    const updated = await Gallery.findOneAndUpdate(
      { $or: [{ id }, { _id: id.match(/^[0-9a-fA-F]{24}$/) ? id : null }] },
      { $set: req.body },
      { new: true }
    );

    if (!updated) return res.status(404).json({ message: "Gallery photo not found" });
    return res.json({ message: "Gallery photo updated successfully", item: updated });
  } catch (error) {
    return res.status(500).json({ message: "Error updating gallery photo", error: error.message });
  }
};

export const deleteGalleryItem = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Gallery.findOneAndDelete({
      $or: [{ id }, { _id: id.match(/^[0-9a-fA-F]{24}$/) ? id : null }]
    });

    if (!deleted) return res.status(404).json({ message: "Gallery photo not found" });
    return res.json({ message: "Gallery photo deleted successfully", id });
  } catch (error) {
    return res.status(500).json({ message: "Error deleting gallery photo", error: error.message });
  }
};
