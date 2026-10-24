// src/pages/customer/BookingDetail.jsx
import React, { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import DashboardLayout from "../../components/layout/DashboardLayout";
import ReviewModal from "../../components/modals/ReviewModal";
import ComplaintModal from "../../components/modals/ComplaintModal";
import { useAppData } from "../../context/AppDataContext";
import { useToast } from "../../components/notifications/ToastProvider";
import {
  Calendar,
  Clock,
  MapPin,
  KeyRound,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  MessageSquare,
  Star,
  LifeBuoy,
  ArrowLeft,
  XCircle,
  CreditCard
} from "lucide-react";

export const CustomerBookingDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data, confirmJobCompletion, updateBookingStatus } = useAppData();
  const { addToast } = useToast();

  const [reviewModalOpen, setReviewModalOpen] = useState(false);
  const [complaintModalOpen, setComplaintModalOpen] = useState(false);

  const booking = (data.bookings || []).find((b) => b.id === id) || (data.bookings || [])[0];

  if (!booking) return null;

  const handleConfirmCompletion = () => {
    confirmJobCompletion(booking.id);
    addToast("Job marked as Completed! Payment released from escrow.", "success");
  };

  const handleCancelBooking = () => {
    if (window.confirm("Are you sure you want to cancel this booking?")) {
      updateBookingStatus(booking.id, "Cancelled");
      addToast("Booking has been cancelled.", "info");
    }
  };

  const timelineSteps = [
    { label: "Requirement Posted", done: true, time: "Initial" },
    { label: "Booking Requested", done: true, time: "Confirmed" },
    {
      label: "Worker Accepted",
      done: booking.status !== "Booking Requested" && booking.status !== "Cancelled",
      time: "Scheduled",
    },
    {
      label: "Doorstep Arrival (OTP)",
      done: booking.arrivalConfirmed,
      time: booking.arrivalTimestamp || (booking.arrivalConfirmed ? "Verified" : "Pending Code"),
    },
    {
      label: "Work in Progress",
      done: booking.status === "Work in Progress" || booking.status === "Completed",
      time: booking.jobProgress,
    },
    {
      label: "Completed & Verified",
      done: booking.status === "Completed",
      time: booking.status === "Completed" ? "Signed Off" : "Pending",
    },
  ];

  return (
    <DashboardLayout role="customer">
      <div className="max-w-4xl mx-auto space-y-6">
        <Link
          to="/customer/bookings"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-800 hover:text-emerald-950"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to All Bookings</span>
        </Link>

        {/* Top Header Card */}
        <div className="bg-white rounded-3xl border border-stone-200 p-6 sm:p-8 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="font-mono text-xs font-bold bg-stone-100 text-stone-700 px-2 py-0.5 rounded">
                {booking.id}
              </span>
              <span
                className={`text-xs px-2.5 py-0.5 rounded-full font-semibold border ${
                  booking.status === "Completed"
                    ? "bg-emerald-50 text-emerald-800 border-emerald-300"
                    : booking.status === "Work in Progress"
                    ? "bg-blue-50 text-blue-800 border-blue-300"
                    : booking.status === "Disputed"
                    ? "bg-rose-50 text-rose-800 border-rose-300"
                    : "bg-amber-50 text-amber-800 border-amber-200"
                }`}
              >
                {booking.status}
              </span>
            </div>
            <h1 className="text-2xl font-extrabold text-stone-900">{booking.serviceName}</h1>
            <p className="text-xs text-stone-500 mt-1">
              Professional: <strong>{booking.workerName}</strong> • Scheduled on {booking.scheduledDate} at {booking.scheduledTime}
            </p>
          </div>

          {/* Quick Doorstep OTP Chip */}
          <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl flex items-center justify-between gap-4">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-900 block">
                Doorstep Arrival Code
              </span>
              <span className="text-xs text-stone-600">Provide to worker upon arrival</span>
            </div>
            <div className="font-mono text-2xl font-extrabold text-emerald-900 tracking-widest bg-white px-3 py-1 rounded-xl shadow-2xs border border-emerald-200">
              {booking.arrivalConfirmed ? "✓ VERIFIED" : booking.arrivalOtp || "4821"}
            </div>
          </div>
        </div>

        {/* Visual Lifecycle Stepper */}
        <div className="bg-white rounded-3xl border border-stone-200 p-6 shadow-xs">
          <h2 className="text-sm font-bold text-stone-900 mb-6">Service Lifecycle Tracker</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {timelineSteps.map((step, idx) => (
              <div
                key={idx}
                className={`p-3 rounded-2xl border text-xs flex flex-col justify-between space-y-2 ${
                  step.done
                    ? "bg-emerald-50/70 border-emerald-300 text-emerald-950 font-semibold"
                    : "bg-stone-50 border-stone-200 text-stone-400 font-normal"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono font-bold">0{idx + 1}</span>
                  {step.done ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  ) : (
                    <Clock className="w-4 h-4 text-stone-300" />
                  )}
                </div>
                <div>
                  <div className="text-[11px] leading-tight mb-1">{step.label}</div>
                  <div className="text-[10px] text-stone-500">{step.time}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Detailed Booking Information Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Details */}
          <div className="lg:col-span-8 space-y-6">
            <div className="bg-white rounded-2xl border border-stone-200 p-6 shadow-xs space-y-4 text-xs">
              <h3 className="text-sm font-bold text-stone-900">Visit & Location Details</h3>

              <div className="grid grid-cols-2 gap-4 pb-3 border-b border-stone-100">
                <div>
                  <span className="text-stone-400 block mb-0.5">Date & Time Slot:</span>
                  <span className="font-semibold text-stone-900">{booking.scheduledDate} ({booking.scheduledTime})</span>
                </div>
                <div>
                  <span className="text-stone-400 block mb-0.5">Duration:</span>
                  <span className="font-semibold text-stone-900">{booking.durationHours} Hours</span>
                </div>
              </div>

              <div>
                <span className="text-stone-400 block mb-0.5">Private Service Address:</span>
                <span className="font-medium text-stone-800 bg-stone-50 p-2.5 rounded-xl border border-stone-200 block">
                  {booking.address}
                </span>
              </div>

              {booking.specialInstructions && (
                <div>
                  <span className="text-stone-400 block mb-0.5">Special Instructions Given:</span>
                  <p className="text-stone-700 bg-stone-50 p-2.5 rounded-xl border border-stone-200">
                    {booking.specialInstructions}
                  </p>
                </div>
              )}
            </div>

            {/* Price Breakdown & Escrow Ledger */}
            <div className="bg-white rounded-2xl border border-stone-200 p-6 shadow-xs space-y-3 text-xs">
              <h3 className="text-sm font-bold text-stone-900 flex items-center justify-between">
                <span>Transparent Escrow Payment Breakdown</span>
                <span className="text-[11px] bg-blue-100 text-blue-800 font-semibold px-2 py-0.5 rounded-full">
                  {booking.paymentStatus}
                </span>
              </h3>

              <div className="space-y-1.5 text-stone-600 pt-1">
                <div className="flex justify-between">
                  <span>Professional Base Fee ({booking.durationHours} hrs × ₹{booking.ratePerHour}):</span>
                  <span className="font-semibold text-stone-900">₹{booking.estimatedTotal}</span>
                </div>
                <div className="flex justify-between">
                  <span>Transparent Platform Insurance & Escrow Fee:</span>
                  <span className="font-semibold text-stone-900">₹{booking.platformFee}</span>
                </div>
                <div className="flex justify-between font-bold text-stone-900 pt-2 border-t border-stone-200 text-sm">
                  <span>Total Escrow Amount:</span>
                  <span className="text-emerald-700 font-extrabold">₹{booking.grandTotal}</span>
                </div>
              </div>
              <p className="text-[11px] text-stone-400 pt-1">
                Your payment remains securely held in escrow until you verify job completion.
              </p>
            </div>
          </div>

          {/* Right Actions & Assistance */}
          <div className="lg:col-span-4 space-y-4">
            {/* Completion & Review Actions */}
            <div className="bg-white rounded-2xl border border-stone-200 p-5 shadow-xs space-y-3">
              <h3 className="text-xs font-bold text-stone-700 uppercase tracking-wider">
                Customer Actions
              </h3>

              {booking.status !== "Completed" && booking.status !== "Cancelled" && (
                <button
                  type="button"
                  onClick={handleConfirmCompletion}
                  className="w-full py-2.5 px-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-xs transition-colors flex items-center justify-center gap-1.5"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Confirm Completion & Release Payment</span>
                </button>
              )}

              {booking.status === "Completed" && !booking.hasReview && (
                <button
                  type="button"
                  onClick={() => setReviewModalOpen(true)}
                  className="w-full py-2.5 px-4 bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs rounded-xl shadow-xs transition-colors flex items-center justify-center gap-1.5"
                >
                  <Star className="w-4 h-4" />
                  <span>Leave 5-Star Rating & Review</span>
                </button>
              )}

              <Link
                to="/customer/messages"
                className="w-full py-2.5 px-4 border border-stone-200 hover:bg-stone-50 text-stone-700 font-semibold text-xs rounded-xl transition-colors flex items-center justify-center gap-1.5"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Protected In-App Chat</span>
              </Link>

              <button
                type="button"
                onClick={() => setComplaintModalOpen(true)}
                className="w-full py-2.5 px-4 bg-rose-50 hover:bg-rose-100 text-rose-800 font-semibold text-xs rounded-xl border border-rose-200 transition-colors flex items-center justify-center gap-1.5"
              >
                <LifeBuoy className="w-4 h-4" />
                <span>Raise Dispute / Replacement</span>
              </button>

              {booking.status === "Booking Requested" && (
                <button
                  type="button"
                  onClick={handleCancelBooking}
                  className="w-full py-2 px-3 text-stone-400 hover:text-stone-700 text-xs font-medium"
                >
                  Cancel Booking Request
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      <ReviewModal
        isOpen={reviewModalOpen}
        onClose={() => setReviewModalOpen(false)}
        booking={booking}
      />

      <ComplaintModal
        isOpen={complaintModalOpen}
        onClose={() => setComplaintModalOpen(false)}
        booking={booking}
      />
    </DashboardLayout>
  );
};

export default CustomerBookingDetail;
