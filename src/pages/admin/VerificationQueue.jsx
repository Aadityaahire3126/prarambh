// src/pages/admin/VerificationQueue.jsx
import React, { useState } from "react";
import AdminLayout from "../../components/layout/AdminLayout";
import { useAppData } from "../../context/AppDataContext";
import { useToast } from "../../components/notifications/ToastProvider";
import { ShieldCheck, Check, X, AlertCircle, FileCheck2, User } from "lucide-react";

export const AdminVerificationQueue = () => {
  const { data, updateWorkerVerification } = useAppData();
  const { addToast } = useToast();

  const workers = data.workers || [];

  const handleApprove = (workerId) => {
    updateWorkerVerification(workerId, "identityDocument", "Govt ID Verified (Admin Approved)");
    updateWorkerVerification(workerId, "addressDocument", "Utility Proof (Admin Approved)");
    addToast(`Approved verification for worker ${workerId}. Trust badges updated.`, "success");
  };

  const handleApprovePolice = (workerId) => {
    updateWorkerVerification(
      workerId,
      "criminalBackgroundCheck",
      "Clean Criminal Record Verified via Simulated Police Verification Record"
    );
    addToast(`Police verification certificate approved for worker ${workerId}.`, "success");
  };

  const handleRequestInfo = (workerId) => {
    updateWorkerVerification(workerId, "addressDocument", "Needs Re-submission (Utility Bill Date > 3 Months)");
    addToast(`Requested updated address documentation from worker ${workerId}.`, "info");
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <span className="text-xs font-bold text-stone-500 uppercase tracking-wider">
            Trust & Compliance Queue
          </span>
          <h1 className="text-2xl font-extrabold text-stone-900 mt-0.5">
            Worker Verification Submissions
          </h1>
          <p className="text-xs text-stone-500 mt-1">
            Review submitted government ID proofs, residential utility records, and third-party police check requests.
          </p>
        </div>

        {/* Verification Cards */}
        <div className="space-y-4">
          {workers.map((w) => (
            <div
              key={w.id}
              className="bg-white rounded-3xl border border-stone-200 p-6 shadow-xs space-y-4 text-xs"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-stone-100">
                <div className="flex items-center gap-3">
                  <img
                    src={w.avatar}
                    alt={w.name}
                    className="w-12 h-12 rounded-full object-cover border border-stone-200"
                  />
                  <div>
                    <h3 className="font-bold text-stone-900 text-sm">{w.name}</h3>
                    <p className="text-stone-500">{w.primaryService} • {w.locations?.slice(0, 2).join(", ")}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="font-mono text-stone-400 font-bold">{w.id}</span>
                  <span className="text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-full font-semibold border border-emerald-200">
                    {w.attendanceScore}% Punctual
                  </span>
                </div>
              </div>

              {/* Submitted Documents Status Row */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="p-3 bg-stone-50 rounded-xl border border-stone-200 space-y-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-stone-400 block">
                    Government ID Review
                  </span>
                  <p className="font-semibold text-stone-800">{w.verificationDetails?.identityDocument}</p>
                </div>

                <div className="p-3 bg-stone-50 rounded-xl border border-stone-200 space-y-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-stone-400 block">
                    Address Proof Record
                  </span>
                  <p className="font-semibold text-stone-800">{w.verificationDetails?.addressDocument}</p>
                </div>

                <div className="p-3 bg-stone-50 rounded-xl border border-stone-200 space-y-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-stone-400 block">
                    Police / Criminal Check
                  </span>
                  <p className="font-semibold text-stone-800">
                    {w.verificationDetails?.criminalBackgroundCheck || "Not Submitted"}
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-wrap items-center justify-between gap-3">
                <span className="text-[11px] text-stone-400">
                  Verification Officer: Pooja Rao (Admin Ops)
                </span>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => handleRequestInfo(w.id)}
                    className="px-3 py-1.5 border border-stone-200 hover:bg-stone-50 text-stone-700 font-semibold rounded-lg"
                  >
                    Request More Info
                  </button>

                  <button
                    type="button"
                    onClick={() => handleApprovePolice(w.id)}
                    className="px-3 py-1.5 bg-indigo-50 border border-indigo-200 text-indigo-900 font-semibold rounded-lg hover:bg-indigo-100"
                  >
                    Grant Police Check Badge
                  </button>

                  <button
                    type="button"
                    onClick={() => handleApprove(w.id)}
                    className="px-4 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-lg shadow-xs flex items-center gap-1"
                  >
                    <Check className="w-3.5 h-3.5" />
                    <span>Approve ID & Address</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminVerificationQueue;
