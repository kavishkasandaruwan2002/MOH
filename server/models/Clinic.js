import mongoose from 'mongoose';

const clinicSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  division: { type: String, required: true },
  district: { type: String, required: true },
  address: { type: String, required: true },
  phone: { type: String },
  email: { type: String },
  lat: { type: Number, required: true },
  lng: { type: Number, required: true },
  categories: [{ type: String }],
  doctors: [{ type: String }], // references doctor.id
  operatingHours: { type: String, default: "Mon-Sat: 8:00 AM - 4:00 PM" },
  capacityPerSlot: { type: Number, default: 15 }
}, { timestamps: true });

export const Clinic = mongoose.model('Clinic', clinicSchema);
export default Clinic;
