// src/components/modals/ComplaintModal.jsx
import React, { useState } from "react";
import { AlertCircle, HelpCircle, X, CheckCircle2 } from "lucide-react";
import { useAppData } from "../../context/AppDataContext";
import { useToast } from "../notifications/ToastProvider";

export const ComplaintModal = ({ isOpen, onClose, booking, defaultCategory = "Work quality" }) => {
  const { addComplaint } = useAppData();
  const { addToast } = useToast();

  const [category, setCategory] = useState(defaultCategory);
  const [severity, setSeverity] = useState("Medium");
  const [description, setDescription] = useState("");
  const [requestReplacement, setRequestReplacement] = useState(false);
  const [submittedId, setSubmittedId] = useState(null);

  if (!isOpen || !booking) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!description.trim()) {
      addToast("Please provide details of the issue.", "error");
      return;
    }

    const id = addComplaint({
      bookingId: booking.id,
      customerId: booking.customerId,
      customerName: booking.customerName,
      workerId: booking.workerId,
      workerName: booking.workerName,
      category: requestReplacement ? "Replacement Request" : category,
      severity,
      description,
      requestReplacement,
    });

    setSubmittedId(id);
    addToast("Dispute ticket raised. Operations team notified.", "info");
  };

  const handleClose = () => {
    setSubmittedId(null);
    setDescription("");
    setRequestReplacement(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl shadow-xl max-w-lg w-full p-6 border border-stone-200 relative">
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-stone-400 hover:text-stone-700 p-1 rounded-lg hover:bg-stone-100"
        >
          <X className="w-5 h-5" />
        </button>

        {!submittedId ? (
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-amber-100 text-amber-800 rounded-xl">
                <AlertCircle className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-stone-900">Raise Issue or Replacement</h3>
                <p className="text-xs text-stone-500">
                  Booking <span className="font-mono text-stone-700">{booking.id}</span> • {booking.serviceName}
                </p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Issue Category
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full text-sm p-2.5 border border-stone-300 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-hidden bg-white"
                >
                  <option value="Work quality">Work quality or unfinished tasks</option>
                  <option value="Late arrival">Late arrival without notification</option>
                  <option value="Payment dispute">Pricing / Payment dispute</option>
                  <option value="Property damage">Property scratch or damage</option>
                  <option value="Safety concern">Safety or security concern</option>
                  <option value="Inappropriate behaviour">Unprofessional communication</option>
                  <option value="Replacement Request">Worker unavailable / Request Replacement</option>
                  <option value="Other">Other concern</option>
                </select>
              </div>

              <div className="flex items-center gap-2 p-3 bg-stone-50 rounded-xl border border-stone-200">
                <input
                  type="checkbox"
                  id="replaceCheck"
                  checked={requestReplacement}
                  onChange={(e) => setRequestReplacement(e.target.checked)}
                  className="w-4 h-4 text-emerald-600 rounded border-stone-300 focus:ring-emerald-500"
                />
                <label htmlFor="replaceCheck" className="text-xs font-medium text-stone-800 cursor-pointer">
                  I would like KaamSetu to assign a verified replacement professional
                </label>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Severity Level
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {["Low", "Medium", "High"].map((lvl) => (
                    <button
                      key={lvl}
                      type="button"
                      onClick={() => setSeverity(lvl)}
                      className={`py-2 text-xs font-medium rounded-lg border text-center transition-all ${
                        severity === lvl
                          ? "bg-stone-900 text-white border-stone-900 font-semibold shadow-xs"
                          : "bg-white text-stone-700 border-stone-200 hover:bg-stone-50"
                      }`}
                    >
                      {lvl}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Detailed Description
                </label>
                <textarea
                  required
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Explain what happened so our operations team can review fairly..."
                  className="w-full text-sm p-3 border border-stone-300 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-hidden"
                />
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-xl p-3 text-[11px] text-blue-900 leading-relaxed">
                KaamSetu Fair Work Charter: All complaints are investigated with both parties. We do not arbitrarily ban workers or withhold earned wages without evidence.
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
                  className="px-5 py-2.5 text-sm bg-amber-600 hover:bg-amber-700 active:bg-amber-800 text-white font-semibold rounded-xl shadow-xs transition-colors"
                >
                  Submit for Mediation
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
              <h3 className="text-xl font-bold text-stone-900">Complaint Ticket Opened</h3>
              <p className="text-sm text-stone-600 mt-1">
                Ticket Reference: <strong className="font-mono text-stone-900">{submittedId}</strong>
              </p>
            </div>

            <p className="text-xs text-stone-600 bg-stone-50 p-3 rounded-xl border border-stone-200 text-left">
              Our operations team has received your submission. An admin will inspect the booking details, contact the professional, and update the resolution status in your customer support tab.
            </p>

            <button
              onClick={handleClose}
              className="w-full py-2.5 bg-stone-900 text-white text-sm font-semibold rounded-xl hover:bg-stone-800 transition-colors"
            >
              Done
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ComplaintModal;
