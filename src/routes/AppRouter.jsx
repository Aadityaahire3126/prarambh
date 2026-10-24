// src/routes/AppRouter.jsx
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

// Public pages
import Home from "../pages/public/Home";
import Services from "../pages/public/Services";
import Category from "../pages/public/Category";
import Search from "../pages/public/Search";
import WorkerProfile from "../pages/public/WorkerProfile";
import Login from "../pages/public/Login";
import Signup from "../pages/public/Signup";
import HowItWorks from "../pages/public/HowItWorks";
import TrustSafety from "../pages/public/TrustSafety";
import Help from "../pages/public/Help";

// Customer pages
import CustomerDashboard from "../pages/customer/Dashboard";
import CustomerPostRequirement from "../pages/customer/PostRequirement";
import CustomerMatches from "../pages/customer/Matches";
import CustomerBookings from "../pages/customer/Bookings";
import CustomerBookingDetail from "../pages/customer/BookingDetail";
import CustomerMessages from "../pages/customer/Messages";
import CustomerFavourites from "../pages/customer/Favourites";
import CustomerReviews from "../pages/customer/Reviews";
import CustomerPayments from "../pages/customer/Payments";
import CustomerSupport from "../pages/customer/Support";
import CustomerProfile from "../pages/customer/Profile";

// Worker pages
import WorkerDashboard from "../pages/worker/Dashboard";
import WorkerJobs from "../pages/worker/Jobs";
import WorkerBookings from "../pages/worker/Bookings";
import WorkerBookingDetail from "../pages/worker/BookingDetail";
import WorkerSafetyCheckin from "../pages/worker/SafetyCheckin";
import WorkerVerificationHub from "../pages/worker/VerificationHub";
import WorkerEarnings from "../pages/worker/Earnings";
import WorkerReviews from "../pages/worker/Reviews";
import WorkerSupport from "../pages/worker/Support";
import WorkerSettings from "../pages/worker/Settings";

// Admin pages
import AdminDashboard from "../pages/admin/Dashboard";
import AdminWorkers from "../pages/admin/Workers";
import AdminVerificationQueue from "../pages/admin/VerificationQueue";
import AdminCustomers from "../pages/admin/Customers";
import AdminBookings from "../pages/admin/Bookings";
import AdminSafetyAlerts from "../pages/admin/SafetyAlerts";
import AdminComplaints from "../pages/admin/Complaints";
import AdminCategories from "../pages/admin/Categories";
import AdminTransactions from "../pages/admin/Transactions";
import AdminActivityLog from "../pages/admin/ActivityLog";

import ProtectedRoute from "./ProtectedRoute";

const AppRouter = () => {
  return (
    <Routes>
      {/* Public Pages */}
      <Route path="/" element={<Home />} />
      <Route path="/services" element={<Services />} />
      <Route path="/services/:category" element={<Category />} />
      <Route path="/search" element={<Search />} />
      <Route path="/workers/:id" element={<WorkerProfile />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/how-it-works" element={<HowItWorks />} />
      <Route path="/trust-and-safety" element={<TrustSafety />} />
      <Route path="/help" element={<Help />} />

      {/* Customer Routes */}
      <Route path="/customer" element={<ProtectedRoute allowedRoles={["customer"]} />}>
        <Route path="dashboard" element={<CustomerDashboard />} />
        <Route path="post-requirement" element={<CustomerPostRequirement />} />
        <Route path="matches" element={<CustomerMatches />} />
        <Route path="bookings" element={<CustomerBookings />} />
        <Route path="bookings/:id" element={<CustomerBookingDetail />} />
        <Route path="messages" element={<CustomerMessages />} />
        <Route path="favourites" element={<CustomerFavourites />} />
        <Route path="reviews" element={<CustomerReviews />} />
        <Route path="payments" element={<CustomerPayments />} />
        <Route path="support" element={<CustomerSupport />} />
        <Route path="profile" element={<CustomerProfile />} />
      </Route>

      {/* Worker Routes */}
      <Route path="/worker" element={<ProtectedRoute allowedRoles={["worker"]} />}>
        <Route path="dashboard" element={<WorkerDashboard />} />
        <Route path="profile" element={<WorkerSettings />} />
        <Route path="verification" element={<WorkerVerificationHub />} />
        <Route path="jobs" element={<WorkerJobs />} />
        <Route path="bookings" element={<WorkerBookings />} />
        <Route path="bookings/:id" element={<WorkerBookingDetail />} />
        <Route path="safety-checkin" element={<WorkerSafetyCheckin />} />
        <Route path="earnings" element={<WorkerEarnings />} />
        <Route path="reviews" element={<WorkerReviews />} />
        <Route path="support" element={<WorkerSupport />} />
        <Route path="settings" element={<WorkerSettings />} />
      </Route>

      {/* Admin Routes */}
      <Route path="/admin" element={<ProtectedRoute allowedRoles={["admin"]} />}>
        <Route path="dashboard" element={<AdminDashboard />} />
        <Route path="workers" element={<AdminWorkers />} />
        <Route path="verification" element={<AdminVerificationQueue />} />
        <Route path="customers" element={<AdminCustomers />} />
        <Route path="bookings" element={<AdminBookings />} />
        <Route path="safety-alerts" element={<AdminSafetyAlerts />} />
        <Route path="complaints" element={<AdminComplaints />} />
        <Route path="categories" element={<AdminCategories />} />
        <Route path="transactions" element={<AdminTransactions />} />
        <Route path="activity" element={<AdminActivityLog />} />
      </Route>

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRouter;
