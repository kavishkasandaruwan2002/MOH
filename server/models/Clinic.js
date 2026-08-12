import mongoose from 'mongoose';

const clinicSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  division: { type: String, required: true },
  district: { type: String, required: true },
  address: { type: String, required: true },
  phone: { type: String },
  email: { type: String },
  lat: { type: Number, default: 6.9271 },
  lng: { type: Number, default: 79.8612 },
  day: { type: String },
  time: { type: String },
  type: { type: String },
  location: { type: String },
  venue: { type: String },
  doctor: { type: String },
  tag: { type: String },
  categories: [{ type: String }],
  doctors: [{ type: String }], // references doctor.id
  operatingHours: { type: String, default: "Mon-Sat: 8:00 AM - 4:00 PM" },
  capacityPerSlot: { type: Number, default: 15 }
}, { timestamps: true });

export const Clinic = mongoose.model('Clinic', clinicSchema);
export default Clinic;
