// Panchakarma Treatments
export const panchakarma = [
  {
    id: 1,
    name: "Vamanam",
    description: "Therapeutic emesis to eliminate toxins from the upper respiratory and gastrointestinal tract.",
    benefits: ["Clears respiratory congestion", "Treats skin disorders", "Balances Kapha dosha"],
    price: 10000,
    duration: "7 Days",
    preparation: "3-5 days",
  },
  {
    id: 2,
    name: "Virechana",
    description: "Medicated purgation therapy to cleanse the liver, gallbladder, and intestines.",
    benefits: ["Eliminates Pitta toxins", "Improves digestion", "Treats chronic fever and skin conditions"],
    price: 8000,
    duration: "7 Days",
    preparation: "3-5 days",
  },
  {
    id: 3,
    name: "Nasyam",
    description: "Nasal administration of medicated oils to clear sinuses and improve mental clarity.",
    benefits: ["Relieves headaches and migraines", "Clears nasal passages", "Enhances sensory perception"],
    price: 900,
    duration: "1 Day",
    preparation: "None",
  },
  {
    id: 4,
    name: "Matravasti & Kashayavasti",
    description: "Medicated enema therapy for colon cleansing and Vata balance.",
    benefits: ["Relieves constipation", "Treats joint disorders", "Balances Vata dosha"],
    price: 9000,
    duration: "7 Days",
    preparation: "2-3 days",
  },
];

// Ayurveda Therapies
export const therapies = [
  {
    id: 5,
    name: "Abhyangam",
    description: "Full Body Massage + Steam Bath",
    fullDescription: "Rhythmic full-body massage using warm medicated oils followed by herbal steam therapy to promote deep relaxation and detoxification.",
    duration: "60 Minutes",
    benefits: ["Improves circulation", "Nourishes skin", "Reduces stress"],
    price: 1200,
  },
  {
    id: 6,
    name: "Udvartana",
    description: "Herbal Powder Massage",
    fullDescription: "Invigorating dry massage using herbal powders to reduce subcutaneous fat and improve skin texture.",
    duration: "45 Minutes",
    benefits: ["Weight management", "Cellulite reduction", "Skin toning"],
    price: 1500,
  },
  {
    id: 7,
    name: "Kativasti",
    description: "Including Pindasveda / Kizhi + Massage",
    fullDescription: "Warm medicated oil pooling therapy for lower back pain, combined with herbal bolus massage.",
    duration: "45 Minutes",
    benefits: ["Relieves back pain", "Strengthens spine", "Improves flexibility"],
    price: 1500,
  },
  {
    id: 8,
    name: "Januvasti",
    description: "Including Kizhi + Massage",
    fullDescription: "Specialized knee therapy with warm oil retention and herbal compress for joint health.",
    duration: "45 Minutes",
    benefits: ["Reduces knee pain", "Improves mobility", "Strengthens joints"],
    price: 1500,
  },
  {
    id: 9,
    name: "Grivavasti",
    description: "Including Kizhi + Massage",
    fullDescription: "Neck and shoulder therapy using warm oil pooling technique to relieve cervical tension.",
    duration: "45 Minutes",
    benefits: ["Relieves neck stiffness", "Reduces headaches", "Improves posture"],
    price: 1500,
  },
  {
    id: 10,
    name: "Shirodhara",
    description: "Including Head & Shoulder Massage (1 Hour)",
    fullDescription: "Continuous stream of warm medicated oil poured over the forehead to calm the nervous system and promote mental clarity.",
    duration: "60 Minutes",
    benefits: ["Deep relaxation", "Reduces anxiety", "Improves sleep quality"],
    price: 2600,
  },
  {
    id: 11,
    name: "Navara Facial",
    description: "Rejuvenating Rice Facial",
    fullDescription: "Traditional facial using Navara rice cooked in herbal milk for skin rejuvenation and anti-aging.",
    duration: "45 Minutes",
    benefits: ["Anti-aging", "Skin brightening", "Deep nourishment"],
    price: 1000,
  },
  {
    id: 12,
    name: "Head Massage",
    description: "30 Minutes",
    fullDescription: "Therapeutic scalp and head massage using medicated oils to relieve tension and promote hair health.",
    duration: "30 Minutes",
    benefits: ["Relieves headaches", "Promotes hair growth", "Reduces stress"],
    price: 800,
  },
  {
    id: 13,
    name: "Foot Massage",
    description: "30 Minutes",
    fullDescription: "Reflexology-based foot massage targeting marma points to promote overall wellness and relaxation.",
    duration: "30 Minutes",
    benefits: ["Improves circulation", "Reduces fatigue", "Promotes better sleep"],
    price: 800,
  },
];

// Conditions Treated
export const conditions = [
  {
    title: "Diabetes Mellitus",
    description: "Holistic management of blood sugar levels through customized diet, lifestyle modifications, and herbal formulations.",
    icon: "Activity"
  },
  {
    title: "Hypertension (BP Control)",
    description: "Stress reduction and blood pressure regulation using calming therapies like Shirodhara and targeted herbs.",
    icon: "Heart"
  },
  {
    title: "Weight Loss & Weight Gain Programs",
    description: "Personalized programs for weight management, focusing on metabolic correction rather than superficial diets.",
    icon: "Scale"
  },
  {
    title: "Allergic Rhinitis & Sinus Care",
    description: "Relief from allergies, asthma, and sinus issues utilizing traditional Nasyam and respiratory immunity boosters.",
    icon: "Wind"
  },
  {
    title: "Osteoarthritis & Joint Pain Relief",
    description: "Pain relief and mobility improvement for stiff joints and sciatica using Kizhi and local Vasti.",
    icon: "User"
  },
  {
    title: "Endocrine Disorders",
    description: "Correcting hormonal imbalances related to Thyroid issues and lifestyle disorders using specific Ayurvedic protocols.",
    icon: "Droplets"
  },
  {
    title: "Migraine & Headache Management",
    description: "Deep relaxation therapies to balance the mind, soothe the nervous system, and relieve chronic head pain.",
    icon: "Brain"
  },
  {
    title: "Gastritis, IBS & Digestive Disorders",
    description: "Restoring gut health for chronic acidity and IBS by reigniting the natural digestive fire (Agni).",
    icon: "Leaf"
  },
  {
    title: "Stress Management & Relaxation Therapy",
    description: "Holistic therapies designed to alleviate modern stress, improve sleep, and restore mental equilibrium.",
    icon: "Moon"
  }
];

export const advancedCare = [
  {
    id: "ac-1",
    title: "Swarna Bindu Prashana",
    subtitle: "Integrative pediatric immunity booster designed for childhood wellness.",
    features: ["Boosts Memory & Intellect", "Enhances Digestive Fire", "Promotes Physical Strength"],
    image: "/images/advanced-care/immunity.png"
  },
  {
    id: "ac-2",
    title: "Neuro-Rehabilitation",
    subtitle: "Specialized care for Paralysis, Stroke Recovery & Bell’s Palsy.",
    features: ["Motor Function Restoration", "Muscle Relaxation Therapy", "Nerve Stimulation"],
    image: "/images/advanced-care/neuro.png"
  },
  {
    id: "ac-3",
    title: "Clinical Dermatology",
    subtitle: "Advanced Ayurvedic formulations for Skin Diseases including Psoriasis & Allergies.",
    features: ["Blood Purification (Rakta Mokshana)", "Toxin Elimination", "Soothes Inflammation"],
    image: "/images/advanced-care/dermatology.png"
  },
  {
    id: "ac-4",
    title: "Metabolic & Hepatic Care",
    subtitle: "Targeted interventions for Fatty Liver, Cholesterol Management & Digestion.",
    features: ["Liver Detoxification", "Metabolism Correction", "Lipid Profile Management"],
    image: "/images/advanced-care/metabolic.png"
  },
  {
    id: "ac-5",
    title: "Diabetic Wound Care",
    subtitle: "Specialized treatments accelerating recovery for Non-Healing Wounds.",
    features: ["Anti-Microbial Herbo-Mineral Applications", "Tissue Regeneration", "Vrana Ropana"],
    image: "/images/advanced-care/woundcare.png"
  },
  {
    id: "ac-6",
    title: "Renal & Urological Detox",
    subtitle: "Therapeutic protocols for UTI, Kidney Health & Complete Body Detoxification.",
    features: ["Flushes Out Toxins", "Balances Doshas", "Improves Renal Function"],
    image: "/images/advanced-care/renal.png"
  }
];