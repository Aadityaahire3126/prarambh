// src/pages/customer/Support.jsx
import React, { useState } from "react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import ComplaintModal from "../../components/modals/ComplaintModal";
import { useAppData } from "../../context/AppDataContext";
import { useAuth } from "../../context/AuthContext";
import { LifeBuoy, AlertCircle, CheckCircle2, Clock, PlusCircle } from "lucide-react";

export const CustomerSupport = () => {
  const { data } = useAppData();
  const { user } = useAuth();
  const [complaintModalOpen, setComplaintModalOpen] = useState(false);

  const customerId = user?.id || "c1";
  const myComplaints = (data.complaints || []).filter(
    (c) => c.customerId === customerId || c.customerName?.includes("Rohit")
  );

  const activeBooking = (data.bookings || [])[0];

  return (
    <DashboardLayout role="customer">
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider">
              Grievance & Resolution
            </span>
            <h1 className="text-2xl font-extrabold text-stone-900 mt-0.5">
              Customer Support & Replacement Tickets
            </h1>
          </div>

          <button
            type="button"
            onClick={() => setComplaintModalOpen(true)}
            className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white font-semibold text-xs rounded-xl shadow-xs transition-colors flex items-center gap-1.5 self-start sm:self-auto"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Raise Issue / Request Replacement</span>
          </button>
        </div>

        {/* Complaints / Disputes List */}
        <div className="space-y-4">
          <h2 className="text-base font-bold text-stone-900">
            Active & Resolved Support Tickets ({myComplaints.length})
          </h2>

          {myComplaints.length === 0 ? (
            <div className="bg-white rounded-2xl border border-stone-200 p-8 text-center text-xs text-stone-500">
              <CheckCircle2 className="w-10 h-10 text-emerald-500 mx-auto mb-2" />
              <p className="font-semibold text-stone-800 text-sm mb-1">No active complaints or disputes!</p>
              <p>Your bookings have proceeded smoothly under KaamSetu's verified service standards.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {myComplaints.map((c) => (
                <div key={c.id} className="bg-white rounded-2xl border border-stone-200 p-6 shadow-xs space-y-4 text-xs">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-stone-100">
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-bold text-stone-900">{c.id}</span>
                      <span className="px-2.5 py-0.5 rounded-full font-semibold bg-amber-100 text-amber-900">
                        {c.status}
                      </span>
                    </div>
                    <span className="text-stone-400">{c.createdAt}</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-stone-700">
                    <div>
                      <span className="text-stone-400 block mb-0.5">Category:</span>
                      <span className="font-semibold text-stone-900">{c.category}</span>
                    </div>
                    <div>
                      <span className="text-stone-400 block mb-0.5">Professional / Booking:</span>
                      <span className="font-semibold text-stone-900">{c.workerName} ({c.bookingId})</span>
                    </div>
                  </div>

                  <div className="p-3 bg-stone-50 rounded-xl border border-stone-200">
                    <span className="font-semibold text-stone-800 block mb-1">Issue Description:</span>
                    <p className="text-stone-600 leading-relaxed">{c.description}</p>
                  </div>

                  {c.adminNotes && (
                    <div className="p-3 bg-blue-50 rounded-xl border border-blue-200 text-blue-900">
                      <span className="font-semibold block mb-0.5">KaamSetu Operations Notes:</span>
                      <p className="leading-relaxed">{c.adminNotes}</p>
                    </div>
                  )}

                  <div className="flex items-center justify-between pt-1 text-stone-500 text-[11px]">
                    <span>Outcome Status: <strong>{c.resolutionStatus || "Under Investigation"}</strong></span>
                    <span>Fair Resolution Guarantee</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <ComplaintModal
        isOpen={complaintModalOpen}
        onClose={() => setComplaintModalOpen(false)}
        booking={activeBooking}
      />
    </DashboardLayout>
  );
};

export default CustomerSupport;
