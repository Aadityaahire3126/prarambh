// src/pages/admin/Complaints.jsx
import React, { useState } from "react";
import AdminLayout from "../../components/layout/AdminLayout";
import { useAppData } from "../../context/AppDataContext";
import { useToast } from "../../components/notifications/ToastProvider";
import { LifeBuoy, AlertCircle, CheckCircle2, MessageSquare, Edit } from "lucide-react";

export const AdminComplaints = () => {
  const { data, updateComplaintStatus } = useAppData();
  const { addToast } = useToast();

  const complaints = data.complaints || [];
  const [selectedComplaint, setSelectedComplaint] = useState(null);
  const [adminNote, setAdminNote] = useState("");
  const [resolutionStatus, setResolutionStatus] = useState("Resolved with Courtesy Credit");

  const handleUpdate = (e) => {
    e.preventDefault();
    if (!selectedComplaint) return;
    updateComplaintStatus(selectedComplaint.id, "Resolved", adminNote, resolutionStatus);
    setSelectedComplaint(null);
    setAdminNote("");
    addToast("Complaint updated with official admin mediation note.", "success");
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <span className="text-xs font-bold text-stone-500 uppercase tracking-wider">
            Fair Dispute Mediation
          </span>
          <h1 className="text-2xl font-extrabold text-stone-900 mt-0.5">
            Complaints & Replacement Requests ({complaints.length})
          </h1>
          <p className="text-xs text-stone-500 mt-1">
            Resolve customer grievances, review property care inquiries, and authorize replacement domestic help.
          </p>
        </div>

        <div className="space-y-4">
          {complaints.map((c) => (
            <div key={c.id} className="bg-white rounded-3xl border border-stone-200 p-6 shadow-xs space-y-4 text-xs">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-stone-100">
                <div className="flex items-center gap-2.5">
                  <span className="font-mono font-bold text-stone-900">{c.id}</span>
                  <span
                    className={`px-2.5 py-0.5 rounded-full font-semibold ${
                      c.status === "Resolved"
                        ? "bg-emerald-100 text-emerald-800"
                        : "bg-amber-100 text-amber-900 font-bold"
                    }`}
                  >
                    {c.status}
                  </span>
                  <span className="text-stone-400">• Category: <strong>{c.category}</strong></span>
                </div>
                <span className="text-stone-400">{c.createdAt}</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-stone-700">
                <div>
                  <span className="text-stone-400 block mb-0.5">Complainant Customer:</span>
                  <strong className="text-stone-900">{c.customerName}</strong> (Booking: {c.bookingId})
                </div>
                <div>
                  <span className="text-stone-400 block mb-0.5">Assigned Worker:</span>
                  <strong className="text-emerald-800">{c.workerName}</strong>
                </div>
              </div>

              <div className="p-3 bg-stone-50 rounded-xl border border-stone-200 text-stone-700">
                <span className="font-semibold block mb-0.5">Grievance Description:</span>
                <p className="leading-relaxed">{c.description}</p>
              </div>

              {c.adminNotes && (
                <div className="p-3 bg-blue-50 rounded-xl border border-blue-200 text-blue-900">
                  <span className="font-semibold block mb-0.5">Admin Mediation Notes:</span>
                  <p className="leading-relaxed">{c.adminNotes}</p>
                  <span className="text-[10px] text-blue-700 block mt-1">Resolution: {c.resolutionStatus}</span>
                </div>
              )}

              {c.status !== "Resolved" && (
                <div className="pt-2 flex justify-end">
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedComplaint(c);
                      setAdminNote(c.adminNotes || "");
                    }}
                    className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl shadow-xs"
                  >
                    Mediate & Resolve Ticket
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Mediation Modal */}
      {selectedComplaint && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl p-6 max-w-md w-full space-y-4 text-xs">
            <h3 className="text-lg font-bold text-stone-900">Mediate Complaint {selectedComplaint.id}</h3>

            <form onSubmit={handleUpdate} className="space-y-4">
              <div>
                <label className="block font-semibold text-stone-700 mb-1">
                  Resolution Decision
                </label>
                <select
                  value={resolutionStatus}
                  onChange={(e) => setResolutionStatus(e.target.value)}
                  className="w-full text-xs p-2.5 border border-stone-300 rounded-xl outline-hidden focus:ring-2 focus:ring-emerald-500 bg-white"
                >
                  <option value="Resolved with Courtesy Credit">Resolved with Courtesy Credit</option>
                  <option value="Replacement Worker Assigned">Replacement Worker Assigned</option>
                  <option value="Mutual Agreement Reached">Mutual Agreement Reached</option>
                  <option value="Complaint Dismissed (Invalid Claim)">Complaint Dismissed (Invalid Claim)</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-stone-700 mb-1">
                  Operations Log Note *
                </label>
                <textarea
                  required
                  rows={3}
                  value={adminNote}
                  onChange={(e) => setAdminNote(e.target.value)}
                  placeholder="Record summary of call with both customer and worker..."
                  className="w-full text-xs p-3 border border-stone-300 rounded-xl outline-hidden focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setSelectedComplaint(null)}
                  className="px-4 py-2 text-stone-600 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-emerald-600 text-white font-bold rounded-xl shadow-xs"
                >
                  Save Resolution
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </AdminLayout>
  );
};

export default AdminComplaints;
