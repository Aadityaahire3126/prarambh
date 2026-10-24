// src/pages/public/HowItWorks.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import Header from "../../components/layout/Header";
import Footer from "../../components/layout/Footer";
import {
  ShieldCheck,
  Search,
  FileCheck2,
  KeyRound,
  CheckCircle2,
  Clock,
  HeartHandshake,
  ArrowRight,
  Sparkles,
  Lock,
  LifeBuoy
} from "lucide-react";

export const HowItWorks = () => {
  const [tab, setTab] = useState("customer");

  return (
    <div className="min-h-screen flex flex-col bg-stone-50">
      <Header />

      <div className="bg-white border-b border-stone-200 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider">
            Operational Blueprint
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-stone-900">
            How KaamSetu Protects Households & Workers
          </h1>
          <p className="text-sm sm:text-base text-stone-600 max-w-2xl mx-auto leading-relaxed">
            Built from first principles for Indian homes. Learn how our explainable trust verification, doorstep OTP arrival, and transparent escrow workflows work.
          </p>

          <div className="flex justify-center gap-3 pt-2">
            <button
              onClick={() => setTab("customer")}
              className={`px-5 py-2.5 text-xs font-bold rounded-full border transition-all ${
                tab === "customer"
                  ? "bg-emerald-600 text-white border-emerald-600 shadow-xs"
                  : "bg-white text-stone-700 border-stone-300 hover:bg-stone-50"
              }`}
            >
              Household & Customer Journey
            </button>
            <button
              onClick={() => setTab("worker")}
              className={`px-5 py-2.5 text-xs font-bold rounded-full border transition-all ${
                tab === "worker"
                  ? "bg-stone-900 text-white border-stone-900 shadow-xs"
                  : "bg-white text-stone-700 border-stone-300 hover:bg-stone-50"
              }`}
            >
              Service Professional Journey
            </button>
          </div>
        </div>
      </div>

      <main className="max-w-5xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-12 flex-1">
        {tab === "customer" ? (
          <div className="space-y-8">
            <div className="bg-white rounded-2xl border border-stone-200 p-8 shadow-xs">
              <h2 className="text-xl font-bold text-stone-900 mb-6 flex items-center gap-2">
                <span className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center text-sm font-bold">1</span>
                <span>Requirement Discovery & Profile Comparison</span>
              </h2>
              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed mb-4">
                Customers either browse through our 12 service categories or post a specific home requirement detailing location, date, expected hours, and special instructions. Our matching engine returns verified professionals ranked by compatibility, proximity, and attendance track records.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs bg-stone-50 p-4 rounded-xl border border-stone-200">
                <div className="font-semibold text-stone-800">✓ Transparent Badges</div>
                <div className="font-semibold text-stone-800">✓ Documented Reviews</div>
                <div className="font-semibold text-stone-800">✓ Protected Phone Numbers</div>
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-stone-200 p-8 shadow-xs">
              <h2 className="text-xl font-bold text-stone-900 mb-6 flex items-center gap-2">
                <span className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center text-sm font-bold">2</span>
                <span>Booking Confirmation & Doorstep Arrival OTP</span>
              </h2>
              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed mb-4">
                When you request a booking, the fee is authorized in simulated escrow. Once the professional arrives at your gate or door, you provide them with your private 4-digit Arrival OTP (e.g. <strong>4821</strong>). Work only officially starts when the professional validates this code on their app.
              </p>
              <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-200 text-xs text-emerald-900">
                <strong>Why Arrival OTP matters:</strong> Eliminates confusion about technician identity, prevents unauthorized substitute staff, and marks unambiguous arrival timestamps.
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-stone-200 p-8 shadow-xs">
              <h2 className="text-xl font-bold text-stone-900 mb-6 flex items-center gap-2">
                <span className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center text-sm font-bold">3</span>
                <span>Completion Sign-off & Transparent Reviews</span>
              </h2>
              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed mb-4">
                Once the job is completed to your satisfaction, you confirm completion on your phone. Escrow payment is released to the worker. You can then submit detailed ratings for punctuality, quality, and communication. If any dispute arises, our operations mediation team steps in before payment release.
              </p>
              <Link
                to="/customer/post-requirement"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs rounded-xl shadow-xs transition-colors"
              >
                <span>Post a Requirement Now</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        ) : (
          <div className="space-y-8">
            <div className="bg-white rounded-2xl border border-stone-200 p-8 shadow-xs">
              <h2 className="text-xl font-bold text-stone-900 mb-6 flex items-center gap-2">
                <span className="w-8 h-8 rounded-full bg-stone-100 text-stone-800 flex items-center justify-center text-sm font-bold">1</span>
                <span>Onboarding & Verified Trust Portfolio</span>
              </h2>
              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed mb-4">
                Workers submit their core trade, experience, languages, and preferred work radius. Through our Verification Hub, workers submit identity proofs and references. Verified credentials earn trust badges that make profiles 3x more attractive to households.
              </p>
            </div>

            <div className="bg-white rounded-2xl border border-stone-200 p-8 shadow-xs">
              <h2 className="text-xl font-bold text-stone-900 mb-6 flex items-center gap-2">
                <span className="w-8 h-8 rounded-full bg-stone-100 text-stone-800 flex items-center justify-center text-sm font-bold">2</span>
                <span>Worker Safety Check-In Centre</span>
              </h2>
              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed mb-4">
                KaamSetu puts worker security front and center. Visiting unknown homes can be intimidating. Workers have access to the dedicated Safety Check-in screen with an "I am Safe" heartbeat button and an urgent SOS help flag that alerts the KaamSetu Operations desk immediately.
              </p>
              <div className="p-4 bg-stone-100 rounded-xl border border-stone-200 text-xs text-stone-800">
                <strong>Fair Treatment Policy:</strong> Missed check-ins or minor transit delays are treated neutrally as "Check-in Pending" for human review. Workers are never penalized arbitrarily.
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-stone-200 p-8 shadow-xs">
              <h2 className="text-xl font-bold text-stone-900 mb-6 flex items-center gap-2">
                <span className="w-8 h-8 rounded-full bg-stone-100 text-stone-800 flex items-center justify-center text-sm font-bold">3</span>
                <span>Guaranteed Payouts & Disputing Unfair Reviews</span>
              </h2>
              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed mb-4">
                Service earnings are clearly disclosed without hidden deductions. If a customer writes an abusive or malicious review, workers have the right to request administrative review rather than having their livelihood ruined by arbitrary ratings.
              </p>
              <Link
                to="/worker/dashboard"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-stone-900 hover:bg-stone-800 text-white font-semibold text-xs rounded-xl shadow-xs transition-colors"
              >
                <span>Enter Worker Demo Dashboard</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default HowItWorks;
