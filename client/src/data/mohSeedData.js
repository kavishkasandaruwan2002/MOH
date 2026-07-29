// MOH Sri Lanka Seed Data for Client

export const seedClinics = [
  {
    id: "cl-001",
    name: "Colombo Central MOH Primary Care & Vaccination Hub",
    division: "Colombo Central",
    district: "Colombo",
    address: "No. 128, De Saram Place, Colombo 10",
    phone: "+94 11 269 1111",
    email: "colombo.central@moh.gov.lk",
    lat: 6.9271,
    lng: 79.8612,
    categories: ["Vaccination", "Maternal Care", "Child Health", "Dental"],
    doctors: ["doc-101", "doc-102"],
    operatingHours: "Mon-Sat: 8:00 AM - 4:00 PM",
    capacityPerSlot: 15
  },
  {
    id: "cl-002",
    name: "Kandy Municipal MOH & Communicable Disease Center",
    division: "Kandy Municipal",
    district: "Kandy",
    address: "D. S. Senanayake Veediya, Kandy",
    phone: "+94 81 222 4444",
    email: "kandy.moh@health.gov.lk",
    lat: 7.2906,
    lng: 80.6337,
    categories: ["Communicable Diseases", "Rabies Vaccine", "Elderly Care", "NCD Screening"],
    doctors: ["doc-103"],
    operatingHours: "Mon-Fri: 8:30 AM - 4:30 PM",
    capacityPerSlot: 20
  },
  {
    id: "cl-003",
    name: "Galle Fort Maternal & Child Welfare MOH Center",
    division: "Galle Four Gravets",
    district: "Galle",
    address: "Hospital Street, Fort, Galle",
    phone: "+94 91 223 2222",
    email: "galle.fort@moh.gov.lk",
    lat: 6.0329,
    lng: 80.2168,
    categories: ["Maternal Care", "Infant Nutrition", "Vaccination"],
    doctors: ["doc-104"],
    operatingHours: "Mon-Sat: 8:00 AM - 3:00 PM",
    capacityPerSlot: 12
  },
  {
    id: "cl-004",
    name: "Jaffna Town Community Health & Mosquito Control Center",
    division: "Jaffna",
    district: "Jaffna",
    address: "Hospital Road, Jaffna",
    phone: "+94 21 222 3333",
    email: "jaffna.health@moh.gov.lk",
    lat: 9.6615,
    lng: 80.0255,
    categories: ["Vector Control", "General Health", "Vaccination", "Eye Care"],
    doctors: ["doc-105"],
    operatingHours: "Mon-Fri: 8:00 AM - 4:00 PM",
    capacityPerSlot: 18
  },
  {
    id: "cl-005",
    name: "Gampaha Regional MOH & Epidemic Response Clinic",
    division: "Gampaha",
    district: "Gampaha",
    address: "Main Street, Gampaha",
    phone: "+94 33 222 1100",
    email: "gampaha.moh@health.gov.lk",
    lat: 7.084,
    lng: 79.9925,
    categories: ["Dengue Control", "Child Health", "NCD Screening", "Vaccination"],
    doctors: ["doc-101", "doc-104"],
    operatingHours: "Mon-Sat: 8:00 AM - 5:00 PM",
    capacityPerSlot: 25
  }
];

export const seedDoctors = [
  {
    id: "doc-101",
    name: "Dr. K. L. Perera",
    specialty: "Chief Medical Officer of Health (MOH)",
    qualifications: "MBBS, MSc (Community Medicine), MD",
    experience: "16 years",
    division: "Colombo Central",
    availableDays: ["Monday", "Wednesday", "Friday"],
    timeSlots: ["09:00 AM", "10:30 AM", "01:30 PM", "03:00 PM"]
  },
  {
    id: "doc-102",
    name: "Dr. Anusha De Silva",
    specialty: "Consultant Epidemiologist & Immunization Lead",
    qualifications: "MBBS, MD (Epidemiology)",
    experience: "12 years",
    division: "Colombo Central",
    availableDays: ["Tuesday", "Thursday", "Saturday"],
    timeSlots: ["08:30 AM", "11:00 AM", "02:00 PM"]
  },
  {
    id: "doc-103",
    name: "Dr. S. Thanabalasingam",
    specialty: "Maternal & Child Health Specialist",
    qualifications: "MBBS, DCH, MD",
    experience: "14 years",
    division: "Kandy Municipal",
    availableDays: ["Monday", "Tuesday", "Thursday", "Friday"],
    timeSlots: ["09:00 AM", "11:30 AM", "02:30 PM"]
  },
  {
    id: "doc-104",
    name: "Dr. N. Wickramasinghe",
    specialty: "Public Health Inspector Trainer & Medical Officer",
    qualifications: "MBBS, MSc (Public Health)",
    experience: "10 years",
    division: "Galle Four Gravets",
    availableDays: ["Monday", "Wednesday", "Saturday"],
    timeSlots: ["09:30 AM", "01:00 PM", "03:30 PM"]
  },
  {
    id: "doc-105",
    name: "Dr. T. Rajaratnam",
    specialty: "Communicable Diseases & Tropical Medicine Lead",
    qualifications: "MBBS, Diploma in Tropical Medicine",
    experience: "15 years",
    division: "Jaffna",
    availableDays: ["Monday", "Thursday", "Friday"],
    timeSlots: ["08:30 AM", "10:30 AM", "01:30 PM"]
  }
];

export const seedHotspots = [
  {
    id: "hs-01",
    location: "Dehiwala - Canal Bank Zone",
    district: "Colombo",
    lat: 6.8511,
    lng: 79.8655,
    riskLevel: "HIGH",
    dengueCasesThisMonth: 42,
    breedingIndex: 18.5,
    status: "Active Fogging & Inspection",
    lastInspected: "2026-07-25"
  },
  {
    id: "hs-02",
    location: "Kandy Municipal Market & Bus Stand",
    district: "Kandy",
    lat: 7.2925,
    lng: 80.635,
    riskLevel: "HIGH",
    dengueCasesThisMonth: 38,
    breedingIndex: 16.2,
    status: "Larviciding Spray in Progress",
    lastInspected: "2026-07-27"
  },
  {
    id: "hs-03",
    location: "Wattala - Mabola Junction",
    district: "Gampaha",
    lat: 6.9892,
    lng: 79.8912,
    riskLevel: "HIGH",
    dengueCasesThisMonth: 55,
    breedingIndex: 21.0,
    status: "Red Alert Broadcasted",
    lastInspected: "2026-07-28"
  },
  {
    id: "hs-04",
    location: "Galle Karapitiya Hospital Perimeter",
    district: "Galle",
    lat: 6.066,
    lng: 80.2285,
    riskLevel: "MEDIUM",
    dengueCasesThisMonth: 19,
    breedingIndex: 9.8,
    status: "Cleanliness Drive Scheduled",
    lastInspected: "2026-07-22"
  },
  {
    id: "hs-05",
    location: "Nallur Temple Precincts",
    district: "Jaffna",
    lat: 9.6744,
    lng: 80.0298,
    riskLevel: "MEDIUM",
    dengueCasesThisMonth: 14,
    breedingIndex: 7.5,
    status: "Surveillance Active",
    lastInspected: "2026-07-24"
  }
];

export const seedComplaints = [
  {
    id: "CMP-8841",
    citizenName: "Kamal Jayasinghe",
    phone: "+94 77 123 4567",
    nic: "198812345678",
    category: "Mosquito Breeding Site",
    locationName: "Abandoned construction site near Baseline Road, Colombo 09",
    lat: 6.9189,
    lng: 79.8785,
    description: "Stagnant rainwater trapped in basement slabs for over 3 weeks. Heavy mosquito larva visible.",
    photoUrl: "https://images.unsplash.com/photo-1584467735871-8e85353a8413?auto=format&fit=crop&w=600&q=80",
    status: "UNDER_INVESTIGATION",
    assignedPHI: "PHI - Nimal Bandara",
    createdAt: "2026-07-26T09:30:00Z",
    updatedAt: "2026-07-27T14:15:00Z",
    phiNotes: "Notice served under Prevention of Mosquito Breeding Act No. 11 of 2007 to property owner."
  },
  {
    id: "CMP-8842",
    citizenName: "Dilini Fernando",
    phone: "+94 71 987 6543",
    nic: "199265432109",
    category: "Illegal Garbage Dumping",
    locationName: "Corner of Temple Road, Maharagama",
    lat: 6.848,
    lng: 79.9265,
    description: "Uncollected commercial waste piled on sidewalk causing severe foul odor and rodent infestation.",
    photoUrl: "https://images.unsplash.com/photo-1530587191325-3db32d826c18?auto=format&fit=crop&w=600&q=80",
    status: "RESOLVED",
    assignedPHI: "PHI - Ruwan Silva",
    createdAt: "2026-07-22T11:00:00Z",
    updatedAt: "2026-07-24T16:00:00Z",
    phiNotes: "Municipal council garbage truck dispatched. Area cleared and disinfected."
  },
  {
    id: "CMP-8843",
    citizenName: "S. Vigneshwaran",
    phone: "+94 75 444 3322",
    nic: "198533221100",
    category: "Food Safety & Hygiene",
    locationName: "Eatery on Main Street, Kandy",
    lat: 7.291,
    lng: 80.634,
    description: "Prepared food left exposed without insect covering. Unwashed utensils and improper drainage.",
    photoUrl: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=600&q=80",
    status: "SUBMITTED",
    assignedPHI: "PHI - S. Pathmanathan",
    createdAt: "2026-07-28T16:45:00Z",
    updatedAt: "2026-07-28T16:45:00Z",
    phiNotes: "Queued for surprise inspection on 2026-07-30."
  }
];

export const seedAppointments = [
  {
    id: "APT-2026-109",
    citizenName: "Sunethra Ranasinghe",
    nic: "199056781234",
    phone: "+94 77 999 8877",
    email: "sunethra@example.com",
    clinicId: "cl-001",
    clinicName: "Colombo Central MOH Primary Care & Vaccination Hub",
    doctorId: "doc-101",
    doctorName: "Dr. K. L. Perera",
    serviceCategory: "Maternal Care",
    appointmentDate: "2026-08-02",
    appointmentTime: "10:30 AM",
    status: "CONFIRMED",
    qrCodeToken: "MOH-SL-APT-2026-109-SECURE-TOKEN",
    createdAt: "2026-07-28T10:00:00Z"
  },
  {
    id: "APT-2026-110",
    citizenName: "Mohamed Rizan",
    nic: "198311223344",
    phone: "+94 71 222 3344",
    email: "rizan.m@example.com",
    clinicId: "cl-002",
    clinicName: "Kandy Municipal MOH & Communicable Disease Center",
    doctorId: "doc-103",
    doctorName: "Dr. S. Thanabalasingam",
    serviceCategory: "Child Health & MMR Vaccine",
    appointmentDate: "2026-08-03",
    appointmentTime: "09:00 AM",
    status: "CONFIRMED",
    qrCodeToken: "MOH-SL-APT-2026-110-SECURE-TOKEN",
    createdAt: "2026-07-29T08:15:00Z"
  }
];

export const seedImmunizationSchedule = [
  { age: "At Birth", vaccine: "BCG (Tuberculosis)", code: "BCG", target: "Tuberculosis", route: "Intradermal" },
  { age: "2 Months", vaccine: "Pentavalent 1 (DTP-HepB-Hib) + OPV 1 + fIPV 1", code: "PENTA-1", target: "Diphtheria, Tetanus, Pertussis, Hep B, Hib, Polio", route: "Intramuscular & Oral" },
  { age: "4 Months", vaccine: "Pentavalent 2 + OPV 2 + fIPV 2", code: "PENTA-2", target: "Diphtheria, Tetanus, Pertussis, Hep B, Hib, Polio", route: "Intramuscular & Oral" },
  { age: "6 Months", vaccine: "Pentavalent 3 + OPV 3", code: "PENTA-3", target: "Diphtheria, Tetanus, Pertussis, Hep B, Hib, Polio", route: "Intramuscular & Oral" },
  { age: "9 Months", vaccine: "MMR 1 (Measles, Mumps, Rubella)", code: "MMR-1", target: "Measles, Mumps, Rubella", route: "Subcutaneous" },
  { age: "12 Months", vaccine: "Live JE (Japanese Encephalitis)", code: "JE", target: "Japanese Encephalitis", route: "Subcutaneous" },
  { age: "18 Months", vaccine: "DTP Booster + OPV 4 + MMR 2", code: "DTP-BOOST", target: "Diphtheria, Tetanus, Pertussis, MMR", route: "Intramuscular" },
  { age: "5 Years", vaccine: "DT (Diphtheria & Tetanus) + OPV 5", code: "DT-5", target: "Diphtheria & Tetanus", route: "Intramuscular" },
  { age: "12 Years (Grade 7)", vaccine: "HPV (Human Papillomavirus - 2 doses)", code: "HPV", target: "Cervical Cancer Prevention", route: "Intramuscular" },
  { age: "Pregnant Mothers", vaccine: "aTd (Adult Tetanus & Diphtheria)", code: "ATD", target: "Maternal & Neonatal Tetanus", route: "Intramuscular" }
];

export const seedNews = [
  {
    id: "news-01",
    title: "National Special Dengue Control Week Declared Across 10 High-Risk MOH Divisions",
    date: "2026-07-28",
    category: "Alert & Campaign",
    summary: "Ministry of Health initiates island-wide house-to-house inspections supported by Tri-Forces and PHI teams.",
    content: "Following recent heavy monsoonal showers, the Epidemiology Unit has identified a 25% spike in vector density. All householders are urged to dedicate 30 minutes every Sunday to destroy Aedes mosquito breeding containers.",
    image: "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=800&q=80",
    important: true
  },
  {
    id: "news-02",
    title: "Introduction of Digital Health Records & QR Pass System in All MOH Clinics",
    date: "2026-07-20",
    category: "Service Update",
    summary: "Citizens can now pre-book slots and present digital QR passes on their smartphones for zero waiting time.",
    content: "The Ministry of Health Sri Lanka has deployed the digital appointment & immunization tracking portal across Western and Central provinces.",
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=800&q=80",
    important: false
  },
  {
    id: "news-03",
    title: "Free Maternal Nutrition & Ultrasound Screening Days Announced",
    date: "2026-07-15",
    category: "Community Welfare",
    summary: "MOH clinics will host specialized prenatal wellness workshops with free nutritional supplement kits.",
    content: "Pregnant mothers registered with local PHMs can attend weekly clinic sessions for free iron, folic acid, and growth tracking.",
    image: "https://images.unsplash.com/photo-1531983412531-1f49a365ffed?auto=format&fit=crop&w=800&q=80",
    important: false
  }
];

export const seedArticles = [
  {
    id: "art-101",
    title: "Recognizing Warning Signs of Dengue Hemorrhagic Fever in Children",
    category: "Disease Prevention",
    readTime: "4 min read",
    author: "Dr. Anusha De Silva",
    summary: "High persistent fever, abdominal pain, persistent vomiting, and skin petechiae require immediate MOH hospital admission.",
    content: "Dengue virus is transmitted by Aedes aegypti mosquitoes. Early fluid management is critical. Avoid taking NSAIDs like ibuprofen; use paracetamol strictly under recommended dosage.",
    image: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=800&q=80",
    tags: ["Dengue", "Pediatrics", "Emergency Care"]
  },
  {
    id: "art-102",
    title: "Essential Nutrition Guide for Expectant Mothers in Sri Lanka",
    category: "Maternal Care",
    readTime: "6 min read",
    author: "Dr. S. Thanabalasingam",
    summary: "Balanced dietary recommendations using local foods rich in iron, calcium, protein, and folates.",
    content: "Incorporating green leafy vegetables (Gotukola, Mukunuwenna), small fish (Neththali), drumstick leaves (Murunga), and legumes ensures optimal fetal neural development.",
    image: "https://images.unsplash.com/photo-1498837167922-ddd27525d352?auto=format&fit=crop&w=800&q=80",
    tags: ["Nutrition", "Pregnancy", "MOH Wellness"]
  },
  {
    id: "art-103",
    title: "Rabies Prevention: Immediate First Aid after Dog or Cat Bites",
    category: "Public Health Safety",
    readTime: "5 min read",
    author: "Dr. K. L. Perera",
    summary: "Washing wound with running water and soap for 15 minutes reduces rabies virus transmission by over 90%.",
    content: "Rabies is 100% fatal yet 100% preventable. Visit your nearest MOH clinic or hospital within 24 hours for Post-Exposure Prophylaxis (Anti-Rabies Vaccine).",
    image: "https://images.unsplash.com/photo-1537151608828-ea2b11777ee8?auto=format&fit=crop&w=800&q=80",
    tags: ["Rabies", "Vaccines", "First Aid"]
  }
];

export const seedEmergencyNumbers = [
  { name: "Suwa Seriya Free National Ambulance", number: "1990", icon: "Ambulance", available: "24/7 Islandwide" },
  { name: "MOH Epidemiological Unit Hotline", number: "+94 11 269 5112", icon: "PhoneCall", available: "8 AM - 8 PM" },
  { name: "National Dengue Control Unit (NDCU)", number: "+94 11 236 8420", icon: "ShieldAlert", available: "Mon-Sat" },
  { name: "National Poison Information Center", number: "+94 11 268 6143", icon: "AlertTriangle", available: "24/7 Emergency" },
  { name: "Sri Lanka Police Emergency", number: "119", icon: "Shield", available: "24/7 Emergency" },
  { name: "Fire & Rescue Service", number: "110", icon: "Flame", available: "24/7 Emergency" }
];
