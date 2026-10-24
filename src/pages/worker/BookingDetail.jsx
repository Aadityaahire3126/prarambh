// src/pages/worker/BookingDetail.jsx
import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import DashboardLayout from "../../components/layout/DashboardLayout";
import SafetySosModal from "../../components/modals/SafetySosModal";
import { useAppData } from "../../context/AppDataContext";
import { useToast } from "../../components/notifications/ToastProvider";
import {
  Calendar,
  Clock,
  MapPin,
  KeyRound,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  MessageSquare,
  ArrowLeft,
  User,
  Heart
} from "lucide-react";

export const WorkerBookingDetail = () => {
  const { id } = useParams();
  const {
    data,
    confirmArrivalOtp,
    markSafeHeartbeat,
    updateJobProgress,
    updateBookingStatus
  } = useAppData();
  const { addToast } = useToast();

  const [enteredOtp, setEnteredOtp] = useState("");
  const [sosModalOpen, setSosModalOpen] = useState(false);

  const booking = (data.bookings || []).find((b) => b.id === id) || (data.bookings || [])[0];

  if (!booking) return null;

  const handleVerifyOtp = (e) => {
    e.preventDefault();
    const res = confirmArrivalOtp(booking.id, enteredOtp);
    if (res.success) {
      addToast(res.message, "success");
      setEnteredOtp("");
    } else {
      addToast(res.message, "error");
    }
  };

  const handleHeartbeat = () => {
    const res = markSafeHeartbeat(booking.id);
    addToast(`'I am Safe' heartbeat logged at ${res.timestamp}.`, "success");
  };

  const handleProgressChange = (progress) => {
    updateJobProgress(booking.id, progress);
    addToast(`Job state set to: ${progress}`, "info");
  };

  return (
    <DashboardLayout role="worker">
      <div className="max-w-4xl mx-auto space-y-6">
        <Link
          to="/worker/bookings"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-800 hover:text-emerald-950"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to My Bookings</span>
        </Link>

        {/* Top Header Card */}
        <div className="bg-white rounded-3xl border border-stone-200 p-6 sm:p-8 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="font-mono text-xs font-bold bg-stone-100 text-stone-700 px-2 py-0.5 rounded">
                {booking.id}
              </span>
              <span className="text-xs px-2.5 py-0.5 rounded-full font-semibold bg-emerald-100 text-emerald-900 border border-emerald-200">
                {booking.status}
              </span>
            </div>
            <h1 className="text-2xl font-extrabold text-stone-900">{booking.serviceName}</h1>
            <p className="text-xs text-stone-500 mt-1">
              Host: <strong>{booking.customerName}</strong> • {booking.scheduledDate} at {booking.scheduledTime}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleHeartbeat}
              className="px-4 py-2 bg-emerald-50 text-emerald-800 border border-emerald-300 hover:bg-emerald-100 rounded-xl font-bold text-xs flex items-center gap-1.5"
            >
              <Heart className="w-4 h-4 text-emerald-600 fill-emerald-600" />
              <span>I'm Safe Ping</span>
            </button>

            <Link
              to="/worker/safety-checkin"
              className="px-4 py-2 bg-stone-900 hover:bg-stone-800 text-white font-bold text-xs rounded-xl shadow-xs transition-colors flex items-center gap-1.5"
            >
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Safety Centre</span>
            </Link>
          </div>
        </div>

        {/* Arrival OTP & Job Progress Box */}
        <div className="bg-white rounded-3xl border border-stone-200 p-6 shadow-xs space-y-6">
          <div className="p-5 bg-stone-50 rounded-2xl border border-stone-200 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <KeyRound className="w-5 h-5 text-emerald-600" />
                <h2 className="text-sm font-bold text-stone-900">Doorstep Arrival Verification</h2>
              </div>
              <span className="text-xs font-semibold">
                {booking.arrivalConfirmed ? (
                  <span className="text-emerald-700 flex items-center gap-1">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Verified ({booking.arrivalTimestamp || "Done"})</span>
                  </span>
                ) : (
                  <span className="text-amber-700">Code Pending at Door</span>
                )}
              </span>
            </div>

            {!booking.arrivalConfirmed ? (
              <form onSubmit={handleVerifyOtp} className="space-y-3 pt-1">
                <p className="text-xs text-stone-600">
                  Ask the customer at the door for their private 4-digit code (in this prototype: <strong>{booking.arrivalOtp || "4821"}</strong>):
                </p>
                <div className="flex flex-col sm:flex-row gap-2">
                  <input
                    type="text"
                    maxLength={4}
                    value={enteredOtp}
                    onChange={(e) => setEnteredOtp(e.target.value)}
                    placeholder="Enter 4-digit OTP"
                    className="flex-1 font-mono text-base font-bold tracking-widest p-3 bg-white border border-stone-300 rounded-xl outline-hidden focus:ring-2 focus:ring-emerald-500"
                  />
                  <button
                    type="submit"
                    className="py-3 px-5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-xs transition-colors whitespace-nowrap"
                  >
                    Confirm Arrival
                  </button>
                </div>
              </form>
            ) : (
              <div className="p-3 bg-emerald-100/70 border border-emerald-300 rounded-xl text-xs text-emerald-950">
                Doorstep arrival verified. Work session officially active.
              </div>
            )}
          </div>

          {/* Job Progress Update Buttons */}
          <div className="space-y-2">
            <span className="text-xs font-bold text-stone-700 uppercase tracking-wider block">
              Current Job Progress: <strong className="text-emerald-800 font-sans">{booking.jobProgress}</strong>
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {["Work Started", "Work Paused", "Work Resumed", "Work Completed"].map((prog) => (
                <button
                  key={prog}
                  type="button"
                  onClick={() => handleProgressChange(prog)}
                  className={`py-2 px-2 text-xs font-semibold rounded-xl border transition-all text-center ${
                    booking.jobProgress === prog
                      ? "bg-emerald-700 text-white border-emerald-700 shadow-2xs"
                      : "bg-white text-stone-700 border-stone-200 hover:bg-stone-50"
                  }`}
                >
                  {prog}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Customer & Address Details */}
        <div className="bg-white rounded-3xl border border-stone-200 p-6 shadow-xs space-y-4 text-xs">
          <h2 className="text-sm font-bold text-stone-900">Household & Location Details</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pb-3 border-b border-stone-100">
            <div>
              <span className="text-stone-400 block mb-0.5">Host Name:</span>
              <span className="font-bold text-stone-900 text-sm">{booking.customerName}</span>
              <span className="text-stone-500 block">{booking.customerPhone}</span>
            </div>
            <div>
              <span className="text-stone-400 block mb-0.5">Scheduled Duration:</span>
              <span className="font-semibold text-stone-900">{booking.durationHours} Hours (Est: ₹{booking.estimatedTotal})</span>
            </div>
          </div>

          <div>
            <span className="text-stone-400 block mb-0.5">Service Address:</span>
            <div className="p-3 bg-stone-50 rounded-xl border border-stone-200 font-medium text-stone-800">
              {booking.address}
            </div>
          </div>

          {booking.specialInstructions && (
            <div>
              <span className="text-stone-400 block mb-0.5">Customer Instructions:</span>
              <p className="p-3 bg-stone-50 rounded-xl border border-stone-200 text-stone-700">
                {booking.specialInstructions}
              </p>
            </div>
          )}

          <div className="pt-2 flex items-center justify-between">
            <Link
              to="/worker/support"
              className="text-xs text-rose-700 font-semibold hover:underline"
            >
              Report customer misconduct / dispute
            </Link>

            <button
              type="button"
              onClick={() => setSosModalOpen(true)}
              className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold rounded-xl shadow-xs transition-colors flex items-center gap-1.5"
            >
              <AlertTriangle className="w-3.5 h-3.5" />
              <span>Raise Safety Incident</span>
            </button>
          </div>
        </div>
      </div>

      <SafetySosModal
        isOpen={sosModalOpen}
        onClose={() => setSosModalOpen(false)}
        booking={booking}
      />
    </DashboardLayout>
  );
};

export default WorkerBookingDetail;
