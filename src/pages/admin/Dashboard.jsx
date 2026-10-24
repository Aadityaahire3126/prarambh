// src/pages/admin/Dashboard.jsx
import React from "react";
import { Link } from "react-router-dom";
import AdminLayout from "../../components/layout/AdminLayout";
import { useAppData } from "../../context/AppDataContext";
import {
  Users,
  ShieldCheck,
  CalendarCheck,
  AlertTriangle,
  LifeBuoy,
  Layers,
  CreditCard,
  Activity,
  ArrowRight,
  TrendingUp,
  UserCheck
} from "lucide-react";

export const AdminDashboard = () => {
  const { data } = useAppData();

  const totalWorkers = (data.workers || []).length;
  const totalCustomers = (data.customers || []).length;
  const totalBookings = (data.bookings || []).length;
  const activeBookings = (data.bookings || []).filter(
    (b) => b.status === "Worker Accepted" || b.status === "Worker En Route" || b.status === "Work in Progress"
  ).length;
  const completedBookings = (data.bookings || []).filter((b) => b.status === "Completed").length;
  const pendingSafetyAlerts = (data.safetyAlerts || []).filter((a) => !a.resolved).length;
  const openComplaints = (data.complaints || []).filter((c) => c.status !== "Resolved").length;
  const pendingVerifs = (data.workers || []).filter((w) =>
    w.trustBadges?.some((b) => !b.verified)
  ).length;

  const activityLogs = (data.activityLogs || []).slice(0, 6);

  // Status breakdown
  const statusCounts = (data.bookings || []).reduce((acc, b) => {
    acc[b.status] = (acc[b.status] || 0) + 1;
    return acc;
  }, {});

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <span className="text-xs font-bold text-stone-500 uppercase tracking-wider">
            KaamSetu Operations HQ
          </span>
          <h1 className="text-2xl font-extrabold text-stone-900 mt-0.5">
            Executive Overview & Telemetry
          </h1>
          <p className="text-xs text-stone-500 mt-1">
            Real-time platform activity, trust verification pipeline, safety alerts, and booking lifecycles.
          </p>
        </div>

        {/* Top Metric Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <Link
            to="/admin/safety-alerts"
            className="bg-white p-5 rounded-3xl border border-stone-200 shadow-xs hover:border-rose-300 transition-all space-y-1"
          >
            <div className="flex items-center justify-between text-xs text-stone-400 font-semibold uppercase">
              <span>Safety Alerts</span>
              <AlertTriangle className={`w-4 h-4 ${pendingSafetyAlerts > 0 ? "text-rose-600" : "text-stone-300"}`} />
            </div>
            <div className={`text-3xl font-extrabold ${pendingSafetyAlerts > 0 ? "text-rose-600" : "text-stone-900"}`}>
              {pendingSafetyAlerts}
            </div>
            <span className="text-[11px] text-stone-500">Pending triage action</span>
          </Link>

          <Link
            to="/admin/verification"
            className="bg-white p-5 rounded-3xl border border-stone-200 shadow-xs hover:border-blue-300 transition-all space-y-1"
          >
            <div className="flex items-center justify-between text-xs text-stone-400 font-semibold uppercase">
              <span>Pending Verifications</span>
              <ShieldCheck className="w-4 h-4 text-blue-600" />
            </div>
            <div className="text-3xl font-extrabold text-stone-900">{pendingVerifs}</div>
            <span className="text-[11px] text-stone-500">Worker profiles awaiting review</span>
          </Link>

          <Link
            to="/admin/bookings"
            className="bg-white p-5 rounded-3xl border border-stone-200 shadow-xs hover:border-emerald-300 transition-all space-y-1"
          >
            <div className="flex items-center justify-between text-xs text-stone-400 font-semibold uppercase">
              <span>Active Bookings</span>
              <CalendarCheck className="w-4 h-4 text-emerald-600" />
            </div>
            <div className="text-3xl font-extrabold text-emerald-800">{activeBookings}</div>
            <span className="text-[11px] text-stone-500">{completedBookings} completed total</span>
          </Link>

          <Link
            to="/admin/complaints"
            className="bg-white p-5 rounded-3xl border border-stone-200 shadow-xs hover:border-amber-300 transition-all space-y-1"
          >
            <div className="flex items-center justify-between text-xs text-stone-400 font-semibold uppercase">
              <span>Open Complaints</span>
              <LifeBuoy className="w-4 h-4 text-amber-600" />
            </div>
            <div className="text-3xl font-extrabold text-stone-900">{openComplaints}</div>
            <span className="text-[11px] text-stone-500">Disputes under mediation</span>
          </Link>
        </div>

        {/* Secondary KPI Row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white p-4 rounded-2xl border border-stone-200 text-xs flex items-center justify-between">
            <div>
              <span className="text-stone-400 block font-semibold">Total Workers:</span>
              <span className="text-lg font-bold text-stone-900">{totalWorkers} Active</span>
            </div>
            <Users className="w-6 h-6 text-emerald-600" />
          </div>

          <div className="bg-white p-4 rounded-2xl border border-stone-200 text-xs flex items-center justify-between">
            <div>
              <span className="text-stone-400 block font-semibold">Total Customers:</span>
              <span className="text-lg font-bold text-stone-900">{totalCustomers} Registered</span>
            </div>
            <UserCheck className="w-6 h-6 text-blue-600" />
          </div>

          <div className="bg-white p-4 rounded-2xl border border-stone-200 text-xs flex items-center justify-between">
            <div>
              <span className="text-stone-400 block font-semibold">Platform Categories:</span>
              <span className="text-lg font-bold text-stone-900">12 Managed</span>
            </div>
            <Layers className="w-6 h-6 text-purple-600" />
          </div>

          <div className="bg-white p-4 rounded-2xl border border-stone-200 text-xs flex items-center justify-between">
            <div>
              <span className="text-stone-400 block font-semibold">Simulated Escrow:</span>
              <span className="text-lg font-bold text-stone-900">₹42,850 Held</span>
            </div>
            <CreditCard className="w-6 h-6 text-emerald-600" />
          </div>
        </div>

        {/* Booking Distribution & Live Activity Log */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Booking Status Distribution */}
          <div className="lg:col-span-5 bg-white rounded-3xl border border-stone-200 p-6 shadow-xs space-y-4">
            <h2 className="text-sm font-bold text-stone-900">Booking Status Breakdown</h2>
            <div className="space-y-2.5 text-xs">
              {Object.entries(statusCounts).map(([status, count]) => {
                const percentage = Math.round((count / totalBookings) * 100);
                return (
                  <div key={status} className="space-y-1">
                    <div className="flex justify-between text-stone-700">
                      <span className="font-medium">{status}</span>
                      <span className="font-bold text-stone-900">{count} ({percentage}%)</span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-stone-100 overflow-hidden">
                      <div
                        className="h-full bg-emerald-600 rounded-full"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Real-time Activity Feed */}
          <div className="lg:col-span-7 bg-white rounded-3xl border border-stone-200 p-6 shadow-xs space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-stone-100">
              <h2 className="text-sm font-bold text-stone-900 flex items-center gap-2">
                <Activity className="w-4 h-4 text-emerald-600" />
                <span>Live System Activity Audit</span>
              </h2>
              <Link to="/admin/activity" className="text-xs text-emerald-700 font-semibold hover:underline">
                Full Log
              </Link>
            </div>

            <div className="space-y-3 text-xs">
              {activityLogs.map((log) => (
                <div key={log.id} className="p-3 bg-stone-50 rounded-2xl border border-stone-100 flex items-start justify-between gap-3">
                  <div className="space-y-0.5">
                    <div className="font-bold text-stone-900">{log.action}</div>
                    <div className="text-[11px] text-stone-500">Actor: {log.actor}</div>
                  </div>
                  <span className="text-[10px] text-stone-400 whitespace-nowrap">{log.timestamp}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
