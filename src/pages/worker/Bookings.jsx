// src/pages/worker/Bookings.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import DashboardLayout from "../../components/layout/DashboardLayout";
import BookingCard from "../../components/cards/BookingCard";
import { useAppData } from "../../context/AppDataContext";
import { useAuth } from "../../context/AuthContext";
import { CalendarCheck, ShieldCheck } from "lucide-react";

export const WorkerBookings = () => {
  const { user } = useAuth();
  const { data } = useAppData();
  const [filterStatus, setFilterStatus] = useState("all");

  const workerId = user?.id || "w1";
  const myBookings = (data.bookings || []).filter(
    (b) => b.workerId === workerId || b.workerName?.includes("Asha")
  );

  const filteredBookings = myBookings.filter((b) => {
    if (filterStatus === "active") {
      return (
        b.status === "Worker Accepted" ||
        b.status === "Worker En Route" ||
        b.status === "Work in Progress"
      );
    }
    if (filterStatus === "completed") return b.status === "Completed";
    if (filterStatus === "disputed") return b.status === "Disputed" || b.status === "Cancelled";
    return true;
  });

  return (
    <DashboardLayout role="worker">
      <div className="space-y-6">
        <div>
          <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider">
            Schedule & History
          </span>
          <h1 className="text-2xl font-extrabold text-stone-900 mt-0.5">
            My Bookings & Visits ({myBookings.length})
          </h1>
          <p className="text-xs text-stone-500 mt-1">
            Track confirmed jobs, verify doorstep arrival OTPs, and record completed tasks.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center gap-2 border-b border-stone-200 pb-2 overflow-x-auto text-xs">
          {[
            { id: "all", label: `All Visits (${myBookings.length})` },
            { id: "active", label: "Active & Upcoming" },
            { id: "completed", label: "Completed Jobs" },
            { id: "disputed", label: "Issues / Cancelled" },
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setFilterStatus(tab.id)}
              className={`px-3 py-1.5 rounded-lg font-semibold transition-colors whitespace-nowrap ${
                filterStatus === tab.id
                  ? "bg-stone-900 text-white shadow-2xs"
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
            <p className="font-semibold text-stone-800 text-sm mb-1">No bookings in this tab.</p>
            <p>Check available job leads to accept new bookings.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredBookings.map((b) => (
              <BookingCard key={b.id} booking={b} role="worker" />
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default WorkerBookings;
