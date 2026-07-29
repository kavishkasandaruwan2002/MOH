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
      id: `cl-${Date.now()}`,
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
