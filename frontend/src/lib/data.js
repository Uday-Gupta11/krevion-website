// Static data for Exelvia Healthcare website

export const NAV_LINKS = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
  { name: "Products", path: "/products" },
  { name: "Quality", path: "/quality" },
  { name: "Private Label", path: "/private-label" },
  { name: "Global Exports", path: "/global-exports" },
  { name: "Regulatory", path: "/regulatory" },
  { name: "Contact", path: "/contact" },
];

export const WHY_CHOOSE = [
  {
    icon: "ShieldCheck",
    title: "International Quality",
    desc: "Products manufactured in internationally compliant facilities under stringent pharmaceutical quality management systems.",
  },
  {
    icon: "Truck",
    title: "Reliable Supply Chain",
    desc: "Carefully orchestrated procurement, batch tracking and on-time delivery for healthcare partners worldwide.",
  },
  {
    icon: "Globe",
    title: "Global Distribution",
    desc: "Export-focused operations serving partners across the Middle East, Africa, Asia, CIS, LATAM and South East Asia.",
  },
  {
    icon: "FileCheck2",
    title: "Regulatory Expertise",
    desc: "End-to-end dossier preparation, registration support and harmonized documentation for target markets.",
  },
  {
    icon: "PackageSearch",
    title: "Private Label Solutions",
    desc: "Custom branding, artwork, packaging and regulatory coordination for distributors and tender supply.",
  },
  {
    icon: "Heart",
    title: "Customer First",
    desc: "Transparent communication, long-term partnerships and accountability at every step of the journey.",
  },
];

export const PRODUCT_CATEGORIES_LEGACY_UNUSED = [];

export const THERAPEUTIC_SEGMENTS = [
  { name: "Cardiovascular", icon: "HeartPulse" },
  { name: "Diabetology", icon: "Activity" },
  { name: "Neurology", icon: "Brain" },
  { name: "Psychiatry", icon: "BrainCircuit" },
  { name: "Gastroenterology", icon: "Soup" },
  { name: "Respiratory", icon: "Wind" },
  { name: "Dermatology", icon: "Hand" },
  { name: "Anti-Infectives", icon: "ShieldPlus" },
  { name: "Orthopaedics", icon: "Bone" },
  { name: "Pain Management", icon: "Zap" },
  { name: "Pediatrics", icon: "Baby" },
  { name: "Gynecology & Women's Health", icon: "Flower2" },
  { name: "Urology", icon: "Droplets" },
  { name: "Ophthalmology", icon: "Eye" },
  { name: "ENT", icon: "Ear" },
  { name: "Critical Care", icon: "Siren" },
  { name: "Oncology", icon: "Ribbon" },
  { name: "Nephrology", icon: "Droplet" },
  { name: "Endocrinology", icon: "Gauge" },
  { name: "Nutraceuticals", icon: "Apple" },
];

export const MANUFACTURING_CAPABILITIES = [
  { slug: "tablets", name: "Tablets", technical: "Immediate & Modified-Release Solid Oral Dosage Forms", icon: "Pill", desc: "Film-coated, enteric-coated, sustained-release and bilayer tablet formulations." },
  { slug: "capsules", name: "Capsules", technical: "Hard Gelatin & HPMC Vegetarian Capsules", icon: "Pill", desc: "Two-piece hard-shell capsules for powder, pellet and granule fills." },
  { slug: "softgel-capsules", name: "Softgel Capsules", technical: "Soft Elastic Gelatin Encapsulation", icon: "Droplets", desc: "One-piece softgels for lipophilic APIs with enhanced bioavailability." },
  { slug: "oral-liquids", name: "Oral Liquids", technical: "Solutions, Suspensions & Emulsions", icon: "Wine", desc: "Aqueous and non-aqueous oral liquid dosage forms with preservative systems." },
  { slug: "dry-syrups", name: "Dry Syrups", technical: "Powder for Oral Suspension (POS)", icon: "Beaker", desc: "Reconstitution-ready powders yielding stable oral suspensions." },
  { slug: "injectables", name: "Injectables", technical: "Sterile Parenteral Formulations", icon: "Syringe", desc: "Liquid ampoules, lyophilised vials and pre-filled sterile injectables." },
  { slug: "ointments-creams", name: "Ointments & Creams", technical: "Semi-Solid Topical Preparations", icon: "PaintBucket", desc: "Hydrophobic and hydrophilic bases plus O/W and W/O emulsion creams." },
  { slug: "gels", name: "Gels", technical: "Hydrogels & Organogels", icon: "Waves", desc: "Transparent semi-solid gelling systems for topical delivery." },
  { slug: "eye-ear-drops", name: "Eye & Ear Drops", technical: "Ophthalmic & Otic Sterile Preparations", icon: "Eye", desc: "Isotonic buffered sterile solutions for ocular and auricular use." },
  { slug: "sachets", name: "Sachets", technical: "Unit-Dose Sachet & Stick-Pack Formulations", icon: "PackageOpen", desc: "Single-dose sachets for powders, granules and effervescent systems." },
];

export const QUALITY_TIMELINE = [
  { step: "Raw Material", desc: "Carefully sourced active ingredients and excipients evaluated against pre-defined specifications.", icon: "FlaskConical" },
  { step: "Manufacturing", desc: "Production at internationally compliant facilities operating under stringent pharmaceutical quality management systems.", icon: "Factory" },
  { step: "Quality Control", desc: "Multi-stage in-process and finished-product testing including analytical, microbial and stability checks.", icon: "Microscope" },
  { step: "Packaging", desc: "Tamper-evident, market-specific packaging with full traceability and serialization where required.", icon: "Package" },
  { step: "Export", desc: "Documented, compliant shipping with full cold-chain and regulatory paperwork tailored to each destination.", icon: "Ship" },
];

export const EXPORT_MARKETS = [
  { region: "Middle East", countries: "UAE, Saudi Arabia, Oman, Qatar, Kuwait, Bahrain, Jordan, Iraq" },
  { region: "Africa", countries: "Nigeria, Kenya, Ghana, Ethiopia, Tanzania, Uganda, South Africa, Ivory Coast" },
  { region: "Asia", countries: "Sri Lanka, Nepal, Bangladesh, Bhutan, Maldives" },
  { region: "CIS", countries: "Uzbekistan, Kazakhstan, Tajikistan, Kyrgyzstan, Turkmenistan, Azerbaijan" },
  { region: "Latin America", countries: "Guatemala, Honduras, Nicaragua, Dominican Republic, Peru, Ecuador" },
  { region: "South East Asia", countries: "Philippines, Vietnam, Cambodia, Myanmar, Indonesia, Laos" },
];

export const STATS = [
  { value: 200, suffix: "+", label: "Product Portfolio" },
  { value: 17, suffix: "", label: "Therapeutic Categories" },
  { value: 30, suffix: "+", label: "Target Export Markets" },
  { value: 100, suffix: "%", label: "Quality-Driven Operations" },
];

export const PRODUCT_CATEGORIES = MANUFACTURING_CAPABILITIES;

export const PRODUCTS = [
  { id: "p001", name: "Amoxicillin", generic: "Amoxicillin Trihydrate", strength: "500 mg", form: "Capsule", category: "capsules", segment: "Anti Infectives", pack: "10 x 10 Blister", desc: "Broad-spectrum beta-lactam antibiotic for bacterial infections." },
  { id: "p002", name: "Azithromycin", generic: "Azithromycin Dihydrate", strength: "500 mg", form: "Tablet", category: "tablets", segment: "Anti Infectives", pack: "3's Blister", desc: "Macrolide antibiotic for respiratory and skin infections." },
  { id: "p003", name: "Paracetamol", generic: "Paracetamol", strength: "500 mg", form: "Tablet", category: "tablets", segment: "Pain Management", pack: "10 x 10 Blister", desc: "Analgesic and antipyretic for mild to moderate pain and fever." },
  { id: "p004", name: "Ibuprofen", generic: "Ibuprofen", strength: "400 mg", form: "Tablet", category: "tablets", segment: "Pain Management", pack: "10 x 10 Blister", desc: "NSAID for pain, inflammation and fever." },
  { id: "p005", name: "Metformin SR", generic: "Metformin Hydrochloride SR", strength: "500 mg", form: "Tablet", category: "tablets", segment: "Diabetology", pack: "10 x 10 Blister", desc: "Sustained-release biguanide for type 2 diabetes management." },
  { id: "p006", name: "Atorvastatin", generic: "Atorvastatin Calcium", strength: "20 mg", form: "Tablet", category: "tablets", segment: "Cardiology", pack: "10 x 10 Blister", desc: "HMG-CoA reductase inhibitor for hyperlipidemia." },
  { id: "p007", name: "Omeprazole", generic: "Omeprazole", strength: "20 mg", form: "Capsule", category: "capsules", segment: "Gastroenterology", pack: "10 x 10 Blister", desc: "Proton pump inhibitor for acid-related disorders." },
  { id: "p008", name: "Ceftriaxone Injection", generic: "Ceftriaxone Sodium", strength: "1 g", form: "Injection", category: "injectables", segment: "Anti Infectives", pack: "Vial + WFI", desc: "Third-generation cephalosporin for serious bacterial infections." },
  { id: "p009", name: "Salbutamol Inhaler", generic: "Salbutamol Sulphate", strength: "100 mcg/dose", form: "Inhaler", category: "nasal-sprays", segment: "Respiratory", pack: "200 doses", desc: "Short-acting beta-2 agonist for asthma and COPD." },
  { id: "p010", name: "Cough Syrup", generic: "Dextromethorphan + Chlorpheniramine", strength: "10 + 2 mg/5ml", form: "Syrup", category: "oral-liquids", segment: "Respiratory", pack: "100 ml bottle", desc: "Cough suppressant with antihistamine for symptomatic relief." },
  { id: "p011", name: "Vitamin D3", generic: "Cholecalciferol", strength: "60,000 IU", form: "Softgel", category: "softgel-capsules", segment: "Nutrition", pack: "4's Strip", desc: "High-strength vitamin D3 supplementation." },
  { id: "p012", name: "Multivitamin Tablets", generic: "Multivitamins & Minerals", strength: "—", form: "Tablet", category: "nutraceuticals", segment: "Nutrition", pack: "30's Bottle", desc: "Daily multivitamin and mineral supplement." },
  { id: "p013", name: "Diclofenac Gel", generic: "Diclofenac Diethylamine", strength: "1.16% w/w", form: "Gel", category: "gels", segment: "Pain Management", pack: "30 g tube", desc: "Topical NSAID gel for localized musculoskeletal pain." },
  { id: "p014", name: "Hydrocortisone Cream", generic: "Hydrocortisone Acetate", strength: "1% w/w", form: "Cream", category: "creams", segment: "Dermatology", pack: "15 g tube", desc: "Topical corticosteroid for inflammatory skin disorders." },
  { id: "p015", name: "Moxifloxacin Eye Drops", generic: "Moxifloxacin HCl", strength: "0.5% w/v", form: "Eye Drop", category: "eye-drops", segment: "Ophthalmology", pack: "5 ml bottle", desc: "Fluoroquinolone ophthalmic solution for bacterial conjunctivitis." },
  { id: "p016", name: "Ciprofloxacin Ear Drops", generic: "Ciprofloxacin HCl", strength: "0.3% w/v", form: "Ear Drop", category: "ear-drops", segment: "ENT", pack: "10 ml bottle", desc: "Topical fluoroquinolone for otic infections." },
  { id: "p017", name: "Xylometazoline Nasal Spray", generic: "Xylometazoline HCl", strength: "0.1% w/v", form: "Nasal Spray", category: "nasal-sprays", segment: "ENT", pack: "10 ml bottle", desc: "Decongestant nasal spray for symptomatic relief." },
  { id: "p018", name: "Chlorhexidine Mouthwash", generic: "Chlorhexidine Gluconate", strength: "0.2% w/v", form: "Mouthwash", category: "mouth-wash", segment: "ENT", pack: "150 ml bottle", desc: "Antiseptic mouthwash for oral hygiene." },
  { id: "p019", name: "Calcium + Vitamin D3", generic: "Calcium Carbonate + Cholecalciferol", strength: "500 mg + 250 IU", form: "Tablet", category: "tablets", segment: "Orthopaedics", pack: "10 x 10 Blister", desc: "Bone health supplement." },
  { id: "p020", name: "Pediatric Drops", generic: "Paracetamol", strength: "100 mg/ml", form: "Oral Drops", category: "oral-liquids", segment: "Pediatrics", pack: "15 ml bottle", desc: "Pediatric antipyretic and analgesic oral drops." },
];

export const IMAGES = {
  hero: "https://images.unsplash.com/photo-1582719471384-894fbb16e074?crop=entropy&cs=srgb&fm=jpg&q=85&w=2000",
  laboratory: "https://images.unsplash.com/photo-1614935151651-0bea6508db6b?crop=entropy&cs=srgb&fm=jpg&q=85&w=1600",
  manufacturing: "https://images.unsplash.com/photo-1716643863806-989dd76ae093?crop=entropy&cs=srgb&fm=jpg&q=85&w=1600",
  pills: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?crop=entropy&cs=srgb&fm=jpg&q=85&w=1600",
  microscope: "https://images.unsplash.com/photo-1518152006812-edab29b069ac?crop=entropy&cs=srgb&fm=jpg&q=85&w=1600",
  shipping: "https://images.unsplash.com/photo-1605745341112-85968b19335b?crop=entropy&cs=srgb&fm=jpg&q=85&w=1600",
  researcher: "https://images.pexels.com/photos/3735711/pexels-photo-3735711.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=900&w=1400",
  scientist2: "https://images.unsplash.com/photo-1581093588401-fbb62a02f120?crop=entropy&cs=srgb&fm=jpg&q=85&w=1600",
  qcLab: "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?crop=entropy&cs=srgb&fm=jpg&q=85&w=1600",
  packaging: "https://images.unsplash.com/photo-1631549916768-4119b2e5f926?crop=entropy&cs=srgb&fm=jpg&q=85&w=1600",
  vials: "https://images.unsplash.com/photo-1626516051136-29adb1d2b1d6?crop=entropy&cs=srgb&fm=jpg&q=85&w=1600",
  capsules: "https://images.unsplash.com/photo-1471864190281-a93a3070b6de?crop=entropy&cs=srgb&fm=jpg&q=85&w=1600",
  worldmap: "https://images.unsplash.com/photo-1589519160732-57fc498494f8?crop=entropy&cs=srgb&fm=jpg&q=85&w=2000",
};

export const LOGO_URL = "/logo.png";

export const COMPANY = {
  name: "Exelvia Healthcare",
  tagline: "Precision. Purity. Progress.",
  promise: "Delivering Trusted Healthcare Solutions Beyond Borders.",
  vision: "To become a globally trusted healthcare export company, connecting quality pharmaceutical and healthcare products with markets worldwide through innovation, reliability, and ethical business practices.",
  mission: "Our mission is to deliver high-quality pharmaceutical and healthcare products that meet international standards while building long-term partnerships through transparency, timely delivery, regulatory compliance, and customer-focused service. By leveraging technology and AI-driven processes, we strive to make global healthcare sourcing more efficient, dependable, and accessible.",
  purpose: "Improving access to quality healthcare products across borders by connecting trusted manufacturers with healthcare providers, distributors, and governments worldwide.",
  email: "info@exelviahealthcare.com",
  phone: "+91 8126793622",
  phone2: "+91 8383996912",
  phone3: "+91 6395928864",
  whatsapp: "+918126793622", // WhatsApp floating button connects to this number
  address: "Exelvia Healthcare, India",
};
