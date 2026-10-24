// src/pages/worker/Dashboard.jsx
import React from "react";
import { Link } from "react-router-dom";
import DashboardLayout from "../../components/layout/DashboardLayout";
import BookingCard from "../../components/cards/BookingCard";
import { TrustBadge } from "../../components/badges/TrustBadge";
import { useAppData } from "../../context/AppDataContext";
import { useAuth } from "../../context/AuthContext";
import {
  ShieldCheck,
  CalendarCheck,
  CreditCard,
  Briefcase,
  Star,
  ArrowRight,
  Heart,
  KeyRound,
  CheckCircle2,
  Clock,
  Sparkles
} from "lucide-react";

export const WorkerDashboard = () => {
  const { user } = useAuth();
  const { data, updateBookingStatus } = useAppData();

  const workerId = user?.id || "w1";
  const worker = (data.workers || []).find((w) => w.id === workerId) || (data.workers || [])[0];

  const myBookings = (data.bookings || []).filter(
    (b) => b.workerId === worker.id || b.workerName?.includes("Asha")
  );

  const pendingJobRequests = (data.bookings || []).filter(
    (b) => b.status === "Booking Requested"
  );

  const upcomingBooking = myBookings.find(
    (b) => b.status === "Worker Accepted" || b.status === "Worker En Route" || b.status === "Work in Progress"
  ) || myBookings[0];

  const recentReviews = (data.reviews || []).filter((r) => r.workerId === worker.id).slice(0, 2);

  const handleQuickAccept = (bookingId) => {
    updateBookingStatus(bookingId, "Worker Accepted");
  };

  return (
    <DashboardLayout role="worker">
      <div className="space-y-8">
        {/* Welcome & Profile Readiness Hero */}
        <div className="bg-stone-900 text-white rounded-3xl p-6 sm:p-8 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6 border border-stone-800">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-medium border border-emerald-500/30">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Verified Service Professional Portal</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Namaste, {worker.name}!
            </h1>
            <p className="text-xs sm:text-sm text-stone-300 max-w-xl leading-relaxed">
              {worker.primaryService} • Delhi NCR • Your punctuality record is{" "}
              <strong className="text-emerald-400">{worker.attendanceScore}%</strong> across {worker.completedBookings} jobs.
            </p>
          </div>

          <div className="flex flex-wrap sm:flex-nowrap items-center gap-3">
            <Link
              to="/worker/safety-checkin"
              className="py-3 px-5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-xs transition-colors flex items-center gap-2 whitespace-nowrap"
            >
              <KeyRound className="w-4 h-4" />
              <span>Safety Check-In Centre</span>
            </Link>
            <Link
              to="/worker/jobs"
              className="py-3 px-5 bg-stone-800 hover:bg-stone-700 text-white font-medium text-xs rounded-xl border border-stone-700 transition-colors flex items-center gap-1.5 whitespace-nowrap"
            >
              <Briefcase className="w-4 h-4" />
              <span>Job Requests ({pendingJobRequests.length})</span>
            </Link>
          </div>
        </div>

        {/* Quick Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-xs space-y-1">
            <span className="text-xs text-stone-400 block font-medium">Customer Rating</span>
            <div className="flex items-center gap-1.5">
              <Star className="w-5 h-5 fill-amber-400 text-amber-500" />
              <span className="text-2xl font-extrabold text-stone-900">{worker.rating}</span>
            </div>
            <span className="text-[11px] text-stone-500">{worker.completedBookings} verified ratings</span>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-xs space-y-1">
            <span className="text-xs text-stone-400 block font-medium">Monthly Earnings</span>
            <span className="text-2xl font-extrabold text-stone-900">₹24,800</span>
            <span className="text-[11px] text-emerald-700 font-medium">100% Disbursed on time</span>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-xs space-y-1">
            <span className="text-xs text-stone-400 block font-medium">Repeat Households</span>
            <span className="text-2xl font-extrabold text-purple-900">{worker.repeatCustomers}</span>
            <span className="text-[11px] text-stone-500">Regular recurring clients</span>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-xs space-y-1">
            <span className="text-xs text-stone-400 block font-medium">Punctuality Score</span>
            <div className="flex items-center gap-1.5">
              <Clock className="w-5 h-5 text-teal-600" />
              <span className="text-2xl font-extrabold text-stone-900">{worker.attendanceScore}%</span>
            </div>
            <span className="text-[11px] text-teal-700 font-medium">Punctual Badge unlocked</span>
          </div>
        </div>

        {/* Upcoming Job Visit & Doorstep OTP Spotlight */}
        {upcomingBooking && (
          <div className="bg-white rounded-3xl border border-stone-200 p-6 shadow-xs space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-stone-100">
              <div>
                <span className="text-[11px] font-bold text-emerald-700 uppercase tracking-wider block">
                  Next Scheduled Job Visit
                </span>
                <h2 className="text-lg font-bold text-stone-900 mt-0.5">
                  {upcomingBooking.serviceName} • {upcomingBooking.customerName}
                </h2>
              </div>
              <span className="text-xs px-3 py-1 rounded-full font-semibold bg-emerald-100 text-emerald-900 border border-emerald-200 self-start sm:self-auto">
                {upcomingBooking.status}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs text-stone-700 p-4 rounded-2xl bg-stone-50 border border-stone-200">
              <div>
                <span className="text-stone-400 block mb-0.5">Scheduled Timing:</span>
                <span className="font-semibold text-stone-900">
                  {upcomingBooking.scheduledDate} at {upcomingBooking.scheduledTime}
                </span>
              </div>

              <div>
                <span className="text-stone-400 block mb-0.5">Customer Locality:</span>
                <span className="font-semibold text-stone-900 truncate block">
                  {upcomingBooking.address}
                </span>
              </div>

              <div>
                <span className="text-stone-400 block mb-0.5">Expected Payout:</span>
                <span className="font-bold text-emerald-800 text-sm">
                  ₹{upcomingBooking.estimatedTotal} (Held in Escrow)
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between pt-1">
              <span className="text-xs text-stone-500 font-mono">Ref: {upcomingBooking.id}</span>
              <div className="flex items-center gap-2">
                <Link
                  to="/worker/safety-checkin"
                  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-xs transition-colors flex items-center gap-1.5"
                >
                  <KeyRound className="w-3.5 h-3.5" />
                  <span>Doorstep Check-In</span>
                </Link>
                <Link
                  to={`/worker/bookings/${upcomingBooking.id}`}
                  className="text-xs font-bold text-stone-700 hover:text-stone-900 px-3 py-2 border border-stone-200 rounded-xl hover:bg-stone-50 transition-colors"
                >
                  Job Details
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* Pending Leads & Recent Reviews Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Incoming Job Leads */}
          <div className="lg:col-span-7 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-bold text-stone-900 flex items-center gap-2">
                <Briefcase className="w-4 h-4 text-emerald-700" />
                <span>Available Job Leads</span>
              </h2>
              <Link to="/worker/jobs" className="text-xs font-semibold text-emerald-700 hover:underline">
                View All Leads ({pendingJobRequests.length})
              </Link>
            </div>

            {pendingJobRequests.length === 0 ? (
              <div className="bg-white rounded-2xl border border-stone-200 p-8 text-center text-xs text-stone-500">
                No pending requests right now. New neighborhood leads will appear here.
              </div>
            ) : (
              <div className="space-y-3">
                {pendingJobRequests.map((b) => (
                  <div
                    key={b.id}
                    className="bg-white rounded-2xl border border-stone-200 p-5 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 font-bold text-stone-900 text-sm">
                        <span>{b.serviceName}</span>
                        <span className="font-mono text-xs font-normal text-stone-500">({b.id})</span>
                      </div>
                      <p className="text-stone-600">
                        Client: <strong>{b.customerName}</strong> • {b.scheduledDate} ({b.durationHours} hrs)
                      </p>
                      <p className="text-stone-500 text-[11px] truncate max-w-sm">{b.address}</p>
                    </div>

                    <div className="flex items-center gap-3 self-end sm:self-center">
                      <span className="text-base font-bold text-emerald-800">₹{b.estimatedTotal}</span>
                      <button
                        type="button"
                        onClick={() => handleQuickAccept(b.id)}
                        className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl shadow-xs transition-colors"
                      >
                        Accept Job
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Trust Badges Summary & Reviews */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white rounded-3xl border border-stone-200 p-6 shadow-xs space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-stone-900">Your Trust Portfolio</h3>
                <Link to="/worker/verification" className="text-xs text-emerald-700 font-semibold hover:underline">
                  Verification Hub
                </Link>
              </div>

              <div className="flex flex-wrap gap-1.5">
                {worker.trustBadges?.map((b) => (
                  <TrustBadge key={b.id} badgeId={b.id} customLabel={b.label} verified={b.verified} size="sm" />
                ))}
              </div>
            </div>

            {/* Recent Reviews received */}
            <div className="bg-white rounded-3xl border border-stone-200 p-6 shadow-xs space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-stone-900">Recent Customer Reviews</h3>
                <Link to="/worker/reviews" className="text-xs text-emerald-700 font-semibold hover:underline">
                  All ({recentReviews.length})
                </Link>
              </div>

              <div className="space-y-3">
                {recentReviews.map((rev) => (
                  <div key={rev.id} className="p-3.5 bg-stone-50 rounded-2xl border border-stone-100 text-xs space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-stone-900">{rev.customerName}</span>
                      <span className="text-amber-500 font-bold">{rev.rating}.0★</span>
                    </div>
                    <p className="text-stone-600 italic">"{rev.comment}"</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default WorkerDashboard;
