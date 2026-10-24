// src/pages/worker/Earnings.jsx
import React from "react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import { useAppData } from "../../context/AppDataContext";
import { useAuth } from "../../context/AuthContext";
import { CreditCard, CheckCircle2, Clock, ShieldCheck, ArrowDownRight } from "lucide-react";

export const WorkerEarnings = () => {
  const { data } = useAppData();
  const { user } = useAuth();

  const workerId = user?.id || "w1";
  const completedJobs = (data.bookings || []).filter(
    (b) => (b.workerId === workerId || b.workerName?.includes("Asha")) && b.status === "Completed"
  );

  const totalGross = completedJobs.reduce((sum, b) => sum + (b.estimatedTotal || 0), 0) + 18500;
  const platformCuts = 0; // Fair work charter: 0% cut from base worker wage!
  const netEarnings = totalGross - platformCuts;

  return (
    <DashboardLayout role="worker">
      <div className="space-y-6">
        <div>
          <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider">
            Worker Payouts & Transparent Wages
          </span>
          <h1 className="text-2xl font-extrabold text-stone-900 mt-0.5">
            Earnings & Disbursal Summary
          </h1>
          <p className="text-xs text-stone-500 mt-1">
            KaamSetu guarantees fair wages. The client pays an independent convenience fee; your base hourly rate is never reduced.
          </p>
        </div>

        {/* Earnings Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-white p-6 rounded-3xl border border-stone-200 shadow-xs space-y-1">
            <span className="text-xs text-stone-400 font-semibold uppercase tracking-wider">Gross Service Earnings</span>
            <div className="text-3xl font-extrabold text-stone-900">₹{totalGross.toLocaleString("en-IN")}</div>
            <span className="text-[11px] text-stone-500">Across all completed platform jobs</span>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-stone-200 shadow-xs space-y-1">
            <span className="text-xs text-stone-400 font-semibold uppercase tracking-wider">Platform Deductions</span>
            <div className="text-3xl font-extrabold text-emerald-700">₹0</div>
            <span className="text-[11px] text-emerald-800 font-medium">KaamSetu 0% wage commission pledge</span>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-stone-200 shadow-xs space-y-1">
            <span className="text-xs text-stone-400 font-semibold uppercase tracking-wider">Net Disbursed to Bank</span>
            <div className="text-3xl font-extrabold text-stone-900">₹{netEarnings.toLocaleString("en-IN")}</div>
            <span className="text-[11px] text-stone-500">Auto-transferred to UPI/Bank account</span>
          </div>
        </div>

        {/* Fair Wage Charter Notice */}
        <div className="bg-emerald-50 rounded-2xl border border-emerald-200 p-5 text-xs text-emerald-950 flex items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2 font-bold text-sm text-emerald-900">
              <ShieldCheck className="w-5 h-5 text-emerald-700" />
              <span>Transparent Wage Protection</span>
            </div>
            <p className="text-emerald-800 leading-relaxed max-w-xl">
              Unlike legacy gig agencies that cut 20-30% from workers' earnings, KaamSetu lets professionals take home 100% of their quoted hourly rates. Platform escrow fees are billed transparently to households.
            </p>
          </div>
        </div>

        {/* Completed Jobs Disbursal Ledger */}
        <div className="bg-white rounded-3xl border border-stone-200 shadow-xs overflow-hidden">
          <div className="p-5 border-b border-stone-100 flex items-center justify-between">
            <h2 className="text-sm font-bold text-stone-900">Recent Completed Payouts</h2>
            <span className="text-xs text-stone-400">Direct Deposit</span>
          </div>

          <div className="divide-y divide-stone-100">
            {completedJobs.map((b) => (
              <div key={b.id} className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-mono font-bold text-stone-900">{b.id}</span>
                    <span className="text-[10px] font-semibold bg-emerald-100 text-emerald-900 px-2 py-0.5 rounded-full">
                      ✓ Disbursed
                    </span>
                  </div>
                  <div className="font-semibold text-stone-800 text-sm">{b.serviceName} • {b.customerName}</div>
                  <div className="text-stone-500">{b.scheduledDate} ({b.durationHours} hours)</div>
                </div>

                <div className="text-right">
                  <span className="text-base font-extrabold text-stone-900">₹{b.estimatedTotal}</span>
                  <span className="text-[10px] text-stone-400 block">Bank Transfer (UTR #928174)</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default WorkerEarnings;
