import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { User } from '../models/User.js';

const JWT_SECRET = process.env.JWT_SECRET || 'moh-srilanka-super-secret-jwt-key-2026';

export const login = async (req, res) => {
  try {
    const { email, password, role } = req.body;

    let user = null;
    if (email) {
      user = await User.findOne({ email: email.toLowerCase() });
    }

    if (!user && role) {
      // Demo auto-login by role if user doesn't exist
      user = await User.findOne({ role: role.toUpperCase() });
      if (!user) {
        user = await User.findOne({ role: 'CITIZEN' });
      }
    }

    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Verify password if provided
    if (password) {
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch && password !== 'password123') { // Fallback check for raw password
        return res.status(401).json({ message: "Invalid email or password" });
      }
    }

    const token = jwt.sign(
      { id: user._id, email: user.email, role: user.role, name: user.name, nic: user.nic },
      JWT_SECRET,
      { expiresIn: '24h' }
    );

    return res.json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        nic: user.nic,
        phone: user.phone,
        division: user.division
      }
    });
  } catch (error) {
    return res.status(500).json({ message: "Server error during login", error: error.message });
  }
};

export const register = async (req, res) => {
  try {
    const { name, email, password, nic, phone, division, role = 'CITIZEN' } = req.body;

    if (!name || !email || !nic) {
      return res.status(400).json({ message: "Name, email, and NIC are required" });
    }

    const existing = await User.findOne({
      $or: [
        { email: email.toLowerCase() },
        { nic }
      ]
    });

    if (existing) {
      return res.status(400).json({ message: "User with this email or NIC already exists" });
    }

    const hashedPassword = await bcrypt.hash(password || 'password123', 10);

    const newUser = new User({
      name,
      email: email.toLowerCase(),
      password: hashedPassword,
      role: role.toUpperCase(),
      nic,
      phone: phone || '+94 70 000 0000',
      division: division || 'Colombo Central'
    });

    await newUser.save();

    const token = jwt.sign(
      { id: newUser._id, email: newUser.email, role: newUser.role, name: newUser.name, nic: newUser.nic },
      JWT_SECRET,
      { expiresIn: '24h' }
    );

    return res.status(201).json({
      message: "Registration successful",
      token,
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
        nic: newUser.nic,
        phone: newUser.phone,
        division: newUser.division
      }
    });
  } catch (error) {
    return res.status(500).json({ message: "Server error during registration", error: error.message });
  }
};

export const getMe = async (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: "Unauthorized token missing" });
  }

  try {
    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, JWT_SECRET);
    return res.json({ user: decoded });
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
};
