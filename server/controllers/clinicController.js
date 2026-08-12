import { Clinic } from '../models/Clinic.js';
import { Doctor } from '../models/Doctor.js';

export const getClinics = async (req, res) => {
  try {
    const { division, search, category } = req.query;
    let query = {};

    if (division && division !== 'All') {
      query.division = { $regex: division, $options: 'i' };
    }

    if (category && category !== 'All') {
      query.categories = category;
    }

    if (search) {
      const regexSearch = { $regex: search, $options: 'i' };
      query.$or = [
        { name: regexSearch },
        { address: regexSearch },
        { district: regexSearch }
      ];
    }

    const clinicsList = await Clinic.find(query).sort({ createdAt: -1 });
    return res.json({ count: clinicsList.length, clinics: clinicsList });
  } catch (error) {
    return res.status(500).json({ message: "Error fetching clinics", error: error.message });
  }
};

export const getDoctors = async (req, res) => {
  try {
    const { division, specialty } = req.query;
    let query = {};

    if (division && division !== 'All') {
      query.division = { $regex: division, $options: 'i' };
    }

    if (specialty && specialty !== 'All') {
      query.specialty = { $regex: specialty, $options: 'i' };
    }

    const doctorsList = await Doctor.find(query);
    return res.json({ doctors: doctorsList });
  } catch (error) {
    return res.status(500).json({ message: "Error fetching doctors", error: error.message });
  }
};

export const createClinic = async (req, res) => {
  try {
    const newClinic = new Clinic({
      id: req.body.id || `cl-${Date.now()}`,
      ...req.body,
      operatingHours: req.body.operatingHours || "Mon-Sat: 8:00 AM - 4:00 PM",
      capacityPerSlot: req.body.capacityPerSlot || 15
    });

    await newClinic.save();
    return res.status(201).json({ message: "Clinic created successfully", clinic: newClinic });
  } catch (error) {
    return res.status(500).json({ message: "Error creating clinic", error: error.message });
  }
};

export const updateClinic = async (req, res) => {
  try {
    const { id } = req.params;
    const updated = await Clinic.findOneAndUpdate(
      { $or: [{ id }, { _id: id.match(/^[0-9a-fA-F]{24}$/) ? id : null }] },
      { $set: req.body },
      { new: true }
    );
    if (!updated) return res.status(404).json({ message: "Clinic not found" });
    return res.json({ message: "Clinic updated successfully", clinic: updated });
  } catch (error) {
    return res.status(500).json({ message: "Error updating clinic", error: error.message });
  }
};

export const deleteClinic = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Clinic.findOneAndDelete({
      $or: [{ id }, { _id: id.match(/^[0-9a-fA-F]{24}$/) ? id : null }]
    });
    if (!deleted) return res.status(404).json({ message: "Clinic not found" });
    return res.json({ message: "Clinic deleted successfully", id });
  } catch (error) {
    return res.status(500).json({ message: "Error deleting clinic", error: error.message });
  }
};

export const createDoctor = async (req, res) => {
  try {
    const newDoctor = new Doctor({
      id: req.body.id || `doc-${Date.now()}`,
      name: req.body.name,
      specialty: req.body.specialty || req.body.role || "Medical Officer",
      qualifications: req.body.qualifications || "",
      experience: req.body.experience || "5 years",
      division: req.body.division || "Buttala",
      availableDays: req.body.availableDays || ["Monday", "Wednesday", "Friday"],
      timeSlots: req.body.timeSlots || ["09:00 AM", "11:00 AM", "02:00 PM"],
      bio: req.body.bio || "",
      image: req.body.image || ""
    });

    await newDoctor.save();
    return res.status(201).json({ message: "Doctor/Officer created successfully", doctor: newDoctor });
  } catch (error) {
    return res.status(500).json({ message: "Error creating doctor", error: error.message });
  }
};

export const updateDoctor = async (req, res) => {
  try {
    const { id } = req.params;
    const updated = await Doctor.findOneAndUpdate(
      { $or: [{ id }, { _id: id.match(/^[0-9a-fA-F]{24}$/) ? id : null }] },
      { $set: req.body },
      { new: true }
    );
    if (!updated) return res.status(404).json({ message: "Doctor/Officer not found" });
    return res.json({ message: "Doctor/Officer updated successfully", doctor: updated });
  } catch (error) {
    return res.status(500).json({ message: "Error updating doctor", error: error.message });
  }
};

export const deleteDoctor = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Doctor.findOneAndDelete({
      $or: [{ id }, { _id: id.match(/^[0-9a-fA-F]{24}$/) ? id : null }]
    });
    if (!deleted) return res.status(404).json({ message: "Doctor/Officer not found" });
    return res.json({ message: "Doctor/Officer deleted successfully", id });
  } catch (error) {
    return res.status(500).json({ message: "Error deleting doctor", error: error.message });
  }
};
