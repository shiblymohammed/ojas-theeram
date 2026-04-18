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
    biography: "A BAMS graduate with well-experienced knowledge in Ayurveda. Dedicated to continuous learning and evidence-based medicines, Dr. Arun is an enthusiastic healthcare professional committed to delivering excellent patient care through authentic Ayurvedic practices.",
    specialties: ["Panchakarma", "Clinical Diagnosis", "Patient Education"],
    certificates: [
      "International Conference of Integrative Medicine in Health Care (NIMHANS)",
      "Research Methodology, Biostatistics and Comprehensive Management of Madhumeha (CCRAS - Ministry of AYUSH)",
      "One Day Clinical Workshop on Agni and Vidda Karma (Lila Academy of Ayurveda Studies)"
    ],
    image: "/images/doctors/arun.jpeg",
    experience: "10+",
    stats: [
      { value: "10+", label: "Years Exp." },
      { value: "5k+", label: "Healed" }
    ]
  }
];

export const leadPhysician = doctors[0];
