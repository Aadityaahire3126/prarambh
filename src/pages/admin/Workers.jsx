// src/pages/admin/Workers.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import AdminLayout from "../../components/layout/AdminLayout";
import { TrustBadge } from "../../components/badges/TrustBadge";
import { useAppData } from "../../context/AppDataContext";
import { useToast } from "../../components/notifications/ToastProvider";
import { Users, Search, ShieldCheck, Star, Edit, Check } from "lucide-react";

export const AdminWorkers = () => {
  const { data, updateWorkerVerification } = useAppData();
  const { addToast } = useToast();

  const [searchQuery, setSearchQuery] = useState("");
  const [filterCategory, setFilterCategory] = useState("");

  const workers = data.workers || [];

  const filteredWorkers = workers.filter((w) => {
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const match = w.name.toLowerCase().includes(q) || w.primaryService.toLowerCase().includes(q);
      if (!match) return false;
    }
    if (filterCategory && w.primaryService !== filterCategory) return false;
    return true;
  });

  const handleToggleBadge = (workerId, field, currentValue) => {
    const newValue = currentValue?.includes("Verified")
      ? "Under Administrative Review"
      : "Verified by Operations Officer";
    updateWorkerVerification(workerId, field, newValue);
    addToast(`Updated ${field} status for worker ${workerId}`, "info");
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="text-xs font-bold text-stone-500 uppercase tracking-wider">
              Workforce Operations
            </span>
            <h1 className="text-2xl font-extrabold text-stone-900 mt-0.5">
              Service Workers Directory ({workers.length})
            </h1>
          </div>

          <div className="flex items-center gap-2">
            <Link
              to="/admin/verification"
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs rounded-xl shadow-xs transition-colors flex items-center gap-1.5"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>Verification Approvals Queue</span>
            </Link>
          </div>
        </div>

        {/* Search & Category Filter */}
        <div className="bg-white p-4 rounded-2xl border border-stone-200 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by worker name, skill, or city..."
            className="p-2.5 bg-stone-50 border border-stone-200 rounded-xl outline-hidden focus:bg-white focus:ring-2 focus:ring-emerald-500"
          />

          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="p-2.5 bg-stone-50 border border-stone-200 rounded-xl outline-hidden focus:bg-white focus:ring-2 focus:ring-emerald-500"
          >
            <option value="">All Service Trades</option>
            {data.serviceCategories?.map((c) => (
              <option key={c.id} value={c.name}>{c.name}</option>
            ))}
          </select>
        </div>

        {/* Workers Table */}
        <div className="bg-white rounded-3xl border border-stone-200 shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-stone-50 text-stone-400 font-semibold border-b border-stone-100">
                <tr>
                  <th className="py-3 px-4">Professional</th>
                  <th className="py-3 px-4">Service & Rate</th>
                  <th className="py-3 px-4">Rating & History</th>
                  <th className="py-3 px-4">Trust Evidence Badges</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100 text-stone-700">
                {filteredWorkers.map((w) => (
                  <tr key={w.id} className="hover:bg-stone-50/60 transition-colors">
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={w.avatar}
                          alt={w.name}
                          className="w-10 h-10 rounded-full object-cover border border-stone-200"
                        />
                        <div>
                          <Link to={`/workers/${w.id}`} className="font-bold text-stone-900 hover:text-emerald-700">
                            {w.name}
                          </Link>
                          <span className="text-[11px] text-stone-400 block font-mono">{w.id}</span>
                        </div>
                      </div>
                    </td>

                    <td className="py-3.5 px-4">
                      <div className="font-semibold text-stone-900">{w.primaryService}</div>
                      <div className="text-stone-500 font-mono">₹{w.ratePerHour}/hr</div>
                    </td>

                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-1 font-bold text-stone-900">
                        <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-500" />
                        <span>{w.rating}★</span>
                        <span className="text-stone-400 font-normal">({w.completedBookings} jobs)</span>
                      </div>
                      <span className="text-stone-500 text-[11px] block">{w.attendanceScore}% on-time arrival</span>
                    </td>

                    <td className="py-3.5 px-4">
                      <div className="flex flex-wrap gap-1 max-w-xs">
                        {w.trustBadges?.slice(0, 3).map((b) => (
                          <TrustBadge key={b.id} badgeId={b.id} customLabel={b.label} verified={b.verified} size="sm" />
                        ))}
                      </div>
                    </td>

                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          type="button"
                          onClick={() =>
                            handleToggleBadge(
                              w.id,
                              "criminalBackgroundCheck",
                              w.verificationDetails?.criminalBackgroundCheck
                            )
                          }
                          className="px-2.5 py-1 text-[11px] font-semibold rounded-lg border border-stone-200 hover:bg-stone-100"
                          title="Toggle Criminal Record Clearance in Demo"
                        >
                          Toggle Police Check
                        </button>
                        <Link
                          to={`/workers/${w.id}`}
                          className="px-2.5 py-1 bg-stone-900 text-white font-semibold rounded-lg text-[11px]"
                        >
                          Profile
                        </Link>
                      </div>
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

export default AdminWorkers;
