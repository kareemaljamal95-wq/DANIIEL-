import React, { useState } from 'react';
import { CLINICAL_CASE_OUTCOMES, ClinicalCaseOutcome } from '../data/proceduresData';
import { ResilientImage } from './ResilientImage';
import { SlidersHorizontal, ArrowUpRight } from 'lucide-react';

interface CaseOutcomesSectionProps {
  onSelectCaseForConsultation: (clinicalCase: ClinicalCaseOutcome) => void;
}

export const CaseOutcomesSection: React.FC<CaseOutcomesSectionProps> = ({
  onSelectCaseForConsultation,
}) => {
  const [activeCaseId, setActiveCaseId] = useState<string>(CLINICAL_CASE_OUTCOMES[0].id);
  const [comparisonStage, setComparisonStage] = useState<number>(82);

  const currentCase =
    CLINICAL_CASE_OUTCOMES.find((c) => c.id === activeCaseId) ||
    CLINICAL_CASE_OUTCOMES[0];

  return (
    <section
      id="outcomes"
      className="py-24 px-6 lg:px-12 border-t border-[#D4AF37]/15 bg-[#16060A]"
    >
      <div className="max-w-[1240px] mx-auto">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-14">
          <div>
            <p className="text-xs text-[#D4AF37] tracking-wider mb-3">
              03. Verified Clinical Outcomes & Case Architecture
            </p>
            <h2 className="font-serif-display text-3xl sm:text-4xl lg:text-5xl font-normal text-[#FAF6F0] max-w-2xl leading-[1.12]">
              Quantified Post-Operative Harmony & Patient Evidence
            </h2>
          </div>
          <p className="text-sm sm:text-base text-[#C9B8B5] max-w-md leading-relaxed">
            Every surgical procedure at Atelier Daniel is benchmarked via 3D stereophotogrammetry,
            acoustic rhinometry, and long-term anatomical stability audits at 9 to 14 months.
          </p>
        </div>

        {/* Case Study Selector Tabs */}
        <div className="flex flex-wrap items-center gap-2 mb-10">
          {CLINICAL_CASE_OUTCOMES.map((item, idx) => {
            const isSelected = item.id === activeCaseId;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setActiveCaseId(item.id)}
                className={`px-4 py-2.5 rounded-lg text-xs sm:text-sm font-semibold border transition-all whitespace-nowrap shrink-0 cursor-pointer ${
                  isSelected
                    ? 'bg-[#D4AF37] text-[#16060A] border-[#D4AF37]'
                    : 'bg-[#210A10] text-[#C9B8B5] border-[#D4AF37]/20 hover:border-[#D4AF37]/50 hover:text-[#FAF6F0]'
                }`}
              >
                0{idx + 1}. {item.category} ({item.followUpInterval})
              </button>
            );
          })}
        </div>

        {/* Active Case Study Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left 5 Columns: Visual Portrait & Interactive Structural Vector Overlay */}
          <div className="lg:col-span-5 bg-[#210A10] border border-[#D4AF37]/20 rounded-xl overflow-hidden">
            <div className="relative aspect-[4/3] overflow-hidden bg-[#120407]">
              <ResilientImage
                src={currentCase.image}
                alt={currentCase.procedureTitle}
                fallbackTitle={currentCase.procedureTitle}
                className="w-full h-full object-cover"
              />
              {/* Measured Contrast Scrim */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#16060A] via-[#16060A]/30 to-transparent" />

              {/* Interactive Anatomical Vector Overlay Controlled by Slider */}
              <svg
                viewBox="0 0 400 300"
                className="absolute inset-0 w-full h-full pointer-events-none"
                aria-hidden="true"
              >
                {/* Pre-Op Baseline Vector (Dashed Muted Rose) */}
                <g
                  opacity={Math.max(0.15, (100 - comparisonStage) / 100)}
                  stroke="#E29587"
                  strokeWidth="1.5"
                  strokeDasharray="4 4"
                  fill="none"
                >
                  <path d="M140 60 Q188 135 162 215" />
                  <line x1="115" y1="145" x2="275" y2="145" />
                </g>

                {/* Post-Op Golden Ratio Target Vector (Solid Champagne Gold) */}
                <g
                  opacity={Math.max(0.25, comparisonStage / 100)}
                  stroke="#D4AF37"
                  strokeWidth="1.8"
                  fill="none"
                >
                  <path d="M148 58 Q175 135 172 215" />
                  <circle cx="173" cy="138" r="28" strokeOpacity="0.55" />
                  <line x1="115" y1="138" x2="285" y2="138" strokeOpacity="0.6" />
                </g>
              </svg>

              {/* Bottom Caption inside Media Frame */}
              <div className="absolute bottom-4 left-5 right-5 flex items-end justify-between gap-4">
                <div>
                  <div className="font-mono-tabular text-xs text-[#D4AF37]">
                    {currentCase.caseCode} · {currentCase.followUpInterval}
                  </div>
                  <div className="text-sm font-semibold text-[#FAF6F0] mt-0.5">
                    {currentCase.patientProfile}
                  </div>
                </div>
                <span className="font-mono-tabular text-xs text-[#FAF6F0]/90">
                  Phi Overlay: {comparisonStage}%
                </span>
              </div>
            </div>

            {/* Interactive Vector Inspection Slider */}
            <div className="p-6">
              <div className="flex items-center justify-between text-xs mb-2">
                <label
                  htmlFor="vector-comparison-range"
                  className="text-[#C9B8B5] font-semibold flex items-center gap-1.5"
                >
                  <SlidersHorizontal className="w-3.5 h-3.5 text-[#D4AF37]" />
                  Pre-Op Baseline vs. Post-Op Phi Vector Alignment
                </label>
                <span className="font-mono-tabular text-[#D4AF37]">
                  {comparisonStage < 50 ? 'Baseline Pre-Op' : '12M Post-Op Result'}
                </span>
              </div>
              <input
                id="vector-comparison-range"
                type="range"
                min={0}
                max={100}
                value={comparisonStage}
                onChange={(e) => setComparisonStage(Number(e.target.value))}
                className="w-full h-1.5 bg-[#120407] rounded-lg appearance-none cursor-pointer accent-[#D4AF37]"
              />

              {/* Quantitative Before / After Biometric Comparison Table */}
              <div className="mt-6 pt-5 border-t border-[#D4AF37]/15">
                <div className="grid grid-cols-3 text-[11px] text-[#9E8885] pb-2 border-b border-[#D4AF37]/10">
                  <span>Anatomical Parameter</span>
                  <span>Pre-Op Baseline</span>
                  <span className="text-right text-[#D4AF37]">Post-Op Verified</span>
                </div>
                <div className="divide-y divide-[#D4AF37]/10 text-xs font-mono-tabular">
                  <div className="py-2.5 grid grid-cols-3 items-center gap-2">
                    <span className="font-sans text-[#C9B8B5]">Primary Angle</span>
                    <span className="text-[#9E8885]">{currentCase.beforeMetrics.nasofacialAngle}</span>
                    <span className="text-right text-[#FAF6F0]">
                      {currentCase.afterMetrics.nasofacialAngle}
                    </span>
                  </div>
                  <div className="py-2.5 grid grid-cols-3 items-center gap-2">
                    <span className="font-sans text-[#C9B8B5]">Contour Vector</span>
                    <span className="text-[#9E8885]">
                      {currentCase.beforeMetrics.cervicomentalAngle}
                    </span>
                    <span className="text-right text-[#FAF6F0]">
                      {currentCase.afterMetrics.cervicomentalAngle}
                    </span>
                  </div>
                  <div className="py-2.5 grid grid-cols-3 items-center gap-2">
                    <span className="font-sans text-[#C9B8B5]">Symmetry Index</span>
                    <span className="text-[#9E8885]">{currentCase.beforeMetrics.symmetryIndex}</span>
                    <span className="text-right text-[#D4AF37] font-semibold">
                      {currentCase.afterMetrics.symmetryIndex}
                    </span>
                  </div>
                  <div className="py-2.5 grid grid-cols-3 items-center gap-2">
                    <span className="font-sans text-[#C9B8B5]">Functional Metric</span>
                    <span className="text-[#9E8885]">{currentCase.beforeMetrics.airwayPatency}</span>
                    <span className="text-right text-[#FAF6F0]">
                      {currentCase.afterMetrics.airwayPatency}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right 7 Columns: Clinical Narrative, Quantitative Proof & Attributable Testimonial */}
          <div className="lg:col-span-7 bg-[#210A10] border border-[#D4AF37]/20 rounded-xl p-6 sm:p-9 flex flex-col justify-between">
            <div>
              {/* Unboxed Metadata Line */}
              <div className="flex flex-wrap items-center gap-2 text-xs text-[#9E8885] mb-3">
                <span className="text-[#D4AF37] font-mono-tabular">{currentCase.caseCode}</span>
                <span aria-hidden="true">·</span>
                <span>{currentCase.category}</span>
                <span aria-hidden="true">·</span>
                <span>{currentCase.followUpInterval}</span>
              </div>

              <h3 className="font-serif-display text-2xl sm:text-3xl text-[#FAF6F0] mb-6">
                {currentCase.procedureTitle}
              </h3>

              {/* Quantified Impact Callout Pair */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-5 rounded-lg bg-[#16060A] border border-[#D4AF37]/20 mb-8">
                <div>
                  <span className="block text-xs text-[#9E8885] mb-1">
                    {currentCase.primaryMetricLabel}
                  </span>
                  <span className="font-mono-tabular text-lg sm:text-xl font-semibold text-[#D4AF37]">
                    {currentCase.primaryMetricValue}
                  </span>
                </div>
                <div className="sm:border-l sm:border-[#D4AF37]/15 sm:pl-5">
                  <span className="block text-xs text-[#9E8885] mb-1">
                    {currentCase.secondaryMetricLabel}
                  </span>
                  <span className="font-mono-tabular text-lg sm:text-xl font-semibold text-[#FAF6F0]">
                    {currentCase.secondaryMetricValue}
                  </span>
                </div>
              </div>

              {/* 3-Stage Clinical Documentation */}
              <div className="space-y-5 mb-8">
                <div>
                  <h4 className="text-xs font-semibold text-[#D4AF37] mb-1">
                    01. Pre-Operative Anatomical Baseline
                  </h4>
                  <p className="text-sm text-[#C9B8B5] leading-relaxed">
                    {currentCase.preOpAssessment}
                  </p>
                </div>
                <div>
                  <h4 className="text-xs font-semibold text-[#D4AF37] mb-1">
                    02. Operative Technique & Structural Architecture
                  </h4>
                  <p className="text-sm text-[#C9B8B5] leading-relaxed">
                    {currentCase.surgicalExecution}
                  </p>
                </div>
                <div>
                  <h4 className="text-xs font-semibold text-[#D4AF37] mb-1">
                    03. Long-Term Verified Outcome
                  </h4>
                  <p className="text-sm text-[#C9B8B5] leading-relaxed">
                    {currentCase.postOpOutcome}
                  </p>
                </div>
              </div>
            </div>

            {/* Attributable Patient Testimonial */}
            <div className="border-t border-[#D4AF37]/20 pt-6">
              <blockquote className="font-serif-display italic text-lg sm:text-xl text-[#FAF6F0] leading-relaxed mb-4">
                “{currentCase.testimonialQuote}”
              </blockquote>
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="text-xs text-[#9E8885]">
                  <strong className="text-[#FAF6F0] font-semibold">
                    {currentCase.patientAttribution}
                  </strong>
                  <span className="mx-2" aria-hidden="true">
                    ·
                  </span>
                  <span>{currentCase.patientLocation}</span>
                </div>

                <button
                  type="button"
                  onClick={() => onSelectCaseForConsultation(currentCase)}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#D4AF37] hover:text-[#E5C558] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                >
                  Request Similar Case Review in Consultation
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
