// src/pages/admin/ActivityLog.jsx
import React, { useState } from "react";
import AdminLayout from "../../components/layout/AdminLayout";
import { useAppData } from "../../context/AppDataContext";
import { Activity, Filter, RotateCcw } from "lucide-react";

export const AdminActivityLog = () => {
  const { data, resetToDefaults } = useAppData();
  const [categoryFilter, setCategoryFilter] = useState("all");

  const logs = data.activityLogs || [];

  const filteredLogs = logs.filter((log) => {
    if (categoryFilter !== "all" && log.category !== categoryFilter) return false;
    return true;
  });

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="text-xs font-bold text-stone-500 uppercase tracking-wider">
              Immutable Demo Trail
            </span>
            <h1 className="text-2xl font-extrabold text-stone-900 mt-0.5">
              System Audit & Activity Logs ({logs.length})
            </h1>
            <p className="text-xs text-stone-500 mt-1">
              Complete chronological journal of bookings, arrival OTP validations, safety alerts, and verification changes.
            </p>
          </div>

          <button
            type="button"
            onClick={() => {
              if (window.confirm("Reset all demo data back to default initial state?")) {
                resetToDefaults();
                window.location.reload();
              }
            }}
            className="px-3.5 py-2 border border-stone-300 hover:bg-stone-200 text-stone-700 text-xs font-bold rounded-xl transition-colors flex items-center gap-1.5 self-start sm:self-auto"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Demo to Defaults</span>
          </button>
        </div>

        {/* Filter Bar */}
        <div className="flex items-center gap-2 border-b border-stone-200 pb-2 text-xs overflow-x-auto">
          {[
            { id: "all", label: "All Activity" },
            { id: "safety", label: "Safety & Check-Ins" },
            { id: "booking", label: "Bookings & OTPs" },
            { id: "verification", label: "Verifications" },
            { id: "review", label: "Reviews & Ratings" },
            { id: "complaint", label: "Complaints" },
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setCategoryFilter(tab.id)}
              className={`px-3 py-1.5 rounded-lg font-semibold transition-colors whitespace-nowrap ${
                categoryFilter === tab.id
                  ? "bg-stone-900 text-white shadow-2xs"
                  : "text-stone-600 hover:bg-stone-200"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Audit Log Table */}
        <div className="bg-white rounded-3xl border border-stone-200 shadow-xs overflow-hidden">
          <table className="w-full text-left text-xs">
            <thead className="bg-stone-50 text-stone-400 font-semibold border-b border-stone-100">
              <tr>
                <th className="py-3 px-4">Timestamp</th>
                <th className="py-3 px-4">Actor / Origin</th>
                <th className="py-3 px-4">Action Summary</th>
                <th className="py-3 px-4">Category</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100 text-stone-700">
              {filteredLogs.map((log) => (
                <tr key={log.id} className="hover:bg-stone-50/60 transition-colors">
                  <td className="py-3 px-4 font-mono text-stone-400 text-[11px] whitespace-nowrap">
                    {log.timestamp}
                  </td>
                  <td className="py-3 px-4 font-semibold text-stone-900">
                    {log.actor}
                  </td>
                  <td className="py-3 px-4 leading-relaxed font-medium">
                    {log.action}
                  </td>
                  <td className="py-3 px-4">
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase ${
                        log.category === "safety"
                          ? "bg-rose-100 text-rose-800"
                          : log.category === "booking"
                          ? "bg-blue-100 text-blue-800"
                          : log.category === "verification"
                          ? "bg-purple-100 text-purple-800"
                          : "bg-stone-100 text-stone-700"
                      }`}
                    >
                      {log.category}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminActivityLog;
