// src/pages/worker/Support.jsx
import React, { useState } from "react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import { useToast } from "../../components/notifications/ToastProvider";
import { useAppData } from "../../context/AppDataContext";
import { LifeBuoy, PhoneCall, ShieldAlert, CheckCircle2, AlertTriangle, FileText } from "lucide-react";

export const WorkerSupport = () => {
  const { addToast } = useToast();
  const { logActivity } = useAppData();

  const [subject, setSubject] = useState("");
  const [desc, setDesc] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    logActivity(`Worker grievance raised: ${subject}`, "Worker", "support");
    addToast("Support report submitted. Operations agent assigned for follow-up.", "success");
    setSubmitted(true);
  };

  return (
    <DashboardLayout role="worker">
      <div className="max-w-3xl mx-auto space-y-6">
        <div>
          <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider">
            Worker Protection & Dignity Desk
          </span>
          <h1 className="text-2xl font-extrabold text-stone-900 mt-0.5">
            Worker Support & Safety Helpline
          </h1>
          <p className="text-xs text-stone-500 mt-1">
            Dedicated assistance for domestic workers, plumbers, electricians, and technicians.
          </p>
        </div>

        {/* Rapid Assistance Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="bg-white p-5 rounded-3xl border border-stone-200 shadow-xs space-y-2">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold">
              <PhoneCall className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-stone-900 text-sm">24x7 Worker Desk (Simulated)</h3>
            <p className="text-xs text-stone-500">
              Direct hotline for on-site payment disputes or lockouts: 1800-XXX-SEWA.
            </p>
          </div>

          <div className="bg-white p-5 rounded-3xl border border-stone-200 shadow-xs space-y-2">
            <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-700 flex items-center justify-center font-bold">
              <ShieldAlert className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-stone-900 text-sm">Real Emergency Dial 112</h3>
            <p className="text-xs text-stone-500">
              For immediate physical danger or police emergency, always dial 112 directly.
            </p>
          </div>
        </div>

        {/* Grievance Submission */}
        <div className="bg-white rounded-3xl border border-stone-200 p-6 sm:p-8 shadow-xs space-y-4">
          <h2 className="text-base font-bold text-stone-900">Report Client Issue / Unpaid Work</h2>

          {!submitted ? (
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-stone-700 mb-1">Issue Topic</label>
                <input
                  type="text"
                  required
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="e.g. Customer refusing payment, asking for non-agreed tasks..."
                  className="w-full text-xs p-3 border border-stone-300 rounded-xl outline-hidden focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="block font-semibold text-stone-700 mb-1">Detailed Explanation</label>
                <textarea
                  required
                  rows={4}
                  value={desc}
                  onChange={(e) => setDesc(e.target.value)}
                  placeholder="Explain clearly what happened..."
                  className="w-full text-xs p-3 border border-stone-300 rounded-xl outline-hidden focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div className="flex justify-end pt-2">
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-xs transition-colors"
                >
                  Submit Grievance
                </button>
              </div>
            </form>
          ) : (
            <div className="text-center py-6 space-y-2 bg-stone-50 rounded-2xl border border-stone-200">
              <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
              <h3 className="text-sm font-bold text-stone-900">Report Logged with Operations</h3>
              <p className="text-xs text-stone-500">
                An operations supervisor has been assigned to mediate.
              </p>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default WorkerSupport;
