// src/pages/customer/Profile.jsx
import React, { useState } from "react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import { useAuth } from "../../context/AuthContext";
import { useToast } from "../../components/notifications/ToastProvider";
import { User, MapPin, Lock, ShieldCheck, Plus, Check } from "lucide-react";

export const CustomerProfile = () => {
  const { user } = useAuth();
  const { addToast } = useToast();

  const [name, setName] = useState(user?.name || "Rohit Mehta");
  const [email, setEmail] = useState(user?.email || "rohit.mehta@example.com");
  const [phone, setPhone] = useState("+91 98101 XXXXX");
  const [locality, setLocality] = useState("Lajpat Nagar IV, New Delhi");
  const [hasPets, setHasPets] = useState(true);

  const handleSave = (e) => {
    e.preventDefault();
    addToast("Profile preferences updated locally.", "success");
  };

  return (
    <DashboardLayout role="customer">
      <div className="max-w-2xl mx-auto space-y-6">
        <div>
          <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider">
            Household Settings
          </span>
          <h1 className="text-2xl font-extrabold text-stone-900 mt-0.5">
            Customer Profile & Saved Addresses
          </h1>
        </div>

        <form onSubmit={handleSave} className="bg-white rounded-3xl border border-stone-200 p-6 sm:p-8 shadow-xs space-y-6">
          <div className="flex items-center gap-4 pb-6 border-b border-stone-100">
            <img
              alt="Avatar"
              className="w-16 h-16 rounded-full object-cover border-2 border-emerald-500"
            />
            <div>
              <h2 className="text-lg font-bold text-stone-900">{name}</h2>
              <span className="text-xs text-stone-500">Verified Household • Delhi NCR</span>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                Full Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full text-xs p-3 border border-stone-300 rounded-xl outline-hidden focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full text-xs p-3 border border-stone-300 rounded-xl outline-hidden focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block text-xs font-semibold text-stone-700">
                  Mobile Number
                </label>
                <span className="text-[10px] text-emerald-700 font-semibold flex items-center gap-1">
                  <Lock className="w-3 h-3" />
                  <span>Masked from public search</span>
                </span>
              </div>
              <input
                type="text"
                disabled
                value={phone}
                className="w-full text-xs p-3 border border-stone-200 rounded-xl bg-stone-100 text-stone-600 cursor-not-allowed"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                Default Household Locality
              </label>
              <input
                type="text"
                value={locality}
                onChange={(e) => setLocality(e.target.value)}
                className="w-full text-xs p-3 border border-stone-300 rounded-xl outline-hidden focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <div className="flex items-center gap-2 p-3 bg-stone-50 rounded-xl border border-stone-200">
              <input
                type="checkbox"
                id="petsCheck"
                checked={hasPets}
                onChange={(e) => setHasPets(e.target.checked)}
                className="w-4 h-4 text-emerald-600 rounded border-stone-300 focus:ring-emerald-500"
              />
              <label htmlFor="petsCheck" className="text-xs font-medium text-stone-800 cursor-pointer">
                Household has pets (alerts allergic or pet-conscious service workers)
              </label>
            </div>
          </div>

          <div className="flex justify-end pt-2">
            <button
              type="submit"
              className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-xs transition-colors flex items-center gap-1.5"
            >
              <Check className="w-4 h-4" />
              <span>Save Preferences</span>
            </button>
          </div>
        </form>
      </div>
    </DashboardLayout>
  );
};

export default CustomerProfile;
