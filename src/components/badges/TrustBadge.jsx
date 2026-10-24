// src/components/badges/TrustBadge.jsx
import React, { useState } from "react";
import { ShieldCheck, MapPin, Briefcase, Star, Users, Clock, AlertCircle, Info, X } from "lucide-react";

const BADGE_CONFIG = {
  id_checked: {
    icon: ShieldCheck,
    title: "Identity Checked",
    color: "bg-emerald-50 text-emerald-800 border-emerald-300",
    iconColor: "text-emerald-600",
    description: "Submitted official government ID document was verified in this demo.",
    limitation: "Does NOT constitute a criminal record search or police verification.",
  },
  address_checked: {
    icon: MapPin,
    title: "Address Checked",
    color: "bg-blue-50 text-blue-800 border-blue-300",
    iconColor: "text-blue-600",
    description: "Residential utility bill or registered lease agreement verified.",
    limitation: "Validates current residence claim at the time of onboarding only.",
  },
  work_history: {
    icon: Briefcase,
    title: "Work History Available",
    color: "bg-amber-50 text-amber-800 border-amber-300",
    iconColor: "text-amber-600",
    description: "Candidate has documented past household or contractor engagements.",
    limitation: "Past experience does not guarantee identical future performance.",
  },
  highly_rated: {
    icon: Star,
    title: "Highly Rated",
    color: "bg-yellow-50 text-yellow-900 border-yellow-300",
    iconColor: "text-yellow-600",
    description: "Consistently rated 4.5+ stars across verified platform bookings.",
    limitation: "Ratings represent individual customer subjective feedback.",
  },
  repeat_customers: {
    icon: Users,
    title: "Repeat Customers",
    color: "bg-purple-50 text-purple-800 border-purple-300",
    iconColor: "text-purple-600",
    description: "Multiple households have re-booked this professional repeatedly.",
    limitation: "Reflects ongoing client satisfaction and retention history.",
  },
  attendance_record: {
    icon: Clock,
    title: "Punctual Record",
    color: "bg-teal-50 text-teal-800 border-teal-300",
    iconColor: "text-teal-600",
    description: "Historical on-time arrival rate exceeds 90% across completed visits.",
    limitation: "Occasional transit or traffic delays may still occur.",
  },
  bg_check: {
    icon: AlertCircle,
    title: "Background Check",
    color: "bg-indigo-50 text-indigo-900 border-indigo-300",
    iconColor: "text-indigo-600",
    description: "Third-party court record search or local police clearance documentation on file.",
    limitation: "Only displayed when documentation is officially marked complete. Never guarantees zero risk.",
  },
};

export const TrustBadge = ({ badgeId, customLabel, verified = true, size = "sm", showTooltip = true }) => {
  const [showModal, setShowModal] = useState(false);
  const config = BADGE_CONFIG[badgeId] || {
    icon: ShieldCheck,
    title: customLabel || "Verified Attribute",
    color: "bg-gray-50 text-gray-800 border-gray-300",
    iconColor: "text-gray-600",
    description: "Documented platform trust indicator.",
    limitation: "Demonstration purpose attribute.",
  };

  const Icon = config.icon;
  const isPending = !verified;

  return (
    <>
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          setShowModal(true);
        }}
        title="Click to inspect trust verification evidence"
        className={`inline-flex items-center gap-1.5 border font-medium rounded-full transition-all hover:shadow-xs active:scale-95 ${
          size === "sm" ? "px-2.5 py-0.5 text-xs" : "px-3 py-1 text-sm"
        } ${
          isPending
            ? "bg-stone-100 text-stone-600 border-stone-300 opacity-75"
            : config.color
        }`}
      >
        <Icon className={`${size === "sm" ? "w-3.5 h-3.5" : "w-4 h-4"} ${isPending ? "text-stone-400" : config.iconColor}`} />
        <span>{customLabel || config.title}</span>
        {isPending ? (
          <span className="text-[10px] bg-stone-200 text-stone-700 px-1 rounded-sm ml-0.5">Pending</span>
        ) : (
          <Info className="w-3 h-3 opacity-60 ml-0.5" />
        )}
      </button>

      {/* Explanatory Popover Modal */}
      {showModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs"
          onClick={() => setShowModal(false)}
        >
          <div
            className="bg-white rounded-xl shadow-xl max-w-md w-full p-5 border border-stone-200 relative animate-in fade-in zoom-in-95 duration-150"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 text-stone-400 hover:text-stone-700 p-1 rounded-lg hover:bg-stone-100"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-3">
              <div className={`p-2.5 rounded-lg border ${config.color}`}>
                <Icon className={`w-6 h-6 ${config.iconColor}`} />
              </div>
              <div>
                <h3 className="font-semibold text-stone-900 text-base">{config.title}</h3>
                <span
                  className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                    verified ? "bg-emerald-100 text-emerald-800" : "bg-amber-100 text-amber-800"
                  }`}
                >
                  {verified ? "Verified Evidence on File" : "Pending / Optional"}
                </span>
              </div>
            </div>

            <div className="space-y-3 text-sm text-stone-700 mb-4">
              <div>
                <h4 className="font-medium text-stone-900 mb-0.5">What this check means:</h4>
                <p className="bg-stone-50 p-2.5 rounded-lg border border-stone-200 text-xs leading-relaxed">
                  {config.description}
                </p>
              </div>

              <div>
                <h4 className="font-medium text-stone-900 mb-0.5">Transparent Limitation (Fairness Policy):</h4>
                <p className="bg-amber-50/70 p-2.5 rounded-lg border border-amber-200 text-amber-900 text-xs leading-relaxed">
                  {config.limitation}
                </p>
              </div>
            </div>

            <div className="border-t border-stone-100 pt-3 flex items-center justify-between text-xs text-stone-500">
              <span>KaamSetu Explainable Trust Standard</span>
              <button
                onClick={() => setShowModal(false)}
                className="px-3 py-1.5 bg-stone-900 text-white rounded-lg hover:bg-stone-800 font-medium"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default TrustBadge;
