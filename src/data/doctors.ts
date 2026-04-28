export interface Doctor {
  id: string;
  name: string;
  role: string;
  qualifications: string;
  biography: string;
  specialties: string[];
  certificates: string[];
  image: string;
  experience?: string;
  stats?: {
    label: string;
    value: string;
  }[];
}

export const doctors: Doctor[] = [
  {
    id: "dr-arun-v",
    name: "Dr. Arun V",
    role: "Ayurvedic Physician",
    qualifications: "BAMS",
    biography: "A BAMS graduate with well-experienced knowledge in Ayurveda. Dedicated to continuous learning and evidence-based medicines, Dr. Arun is an enthusiastic healthcare professional committed to delivering excellent patient care through authentic Ayurvedic practices. His approach combines traditional wisdom with modern diagnostic techniques to provide comprehensive holistic healing.",
    specialties: ["Panchakarma Therapy", "Clinical Diagnosis", "Chronic Disease Management", "Lifestyle Counseling"],
    certificates: [
      "International Conference of Integrative Medicine in Health Care (NIMHANS)",
      "Research Methodology, Biostatistics and Comprehensive Management of Madhumeha (CCRAS - Ministry of AYUSH)",
      "One Day Clinical Workshop on Agni and Viddha Karma (Lila Academy of Ayurveda Studies)",
      "Advanced Training in Panchakarma Procedures and Post-Treatment Care"
    ],
    image: "/images/doctors/arun.webp",
    experience: "10+",
    stats: [
      { value: "10+", label: "Years Exp." },
      { value: "5k+", label: "Healed" }
    ]
  }
];

export const leadPhysician = doctors[0];
