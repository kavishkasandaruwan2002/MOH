import mongoose from 'mongoose';

const doctorSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  role: { type: String },
  specialty: { type: String, required: true },
  qualifications: { type: String },
  experience: { type: String },
  division: { type: String, required: true },
  image: { type: String },
  bio: { type: String },
  availableDays: [{ type: String }],
  timeSlots: [{ type: String }]
}, { timestamps: true });

export const Doctor = mongoose.model('Doctor', doctorSchema);
export default Doctor;
