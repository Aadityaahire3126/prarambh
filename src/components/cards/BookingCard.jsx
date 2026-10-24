// src/components/cards/BookingCard.jsx
import React from "react";
import { Link } from "react-router-dom";
import { Calendar, Clock, MapPin, KeyRound, MessageSquare, ArrowRight, ShieldCheck, AlertCircle } from "lucide-react";

export const BookingCard = ({ booking, role = "customer", onAction }) => {
  const isCustomer = role === "customer";

  const getStatusBadge = (status) => {
    switch (status) {
      case "Worker Accepted":
        return "bg-blue-50 text-blue-800 border-blue-200";
      case "Worker En Route":
        return "bg-indigo-50 text-indigo-800 border-indigo-200";
      case "Work in Progress":
        return "bg-emerald-50 text-emerald-800 border-emerald-300 font-semibold";
      case "Completed":
        return "bg-teal-50 text-teal-800 border-teal-200";
      case "Booking Requested":
      case "Matching":
        return "bg-amber-50 text-amber-800 border-amber-200";
      case "Disputed":
        return "bg-rose-50 text-rose-800 border-rose-300 font-semibold";
      case "Cancelled":
        return "bg-stone-100 text-stone-600 border-stone-200";
      default:
        return "bg-stone-50 text-stone-700 border-stone-200";
    }
  };

  const detailPath = isCustomer
    ? `/customer/bookings/${booking.id}`
    : `/worker/bookings/${booking.id}`;

  return (
    <div className="bg-white rounded-xl border border-stone-200 p-5 shadow-xs hover:shadow-sm transition-all">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-stone-100">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-mono font-medium text-stone-500 bg-stone-100 px-2 py-0.5 rounded">
              {booking.id}
            </span>
            <span className={`text-xs px-2.5 py-0.5 rounded-full border ${getStatusBadge(booking.status)}`}>
              {booking.status}
            </span>
          </div>
          <h3 className="text-base font-semibold text-stone-900">{booking.serviceName}</h3>
        </div>

        <div className="text-right sm:self-center">
          <span className="text-xs text-stone-400 block">Total Estimate</span>
          <span className="text-lg font-bold text-stone-900">₹{booking.grandTotal || booking.estimatedTotal}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 py-3.5 text-xs text-stone-600">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Calendar className="w-3.5 h-3.5 text-stone-400" />
            <span className="font-medium text-stone-800">{booking.scheduledDate}</span>
            <span className="text-stone-300">•</span>
            <Clock className="w-3.5 h-3.5 text-stone-400" />
            <span>{booking.scheduledTime} ({booking.durationHours} hrs)</span>
          </div>

          <div className="flex items-start gap-2">
            <MapPin className="w-3.5 h-3.5 text-stone-400 shrink-0 mt-0.5" />
            <span className="line-clamp-1">{booking.address}</span>
          </div>
        </div>

        <div className="space-y-2 sm:border-l sm:border-stone-100 sm:pl-4">
          <div className="flex items-center justify-between">
            <span className="text-stone-500">{isCustomer ? "Service Professional" : "Customer / Host"}</span>
            <span className="font-semibold text-stone-900">
              {isCustomer ? booking.workerName : booking.customerName}
            </span>
          </div>

          {/* OTP Code Display */}
          <div className="flex items-center justify-between bg-stone-50 p-2 rounded-lg border border-stone-200">
            <div className="flex items-center gap-1.5 text-stone-700">
              <KeyRound className="w-3.5 h-3.5 text-emerald-600" />
              <span>{isCustomer ? "Share Arrival OTP with worker:" : "Arrival OTP Code:"}</span>
            </div>
            <span className="font-mono font-bold text-emerald-800 text-sm tracking-wider">
              {booking.arrivalConfirmed ? "✓ Verified" : booking.arrivalOtp || "4821"}
            </span>
          </div>
        </div>
      </div>

      {/* Safety Status Pill */}
      {booking.safetyStatus && booking.safetyStatus !== "Normal" && (
        <div className="mb-3 px-3 py-1.5 bg-amber-50 rounded-lg border border-amber-200 text-xs text-amber-900 flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-amber-600 shrink-0" />
          <span>Status: <strong>{booking.safetyStatus}</strong></span>
        </div>
      )}

      {/* Card Action Buttons */}
      <div className="pt-3 border-t border-stone-100 flex flex-wrap items-center justify-between gap-2">
        <Link
          to={`/${role}/messages`}
          className="inline-flex items-center gap-1.5 text-xs font-medium text-stone-600 hover:text-stone-900 px-3 py-1.5 rounded-lg border border-stone-200 hover:bg-stone-50 transition-colors"
        >
          <MessageSquare className="w-3.5 h-3.5" />
          <span>In-App Chat</span>
        </Link>

        <div className="flex items-center gap-2">
          {!isCustomer && booking.status === "Worker Accepted" && (
            <Link
              to="/worker/safety-checkin"
              className="text-xs font-semibold bg-emerald-700 text-white px-3 py-1.5 rounded-lg hover:bg-emerald-800 transition-colors"
            >
              Check-In Centre
            </Link>
          )}

          <Link
            to={detailPath}
            className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-800 hover:text-emerald-950 px-3.5 py-1.5 rounded-lg bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 transition-colors"
          >
            <span>View Timeline & Details</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BookingCard;
