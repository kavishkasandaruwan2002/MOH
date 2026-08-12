import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true, lowercase: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['ADMIN', 'DOCTOR', 'STAFF', 'PHI', 'CITIZEN'], default: 'CITIZEN' },
  nic: { type: String, required: true, unique: true },
  phone: { type: String },
  division: { type: String, default: 'Buttala' },
  avatar: { type: String },
  bio: { type: String },
  specialty: { type: String },
  qualifications: { type: String }
}, { timestamps: true });

export const User = mongoose.model('User', userSchema);
export default User;
