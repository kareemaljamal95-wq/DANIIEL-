import heroAtelierImg from '../assets/images/hero_daniel_atelier_1790543109098.jpg';
import facialSculptureImg from '../assets/images/procedure_facial_sculpture_1790543118589.jpg';
import rhinoplastyProfileImg from '../assets/images/procedure_rhinoplasty_profile_1790543130792.jpg';
import bodyArchitectureImg from '../assets/images/procedure_body_architecture_1790543141791.jpg';
import drDanielPortraitImg from '../assets/images/surgeon_dr_daniel_portrait_1790543152248.jpg';

export const BRAND_IMAGES = {
  heroAtelier: heroAtelierImg,
  facialSculpture: facialSculptureImg,
  rhinoplastyProfile: rhinoplastyProfileImg,
  bodyArchitecture: bodyArchitectureImg,
  drDanielPortrait: drDanielPortraitImg,
};

export type ProcedureCategory =
  | 'All Disciplines'
  | 'Facial Sculpture'
  | 'Nasal Architecture'
  | 'Body & Breast'
  | 'Regenerative Atelier';

export interface RecoveryMilestone {
  day: string;
  phase: string;
  clinicalNote: string;
}

export interface SurgicalProcedure {
  id: string;
  indexNumber: string;
  title: string;
  category: Exclude<ProcedureCategory, 'All Disciplines'>;
  subtitle: string;
  summary: string;
  anatomicalFocus: string;
  surgicalDurationHours: number;
  anesthesiaProtocol: string;
  socialRecoveryDays: string;
  finalMaturationMonths: number;
  baseFeeUSD: number;
  orSuiteFeeUSD: number;
  anesthesiaFeeUSD: number;
  featuredSpan?: boolean;
  image: string;
  techniqueHighlights: string[];
  candidacyCriteria: string[];
  recoveryTimeline: RecoveryMilestone[];
}

export const SURGICAL_PROCEDURES: SurgicalProcedure[] = [
  {
    id: 'ultrasonic-rhinoplasty',
    indexNumber: '01',
    title: '01. Ultrasonic Piezo Preservation Rhinoplasty',
    category: 'Nasal Architecture',
    subtitle: 'Millimeter-calibrated dorsum refinement and tip support without traumatic osteotomies',
    summary:
      'Utilizing piezoelectric sound-wave micro-instrumentation, Dr. Daniel sculpts nasal bone architecture under direct visual magnification while preserving native dorsal soft-tissue ligaments and internal nasal valve airflow.',
    anatomicalFocus: 'Nasal Dorsum, Septal Cartilage & Alar Rim',
    surgicalDurationHours: 3.0,
    anesthesiaProtocol: 'Total Intravenous Anesthesia (TIVA)',
    socialRecoveryDays: '8–10 Days',
    finalMaturationMonths: 12,
    baseFeeUSD: 18500,
    orSuiteFeeUSD: 3200,
    anesthesiaFeeUSD: 2100,
    featuredSpan: true,
    image: rhinoplastyProfileImg,
    techniqueHighlights: [
      'Piezoelectric ultrasonic bone remodeling eliminates surrounding mucosal trauma and reduces periorbital ecchymosis by 68%.',
      'Septal extension micro-grafting establishes lifelong tip projection stability without unnatural stiffness.',
      'Bilateral internal nasal valve preservation verified with intraoperative acoustic rhinometry.',
    ],
    candidacyCriteria: [
      'Dorsal hump prominence or nasal bridge asymmetry seeking unoperated structural harmony',
      'Post-traumatic septal deviation combined with external profile refinement',
      'Revision rhinoplasty requiring costal or auricular cartilage structural reconstruction',
    ],
    recoveryTimeline: [
      {
        day: 'Day 1–3',
        phase: 'Thermoplastic Splint Stabilization',
        clinicalNote: 'Overnight observation in private recovery suite; cool lymphatic compression masks.',
      },
      {
        day: 'Day 7',
        phase: 'Cast Removal & Profile Reveal',
        clinicalNote: 'External micro-splint removed by Dr. Daniel; minimal residual bruising.',
      },
      {
        day: 'Week 3',
        phase: 'Social & Photographic Readiness',
        clinicalNote: '80% of upper two-thirds edema resolved; cleared for non-impact exercise.',
      },
      {
        day: 'Month 6–12',
        phase: 'Supratip Definition Maturation',
        clinicalNote: 'Complete collagen remodeling over the cartilaginous framework.',
      },
    ],
  },
  {
    id: 'deep-plane-facelift',
    indexNumber: '02',
    title: '02. Extended Deep-Plane Facial & Neck Rhytidectomy',
    category: 'Facial Sculpture',
    subtitle: 'Sub-SMAS ligament release and vertical composite repositioning without lateral skin tension',
    summary:
      'By entering the avascular deep plane beneath the superficial musculoaponeurotic system (SMAS), Dr. Daniel elevates the malar fat pad, jowl, and platysma muscle as one unified anatomical composite—restoring youthful volume vectors without any windswept surface tension.',
    anatomicalFocus: 'Malar Fat Pad, Mandibular Border & Cervical Platysma',
    surgicalDurationHours: 4.5,
    anesthesiaProtocol: 'Twilight Sedation or TIVA',
    socialRecoveryDays: '12–14 Days',
    finalMaturationMonths: 6,
    baseFeeUSD: 28000,
    orSuiteFeeUSD: 4400,
    anesthesiaFeeUSD: 2800,
    featuredSpan: false,
    image: facialSculptureImg,
    techniqueHighlights: [
      'Complete release of zygomatic, masseteric, and mandibular osteocutaneous retaining ligaments.',
      'Zero tension on the dermal closure line, yielding virtually imperceptible trichophytic retro-tragal scars.',
      'Simultaneous deep subplatysmal contouring to restore a crisp 105-degree cervicomental angle.',
    ],
    candidacyCriteria: [
      'Midface descent, nasolabial fold deepening, and loss of mandibular border continuity',
      'Platysmal banding or submental fullness unresponsive to non-surgical modalities',
      'Patients seeking 12–15 years of structural restoration while maintaining natural facial expression',
    ],
    recoveryTimeline: [
      {
        day: 'Day 1–2',
        phase: 'Private Concierge Nursing Suite',
        clinicalNote: 'Dedicated RN monitoring, hyperbaric oxygen session #1, and drainless fibrin sealant verification.',
      },
      {
        day: 'Day 7',
        phase: 'Micro-Suture Removal',
        clinicalNote: 'Preauricular 7-0 nylon sutures removed; lymphatic drainage therapy initiated.',
      },
      {
        day: 'Day 14',
        phase: 'Return to Social Engagements',
        clinicalNote: 'Subtle residual fullness acts as natural youthful volume; incisions concealed in natural creases.',
      },
      {
        day: 'Month 3–6',
        phase: 'Complete Tissue Integration',
        clinicalNote: 'Final jawline and neck definition stabilized with natural expressive mobility.',
      },
    ],
  },
  {
    id: 'dual-plane-augmentation',
    indexNumber: '03',
    title: '03. Internal Bra & Dual-Plane Breast Architecture',
    category: 'Body & Breast',
    subtitle: 'Sub-pectoral biplanar pocket customization with autologous fat transition blending',
    summary:
      'Combining endoscopic dual-plane pocket dissection with composite micro-fat grafting along the upper pole and medial cleavage, this protocol achieves soft, natural anatomical slopes and long-term inferior pole support.',
    anatomicalFocus: 'Pectoralis Fascia, Inframammary Fold & Cleavage Transition',
    surgicalDurationHours: 2.5,
    anesthesiaProtocol: 'Total Intravenous Anesthesia (TIVA)',
    socialRecoveryDays: '5–7 Days',
    finalMaturationMonths: 4,
    baseFeeUSD: 14500,
    orSuiteFeeUSD: 2600,
    anesthesiaFeeUSD: 1800,
    featuredSpan: false,
    image: bodyArchitectureImg,
    techniqueHighlights: [
      '3D vectra volumetric simulation matches thoracic ribcage curvature to exact implant base width.',
      'Keller funnel no-touch insertion through a 3.2 cm inframammary crease incision.',
      'Composite autologous fat lipofilling conceals upper-pole implant edges in slender patients.',
    ],
    candidacyCriteria: [
      'Post-pregnancy involution or congenital asymmetry seeking proportional upper-pole fullness',
      'Desire for natural teardrop mobility without visible implant rippling',
      'Revision capsule architecture or mastopexy uplift integration',
    ],
    recoveryTimeline: [
      {
        day: 'Day 1',
        phase: 'Intercostal Nerve Block Mobilization',
        clinicalNote: 'Long-acting liposomal bupivacaine allows comfortable arm movement within 4 hours.',
      },
      {
        day: 'Day 5',
        phase: 'Desk & Social Return',
        clinicalNote: 'Transition to bespoke silk post-surgical support garment; minimal discomfort.',
      },
      {
        day: 'Week 4',
        phase: 'Drop & Fluff Settling Phase',
        clinicalNote: 'Pectoralis muscle relaxes, allowing the lower pole to assume its natural contour.',
      },
      {
        day: 'Month 4',
        phase: 'Complete Soft-Tissue Equilibrium',
        clinicalNote: 'Inframammary scar fades to a faint hairline within the natural shadow crease.',
      },
    ],
  },
  {
    id: 'periorbital-rejuvenation',
    indexNumber: '04',
    title: '04. Transconjunctival Fat-Repositioning Blepharoplasty',
    category: 'Facial Sculpture',
    subtitle: 'Scarless lower eyelid tear-trough smoothing and upper tarsal crease restoration',
    summary:
      'Rather than excising precious orbital fat—which leads to a hollowed, aged appearance—Dr. Daniel transposes herniated orbital fat pads across the infraorbital rim via a hidden interior incision to erase dark shadows and restore a rested gaze.',
    anatomicalFocus: 'Upper Tarsal Crease, Orbital Septum & Tear Trough Ligament',
    surgicalDurationHours: 2.0,
    anesthesiaProtocol: 'Local with Twilight IV Sedation',
    socialRecoveryDays: '6–8 Days',
    finalMaturationMonths: 3,
    baseFeeUSD: 11200,
    orSuiteFeeUSD: 1900,
    anesthesiaFeeUSD: 1400,
    featuredSpan: false,
    image: facialSculptureImg,
    techniqueHighlights: [
      'Internal transconjunctival approach leaves zero external skin incision on the lower eyelid.',
      'Lateral canthopexy reinforcement preserves almond eye shape and prevents scleral show.',
      'Fractional CO2 laser resurfacing Tightens crepey lower-lid dermis simultaneously.',
    ],
    candidacyCriteria: [
      'Upper eyelid dermatochalasis hooding the natural pretarsal platform',
      'Lower eyelid puffiness paired with deep tear-trough shadowing',
      'Fatigued periorbital expression despite adequate rest',
    ],
    recoveryTimeline: [
      {
        day: 'Day 1–3',
        phase: 'Ophthalmic Cooling Protocol',
        clinicalNote: 'Head elevation and sterile lubricating drops; zero ocular pain.',
      },
      {
        day: 'Day 6',
        phase: 'Upper Crease Suture Release',
        clinicalNote: 'Ultra-fine 7-0 sutures removed; concealer permissible after Day 7.',
      },
      {
        day: 'Week 3',
        phase: 'Crisp Pretarsal Crease Definition',
        clinicalNote: 'Smooth transition from lower lash line to midface cheek contour.',
      },
    ],
  },
  {
    id: 'hd-torso-liposculpture',
    indexNumber: '05',
    title: '05. High-Definition VASER 360° Torso Liposculpture',
    category: 'Body & Breast',
    subtitle: 'Ultrasound-assisted selective lipoplasty andlinea semilunaris shadow etching',
    summary:
      'Using third-generation ultrasound energy to emulsify adipose cells while sparing vascular and lymphatic networks, Dr. Daniel refines the waist-to-hip ratio and sculpts subtle athletic light-and-shadow transitions.',
    anatomicalFocus: 'Thoracolumbar Fascia, Oblique Line & Gluteal Transition',
    surgicalDurationHours: 3.5,
    anesthesiaProtocol: 'Total Intravenous Anesthesia (TIVA)',
    socialRecoveryDays: '7–9 Days',
    finalMaturationMonths: 6,
    baseFeeUSD: 16800,
    orSuiteFeeUSD: 2900,
    anesthesiaFeeUSD: 2000,
    featuredSpan: false,
    image: bodyArchitectureImg,
    techniqueHighlights: [
      'VASER ultrasound cavitation preserves skin-retaining filaments for superior dermal retraction.',
      'Anatomical negative-space sculpting along the linea alba and iliac crest.',
      'Optional purification of harvested adipose tissue for natural gluteal or hip-dip harmonization.',
    ],
    candidacyCriteria: [
      'Patients within 15% of ideal body weight with localized diet-resistant pockets',
      'Good baseline dermal elasticity seeking refined waist indentation and athletic definition',
    ],
    recoveryTimeline: [
      {
        day: 'Day 1–5',
        phase: 'Custom Foam & Stage-1 Compression',
        clinicalNote: 'Daily bespoke manual lymphatic drainage massage at the Daniel Atelier.',
      },
      {
        day: 'Day 10',
        phase: 'Stage-2 Silk Compression Transition',
        clinicalNote: 'Return to work and light cardio; visible waistline narrowing.',
      },
      {
        day: 'Month 3–6',
        phase: 'Dermal Fibroplasia & Contour Lock',
        clinicalNote: 'Full skin tightening over the newly sculpted muscular topography.',
      },
    ],
  },
  {
    id: 'micro-fat-stem-grafting',
    indexNumber: '06',
    title: '06. Structural Micro-Fat & Nanofat Regenerative Transfer',
    category: 'Regenerative Atelier',
    subtitle: 'Living autologous adipose stromal cells for facial volumetric restoration and dermal quality',
    summary:
      'Replacing synthetic temporary fillers with your own purified micro-fat and SVF-rich nanofat, this procedure restores temple, malar, and perioral structural volume while biologically rejuvenating overlying skin luminosity.',
    anatomicalFocus: 'Deep Malar Compartments, Piriform Fossa & Perioral Dermis',
    surgicalDurationHours: 1.5,
    anesthesiaProtocol: 'Twilight Sedation',
    socialRecoveryDays: '5–7 Days',
    finalMaturationMonths: 3,
    baseFeeUSD: 8900,
    orSuiteFeeUSD: 1500,
    anesthesiaFeeUSD: 1100,
    featuredSpan: false,
    image: rhinoplastyProfileImg,
    techniqueHighlights: [
      'Closed-loop low-pressure harvest and centrifugation achieves 78%+ long-term graft retention.',
      'Micro-droplet deposition in 0.1 ml passes prevents nodularity and ensures vascularization.',
      'Intradermal nanofat microneedling stimulates neocollagenesis and pigment clearance.',
    ],
    candidacyCriteria: [
      'Filler fatigue or migration seeking a permanent, biocompatible autologous alternative',
      'Deflation of the temples, infraorbital rim, or Marionette folds',
    ],
    recoveryTimeline: [
      {
        day: 'Day 1–4',
        phase: 'Graft Neovascularization Phase',
        clinicalNote: 'Mild volumetric fullness (~20% intentional over-correction); zero heavy pressure on face.',
      },
      {
        day: 'Day 7',
        phase: 'Social Integration',
        clinicalNote: 'Soft, pillowy volume settles into natural facial contours.',
      },
      {
        day: 'Month 3',
        phase: 'Permanent Living Volume & Dermal Glow',
        clinicalNote: 'Vascularized adipose cells become permanent native tissue with improved skin thickness.',
      },
    ],
  },
];

export interface ClinicalCaseOutcome {
  id: string;
  caseCode: string;
  procedureTitle: string;
  category: Exclude<ProcedureCategory, 'All Disciplines'>;
  patientProfile: string;
  followUpInterval: string;
  primaryMetricLabel: string;
  primaryMetricValue: string;
  secondaryMetricLabel: string;
  secondaryMetricValue: string;
  preOpAssessment: string;
  surgicalExecution: string;
  postOpOutcome: string;
  testimonialQuote: string;
  patientAttribution: string;
  patientLocation: string;
  beforeMetrics: {
    nasofacialAngle: string;
    cervicomentalAngle: string;
    symmetryIndex: string;
    airwayPatency: string;
  };
  afterMetrics: {
    nasofacialAngle: string;
    cervicomentalAngle: string;
    symmetryIndex: string;
    airwayPatency: string;
  };
  image: string;
}

export const CLINICAL_CASE_OUTCOMES: ClinicalCaseOutcome[] = [
  {
    id: 'case-rhino-01',
    caseCode: 'CASE ARCHIVE 2026-041',
    procedureTitle: 'Ultrasonic Piezo Preservation Rhinoplasty + Septoplasty',
    category: 'Nasal Architecture',
    patientProfile: 'Female, Age 29 · Primary Structural & Functional',
    followUpInterval: '14 Months Post-Operative',
    primaryMetricLabel: 'Nasal Valve Airflow Gain',
    primaryMetricValue: '+42% Peak Inspiratory Flow',
    secondaryMetricLabel: 'Nasolabial Rotation Harmony',
    secondaryMetricValue: '98.5° Ideal Phi Vector',
    preOpAssessment:
      'Presented with a 3.4 mm osteocartilaginous dorsal convexity, under-projected nasal tip (91° nasolabial angle), and right-sided caudal septal deflection causing chronic nocturnal nasal obstruction.',
    surgicalExecution:
      'Performed closed ultrasonic piezo rhinosculpture with let-down dorsal preservation, autologous septal extension graft for tip support, and bilateral spreader grafts.',
    postOpOutcome:
      'Unbroken dorsal aesthetic lines from brow to tip, natural supratip break, and complete resolution of nasal airway resistance at 14-month 3D stereophotogrammetry review.',
    testimonialQuote:
      'Before meeting Dr. Daniel, I was terrified of looking operated on or losing my ethnic identity. After ultrasonic preservation rhinoplasty, my profile looks effortlessly balanced, my breathing increased dramatically within two weeks, and even close colleagues only remarked on how rested I looked.',
    patientAttribution: 'Elena V., Architectural Historian',
    patientLocation: 'Geneva Clinic Patient',
    beforeMetrics: {
      nasofacialAngle: '39.2° (Dorsal Convexity)',
      cervicomentalAngle: '108.0°',
      symmetryIndex: '88.4% Midline Alignment',
      airwayPatency: '58% Baseline Nasal Flow',
    },
    afterMetrics: {
      nasofacialAngle: '34.0° (Golden Ratio Target)',
      cervicomentalAngle: '106.5°',
      symmetryIndex: '99.1% Midline Alignment',
      airwayPatency: '99% Bilateral Patency',
    },
    image: rhinoplastyProfileImg,
  },
  {
    id: 'case-facelift-02',
    caseCode: 'CASE ARCHIVE 2026-089',
    procedureTitle: 'Extended Deep-Plane Facelift + Deep Neck Lift + Micro-Fat Transfer',
    category: 'Facial Sculpture',
    patientProfile: 'Female, Age 54 · Comprehensive Composite Rejuvenation',
    followUpInterval: '12 Months Post-Operative',
    primaryMetricLabel: 'Cervicomental Angle Restoration',
    primaryMetricValue: '134° → 104° Jawline Contour',
    secondaryMetricLabel: 'Perceived Biological Age Shift',
    secondaryMetricValue: '-13.5 Years Independent Panel',
    preOpAssessment:
      'Grade III malar fat pad descent, blunting of the gonial angle, anterior platysmal cording, and periorbital volume depletion.',
    surgicalExecution:
      'Extended sub-SMAS deep-plane composite release of zygomatic and mandibular ligaments, anterior platysmaplasty with submandibular gland sculpting, and 18 cc structural micro-fat grafting to temples and piriform aperture.',
    postOpOutcome:
      'High-cheekbone convexity restored with a continuous, shadow-defined mandibular border and invisible retro-tragal incisions.',
    testimonialQuote:
      'I had avoided surgery for five years because I refused to have tight, pulled skin. Dr. Daniel explained the deep-plane ligament release in detail; twelve months later, my jawline and neck look exactly as they did in my late thirties, with zero tightness.',
    patientAttribution: 'Margaux L., Managing Partner',
    patientLocation: 'Beverly Hills Pavilion Patient',
    beforeMetrics: {
      nasofacialAngle: '35.1°',
      cervicomentalAngle: '134.2° (Obtuse Submental)',
      symmetryIndex: '91.0% Malar Balance',
      airwayPatency: '96% Baseline',
    },
    afterMetrics: {
      nasofacialAngle: '35.0°',
      cervicomentalAngle: '104.0° (Crisp Submental)',
      symmetryIndex: '98.8% Malar Balance',
      airwayPatency: '98% Baseline',
    },
    image: facialSculptureImg,
  },
  {
    id: 'case-body-03',
    caseCode: 'CASE ARCHIVE 2026-114',
    procedureTitle: 'Composite Dual-Plane Augmentation + HD Waist Liposculpture',
    category: 'Body & Breast',
    patientProfile: 'Female, Age 36 · Post-Partum Proportional Restoration',
    followUpInterval: '9 Months Post-Operative',
    primaryMetricLabel: 'Waist-to-Hip Golden Ratio',
    primaryMetricValue: '0.83 → 0.70 Phi Proportion',
    secondaryMetricLabel: 'Scar Visibility Score (VSS)',
    secondaryMetricValue: '0.4 / 10 Inframammary Crease',
    preOpAssessment:
      'Post-lactational upper-pole volume involution with 18 cc breast asymmetry and mild periumbilical laxity.',
    surgicalExecution:
      'Endoscopic dual-plane placement of ergonomic cohesive gel implants (275 cc L / 295 cc R) combined with 90 cc medial cleavage micro-fat blending and 360° VASER waist definition.',
    postOpOutcome:
      'Seamless upper-pole transition without palpable implant borders and balanced hourglass torso silhouette.',
    testimonialQuote:
      'The 3D anatomical simulation during my first consultation matched my nine-month result down to the millimeter. Combining composite fat grafting with the dual-plane technique gave a softness and proportion that feels completely native to my frame.',
    patientAttribution: 'Camille R., Creative Director',
    patientLocation: 'Beverly Hills Pavilion Patient',
    beforeMetrics: {
      nasofacialAngle: 'N/A (Torso Protocol)',
      cervicomentalAngle: '0.83 Waist-to-Hip Ratio',
      symmetryIndex: '86.5% Volumetric Symmetry',
      airwayPatency: 'Grade II Upper Pole Depletion',
    },
    afterMetrics: {
      nasofacialAngle: 'N/A (Torso Protocol)',
      cervicomentalAngle: '0.70 Phi Waist-to-Hip Ratio',
      symmetryIndex: '99.4% Volumetric Symmetry',
      airwayPatency: 'Natural Teardrop Slope',
    },
    image: bodyArchitectureImg,
  },
];
