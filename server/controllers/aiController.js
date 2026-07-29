// Smart AI Health Assistant & Symptom Evaluator Engine for MOH Sri Lanka

export const handleAIChat = (req, res) => {
  const { message, lang = 'en' } = req.body;
  if (!message) {
    return res.status(400).json({ error: "Message prompt is required" });
  }

  const query = message.toLowerCase();

  let reply = "";
  let triageLevel = "INFO"; // INFO, LOW, MODERATE, HIGH, CRITICAL
  let recommendedAction = "";

  // Dengue Check
  if (query.includes('dengue') || query.includes('fever') || query.includes('kavaya') || query.includes('kabal')) {
    if (query.includes('bleeding') || query.includes('vomiting') || query.includes('severe pain') || query.includes('stomach')) {
      reply = "CRITICAL WARNING: The symptoms described (high fever accompanied by abdominal pain, bleeding gums, or persistent vomiting) match Dengue Hemorrhagic Fever warning signs. Please do NOT take aspirin or ibuprofen (take paracetamol only) and proceed immediately to the nearest MOH hospital or Suwa Seriya (1990) ambulance service.";
      triageLevel = "CRITICAL";
      recommendedAction = "Call 1990 or visit Nearest Emergency Room";
    } else {
      reply = "Dengue is widespread during monsoon seasons in Sri Lanka. If you have fever lasting more than 48 hours, get a Full Blood Count (FBC) done at your nearest MOH clinic or laboratory. Drink plenty of ORS, coconut water, and soup. Avoid dark food/drinks so bleeding isn't masked.";
      triageLevel = "MODERATE";
      recommendedAction = "Schedule FBC blood test at MOH Clinic";
    }
  } 
  // Rabies & Animal Bite
  else if (query.includes('bite') || query.includes('dog') || query.includes('cat') || query.includes('rabies')) {
    reply = "URGENT RABIES FIRST AID: 1. Immediately wash the wound under running tap water with soap for at least 15 minutes. 2. Do not apply home remedies or bandage tightly. 3. Visit your nearest MOH Rabies Vaccine Clinic within 24 hours to receive Anti-Rabies Vaccination (ARV).";
    triageLevel = "HIGH";
    recommendedAction = "Visit Rabies Vaccine Center immediately";
  }
  // Vaccine Schedule Inquiry
  else if (query.includes('vaccine') || query.includes('immunization') || query.includes('bcg') || query.includes('mmr') || query.includes('baby')) {
    reply = "Sri Lanka's National Immunization Program provides free vaccines at all MOH clinics: BCG (Birth), Pentavalent & OPV (2, 4, 6 months), MMR 1 (9 months), Live JE (12 months), DTP & MMR 2 (18 months), and DT (5 years). You can use our digital Vaccination Portal on this website to view and download your child's digital immunization card.";
    triageLevel = "INFO";
    recommendedAction = "Open Vaccination Portal";
  }
  // Mosquito & Waste Complaints
  else if (query.includes('mosquito') || query.includes('garbage') || query.includes('water') || query.includes('report') || query.includes('complaint')) {
    reply = "You can submit an official environmental complaint directly to your local Public Health Inspector (PHI) using our Complaint Portal. Simply snap a photo, share your GPS location, and our PHI team will conduct an inspection within 48 hours.";
    triageLevel = "INFO";
    recommendedAction = "File PHI Complaint";
  }
  // Appointment Inquiry
  else if (query.includes('appointment') || query.includes('book') || query.includes('doctor') || query.includes('clinic')) {
    reply = "You can book MOH clinic consultations online! Select your division, doctor, and date slot to receive a digital QR pass ticket instantly for zero-wait check-ins.";
    triageLevel = "INFO";
    recommendedAction = "Go to Appointment Booking";
  }
  // General Fallback
  else {
    reply = `Thank you for reaching out to the MOH Sri Lanka Smart Health AI Assistant. I can assist you with Dengue symptom triage, vaccination schedules, appointment booking, environmental complaint filing, and emergency contacts. How can I help you today?`;
    triageLevel = "INFO";
    recommendedAction = "Explore MOH Health Services";
  }

  return res.json({
    reply,
    triageLevel,
    recommendedAction,
    timestamp: new Date().toISOString()
  });
};

export const evaluateSymptoms = (req, res) => {
  const { feverDays, temperature, symptoms = [], age, district } = req.body;

  let riskScore = 0;
  let summary = "";
  let nextSteps = [];

  if (feverDays >= 2) riskScore += 30;
  if (temperature >= 38.5) riskScore += 25;
  if (symptoms.includes('Severe Headache / Eye Pain')) riskScore += 15;
  if (symptoms.includes('Muscle / Joint Pain')) riskScore += 15;
  if (symptoms.includes('Abdominal Pain / Vomiting')) riskScore += 40;
  if (symptoms.includes('Bleeding Gums / Skin Rash')) riskScore += 50;

  let riskCategory = "LOW";
  if (riskScore >= 70) {
    riskCategory = "HIGH RISK - POSSIBLE DENGUE HEMORRHAGIC FEVER";
    summary = "High probability of severe viral infection requiring emergency medical monitoring.";
    nextSteps = [
      "Obtain an immediate Full Blood Count (FBC) test",
      "Do NOT take aspirin, mefenamic acid, or ibuprofen",
      "Proceed to nearest MOH Base Hospital Emergency Treatment Unit (ETU)",
      "Hydrate with ORS (Oral Rehydration Solution) & Jeevani"
    ];
  } else if (riskScore >= 35) {
    riskCategory = "MODERATE RISK - MONITOR CLOSELY";
    summary = "Symptoms suggest acute viral fever or early stage vector-borne illness.";
    nextSteps = [
      "Rest and monitor body temperature every 4 hours",
      "Book an MOH doctor consultation if fever persists past Day 2",
      "Ensure mosquito nets are used during daytime rest"
    ];
  } else {
    riskCategory = "LOW RISK - GENERAL WELLNESS ADVICE";
    summary = "Mild symptoms reported. Maintain adequate hydration and rest.";
    nextSteps = [
      "Drink 2-3 liters of clean water daily",
      "Use paracetamol for mild fever if needed"
    ];
  }

  return res.json({
    riskScore,
    riskCategory,
    summary,
    nextSteps,
    district: district || 'Colombo',
    evaluatedAt: new Date().toISOString()
  });
};
