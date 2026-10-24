// src/context/AppDataContext.jsx
import React, { createContext, useContext, useEffect, useState } from "react";
import { mockData } from "../data/mockData";

const AppDataContext = createContext(null);

export const AppDataProvider = ({ children }) => {
  const [data, setData] = useState(() => {
    const persisted = localStorage.getItem("kaamsetu_state_v3");
    if (persisted) {
      try {
        const parsed = JSON.parse(persisted);
        // Ensure all default mock workers are present even if state was persisted
        const existingWorkerIds = new Set((parsed.workers || []).map((w) => w.id));
        const mergedWorkers = [
          ...(parsed.workers || []),
          ...mockData.workers.filter((w) => !existingWorkerIds.has(w.id)),
        ];
        return {
          ...mockData,
          ...parsed,
          workers: mergedWorkers,
        };
      } catch (err) {
        console.error("Failed to parse persisted state, falling back to mockData", err);
      }
    }
    return mockData;
  });

  useEffect(() => {
    try {
      localStorage.setItem("kaamsetu_state_v3", JSON.stringify(data));
    } catch (err) {
      console.error("Failed to save state to localStorage", err);
    }
  }, [data]);


  // Log system activity helper
  const logActivity = (action, actor = "User", category = "general") => {
    const newLog = {
      id: `act-${Date.now()}`,
      timestamp: new Date().toLocaleString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }),
      actor,
      action,
      category,
    };
    setData((prev) => ({
      ...prev,
      activityLogs: [newLog, ...(prev.activityLogs || [])],
    }));
  };

  // Booking management
  const addBooking = (bookingData) => {
    const id = `BK-${Math.floor(100 + Math.random() * 900)}`;
    const newBooking = {
      id,
      requirementId: bookingData.requirementId || `r-${Date.now()}`,
      workerId: bookingData.workerId,
      workerName: bookingData.workerName,
      workerAvatar: bookingData.workerAvatar,
      serviceName: bookingData.serviceName,
      customerId: bookingData.customerId || "c1",
      customerName: bookingData.customerName || "Rohit Mehta",
      customerPhone: bookingData.customerPhone || "+91 98101 XXXXX (Protected)",
      address: bookingData.address || "Flat 402, Block C, Lajpat Nagar IV, New Delhi",
      pinCode: bookingData.pinCode || "110024",
      scheduledDate: bookingData.scheduledDate,
      scheduledTime: bookingData.scheduledTime,
      durationHours: bookingData.durationHours || 2,
      status: "Booking Requested",
      arrivalOtp: String(Math.floor(1000 + Math.random() * 9000)),
      arrivalConfirmed: false,
      jobProgress: "Not Started",
      safetyStatus: "Normal",
      ratePerHour: bookingData.ratePerHour || 300,
      estimatedTotal: (bookingData.ratePerHour || 300) * (bookingData.durationHours || 2),
      platformFee: 50,
      grandTotal: (bookingData.ratePerHour || 300) * (bookingData.durationHours || 2) + 50,
      paymentStatus: "Payment Held in Escrow",
      cancellationPolicy: "Free cancellation up to 2 hours before scheduled time.",
      specialInstructions: bookingData.specialInstructions || "Standard professional service.",
      timeline: [
        { step: "Requirement Posted", time: "Just now", done: true },
        { step: "Booking Requested", time: "Just now", done: true },
        { step: "Worker Accepted", time: "Awaiting Worker response", done: false },
        { step: "Arrival Check-in", time: "Pending", done: false },
        { step: "Work in Progress", time: "Pending", done: false },
        { step: "Completed & Verified", time: "Pending", done: false },
      ],
    };

    setData((prev) => ({
      ...prev,
      bookings: [newBooking, ...prev.bookings],
    }));

    logActivity(`Created booking request ${id} with ${bookingData.workerName}`, bookingData.customerName || "Customer", "booking");
    return newBooking;
  };

  const updateBookingStatus = (bookingId, newStatus, additional = {}) => {
    setData((prev) => {
      const updated = prev.bookings.map((b) => {
        if (b.id === bookingId) {
          const updatedTimeline = b.timeline.map((item) => {
            if (item.step.toLowerCase().includes(newStatus.toLowerCase())) {
              return { ...item, done: true, time: "Updated just now" };
            }
            return item;
          });
          return {
            ...b,
            status: newStatus,
            ...additional,
            timeline: updatedTimeline,
          };
        }
        return b;
      });
      return { ...prev, bookings: updated };
    });
    logActivity(`Updated booking ${bookingId} status to ${newStatus}`, "System", "booking");
  };

  // Arrival OTP confirmation
  const confirmArrivalOtp = (bookingId, enteredOtp) => {
    const booking = data.bookings.find((b) => b.id === bookingId);
    if (!booking) return { success: false, message: "Booking not found" };

    if (booking.arrivalOtp.trim() !== enteredOtp.trim()) {
      return { success: false, message: "Incorrect OTP code. Please check with the customer." };
    }

    const timestamp = new Date().toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" });

    setData((prev) => {
      const updated = prev.bookings.map((b) => {
        if (b.id === bookingId) {
          const newTimeline = b.timeline.map((step) => {
            if (step.step.includes("Arrival")) {
              return { ...step, done: true, time: `${timestamp} (OTP Verified)` };
            }
            if (step.step.includes("Progress")) {
              return { ...step, done: true, time: `${timestamp} (Started)` };
            }
            return step;
          });
          return {
            ...b,
            arrivalConfirmed: true,
            arrivalTimestamp: timestamp,
            status: "Work in Progress",
            jobProgress: "Work Started",
            safetyStatus: "Arrival Verified via OTP",
            timeline: newTimeline,
          };
        }
        return b;
      });
      return { ...prev, bookings: updated };
    });

    logActivity(`Verified arrival OTP for booking ${bookingId}`, booking.workerName, "safety");
    return { success: true, message: "Arrival confirmed! Work in progress." };
  };

  // Safety actions
  const markSafeHeartbeat = (bookingId) => {
    const booking = data.bookings.find((b) => b.id === bookingId);
    const workerName = booking ? booking.workerName : "Worker";
    const timestamp = new Date().toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" });

    setData((prev) => {
      const updatedBookings = prev.bookings.map((b) => {
        if (b.id === bookingId) {
          return { ...b, safetyStatus: `Safe Check-in (${timestamp})` };
        }
        return b;
      });

      const newAlert = {
        id: `ALT-${Math.floor(100 + Math.random() * 900)}`,
        bookingId,
        workerId: booking ? booking.workerId : "w1",
        workerName,
        alertType: "Safety Confirmation (Heartbeat)",
        priority: "Low",
        status: "Acknowledged",
        createdAt: new Date().toLocaleString("en-IN"),
        description: `Worker ${workerName} clicked 'I am Safe' at ${timestamp}.`,
        notes: "Routine check-in logged successfully.",
        resolved: true,
        resolutionNote: "Acknowledged automatically.",
      };

      return {
        ...prev,
        bookings: updatedBookings,
        safetyAlerts: [newAlert, ...prev.safetyAlerts],
      };
    });

    logActivity(`Recorded 'I am Safe' check-in on ${bookingId}`, workerName, "safety");
    return { success: true, timestamp };
  };

  const triggerSafetySos = (bookingId, concernReason = "Worker triggered urgent assistance flag") => {
    const booking = data.bookings.find((b) => b.id === bookingId);
    const workerName = booking ? booking.workerName : "Worker";
    const alertId = `ALT-${Math.floor(100 + Math.random() * 900)}`;

    const newAlert = {
      id: alertId,
      bookingId,
      workerId: booking ? booking.workerId : "w1",
      workerName,
      alertType: "Worker Help Request",
      priority: "Critical",
      status: "Priority Escalation",
      createdAt: new Date().toLocaleString("en-IN"),
      description: `URGENT DEMO SAFETY ALERT: ${concernReason}. Customer: ${booking ? booking.customerName : "N/A"}, Address: ${booking ? booking.address : "N/A"}.`,
      notes: "Operations console alerted immediately for demo triage.",
      resolved: false,
      resolutionNote: null,
    };

    setData((prev) => ({
      ...prev,
      bookings: prev.bookings.map((b) => (b.id === bookingId ? { ...b, safetyStatus: "ALERT: Help Requested" } : b)),
      safetyAlerts: [newAlert, ...prev.safetyAlerts],
    }));

    logActivity(`CRITICAL SAFETY ALERT triggered by ${workerName} on ${bookingId}`, workerName, "safety");
    return alertId;
  };

  const acknowledgeAlert = (alertId) => {
    setData((prev) => ({
      ...prev,
      safetyAlerts: prev.safetyAlerts.map((a) => (a.id === alertId ? { ...a, status: "Investigating" } : a)),
    }));
    logActivity(`Admin acknowledged safety alert ${alertId}`, "Admin Ops", "safety");
  };

  const resolveAlert = (alertId, resolutionNote = "Issue reviewed and resolved by operations team.") => {
    setData((prev) => ({
      ...prev,
      safetyAlerts: prev.safetyAlerts.map((a) =>
        a.id === alertId
          ? {
              ...a,
              status: "Resolved",
              resolved: true,
              resolutionNote,
            }
          : a
      ),
    }));
    logActivity(`Admin resolved safety alert ${alertId}`, "Admin Ops", "safety");
  };

  // Job progress updates
  const updateJobProgress = (bookingId, newProgress) => {
    setData((prev) => ({
      ...prev,
      bookings: prev.bookings.map((b) => (b.id === bookingId ? { ...b, jobProgress: newProgress } : b)),
    }));
    logActivity(`Job progress for ${bookingId} set to '${newProgress}'`, "Worker", "booking");
  };

  const confirmJobCompletion = (bookingId) => {
    setData((prev) => {
      const updated = prev.bookings.map((b) => {
        if (b.id === bookingId) {
          const newTimeline = b.timeline.map((step) =>
            step.step.includes("Completed") ? { ...step, done: true, time: "Completed & Verified by Customer" } : step
          );
          return {
            ...b,
            status: "Completed",
            jobProgress: "Work Completed",
            paymentStatus: "Released to Worker",
            timeline: newTimeline,
          };
        }
        return b;
      });
      return { ...prev, bookings: updated };
    });
    logActivity(`Customer confirmed job completion on ${bookingId}. Payment released.`, "Customer", "booking");
  };

  // Requirements & Smart Matching
  const postRequirement = (reqData) => {
    const id = `r${Date.now()}`;
    const newReq = {
      id,
      ...reqData,
      status: "Matching",
      createdAt: new Date().toLocaleString("en-IN"),
    };

    setData((prev) => ({
      ...prev,
      requirements: [newReq, ...prev.requirements],
    }));

    logActivity(`Posted requirement '${reqData.title}' (${reqData.category})`, "Customer", "requirement");
    return newReq;
  };

  const getWorkerMatches = (requirement) => {
    if (!requirement) return [];
    return data.workers.map((worker) => {
      let score = 50;
      const reasons = [];

      // Category match
      if (
        worker.primaryService.toLowerCase() === (requirement.category || "").toLowerCase() ||
        worker.categorySlug === requirement.categorySlug
      ) {
        score += 30;
        reasons.push("Exact service category match");
      }

      // Locality/City match
      const workerLocs = (worker.locations || []).join(" ").toLowerCase();
      const reqLoc = `${requirement.locality || ""} ${requirement.city || ""}`.toLowerCase();
      if (reqLoc && workerLocs.includes(requirement.city ? requirement.city.toLowerCase() : "")) {
        score += 10;
        reasons.push("Servicing same metropolitan region");
      }

      // Budget check
      const workerRate = worker.ratePerHour;
      if (workerRate >= (requirement.budgetMin || 0) && workerRate <= (requirement.budgetMax || 1000)) {
        score += 10;
        reasons.push(`Budget aligned (₹${workerRate}/hr within ₹${requirement.budgetMin}-₹${requirement.budgetMax})`);
      }

      // High Trust evidence bonus
      if (worker.trustBadges?.some((b) => b.id === "id_checked" && b.verified)) {
        reasons.push("Identity verified with document proof");
      }
      if (worker.attendanceScore >= 95) {
        reasons.push(`Punctuality rate: ${worker.attendanceScore}%`);
      }

      return {
        worker,
        matchScore: Math.min(score, 98),
        matchReasons: reasons,
      };
    }).sort((a, b) => b.matchScore - a.matchScore);
  };

  // Reviews
  const addReview = (reviewData) => {
    const id = `rev-${Date.now()}`;
    const newReview = {
      id,
      ...reviewData,
      createdAt: new Date().toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" }),
      verifiedBooking: true,
    };

    setData((prev) => {
      // Also update worker average rating
      const workerReviews = [...prev.reviews.filter((r) => r.workerId === reviewData.workerId), newReview];
      const avg = (workerReviews.reduce((sum, r) => sum + r.rating, 0) / workerReviews.length).toFixed(1);

      const updatedWorkers = prev.workers.map((w) => {
        if (w.id === reviewData.workerId) {
          return {
            ...w,
            rating: parseFloat(avg),
            completedBookings: (w.completedBookings || 0) + 1,
          };
        }
        return w;
      });

      // Mark booking as reviewed
      const updatedBookings = prev.bookings.map((b) => {
        if (b.id === reviewData.bookingId) {
          return { ...b, hasReview: true, reviewId: id };
        }
        return b;
      });

      return {
        ...prev,
        reviews: [newReview, ...prev.reviews],
        workers: updatedWorkers,
        bookings: updatedBookings,
      };
    });

    logActivity(`Submitted ${reviewData.rating}★ review for ${reviewData.workerName}`, reviewData.customerName || "Customer", "review");
  };

  const reportReview = (reviewId, reason) => {
    setData((prev) => ({
      ...prev,
      reviews: prev.reviews.map((r) => (r.id === reviewId ? { ...r, reported: true, reportReason: reason } : r)),
    }));
    logActivity(`Reported review ${reviewId} for administrative audit: ${reason}`, "Worker", "review");
  };

  // Complaints & Replacement Requests
  const addComplaint = (complaintData) => {
    const id = `CMP-${Math.floor(100 + Math.random() * 900)}`;
    const newComplaint = {
      id,
      ...complaintData,
      createdAt: new Date().toLocaleString("en-IN"),
      status: "Under Investigation",
      adminNotes: "Dispute opened in demo portal. Operations mediator assigned.",
      resolutionStatus: "Pending Assessment",
    };

    setData((prev) => ({
      ...prev,
      complaints: [newComplaint, ...prev.complaints],
      bookings: prev.bookings.map((b) => (b.id === complaintData.bookingId ? { ...b, status: "Disputed" } : b)),
    }));

    logActivity(`Raised complaint ${id} on booking ${complaintData.bookingId}`, complaintData.customerName || "Customer", "complaint");
    return id;
  };

  const updateComplaintStatus = (complaintId, status, adminNotes, resolutionStatus) => {
    setData((prev) => ({
      ...prev,
      complaints: prev.complaints.map((c) =>
        c.id === complaintId
          ? {
              ...c,
              status: status || c.status,
              adminNotes: adminNotes || c.adminNotes,
              resolutionStatus: resolutionStatus || c.resolutionStatus,
            }
          : c
      ),
    }));
    logActivity(`Updated complaint ${complaintId} status to '${status}'`, "Admin Ops", "complaint");
  };

  // Worker Verification Hub (Admin & Worker)
  const updateWorkerVerification = (workerId, field, value) => {
    setData((prev) => {
      const updatedWorkers = prev.workers.map((w) => {
        if (w.id === workerId) {
          const newVerification = { ...w.verificationDetails, [field]: value };
          // Sync trust badges
          const newBadges = (w.trustBadges || []).map((badge) => {
            if (field === "identityDocument" && badge.id === "id_checked") {
              return { ...badge, verified: value.includes("Verified") || value.includes("Complete") };
            }
            if (field === "addressDocument" && badge.id === "address_checked") {
              return { ...badge, verified: value.includes("Verified") || value.includes("Complete") };
            }
            if (field === "criminalBackgroundCheck" && badge.id === "bg_check") {
              const isClean = value.includes("Clean") || value.includes("Verified");
              return {
                ...badge,
                verified: isClean,
                label: isClean ? "Background Check: Completed" : "Background Check: Pending",
              };
            }
            return badge;
          });

          return {
            ...w,
            verificationDetails: newVerification,
            trustBadges: newBadges,
          };
        }
        return w;
      });
      return { ...prev, workers: updatedWorkers };
    });
    logActivity(`Updated verification ${field} for worker ${workerId}`, "Admin Ops", "verification");
  };

  // Messaging
  const sendMessage = (bookingId, senderId, senderName, text) => {
    if (!text.trim()) return;
    const msgId = `msg-${Date.now()}`;
    const timestamp = new Date().toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" });

    const newMsg = {
      id: msgId,
      senderId,
      senderName,
      text,
      timestamp,
    };

    setData((prev) => {
      const existingConv = prev.messages.find((c) => c.bookingId === bookingId);
      if (existingConv) {
        return {
          ...prev,
          messages: prev.messages.map((c) => (c.bookingId === bookingId ? { ...c, thread: [...c.thread, newMsg] } : c)),
        };
      } else {
        const booking = prev.bookings.find((b) => b.id === bookingId);
        const newConv = {
          id: `conv-${Date.now()}`,
          bookingId,
          customerId: booking?.customerId || "c1",
          customerName: booking?.customerName || "Customer",
          workerId: booking?.workerId || "w1",
          workerName: booking?.workerName || "Worker",
          thread: [newMsg],
        };
        return {
          ...prev,
          messages: [newConv, ...prev.messages],
        };
      }
    });
  };

  // Favourites
  const toggleFavourite = (workerId) => {
    setData((prev) => {
      const favs = prev.favourites || [];
      const isFav = favs.includes(workerId);
      const updated = isFav ? favs.filter((id) => id !== workerId) : [...favs, workerId];
      return { ...prev, favourites: updated };
    });
  };

  const isFavourite = (workerId) => (data.favourites || []).includes(workerId);

  // Reset demo
  const resetToDefaults = () => {
    localStorage.removeItem("kaamsetu_state_v2");
    setData(mockData);
  };

  const value = {
    data,
    addBooking,
    updateBookingStatus,
    confirmArrivalOtp,
    markSafeHeartbeat,
    triggerSafetySos,
    acknowledgeAlert,
    resolveAlert,
    updateJobProgress,
    confirmJobCompletion,
    postRequirement,
    getWorkerMatches,
    addReview,
    reportReview,
    addComplaint,
    updateComplaintStatus,
    updateWorkerVerification,
    sendMessage,
    toggleFavourite,
    isFavourite,
    resetToDefaults,
    logActivity,
  };

  return <AppDataContext.Provider value={value}>{children}</AppDataContext.Provider>;
};

export const useAppData = () => {
  const context = useContext(AppDataContext);
  if (!context) {
    throw new Error("useAppData must be used within an AppDataProvider");
  }
  return context;
};
