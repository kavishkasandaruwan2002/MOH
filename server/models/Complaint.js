import mongoose from 'mongoose';

const complaintSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true }, // e.g. CMP-8841
  citizenName: { type: String, default: 'Anonymous Citizen' },
  phone: { type: String, default: '+94 77 000 0000' },
  nic: { type: String, default: 'N/A' },
  category: { type: String, required: true },
  locationName: { type: String, required: true },
  lat: { type: Number, required: true },
  lng: { type: Number, required: true },
  description: { type: String, required: true },
  photoUrl: { type: String },
  status: { type: String, enum: ['SUBMITTED', 'UNDER_INVESTIGATION', 'ACTION_TAKEN', 'RESOLVED'], default: 'SUBMITTED' },
  assignedPHI: { type: String, default: 'PHI - Nimal Bandara' },
  phiNotes: { type: String, default: 'Logged and queued for field inspection.' }
}, { timestamps: true });

export const Complaint = mongoose.model('Complaint', complaintSchema);
export default Complaint;
