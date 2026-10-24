// src/pages/admin/Bookings.jsx
import React, { useState } from "react";
import AdminLayout from "../../components/layout/AdminLayout";
import { useAppData } from "../../context/AppDataContext";
import { useToast } from "../../components/notifications/ToastProvider";
import { CalendarCheck, Search, Filter, ShieldCheck, KeyRound } from "lucide-react";

export const AdminBookings = () => {
  const { data, updateBookingStatus } = useAppData();
  const { addToast } = useToast();

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const bookings = data.bookings || [];

  const filtered = bookings.filter((b) => {
    if (search.trim()) {
      const q = search.toLowerCase();
      const match =
        b.id.toLowerCase().includes(q) ||
        b.serviceName.toLowerCase().includes(q) ||
        b.customerName.toLowerCase().includes(q) ||
        b.workerName.toLowerCase().includes(q);
      if (!match) return false;
    }
    if (statusFilter !== "all" && b.status !== statusFilter) return false;
    return true;
  });

  const handleAdminStatusChange = (bookingId, newStatus) => {
    updateBookingStatus(bookingId, newStatus);
    addToast(`Booking ${bookingId} transitioned to ${newStatus}`, "info");
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <span className="text-xs font-bold text-stone-500 uppercase tracking-wider">
            Platform Transactions
          </span>
          <h1 className="text-2xl font-extrabold text-stone-900 mt-0.5">
            Master Bookings Management ({bookings.length})
          </h1>
        </div>

        {/* Search & Status Filters */}
        <div className="bg-white p-4 rounded-2xl border border-stone-200 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by Booking ID, customer, or professional..."
            className="p-2.5 bg-stone-50 border border-stone-200 rounded-xl outline-hidden focus:bg-white focus:ring-2 focus:ring-emerald-500"
          />

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="p-2.5 bg-stone-50 border border-stone-200 rounded-xl outline-hidden focus:bg-white focus:ring-2 focus:ring-emerald-500"
          >
            <option value="all">All Statuses</option>
            <option value="Booking Requested">Booking Requested</option>
            <option value="Worker Accepted">Worker Accepted</option>
            <option value="Worker En Route">Worker En Route</option>
            <option value="Work in Progress">Work in Progress</option>
            <option value="Completed">Completed</option>
            <option value="Disputed">Disputed</option>
            <option value="Cancelled">Cancelled</option>
          </select>
        </div>

        {/* Master Bookings Table */}
        <div className="bg-white rounded-3xl border border-stone-200 shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-stone-50 text-stone-400 font-semibold border-b border-stone-100">
                <tr>
                  <th className="py-3 px-4">Booking Ref</th>
                  <th className="py-3 px-4">Service & Timing</th>
                  <th className="py-3 px-4">Parties</th>
                  <th className="py-3 px-4">Arrival OTP</th>
                  <th className="py-3 px-4">Status & Escrow</th>
                  <th className="py-3 px-4 text-right">Intervention</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100 text-stone-700">
                {filtered.map((b) => (
                  <tr key={b.id} className="hover:bg-stone-50/60 transition-colors">
                    <td className="py-3.5 px-4 font-mono font-bold text-stone-900">
                      {b.id}
                    </td>

                    <td className="py-3.5 px-4">
                      <div className="font-bold text-stone-900">{b.serviceName}</div>
                      <div className="text-stone-400 text-[11px]">{b.scheduledDate} • {b.scheduledTime}</div>
                    </td>

                    <td className="py-3.5 px-4">
                      <div>Cust: <strong className="text-stone-900">{b.customerName}</strong></div>
                      <div>Tech: <strong className="text-emerald-800">{b.workerName}</strong></div>
                    </td>

                    <td className="py-3.5 px-4">
                      <span className="font-mono bg-stone-100 px-2 py-0.5 rounded font-bold text-stone-900">
                        {b.arrivalOtp}
                      </span>
                      <span className="text-[10px] text-stone-400 block mt-0.5">
                        {b.arrivalConfirmed ? "✓ Verified" : "Pending Arrival"}
                      </span>
                    </td>

                    <td className="py-3.5 px-4">
                      <span
                        className={`px-2 py-0.5 rounded-full font-semibold text-[10px] ${
                          b.status === "Completed"
                            ? "bg-emerald-100 text-emerald-800"
                            : b.status === "Work in Progress"
                            ? "bg-blue-100 text-blue-800"
                            : b.status === "Disputed"
                            ? "bg-rose-100 text-rose-800 font-bold"
                            : "bg-amber-100 text-amber-800"
                        }`}
                      >
                        {b.status}
                      </span>
                      <span className="font-bold text-stone-900 block mt-0.5">₹{b.grandTotal}</span>
                    </td>

                    <td className="py-3.5 px-4 text-right">
                      <select
                        value={b.status}
                        onChange={(e) => handleAdminStatusChange(b.id, e.target.value)}
                        className="text-[11px] font-semibold bg-stone-50 border border-stone-200 rounded-lg p-1 outline-hidden"
                      >
                        <option value="Booking Requested">Requested</option>
                        <option value="Worker Accepted">Accepted</option>
                        <option value="Worker En Route">En Route</option>
                        <option value="Work in Progress">In Progress</option>
                        <option value="Completed">Completed</option>
                        <option value="Disputed">Disputed</option>
                        <option value="Cancelled">Cancelled</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminBookings;
