// src/components/layout/DashboardLayout.jsx
import React from "react";
import { NavLink } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import { useAuth } from "../../context/AuthContext";
import {
  LayoutDashboard,
  CalendarCheck,
  MessageSquare,
  Heart,
  PlusCircle,
  CreditCard,
  LifeBuoy,
  User,
  Star,
  ShieldCheck,
  Briefcase,
  AlertTriangle,
  Settings
} from "lucide-react";

export const DashboardLayout = ({ role = "customer", children }) => {
  const { user } = useAuth();

  const customerNav = [
    { to: "/customer/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { to: "/customer/post-requirement", label: "Post Requirement", icon: PlusCircle },
    { to: "/customer/matches", label: "Smart Matches", icon: Star },
    { to: "/customer/bookings", label: "Bookings", icon: CalendarCheck },
    { to: "/customer/messages", label: "Messages", icon: MessageSquare },
    { to: "/customer/favourites", label: "Favourites", icon: Heart },
    { to: "/customer/reviews", label: "Reviews", icon: Star },
    { to: "/customer/payments", label: "Payments", icon: CreditCard },
    { to: "/customer/support", label: "Support", icon: LifeBuoy },
    { to: "/customer/profile", label: "Profile", icon: User },
  ];

  const workerNav = [
    { to: "/worker/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { to: "/worker/jobs", label: "Job Requests", icon: Briefcase },
    { to: "/worker/bookings", label: "My Bookings", icon: CalendarCheck },
    { to: "/worker/safety-checkin", label: "Safety Check-In", icon: ShieldCheck, highlight: true },
    { to: "/worker/earnings", label: "Earnings", icon: CreditCard },
    { to: "/worker/reviews", label: "Reviews", icon: Star },
    { to: "/worker/verification", label: "Verification Hub", icon: ShieldCheck },
    { to: "/worker/support", label: "Worker Support", icon: LifeBuoy },
    { to: "/worker/settings", label: "Settings", icon: Settings },
  ];

  const navItems = role === "worker" ? workerNav : customerNav;

  return (
    <div className="min-h-screen flex flex-col bg-stone-50">
      <Header />

      {/* Role Navigation Bar */}
      <div className="bg-white border-b border-stone-200 sticky top-[68px] z-30 shadow-2xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between overflow-x-auto py-2 no-scrollbar">
            <div className="flex items-center space-x-1 sm:space-x-2">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    end={item.to.endsWith("/dashboard")}
                    className={({ isActive }) =>
                      `flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                        item.highlight && !isActive
                          ? "bg-rose-50 text-rose-800 border border-rose-200 hover:bg-rose-100"
                          : isActive
                          ? "bg-emerald-600 text-white shadow-xs"
                          : "text-stone-600 hover:text-stone-900 hover:bg-stone-100"
                      }`
                    }
                  >
                    <Icon className="w-3.5 h-3.5" />
                    <span>{item.label}</span>
                  </NavLink>
                );
              })}
            </div>

            <div className="hidden lg:flex items-center gap-2 pl-4 text-xs text-stone-500 border-l border-stone-200">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="font-medium text-stone-800 capitalize">{role} Active:</span>
              <span className="truncate max-w-[120px] font-semibold">{user?.name || "Demo User"}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>

      <Footer />
    </div>
  );
};

export default DashboardLayout;
