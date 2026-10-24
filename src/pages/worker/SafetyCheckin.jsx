// src/pages/worker/SafetyCheckin.jsx
import React, { useState } from "react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import SafetySosModal from "../../components/modals/SafetySosModal";
import { useAppData } from "../../context/AppDataContext";
import { useAuth } from "../../context/AuthContext";
import { useToast } from "../../components/notifications/ToastProvider";
import {
  ShieldCheck,
  AlertTriangle,
  KeyRound,
  Heart,
  Play,
  Pause,
  CheckCircle2,
  Clock,
  MapPin,
  User,
  Shield,
  EyeOff,
  Radio,
  RotateCcw
} from "lucide-react";

export const WorkerSafetyCheckin = () => {
  const { user } = useAuth();
  const {
    data,
    confirmArrivalOtp,
    markSafeHeartbeat,
    updateJobProgress,
    updateBookingStatus
  } = useAppData();
  const { addToast } = useToast();

  const workerId = user?.id || "w1";
  const workerBookings = (data.bookings || []).filter(
    (b) => b.workerId === workerId || b.workerName?.includes("Asha")
  );

  const [selectedBookingId, setSelectedBookingId] = useState(
    workerBookings[0]?.id || "BK-701"
  );
  const activeBooking =
    workerBookings.find((b) => b.id === selectedBookingId) || workerBookings[0];

  const [enteredOtp, setEnteredOtp] = useState("");
  const [sosModalOpen, setSosModalOpen] = useState(false);
  const [resendStatus, setResendStatus] = useState(false);

  // Handle Arrival OTP validation
  const handleVerifyOtp = (e) => {
    e.preventDefault();
    if (!enteredOtp.trim()) {
      addToast("Please enter the 4-digit code provided by the customer.", "error");
      return;
    }

    const res = confirmArrivalOtp(activeBooking.id, enteredOtp);
    if (res.success) {
      addToast(res.message, "success");
      setEnteredOtp("");
    } else {
      addToast(res.message, "error");
    }
  };

  const handleResendDemoCode = () => {
    setResendStatus(true);
    addToast(
      `Demo code refreshed: ${activeBooking?.arrivalOtp || "4821"} (Shown on customer's phone).`,
      "info"
    );
    setTimeout(() => setResendStatus(false), 3000);
  };

  const handleManualCheckIn = () => {
    if (window.confirm("Simulate authorized operations manual arrival check-in?")) {
      confirmArrivalOtp(activeBooking.id, activeBooking.arrivalOtp || "4821");
      addToast("Manual arrival check-in authorized for this demo.", "success");
    }
  };

  const handleHeartbeat = () => {
    const res = markSafeHeartbeat(activeBooking.id);
    addToast(`'I am Safe' heartbeat logged at ${res.timestamp}. Operations panel updated.`, "success");
  };

  const handleProgressChange = (progress) => {
    updateJobProgress(activeBooking.id, progress);
    addToast(`Job state set to: ${progress}`, "info");
  };

  const recentAlerts = (data.safetyAlerts || []).slice(0, 3);

  return (
    <DashboardLayout role="worker">
      <div className="space-y-6">
        {/* Top Operations Header */}
        <div className="bg-stone-900 text-white rounded-3xl p-6 sm:p-8 shadow-md flex flex-col md:flex-row md:items-center justify-between gap-6 border border-stone-800">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-semibold border border-emerald-500/30">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Worker Dignity & Safety Protocol</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Safety Check-In & Arrival Centre
            </h1>
            <p className="text-xs sm:text-sm text-stone-300 max-w-xl leading-relaxed">
              Log doorstep arrival, send routine safety heartbeats, update job milestones, and trigger instant incident alerts for operations follow-up.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3">
            <button
              type="button"
              onClick={handleHeartbeat}
              className="w-full sm:w-auto py-3 px-5 bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white font-bold text-xs rounded-xl shadow-xs transition-colors flex items-center justify-center gap-2"
            >
              <Heart className="w-4 h-4 fill-white" />
              <span>Send "I'm Safe" Ping</span>
            </button>

            <button
              type="button"
              onClick={() => setSosModalOpen(true)}
              className="w-full sm:w-auto py-3 px-5 bg-rose-600 hover:bg-rose-700 active:bg-rose-800 text-white font-bold text-xs rounded-xl shadow-xs transition-colors flex items-center justify-center gap-2"
            >
              <AlertTriangle className="w-4 h-4" />
              <span>SOS / I Need Help</span>
            </button>
          </div>
        </div>

        {/* Booking Selector & Current Visit Snapshot */}
        {activeBooking ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left Arrival & Verification Controls */}
            <div className="lg:col-span-8 space-y-6">
              {/* Visit Profile Card */}
              <div className="bg-white rounded-3xl border border-stone-200 p-6 shadow-xs space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-stone-100">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-stone-400 block">
                      Active Booking Reference
                    </span>
                    <div className="flex items-center gap-2 mt-0.5">
                      <select
                        value={selectedBookingId}
                        onChange={(e) => setSelectedBookingId(e.target.value)}
                        className="font-mono text-sm font-bold text-stone-900 bg-stone-50 border border-stone-200 rounded-lg p-1.5 outline-hidden"
                      >
                        {workerBookings.map((b) => (
                          <option key={b.id} value={b.id}>
                            {b.id} — {b.serviceName} ({b.customerName})
                          </option>
                        ))}
                      </select>
                      <span className="text-xs px-2.5 py-0.5 rounded-full font-semibold bg-emerald-100 text-emerald-900 border border-emerald-200">
                        {activeBooking.status}
                      </span>
                    </div>
                  </div>

                  <div className="text-left sm:text-right text-xs">
                    <span className="text-stone-400 block">Scheduled Arrival</span>
                    <span className="font-bold text-stone-900 text-sm">
                      {activeBooking.scheduledDate} at {activeBooking.scheduledTime}
                    </span>
                  </div>
                </div>

                {/* Host & Location Information */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-stone-700">
                  <div className="space-y-1">
                    <span className="text-stone-400 block font-medium">Customer / Host Name:</span>
                    <div className="flex items-center gap-2 font-bold text-stone-900 text-sm">
                      <User className="w-4 h-4 text-emerald-700" />
                      <span>{activeBooking.customerName}</span>
                    </div>
                    <p className="text-[11px] text-stone-500">{activeBooking.customerPhone}</p>
                  </div>

                  <div className="space-y-1">
                    <span className="text-stone-400 block font-medium">Job Location Address:</span>
                    <div className="flex items-start gap-1.5 font-medium text-stone-800">
                      <MapPin className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                      <span>{activeBooking.address}</span>
                    </div>
                  </div>
                </div>

                {/* Simulated Arrival OTP Section */}
                <div className="bg-stone-50 p-5 rounded-2xl border border-stone-200 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <KeyRound className="w-5 h-5 text-emerald-600" />
                      <h3 className="text-sm font-bold text-stone-900">
                        Doorstep Arrival Confirmation
                      </h3>
                    </div>

                    <span className="text-[11px] font-semibold text-stone-500">
                      {activeBooking.arrivalConfirmed ? (
                        <span className="text-emerald-700 flex items-center gap-1">
                          <CheckCircle2 className="w-4 h-4" />
                          <span>Verified at {activeBooking.arrivalTimestamp}</span>
                        </span>
                      ) : (
                        <span className="text-amber-700 flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          <span>Pending Doorstep OTP</span>
                        </span>
                      )}
                    </span>
                  </div>

                  {!activeBooking.arrivalConfirmed ? (
                    <form onSubmit={handleVerifyOtp} className="space-y-3 pt-2">
                      <p className="text-xs text-stone-600 leading-relaxed">
                        Ask the customer at the door for their 4-digit code (in this prototype demo, the code is <strong>{activeBooking.arrivalOtp || "4821"}</strong>).
                      </p>

                      <div className="flex flex-col sm:flex-row gap-2">
                        <input
                          type="text"
                          maxLength={4}
                          value={enteredOtp}
                          onChange={(e) => setEnteredOtp(e.target.value)}
                          placeholder="Enter 4-digit demo OTP (e.g. 4821)"
                          className="flex-1 font-mono text-base font-bold tracking-widest p-3 bg-white border border-stone-300 rounded-xl outline-hidden focus:ring-2 focus:ring-emerald-500 text-center sm:text-left"
                        />
                        <button
                          type="submit"
                          className="py-3 px-5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-xs transition-colors whitespace-nowrap"
                        >
                          Verify Arrival
                        </button>
                      </div>

                      <div className="flex items-center justify-between text-xs pt-1">
                        <button
                          type="button"
                          onClick={handleResendDemoCode}
                          className="text-emerald-700 hover:underline font-medium"
                        >
                          {resendStatus ? "Code Refreshed!" : "Resend / Check Demo Code"}
                        </button>

                        <button
                          type="button"
                          onClick={handleManualCheckIn}
                          className="text-stone-500 hover:text-stone-900 underline"
                        >
                          Simulate Manual Operations Check-In
                        </button>
                      </div>
                    </form>
                  ) : (
                    <div className="p-3 bg-emerald-100/70 border border-emerald-300 rounded-xl text-xs text-emerald-950 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-5 h-5 text-emerald-700" />
                        <span>Doorstep arrival verified. Work session is legally active.</span>
                      </div>
                      <span className="font-mono font-bold text-emerald-900">{activeBooking.arrivalOtp}</span>
                    </div>
                  )}
                </div>

                {/* Job Progress Update Buttons */}
                <div className="pt-2 space-y-2">
                  <span className="text-xs font-bold text-stone-700 uppercase tracking-wider block">
                    Update Job Progress:
                  </span>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {["Work Started", "Work Paused", "Work Resumed", "Work Completed"].map((prog) => (
                      <button
                        key={prog}
                        type="button"
                        onClick={() => handleProgressChange(prog)}
                        className={`py-2 px-2 text-xs font-semibold rounded-xl border transition-all text-center ${
                          activeBooking.jobProgress === prog
                            ? "bg-emerald-700 text-white border-emerald-700 shadow-2xs"
                            : "bg-white text-stone-700 border-stone-200 hover:bg-stone-50"
                        }`}
                      >
                        {prog}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Right Safety Logs & Privacy Guarantee */}
            <div className="lg:col-span-4 space-y-6">
              {/* Operations Live Audit Feed */}
              <div className="bg-white rounded-3xl border border-stone-200 p-5 shadow-xs space-y-3">
                <div className="flex items-center justify-between pb-2 border-b border-stone-100">
                  <h3 className="font-bold text-xs uppercase tracking-wider text-stone-700 flex items-center gap-1.5">
                    <Radio className="w-4 h-4 text-emerald-600 animate-pulse" />
                    <span>Operations Safety Feed</span>
                  </h3>
                  <span className="text-[10px] text-stone-400">Live Demo</span>
                </div>

                <div className="space-y-3 text-xs">
                  {recentAlerts.map((alt) => (
                    <div key={alt.id} className="p-3 rounded-xl bg-stone-50 border border-stone-200 space-y-1">
                      <div className="flex items-center justify-between font-bold text-stone-900 text-[11px]">
                        <span>{alt.alertType}</span>
                        <span
                          className={`px-1.5 py-0.5 rounded text-[9px] uppercase font-bold ${
                            alt.priority === "Critical"
                              ? "bg-rose-100 text-rose-800"
                              : alt.priority === "High"
                              ? "bg-amber-100 text-amber-800"
                              : "bg-blue-100 text-blue-800"
                          }`}
                        >
                          {alt.priority}
                        </span>
                      </div>
                      <p className="text-[11px] text-stone-600 leading-tight">{alt.description}</p>
                      <div className="text-[10px] text-stone-400">{alt.createdAt}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Strict Privacy & Fair Treatment Notice */}
            
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-3xl border border-stone-200 p-12 text-center text-xs text-stone-500">
            No active jobs assigned currently.
          </div>
        )}
      </div>

      <SafetySosModal
        isOpen={sosModalOpen}
        onClose={() => setSosModalOpen(false)}
        booking={activeBooking}
      />
    </DashboardLayout>
  );
};

export default WorkerSafetyCheckin;
