/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import {
  ArrowRight,
  Check,
  Plus,
  Search,
  BookOpen,
  FolderHeart,
} from 'lucide-react';
import {
  BRAND_IMAGES,
  SURGICAL_PROCEDURES,
  ProcedureCategory,
  SurgicalProcedure,
  ClinicalCaseOutcome,
} from './data/proceduresData';
import { ResilientImage } from './components/ResilientImage';
import {
  InteractivePlanner,
  CustomPlannerBlueprint,
} from './components/InteractivePlanner';
import { CaseOutcomesSection } from './components/CaseOutcomesSection';
import {
  ProcedureDetailModal,
  DossierDrawerModal,
} from './components/ProcedureDetailModal';
import { ConsultationSection } from './components/ConsultationSection';

const CATEGORIES: ProcedureCategory[] = [
  'All Disciplines',
  'Facial Sculpture',
  'Nasal Architecture',
  'Body & Breast',
  'Regenerative Atelier',
];

export default function App() {
  const [selectedCategory, setSelectedCategory] =
    useState<ProcedureCategory>('All Disciplines');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<'index' | 'duration' | 'investment'>('index');

  // Personal Surgical Dossier State
  const [dossierIds, setDossierIds] = useState<string[]>(['ultrasonic-rhinoplasty']);
  const [customBlueprint, setCustomBlueprint] =
    useState<CustomPlannerBlueprint | null>(null);
  const [referencedCase, setReferencedCase] =
    useState<ClinicalCaseOutcome | null>(null);

  // Active Modals
  const [activeMonographProcedure, setActiveMonographProcedure] =
    useState<SurgicalProcedure | null>(null);
  const [isDossierOpen, setIsDossierOpen] = useState<boolean>(false);

  // Active Maison Pillar Tab
  const [activeMaisonTab, setActiveMaisonTab] = useState<
    'credential' | 'accreditation' | 'aftercare'
  >('credential');

  const filteredProcedures = useMemo(() => {
    return SURGICAL_PROCEDURES.filter((proc) => {
      const matchesCategory =
        selectedCategory === 'All Disciplines' ||
        proc.category === selectedCategory;
      const q = searchQuery.trim().toLowerCase();
      const matchesQuery =
        !q ||
        proc.title.toLowerCase().includes(q) ||
        proc.subtitle.toLowerCase().includes(q) ||
        proc.anatomicalFocus.toLowerCase().includes(q);
      return matchesCategory && matchesQuery;
    }).sort((a, b) => {
      if (sortBy === 'duration') {
        return a.surgicalDurationHours - b.surgicalDurationHours;
      }
      if (sortBy === 'investment') {
        const totalA = a.baseFeeUSD + a.orSuiteFeeUSD + a.anesthesiaFeeUSD;
        const totalB = b.baseFeeUSD + b.orSuiteFeeUSD + b.anesthesiaFeeUSD;
        return totalA - totalB;
      }
      return a.indexNumber.localeCompare(b.indexNumber);
    });
  }, [selectedCategory, searchQuery, sortBy]);

  const dossierProcedures = useMemo(
    () => SURGICAL_PROCEDURES.filter((p) => dossierIds.includes(p.id)),
    [dossierIds]
  );

  const handleToggleDossier = (procedure: SurgicalProcedure) => {
    setDossierIds((prev) =>
      prev.includes(procedure.id)
        ? prev.filter((id) => id !== procedure.id)
        : [...prev, procedure.id]
    );
  };

  const handleApplyBlueprintToDossier = (
    procedure: SurgicalProcedure,
    blueprint: CustomPlannerBlueprint
  ) => {
    setCustomBlueprint(blueprint);
    setDossierIds((prev) =>
      prev.includes(procedure.id) ? prev : [...prev, procedure.id]
    );
  };

  const scrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectCaseForConsultation = (clinicalCase: ClinicalCaseOutcome) => {
    setReferencedCase(clinicalCase);
    scrollToSection('consultation');
  };

  return (
    <div id="top" className="min-h-screen bg-[#16060A] text-[#FAF6F0]">
      {/* Strict 3-Zone Top Bar Contract */}
      <header className="sticky top-0 z-40 flex items-center justify-between px-6 lg:px-12 py-4 bg-[#16060A]/95 backdrop-blur-md border-b border-[#D4AF37]/20">
        {/* Zone 1: Single text element wordmark */}
        <a
          href="#top"
          className="font-serif-display text-2xl font-semibold tracking-[0.18em] text-[#FAF6F0] hover:text-[#D4AF37] transition-colors whitespace-nowrap shrink-0"
        >
          DANIEL
        </a>

        {/* Zone 2: 5 clean text navigation links */}
        <nav
          aria-label="Primary Navigation"
          className="hidden md:flex items-center gap-8 text-xs sm:text-sm font-normal text-[#C9B8B5]"
        >
          <a
            href="#procedures"
            className="hover:text-[#D4AF37] underline-offset-8 hover:underline transition-colors whitespace-nowrap"
          >
            Procedures
          </a>
          <a
            href="#planner"
            className="hover:text-[#D4AF37] underline-offset-8 hover:underline transition-colors whitespace-nowrap"
          >
            Aesthetic Planner
          </a>
          <a
            href="#outcomes"
            className="hover:text-[#D4AF37] underline-offset-8 hover:underline transition-colors whitespace-nowrap"
          >
            Clinical Outcomes
          </a>
          <a
            href="#maison"
            className="hover:text-[#D4AF37] underline-offset-8 hover:underline transition-colors whitespace-nowrap"
          >
            The Maison
          </a>
          <a
            href="#consultation"
            className="hover:text-[#D4AF37] underline-offset-8 hover:underline transition-colors whitespace-nowrap"
          >
            Consultation
          </a>
        </nav>

        {/* Zone 3: 1-2 primary actions */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setIsDossierOpen(true)}
            className="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-semibold text-[#FAF6F0] bg-[#240B12] border border-[#D4AF37]/35 rounded-lg hover:border-[#D4AF37] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            <FolderHeart className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>Dossier ({dossierIds.length})</span>
          </button>

          <button
            type="button"
            onClick={() => scrollToSection('consultation')}
            className="px-4 py-2 text-xs font-semibold text-[#16060A] bg-[#D4AF37] hover:bg-[#E5C558] rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            Private Consultation
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-10 pb-20 lg:py-24 px-6 lg:px-12 overflow-hidden">
        <div className="max-w-[1240px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            {/* Left 6 Columns: Editorial Proposition & Regional / Clinical Trust Markers */}
            <div className="lg:col-span-6 z-10">
              <div className="flex flex-wrap items-center gap-2 text-xs text-[#D4AF37] mb-5">
                <span>Fellow of the American College of Surgeons</span>
                <span aria-hidden="true">·</span>
                <span>Beverly Hills &amp; Geneva</span>
                <span aria-hidden="true">·</span>
                <span>AAAASF Accredited</span>
              </div>

              <h1 className="font-serif-display text-4xl sm:text-5xl lg:text-[58px] font-normal text-[#FAF6F0] leading-[1.08] tracking-tight mb-6 max-w-2xl">
                Sculptural Plastic Surgery Calibrated to Millimeter Proportion
              </h1>

              <p className="text-base sm:text-lg text-[#C9B8B5] leading-relaxed mb-8 max-w-xl">
                Dr. Daniel unites craniofacial micro-precision with ultrasonic bone
                preservation and sub-SMAS deep-plane anatomy—delivering unoperated,
                enduring harmony across facial, nasal, and breast architecture.
              </p>

              {/* Single Primary CTA + Secondary Action */}
              <div className="flex flex-wrap items-center gap-4 mb-12">
                <button
                  type="button"
                  onClick={() => scrollToSection('consultation')}
                  className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-lg bg-[#D4AF37] hover:bg-[#E5C558] text-[#16060A] font-semibold text-sm transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                >
                  Schedule Private Consultation
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  type="button"
                  onClick={() => scrollToSection('planner')}
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-lg bg-[#220A11] hover:bg-[#2C0E17] text-[#FAF6F0] border border-[#D4AF37]/30 text-sm font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                >
                  Launch Aesthetic Planner
                </button>
              </div>

              {/* Unboxed Quantitative Clinical Benchmarks */}
              <div className="grid grid-cols-3 gap-6 pt-8 border-t border-[#D4AF37]/20">
                <div>
                  <div className="font-mono-tabular text-2xl sm:text-3xl font-semibold text-[#D4AF37]">
                    2,400+
                  </div>
                  <div className="text-xs text-[#9E8885] mt-1">
                    Deep-Plane &amp; Piezo Procedures Performed
                  </div>
                </div>
                <div>
                  <div className="font-mono-tabular text-2xl sm:text-3xl font-semibold text-[#FAF6F0]">
                    99.4%
                  </div>
                  <div className="text-xs text-[#9E8885] mt-1">
                    12-Month Anatomical Symmetry Retention
                  </div>
                </div>
                <div>
                  <div className="font-mono-tabular text-2xl sm:text-3xl font-semibold text-[#FAF6F0]">
                    1 : 1
                  </div>
                  <div className="text-xs text-[#9E8885] mt-1">
                    Single-Surgery Daily Operating Dedication
                  </div>
                </div>
              </div>
            </div>

            {/* Right 6 Columns: High-Impact 16:9 Architectural Hero Showcase */}
            <div className="lg:col-span-6">
              <div className="relative rounded-xl overflow-hidden border border-[#D4AF37]/30 bg-[#210A10] shadow-2xl">
                <div className="aspect-[16/10] sm:aspect-[16/9] w-full relative">
                  <ResilientImage
                    src={BRAND_IMAGES.heroAtelier}
                    alt="Atelier Daniel Private Surgical Consultation Sanctuary in Burgundy and Brushed Gold"
                    fallbackTitle="Atelier Daniel Surgical Sanctuary"
                    className="w-full h-full object-cover"
                  />
                  {/* Measured Contrast Scrim */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#16060A] via-[#16060A]/25 to-transparent" />

                  {/* Bottom Architectural Caption */}
                  <div className="absolute bottom-4 left-5 right-5 flex flex-wrap items-end justify-between gap-4">
                    <div>
                      <div className="text-xs text-[#D4AF37] font-mono-tabular">
                        ATELIER DANIEL · PRIVATE CONSULTATION SANCTUARY
                      </div>
                      <div className="font-serif-display text-lg sm:text-xl text-[#FAF6F0]">
                        3D Vectra Stereophotogrammetry &amp; Ultrasonic Suite
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => scrollToSection('procedures')}
                      className="text-xs font-semibold text-[#D4AF37] hover:text-[#E5C558] underline underline-offset-4 cursor-pointer whitespace-nowrap"
                    >
                      Explore 06 Signature Protocols
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 01: Core Surgical Capabilities & Asymmetric Bento Portfolio */}
      <section
        id="procedures"
        className="py-24 px-6 lg:px-12 border-t border-[#D4AF37]/15 bg-[#16060A]"
      >
        <div className="max-w-[1240px] mx-auto">
          {/* Header */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
            <div>
              <p className="text-xs text-[#D4AF37] tracking-wider mb-3">
                01. Surgical Capabilities &amp; Anatomical Portfolio
              </p>
              <h2 className="font-serif-display text-3xl sm:text-4xl lg:text-5xl font-normal text-[#FAF6F0] max-w-2xl leading-[1.12]">
                Bespoke Surgical Protocols Engineered for Natural Longevity
              </h2>
            </div>
            <p className="text-sm sm:text-base text-[#C9B8B5] max-w-md leading-relaxed">
              Dr. Daniel performs a maximum of one major surgical procedure per day,
              ensuring unhurried anatomical dissection and bloodless tissue handling.
            </p>
          </div>

          {/* Interactive Filter & Search Controls */}
          <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4 mb-10">
            {/* Segmented Filter Buttons */}
            <div
              className="flex flex-wrap items-center gap-1.5 p-1.5 bg-[#120407] border border-[#D4AF37]/20 rounded-lg"
              role="tablist"
              aria-label="Filter procedures by surgical discipline"
            >
              {CATEGORIES.map((category) => {
                const active = selectedCategory === category;
                return (
                  <button
                    key={category}
                    type="button"
                    role="tab"
                    aria-selected={active}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-3.5 py-2 text-xs font-semibold rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                      active
                        ? 'bg-[#D4AF37] text-[#16060A]'
                        : 'text-[#C9B8B5] hover:text-[#FAF6F0] hover:bg-[#240B12]'
                    }`}
                  >
                    {category}
                  </button>
                );
              })}
            </div>

            {/* Search & Sort Controls */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <div className="relative flex-1 sm:w-64">
                <Search className="w-4 h-4 text-[#D4AF37] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search procedure or anatomy..."
                  aria-label="Search surgical procedures"
                  className="w-full pl-9 pr-4 py-2 rounded-lg bg-[#210A10] border border-[#D4AF37]/25 text-xs text-[#FAF6F0] placeholder-[#9E8885] focus:outline-none focus:border-[#D4AF37]"
                />
              </div>

              <select
                aria-label="Sort surgical procedures"
                value={sortBy}
                onChange={(e) =>
                  setSortBy(e.target.value as 'index' | 'duration' | 'investment')
                }
                className="px-3.5 py-2 rounded-lg bg-[#210A10] border border-[#D4AF37]/25 text-xs text-[#FAF6F0] focus:outline-none focus:border-[#D4AF37]"
              >
                <option value="index">Sort: Editorial Index (01–06)</option>
                <option value="duration">Sort: Shortest Operative Time</option>
                <option value="investment">Sort: Surgical Investment</option>
              </select>
            </div>
          </div>

          {/* Asymmetric Bento Grid of Procedures */}
          {filteredProcedures.length === 0 ? (
            <div className="p-12 text-center rounded-xl bg-[#210A10] border border-[#D4AF37]/20">
              <p className="font-serif-display text-2xl text-[#FAF6F0] mb-2">
                No Matching Surgical Protocols Found
              </p>
              <p className="text-xs text-[#9E8885] mb-4">
                Try clearing your search filter or selecting All Disciplines.
              </p>
              <button
                type="button"
                onClick={() => {
                  setSelectedCategory('All Disciplines');
                  setSearchQuery('');
                }}
                className="px-4 py-2 text-xs font-semibold bg-[#D4AF37] text-[#16060A] rounded-lg cursor-pointer"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
              {filteredProcedures.map((proc) => {
                const isInDossier = dossierIds.includes(proc.id);
                const allInclusiveFee =
                  proc.baseFeeUSD + proc.orSuiteFeeUSD + proc.anesthesiaFeeUSD;
                const isFeaturedWide =
                  proc.featuredSpan &&
                  selectedCategory === 'All Disciplines' &&
                  !searchQuery;

                return (
                  <article
                    key={proc.id}
                    className={`group rounded-xl bg-[#210A10] border border-[#D4AF37]/20 hover:border-[#D4AF37]/50 transition-all duration-150 overflow-hidden flex flex-col justify-between ${
                      isFeaturedWide ? 'md:col-span-2 lg:col-span-2' : 'col-span-1'
                    }`}
                  >
                    <div>
                      {/* Visual Container */}
                      <div
                        className={`relative overflow-hidden bg-[#120407] ${
                          isFeaturedWide ? 'aspect-[16/9]' : 'aspect-[4/3]'
                        }`}
                      >
                        <ResilientImage
                          src={proc.image}
                          alt={proc.title}
                          fallbackTitle={proc.title}
                          className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-200"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#210A10] via-transparent to-transparent" />
                      </div>

                      {/* Card Content — Leads directly with quiet unboxed text kicker and title */}
                      <div className="p-6 sm:p-7">
                        <div className="flex flex-wrap items-center gap-2 text-xs text-[#9E8885] mb-2">
                          <span className="text-[#D4AF37] font-semibold">
                            {proc.category}
                          </span>
                          <span aria-hidden="true">·</span>
                          <span className="font-mono-tabular">
                            {proc.surgicalDurationHours.toFixed(1)} hrs OR
                          </span>
                          <span aria-hidden="true">·</span>
                          <span className="font-mono-tabular">
                            {proc.socialRecoveryDays} Recovery
                          </span>
                        </div>

                        <h3 className="font-serif-display text-2xl text-[#FAF6F0] mb-2">
                          {proc.title}
                        </h3>

                        <p className="text-xs sm:text-sm text-[#D4AF37]/90 mb-3">
                          {proc.subtitle}
                        </p>

                        <p className="text-xs sm:text-sm text-[#C9B8B5] leading-relaxed">
                          {proc.summary}
                        </p>
                      </div>
                    </div>

                    {/* Card Footer with Tabular Fee & Interactive Actions */}
                    <div className="px-6 sm:px-7 pb-6 pt-4 border-t border-[#D4AF37]/15 flex flex-wrap items-center justify-between gap-4">
                      <div>
                        <span className="block text-[11px] text-[#9E8885]">
                          Comprehensive Surgical Fee
                        </span>
                        <span className="font-mono-tabular text-base font-semibold text-[#FAF6F0]">
                          ${allInclusiveFee.toLocaleString()}
                        </span>
                      </div>

                      <div className="flex items-center gap-2.5">
                        <button
                          type="button"
                          onClick={() => setActiveMonographProcedure(proc)}
                          className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-semibold text-[#FAF6F0] bg-[#16060A] hover:bg-[#2B0E16] border border-[#D4AF37]/25 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                        >
                          <BookOpen className="w-3.5 h-3.5 text-[#D4AF37]" />
                          Monograph
                        </button>

                        <button
                          type="button"
                          onClick={() => handleToggleDossier(proc)}
                          className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                            isInDossier
                              ? 'bg-[#D4AF37] text-[#16060A]'
                              : 'bg-[#2B0E16] text-[#D4AF37] border border-[#D4AF37]/35 hover:border-[#D4AF37]'
                          }`}
                        >
                          {isInDossier ? (
                            <>
                              <Check className="w-3.5 h-3.5" />
                              In Dossier
                            </>
                          ) : (
                            <>
                              <Plus className="w-3.5 h-3.5" />
                              Save
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* Section 02: Interactive Anatomical & Recovery Simulation */}
      <InteractivePlanner
        onApplyBlueprintToDossier={handleApplyBlueprintToDossier}
        dossierIds={dossierIds}
      />

      {/* Section 03: Quantified Clinical Outcomes & Case Architecture */}
      <CaseOutcomesSection
        onSelectCaseForConsultation={handleSelectCaseForConsultation}
      />

      {/* Section 04: The Surgical Maison & Dr. Daniel's Pedigree */}
      <section
        id="maison"
        className="py-24 px-6 lg:px-12 border-t border-[#D4AF37]/15 bg-[#16060A]"
      >
        <div className="max-w-[1240px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left 5 Columns: Editorial Portrait of Dr. Daniel */}
            <div className="lg:col-span-5">
              <div className="rounded-xl overflow-hidden border border-[#D4AF37]/30 bg-[#210A10]">
                <div className="aspect-[3/4] relative">
                  <ResilientImage
                    src={BRAND_IMAGES.drDanielPortrait}
                    alt="Dr. Daniel, MD, FACS — Chief Plastic & Reconstructive Surgeon"
                    fallbackTitle="Dr. Daniel, MD, FACS"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#16060A] via-transparent to-transparent" />
                  <div className="absolute bottom-5 left-6 right-6">
                    <div className="font-mono-tabular text-xs text-[#D4AF37]">
                      CHIEF SURGEON &amp; FOUNDER
                    </div>
                    <div className="font-serif-display text-2xl text-[#FAF6F0]">
                      Dr. Julian Daniel, MD, FACS, FMH
                    </div>
                    <div className="text-xs text-[#C9B8B5] mt-0.5">
                      American Board of Plastic Surgery · Swiss FMH Specialist in Plastic,
                      Reconstructive &amp; Aesthetic Surgery
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right 7 Columns: Surgical Philosophy & Interactive Pedigree Tabs */}
            <div className="lg:col-span-7">
              <p className="text-xs text-[#D4AF37] tracking-wider mb-3">
                04. The Surgical Maison &amp; Clinical Pedigree
              </p>
              <h2 className="font-serif-display text-3xl sm:text-4xl lg:text-5xl font-normal text-[#FAF6F0] leading-[1.12] mb-6 max-w-2xl">
                Where Craniofacial Science Meets Haute-Couture Restraint
              </h2>

              <p className="text-sm sm:text-base text-[#C9B8B5] leading-relaxed mb-6">
                Trained in craniofacial reconstruction at Johns Hopkins Hospital and microvascular
                aesthetic surgery in Zurich and Paris, Dr. Daniel founded Atelier Daniel on a singular
                conviction: the finest plastic surgery leaves zero visual trace of the scalpel—only
                effortless anatomical equilibrium.
              </p>

              {/* Interactive Maison Pillar Selector */}
              <div className="flex flex-wrap items-center gap-2 p-1.5 bg-[#120407] border border-[#D4AF37]/20 rounded-lg mb-6">
                <button
                  type="button"
                  onClick={() => setActiveMaisonTab('credential')}
                  className={`px-4 py-2 rounded-md text-xs font-semibold transition-colors whitespace-nowrap cursor-pointer ${
                    activeMaisonTab === 'credential'
                      ? 'bg-[#D4AF37] text-[#16060A]'
                      : 'text-[#C9B8B5] hover:text-[#FAF6F0]'
                  }`}
                >
                  Academic &amp; Surgical Lineage
                </button>
                <button
                  type="button"
                  onClick={() => setActiveMaisonTab('accreditation')}
                  className={`px-4 py-2 rounded-md text-xs font-semibold transition-colors whitespace-nowrap cursor-pointer ${
                    activeMaisonTab === 'accreditation'
                      ? 'bg-[#D4AF37] text-[#16060A]'
                      : 'text-[#C9B8B5] hover:text-[#FAF6F0]'
                  }`}
                >
                  Hospital-Grade Operating Suites
                </button>
                <button
                  type="button"
                  onClick={() => setActiveMaisonTab('aftercare')}
                  className={`px-4 py-2 rounded-md text-xs font-semibold transition-colors whitespace-nowrap cursor-pointer ${
                    activeMaisonTab === 'aftercare'
                      ? 'bg-[#D4AF37] text-[#16060A]'
                      : 'text-[#C9B8B5] hover:text-[#FAF6F0]'
                  }`}
                >
                  Private Hyperbaric &amp; Nursing Suite
                </button>
              </div>

              {/* Tab Content Surface */}
              <div className="p-6 sm:p-8 rounded-xl bg-[#210A10] border border-[#D4AF37]/20 mb-8">
                {activeMaisonTab === 'credential' && (
                  <div className="space-y-4">
                    <h3 className="font-serif-display text-2xl text-[#FAF6F0]">
                      16 Years of Sub-Specialized Craniofacial &amp; Deep-Plane Mastery
                    </h3>
                    <p className="text-sm text-[#C9B8B5] leading-relaxed">
                      Dr. Daniel serves as Visiting Lecturer in Ultrasonic Rhinoplasty and Deep-Plane
                      Facial Anatomy across international symposiums in Monaco, Geneva, and New York.
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-3 border-t border-[#D4AF37]/15 text-xs">
                      <div>
                        <span className="text-[#D4AF37] font-mono-tabular block">
                          2010 — 2016
                        </span>
                        <span className="text-[#FAF6F0] font-semibold">
                          Johns Hopkins Hospital · Plastic &amp; Craniofacial Residency
                        </span>
                      </div>
                      <div>
                        <span className="text-[#D4AF37] font-mono-tabular block">
                          2016 — 2018
                        </span>
                        <span className="text-[#FAF6F0] font-semibold">
                          Zurich &amp; Paris Aesthetic Micro-Surgery Fellowships
                        </span>
                      </div>
                    </div>
                  </div>
                )}

                {activeMaisonTab === 'accreditation' && (
                  <div className="space-y-4">
                    <h3 className="font-serif-display text-2xl text-[#FAF6F0]">
                      AAAASF &amp; Swiss FMH Class-A Laminar-Airflow Operating Theatres
                    </h3>
                    <p className="text-sm text-[#C9B8B5] leading-relaxed">
                      Every procedure is performed inside our private, hospital-grade positive-pressure
                      operating theatre with a dedicated board-certified MD anesthesiologist administering
                      Total Intravenous Anesthesia (TIVA) for rapid, nausea-free awakening.
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-3 border-t border-[#D4AF37]/15 text-xs">
                      <div>
                        <span className="text-[#D4AF37] font-mono-tabular block">
                          ZERO-INFECTION RECORD
                        </span>
                        <span className="text-[#FAF6F0] font-semibold">
                          ISO Class 5 Ultraclean Surgical Filtration
                        </span>
                      </div>
                      <div>
                        <span className="text-[#D4AF37] font-mono-tabular block">
                          ANESTHESIA PROTOCOL
                        </span>
                        <span className="text-[#FAF6F0] font-semibold">
                          1:1 Board-Certified MD Anesthesiologist Monitoring
                        </span>
                      </div>
                    </div>
                  </div>
                )}

                {activeMaisonTab === 'aftercare' && (
                  <div className="space-y-4">
                    <h3 className="font-serif-display text-2xl text-[#FAF6F0]">
                      24-Hour Private Recovery Suites &amp; Regenerative Aftercare
                    </h3>
                    <p className="text-sm text-[#C9B8B5] leading-relaxed">
                      Following surgery, patients rest in our burgundy-and-travertine private recovery
                      sanctuaries with 1:1 registered specialty nursing, hyperbaric oxygen therapy,
                      and custom manual lymphatic drainage.
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-3 border-t border-[#D4AF37]/15 text-xs">
                      <div>
                        <span className="text-[#D4AF37] font-mono-tabular block">
                          RAPID HEALING
                        </span>
                        <span className="text-[#FAF6F0] font-semibold">
                          42% Reduction in Post-Operative Edema via Hyperbaric O2
                        </span>
                      </div>
                      <div>
                        <span className="text-[#D4AF37] font-mono-tabular block">
                          CONCIERGE TRANSFERS
                        </span>
                        <span className="text-[#FAF6F0] font-semibold">
                          Chauffeured Subterranean Departure to Residence or Hotel
                        </span>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="text-xs text-[#9E8885]">
                  Published in <em>Plastic and Reconstructive Surgery (PRS)</em> ·{' '}
                  <em>Aesthetic Surgery Journal</em>
                </div>
                <button
                  type="button"
                  onClick={() => scrollToSection('consultation')}
                  className="inline-flex items-center gap-2 text-xs font-semibold text-[#D4AF37] hover:text-[#E5C558] cursor-pointer"
                >
                  Arrange a Private Consultation with Dr. Daniel
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 05: Private Concierge Consultation & Dossier Booking */}
      <ConsultationSection
        dossierProcedures={dossierProcedures}
        customBlueprint={customBlueprint}
        referencedCase={referencedCase}
      />

      {/* Quiet Architectural Footer */}
      <footer className="py-16 px-6 lg:px-12 border-t border-[#D4AF37]/20 bg-[#110407] text-xs text-[#9E8885]">
        <div className="max-w-[1240px] mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <div>
            <a
              href="#top"
              className="font-serif-display text-2xl font-semibold tracking-[0.18em] text-[#FAF6F0]"
            >
              DANIEL
            </a>
            <p className="mt-2 text-[#9E8885] max-w-sm">
              Atelier Daniel Plastic &amp; Reconstructive Surgery · Beverly Hills Flagship
              Pavilion &amp; Geneva Lakefront Maison.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-6 text-[#C9B8B5]">
            <a href="#procedures" className="hover:text-[#D4AF37] transition-colors">
              Procedures
            </a>
            <a href="#planner" className="hover:text-[#D4AF37] transition-colors">
              Aesthetic Planner
            </a>
            <a href="#outcomes" className="hover:text-[#D4AF37] transition-colors">
              Clinical Outcomes
            </a>
            <a href="#maison" className="hover:text-[#D4AF37] transition-colors">
              The Maison
            </a>
            <a href="#consultation" className="hover:text-[#D4AF37] transition-colors">
              Private Consultation
            </a>
          </div>

          <div className="text-left md:text-right">
            <p className="text-[#C9B8B5]">
              © {new Date().getFullYear()} Atelier Daniel Surgical Maison. All rights reserved.
            </p>
            <p className="mt-1">
              HIPAA &amp; Swiss Federal Act on Data Protection (FADP) Compliant Practice.
            </p>
          </div>
        </div>
      </footer>

      {/* Clinical Monograph Modal */}
      <ProcedureDetailModal
        procedure={activeMonographProcedure}
        onClose={() => setActiveMonographProcedure(null)}
        onToggleDossier={handleToggleDossier}
        isInDossier={
          activeMonographProcedure
            ? dossierIds.includes(activeMonographProcedure.id)
            : false
        }
        onProceedToBooking={(proc) => {
          if (!dossierIds.includes(proc.id)) {
            setDossierIds((prev) => [...prev, proc.id]);
          }
          setActiveMonographProcedure(null);
          scrollToSection('consultation');
        }}
      />

      {/* Personal Surgical Dossier Drawer Modal */}
      <DossierDrawerModal
        isOpen={isDossierOpen}
        onClose={() => setIsDossierOpen(false)}
        dossierProcedures={dossierProcedures}
        customBlueprint={customBlueprint}
        onRemoveProcedure={(id) =>
          setDossierIds((prev) => prev.filter((item) => item !== id))
        }
        onProceedToConsultation={() => {
          setIsDossierOpen(false);
          scrollToSection('consultation');
        }}
      />
    </div>
  );
}
