// src/pages/worker/Settings.jsx
import React, { useState } from "react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import { useAppData } from "../../context/AppDataContext";
import { useAuth } from "../../context/AuthContext";
import { useToast } from "../../components/notifications/ToastProvider";
import { Settings as SettingsIcon, Clock, DollarSign, MapPin, Check } from "lucide-react";

export const WorkerSettings = () => {
  const { data } = useAppData();
  const { user } = useAuth();
  const { addToast } = useToast();

  const workerId = user?.id || "w1";
  const worker = (data.workers || []).find((w) => w.id === workerId) || (data.workers || [])[0];

  const [availableForJobs, setAvailableForJobs] = useState(true);
  const [ratePerHour, setRatePerHour] = useState(worker?.ratePerHour || 280);
  const [workingHours, setWorkingHours] = useState(worker?.availability || "Mon - Sat (8:00 AM - 4:00 PM)");
  const [selectedLocations, setSelectedLocations] = useState(worker?.locations?.join(", ") || "Lajpat Nagar, Hauz Khas");

  const handleSave = (e) => {
    e.preventDefault();
    addToast("Working preferences saved locally.", "success");
  };

  return (
    <DashboardLayout role="worker">
      <div className="max-w-2xl mx-auto space-y-6">
        <div>
          <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider">
            Operational Preferences
          </span>
          <h1 className="text-2xl font-extrabold text-stone-900 mt-0.5">
            Work Availability & Rate Settings
          </h1>
        </div>

        <form onSubmit={handleSave} className="bg-white rounded-3xl border border-stone-200 p-6 sm:p-8 shadow-xs space-y-6 text-xs">
          {/* Availability Toggle */}
          <div className="p-4 bg-stone-50 rounded-2xl border border-stone-200 flex items-center justify-between">
            <div>
              <span className="font-bold text-stone-900 text-sm block">Available to Receive New Leads</span>
              <span className="text-stone-500">Toggle off when taking time off or fully booked</span>
            </div>
            <button
              type="button"
              onClick={() => setAvailableForJobs(!availableForJobs)}
              className={`w-12 h-6 rounded-full p-1 transition-colors ${
                availableForJobs ? "bg-emerald-600" : "bg-stone-300"
              }`}
            >
              <div
                className={`w-4 h-4 rounded-full bg-white transition-transform ${
                  availableForJobs ? "translate-x-6" : "translate-x-0"
                }`}
              />
            </button>
          </div>

          <div>
            <label className="block font-semibold text-stone-700 mb-1">
              Standard Hourly Rate (₹ INR)
            </label>
            <input
              type="number"
              value={ratePerHour}
              onChange={(e) => setRatePerHour(Number(e.target.value))}
              className="w-full text-xs p-3 border border-stone-300 rounded-xl outline-hidden focus:ring-2 focus:ring-emerald-500"
            />
            <p className="text-[11px] text-stone-400 mt-1">
              You retain 100% of this quoted rate per completed hour.
            </p>
          </div>

          <div>
            <label className="block font-semibold text-stone-700 mb-1">
              Daily Working Hours / Shifts
            </label>
            <input
              type="text"
              value={workingHours}
              onChange={(e) => setWorkingHours(e.target.value)}
              className="w-full text-xs p-3 border border-stone-300 rounded-xl outline-hidden focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          <div>
            <label className="block font-semibold text-stone-700 mb-1">
              Preferred Service Localities
            </label>
            <input
              type="text"
              value={selectedLocations}
              onChange={(e) => setSelectedLocations(e.target.value)}
              className="w-full text-xs p-3 border border-stone-300 rounded-xl outline-hidden focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          <div className="flex justify-end pt-2">
            <button
              type="submit"
              className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-xs transition-colors flex items-center gap-1.5"
            >
              <Check className="w-4 h-4" />
              <span>Save Work Settings</span>
            </button>
          </div>
        </form>
      </div>
    </DashboardLayout>
  );
};

export default WorkerSettings;
