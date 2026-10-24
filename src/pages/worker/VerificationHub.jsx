// src/pages/worker/VerificationHub.jsx
import React, { useState } from "react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import { TrustBadge } from "../../components/badges/TrustBadge";
import { useAppData } from "../../context/AppDataContext";
import { useAuth } from "../../context/AuthContext";
import { useToast } from "../../components/notifications/ToastProvider";
import {
  ShieldCheck,
  FileCheck2,
  MapPin,
  Users,
  AlertTriangle,
  UploadCloud,
  CheckCircle2,
  Clock,
  ArrowRight
} from "lucide-react";

export const WorkerVerificationHub = () => {
  const { data, updateWorkerVerification } = useAppData();
  const { user } = useAuth();
  const { addToast } = useToast();

  const workerId = user?.id || "w1";
  const worker = (data.workers || []).find((w) => w.id === workerId) || (data.workers || [])[0];

  const [idDocType, setIdDocType] = useState("Voter ID / Driving License");
  const [addressDocType, setAddressDocType] = useState("Electricity Bill");
  const [referenceName, setReferenceName] = useState("R. K. Sharma (Past Household)");
  const [requestBgCheck, setRequestBgCheck] = useState(false);

  const handleSimulateSubmit = (e) => {
    e.preventDefault();
    updateWorkerVerification(worker.id, "identityDocument", `${idDocType} (Simulated Review Complete)`);
    updateWorkerVerification(worker.id, "addressDocument", `${addressDocType} (Verified in Demo)`);
    if (requestBgCheck) {
      updateWorkerVerification(worker.id, "criminalBackgroundCheck", "Clean Criminal Record Verified via Simulated Police Verification Record");
    }
    addToast("Simulated verification documents submitted for operations review!", "success");
  };

  return (
    <DashboardLayout role="worker">
      <div className="max-w-4xl mx-auto space-y-6">
        <div>
          <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider">
            Trust & Credentialing
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-stone-900 mt-0.5">
            Worker Verification Hub
          </h1>
          <p className="text-xs sm:text-sm text-stone-600 mt-1">
            Build your transparent trust portfolio. Verified credentials unlock higher visibility, repeat clients, and guaranteed escrow bookings.
          </p>
        </div>

        {/* Ethical Prototype Disclaimer as required by prompt */}
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 text-xs text-amber-900 space-y-1">
          <div className="flex items-center gap-2 font-bold text-sm">
            <AlertTriangle className="w-4 h-4 text-amber-700" />
            <span>Prototype Privacy Rule</span>
          </div>
          <p className="leading-relaxed">
            Actual identity documents are <strong>not uploaded or stored</strong> by this prototype. Never upload real Aadhaar, PAN, or sensitive biometric numbers here. All submissions below simulate the operational verification workflow.
          </p>
        </div>

        {/* Current Active Badges */}
        <div className="bg-white rounded-3xl border border-stone-200 p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-stone-100">
            <h2 className="text-base font-bold text-stone-900">Your Current Trust Badges</h2>
            <span className="text-xs text-stone-500">Live on Public Profile</span>
          </div>

          <div className="flex flex-wrap gap-2">
            {worker.trustBadges?.map((b) => (
              <TrustBadge key={b.id} badgeId={b.id} customLabel={b.label} verified={b.verified} size="md" />
            ))}
          </div>
        </div>

        {/* Multi-step Verification Submission Simulator */}
        <div className="bg-white rounded-3xl border border-stone-200 p-6 sm:p-8 shadow-xs space-y-6">
          <h2 className="text-lg font-bold text-stone-900">Submit Verification Records (Demo)</h2>

          <form onSubmit={handleSimulateSubmit} className="space-y-6 text-xs">
            {/* Step 1: ID Doc */}
            <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-bold text-stone-900 text-sm flex items-center gap-2">
                  <FileCheck2 className="w-4 h-4 text-emerald-600" />
                  <span>Step 1: Government Identity Document</span>
                </span>
                <span className="text-emerald-700 font-semibold bg-emerald-100/70 px-2 py-0.5 rounded text-[11px]">
                  Document Review
                </span>
              </div>
              <p className="text-stone-500 text-[11px]">
                Validates worker's name, age eligibility, and identity.
              </p>
              <select
                value={idDocType}
                onChange={(e) => setIdDocType(e.target.value)}
                className="w-full text-xs p-2.5 border border-stone-300 rounded-xl bg-white outline-hidden focus:ring-2 focus:ring-emerald-500"
              >
                <option value="Voter ID Card">Voter ID Card (Election Commission of India)</option>
                <option value="Driving License">State Transport Driving License</option>
                <option value="Govt Worker Card">Govt E-Shram / Artisan Registry Card</option>
              </select>
            </div>

            {/* Step 2: Address Proof */}
            <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-bold text-stone-900 text-sm flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-blue-600" />
                  <span>Step 2: Local Address Proof</span>
                </span>
                <span className="text-blue-700 font-semibold bg-blue-100/70 px-2 py-0.5 rounded text-[11px]">
                  Residence Verification
                </span>
              </div>
              <p className="text-stone-500 text-[11px]">
                Validates local operational presence in the city.
              </p>
              <select
                value={addressDocType}
                onChange={(e) => setAddressDocType(e.target.value)}
                className="w-full text-xs p-2.5 border border-stone-300 rounded-xl bg-white outline-hidden focus:ring-2 focus:ring-emerald-500"
              >
                <option value="Electricity Bill">Recent Electricity Utility Bill</option>
                <option value="Registered Rent Agreement">Registered Rent / Lease Agreement</option>
                <option value="Gas Connection Receipt">LPG Gas Connection Receipt</option>
              </select>
            </div>

            {/* Step 3: Reference Check */}
            <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-bold text-stone-900 text-sm flex items-center gap-2">
                  <Users className="w-4 h-4 text-purple-600" />
                  <span>Step 3: Past Client / Household References</span>
                </span>
                <span className="text-purple-700 font-semibold bg-purple-100/70 px-2 py-0.5 rounded text-[11px]">
                  Reference Check
                </span>
              </div>
              <input
                type="text"
                value={referenceName}
                onChange={(e) => setReferenceName(e.target.value)}
                placeholder="Name of previous household employer or contractor"
                className="w-full text-xs p-2.5 border border-stone-300 rounded-xl bg-white outline-hidden focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            {/* Step 4: Police / Criminal Background Check Option */}
            <div className="p-4 rounded-2xl bg-indigo-50/70 border border-indigo-200 space-y-2">
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="policeCheck"
                  checked={requestBgCheck}
                  onChange={(e) => setRequestBgCheck(e.target.checked)}
                  className="w-4 h-4 text-indigo-600 rounded border-stone-300 focus:ring-indigo-500"
                />
                <label htmlFor="policeCheck" className="font-bold text-indigo-950 text-xs cursor-pointer">
                  Request Official Police Background Verification Record Search
                </label>
              </div>
              <p className="text-[11px] text-indigo-800 leading-relaxed pl-6">
                KaamSetu submits record queries to third-party court record search partners. Note: Identity document review alone does not qualify for this badge.
              </p>
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="submit"
                className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-xs transition-colors flex items-center gap-2"
              >
                <UploadCloud className="w-4 h-4" />
                <span>Submit Simulated Verification Records</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default WorkerVerificationHub;
