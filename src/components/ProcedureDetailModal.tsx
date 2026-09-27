import React from 'react';
import { X, Check, Plus, Trash2, ArrowRight } from 'lucide-react';
import { SurgicalProcedure } from '../data/proceduresData';
import { CustomPlannerBlueprint } from './InteractivePlanner';
import { ResilientImage } from './ResilientImage';

interface ProcedureDetailModalProps {
  procedure: SurgicalProcedure | null;
  onClose: () => void;
  onToggleDossier: (procedure: SurgicalProcedure) => void;
  isInDossier: boolean;
  onProceedToBooking: (procedure: SurgicalProcedure) => void;
}

export const ProcedureDetailModal: React.FC<ProcedureDetailModalProps> = ({
  procedure,
  onClose,
  onToggleDossier,
  isInDossier,
  onProceedToBooking,
}) => {
  if (!procedure) return null;

  const totalComprehensiveFee =
    procedure.baseFeeUSD + procedure.orSuiteFeeUSD + procedure.anesthesiaFeeUSD;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-procedure-title"
    >
      <div className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-[#1D080E] border border-[#D4AF37]/35 rounded-xl shadow-2xl">
        {/* Top Bar inside Modal */}
        <div className="sticky top-0 z-10 flex items-center justify-between px-6 py-4 bg-[#1D080E]/95 backdrop-blur border-b border-[#D4AF37]/20">
          <div className="flex items-center gap-2 text-xs text-[#9E8885]">
            <span className="text-[#D4AF37] font-mono-tabular">
              MONOGRAPH {procedure.indexNumber}
            </span>
            <span aria-hidden="true">·</span>
            <span>{procedure.category}</span>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close clinical monograph"
            className="p-2 text-[#C9B8B5] hover:text-[#FAF6F0] rounded-lg hover:bg-[#2B0E16] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 sm:p-8">
          {/* Header Grid */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center mb-8">
            <div className="md:col-span-5 aspect-[4/3] rounded-lg overflow-hidden border border-[#D4AF37]/20">
              <ResilientImage
                src={procedure.image}
                alt={procedure.title}
                fallbackTitle={procedure.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="md:col-span-7">
              <h2
                id="modal-procedure-title"
                className="font-serif-display text-2xl sm:text-3xl text-[#FAF6F0] mb-2"
              >
                {procedure.title}
              </h2>
              <p className="text-sm text-[#D4AF37] mb-4">{procedure.subtitle}</p>
              <p className="text-sm text-[#C9B8B5] leading-relaxed mb-5">
                {procedure.summary}
              </p>
              <div className="flex flex-wrap items-center gap-3 text-xs text-[#9E8885] border-t border-[#D4AF37]/15 pt-4">
                <span>Focus: {procedure.anatomicalFocus}</span>
                <span aria-hidden="true">·</span>
                <span>Anesthesia: {procedure.anesthesiaProtocol}</span>
              </div>
            </div>
          </div>

          {/* Tabular Clinical Metrics & Fee Breakdown */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-5 rounded-lg bg-[#140509] border border-[#D4AF37]/20 mb-8">
            <div>
              <span className="block text-xs text-[#9E8885]">Operative Time</span>
              <span className="font-mono-tabular text-base font-semibold text-[#FAF6F0]">
                {procedure.surgicalDurationHours.toFixed(1)} Hours
              </span>
            </div>
            <div>
              <span className="block text-xs text-[#9E8885]">Social Recovery</span>
              <span className="font-mono-tabular text-base font-semibold text-[#FAF6F0]">
                {procedure.socialRecoveryDays}
              </span>
            </div>
            <div>
              <span className="block text-xs text-[#9E8885]">Full Maturation</span>
              <span className="font-mono-tabular text-base font-semibold text-[#FAF6F0]">
                {procedure.finalMaturationMonths} Months
              </span>
            </div>
            <div>
              <span className="block text-xs text-[#9E8885]">All-Inclusive Fee</span>
              <span className="font-mono-tabular text-base font-semibold text-[#D4AF37]">
                ${totalComprehensiveFee.toLocaleString()}
              </span>
            </div>
          </div>

          {/* Two Column Clinical Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div>
              <h3 className="font-serif-display text-xl text-[#FAF6F0] mb-3 pb-2 border-b border-[#D4AF37]/15">
                Operative Technique Highlights
              </h3>
              <ul className="space-y-3 text-sm text-[#C9B8B5]">
                {procedure.techniqueHighlights.map((item, i) => (
                  <li key={i} className="leading-relaxed">
                    <span className="font-mono-tabular text-xs text-[#D4AF37] mr-2">
                      0{i + 1}.
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="font-serif-display text-xl text-[#FAF6F0] mb-3 pb-2 border-b border-[#D4AF37]/15">
                Anatomical Candidacy Profile
              </h3>
              <ul className="space-y-3 text-sm text-[#C9B8B5]">
                {procedure.candidacyCriteria.map((item, i) => (
                  <li key={i} className="leading-relaxed">
                    <span className="font-mono-tabular text-xs text-[#D4AF37] mr-2">
                      0{i + 1}.
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Post-Operative Recovery Milestones */}
          <div className="mb-8">
            <h3 className="font-serif-display text-xl text-[#FAF6F0] mb-4 pb-2 border-b border-[#D4AF37]/15">
              Post-Operative Recovery Protocol & Milestones
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {procedure.recoveryTimeline.map((step, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-lg bg-[#250B12] border border-[#D4AF37]/15"
                >
                  <div className="font-mono-tabular text-xs text-[#D4AF37] font-semibold mb-1">
                    {step.day}
                  </div>
                  <div className="text-sm font-semibold text-[#FAF6F0] mb-1.5">
                    {step.phase}
                  </div>
                  <p className="text-xs text-[#C9B8B5] leading-relaxed">
                    {step.clinicalNote}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Modal Action Footer */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-6 border-t border-[#D4AF37]/20">
            <div className="font-mono-tabular text-xs text-[#9E8885]">
              Surgeon Fee: ${procedure.baseFeeUSD.toLocaleString()} · OR Suite: $
              {procedure.orSuiteFeeUSD.toLocaleString()} · MD Anesthesia: $
              {procedure.anesthesiaFeeUSD.toLocaleString()}
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={() => onToggleDossier(procedure)}
                className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs font-semibold border transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                  isInDossier
                    ? 'bg-[#2B0E16] text-[#D4AF37] border-[#D4AF37]'
                    : 'bg-transparent text-[#FAF6F0] border-[#D4AF37]/40 hover:border-[#D4AF37]'
                }`}
              >
                {isInDossier ? (
                  <>
                    <Check className="w-4 h-4" />
                    Saved in Surgical Dossier
                  </>
                ) : (
                  <>
                    <Plus className="w-4 h-4" />
                    Save to Surgical Dossier
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={() => onProceedToBooking(procedure)}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-xs font-semibold bg-[#D4AF37] hover:bg-[#E5C558] text-[#16060A] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
              >
                Schedule Consultation for This Procedure
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

interface DossierDrawerModalProps {
  isOpen: boolean;
  onClose: () => void;
  dossierProcedures: SurgicalProcedure[];
  customBlueprint: CustomPlannerBlueprint | null;
  onRemoveProcedure: (id: string) => void;
  onProceedToConsultation: () => void;
}

export const DossierDrawerModal: React.FC<DossierDrawerModalProps> = ({
  isOpen,
  onClose,
  dossierProcedures,
  customBlueprint,
  onRemoveProcedure,
  onProceedToConsultation,
}) => {
  if (!isOpen) return null;

  const totalInvestment = dossierProcedures.reduce(
    (acc, p) => acc + p.baseFeeUSD + p.orSuiteFeeUSD + p.anesthesiaFeeUSD,
    0
  );

  const totalHours = dossierProcedures.reduce(
    (acc, p) => acc + p.surgicalDurationHours,
    0
  );

  return (
    <div
      className="fixed inset-0 z-50 flex justify-end bg-black/75 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-label="Personal Surgical Dossier"
    >
      <div className="w-full max-w-lg bg-[#1C070D] border-l border-[#D4AF37]/30 h-full flex flex-col justify-between p-6 sm:p-8 overflow-y-auto">
        <div>
          <div className="flex items-center justify-between border-b border-[#D4AF37]/20 pb-5 mb-6">
            <div>
              <span className="text-xs text-[#D4AF37] block">
                Private Patient Portfolio
              </span>
              <h2 className="font-serif-display text-2xl text-[#FAF6F0]">
                Personal Surgical Dossier ({dossierProcedures.length})
              </h2>
            </div>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close Surgical Dossier"
              className="p-2 text-[#C9B8B5] hover:text-[#FAF6F0] rounded-lg hover:bg-[#2B0E16] cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {customBlueprint && (
            <div className="p-4 rounded-lg bg-[#250B12] border border-[#D4AF37]/30 mb-6">
              <div className="text-xs text-[#D4AF37] font-semibold mb-1">
                Active Anatomical Planner Calibration
              </div>
              <div className="text-sm font-semibold text-[#FAF6F0]">
                {customBlueprint.zoneName} · {customBlueprint.structuralSupportLevel}
              </div>
              <div className="font-mono-tabular text-xs text-[#C9B8B5] mt-1">
                Target: {customBlueprint.phiHarmonyTarget} · Est. Social Recovery:{' '}
                {customBlueprint.estimatedSocialRecoveryDays} Days
              </div>
            </div>
          )}

          {dossierProcedures.length === 0 ? (
            <div className="py-16 text-center border border-dashed border-[#D4AF37]/20 rounded-xl p-6">
              <p className="font-serif-display text-xl text-[#FAF6F0] mb-2">
                Your Surgical Dossier is Currently Empty
              </p>
              <p className="text-xs text-[#9E8885] max-w-xs mx-auto leading-relaxed">
                Explore Dr. Daniel’s surgical capabilities or use the Interactive Aesthetic
                Planner to curate procedures for your private consultation.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {dossierProcedures.map((proc) => {
                const itemFee =
                  proc.baseFeeUSD + proc.orSuiteFeeUSD + proc.anesthesiaFeeUSD;
                return (
                  <div
                    key={proc.id}
                    className="p-4 rounded-lg bg-[#240B12] border border-[#D4AF37]/20 flex items-start justify-between gap-4"
                  >
                    <div>
                      <span className="text-[11px] text-[#D4AF37]">
                        {proc.category}
                      </span>
                      <h3 className="font-serif-display text-lg text-[#FAF6F0]">
                        {proc.title}
                      </h3>
                      <div className="font-mono-tabular text-xs text-[#9E8885] mt-1">
                        {proc.surgicalDurationHours.toFixed(1)} hrs · {proc.socialRecoveryDays}{' '}
                        recovery · ${itemFee.toLocaleString()}
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => onRemoveProcedure(proc.id)}
                      aria-label={`Remove ${proc.title} from dossier`}
                      className="p-1.5 text-[#9E8885] hover:text-[#FAF6F0] rounded hover:bg-[#16060A] transition-colors cursor-pointer"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        <div className="border-t border-[#D4AF37]/20 pt-6 mt-8">
          <div className="flex items-center justify-between text-xs text-[#C9B8B5] mb-2">
            <span>Combined Operating Room Time</span>
            <span className="font-mono-tabular font-semibold text-[#FAF6F0]">
              {totalHours.toFixed(1)} Hours
            </span>
          </div>
          <div className="flex items-center justify-between text-sm text-[#FAF6F0] mb-6">
            <span className="font-semibold">Estimated All-Inclusive Investment</span>
            <span className="font-mono-tabular text-lg font-semibold text-[#D4AF37]">
              ${totalInvestment.toLocaleString()}
            </span>
          </div>

          <button
            type="button"
            onClick={onProceedToConsultation}
            className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg bg-[#D4AF37] hover:bg-[#E5C558] text-[#16060A] font-semibold text-xs sm:text-sm transition-colors whitespace-nowrap cursor-pointer"
          >
            Transmit Dossier & Request Private Consultation
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
