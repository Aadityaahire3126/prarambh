// src/pages/customer/Matches.jsx
import React, { useState } from "react";
import { useSearchParams, Link, useNavigate } from "react-router-dom";
import DashboardLayout from "../../components/layout/DashboardLayout";
import { TrustBadge } from "../../components/badges/TrustBadge";
import { useAppData } from "../../context/AppDataContext";
import { useAuth } from "../../context/AuthContext";
import { useToast } from "../../components/notifications/ToastProvider";
import {
  Sparkles,
  Star,
  Clock,
  Users,
  MapPin,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Scale,
  X
} from "lucide-react";

export const Matches = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { data, getWorkerMatches, addBooking } = useAppData();
  const { user } = useAuth();
  const { addToast } = useToast();

  const reqId = searchParams.get("reqId");
  const currentReq =
    (data.requirements || []).find((r) => r.id === reqId) || (data.requirements || [])[0];

  const matches = getWorkerMatches(currentReq);

  // Compare Profiles Modal
  const [compareModalOpen, setCompareModalOpen] = useState(false);
  const [selectedForCompare, setSelectedForCompare] = useState([]);

  const toggleCompare = (workerId) => {
    if (selectedForCompare.includes(workerId)) {
      setSelectedForCompare(selectedForCompare.filter((id) => id !== workerId));
    } else {
      if (selectedForCompare.length >= 3) {
        addToast("You can compare up to 3 profiles at once.", "info");
        return;
      }
      setSelectedForCompare([...selectedForCompare, workerId]);
    }
  };

  const handleInstantBooking = (worker) => {
    const newBooking = addBooking({
      requirementId: currentReq?.id,
      workerId: worker.id,
      workerName: worker.name,
      workerAvatar: worker.avatar,
      serviceName: currentReq?.category || worker.primaryService,
      customerId: user?.id || "c1",
      customerName: user?.name || "Rohit Mehta",
      customerPhone: "+91 98101 XXXXX (Protected)",
      address: currentReq?.privateAddress || "Flat 402, Block C, Lajpat Nagar IV",
      scheduledDate: currentReq?.preferredDate || "2026-10-26",
      scheduledTime: currentReq?.preferredTime || "09:30 AM",
      durationHours: 3,
      ratePerHour: worker.ratePerHour,
      specialInstructions: currentReq?.specialInstructions || "Standard clean service.",
    });

    addToast(`Booking ${newBooking.id} requested for ${worker.name}!`, "success");
    navigate(`/customer/bookings/${newBooking.id}`);
  };

  const comparedWorkers = (data.workers || []).filter((w) => selectedForCompare.includes(w.id));

  return (
    <DashboardLayout role="customer">
      <div className="space-y-6">
        {/* Requirement Header Overview */}
        <div className="bg-white rounded-3xl border border-stone-200 p-6 sm:p-8 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[11px] font-bold text-emerald-800 uppercase tracking-wider bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                Active Requirement Match
              </span>
              <span className="text-xs text-stone-500 font-mono">{currentReq?.id}</span>
            </div>
            <h1 className="text-2xl font-extrabold text-stone-900">{currentReq?.title}</h1>
            <p className="text-xs text-stone-600 mt-1 max-w-2xl">
              {currentReq?.description}
            </p>
            <div className="flex flex-wrap items-center gap-3 text-xs text-stone-500 pt-2">
              <span>Category: <strong>{currentReq?.category}</strong></span>
              <span>•</span>
              <span>Budget: <strong>₹{currentReq?.budgetMin} - ₹{currentReq?.budgetMax}/hr</strong></span>
              <span>•</span>
              <span>Locality: <strong>{currentReq?.locality}</strong></span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {selectedForCompare.length > 1 && (
              <button
                type="button"
                onClick={() => setCompareModalOpen(true)}
                className="px-4 py-2 bg-stone-900 hover:bg-stone-800 text-white font-semibold text-xs rounded-xl shadow-xs transition-colors flex items-center gap-1.5"
              >
                <Scale className="w-4 h-4" />
                <span>Compare {selectedForCompare.length} Profiles</span>
              </button>
            )}
            <Link
              to="/customer/post-requirement"
              className="text-xs font-semibold text-emerald-700 hover:text-emerald-800 px-3 py-2 border border-stone-200 rounded-xl hover:bg-stone-50 transition-colors"
            >
              Edit Requirement
            </Link>
          </div>
        </div>

        {/* Explainable Matching Disclaimer */}
        <div className="bg-emerald-50/70 border border-emerald-200 rounded-2xl p-4 text-xs text-emerald-900 flex items-start gap-2.5">
          <Sparkles className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            <strong>How suggested matches are calculated:</strong> Our demo algorithm evaluates exact service category compatibility, locality proximity, budget alignment, punctuality history, and verified trust evidence on file.
          </p>
        </div>

        {/* Matches List */}
        <div className="space-y-4">
          <h2 className="text-lg font-bold text-stone-900">
            Suggested Verified Candidates ({matches.length})
          </h2>

          <div className="space-y-4">
            {matches.map(({ worker, matchScore, matchReasons }) => {
              const isSelected = selectedForCompare.includes(worker.id);

              return (
                <div
                  key={worker.id}
                  className="bg-white rounded-2xl border border-stone-200 p-6 shadow-xs hover:shadow-sm transition-all flex flex-col lg:flex-row lg:items-center justify-between gap-6"
                >
                  <div className="flex items-start gap-4">
                    <img
                      src={worker.avatar}
                      alt={worker.name}
                      className="w-16 h-16 rounded-2xl object-cover border-2 border-stone-100 shrink-0"
                    />

                    <div className="space-y-1.5">
                      <div className="flex items-center gap-2">
                        <Link
                          to={`/workers/${worker.id}`}
                          className="font-bold text-stone-900 text-lg hover:text-emerald-700"
                        >
                          {worker.name}
                        </Link>
                        <span className="text-xs bg-emerald-100 text-emerald-900 font-extrabold px-2.5 py-0.5 rounded-full">
                          {matchScore}% Match
                        </span>
                      </div>

                      <p className="text-xs text-stone-600">
                        {worker.primaryService} • {worker.experienceYears} yrs exp • ₹{worker.ratePerHour}/hr
                      </p>

                      {/* Why this matched explanation */}
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {matchReasons.map((reason, idx) => (
                          <span
                            key={idx}
                            className="text-[11px] font-medium bg-stone-100 text-stone-700 px-2.5 py-0.5 rounded-full border border-stone-200 flex items-center gap-1"
                          >
                            <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                            <span>{reason}</span>
                          </span>
                        ))}
                      </div>

                      {/* Trust Badges */}
                      <div className="flex flex-wrap gap-1.5 pt-1.5">
                        {worker.trustBadges?.slice(0, 3).map((b) => (
                          <TrustBadge key={b.id} badgeId={b.id} customLabel={b.label} verified={b.verified} size="sm" />
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Actions Column */}
                  <div className="flex flex-row lg:flex-col items-center lg:items-end justify-between gap-3 pt-4 lg:pt-0 border-t lg:border-t-0 border-stone-100 shrink-0">
                    <div>
                      <span className="text-xs text-stone-400 block lg:text-right">Estimated Total</span>
                      <span className="text-lg font-extrabold text-stone-900">
                        ₹{worker.ratePerHour * 3 + 50}
                        <span className="text-xs font-normal text-stone-500"> (3h + fee)</span>
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => toggleCompare(worker.id)}
                        className={`text-xs px-3 py-2 rounded-xl font-medium border transition-colors ${
                          isSelected
                            ? "bg-stone-900 text-white border-stone-900"
                            : "bg-white text-stone-700 border-stone-200 hover:bg-stone-50"
                        }`}
                      >
                        {isSelected ? "Comparing" : "Compare"}
                      </button>

                      <button
                        type="button"
                        onClick={() => handleInstantBooking(worker)}
                        className="text-xs font-semibold bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white px-4 py-2 rounded-xl shadow-xs transition-colors flex items-center gap-1"
                      >
                        <span>Request Booking</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Profile Comparison Modal */}
      {compareModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl shadow-2xl max-w-4xl w-full p-6 border border-stone-200 relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setCompareModalOpen(false)}
              className="absolute top-4 right-4 text-stone-400 hover:text-stone-700 p-1 rounded-lg hover:bg-stone-100"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-xl font-bold text-stone-900 mb-4 flex items-center gap-2">
              <Scale className="w-5 h-5 text-emerald-700" />
              <span>Side-by-Side Candidate Comparison</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {comparedWorkers.map((w) => (
                <div key={w.id} className="p-4 bg-stone-50 rounded-2xl border border-stone-200 space-y-3 text-xs">
                  <div className="text-center pb-2 border-b border-stone-200">
                    <img
                      src={w.avatar}
                      alt={w.name}
                      className="w-16 h-16 rounded-full object-cover mx-auto mb-2 border-2 border-emerald-500"
                    />
                    <h4 className="font-bold text-stone-900 text-sm">{w.name}</h4>
                    <p className="text-stone-500">{w.primaryService}</p>
                    <span className="text-emerald-700 font-extrabold text-base block mt-1">₹{w.ratePerHour}/hr</span>
                  </div>

                  <div className="space-y-2">
                    <div>
                      <span className="text-stone-400 block font-semibold">Rating & Completed:</span>
                      <span className="font-bold text-stone-800">{w.rating}★ ({w.completedBookings} jobs)</span>
                    </div>

                    <div>
                      <span className="text-stone-400 block font-semibold">Attendance & Punctuality:</span>
                      <span className="font-bold text-stone-800">{w.attendanceScore}% on-time arrival</span>
                    </div>

                    <div>
                      <span className="text-stone-400 block font-semibold">Repeat Households:</span>
                      <span className="font-bold text-purple-800">{w.repeatCustomers} regular clients</span>
                    </div>

                    <div>
                      <span className="text-stone-400 block font-semibold">Criminal Record Status:</span>
                      <span className="font-medium text-stone-800">
                        {w.trustBadges?.some((b) => b.id === "bg_check" && b.verified)
                          ? "✓ Police Record Verified"
                          : "Pending / Document Review Only"}
                      </span>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      setCompareModalOpen(false);
                      handleInstantBooking(w);
                    }}
                    className="w-full py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-center"
                  >
                    Select & Book
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
};

export default Matches;
