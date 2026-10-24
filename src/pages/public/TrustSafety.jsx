// src/pages/public/TrustSafety.jsx
import React from "react";
import Header from "../../components/layout/Header";
import Footer from "../../components/layout/Footer";
import { TrustBadge } from "../../components/badges/TrustBadge";
import {
  ShieldCheck,
  AlertTriangle,
  Lock,
  EyeOff,
  Scale,
  Users,
  FileText,
  LifeBuoy,
  KeyRound,
  CheckCircle2
} from "lucide-react";

export const TrustSafety = () => {
  return (
    <div className="min-h-screen flex flex-col bg-stone-50">
      <Header />

      <div className="bg-white border-b border-stone-200 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider">
            KaamSetu Trust Framework
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-stone-900">
            Trust & Safety: Honest, Evidence-Based Policies
          </h1>
          <p className="text-sm sm:text-base text-stone-600 max-w-2xl mx-auto leading-relaxed">
            We reject the industry practice of stamping meaningless "100% Safe" badges. True safety comes from granular evidence, privacy safeguards, and mutual respect.
          </p>
        </div>
      </div>

      <main className="max-w-5xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-12 flex-1 space-y-10">
        {/* Core Principles Grid */}
        <section className="bg-white rounded-2xl border border-stone-200 p-8 shadow-xs space-y-6">
          <h2 className="text-xl font-bold text-stone-900 flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-emerald-600" />
            <span>Our 5 Principles of Marketplace Integrity</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs text-stone-700">
            <div className="p-4 rounded-xl bg-stone-50 border border-stone-200 space-y-2">
              <h3 className="font-bold text-stone-900 text-sm flex items-center gap-2">
                <span className="text-emerald-700 font-mono font-bold">1.</span>
                <span>Explainable Badges over Generic Labels</span>
              </h3>
              <p className="leading-relaxed">
                Customers always see <em>why</em> a badge exists. An Identity Check means document verification was completed; it is never conflated with a criminal record check.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-stone-50 border border-stone-200 space-y-2">
              <h3 className="font-bold text-stone-900 text-sm flex items-center gap-2">
                <span className="text-emerald-700 font-mono font-bold">2.</span>
                <span>Zero False Guarantees of Immunity</span>
              </h3>
              <p className="leading-relaxed">
                We do not promise "zero risk" or claim that theft or mishaps are impossible. Unforeseen situations happen; what matters is our transparent mediation, escrow protection, and incident response.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-stone-50 border border-stone-200 space-y-2">
              <h3 className="font-bold text-stone-900 text-sm flex items-center gap-2">
                <span className="text-emerald-700 font-mono font-bold">3.</span>
                <span>No Public Phone Numbers or Private Addresses</span>
              </h3>
              <p className="leading-relaxed">
                Worker and customer telephone numbers are never published on public search results. Customer home addresses are private and revealed only after a booking is confirmed.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-stone-50 border border-stone-200 space-y-2">
              <h3 className="font-bold text-stone-900 text-sm flex items-center gap-2">
                <span className="text-emerald-700 font-mono font-bold">4.</span>
                <span>Dignity & Non-Accusatory Safety Protocols</span>
              </h3>
              <p className="leading-relaxed">
                If a worker is delayed or misses an arrival OTP, the system logs "Check-in Pending" for human check-in. We never automatically brand workers as suspicious without investigation.
              </p>
            </div>
          </div>
        </section>

        {/* Breakdown of Verification Badges */}
        <section id="criminal-checks" className="bg-white rounded-2xl border border-stone-200 p-8 shadow-xs space-y-6">
          <h2 className="text-xl font-bold text-stone-900 flex items-center gap-2">
            <FileText className="w-5 h-5 text-emerald-600" />
            <span>Understanding KaamSetu's Verification Badges</span>
          </h2>

          <div className="space-y-4 text-xs">
            <div className="p-4 rounded-xl border border-emerald-200 bg-emerald-50/50 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <TrustBadge badgeId="id_checked" customLabel="Identity Checked" verified={true} size="sm" />
                  <span className="font-bold text-stone-900">Government ID Match</span>
                </div>
                <p className="text-stone-600">
                  Worker submitted official proof of identity (Aadhaar, Voter ID, or Driving License in simulated demo). Name, age eligibility, and photo are reviewed.
                </p>
              </div>
              <span className="text-[11px] font-semibold text-emerald-800 bg-emerald-100 px-2.5 py-1 rounded-full whitespace-nowrap">
                Documentary Verification
              </span>
            </div>

            <div className="p-4 rounded-xl border border-blue-200 bg-blue-50/50 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <TrustBadge badgeId="address_checked" customLabel="Address Checked" verified={true} size="sm" />
                  <span className="font-bold text-stone-900">Current Residence Verification</span>
                </div>
                <p className="text-stone-600">
                  Residential address matched with recent electricity/gas bill or registered lease agreement in the worker's operational city.
                </p>
              </div>
              <span className="text-[11px] font-semibold text-blue-800 bg-blue-100 px-2.5 py-1 rounded-full whitespace-nowrap">
                Residence Verification
              </span>
            </div>

            <div className="p-4 rounded-xl border border-indigo-200 bg-indigo-50/50 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <TrustBadge badgeId="bg_check" customLabel="Criminal Background Check" verified={true} size="sm" />
                  <span className="font-bold text-stone-900">Police / Court Records</span>
                </div>
                <p className="text-stone-600">
                  Only marked "Completed" if an official police verification certificate or court civil/criminal database search has been completed. Otherwise explicitly marked <em>Pending</em> or <em>Not Initiated</em>.
                </p>
              </div>
              <span className="text-[11px] font-semibold text-indigo-800 bg-indigo-100 px-2.5 py-1 rounded-full whitespace-nowrap">
                Formal Police Check
              </span>
            </div>
          </div>
        </section>

    
      </main>

      <Footer />
    </div>
  );
};

export default TrustSafety;
