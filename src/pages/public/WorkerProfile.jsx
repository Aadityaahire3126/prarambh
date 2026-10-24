// src/pages/public/WorkerProfile.jsx
import React, { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import Header from "../../components/layout/Header";
import Footer from "../../components/layout/Footer";
import { TrustBadge } from "../../components/badges/TrustBadge";
import { useAppData } from "../../context/AppDataContext";
import { useAuth } from "../../context/AuthContext";
import { useToast } from "../../components/notifications/ToastProvider";
import {
  Star,
  MapPin,
  Clock,
  Heart,
  Share2,
  Calendar,
  CheckCircle2,
  ShieldCheck,
  Briefcase,
  Users,
  AlertTriangle,
  MessageSquare,
  Lock,
  ArrowRight,
  X
} from "lucide-react";

export const WorkerProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data, addBooking, isFavourite, toggleFavourite } = useAppData();
  const { user } = useAuth();
  const { addToast } = useToast();

  const worker = (data.workers || []).find((w) => w.id === id) || (data.workers || [])[0];
  const reviews = (data.reviews || []).filter((r) => r.workerId === worker?.id);
  const fav = isFavourite(worker?.id);

  // Booking Modal State
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [bookingDate, setBookingDate] = useState("2026-10-26");
  const [bookingTime, setBookingTime] = useState("09:30 AM");
  const [durationHours, setDurationHours] = useState(3);
  const [specialNotes, setSpecialNotes] = useState("");
  const [contactRequested, setContactRequested] = useState(false);
  const [reportModalOpen, setReportModalOpen] = useState(false);

  if (!worker) return null;

  const handleBookingSubmit = (e) => {
    e.preventDefault();
    const newBooking = addBooking({
      workerId: worker.id,
      workerName: worker.name,
      workerAvatar: worker.avatar,
      serviceName: worker.primaryService,
      customerId: user?.id || "c1",
      customerName: user?.name || "Rohit Mehta",
      customerPhone: "+91 98101 XXXXX (Protected)",
      address: "Flat 402, Block C, Lajpat Nagar IV, New Delhi",
      scheduledDate: bookingDate,
      scheduledTime: bookingTime,
      durationHours: Number(durationHours),
      ratePerHour: worker.ratePerHour,
      specialInstructions: specialNotes,
    });

    setShowBookingModal(false);
    addToast(`Booking request ${newBooking.id} created! Waiting for worker confirmation.`, "success");
    navigate(`/customer/bookings/${newBooking.id}`);
  };

  const handleRequestContact = () => {
    setContactRequested(true);
    addToast("Protected contact request sent. Telephone numbers remain masked for privacy.", "info");
  };

  return (
    <div className="min-h-screen flex flex-col bg-stone-50">
      <Header />

      {/* Profile Header Hero */}
      <div className="bg-white border-b border-stone-200 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-start justify-between gap-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
              <div className="relative">
                <img
                  src={worker.avatar}
                  alt={worker.name}
                  className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl object-cover border-4 border-emerald-50 shadow-md"
                />
                <span className="absolute -bottom-2 -right-2 bg-emerald-600 text-white p-1.5 rounded-full shadow-xs">
                  <ShieldCheck className="w-5 h-5" />
                </span>
              </div>

              <div className="space-y-1.5">
                <div className="flex items-center gap-3">
                  <h1 className="text-2xl sm:text-3xl font-extrabold text-stone-900">{worker.name}</h1>
                  <span className="text-xs bg-emerald-100 text-emerald-900 font-semibold px-2.5 py-0.5 rounded-full">
                    Active Partner
                  </span>
                </div>

                <p className="text-base font-semibold text-emerald-800">{worker.primaryService}</p>

                <div className="flex flex-wrap items-center gap-3 text-xs text-stone-600 pt-1">
                  <div className="flex items-center gap-1 font-bold text-stone-900">
                    <Star className="w-4 h-4 fill-amber-400 text-amber-500" />
                    <span>{worker.rating}</span>
                    <span className="text-stone-400 font-normal">({worker.completedBookings} reviews)</span>
                  </div>
                  <span className="text-stone-300">•</span>
                  <div className="flex items-center gap-1 text-teal-800 font-medium">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{worker.attendanceScore}% Punctual</span>
                  </div>
                  <span className="text-stone-300">•</span>
                  <div className="flex items-center gap-1 text-purple-800 font-medium">
                    <Users className="w-3.5 h-3.5" />
                    <span>{worker.repeatCustomers} Repeat Households</span>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 text-xs text-stone-500 pt-1">
                  <MapPin className="w-3.5 h-3.5 text-stone-400" />
                  <span>Servicing: {worker.locations?.join(" • ")}</span>
                </div>
              </div>
            </div>

            {/* Price & Primary CTA Box */}
            <div className="w-full md:w-auto bg-stone-50 border border-stone-200 p-5 rounded-2xl flex md:flex-col items-center md:items-end justify-between gap-4">
              <div className="text-left md:text-right">
                <span className="text-xs text-stone-500 block">Service Rate</span>
                <span className="text-2xl font-extrabold text-stone-900">
                  ₹{worker.ratePerHour}
                  <span className="text-xs font-normal text-stone-500"> / hour</span>
                </span>
                <span className="text-[11px] text-emerald-700 block font-medium">No hidden commission cuts</span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => toggleFavourite(worker.id)}
                  title={fav ? "Remove from favourites" : "Save to favourites"}
                  className={`p-2.5 rounded-xl border transition-all ${
                    fav
                      ? "bg-rose-50 text-rose-600 border-rose-200"
                      : "bg-white text-stone-500 border-stone-200 hover:text-stone-900"
                  }`}
                >
                  <Heart className={`w-4 h-4 ${fav ? "fill-rose-600" : ""}`} />
                </button>

                <button
                  type="button"
                  onClick={() => setShowBookingModal(true)}
                  className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs sm:text-sm rounded-xl shadow-xs transition-colors"
                >
                  Request Booking
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Profile Details */}
      <main className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-1">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Details */}
          <div className="lg:col-span-8 space-y-8">
            {/* Transparent Trust Evidence Breakdown */}
            <div className="bg-white rounded-2xl border border-stone-200 p-6 shadow-xs">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-lg font-bold text-stone-900">Verified Trust Evidence</h2>
                  <p className="text-xs text-stone-500">
                    Click any badge to inspect verification criteria and documented limitations
                  </p>
                </div>
                <span className="text-xs text-emerald-700 font-semibold bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                  Explainable Trust Model
                </span>
              </div>

              <div className="flex flex-wrap gap-2 mb-6">
                {worker.trustBadges?.map((badge) => (
                  <TrustBadge
                    key={badge.id}
                    badgeId={badge.id}
                    customLabel={badge.label}
                    verified={badge.verified}
                    size="md"
                  />
                ))}
              </div>

              {/* Detailed Documents Checklist */}
              <div className="divide-y divide-stone-100 text-xs bg-stone-50/70 p-4 rounded-xl border border-stone-200">
                <div className="py-2.5 flex items-start justify-between">
                  <div>
                    <span className="font-semibold text-stone-900 block">Government Identity Document</span>
                    <span className="text-stone-500">{worker.verificationDetails?.identityDocument}</span>
                  </div>
                  <span className="text-emerald-700 font-medium bg-emerald-100/60 px-2 py-0.5 rounded">
                    Verified {worker.verificationDetails?.identityVerifiedDate}
                  </span>
                </div>

                <div className="py-2.5 flex items-start justify-between">
                  <div>
                    <span className="font-semibold text-stone-900 block">Residential Address Proof</span>
                    <span className="text-stone-500">{worker.verificationDetails?.addressDocument}</span>
                  </div>
                  <span className="text-emerald-700 font-medium bg-emerald-100/60 px-2 py-0.5 rounded">
                    Verified
                  </span>
                </div>

                <div className="py-2.5 flex items-start justify-between">
                  <div>
                    <span className="font-semibold text-stone-900 block">Reference Verification</span>
                    <span className="text-stone-500">{worker.verificationDetails?.referenceCheck}</span>
                  </div>
                  <span className="text-emerald-700 font-medium bg-emerald-100/60 px-2 py-0.5 rounded">
                    Verified
                  </span>
                </div>

                <div className="py-2.5 flex items-start justify-between">
                  <div>
                    <span className="font-semibold text-stone-900 block">Criminal Background Record</span>
                    <span className="text-stone-500">{worker.verificationDetails?.criminalBackgroundCheck}</span>
                  </div>
                  <span
                    className={`font-medium px-2 py-0.5 rounded ${
                      worker.trustBadges?.some((b) => b.id === "bg_check" && b.verified)
                        ? "bg-emerald-100 text-emerald-800"
                        : "bg-amber-100 text-amber-800"
                    }`}
                  >
                    {worker.trustBadges?.some((b) => b.id === "bg_check" && b.verified)
                      ? "Clean Clearance"
                      : "Pending Record"}
                  </span>
                </div>
              </div>
            </div>

            {/* About & Bio */}
            <div className="bg-white rounded-2xl border border-stone-200 p-6 shadow-xs space-y-4">
              <h2 className="text-lg font-bold text-stone-900">About & Skills</h2>
              <p className="text-xs sm:text-sm text-stone-700 leading-relaxed">{worker.bio}</p>

              <div>
                <span className="text-xs font-semibold text-stone-500 uppercase tracking-wider block mb-2">
                  Specialized Skills & Capabilities
                </span>
                <div className="flex flex-wrap gap-2">
                  {worker.additionalSkills?.map((skill, i) => (
                    <span
                      key={i}
                      className="text-xs font-medium bg-stone-100 text-stone-800 px-3 py-1.5 rounded-lg border border-stone-200"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-4 border-t border-stone-100 text-xs">
                <div>
                  <span className="text-stone-400 block">Experience</span>
                  <span className="font-semibold text-stone-900">{worker.experienceYears} Years</span>
                </div>
                <div>
                  <span className="text-stone-400 block">Languages</span>
                  <span className="font-semibold text-stone-900">{worker.languages?.join(", ")}</span>
                </div>
                <div>
                  <span className="text-stone-400 block">Working Availability</span>
                  <span className="font-semibold text-stone-900">{worker.availability}</span>
                </div>
              </div>
            </div>

            {/* Documented Work History */}
            <div className="bg-white rounded-2xl border border-stone-200 p-6 shadow-xs space-y-4">
              <h2 className="text-lg font-bold text-stone-900">Verified Work History</h2>
              <div className="space-y-3">
                {worker.workHistory?.map((item, idx) => (
                  <div key={idx} className="p-4 rounded-xl bg-stone-50 border border-stone-200 text-xs space-y-1">
                    <div className="flex items-center justify-between font-bold text-stone-900">
                      <span>{item.role} • {item.client}</span>
                      <span className="text-stone-500 font-normal">{item.duration}</span>
                    </div>
                    <p className="text-stone-600">{item.note}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Verified Reviews */}
            <div className="bg-white rounded-2xl border border-stone-200 p-6 shadow-xs space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-bold text-stone-900">Customer Reviews ({reviews.length})</h2>
                  <p className="text-xs text-stone-500">Only customers with completed bookings can leave reviews</p>
                </div>
                <div className="flex items-center gap-1.5 text-base font-bold text-stone-900 bg-amber-50 px-3 py-1 rounded-lg border border-amber-200">
                  <Star className="w-4 h-4 fill-amber-400 text-amber-500" />
                  <span>{worker.rating} / 5.0</span>
                </div>
              </div>

              {reviews.length === 0 ? (
                <p className="text-xs text-stone-500 py-4 text-center">No reviews yet for this profile.</p>
              ) : (
                <div className="space-y-4">
                  {reviews.map((rev) => (
                    <div key={rev.id} className="p-4 rounded-xl border border-stone-200 bg-stone-50/50 space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-xs text-stone-900">{rev.customerName}</span>
                          {rev.verifiedBooking && (
                            <span className="text-[10px] bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full font-medium">
                              Verified Booking
                            </span>
                          )}
                        </div>
                        <span className="text-[11px] text-stone-400">{rev.createdAt}</span>
                      </div>

                      <div className="flex items-center gap-1">
                        {[1, 2, 3, 4, 5].map((s) => (
                          <Star
                            key={s}
                            className={`w-3.5 h-3.5 ${
                              s <= rev.rating ? "fill-amber-400 text-amber-500" : "text-stone-300"
                            }`}
                          />
                        ))}
                      </div>

                      <p className="text-xs text-stone-700 leading-relaxed">{rev.comment}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Right Sidebar: Privacy, Contact, Actions */}
          <div className="lg:col-span-4 space-y-6">
            {/* Protected Contact Box */}
            <div className="bg-white rounded-2xl border border-stone-200 p-5 shadow-xs space-y-3">
              <div className="flex items-center gap-2 font-bold text-stone-900 text-sm">
                <Lock className="w-4 h-4 text-emerald-700" />
                <span>Protected Contact & Privacy</span>
              </div>
              <p className="text-xs text-stone-600 leading-relaxed">
                KaamSetu protects both parties by masking telephone numbers until a booking request is accepted. Use in-app messaging for inquiries.
              </p>

              {contactRequested ? (
                <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 text-xs text-emerald-900 font-medium">
                  ✓ Contact Request Sent! Worker has been notified on their portal.
                </div>
              ) : (
                <button
                  type="button"
                  onClick={handleRequestContact}
                  className="w-full py-2 px-3 text-xs font-semibold bg-stone-100 hover:bg-stone-200 text-stone-800 rounded-xl transition-colors"
                >
                  Request Contact Information
                </button>
              )}

              <Link
                to="/customer/messages"
                className="w-full py-2 px-3 text-xs font-semibold border border-stone-200 text-stone-700 rounded-xl hover:bg-stone-50 flex items-center justify-center gap-1.5 transition-colors"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>Open In-App Chat</span>
              </Link>
            </div>

            {/* Quick Safety Summary */}
            <div className="bg-emerald-50 rounded-2xl border border-emerald-200 p-5 text-xs text-emerald-900 space-y-2">
              <div className="flex items-center gap-2 font-bold">
                <ShieldCheck className="w-4 h-4 text-emerald-700" />
                <span>Doorstep OTP Protection</span>
              </div>
              <p className="leading-relaxed">
                Once booked, you will receive a 4-digit code in your booking timeline. Provide it only when the professional arrives at your residence.
              </p>
            </div>

            {/* Report Profile Link */}
            <div className="text-center">
              <button
                type="button"
                onClick={() => setReportModalOpen(true)}
                className="text-xs text-stone-400 hover:text-stone-700 underline"
              >
                Report profile discrepancy
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* Booking Form Modal */}
      {showBookingModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl shadow-xl max-w-lg w-full p-6 border border-stone-200 relative">
            <button
              onClick={() => setShowBookingModal(false)}
              className="absolute top-4 right-4 text-stone-400 hover:text-stone-700 p-1 rounded-lg hover:bg-stone-100"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-xl font-bold text-stone-900 mb-1">Book {worker.name}</h3>
            <p className="text-xs text-stone-500 mb-4">
              {worker.primaryService} • Rate: ₹{worker.ratePerHour}/hr
            </p>

            <form onSubmit={handleBookingSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Preferred Date
                  </label>
                  <input
                    type="date"
                    required
                    value={bookingDate}
                    onChange={(e) => setBookingDate(e.target.value)}
                    className="w-full text-xs p-2.5 border border-stone-300 rounded-xl outline-hidden focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Preferred Time
                  </label>
                  <input
                    type="text"
                    required
                    value={bookingTime}
                    onChange={(e) => setBookingTime(e.target.value)}
                    placeholder="e.g. 09:30 AM"
                    className="w-full text-xs p-2.5 border border-stone-300 rounded-xl outline-hidden focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Expected Duration (Hours)
                </label>
                <select
                  value={durationHours}
                  onChange={(e) => setDurationHours(e.target.value)}
                  className="w-full text-xs p-2.5 border border-stone-300 rounded-xl outline-hidden focus:ring-2 focus:ring-emerald-500 bg-white"
                >
                  <option value={1}>1 Hour (Quick visit)</option>
                  <option value={2}>2 Hours (Standard)</option>
                  <option value={3}>3 Hours (Half day / Deep work)</option>
                  <option value={4}>4 Hours (Half day)</option>
                  <option value={8}>8 Hours (Full day)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Special Tasks or Instructions
                </label>
                <textarea
                  rows={2}
                  value={specialNotes}
                  onChange={(e) => setSpecialNotes(e.target.value)}
                  placeholder="e.g. Please bring clean work shoes; focus on kitchen counters..."
                  className="w-full text-xs p-2.5 border border-stone-300 rounded-xl outline-hidden focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              {/* Price Breakdown */}
              <div className="bg-stone-50 p-3 rounded-xl border border-stone-200 text-xs space-y-1">
                <div className="flex justify-between text-stone-600">
                  <span>Professional service ({durationHours} hrs × ₹{worker.ratePerHour}):</span>
                  <span>₹{durationHours * worker.ratePerHour}</span>
                </div>
                <div className="flex justify-between text-stone-600">
                  <span>Disclosed platform & escrow fee:</span>
                  <span>₹50</span>
                </div>
                <div className="flex justify-between font-bold text-stone-900 pt-1 border-t border-stone-200 text-sm">
                  <span>Total Escrow Amount:</span>
                  <span>₹{durationHours * worker.ratePerHour + 50}</span>
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowBookingModal(false)}
                  className="px-4 py-2 text-xs text-stone-600 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl shadow-xs"
                >
                  Confirm & Request Booking
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Report Profile Modal */}
      {reportModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full space-y-3">
            <h4 className="font-bold text-stone-900 text-base">Report Profile Issue</h4>
            <p className="text-xs text-stone-500">
              Flags profile {worker.name} for operations review (e.g. incorrect skills, suspicious credentials).
            </p>
            <textarea
              rows={2}
              placeholder="Reason for report..."
              className="w-full text-xs p-2.5 border border-stone-300 rounded-xl outline-hidden"
            />
            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setReportModalOpen(false)}
                className="px-3 py-1.5 text-xs text-stone-600"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setReportModalOpen(false);
                  addToast("Report submitted for operations audit.", "info");
                }}
                className="px-4 py-1.5 bg-rose-600 text-white text-xs font-semibold rounded-lg"
              >
                Submit Flag
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default WorkerProfile;
