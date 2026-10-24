// src/pages/worker/Reviews.jsx
import React, { useState } from "react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import { useAppData } from "../../context/AppDataContext";
import { useAuth } from "../../context/AuthContext";
import { useToast } from "../../components/notifications/ToastProvider";
import { Star, Flag, ShieldCheck, CheckCircle2, MessageSquare, AlertCircle } from "lucide-react";

export const WorkerReviews = () => {
  const { data, reportReview } = useAppData();
  const { user } = useAuth();
  const { addToast } = useToast();

  const workerId = user?.id || "w1";
  const worker = (data.workers || []).find((w) => w.id === workerId) || (data.workers || [])[0];
  const reviews = (data.reviews || []).filter((r) => r.workerId === worker.id);

  const [reportModalOpen, setReportModalOpen] = useState(false);
  const [selectedReview, setSelectedReview] = useState(null);
  const [reportReason, setReportReason] = useState("");

  const handleReportSubmit = (e) => {
    e.preventDefault();
    if (!reportReason.trim()) return;
    reportReview(selectedReview.id, reportReason);
    setReportModalOpen(false);
    setReportReason("");
    addToast("Review flagged for administrative review. An operations agent will audit the booking thread.", "info");
  };

  return (
    <DashboardLayout role="worker">
      <div className="space-y-6">
        <div>
          <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider">
            Reputation & Dignity
          </span>
          <h1 className="text-2xl font-extrabold text-stone-900 mt-0.5">
            Customer Reviews & Ratings ({reviews.length})
          </h1>
          <p className="text-xs text-stone-500 mt-1">
            Ratings on KaamSetu are two-sided and protected against arbitrary client retaliation.
          </p>
        </div>

        {/* Reputation Overview Card */}
        <div className="bg-white rounded-3xl border border-stone-200 p-6 sm:p-8 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-5">
            <div className="w-20 h-20 rounded-2xl bg-amber-50 text-amber-500 border border-amber-200 flex flex-col items-center justify-center font-bold">
              <Star className="w-8 h-8 fill-amber-400" />
              <span className="text-lg text-stone-900">{worker.rating}★</span>
            </div>
            <div>
              <h2 className="text-lg font-bold text-stone-900">Overall Rating: {worker.rating} / 5.0</h2>
              <p className="text-xs text-stone-500">Based on {worker.completedBookings} verified completed household visits</p>
              <div className="flex items-center gap-2 text-xs text-emerald-700 font-semibold mt-1">
                <ShieldCheck className="w-4 h-4" />
                <span>Punctuality Rate: {worker.attendanceScore}% on-time arrival</span>
              </div>
            </div>
          </div>

          <div className="p-4 bg-stone-50 rounded-2xl border border-stone-200 text-xs text-stone-600 max-w-sm">
            <strong>Fair Rating Redressal:</strong> If a household writes an abusive or false rating due to refusal to perform unpaid tasks outside scope, you can flag it for mediator audit.
          </div>
        </div>

        {/* Reviews List */}
        <div className="space-y-4">
          {reviews.map((rev) => (
            <div key={rev.id} className="bg-white rounded-3xl border border-stone-200 p-6 shadow-xs space-y-3 text-xs">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-stone-900 text-sm">{rev.customerName}</h3>
                  <span className="text-[11px] text-stone-400">Booking: {rev.bookingId} • {rev.createdAt}</span>
                </div>

                <div className="flex items-center gap-1 bg-amber-50 px-2.5 py-1 rounded-lg border border-amber-200 font-bold text-stone-900">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-500" />
                  <span>{rev.rating}.0★</span>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2 py-2 border-y border-stone-100 text-[11px] text-stone-600">
                <div>Punctuality: <strong>{rev.punctuality || 5}★</strong></div>
                <div>Work Quality: <strong>{rev.quality || 5}★</strong></div>
                <div>Communication: <strong>{rev.communication || 5}★</strong></div>
              </div>

              <p className="text-stone-700 leading-relaxed bg-stone-50 p-3.5 rounded-xl border border-stone-100">
                "{rev.comment}"
              </p>

              <div className="flex items-center justify-between pt-1">
                <span className="text-[11px] text-emerald-700 font-medium">✓ Verified Booking Sign-Off</span>
                {rev.reported ? (
                  <span className="text-amber-800 bg-amber-50 px-2.5 py-0.5 rounded-full font-semibold border border-amber-200 text-[11px]">
                    Flagged for Admin Audit
                  </span>
                ) : (
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedReview(rev);
                      setReportModalOpen(true);
                    }}
                    className="text-stone-400 hover:text-rose-600 text-[11px] flex items-center gap-1"
                  >
                    <Flag className="w-3 h-3" />
                    <span>Report Unfair Review</span>
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Report Review Modal */}
      {reportModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl p-6 max-w-md w-full space-y-4">
            <h3 className="font-bold text-stone-900 text-lg">Report Unfair Review</h3>
            <p className="text-xs text-stone-500">
              Review from <strong>{selectedReview?.customerName}</strong> on booking {selectedReview?.bookingId}.
            </p>

            <textarea
              required
              rows={3}
              value={reportReason}
              onChange={(e) => setReportReason(e.target.value)}
              placeholder="State reason: e.g. Customer demanded extra non-agreed tasks or abusive conduct..."
              className="w-full text-xs p-3 border border-stone-300 rounded-xl outline-hidden focus:ring-2 focus:ring-emerald-500"
            />

            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setReportModalOpen(false)}
                className="px-4 py-2 text-xs text-stone-600"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleReportSubmit}
                className="px-5 py-2 bg-rose-600 text-white font-bold text-xs rounded-xl shadow-xs"
              >
                Submit for Audit
              </button>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
};

export default WorkerReviews;
