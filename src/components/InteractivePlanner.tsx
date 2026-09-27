import React, { useState } from 'react';
import { Check, Sliders, ArrowRight, RotateCcw } from 'lucide-react';
import { SURGICAL_PROCEDURES, SurgicalProcedure } from '../data/proceduresData';

export interface CustomPlannerBlueprint {
  zoneName: string;
  recommendedProcedureId: string;
  recommendedProcedureTitle: string;
  refinementIntensity: number;
  structuralSupportLevel: 'Standard Autologous' | 'Extended Composite' | 'Revision Reconstruction';
  recoveryAccelerators: boolean;
  estimatedTotalUSD: number;
  estimatedSocialRecoveryDays: number;
  phiHarmonyTarget: string;
}

interface InteractivePlannerProps {
  onApplyBlueprintToDossier: (procedure: SurgicalProcedure, blueprint: CustomPlannerBlueprint) => void;
  dossierIds: string[];
}

interface AnatomicalZoneConfig {
  id: string;
  label: string;
  anatomicalRegion: string;
  defaultProcedureId: string;
  svgCoords: { cx: number; cy: number };
  idealPhiMetric: string;
  primarySliderLabel: string;
  secondarySliderLabel: string;
  clinicalRationale: string;
}

const ANATOMICAL_ZONES: AnatomicalZoneConfig[] = [
  {
    id: 'nasal-profile',
    label: 'Nasal Dorsum & Tip',
    anatomicalRegion: 'Nasofacial Pyramid & Septal Cartilage',
    defaultProcedureId: 'ultrasonic-rhinoplasty',
    svgCoords: { cx: 200, cy: 175 },
    idealPhiMetric: '34.0° Nasofacial Angle · 98° Nasolabial Rotation',
    primarySliderLabel: 'Dorsal Bridge Refinement (mm)',
    secondarySliderLabel: 'Tip Projection & Suprabasal Support (%)',
    clinicalRationale:
      'Piezoelectric bone sculpting aligns the nasal dorsum with the forehead-to-chin vertical aesthetic plane while preserving internal nasal valve patency.',
  },
  {
    id: 'midface-jawline',
    label: 'Midface & Mandibular Line',
    anatomicalRegion: 'Sub-SMAS Deep Plane & Cervicomental Angle',
    defaultProcedureId: 'deep-plane-facelift',
    svgCoords: { cx: 242, cy: 232 },
    idealPhiMetric: '104.5° Cervicomental Angle · 1:1.618 Malar-to-Jaw Ratio',
    primarySliderLabel: 'Vertical Composite Vector Elevation (%)',
    secondarySliderLabel: 'Submental & Platysmal Definition (%)',
    clinicalRationale:
      'Releasing the zygomatic and mandibular retaining ligaments allows tension-free vertical repositioning of descended cheek volume and crisp jawline restoration.',
  },
  {
    id: 'periorbital-gaze',
    label: 'Periorbital & Tear Trough',
    anatomicalRegion: 'Upper Tarsal Platform & Infraorbital Rim',
    defaultProcedureId: 'periorbital-rejuvenation',
    svgCoords: { cx: 168, cy: 142 },
    idealPhiMetric: '9–10 mm Pretarsal Show · +2° Lateral Canthal Tilt',
    primarySliderLabel: 'Upper Tarsal Crease Clearance (%)',
    secondarySliderLabel: 'Infraorbital Fat Transposition Smoothness (%)',
    clinicalRationale:
      'Internal transconjunctival fat repositioning bridges the tear-trough hollow using native orbital fat without external lower-lid incisions.',
  },
  {
    id: 'regenerative-volume',
    label: 'Autologous Facial Volume',
    anatomicalRegion: 'Temples, Malar Fat Pad & Perioral Dermis',
    defaultProcedureId: 'micro-fat-stem-grafting',
    svgCoords: { cx: 158, cy: 192 },
    idealPhiMetric: 'Ogee Curve Convexity · 78%+ Stromal Cell Retention',
    primarySliderLabel: 'Micro-Fat Volumetric Restoration (cc)',
    secondarySliderLabel: 'Nanofat Dermal Luminosity Density (%)',
    clinicalRationale:
      'Living autologous adipose transfer restores structural convexity to deflated facial compartments while thickening overlying dermis.',
  },
  {
    id: 'breast-torso',
    label: 'Breast & Torso Proportions',
    anatomicalRegion: 'Dual-Plane Pectoralis Pocket & Waist Line',
    defaultProcedureId: 'dual-plane-augmentation',
    svgCoords: { cx: 200, cy: 335 },
    idealPhiMetric: '45:55 Upper-to-Lower Pole Ratio · 0.70 Waist-Hip Phi',
    primarySliderLabel: 'Volumetric Projection & Upper-Pole Blend (%)',
    secondarySliderLabel: '360° Torso Silhouette Definition (%)',
    clinicalRationale:
      'Biplanar sub-muscular stabilization paired with composite micro-fat transition blending creates natural anatomical movement and invisible borders.',
  },
];

export const InteractivePlanner: React.FC<InteractivePlannerProps> = ({
  onApplyBlueprintToDossier,
  dossierIds,
}) => {
  const [selectedZoneId, setSelectedZoneId] = useState<string>('nasal-profile');
  const [primaryValue, setPrimaryValue] = useState<number>(68);
  const [secondaryValue, setSecondaryValue] = useState<number>(75);
  const [supportLevel, setSupportLevel] = useState<
    'Standard Autologous' | 'Extended Composite' | 'Revision Reconstruction'
  >('Extended Composite');
  const [includeHyperbaricRecovery, setIncludeHyperbaricRecovery] = useState<boolean>(true);
  const [appliedConfirmation, setAppliedConfirmation] = useState<boolean>(false);

  const activeZone =
    ANATOMICAL_ZONES.find((z) => z.id === selectedZoneId) || ANATOMICAL_ZONES[0];

  const matchedProcedure =
    SURGICAL_PROCEDURES.find((p) => p.id === activeZone.defaultProcedureId) ||
    SURGICAL_PROCEDURES[0];

  // Calculate dynamic clinical metrics based on user parameters
  const complexityMultiplier =
    supportLevel === 'Standard Autologous'
      ? 1.0
      : supportLevel === 'Extended Composite'
      ? 1.15
      : 1.32;

  const intensityAdjustment = ((primaryValue + secondaryValue) / 200) * 1800;
  const hyperbaricFee = includeHyperbaricRecovery ? 2400 : 0;

  const calculatedTotalUSD = Math.round(
    (matchedProcedure.baseFeeUSD * complexityMultiplier +
      matchedProcedure.orSuiteFeeUSD +
      matchedProcedure.anesthesiaFeeUSD +
      intensityAdjustment +
      hyperbaricFee) /
      50
  ) * 50;

  const baseRecoveryDays =
    matchedProcedure.id === 'deep-plane-facelift'
      ? 13
      : matchedProcedure.id === 'ultrasonic-rhinoplasty'
      ? 9
      : matchedProcedure.id === 'hd-torso-liposculpture'
      ? 8
      : 6;

  const estimatedSocialRecoveryDays = Math.max(
    4,
    baseRecoveryDays +
      (supportLevel === 'Revision Reconstruction' ? 2 : 0) -
      (includeHyperbaricRecovery ? 2 : 0)
  );

  const isAlreadyInDossier = dossierIds.includes(matchedProcedure.id);

  const handleReset = () => {
    setPrimaryValue(68);
    setSecondaryValue(75);
    setSupportLevel('Extended Composite');
    setIncludeHyperbaricRecovery(true);
    setAppliedConfirmation(false);
  };

  const handleCommitBlueprint = () => {
    const blueprint: CustomPlannerBlueprint = {
      zoneName: activeZone.label,
      recommendedProcedureId: matchedProcedure.id,
      recommendedProcedureTitle: matchedProcedure.title,
      refinementIntensity: Math.round((primaryValue + secondaryValue) / 2),
      structuralSupportLevel: supportLevel,
      recoveryAccelerators: includeHyperbaricRecovery,
      estimatedTotalUSD: calculatedTotalUSD,
      estimatedSocialRecoveryDays,
      phiHarmonyTarget: activeZone.idealPhiMetric,
    };
    onApplyBlueprintToDossier(matchedProcedure, blueprint);
    setAppliedConfirmation(true);
    setTimeout(() => setAppliedConfirmation(false), 3500);
  };

  return (
    <section
      id="planner"
      className="py-24 px-6 lg:px-12 border-t border-[#D4AF37]/15 bg-[#1B070C]"
    >
      <div className="max-w-[1240px] mx-auto">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-14">
          <div>
            <p className="text-xs text-[#D4AF37] tracking-wider mb-3">
              02. Interactive Anatomical & Recovery Simulation
            </p>
            <h2 className="font-serif-display text-3xl sm:text-4xl lg:text-5xl font-normal text-[#FAF6F0] max-w-2xl leading-[1.12]">
              Calibrate Your Proportional Harmony & Surgical Recovery Timeline
            </h2>
          </div>
          <p className="text-sm sm:text-base text-[#C9B8B5] max-w-md leading-relaxed">
            Select an anatomical focus zone below to model Golden Ratio (1:1.618) vector targets,
            anesthesia protocols, recovery acceleration, and transparent surgical fee architecture.
          </p>
        </div>

        {/* Zone Selector Bar */}
        <div
          className="flex flex-wrap items-center gap-2 p-1.5 bg-[#120407] border border-[#D4AF37]/20 rounded-lg mb-10"
          role="tablist"
          aria-label="Anatomical Focus Zones"
        >
          {ANATOMICAL_ZONES.map((zone) => {
            const isSelected = zone.id === selectedZoneId;
            return (
              <button
                key={zone.id}
                role="tab"
                aria-selected={isSelected}
                onClick={() => {
                  setSelectedZoneId(zone.id);
                  setAppliedConfirmation(false);
                }}
                className={`px-4 py-2.5 text-xs sm:text-sm font-semibold rounded-md transition-all duration-150 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-[#D4AF37] ${
                  isSelected
                    ? 'bg-[#D4AF37] text-[#16060A] shadow-sm'
                    : 'text-[#C9B8B5] hover:text-[#FAF6F0] hover:bg-[#260B12]'
                }`}
              >
                {zone.label}
              </button>
            );
          })}
        </div>

        {/* Main Interactive Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left Column: Interactive Phi Proportion SVG Architectural Diagram */}
          <div className="lg:col-span-5 bg-[#220A11] border border-[#D4AF37]/20 rounded-xl p-6 sm:p-8 flex flex-col justify-between">
            <div className="flex items-center justify-between border-b border-[#D4AF37]/15 pb-4 mb-6">
              <div>
                <h3 className="font-serif-display text-xl text-[#FAF6F0]">
                  Phi Vector Topography
                </h3>
                <p className="text-xs text-[#9E8885] mt-0.5">
                  Click any anatomical node to switch focus region
                </p>
              </div>
              <span className="font-mono-tabular text-xs text-[#D4AF37]">
                1 : 1.618
              </span>
            </div>

            {/* Interactive SVG Diagram */}
            <div className="relative flex items-center justify-center my-auto py-2">
              <svg
                viewBox="0 0 400 420"
                className="w-full max-w-[340px] h-auto select-none"
                role="img"
                aria-label="Interactive Golden Ratio Anatomical Proportion Diagram"
              >
                <defs>
                  <radialGradient id="goldGlow" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#D4AF37" stopOpacity="0.28" />
                    <stop offset="100%" stopColor="#D4AF37" stopOpacity="0" />
                  </radialGradient>
                </defs>

                {/* Subtle Golden Ratio Phi Grid Lines */}
                <g stroke="#D4AF37" strokeOpacity="0.18" strokeWidth="0.75">
                  <rect x="40" y="20" width="320" height="380" fill="none" />
                  <line x1="200" y1="20" x2="200" y2="400" strokeDasharray="3 3" />
                  <line x1="40" y1="142" x2="360" y2="142" strokeDasharray="2 4" />
                  <line x1="40" y1="198" x2="360" y2="198" strokeDasharray="2 4" />
                  <line x1="40" y1="265" x2="360" y2="265" strokeDasharray="2 4" />
                  <circle cx="200" cy="175" r="95" fill="none" />
                  <circle cx="200" cy="175" r="58" fill="none" strokeDasharray="2 2" />
                </g>

                {/* Active Zone Highlight Halo */}
                <circle
                  cx={activeZone.svgCoords.cx}
                  cy={activeZone.svgCoords.cy}
                  r={44 + (primaryValue - 50) * 0.25}
                  fill="url(#goldGlow)"
                />

                {/* Classical Architectural Craniofacial & Torso Contour Lines */}
                <g
                  fill="none"
                  stroke="#FAF6F0"
                  strokeOpacity="0.75"
                  strokeWidth="1.4"
                  strokeLinecap="round"
                >
                  {/* Cranial & Facial Ogee Silhouette */}
                  <path d="M200 48 C148 48 124 88 128 142 C131 182 142 222 162 246 C176 262 188 270 200 270 C212 270 224 262 238 246 C258 222 269 182 272 142 C276 88 252 48 200 48 Z" />
                  {/* Brow & Nasal Bridge Vector */}
                  <path
                    d={`M150 132 Q175 124 194 134 L194 ${180 - (primaryValue - 50) * 0.08} Q200 188 206 ${180 - (primaryValue - 50) * 0.08} L206 134 Q225 124 250 132`}
                    stroke="#D4AF37"
                    strokeWidth="1.8"
                  />
                  {/* Periorbital Contours */}
                  <path d="M152 145 Q168 137 184 145 Q168 151 152 145 Z" />
                  <path d="M216 145 Q232 137 248 145 Q232 151 216 145 Z" />
                  {/* Malar & Cheek Ogee Curve */}
                  <path
                    d="M136 168 Q156 188 172 215"
                    stroke="#D4AF37"
                    strokeOpacity="0.65"
                  />
                  <path
                    d="M264 168 Q244 188 228 215"
                    stroke="#D4AF37"
                    strokeOpacity="0.65"
                  />
                  {/* Lips & Mentum */}
                  <path d="M180 218 Q200 212 220 218 Q200 227 180 218 Z" />
                  {/* Neck & Clavicular / Torso Architecture */}
                  <path d="M168 255 L162 300 L102 322 C108 355 125 385 142 392" />
                  <path d="M232 255 L238 300 L298 322 C292 355 275 385 258 392" />
                  {/* Dual-Plane Torso / Cleavage Proportion Arcs */}
                  <path
                    d="M138 334 Q170 375 196 346"
                    stroke="#D4AF37"
                    strokeOpacity="0.6"
                  />
                  <path
                    d="M262 334 Q230 375 204 346"
                    stroke="#D4AF37"
                    strokeOpacity="0.6"
                  />
                </g>

                {/* Dynamic Caliper Measurement Callout */}
                <g>
                  <line
                    x1={activeZone.svgCoords.cx}
                    y1={activeZone.svgCoords.cy}
                    x2="335"
                    y2={activeZone.svgCoords.cy - 18}
                    stroke="#D4AF37"
                    strokeWidth="1"
                  />
                  <circle
                    cx="335"
                    cy={activeZone.svgCoords.cy - 18}
                    r="2.5"
                    fill="#D4AF37"
                  />
                </g>

                {/* Interactive Anatomical Nodes */}
                {ANATOMICAL_ZONES.map((zone) => {
                  const isCurrent = zone.id === selectedZoneId;
                  return (
                    <g
                      key={zone.id}
                      onClick={() => {
                        setSelectedZoneId(zone.id);
                        setAppliedConfirmation(false);
                      }}
                      className="cursor-pointer"
                    >
                      <circle
                        cx={zone.svgCoords.cx}
                        cy={zone.svgCoords.cy}
                        r={isCurrent ? 12 : 8}
                        fill={isCurrent ? '#D4AF37' : '#16060A'}
                        stroke="#D4AF37"
                        strokeWidth={isCurrent ? '2.5' : '1.5'}
                        fillOpacity={isCurrent ? '0.25' : '0.85'}
                      />
                      <circle
                        cx={zone.svgCoords.cx}
                        cy={zone.svgCoords.cy}
                        r={isCurrent ? 4.5 : 3}
                        fill={isCurrent ? '#D4AF37' : '#FAF6F0'}
                      />
                    </g>
                  );
                })}
              </svg>
            </div>

            {/* Active Anatomical Metric Readout */}
            <div className="border-t border-[#D4AF37]/15 pt-4 mt-4">
              <div className="text-xs text-[#9E8885] mb-1">
                Active Anatomical Focus · {activeZone.anatomicalRegion}
              </div>
              <div className="font-mono-tabular text-xs sm:text-sm text-[#D4AF37] font-semibold">
                {activeZone.idealPhiMetric}
              </div>
              <p className="text-xs text-[#C9B8B5] mt-2 leading-relaxed">
                {activeZone.clinicalRationale}
              </p>
            </div>
          </div>

          {/* Right Column: Parameter Controls & Real-Time Clinical Blueprint */}
          <div className="lg:col-span-7 bg-[#220A11] border border-[#D4AF37]/20 rounded-xl p-6 sm:p-8 flex flex-col justify-between">
            <div>
              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#D4AF37]/15 pb-5 mb-6">
                <div>
                  <span className="text-xs text-[#D4AF37] block mb-1">
                    Recommended Primary Protocol
                  </span>
                  <h3 className="font-serif-display text-2xl sm:text-3xl text-[#FAF6F0]">
                    {matchedProcedure.title}
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={handleReset}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs text-[#C9B8B5] hover:text-[#FAF6F0] border border-[#D4AF37]/20 rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  Reset Calibration
                </button>
              </div>

              {/* Interactive Sliders */}
              <div className="space-y-6 mb-8">
                <div>
                  <div className="flex items-center justify-between text-xs sm:text-sm mb-2">
                    <label
                      htmlFor="primary-slider"
                      className="text-[#FAF6F0] font-semibold flex items-center gap-2"
                    >
                      <Sliders className="w-3.5 h-3.5 text-[#D4AF37]" />
                      {activeZone.primarySliderLabel}
                    </label>
                    <span className="font-mono-tabular text-xs text-[#D4AF37] font-semibold">
                      {primaryValue}% Precision Vector
                    </span>
                  </div>
                  <input
                    id="primary-slider"
                    type="range"
                    min={30}
                    max={95}
                    value={primaryValue}
                    onChange={(e) => setPrimaryValue(Number(e.target.value))}
                    className="w-full h-1.5 bg-[#120407] rounded-lg appearance-none cursor-pointer accent-[#D4AF37]"
                  />
                  <div className="flex justify-between text-[11px] text-[#9E8885] mt-1">
                    <span>Conservative Micro-Refinement</span>
                    <span>Balanced Phi Harmony</span>
                    <span>High-Definition Sculpting</span>
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between text-xs sm:text-sm mb-2">
                    <label
                      htmlFor="secondary-slider"
                      className="text-[#FAF6F0] font-semibold"
                    >
                      {activeZone.secondarySliderLabel}
                    </label>
                    <span className="font-mono-tabular text-xs text-[#D4AF37] font-semibold">
                      {secondaryValue}% Structural Calibration
                    </span>
                  </div>
                  <input
                    id="secondary-slider"
                    type="range"
                    min={35}
                    max={95}
                    value={secondaryValue}
                    onChange={(e) => setSecondaryValue(Number(e.target.value))}
                    className="w-full h-1.5 bg-[#120407] rounded-lg appearance-none cursor-pointer accent-[#D4AF37]"
                  />
                </div>
              </div>

              {/* Structural Support Tier Selection */}
              <div className="mb-6">
                <span className="block text-xs text-[#C9B8B5] mb-2.5">
                  Surgical Complexity & Tissue Architecture Tier
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                  {(
                    [
                      'Standard Autologous',
                      'Extended Composite',
                      'Revision Reconstruction',
                    ] as const
                  ).map((tier) => {
                    const active = supportLevel === tier;
                    return (
                      <button
                        key={tier}
                        type="button"
                        onClick={() => setSupportLevel(tier)}
                        className={`px-3.5 py-2.5 rounded-lg text-xs font-semibold text-left border transition-all cursor-pointer whitespace-nowrap truncate ${
                          active
                            ? 'bg-[#D4AF37]/15 border-[#D4AF37] text-[#FAF6F0]'
                            : 'bg-[#16060A] border-[#D4AF37]/15 text-[#C9B8B5] hover:border-[#D4AF37]/40'
                        }`}
                      >
                        {tier}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Post-Operative Recovery Acceleration Toggle */}
              <div className="flex items-center justify-between py-3.5 px-4 rounded-lg bg-[#16060A] border border-[#D4AF37]/15 mb-8">
                <div>
                  <div className="text-xs sm:text-sm font-semibold text-[#FAF6F0]">
                    Hyperbaric Oxygen & Daily Manual Lymphatic Suite
                  </div>
                  <div className="text-xs text-[#9E8885]">
                    Reduces social recovery window by ~2 days via post-op cellular oxygenation
                  </div>
                </div>
                <button
                  type="button"
                  role="switch"
                  aria-checked={includeHyperbaricRecovery}
                  onClick={() => setIncludeHyperbaricRecovery(!includeHyperbaricRecovery)}
                  className={`px-3.5 py-1.5 rounded-md text-xs font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                    includeHyperbaricRecovery
                      ? 'bg-[#D4AF37] text-[#16060A]'
                      : 'bg-[#2B0E16] text-[#C9B8B5] border border-[#D4AF37]/25'
                  }`}
                >
                  {includeHyperbaricRecovery ? 'Included (+$2,400)' : 'Add Protocol'}
                </button>
              </div>
            </div>

            {/* Output Summary & CTA */}
            <div className="border-t border-[#D4AF37]/20 pt-6">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
                <div>
                  <span className="block text-xs text-[#9E8885]">Operating Room</span>
                  <span className="font-mono-tabular text-base sm:text-lg font-semibold text-[#FAF6F0]">
                    {matchedProcedure.surgicalDurationHours.toFixed(1)} hrs
                  </span>
                </div>
                <div>
                  <span className="block text-xs text-[#9E8885]">Social Recovery</span>
                  <span className="font-mono-tabular text-base sm:text-lg font-semibold text-[#FAF6F0]">
                    {estimatedSocialRecoveryDays} Days
                  </span>
                </div>
                <div>
                  <span className="block text-xs text-[#9E8885]">OR & Anesthesia</span>
                  <span className="font-mono-tabular text-base sm:text-lg font-semibold text-[#FAF6F0]">
                    ${(matchedProcedure.orSuiteFeeUSD + matchedProcedure.anesthesiaFeeUSD).toLocaleString()}
                  </span>
                </div>
                <div>
                  <span className="block text-xs text-[#9E8885]">Total Estimated Fee</span>
                  <span className="font-mono-tabular text-base sm:text-lg font-semibold text-[#D4AF37]">
                    ${calculatedTotalUSD.toLocaleString()}
                  </span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="text-xs text-[#9E8885]">
                  Includes accredited AAAASF operating suite, board-certified MD anesthesiologist,
                  and 12 months of post-operative follow-up.
                </div>
                <button
                  type="button"
                  onClick={handleCommitBlueprint}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#D4AF37] hover:bg-[#E5C558] text-[#16060A] font-semibold text-xs sm:text-sm rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                >
                  {appliedConfirmation ? (
                    <>
                      <Check className="w-4 h-4" />
                      Saved to Surgical Dossier
                    </>
                  ) : isAlreadyInDossier ? (
                    <>
                      <Check className="w-4 h-4" />
                      Update Blueprint in Dossier
                    </>
                  ) : (
                    <>
                      Attach Blueprint to Dossier
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
