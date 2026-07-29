import { Appointment } from '../models/Appointment.js';

export const getAppointments = async (req, res) => {
  try {
    const { nic, status, refNumber } = req.query;
    let query = {};

    if (refNumber) {
      query.$or = [{ referenceNumber: refNumber }, { id: refNumber }];
    }

    if (nic) {
      query.nic = nic;
    }

    if (status) {
      query.status = status;
    }

    const appointmentsList = await Appointment.find(query).sort({ createdAt: -1 });
    return res.json({ count: appointmentsList.length, appointments: appointmentsList });
  } catch (error) {
    return res.status(500).json({ message: "Error fetching appointments", error: error.message });
  }
};

export const lookupAppointmentStatus = async (req, res) => {
  try {
    const { refNumber, nic } = req.query;

    if (!refNumber || !nic) {
      return res.status(400).json({ message: "Reference number (or Ticket ID) and NIC/Passport are required" });
    }

    const appointment = await Appointment.findOne({
      $and: [
        { $or: [{ referenceNumber: refNumber }, { id: refNumber }] },
        { nic: nic.trim() }
      ]
    });

    if (!appointment) {
      return res.status(404).json({ message: "No matching appointment record found for the provided details." });
    }

    return res.json({
      message: "Appointment details retrieved successfully",
      appointment
    });
  } catch (error) {
    return res.status(500).json({ message: "Error looking up appointment status", error: error.message });
  }
};

export const createAppointment = async (req, res) => {
  try {
    const { 
      citizenName, nic, dob, gender, phone, email, address,
      clinicId, clinicName, doctorId, doctorName, 
      serviceCategory, appointmentDate, appointmentTime,
      reasonForVisit, additionalNotes
    } = req.body;

    if (!citizenName || !nic || !clinicId || !appointmentDate || !appointmentTime) {
      return res.status(400).json({ message: "Missing required booking details (Name, NIC, Clinic, Date, Time)" });
    }

    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const refNum = `REF-2026-${randomSuffix}`;
    const randomId = `APT-2026-${randomSuffix}`;
    const qrToken = `MOH-SL-APT-${refNum}-SECURE-${Math.floor(1000 + Math.random() * 9000)}`;

    const newAppointment = new Appointment({
      id: randomId,
      referenceNumber: refNum,
      citizenName,
      nic,
      dob: dob || '',
      gender: gender || 'Other',
      phone,
      email: email || 'N/A',
      address: address || '',
      clinicId,
      clinicName: clinicName || 'Colombo Central MOH Primary Care',
      doctorId: doctorId || 'doc-101',
      doctorName: doctorName || 'Dr. K. L. Perera',
      serviceCategory: serviceCategory || 'General Outpatient Consultation',
      appointmentDate,
      appointmentTime,
      reasonForVisit: reasonForVisit || 'General Medical Consultation',
      additionalNotes: additionalNotes || '',
      status: 'CONFIRMED',
      qrCodeToken: qrToken
    });

    await newAppointment.save();

    return res.status(201).json({
      message: "Appointment booked successfully! Unique reference generated.",
      referenceNumber: refNum,
      appointment: newAppointment
    });
  } catch (error) {
    return res.status(500).json({ message: "Error creating appointment", error: error.message });
  }
};

export const updateAppointmentStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const apt = await Appointment.findOne({ $or: [{ id }, { referenceNumber: id }] });
    if (!apt) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    apt.status = status || apt.status;
    await apt.save();

    return res.json({ message: "Appointment status updated", appointment: apt });
  } catch (error) {
    return res.status(500).json({ message: "Error updating appointment status", error: error.message });
  }
};

export const cancelAppointment = async (req, res) => {
  try {
    const { id } = req.params;
    const apt = await Appointment.findOne({ $or: [{ id }, { referenceNumber: id }] });
    if (!apt) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    apt.status = 'CANCELLED';
    await apt.save();
    
    return res.json({ message: "Appointment cancelled successfully", appointment: apt });
  } catch (error) {
    return res.status(500).json({ message: "Error cancelling appointment", error: error.message });
  }
};

