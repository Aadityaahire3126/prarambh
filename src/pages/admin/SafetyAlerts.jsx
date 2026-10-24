// src/pages/admin/SafetyAlerts.jsx
import React, { useState } from "react";
import AdminLayout from "../../components/layout/AdminLayout";
import { useAppData } from "../../context/AppDataContext";
import { useToast } from "../../components/notifications/ToastProvider";
import {
  AlertTriangle,
  ShieldCheck,
  CheckCircle2,
  Clock,
  Filter,
  MessageSquare,
  X,
  Radio
} from "lucide-react";

export const AdminSafetyAlerts = () => {
  const { data, acknowledgeAlert, resolveAlert } = useAppData();
  const { addToast } = useToast();

  const alerts = data.safetyAlerts || [];
  const [filterPriority, setFilterPriority] = useState("all");
  const [selectedAlertForResolve, setSelectedAlertForResolve] = useState(null);
  const [resolutionText, setResolutionText] = useState("");

  const filteredAlerts = alerts.filter((a) => {
    if (filterPriority === "critical") return a.priority === "Critical" || a.priority === "High";
    if (filterPriority === "pending") return !a.resolved;
    if (filterPriority === "resolved") return a.resolved;
    return true;
  });

  const handleAcknowledge = (id) => {
    acknowledgeAlert(id);
    addToast(`Alert ${id} acknowledged. Operations investigating.`, "info");
  };

  const handleResolveSubmit = (e) => {
    e.preventDefault();
    if (!resolutionText.trim()) return;
    resolveAlert(selectedAlertForResolve.id, resolutionText);
    setSelectedAlertForResolve(null);
    setResolutionText("");
    addToast("Safety alert marked as resolved.", "success");
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <span className="text-xs font-bold text-rose-600 uppercase tracking-wider flex items-center gap-1.5">
            <Radio className="w-4 h-4 text-rose-600 animate-pulse" />
            <span>Real-Time Incident Triage</span>
          </span>
          <h1 className="text-2xl font-extrabold text-stone-900 mt-0.5">
            Worker & Household Safety Alert Console
          </h1>
          <p className="text-xs text-stone-500 mt-1">
            Review missed arrival check-ins, routine safety heartbeats, and worker distress flags with documented audit notes.
          </p>
        </div>

        {/* Priority Filter Tabs */}
        <div className="flex items-center gap-2 border-b border-stone-200 pb-2 text-xs">
          {[
            { id: "all", label: `All Alerts (${alerts.length})` },
            { id: "pending", label: "Pending Resolution" },
            { id: "critical", label: "Critical & High Priority" },
            { id: "resolved", label: "Resolved Archives" },
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setFilterPriority(tab.id)}
              className={`px-3 py-1.5 rounded-lg font-semibold transition-colors ${
                filterPriority === tab.id
                  ? "bg-stone-900 text-white shadow-2xs"
                  : "text-stone-600 hover:bg-stone-200"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Alerts Table / Feed */}
        <div className="bg-white rounded-3xl border border-stone-200 shadow-xs overflow-hidden">
          <div className="divide-y divide-stone-100">
            {filteredAlerts.length === 0 ? (
              <div className="p-12 text-center text-xs text-stone-400">
                No safety alerts match this priority filter.
              </div>
            ) : (
              filteredAlerts.map((alert) => (
                <div key={alert.id} className="p-6 space-y-3 hover:bg-stone-50/50 transition-colors text-xs">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div className="flex items-center gap-2.5">
                      <span className="font-mono font-bold text-stone-900 text-sm">{alert.id}</span>
                      <span
                        className={`px-2.5 py-0.5 rounded-full font-bold uppercase text-[10px] ${
                          alert.priority === "Critical"
                            ? "bg-rose-100 text-rose-800"
                            : alert.priority === "High"
                            ? "bg-amber-100 text-amber-800"
                            : "bg-blue-100 text-blue-800"
                        }`}
                      >
                        {alert.priority}
                      </span>
                      <span className="text-stone-500 font-semibold">• {alert.alertType}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-[11px] text-stone-400">{alert.createdAt}</span>
                      <span
                        className={`px-2 py-0.5 rounded font-semibold text-[10px] ${
                          alert.resolved
                            ? "bg-emerald-100 text-emerald-800"
                            : "bg-amber-100 text-amber-900"
                        }`}
                      >
                        {alert.resolved ? "Resolved" : alert.status}
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-stone-700">
                    <div>
                      <span className="text-stone-400 block mb-0.5">Affected Worker / Candidate:</span>
                      <strong className="text-stone-900">{alert.workerName}</strong>
                    </div>
                    <div>
                      <span className="text-stone-400 block mb-0.5">Booking Reference:</span>
                      <span className="font-mono text-emerald-800 font-bold">{alert.bookingId}</span>
                    </div>
                  </div>

                  <p className="text-stone-700 bg-stone-50 p-3.5 rounded-xl border border-stone-200 leading-relaxed">
                    {alert.description}
                  </p>

                  {alert.notes && (
                    <div className="text-stone-600 bg-blue-50/60 p-2.5 rounded-lg border border-blue-100 text-[11px]">
                      <strong>Internal Notes:</strong> {alert.notes}
                    </div>
                  )}

                  {alert.resolutionNote && (
                    <div className="text-emerald-900 bg-emerald-50/60 p-2.5 rounded-lg border border-emerald-200 text-[11px]">
                      <strong>Resolution Outcome:</strong> {alert.resolutionNote}
                    </div>
                  )}

                  {!alert.resolved && (
                    <div className="pt-2 flex items-center justify-end gap-2">
                      <button
                        type="button"
                        onClick={() => handleAcknowledge(alert.id)}
                        className="px-3 py-1.5 border border-stone-300 text-stone-700 hover:bg-stone-100 rounded-lg font-semibold"
                      >
                        Acknowledge Alert
                      </button>
                      <button
                        type="button"
                        onClick={() => setSelectedAlertForResolve(alert)}
                        className="px-4 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-bold shadow-xs"
                      >
                        Resolve with Audit Notes
                      </button>
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Resolution Modal */}
      {selectedAlertForResolve && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl p-6 max-w-md w-full space-y-4">
            <h3 className="text-lg font-bold text-stone-900">Resolve Safety Alert {selectedAlertForResolve.id}</h3>
            <p className="text-xs text-stone-500">
              Worker: <strong>{selectedAlertForResolve.workerName}</strong> • Type: {selectedAlertForResolve.alertType}
            </p>

            <form onSubmit={handleResolveSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-stone-700 mb-1">
                  Documented Action & Outcome *
                </label>
                <textarea
                  required
                  rows={3}
                  value={resolutionText}
                  onChange={(e) => setResolutionText(e.target.value)}
                  placeholder="e.g. Contacted technician via phone. Delayed 15 mins by metro signal; arrived safely and customer OTP verified..."
                  className="w-full text-xs p-3 border border-stone-300 rounded-xl outline-hidden focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setSelectedAlertForResolve(null)}
                  className="px-4 py-2 text-stone-600 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl shadow-xs"
                >
                  Confirm Resolution
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </AdminLayout>
  );
};

export default AdminSafetyAlerts;
