// src/pages/customer/Reviews.jsx
import React, { useState } from "react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import ReviewModal from "../../components/modals/ReviewModal";
import { useAppData } from "../../context/AppDataContext";
import { useAuth } from "../../context/AuthContext";
import { Star, CheckCircle2, MessageSquare, ArrowRight } from "lucide-react";

export const CustomerReviews = () => {
  const { data } = useAppData();
  const { user } = useAuth();

  const customerId = user?.id || "c1";
  const myReviews = (data.reviews || []).filter((r) => r.customerId === customerId);

  const completedWithoutReview = (data.bookings || []).filter(
    (b) => (b.customerId === customerId || b.customerName?.includes("Rohit")) &&
           b.status === "Completed" &&
           !b.hasReview
  );

  const [activeBookingForReview, setActiveBookingForReview] = useState(null);

  return (
    <DashboardLayout role="customer">
      <div className="space-y-6">
        <div>
          <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider">
            Reputation & Feedback
          </span>
          <h1 className="text-2xl font-extrabold text-stone-900 mt-0.5">
            My Ratings & Service Reviews
          </h1>
          <p className="text-xs text-stone-500 mt-1">
            Ratings on KaamSetu are verifiable and based only on verified completed visits.
          </p>
        </div>

        {/* Pending Reviews Section */}
        {completedWithoutReview.length > 0 && (
          <div className="bg-amber-50 rounded-2xl border border-amber-200 p-5 space-y-3">
            <h2 className="text-sm font-bold text-amber-900 flex items-center gap-2">
              <Star className="w-4 h-4 text-amber-600 fill-amber-500" />
              <span>Pending Reviews ({completedWithoutReview.length})</span>
            </h2>
            <p className="text-xs text-amber-800">
              Your feedback directly impacts a worker's trust score and visibility. Please share your experience:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              {completedWithoutReview.map((b) => (
                <div
                  key={b.id}
                  className="bg-white p-4 rounded-xl border border-amber-200 flex items-center justify-between text-xs"
                >
                  <div>
                    <span className="font-bold text-stone-900 block">{b.serviceName}</span>
                    <span className="text-stone-500">{b.workerName} • {b.scheduledDate}</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setActiveBookingForReview(b)}
                    className="px-3 py-1.5 bg-amber-500 hover:bg-amber-600 text-white font-semibold rounded-lg shadow-2xs"
                  >
                    Rate Now
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Submitted Reviews List */}
        <div className="space-y-4">
          <h2 className="text-base font-bold text-stone-900">
            Reviews Submitted by You ({myReviews.length})
          </h2>

          {myReviews.length === 0 ? (
            <div className="bg-white rounded-2xl border border-stone-200 p-8 text-center text-xs text-stone-500">
              No reviews submitted yet. Complete a booking to rate and review professionals.
            </div>
          ) : (
            <div className="space-y-4">
              {myReviews.map((rev) => (
                <div key={rev.id} className="bg-white rounded-2xl border border-stone-200 p-5 shadow-xs space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-bold text-stone-900 text-sm">{rev.workerName}</h3>
                      <span className="text-[11px] text-stone-400">Booking: {rev.bookingId} • {rev.createdAt}</span>
                    </div>

                    <div className="flex items-center gap-1 bg-amber-50 px-2.5 py-1 rounded-lg border border-amber-200 text-xs font-bold text-stone-900">
                      <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-500" />
                      <span>{rev.rating}.0★</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-2 py-2 border-y border-stone-100 text-[11px] text-stone-600">
                    <div>Punctuality: <strong>{rev.punctuality || 5}★</strong></div>
                    <div>Workmanship: <strong>{rev.quality || 5}★</strong></div>
                    <div>Communication: <strong>{rev.communication || 5}★</strong></div>
                  </div>

                  <p className="text-xs text-stone-700 leading-relaxed bg-stone-50 p-3 rounded-xl border border-stone-100">
                    "{rev.comment}"
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <ReviewModal
        isOpen={Boolean(activeBookingForReview)}
        onClose={() => setActiveBookingForReview(null)}
        booking={activeBookingForReview}
      />
    </DashboardLayout>
  );
};

export default CustomerReviews;
