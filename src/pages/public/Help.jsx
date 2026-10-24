// src/pages/public/Help.jsx
import React, { useState } from "react";
import Header from "../../components/layout/Header";
import Footer from "../../components/layout/Footer";
import { useToast } from "../../components/notifications/ToastProvider";
import { useAppData } from "../../context/AppDataContext";
import {
  LifeBuoy,
  PhoneCall,
  MessageSquare,
  HelpCircle,
  FileQuestion,
  CheckCircle2,
  AlertTriangle
} from "lucide-react";

export const Help = () => {
  const { addToast } = useToast();
  const { logActivity } = useAppData();

  const [ticketSubject, setTicketSubject] = useState("");
  const [ticketCategory, setTicketCategory] = useState("Booking Inquiry");
  const [ticketDesc, setTicketDesc] = useState("");
  const [ticketSubmittedId, setTicketSubmittedId] = useState(null);

  const handleSubmitTicket = (e) => {
    e.preventDefault();
    const id = `TKT-${Math.floor(1000 + Math.random() * 9000)}`;
    setTicketSubmittedId(id);
    logActivity(`Submitted help desk ticket ${id}: ${ticketSubject}`, "User", "support");
    addToast(`Support ticket ${id} logged. Operations will review.`, "success");
  };

  return (
    <div className="min-h-screen flex flex-col bg-stone-50">
      <Header />

      <div className="bg-white border-b border-stone-200 py-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-3">
          <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider">
            KaamSetu Support Centre
          </span>
          <h1 className="text-3xl font-extrabold text-stone-900">
            How Can We Assist You Today?
          </h1>
          <p className="text-sm text-stone-600 max-w-xl mx-auto">
            Find answers to common questions or submit a simulated support ticket for human mediation.
          </p>
        </div>
      </div>

      <main className="max-w-4xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-10 flex-1 space-y-10">
        {/* Support Channels */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-xs space-y-2">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold">
              <MessageSquare className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-stone-900 text-sm">In-App Chat Support</h3>
            <p className="text-xs text-stone-500">
              Message directly with your assigned professional or customer on active bookings.
            </p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-xs space-y-2">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center font-bold">
              <PhoneCall className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-stone-900 text-sm">Helpline Desk (Demo)</h3>
            <p className="text-xs text-stone-500">
              1800-XXX-KAAM • 9:00 AM - 8:00 PM IST (Simulated telephone desk).
            </p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-xs space-y-2">
            <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-700 flex items-center justify-center font-bold">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-stone-900 text-sm">Real Emergency Dial 112</h3>
            <p className="text-xs text-stone-500">
              For real-world safety or police emergencies, always dial National Emergency 112.
            </p>
          </div>
        </div>

        {/* Submit Ticket Form */}
        <div className="bg-white rounded-2xl border border-stone-200 p-8 shadow-xs">
          <h2 className="text-lg font-bold text-stone-900 mb-1">Submit a Support Ticket</h2>
          <p className="text-xs text-stone-500 mb-6">
            Our operations desk reviews tickets for payment disputes, replacement requests, or safety inquiries.
          </p>

          {!ticketSubmittedId ? (
            <form onSubmit={handleSubmitTicket} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Inquiry Category
                  </label>
                  <select
                    value={ticketCategory}
                    onChange={(e) => setTicketCategory(e.target.value)}
                    className="w-full text-xs p-2.5 border border-stone-300 rounded-xl outline-hidden focus:ring-2 focus:ring-emerald-500 bg-white"
                  >
                    <option value="Booking Inquiry">Booking or Scheduling Issue</option>
                    <option value="Payment / Escrow">Payment or Refund Question</option>
                    <option value="Worker Replacement">Worker Replacement Request</option>
                    <option value="Verification Question">Worker Document Verification</option>
                    <option value="General Feedback">Feedback or Feature Request</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Subject Line
                  </label>
                  <input
                    type="text"
                    required
                    value={ticketSubject}
                    onChange={(e) => setTicketSubject(e.target.value)}
                    placeholder="e.g. Question about booking BK-701 timing"
                    className="w-full text-xs p-2.5 border border-stone-300 rounded-xl outline-hidden focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Description of Issue
                </label>
                <textarea
                  required
                  rows={4}
                  value={ticketDesc}
                  onChange={(e) => setTicketDesc(e.target.value)}
                  placeholder="Provide context so our support coordinators can assist you quickly..."
                  className="w-full text-xs p-2.5 border border-stone-300 rounded-xl outline-hidden focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div className="flex justify-end pt-2">
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl shadow-xs transition-colors"
                >
                  Submit Ticket
                </button>
              </div>
            </form>
          ) : (
            <div className="text-center py-6 space-y-3 bg-stone-50 rounded-xl border border-stone-200">
              <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
              <h3 className="text-base font-bold text-stone-900">Ticket {ticketSubmittedId} Created</h3>
              <p className="text-xs text-stone-600 max-w-sm mx-auto">
                Thank you. In this prototype, your ticket is logged in the system activity journal.
              </p>
              <button
                onClick={() => {
                  setTicketSubmittedId(null);
                  setTicketSubject("");
                  setTicketDesc("");
                }}
                className="text-xs text-emerald-700 font-semibold hover:underline"
              >
                Submit another ticket
              </button>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Help;
