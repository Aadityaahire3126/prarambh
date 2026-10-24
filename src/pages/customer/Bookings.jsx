// src/pages/customer/Bookings.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import DashboardLayout from "../../components/layout/DashboardLayout";
import BookingCard from "../../components/cards/BookingCard";
import { useAppData } from "../../context/AppDataContext";
import { useAuth } from "../../context/AuthContext";
import { CalendarCheck, PlusCircle, Filter } from "lucide-react";

export const CustomerBookings = () => {
  const { user } = useAuth();
  const { data } = useAppData();
  const [filterStatus, setFilterStatus] = useState("all");

  const customerId = user?.id || "c1";
  const allBookings = (data.bookings || []).filter(
    (b) => b.customerId === customerId || b.customerName?.includes("Rohit")
  );

  const filteredBookings = allBookings.filter((b) => {
    if (filterStatus === "active") {
      return (
        b.status === "Worker Accepted" ||
        b.status === "Worker En Route" ||
        b.status === "Work in Progress" ||
        b.status === "Booking Requested"
      );
    }
    if (filterStatus === "completed") return b.status === "Completed";
    if (filterStatus === "disputed") return b.status === "Disputed" || b.status === "Cancelled";
    return true;
  });

  return (
    <DashboardLayout role="customer">
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider">
              Booking History & Active Visits
            </span>
            <h1 className="text-2xl font-extrabold text-stone-900 mt-0.5">
              My Household Bookings ({allBookings.length})
            </h1>
          </div>

          <Link
            to="/customer/post-requirement"
            className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs rounded-xl shadow-xs transition-colors flex items-center gap-1.5 self-start sm:self-auto"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Book New Service</span>
          </Link>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center gap-2 border-b border-stone-200 pb-2 overflow-x-auto text-xs">
          {[
            { id: "all", label: `All Bookings (${allBookings.length})` },
            { id: "active", label: "Active & Upcoming" },
            { id: "completed", label: "Completed" },
            { id: "disputed", label: "Disputed / Issues" },
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setFilterStatus(tab.id)}
              className={`px-3 py-1.5 rounded-lg font-semibold transition-colors whitespace-nowrap ${
                filterStatus === tab.id
                  ? "bg-emerald-600 text-white shadow-2xs"
                  : "text-stone-600 hover:bg-stone-100"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Bookings List */}
        {filteredBookings.length === 0 ? (
          <div className="bg-white rounded-2xl border border-stone-200 p-12 text-center text-xs text-stone-500">
            <CalendarCheck className="w-10 h-10 text-stone-300 mx-auto mb-2" />
            <p className="font-semibold text-stone-800 text-sm mb-1">No bookings match this filter.</p>
            <p>You can post a new requirement or browse available categories.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredBookings.map((b) => (
              <BookingCard key={b.id} booking={b} role="customer" />
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default CustomerBookings;
