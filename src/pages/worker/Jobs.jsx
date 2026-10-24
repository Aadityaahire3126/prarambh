// src/pages/worker/Jobs.jsx
import React from "react";
import { Link } from "react-router-dom";
import DashboardLayout from "../../components/layout/DashboardLayout";
import { useAppData } from "../../context/AppDataContext";
import { useToast } from "../../components/notifications/ToastProvider";
import { Briefcase, MapPin, Calendar, Clock, Check, X, ShieldCheck, ArrowRight } from "lucide-react";

export const WorkerJobs = () => {
  const { data, updateBookingStatus } = useAppData();
  const { addToast } = useToast();

  const availableJobs = (data.bookings || []).filter(
    (b) => b.status === "Booking Requested" || b.status === "Matching"
  );

  const handleAccept = (bookingId) => {
    updateBookingStatus(bookingId, "Worker Accepted");
    addToast(`Job ${bookingId} accepted! Check your schedule & Safety Check-In.`, "success");
  };

  const handleDecline = (bookingId) => {
    updateBookingStatus(bookingId, "Cancelled");
    addToast(`Job ${bookingId} declined.`, "info");
  };

  return (
    <DashboardLayout role="worker">
      <div className="space-y-6">
        <div>
          <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider">
            Incoming Opportunities
          </span>
          <h1 className="text-2xl font-extrabold text-stone-900 mt-0.5">
            Matching Job Requests ({availableJobs.length})
          </h1>
          <p className="text-xs text-stone-500 mt-1">
            Review client requirements, estimated hours, and payout. Transparent rates with guaranteed escrow protection.
          </p>
        </div>

        {availableJobs.length === 0 ? (
          <div className="bg-white rounded-3xl border border-stone-200 p-12 text-center text-xs text-stone-500 space-y-2">
            <Briefcase className="w-10 h-10 text-stone-300 mx-auto" />
            <h3 className="font-bold text-stone-800 text-sm">No new job leads right now</h3>
            <p>You have responded to all available requests in your service areas.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {availableJobs.map((job) => (
              <div
                key={job.id}
                className="bg-white rounded-3xl border border-stone-200 p-6 shadow-xs hover:border-emerald-300 transition-all space-y-4"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-stone-100">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-mono text-xs font-bold text-stone-500 bg-stone-100 px-2 py-0.5 rounded">
                        {job.id}
                      </span>
                      <span className="text-[11px] font-semibold text-emerald-800 bg-emerald-100 px-2.5 py-0.5 rounded-full">
                        Escrow Guaranteed
                      </span>
                    </div>
                    <h3 className="text-lg font-bold text-stone-900">{job.serviceName}</h3>
                  </div>

                  <div className="text-left sm:text-right">
                    <span className="text-stone-400 text-xs block">Guaranteed Payout</span>
                    <span className="text-2xl font-extrabold text-emerald-800">₹{job.estimatedTotal}</span>
                    <span className="text-[10px] text-stone-500 block">({job.durationHours} hrs × ₹{job.ratePerHour})</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-stone-700">
                  <div className="space-y-1">
                    <span className="text-stone-400 block font-medium">Customer / Household:</span>
                    <span className="font-bold text-stone-900">{job.customerName}</span>
                    <span className="text-stone-500 block text-[11px]">{job.customerPhone}</span>
                  </div>

                  <div className="space-y-1">
                    <span className="text-stone-400 block font-medium">Schedule Timing:</span>
                    <div className="flex items-center gap-1.5 font-semibold text-stone-900">
                      <Calendar className="w-3.5 h-3.5 text-stone-400" />
                      <span>{job.scheduledDate} ({job.scheduledTime})</span>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <span className="text-stone-400 block font-medium">Service Locality:</span>
                    <div className="flex items-start gap-1 text-stone-700">
                      <MapPin className="w-3.5 h-3.5 text-stone-400 shrink-0 mt-0.5" />
                      <span className="line-clamp-2">{job.address}</span>
                    </div>
                  </div>
                </div>

                {job.specialInstructions && (
                  <div className="p-3 bg-stone-50 rounded-xl border border-stone-200 text-xs text-stone-700">
                    <span className="font-semibold block mb-0.5">Customer Instructions:</span>
                    <p>{job.specialInstructions}</p>
                  </div>
                )}

                <div className="flex items-center justify-between pt-2">
                  <div className="flex items-center gap-1.5 text-xs text-emerald-700 font-medium">
                    <ShieldCheck className="w-4 h-4 text-emerald-600" />
                    <span>Free cancellation before travel start</span>
                  </div>

                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => handleDecline(job.id)}
                      className="px-4 py-2 border border-stone-200 text-stone-600 hover:text-stone-900 hover:bg-stone-50 text-xs font-semibold rounded-xl transition-colors"
                    >
                      Decline
                    </button>
                    <button
                      type="button"
                      onClick={() => handleAccept(job.id)}
                      className="px-6 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl shadow-xs transition-colors flex items-center gap-1.5"
                    >
                      <Check className="w-4 h-4" />
                      <span>Accept Booking</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default WorkerJobs;
