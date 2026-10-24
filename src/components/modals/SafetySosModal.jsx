// src/components/modals/SafetySosModal.jsx
import React, { useState } from "react";
import { AlertTriangle, ShieldAlert, X, CheckCircle2 } from "lucide-react";
import { useAppData } from "../../context/AppDataContext";
import { useToast } from "../notifications/ToastProvider";

export const SafetySosModal = ({ isOpen, onClose, booking }) => {
  const { triggerSafetySos } = useAppData();
  const { addToast } = useToast();
  const [reason, setReason] = useState("");
  const [submittedAlertId, setSubmittedAlertId] = useState(null);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    const id = triggerSafetySos(booking?.id || "GEN-ALERT", reason || "Worker raised urgent on-site safety concern");
    setSubmittedAlertId(id);
    addToast("Priority Safety Alert created for Operations Team", "warning");
  };

  const handleClose = () => {
    setSubmittedAlertId(null);
    setReason("");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full p-6 border border-stone-200 relative">
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-stone-400 hover:text-stone-700 p-1 rounded-lg hover:bg-stone-100"
        >
          <X className="w-5 h-5" />
        </button>

        {!submittedAlertId ? (
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-rose-100 text-rose-700 rounded-xl">
                <AlertTriangle className="w-7 h-7" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-stone-900">Worker Safety Alert</h3>
                <p className="text-xs text-rose-700 font-medium">KaamSetu Operations Incident Protocol</p>
              </div>
            </div>

            {/* Crucial Disclaimer as specified in prompt */}
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-3.5 mb-4 text-xs text-amber-900 leading-relaxed">
              <strong className="block mb-1 font-semibold">Important Prototype Safety Notice:</strong>
              This simulated action raises a <strong>high-priority incident alert</strong> inside the KaamSetu Operations Console for human agent follow-up. It does <em>not</em> place real cellular phone calls or dispatch local emergency police/medical personnel. If you are ever in real-world danger, please dial <strong>112</strong> immediately.
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Active Booking Reference
                </label>
                <div className="bg-stone-100 text-stone-700 font-mono text-sm px-3 py-2 rounded-lg border border-stone-200 flex justify-between">
                  <span>{booking?.id || "BK-GENERAL"}</span>
                  <span className="text-stone-500 font-sans text-xs">{booking?.serviceName}</span>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Describe Concern or Situation:
                </label>
                <textarea
                  required
                  rows={3}
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  placeholder="e.g. Unsafe premises, customer misconduct, locked entry without key, or feeling threatened..."
                  className="w-full text-sm p-3 border border-stone-300 rounded-xl focus:ring-2 focus:ring-rose-500 focus:border-rose-500 outline-hidden"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={handleClose}
                  className="px-4 py-2 text-sm text-stone-600 hover:text-stone-900 font-medium rounded-xl hover:bg-stone-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 text-sm bg-rose-600 hover:bg-rose-700 active:bg-rose-800 text-white font-semibold rounded-xl shadow-xs transition-colors flex items-center gap-2"
                >
                  <ShieldAlert className="w-4 h-4" />
                  <span>Raise Urgent Operations Alert</span>
                </button>
              </div>
            </form>
          </div>
        ) : (
          <div className="text-center py-4 space-y-4">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div>
              <h3 className="text-xl font-bold text-stone-900">Operations Alert Logged</h3>
              <p className="text-sm text-stone-600 mt-1">
                Alert ID: <strong className="font-mono text-stone-900">{submittedAlertId}</strong>
              </p>
            </div>

            <p className="text-xs text-stone-500 bg-stone-50 p-3 rounded-xl border border-stone-200 text-left">
              Our demo operations console is now monitoring this incident. In a live system, KaamSetu's 24x7 safety response desk calls both parties, logs GPS coordinate breadcrumbs, and coordinates safe extraction if requested.
            </p>

            <button
              onClick={handleClose}
              className="w-full py-2.5 bg-stone-900 text-white text-sm font-semibold rounded-xl hover:bg-stone-800 transition-colors"
            >
              Return to Safety Check-In
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SafetySosModal;
