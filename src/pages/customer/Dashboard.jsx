// src/pages/customer/Dashboard.jsx
import React from "react";
import { Link } from "react-router-dom";
import DashboardLayout from "../../components/layout/DashboardLayout";
import BookingCard from "../../components/cards/BookingCard";
import WorkerCard from "../../components/cards/WorkerCard";
import { useAppData } from "../../context/AppDataContext";
import { useAuth } from "../../context/AuthContext";
import {
  PlusCircle,
  Search,
  CalendarCheck,
  ShieldCheck,
  ArrowRight,
  Sparkles,
  Heart,
  KeyRound,
  Clock
} from "lucide-react";

export const CustomerDashboard = () => {
  const { user } = useAuth();
  const { data } = useAppData();

  const customerId = user?.id || "c1";
  const myBookings = (data.bookings || []).filter(
    (b) => b.customerId === customerId || b.customerName?.includes("Rohit")
  );

  const activeBooking = myBookings.find(
    (b) => b.status === "Worker Accepted" || b.status === "Worker En Route" || b.status === "Work in Progress"
  ) || myBookings[0];

  const recentBookings = myBookings.slice(0, 3);
  const favourites = (data.workers || []).filter((w) => (data.favourites || []).includes(w.id));
  const suggestedWorkers = (data.workers || []).slice(0, 2);

  return (
    <DashboardLayout role="customer">
      <div className="space-y-8">
        {/* Welcome Banner */}
        <div className="bg-gradient-to-r from-emerald-800 to-emerald-950 text-white rounded-3xl p-6 sm:p-8 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-700/80 text-emerald-100 text-xs font-medium">
              <ShieldCheck className="w-4 h-4 text-emerald-300" />
              <span>Customer Safe Portal</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Namaste, {user?.name || "Rohit Mehta"}!
            </h1>
            <p className="text-xs sm:text-sm text-emerald-200 max-w-xl leading-relaxed">
              Manage your household requirements, track technician arrivals via verified doorstep OTP, and review transparent service records.
            </p>
          </div>

          <div className="flex flex-wrap sm:flex-nowrap items-center gap-3">
            <Link
              to="/customer/post-requirement"
              className="py-3 px-5 bg-white text-emerald-950 font-bold text-xs rounded-xl hover:bg-emerald-50 transition-colors shadow-xs flex items-center gap-1.5 whitespace-nowrap"
            >
              <PlusCircle className="w-4 h-4 text-emerald-700" />
              <span>Post Requirement</span>
            </Link>
            <Link
              to="/search"
              className="py-3 px-5 bg-emerald-700/80 hover:bg-emerald-700 text-white font-medium text-xs rounded-xl border border-emerald-600 transition-colors flex items-center gap-1.5 whitespace-nowrap"
            >
              <Search className="w-4 h-4" />
              <span>Find Workers</span>
            </Link>
          </div>
        </div>

        {/* Active Booking Hero Tracker (if any) */}
        {activeBooking && (
          <div className="bg-white rounded-2xl border border-emerald-200 p-6 shadow-xs relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-1 bg-emerald-500" />
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-700">
                  Current Scheduled Visit
                </span>
                <h2 className="text-lg font-bold text-stone-900 mt-0.5">
                  {activeBooking.serviceName} • {activeBooking.workerName}
                </h2>
              </div>
              <span className="text-xs font-semibold px-3 py-1 rounded-full bg-emerald-100 text-emerald-900 border border-emerald-200 self-start sm:self-auto">
                {activeBooking.status}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs text-stone-700 p-4 rounded-xl bg-stone-50 border border-stone-200 mb-4">
              <div>
                <span className="text-stone-400 block mb-0.5">Visit Scheduled:</span>
                <span className="font-semibold text-stone-900">
                  {activeBooking.scheduledDate} at {activeBooking.scheduledTime}
                </span>
              </div>

              <div>
                <span className="text-stone-400 block mb-0.5">Doorstep Arrival OTP:</span>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-base font-extrabold text-emerald-800 tracking-wider">
                    {activeBooking.arrivalConfirmed ? "✓ Confirmed Arrived" : activeBooking.arrivalOtp || "4821"}
                  </span>
                  {!activeBooking.arrivalConfirmed && (
                    <span className="text-[10px] text-stone-500">(Share with technician)</span>
                  )}
                </div>
              </div>

              <div>
                <span className="text-stone-400 block mb-0.5">Escrow Payment:</span>
                <span className="font-semibold text-stone-900">
                  ₹{activeBooking.grandTotal} ({activeBooking.paymentStatus})
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between pt-1">
              <span className="text-xs text-stone-500">
                Booking Reference: <strong className="font-mono text-stone-700">{activeBooking.id}</strong>
              </span>
              <Link
                to={`/customer/bookings/${activeBooking.id}`}
                className="text-xs font-bold text-emerald-700 hover:text-emerald-800 flex items-center gap-1"
              >
                <span>View Full Timeline & Actions</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        )}

        {/* Recent Bookings and Suggested Matches Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Recent Bookings List */}
          <div className="lg:col-span-7 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-bold text-stone-900 flex items-center gap-2">
                <CalendarCheck className="w-4 h-4 text-emerald-700" />
                <span>My Recent Bookings</span>
              </h2>
              <Link to="/customer/bookings" className="text-xs font-semibold text-emerald-700 hover:underline">
                View all ({myBookings.length})
              </Link>
            </div>

            {recentBookings.length === 0 ? (
              <div className="bg-white rounded-2xl border border-stone-200 p-8 text-center text-xs text-stone-500">
                No bookings yet. Post your first requirement or browse services.
              </div>
            ) : (
              <div className="space-y-4">
                {recentBookings.map((b) => (
                  <BookingCard key={b.id} booking={b} role="customer" />
                ))}
              </div>
            )}
          </div>

          {/* Favourites & Quick Matches */}
          <div className="lg:col-span-5 space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-base font-bold text-stone-900 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-emerald-700" />
                  <span>Suggested Professionals</span>
                </h2>
                <Link to="/search" className="text-xs font-semibold text-emerald-700 hover:underline">
                  Browse All
                </Link>
              </div>

              <div className="space-y-4">
                {suggestedWorkers.map((w) => (
                  <WorkerCard key={w.id} worker={w} />
                ))}
              </div>
            </div>

            {/* Saved Professionals */}
            {favourites.length > 0 && (
              <div className="bg-white rounded-2xl border border-stone-200 p-5 space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-xs uppercase tracking-wider text-stone-500 flex items-center gap-1.5">
                    <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
                    <span>Saved Favourites ({favourites.length})</span>
                  </h3>
                  <Link to="/customer/favourites" className="text-xs text-emerald-700 font-semibold hover:underline">
                    Manage
                  </Link>
                </div>
                <div className="divide-y divide-stone-100 text-xs">
                  {favourites.slice(0, 2).map((fav) => (
                    <div key={fav.id} className="py-2.5 flex items-center justify-between">
                      <div>
                        <Link to={`/workers/${fav.id}`} className="font-bold text-stone-900 hover:text-emerald-700">
                          {fav.name}
                        </Link>
                        <span className="text-stone-500 block text-[11px]">{fav.primaryService}</span>
                      </div>
                      <span className="font-bold text-stone-900">₹{fav.ratePerHour}/hr</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default CustomerDashboard;
