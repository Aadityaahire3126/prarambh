// src/pages/admin/Transactions.jsx
import React from "react";
import AdminLayout from "../../components/layout/AdminLayout";
import { useAppData } from "../../context/AppDataContext";
import { CreditCard, Download, ShieldCheck } from "lucide-react";

export const AdminTransactions = () => {
  const { data } = useAppData();
  const txns = data.transactions || [];

  const totalGross = txns.reduce((sum, t) => sum + (t.grossAmount || 0), 0);
  const totalWorkerPayouts = txns.reduce((sum, t) => sum + (t.workerPayout || 0), 0);
  const totalPlatformFees = txns.reduce((sum, t) => sum + (t.platformFee || 0), 0);

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <span className="text-xs font-bold text-stone-500 uppercase tracking-wider">
            Escrow Financial Ledger
          </span>
          <h1 className="text-2xl font-extrabold text-stone-900 mt-0.5">
            Platform Transactions & Payouts ({txns.length})
          </h1>
          <p className="text-xs text-stone-500 mt-1">
            Simulated digital escrow transactions, worker fee disbursements, and disclosed convenience fee collections.
          </p>
        </div>

        {/* Ledger Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-white p-5 rounded-3xl border border-stone-200 shadow-xs space-y-1 text-xs">
            <span className="text-stone-400 font-semibold uppercase">Total Gross Volume</span>
            <div className="text-2xl font-extrabold text-stone-900">₹{totalGross.toLocaleString("en-IN")}</div>
            <span className="text-[10px] text-stone-500">Transacted via simulated escrow</span>
          </div>

          <div className="bg-white p-5 rounded-3xl border border-stone-200 shadow-xs space-y-1 text-xs">
            <span className="text-stone-400 font-semibold uppercase">Worker Payouts</span>
            <div className="text-2xl font-extrabold text-emerald-800">₹{totalWorkerPayouts.toLocaleString("en-IN")}</div>
            <span className="text-[10px] text-emerald-700">100% of agreed wage released</span>
          </div>

          <div className="bg-white p-5 rounded-3xl border border-stone-200 shadow-xs space-y-1 text-xs">
            <span className="text-stone-400 font-semibold uppercase">Disclosed Platform Fees</span>
            <div className="text-2xl font-extrabold text-stone-900">₹{totalPlatformFees.toLocaleString("en-IN")}</div>
            <span className="text-[10px] text-stone-500">Covers insurance & escrow tech</span>
          </div>
        </div>

        {/* Transactions Table */}
        <div className="bg-white rounded-3xl border border-stone-200 shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-stone-50 text-stone-400 font-semibold border-b border-stone-100">
                <tr>
                  <th className="py-3 px-4">Txn ID</th>
                  <th className="py-3 px-4">Booking</th>
                  <th className="py-3 px-4">Customer & Worker</th>
                  <th className="py-3 px-4">Service</th>
                  <th className="py-3 px-4">Gross Amount</th>
                  <th className="py-3 px-4">Worker Net</th>
                  <th className="py-3 px-4">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100 text-stone-700">
                {txns.map((t) => (
                  <tr key={t.id} className="hover:bg-stone-50/60 transition-colors">
                    <td className="py-3.5 px-4 font-mono font-bold text-stone-900">{t.id}</td>
                    <td className="py-3.5 px-4 font-mono text-emerald-800 font-bold">{t.bookingId}</td>
                    <td className="py-3.5 px-4">
                      <div>Cust: <strong className="text-stone-900">{t.customerName}</strong></div>
                      <div>Tech: <strong className="text-emerald-800">{t.workerName}</strong></div>
                    </td>
                    <td className="py-3.5 px-4">{t.service}</td>
                    <td className="py-3.5 px-4 font-bold text-stone-900">₹{t.grossAmount}</td>
                    <td className="py-3.5 px-4 font-bold text-emerald-700">₹{t.workerPayout}</td>
                    <td className="py-3.5 px-4">
                      <span
                        className={`px-2 py-0.5 rounded-full font-semibold text-[10px] ${
                          t.status.includes("Completed")
                            ? "bg-emerald-100 text-emerald-800"
                            : "bg-blue-100 text-blue-800"
                        }`}
                      >
                        {t.status}
                      </span>
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

export default AdminTransactions;
