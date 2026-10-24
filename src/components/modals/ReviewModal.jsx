// src/components/modals/ReviewModal.jsx
import React, { useState } from "react";
import { Star, X } from "lucide-react";
import { useAppData } from "../../context/AppDataContext";
import { useToast } from "../notifications/ToastProvider";

export const ReviewModal = ({ isOpen, onClose, booking }) => {
  const { addReview } = useAppData();
  const { addToast } = useToast();

  const [overallRating, setOverallRating] = useState(5);
  const [punctuality, setPunctuality] = useState(5);
  const [quality, setQuality] = useState(5);
  const [communication, setCommunication] = useState(5);
  const [comment, setComment] = useState("");

  if (!isOpen || !booking) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!comment.trim()) {
      addToast("Please share a brief comment about your experience.", "error");
      return;
    }

    addReview({
      bookingId: booking.id,
      workerId: booking.workerId,
      workerName: booking.workerName,
      customerId: booking.customerId,
      customerName: booking.customerName,
      rating: overallRating,
      punctuality,
      quality,
      communication,
      comment,
    });

    addToast("Review submitted successfully! Thank you for fostering transparent trust.", "success");
    onClose();
  };

  const StarSelector = ({ value, onChange, label }) => (
    <div className="flex items-center justify-between py-1.5">
      <span className="text-xs font-medium text-stone-700">{label}</span>
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => onChange(star)}
            className="p-1 hover:scale-110 transition-transform"
          >
            <Star
              className={`w-5 h-5 ${
                star <= value ? "fill-amber-400 text-amber-500" : "text-stone-300"
              }`}
            />
          </button>
        ))}
      </div>
    </div>
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl shadow-xl max-w-lg w-full p-6 border border-stone-200 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-stone-400 hover:text-stone-700 p-1 rounded-lg hover:bg-stone-100"
        >
          <X className="w-5 h-5" />
        </button>

        <h3 className="text-xl font-bold text-stone-900 mb-1">Rate Service Experience</h3>
        <p className="text-xs text-stone-500 mb-4">
          Booking: <span className="font-mono text-stone-700">{booking.id}</span> • Professional:{" "}
          <strong>{booking.workerName}</strong>
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Overall Rating Hero */}
          <div className="text-center py-3 bg-stone-50 rounded-xl border border-stone-200">
            <span className="text-xs font-semibold uppercase tracking-wider text-stone-500 block mb-1">
              Overall Experience
            </span>
            <div className="flex items-center justify-center gap-1.5 mb-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setOverallRating(star)}
                  className="p-1 hover:scale-110 transition-transform"
                >
                  <Star
                    className={`w-7 h-7 ${
                      star <= overallRating ? "fill-amber-400 text-amber-500" : "text-stone-300"
                    }`}
                  />
                </button>
              ))}
            </div>
            <span className="text-sm font-bold text-stone-800">
              {overallRating === 5
                ? "Exceptional"
                : overallRating === 4
                ? "Good & Satisfied"
                : overallRating === 3
                ? "Average"
                : overallRating === 2
                ? "Disappointed"
                : "Unacceptable"}
            </span>
          </div>

          {/* Granular Sub-criteria */}
          <div className="divide-y divide-stone-100 bg-white p-3 rounded-xl border border-stone-200">
            <StarSelector
              label="Punctuality & Timing"
              value={punctuality}
              onChange={setPunctuality}
            />
            <StarSelector
              label="Workmanship & Quality"
              value={quality}
              onChange={setQuality}
            />
            <StarSelector
              label="Communication & Courtesy"
              value={communication}
              onChange={setCommunication}
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-stone-700 mb-1">
              Written Feedback
            </label>
            <textarea
              required
              rows={3}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Tell other households what went well, cleanliness, hygiene, adherence to rate..."
              className="w-full text-sm p-3 border border-stone-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-hidden"
            />
            <p className="text-[11px] text-stone-400 mt-1">
              Your honest feedback builds our transparent trust history.
            </p>
          </div>

          <div className="flex items-center justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm text-stone-600 hover:text-stone-900 font-medium rounded-xl hover:bg-stone-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 text-sm bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white font-semibold rounded-xl shadow-xs transition-colors"
            >
              Submit Review
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ReviewModal;
