// src/pages/customer/Payments.jsx
import React from "react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import { useAppData } from "../../context/AppDataContext";
import { useAuth } from "../../context/AuthContext";
import { CreditCard, CheckCircle2, ShieldCheck, Download, AlertCircle } from "lucide-react";

export const CustomerPayments = () => {
  const { data } = useAppData();
  const { user } = useAuth();

  const customerId = user?.id || "c1";
  const myBookings = (data.bookings || []).filter(
    (b) => b.customerId === customerId || b.customerName?.includes("Rohit")
  );

  return (
    <DashboardLayout role="customer">
      <div className="space-y-6">
        <div>
          <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider">
            Financial Transparency & Escrow
          </span>
          <h1 className="text-2xl font-extrabold text-stone-900 mt-0.5">
            Payment History & Invoices
          </h1>
          <p className="text-xs text-stone-500 mt-1">
            All payments are held securely in simulated escrow until you sign off on completed services.
          </p>
        </div>

        {/* Escrow Mechanism Explainer Card */}
        <div className="bg-emerald-50 rounded-2xl border border-emerald-200 p-5 text-xs text-emerald-950 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2 font-bold text-sm text-emerald-900">
              <ShieldCheck className="w-5 h-5 text-emerald-700" />
              <span>How Escrow Protection Works</span>
            </div>
            <p className="text-emerald-800 leading-relaxed max-w-xl">
              When you book, funds are authorized and held safely. The service worker is guaranteed payment upon job completion, protecting them against wage withholding. You are protected against unfinished work.
            </p>
          </div>
          <span className="text-[11px] font-bold bg-white text-emerald-900 px-3 py-1.5 rounded-xl border border-emerald-300 shadow-2xs whitespace-nowrap">
            100% Disclosed Fees
          </span>
        </div>

        {/* Transactions Table / Cards */}
        <div className="bg-white rounded-3xl border border-stone-200 shadow-xs overflow-hidden">
          <div className="p-5 border-b border-stone-100 flex items-center justify-between">
            <h2 className="text-sm font-bold text-stone-900">Digital Invoices ({myBookings.length})</h2>
            <span className="text-xs text-stone-400">All amounts in INR (₹)</span>
          </div>

          <div className="divide-y divide-stone-100">
            {myBookings.map((b) => (
              <div key={b.id} className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-stone-900">{b.id}</span>
                    <span
                      className={`px-2 py-0.5 rounded-full font-medium text-[10px] ${
                        b.paymentStatus.includes("Released")
                          ? "bg-emerald-100 text-emerald-800"
                          : "bg-blue-100 text-blue-800"
                      }`}
                    >
                      {b.paymentStatus}
                    </span>
                  </div>
                  <div className="font-semibold text-stone-800 text-sm">{b.serviceName} • {b.workerName}</div>
                  <div className="text-stone-500">{b.scheduledDate} ({b.durationHours} hrs)</div>
                </div>

                <div className="flex items-center gap-6 self-end sm:self-center">
                  <div className="text-right">
                    <span className="text-stone-400 block text-[10px]">Worker: ₹{b.estimatedTotal} + Fee: ₹{b.platformFee}</span>
                    <span className="text-base font-extrabold text-stone-900">₹{b.grandTotal}</span>
                  </div>

                  <button
                    type="button"
                    onClick={() => alert(`Simulated receipt downloaded for ${b.id}: Total ₹${b.grandTotal}`)}
                    className="p-2 text-stone-500 hover:text-stone-900 border border-stone-200 rounded-xl hover:bg-stone-50"
                    title="Download Receipt (Demo)"
                  >
                    <Download className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default CustomerPayments;
