import mongoose from 'mongoose';

const appointmentSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  referenceNumber: { type: String, required: true, unique: true },
  citizenName: { type: String, required: true },
  nic: { type: String, required: true },
  dob: { type: String },
  gender: { type: String, default: 'Other' },
  phone: { type: String, required: true },
  email: { type: String, default: 'N/A' },
  address: { type: String, default: '' },
  clinicId: { type: String, required: true },
  clinicName: { type: String, required: true },
  doctorId: { type: String, default: 'doc-any' },
  doctorName: { type: String, default: 'Available MOH Officer' },
  serviceCategory: { type: String, required: true },
  appointmentDate: { type: String, required: true },
  appointmentTime: { type: String, required: true },
  reasonForVisit: { type: String, default: 'General Medical Consultation' },
  additionalNotes: { type: String, default: '' },
  status: { type: String, enum: ['CONFIRMED', 'CANCELLED', 'COMPLETED'], default: 'CONFIRMED' },
  qrCodeToken: { type: String, required: true }
}, { timestamps: true });

export const Appointment = mongoose.model('Appointment', appointmentSchema);
export default Appointment;

