// src/pages/customer/PostRequirement.jsx
import React, { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import DashboardLayout from "../../components/layout/DashboardLayout";
import { useAppData } from "../../context/AppDataContext";
import { useAuth } from "../../context/AuthContext";
import { useToast } from "../../components/notifications/ToastProvider";
import { PlusCircle, ShieldCheck, ArrowRight, Lock, Sparkles } from "lucide-react";

export const PostRequirement = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { data, postRequirement } = useAppData();
  const { user } = useAuth();
  const { addToast } = useToast();

  const categories = data.serviceCategories || [];
  const initialCategory = searchParams.get("category") || categories[0]?.name || "Maid / Housekeeper";

  const [category, setCategory] = useState(initialCategory);
  const [subtype, setSubtype] = useState("Daily Housekeeping");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [locality, setLocality] = useState("Lajpat Nagar IV");
  const [pinCode, setPinCode] = useState("110024");
  const [serviceAddress, setServiceAddress] = useState("Flat 402, Block C, Lajpat Nagar IV");
  const [preferredDate, setPreferredDate] = useState("2026-10-26");
  const [preferredTime, setPreferredTime] = useState("09:30 AM");
  const [recurring, setRecurring] = useState(true);
  const [recurrenceFrequency, setRecurrenceFrequency] = useState("Daily (Mon - Sat)");
  const [budgetMin, setBudgetMin] = useState(250);
  const [budgetMax, setBudgetMax] = useState(350);
  const [expectedDuration, setExpectedDuration] = useState("2 - 3 hours");
  const [specialInstructions, setSpecialInstructions] = useState("");
  const [householdNotes, setHouseholdNotes] = useState("");
  const [contactPreference, setContactPreference] = useState("In-App Protected Chat Only");

  const [errors, setErrors] = useState({});

  const validate = () => {
    const errs = {};
    if (!title.trim()) errs.title = "Please provide a short requirement title.";
    if (!description.trim()) errs.description = "Please describe the scope of work.";
    if (!locality.trim()) errs.locality = "Locality is required.";
    if (!pinCode.trim() || pinCode.length !== 6) errs.pinCode = "Please enter a valid 6-digit Indian PIN code.";
    if (!serviceAddress.trim()) errs.serviceAddress = "Private service address is required for dispatch.";
    if (Number(budgetMin) > Number(budgetMax)) errs.budget = "Minimum budget cannot exceed maximum budget.";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) {
      addToast("Please correct the highlighted errors.", "error");
      return;
    }

    const newReq = postRequirement({
      title,
      description,
      category,
      categorySlug: categories.find((c) => c.name === category)?.id || "other",
      subtype,
      locality,
      pinCode,
      privateAddress: serviceAddress,
      preferredDate,
      preferredTime,
      recurring,
      recurrenceFrequency: recurring ? recurrenceFrequency : "One-Time Service",
      budgetMin: Number(budgetMin),
      budgetMax: Number(budgetMax),
      expectedDuration,
      specialInstructions,
      householdNotes,
      contactPreference,
      customerId: user?.id || "c1",
      customerName: user?.name || "Rohit Mehta",
    });

    addToast("Requirement posted! Generating suggested matches...", "success");
    navigate(`/customer/matches?reqId=${newReq.id}`);
  };

  return (
    <DashboardLayout role="customer">
      <div className="max-w-3xl mx-auto space-y-6">
        <div>
          <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider">
            Customer Requirement Portal
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-stone-900 mt-1">
            Post Your Home Service Requirement
          </h1>
          <p className="text-xs sm:text-sm text-stone-600 mt-1">
            Specify your exact needs, preferred schedule, and budget. Our smart matching algorithm will connect you with verified professionals in your locality.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-3xl border border-stone-200 p-6 sm:p-8 shadow-xs space-y-6">
          {/* Service Category & Subtype */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                Service Category *
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full text-xs p-3 border border-stone-300 rounded-xl outline-hidden focus:ring-2 focus:ring-emerald-500 bg-white"
              >
                {categories.map((c) => (
                  <option key={c.id} value={c.name}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                Service Subtype / Specialization
              </label>
              <input
                type="text"
                value={subtype}
                onChange={(e) => setSubtype(e.target.value)}
                placeholder="e.g. Daily Mopping, South Indian Breakfast, Leak Repair"
                className="w-full text-xs p-3 border border-stone-300 rounded-xl outline-hidden focus:ring-2 focus:ring-emerald-500"
              />
            </div>
          </div>

          {/* Title & Description */}
          <div>
            <label className="block text-xs font-semibold text-stone-700 mb-1">
              Short Requirement Title *
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Daily Housekeeping & Utensil Cleaning for 3BHK"
              className={`w-full text-xs p-3 border rounded-xl outline-hidden focus:ring-2 focus:ring-emerald-500 ${
                errors.title ? "border-rose-400 bg-rose-50/50" : "border-stone-300"
              }`}
            />
            {errors.title && <p className="text-[11px] text-rose-600 mt-1">{errors.title}</p>}
          </div>

          <div>
            <label className="block text-xs font-semibold text-stone-700 mb-1">
              Detailed Description of Work *
            </label>
            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Detail the scope of work (e.g. room count, specific appliances, dusting expectations)..."
              className={`w-full text-xs p-3 border rounded-xl outline-hidden focus:ring-2 focus:ring-emerald-500 ${
                errors.description ? "border-rose-400 bg-rose-50/50" : "border-stone-300"
              }`}
            />
            {errors.description && <p className="text-[11px] text-rose-600 mt-1">{errors.description}</p>}
          </div>

          {/* Recurrence Selection */}
          <div className="p-4 bg-stone-50 rounded-2xl border border-stone-200 space-y-3">
            <label className="block text-xs font-bold text-stone-800">
              Service Frequency
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setRecurring(false)}
                className={`py-2.5 px-3 rounded-xl text-xs font-semibold border text-center transition-all ${
                  !recurring
                    ? "bg-stone-900 text-white border-stone-900 shadow-2xs"
                    : "bg-white text-stone-700 border-stone-200 hover:bg-stone-100"
                }`}
              >
                One-Time Service / Repair
              </button>
              <button
                type="button"
                onClick={() => setRecurring(true)}
                className={`py-2.5 px-3 rounded-xl text-xs font-semibold border text-center transition-all ${
                  recurring
                    ? "bg-emerald-600 text-white border-emerald-600 shadow-2xs"
                    : "bg-white text-stone-700 border-stone-200 hover:bg-stone-100"
                }`}
              >
                Recurring Service (Daily / Weekly)
              </button>
            </div>

            {recurring && (
              <div className="pt-2">
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Recurrence Schedule:
                </label>
                <select
                  value={recurrenceFrequency}
                  onChange={(e) => setRecurrenceFrequency(e.target.value)}
                  className="w-full text-xs p-2.5 border border-stone-300 rounded-xl outline-hidden focus:ring-2 focus:ring-emerald-500 bg-white"
                >
                  <option value="Daily (Mon - Sat)">Daily (Monday - Saturday)</option>
                  <option value="Daily (7 Days)">Daily (All 7 Days)</option>
                  <option value="3 Days a Week">3 Days a Week (Alternate Days)</option>
                  <option value="Weekends Only">Weekends Only (Saturday & Sunday)</option>
                  <option value="Monthly / Fixed Shift">Monthly Fixed Full-Time Shift</option>
                </select>
              </div>
            )}
          </div>

          {/* Date, Time, Duration */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                Preferred Start Date *
              </label>
              <input
                type="date"
                required
                value={preferredDate}
                onChange={(e) => setPreferredDate(e.target.value)}
                className="w-full text-xs p-3 border border-stone-300 rounded-xl outline-hidden focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                Preferred Time Slot *
              </label>
              <input
                type="text"
                required
                value={preferredTime}
                onChange={(e) => setPreferredTime(e.target.value)}
                placeholder="e.g. 09:30 AM"
                className="w-full text-xs p-3 border border-stone-300 rounded-xl outline-hidden focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                Estimated Duration
              </label>
              <input
                type="text"
                value={expectedDuration}
                onChange={(e) => setExpectedDuration(e.target.value)}
                placeholder="e.g. 2 - 3 hours"
                className="w-full text-xs p-3 border border-stone-300 rounded-xl outline-hidden focus:ring-2 focus:ring-emerald-500"
              />
            </div>
          </div>

          {/* Budget Range */}
          <div>
            <label className="block text-xs font-semibold text-stone-700 mb-1">
              Budget Range (₹ INR per hour / visit)
            </label>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <input
                  type="number"
                  value={budgetMin}
                  onChange={(e) => setBudgetMin(e.target.value)}
                  placeholder="Min (₹)"
                  className="w-full text-xs p-3 border border-stone-300 rounded-xl outline-hidden focus:ring-2 focus:ring-emerald-500"
                />
              </div>
              <div>
                <input
                  type="number"
                  value={budgetMax}
                  onChange={(e) => setBudgetMax(e.target.value)}
                  placeholder="Max (₹)"
                  className="w-full text-xs p-3 border border-stone-300 rounded-xl outline-hidden focus:ring-2 focus:ring-emerald-500"
                />
              </div>
            </div>
            {errors.budget && <p className="text-[11px] text-rose-600 mt-1">{errors.budget}</p>}
          </div>

          {/* Location & Private Address */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                Locality / Area *
              </label>
              <input
                type="text"
                value={locality}
                onChange={(e) => setLocality(e.target.value)}
                placeholder="e.g. Lajpat Nagar IV"
                className={`w-full text-xs p-3 border rounded-xl outline-hidden focus:ring-2 focus:ring-emerald-500 ${
                  errors.locality ? "border-rose-400 bg-rose-50/50" : "border-stone-300"
                }`}
              />
              {errors.locality && <p className="text-[11px] text-rose-600 mt-1">{errors.locality}</p>}
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                PIN Code *
              </label>
              <input
                type="text"
                maxLength={6}
                value={pinCode}
                onChange={(e) => setPinCode(e.target.value)}
                placeholder="e.g. 110024"
                className={`w-full text-xs p-3 border rounded-xl outline-hidden focus:ring-2 focus:ring-emerald-500 ${
                  errors.pinCode ? "border-rose-400 bg-rose-50/50" : "border-stone-300"
                }`}
              />
              {errors.pinCode && <p className="text-[11px] text-rose-600 mt-1">{errors.pinCode}</p>}
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="block text-xs font-semibold text-stone-700">
                Service Address (Kept Strictly Private) *
              </label>
              <span className="text-[10px] text-emerald-700 font-semibold flex items-center gap-1">
                <Lock className="w-3 h-3" />
                <span>Protected Privacy</span>
              </span>
            </div>
            <input
              type="text"
              value={serviceAddress}
              onChange={(e) => setServiceAddress(e.target.value)}
              placeholder="e.g. Flat 402, Block C, Lajpat Nagar IV"
              className={`w-full text-xs p-3 border rounded-xl outline-hidden focus:ring-2 focus:ring-emerald-500 ${
                errors.serviceAddress ? "border-rose-400 bg-rose-50/50" : "border-stone-300"
              }`}
            />
            {errors.serviceAddress && <p className="text-[11px] text-rose-600 mt-1">{errors.serviceAddress}</p>}
            <p className="text-[11px] text-stone-400 mt-1">
              Address is hidden from public view and disclosed only to your mutually confirmed professional.
            </p>
          </div>

          {/* Household & Accessibility Notes */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                Special Instructions
              </label>
              <input
                type="text"
                value={specialInstructions}
                onChange={(e) => setSpecialInstructions(e.target.value)}
                placeholder="e.g. Comfortable around pets, bring clean shoes"
                className="w-full text-xs p-3 border border-stone-300 rounded-xl outline-hidden focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                Household Notes
              </label>
              <input
                type="text"
                value={householdNotes}
                onChange={(e) => setHouseholdNotes(e.target.value)}
                placeholder="e.g. Lift access available, parking code"
                className="w-full text-xs p-3 border border-stone-300 rounded-xl outline-hidden focus:ring-2 focus:ring-emerald-500"
              />
            </div>
          </div>

          <div className="pt-4 border-t border-stone-100 flex items-center justify-between">
            <span className="text-xs text-stone-500 flex items-center gap-1">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Protected under KaamSetu Fair Trust Policy</span>
            </span>

            <button
              type="submit"
              className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white font-bold text-xs rounded-xl shadow-xs transition-colors flex items-center gap-2"
            >
              <span>Post & View Suggested Matches</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </form>
      </div>
    </DashboardLayout>
  );
};

export default PostRequirement;
