import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true, lowercase: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['ADMIN', 'STAFF', 'PHI', 'CITIZEN'], default: 'CITIZEN' },
  nic: { type: String, required: true, unique: true },
  phone: { type: String },
  division: { type: String, default: 'Colombo Central' }
}, { timestamps: true });

export const User = mongoose.model('User', userSchema);
export default User;
