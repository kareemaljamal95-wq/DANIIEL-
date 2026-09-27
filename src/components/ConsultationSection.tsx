import React, { useState } from 'react';
import { CheckCircle2, Calendar, ShieldCheck, ArrowRight } from 'lucide-react';
import { SurgicalProcedure, ClinicalCaseOutcome } from '../data/proceduresData';
import { CustomPlannerBlueprint } from './InteractivePlanner';

interface ConsultationSectionProps {
  dossierProcedures: SurgicalProcedure[];
  customBlueprint: CustomPlannerBlueprint | null;
  referencedCase: ClinicalCaseOutcome | null;
}

interface BookingReceipt {
  referenceCode: string;
  patientName: string;
  email: string;
  phone: string;
  location: string;
  preferredDate: string;
  consultationWindow: string;
  discretionProtocol: string;
  selectedProcedures: string[];
  clinicalNotes: string;
}

export const ConsultationSection: React.FC<ConsultationSectionProps> = ({
  dossierProcedures,
  customBlueprint,
  referencedCase,
}) => {
  const [patientName, setPatientName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [clinicLocation, setClinicLocation] = useState<
    'Beverly Hills Flagship Pavilion' | 'Geneva Lakefront Maison' | 'Encrypted 3D Tele-Consultation'
  >('Beverly Hills Flagship Pavilion');
  const [preferredDate, setPreferredDate] = useState('2026-10-15');
  const [consultationWindow, setConsultationWindow] = useState('Morning Private Suite (09:30 AM)');
  const [discretionProtocol, setDiscretionProtocol] = useState(
    'Standard Private Arrival'
  );
  const [anatomicalGoals, setAnatomicalGoals] = useState('');
  const [formError, setFormError] = useState<string | null>(null);
  const [confirmedReceipt, setConfirmedReceipt] = useState<BookingReceipt | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    if (patientName.trim().length < 2) {
      setFormError('Please provide your full legal or preferred name for your clinical file.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      setFormError('Please enter a valid private email address for encrypted dossier transmission.');
      return;
    }

    if (phone.trim().length < 7) {
      setFormError('Please enter a direct telephone or WhatsApp number for our surgical concierge.');
      return;
    }

    const procedureList =
      dossierProcedures.length > 0
        ? dossierProcedures.map((p) => p.title)
        : ['Comprehensive Craniofacial & Aesthetic Evaluation'];

    const receipt: BookingReceipt = {
      referenceCode: `DNL-${Math.floor(100000 + Math.random() * 900000)}`,
      patientName: patientName.trim(),
      email: email.trim(),
      phone: phone.trim(),
      location: clinicLocation,
      preferredDate,
      consultationWindow,
      discretionProtocol,
      selectedProcedures: procedureList,
      clinicalNotes:
        anatomicalGoals.trim() ||
        (referencedCase
          ? `Referenced Outcome Archive: ${referencedCase.caseCode} (${referencedCase.procedureTitle})`
          : '3D Vectra Stereophotogrammetry & Anatomical Proportion Assessment'),
    };

    setConfirmedReceipt(receipt);
  };

  return (
    <section
      id="consultation"
      className="py-24 px-6 lg:px-12 border-t border-[#D4AF37]/15 bg-[#1B070C]"
    >
      <div className="max-w-[1240px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left 5 Columns: Concierge Standards & Accredited Suites */}
          <div className="lg:col-span-5">
            <p className="text-xs text-[#D4AF37] tracking-wider mb-3">
              05. Private Concierge & Surgical Dossier
            </p>
            <h2 className="font-serif-display text-3xl sm:text-4xl lg:text-5xl font-normal text-[#FAF6F0] leading-[1.12] mb-6">
              Reserve Your Private Consultation with Dr. Daniel
            </h2>
            <p className="text-sm sm:text-base text-[#C9B8B5] leading-relaxed mb-8">
              Each consultation spans a full 60 minutes with Dr. Daniel, incorporating 3D Vectra
              volumetric facial and torso imaging, ultrasonic skeletal assessment, and a bespoke
              operative and recovery blueprint.
            </p>

            {/* Architectural Clinic Locations */}
            <div className="space-y-4 border-t border-[#D4AF37]/20 pt-6 mb-8">
              <div className="p-4 rounded-lg bg-[#220A11] border border-[#D4AF37]/15">
                <div className="text-xs text-[#D4AF37] font-mono-tabular mb-1">
                  BEVERLY HILLS FLAGSHIP PAVILION
                </div>
                <div className="text-sm font-semibold text-[#FAF6F0]">
                  436 North Bedford Drive, Penthouse Suite · Beverly Hills, CA 90210
                </div>
                <div className="text-xs text-[#9E8885] mt-1">
                  AAAASF Accredited Double Operating Suite · Private Subterranean Valet Elevator
                </div>
              </div>

              <div className="p-4 rounded-lg bg-[#220A11] border border-[#D4AF37]/15">
                <div className="text-xs text-[#D4AF37] font-mono-tabular mb-1">
                  GENEVA LAKEFRONT MAISON
                </div>
                <div className="text-sm font-semibold text-[#FAF6F0]">
                  Rue du Rhône 42 · 1204 Genève, Switzerland
                </div>
                <div className="text-xs text-[#9E8885] mt-1">
                  FMH Swiss Certified Surgical Atelier · Post-Operative Lakefront Recovery Suites
                </div>
              </div>
            </div>

            {/*Attached Dossier Summary Card */}
            <div className="p-5 rounded-xl bg-[#140509] border border-[#D4AF37]/25">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-semibold text-[#D4AF37]">
                  Attached Pre-Consultation Dossier
                </span>
                <span className="font-mono-tabular text-xs text-[#9E8885]">
                  {dossierProcedures.length} Selected
                </span>
              </div>

              {dossierProcedures.length > 0 ? (
                <ul className="space-y-2 text-xs text-[#FAF6F0] mb-3">
                  {dossierProcedures.map((proc) => (
                    <li
                      key={proc.id}
                      className="flex items-center justify-between py-1 border-b border-[#D4AF37]/10"
                    >
                      <span className="truncate pr-2">{proc.title}</span>
                      <span className="font-mono-tabular text-[#D4AF37] shrink-0">
                        ${(proc.baseFeeUSD + proc.orSuiteFeeUSD + proc.anesthesiaFeeUSD).toLocaleString()}
                      </span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-xs text-[#9E8885] mb-3">
                  No specific procedures pre-selected yet. Your consultation will include a
                  comprehensive anatomical evaluation.
                </p>
              )}

              {customBlueprint && (
                <div className="text-xs text-[#C9B8B5] pt-2 border-t border-[#D4AF37]/15">
                  <strong className="text-[#D4AF37]">Planner Blueprint:</strong>{' '}
                  {customBlueprint.zoneName} ({customBlueprint.structuralSupportLevel}) · Est. $
                  {customBlueprint.estimatedTotalUSD.toLocaleString()}
                </div>
              )}

              {referencedCase && (
                <div className="text-xs text-[#C9B8B5] pt-2 mt-2 border-t border-[#D4AF37]/15">
                  <strong className="text-[#D4AF37]">Referenced Case Study:</strong>{' '}
                  {referencedCase.caseCode} ({referencedCase.procedureTitle})
                </div>
              )}
            </div>
          </div>

          {/* Right 7 Columns: Validated Consultation Form or Confirmed Receipt */}
          <div className="lg:col-span-7 bg-[#220A11] border border-[#D4AF37]/25 rounded-xl p-6 sm:p-10">
            {confirmedReceipt ? (
              <div className="py-4">
                <div className="flex items-center gap-3 text-[#D4AF37] mb-4">
                  <CheckCircle2 className="w-7 h-7 shrink-0" />
                  <div>
                    <span className="font-mono-tabular text-xs block">
                      ENCRYPTED DOSSIER REGISTERED · REF #{confirmedReceipt.referenceCode}
                    </span>
                    <h3 className="font-serif-display text-2xl sm:text-3xl text-[#FAF6F0]">
                      Private Consultation Request Confirmed
                    </h3>
                  </div>
                </div>

                <p className="text-sm text-[#C9B8B5] leading-relaxed mb-6">
                  Thank you, <strong className="text-[#FAF6F0]">{confirmedReceipt.patientName}</strong>.
                  Dr. Daniel’s Senior Surgical Concierge has received your anatomical dossier and
                  reserved your tentative consultation window.
                </p>

                <div className="p-5 rounded-lg bg-[#16060A] border border-[#D4AF37]/20 space-y-3 text-xs mb-8">
                  <div className="flex justify-between py-1.5 border-b border-[#D4AF37]/10">
                    <span className="text-[#9E8885]">Consultation Sanctuary</span>
                    <span className="font-semibold text-[#FAF6F0]">{confirmedReceipt.location}</span>
                  </div>
                  <div className="flex justify-between py-1.5 border-b border-[#D4AF37]/10">
                    <span className="text-[#9E8885]">Requested Date & Suite Window</span>
                    <span className="font-mono-tabular text-[#D4AF37]">
                      {confirmedReceipt.preferredDate} · {confirmedReceipt.consultationWindow}
                    </span>
                  </div>
                  <div className="flex justify-between py-1.5 border-b border-[#D4AF37]/10">
                    <span className="text-[#9E8885]">Privacy & Arrival Protocol</span>
                    <span className="text-[#FAF6F0]">{confirmedReceipt.discretionProtocol}</span>
                  </div>
                  <div className="py-1.5 border-b border-[#D4AF37]/10">
                    <span className="text-[#9E8885] block mb-1">Curated Surgical Portfolio</span>
                    <div className="text-[#FAF6F0] font-semibold">
                      {confirmedReceipt.selectedProcedures.join(' · ')}
                    </div>
                  </div>
                  <div className="py-1.5">
                    <span className="text-[#9E8885] block mb-1">Clinical Notes & Vector Goals</span>
                    <div className="text-[#C9B8B5]">{confirmedReceipt.clinicalNotes}</div>
                  </div>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-4">
                  <span className="text-xs text-[#9E8885]">
                    A HIPAA/GDPR-encrypted confirmation link has been dispatched to{' '}
                    {confirmedReceipt.email}.
                  </span>
                  <button
                    type="button"
                    onClick={() => setConfirmedReceipt(null)}
                    className="px-4 py-2 text-xs font-semibold text-[#D4AF37] border border-[#D4AF37]/30 rounded-lg hover:bg-[#2B0E16] transition-colors cursor-pointer"
                  >
                    Modify Consultation Details
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="space-y-6">
                <div className="border-b border-[#D4AF37]/15 pb-4">
                  <h3 className="font-serif-display text-2xl text-[#FAF6F0]">
                    Patient Intake & Sanctuary Selection
                  </h3>
                  <p className="text-xs text-[#9E8885] mt-1">
                    All clinical correspondence is protected under strict physician-patient privilege.
                  </p>
                </div>

                {formError && (
                  <div
                    role="alert"
                    className="p-3.5 rounded-lg bg-[#3A0D18] border border-[#D4AF37] text-xs text-[#FAF6F0]"
                  >
                    {formError}
                  </div>
                )}

                {/* Sanctuary Location Selector */}
                <div>
                  <label className="block text-xs font-semibold text-[#C9B8B5] mb-2">
                    Select Surgical Maison or Tele-Consultation
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                    {(
                      [
                        'Beverly Hills Flagship Pavilion',
                        'Geneva Lakefront Maison',
                        'Encrypted 3D Tele-Consultation',
                      ] as const
                    ).map((loc) => {
                      const active = clinicLocation === loc;
                      return (
                        <button
                          key={loc}
                          type="button"
                          onClick={() => setClinicLocation(loc)}
                          className={`px-3.5 py-2.5 rounded-lg text-xs font-semibold text-left border transition-all cursor-pointer truncate ${
                            active
                              ? 'bg-[#D4AF37] text-[#16060A] border-[#D4AF37]'
                              : 'bg-[#16060A] text-[#C9B8B5] border-[#D4AF37]/20 hover:border-[#D4AF37]/50'
                          }`}
                        >
                          {loc}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Patient Identity Fields */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label
                      htmlFor="patient-name"
                      className="block text-xs font-semibold text-[#C9B8B5] mb-2"
                    >
                      Full Name or Preferred Alias *
                    </label>
                    <input
                      id="patient-name"
                      type="text"
                      required
                      placeholder="e.g., Lady Victoria Laurent"
                      value={patientName}
                      onChange={(e) => setPatientName(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-lg bg-[#140509] border border-[#D4AF37]/25 text-sm text-[#FAF6F0] placeholder-[#9E8885]/50 focus:outline-none focus:border-[#D4AF37]"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="patient-email"
                      className="block text-xs font-semibold text-[#C9B8B5] mb-2"
                    >
                      Private Email Address *
                    </label>
                    <input
                      id="patient-email"
                      type="email"
                      required
                      placeholder="victoria@private-domain.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-lg bg-[#140509] border border-[#D4AF37]/25 text-sm text-[#FAF6F0] placeholder-[#9E8885]/50 focus:outline-none focus:border-[#D4AF37]"
                    />
                  </div>
                </div>

                {/* Phone & Date */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label
                      htmlFor="patient-phone"
                      className="block text-xs font-semibold text-[#C9B8B5] mb-2"
                    >
                      Direct Telephone / WhatsApp *
                    </label>
                    <input
                      id="patient-phone"
                      type="tel"
                      required
                      placeholder="+1 (310) 555-0194"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-lg bg-[#140509] border border-[#D4AF37]/25 text-sm text-[#FAF6F0] placeholder-[#9E8885]/50 focus:outline-none focus:border-[#D4AF37] font-mono-tabular"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="preferred-date"
                      className="block text-xs font-semibold text-[#C9B8B5] mb-2"
                    >
                      Preferred Consultation Date
                    </label>
                    <div className="relative">
                      <input
                        id="preferred-date"
                        type="date"
                        value={preferredDate}
                        onChange={(e) => setPreferredDate(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-lg bg-[#140509] border border-[#D4AF37]/25 text-sm text-[#FAF6F0] focus:outline-none focus:border-[#D4AF37] font-mono-tabular"
                      />
                    </div>
                  </div>
                </div>

                {/* Suite Window & Discretion Protocol */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label
                      htmlFor="suite-window"
                      className="block text-xs font-semibold text-[#C9B8B5] mb-2"
                    >
                      Preferred Appointment Window
                    </label>
                    <select
                      id="suite-window"
                      value={consultationWindow}
                      onChange={(e) => setConsultationWindow(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-lg bg-[#140509] border border-[#D4AF37]/25 text-sm text-[#FAF6F0] focus:outline-none focus:border-[#D4AF37]"
                    >
                      <option value="Morning Private Suite (09:30 AM)">
                        Morning Private Suite (09:30 AM)
                      </option>
                      <option value="Midday Architectural Review (01:00 PM)">
                        Midday Architectural Review (01:00 PM)
                      </option>
                      <option value="Evening Executive Sanctuary (05:00 PM)">
                        Evening Executive Sanctuary (05:00 PM)
                      </option>
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor="discretion-protocol"
                      className="block text-xs font-semibold text-[#C9B8B5] mb-2"
                    >
                      Arrival & Privacy Protocol
                    </label>
                    <select
                      id="discretion-protocol"
                      value={discretionProtocol}
                      onChange={(e) => setDiscretionProtocol(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-lg bg-[#140509] border border-[#D4AF37]/25 text-sm text-[#FAF6F0] focus:outline-none focus:border-[#D4AF37]"
                    >
                      <option value="Standard Private Arrival">Standard Private Arrival</option>
                      <option value="Subterranean Valet & Direct Elevator">
                        Subterranean Valet & Direct Elevator
                      </option>
                      <option value="NDA & Closed-Floor VIP Lockout">
                        NDA & Closed-Floor VIP Lockout
                      </option>
                    </select>
                  </div>
                </div>

                {/* Anatomical Goals */}
                <div>
                  <label
                    htmlFor="anatomical-goals"
                    className="block text-xs font-semibold text-[#C9B8B5] mb-2"
                  >
                    Anatomical Objectives & Target Recovery Timeframe
                  </label>
                  <textarea
                    id="anatomical-goals"
                    rows={3}
                    placeholder="Share your primary aesthetic or functional goals, any prior procedures, or specific target dates..."
                    value={anatomicalGoals}
                    onChange={(e) => setAnatomicalGoals(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-lg bg-[#140509] border border-[#D4AF37]/25 text-sm text-[#FAF6F0] placeholder-[#9E8885]/50 focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>

                {/* Submit Row */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
                  <div className="flex items-center gap-2 text-xs text-[#9E8885]">
                    <ShieldCheck className="w-4 h-4 text-[#D4AF37] shrink-0" />
                    <span>Zero-obligation clinical assessment · $350 consultation fee applied to surgery</span>
                  </div>

                  <button
                    type="submit"
                    className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-lg bg-[#D4AF37] hover:bg-[#E5C558] text-[#16060A] font-semibold text-xs sm:text-sm transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                  >
                    Confirm Private Consultation
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
