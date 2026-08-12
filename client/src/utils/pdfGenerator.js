import jsPDF from 'jspdf';

// ----------------------------------------------------------------------
// HELPER: Draw Official MOH Header Banner
// ----------------------------------------------------------------------
const drawMOHHeader = (doc, title, docRef = '') => {
  // Top Banner Accent (Primary MOH Green #2E7D6B)
  doc.setFillColor(46, 125, 107);
  doc.rect(0, 0, 210, 36, 'F');

  // Gold Divider Line (#F59E0B)
  doc.setFillColor(245, 158, 11);
  doc.rect(0, 36, 210, 2.5, 'F');

  // Header Title
  doc.setTextColor(255, 255, 255);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(13);
  doc.text("MINISTRY OF HEALTH SRI LANKA", 14, 14);

  doc.setFontSize(9);
  doc.setFont("helvetica", "normal");
  doc.text("OFFICIAL PUBLIC HEALTH PORTAL • MOH BUTTALA DIVISION", 14, 21);

  doc.setFontSize(8);
  doc.setTextColor(204, 251, 241);
  doc.text(`DOC REF: ${docRef || `MOH-SL-${Math.floor(100000 + Math.random() * 900000)}`}`, 14, 29);
  doc.text(`DATE: ${new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}`, 155, 29);

  // Sub-header Title Box
  doc.setFillColor(248, 250, 252);
  doc.rect(14, 43, 182, 15, 'F');
  doc.setDrawColor(203, 213, 225);
  doc.rect(14, 43, 182, 15, 'S');

  doc.setFont("helvetica", "bold");
  doc.setFontSize(11);
  doc.setTextColor(15, 23, 42);
  doc.text(title.toUpperCase(), 20, 53);
};

// ----------------------------------------------------------------------
// HELPER: Draw Official Footer
// ----------------------------------------------------------------------
const drawMOHFooter = (doc) => {
  const pageHeight = doc.internal.pageSize.height || 297;
  
  doc.setDrawColor(226, 232, 240);
  doc.line(14, pageHeight - 22, 196, pageHeight - 22);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(8);
  doc.setTextColor(100, 116, 139);
  doc.text("Office of Medical Officer of Health (MOH), Main Road, Buttala, Monaragala District, Sri Lanka.", 14, pageHeight - 15);
  doc.text("Hotline: +94 55 227 3888 | Emergency: 1990 | Web: moh-buttala.gov.lk", 14, pageHeight - 10);

  doc.setFont("helvetica", "bold");
  doc.setTextColor(46, 125, 107);
  doc.text("OFFICIAL GOVERNMENT DOCUMENT ✓", 140, pageHeight - 10);
};

// ----------------------------------------------------------------------
// 1. GENERATE APPOINTMENT PASS PDF
// ----------------------------------------------------------------------
export const generateAppointmentPDF = (apt) => {
  if (!apt) return;
  const doc = new jsPDF();

  const refNo = apt.referenceNumber || apt.id || `APT-${Date.now().toString().slice(-6)}`;
  drawMOHHeader(doc, "Official Clinical Appointment Pass", refNo);

  let y = 68;

  // Status Badge Box
  doc.setFillColor(240, 253, 244);
  doc.rect(14, y, 182, 12, 'F');
  doc.setDrawColor(187, 247, 208);
  doc.rect(14, y, 182, 12, 'S');

  doc.setFont("helvetica", "bold");
  doc.setFontSize(9);
  doc.setTextColor(22, 101, 52);
  doc.text(`CONFIRMED APPOINTMENT PASS • TOKEN REF: #${refNo}`, 20, y + 8);
  y += 18;

  // Patient & Clinic Detail Grid
  const details = [
    { label: "Patient Full Name:", value: apt.citizenName || apt.name || "N/A" },
    { label: "NIC / Registration ID:", value: apt.nic || "N/A" },
    { label: "Phone Contact:", value: apt.phone || "+94 77 000 0000" },
    { label: "Assigned MOH Clinic:", value: apt.clinicName || "Central MOH Clinic Buttala" },
    { label: "Consultant / Medical Officer:", value: apt.doctorName || "Dr. K. M. Wickramasinghe" },
    { label: "Service Category:", value: apt.serviceCategory || "General Health Screening" },
    { label: "Appointment Date & Time:", value: `${apt.appointmentDate || 'Upcoming'} @ ${apt.appointmentTime || '09:00 AM'}` },
    { label: "Clinic Location / Room:", value: apt.location || "Central MOH Clinic - Room 02 (Triage)" }
  ];

  details.forEach((item, index) => {
    // Alternating row background
    if (index % 2 === 0) {
      doc.setFillColor(248, 250, 252);
      doc.rect(14, y, 182, 10, 'F');
    }
    doc.setDrawColor(241, 245, 249);
    doc.rect(14, y, 182, 10, 'S');

    doc.setFont("helvetica", "bold");
    doc.setFontSize(9);
    doc.setTextColor(71, 85, 105);
    doc.text(item.label, 20, y + 6.5);

    doc.setFont("helvetica", "normal");
    doc.setTextColor(15, 23, 42);
    doc.text(item.value, 80, y + 6.5);

    y += 10;
  });

  y += 8;

  // Verification QR Box Representation
  doc.setFillColor(241, 245, 249);
  doc.rect(14, y, 50, 45, 'F');
  doc.setDrawColor(203, 213, 225);
  doc.rect(14, y, 50, 45, 'S');

  // Simulated QR Code Inner Graphic Lines
  doc.setDrawColor(15, 23, 42);
  doc.rect(18, y + 4, 12, 12, 'S');
  doc.rect(48, y + 4, 12, 12, 'S');
  doc.rect(18, y + 28, 12, 12, 'S');
  doc.setFontSize(7);
  doc.setFont("helvetica", "bold");
  doc.text("TRIAGE QR", 22, y + 43);

  // Instructions Panel
  doc.setFillColor(254, 243, 199);
  doc.rect(70, y, 126, 45, 'F');
  doc.setDrawColor(252, 211, 77);
  doc.rect(70, y, 126, 45, 'S');

  doc.setFont("helvetica", "bold");
  doc.setFontSize(9);
  doc.setTextColor(146, 64, 14);
  doc.text("IMPORTANT CLINIC INSTRUCTIONS:", 75, y + 8);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(8);
  doc.setTextColor(120, 53, 15);
  doc.text("1. Please present this printed pass or digital QR code at triage counter.", 75, y + 16);
  doc.text("2. Arrive 15 minutes prior to scheduled appointment time.", 75, y + 23);
  doc.text("3. Bring your National Identity Card (NIC) & previous medical record books.", 75, y + 30);
  doc.text("4. Fasting may be required for blood sugar & cholesterol screenings.", 75, y + 37);

  drawMOHFooter(doc);
  doc.save(`MOH_Appointment_Pass_${refNo}.pdf`);
};

// ----------------------------------------------------------------------
// 2. GENERATE WEEKLY CLINIC SCHEDULE PDF
// ----------------------------------------------------------------------
export const generateClinicSchedulePDF = (schedules) => {
  const doc = new jsPDF();
  drawMOHHeader(doc, "Official Weekly Clinic Schedule & Timetable", "MOH-SCHED-2026");

  let y = 68;

  // Table Headers
  doc.setFillColor(46, 125, 107);
  doc.rect(14, y, 182, 10, 'F');

  doc.setFont("helvetica", "bold");
  doc.setFontSize(8);
  doc.setTextColor(255, 255, 255);
  doc.text("DAY", 18, y + 6.5);
  doc.text("TIME", 45, y + 6.5);
  doc.text("CLINIC SERVICE", 85, y + 6.5);
  doc.text("LOCATION / VENUE", 145, y + 6.5);

  y += 10;

  const defaultList = [
    { day: 'Monday', time: '8:30 AM - 12:30 PM', type: 'Ante-natal & Maternal Clinic', location: 'MOH Central Clinic' },
    { day: 'Tuesday', time: '9:00 AM - 1:00 PM', type: 'Infant & Child Immunization', location: 'Pelwatte Sub-center' },
    { day: 'Wednesday', time: '8:30 AM - 12:00 PM', type: 'Well Woman & Screening', location: 'MOH Central Clinic' },
    { day: 'Thursday', time: '9:00 AM - 1:30 PM', type: 'NCD & Diabetes Screening', location: 'Kukurampola Center' },
    { day: 'Friday', time: '8:30 AM - 12:00 PM', type: 'Dental & Oral Health Unit', location: 'MOH Dental Unit' },
    { day: 'Saturday', time: '9:00 AM - 1:00 PM', type: 'Family Planning Advisory', location: 'MOH Central Clinic' }
  ];

  const dataList = (schedules && schedules.length > 0) ? schedules : defaultList;

  dataList.forEach((item, idx) => {
    if (idx % 2 === 0) {
      doc.setFillColor(248, 250, 252);
      doc.rect(14, y, 182, 11, 'F');
    }
    doc.setDrawColor(226, 232, 240);
    doc.rect(14, y, 182, 11, 'S');

    doc.setFont("helvetica", "bold");
    doc.setFontSize(8);
    doc.setTextColor(15, 23, 42);
    doc.text(item.day || '', 18, y + 7);

    doc.setFont("helvetica", "normal");
    doc.setTextColor(71, 85, 105);
    doc.text(item.time || item.operatingHours || '', 45, y + 7);

    doc.setFont("helvetica", "bold");
    doc.setTextColor(46, 125, 107);
    doc.text(item.type || item.name || '', 85, y + 7);

    doc.setFont("helvetica", "normal");
    doc.setTextColor(51, 65, 85);
    doc.text(item.location || item.venue || 'Central MOH', 145, y + 7);

    y += 11;
  });

  y += 12;

  // Note Box
  doc.setFillColor(241, 245, 249);
  doc.rect(14, y, 182, 28, 'F');
  doc.setDrawColor(203, 213, 225);
  doc.rect(14, y, 182, 28, 'S');

  doc.setFont("helvetica", "bold");
  doc.setFontSize(9);
  doc.setTextColor(15, 23, 42);
  doc.text("GENERAL CLINIC INFORMATION & ADVISORY:", 20, y + 8);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(8);
  doc.setTextColor(71, 85, 105);
  doc.text("• All clinics are free of charge under the Ministry of Health Sri Lanka.", 20, y + 15);
  doc.text("• Please register early at the triage counter before clinic start time.", 20, y + 21);

  drawMOHFooter(doc);
  doc.save("MOH_Buttala_Official_Clinic_Schedule_2026.pdf");
};

// ----------------------------------------------------------------------
// 3. GENERATE PUBLIC HEALTH FORM TEMPLATE PDF
// ----------------------------------------------------------------------
export const generateFormDocumentPDF = (formItem) => {
  const doc = new jsPDF();
  const title = formItem?.title || "Official MOH Health Form Template";
  drawMOHHeader(doc, title, `FORM-H-${Math.floor(100 + Math.random() * 900)}`);

  let y = 68;

  // Metadata Box
  doc.setFillColor(248, 250, 252);
  doc.rect(14, y, 182, 20, 'F');
  doc.setDrawColor(226, 232, 240);
  doc.rect(14, y, 182, 20, 'S');

  doc.setFont("helvetica", "bold");
  doc.setFontSize(8.5);
  doc.setTextColor(71, 85, 105);
  doc.text("Form Category:", 20, y + 8);
  doc.text("Document Type:", 20, y + 15);
  doc.text("Issuing Division:", 110, y + 8);
  doc.text("Authorization:", 110, y + 15);

  doc.setFont("helvetica", "normal");
  doc.setTextColor(15, 23, 42);
  doc.text(formItem?.category || "Public Health", 50, y + 8);
  doc.text("Official PDF Template", 50, y + 15);
  doc.text("MOH Buttala Division", 140, y + 8);
  doc.text("Director General Health Services", 140, y + 15);

  y += 28;

  // Section 1: Applicant Details Checklist
  doc.setFont("helvetica", "bold");
  doc.setFontSize(10);
  doc.setTextColor(46, 125, 107);
  doc.text("SECTION A: APPLICANT / PREMISES INFORMATION", 14, y);
  y += 4;
  doc.setDrawColor(46, 125, 107);
  doc.line(14, y, 196, y);
  y += 8;

  const fields = [
    "1. Full Name of Applicant / Business Owner: ________________________________________________",
    "2. National Identity Card (NIC) / Passport No: ____________________________________________",
    "3. Permanent Address / Premises Location: _______________________________________________",
    "4. Contact Telephone / Mobile Number: __________________________________________________",
    "5. PHM Division / Grama Niladhari Area: __________________________________________________"
  ];

  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.setTextColor(30, 41, 59);

  fields.forEach((f) => {
    doc.text(f, 14, y);
    y += 9;
  });

  y += 6;

  // Section 2: Inspection Checklist Boxes
  doc.setFont("helvetica", "bold");
  doc.setFontSize(10);
  doc.setTextColor(46, 125, 107);
  doc.text("SECTION B: PUBLIC HEALTH & HYGIENE EVALUATION CHECKLIST", 14, y);
  y += 4;
  doc.line(14, y, 196, y);
  y += 8;

  const checklistItems = [
    "Water source safety and well chlorination compliance",
    "Mosquito vector breeding site elimination and drainage check",
    "Food handler medical fitness certificates and hygiene standards",
    "Waste disposal and sanitary facility management"
  ];

  checklistItems.forEach((item) => {
    doc.setDrawColor(100, 116, 139);
    doc.rect(14, y - 4, 4, 4, 'S'); // Checkbox

    doc.setFont("helvetica", "normal");
    doc.setFontSize(8.5);
    doc.setTextColor(51, 65, 85);
    doc.text(`[   ]   ${item}`, 22, y);
    y += 8;
  });

  y += 15;

  // Signature Block
  doc.setDrawColor(203, 213, 225);
  doc.line(14, y + 15, 80, y + 15);
  doc.line(120, y + 15, 190, y + 15);

  doc.setFont("helvetica", "bold");
  doc.setFontSize(8);
  doc.setTextColor(71, 85, 105);
  doc.text("Signature of Applicant", 14, y + 20);
  doc.text("Public Health Inspector (PHI) Signature & Seal", 120, y + 20);

  drawMOHFooter(doc);
  doc.save(`MOH_${title.replace(/[^a-zA-Z0-9]/g, "_")}.pdf`);
};
