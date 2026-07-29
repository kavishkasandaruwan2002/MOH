import mongoose from 'mongoose';

const alertSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  location: { type: String, required: true },
  district: { type: String, required: true },
  lat: { type: Number, required: true },
  lng: { type: Number, required: true },
  riskLevel: { type: String, enum: ['HIGH', 'MEDIUM', 'LOW'], default: 'LOW' },
  dengueCasesThisMonth: { type: Number, default: 0 },
  breedingIndex: { type: Number, default: 0.0 },
  status: { type: String },
  lastInspected: { type: String }
}, { timestamps: true });

export const Alert = mongoose.model('Alert', alertSchema);
export default Alert;
