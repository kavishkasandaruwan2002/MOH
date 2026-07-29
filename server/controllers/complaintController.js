import { Complaint } from '../models/Complaint.js';

export const getComplaints = async (req, res) => {
  try {
    const { trackingId, category, status } = req.query;
    let query = {};

    if (trackingId) {
      query.id = { $regex: trackingId, $options: 'i' };
    }

    if (category && category !== 'All') {
      query.category = category;
    }

    if (status && status !== 'All') {
      query.status = status;
    }

    const complaintsList = await Complaint.find(query).sort({ createdAt: -1 });
    return res.json({ count: complaintsList.length, complaints: complaintsList });
  } catch (error) {
    return res.status(500).json({ message: "Error fetching complaints", error: error.message });
  }
};

export const submitComplaint = async (req, res) => {
  try {
    const { citizenName, phone, nic, category, locationName, lat, lng, description, photoUrl } = req.body;

    if (!category || !locationName || !description) {
      return res.status(400).json({ message: "Category, location, and description are required" });
    }

    const trackingId = `CMP-${Math.floor(8000 + Math.random() * 2000)}`;

    const newComplaint = new Complaint({
      id: trackingId,
      citizenName: citizenName || 'Anonymous Citizen',
      phone: phone || '+94 77 000 0000',
      nic: nic || 'N/A',
      category,
      locationName,
      lat: parseFloat(lat) || 6.9271,
      lng: parseFloat(lng) || 79.8612,
      description,
      photoUrl: photoUrl || 'https://images.unsplash.com/photo-1584467735871-8e85353a8413?auto=format&fit=crop&w=600&q=80',
      status: 'SUBMITTED',
      assignedPHI: 'PHI - Nimal Bandara',
      phiNotes: 'Logged and queued for field inspection.'
    });

    await newComplaint.save();

    return res.status(201).json({
      message: "Complaint submitted successfully",
      trackingId: newComplaint.id,
      complaint: newComplaint
    });
  } catch (error) {
    return res.status(500).json({ message: "Error submitting complaint", error: error.message });
  }
};

export const updateComplaintStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, phiNotes, assignedPHI } = req.body;

    const cmp = await Complaint.findOne({ id });
    if (!cmp) {
      return res.status(404).json({ message: "Complaint not found" });
    }

    if (status) cmp.status = status;
    if (phiNotes) cmp.phiNotes = phiNotes;
    if (assignedPHI) cmp.assignedPHI = assignedPHI;

    await cmp.save();

    return res.json({ message: "Complaint updated successfully", complaint: cmp });
  } catch (error) {
    return res.status(500).json({ message: "Error updating complaint", error: error.message });
  }
};
