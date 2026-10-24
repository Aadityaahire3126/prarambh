// src/components/layout/AdminLayout.jsx
import React from "react";
import { NavLink, Link } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import { useAppData } from "../../context/AppDataContext";
import {
  LayoutDashboard,
  Users,
  ShieldCheck,
  CalendarCheck,
  AlertTriangle,
  LifeBuoy,
  Layers,
  CreditCard,
  Activity,
  UserCheck
} from "lucide-react";

export const AdminLayout = ({ children }) => {
  const { data } = useAppData();

  const pendingAlerts = (data.safetyAlerts || []).filter((a) => !a.resolved).length;
  const pendingVerifs = (data.workers || []).filter(
    (w) => w.trustBadges?.some((b) => !b.verified)
  ).length;
  const openComplaints = (data.complaints || []).filter((c) => c.status !== "Resolved").length;

  const adminNav = [
    { to: "/admin/dashboard", label: "Executive Overview", icon: LayoutDashboard },
    { to: "/admin/workers", label: "Workers Directory", icon: Users },
    {
      to: "/admin/verification",
      label: "Verification Queue",
      icon: ShieldCheck,
      badge: pendingVerifs,
      badgeColor: "bg-blue-100 text-blue-800",
    },
    { to: "/admin/customers", label: "Customers Directory", icon: UserCheck },
    { to: "/admin/bookings", label: "Master Bookings", icon: CalendarCheck },
    {
      to: "/admin/safety-alerts",
      label: "Safety Alerts Console",
      icon: AlertTriangle,
      badge: pendingAlerts,
      badgeColor: "bg-rose-100 text-rose-800 font-bold",
    },
    {
      to: "/admin/complaints",
      label: "Complaints & Replacement",
      icon: LifeBuoy,
      badge: openComplaints,
      badgeColor: "bg-amber-100 text-amber-800",
    },
    { to: "/admin/categories", label: "Service Categories", icon: Layers },
    { to: "/admin/transactions", label: "Transactions Ledger", icon: CreditCard },
    { to: "/admin/activity", label: "System Activity Log", icon: Activity },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-stone-100">
      <Header />

      <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 flex-1">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Admin Sidebar */}
          <aside className="w-full md:w-64 shrink-0 bg-white rounded-2xl border border-stone-200 p-4 shadow-xs self-start">
            <div className="pb-3 mb-3 border-b border-stone-100">
              <span className="text-[10px] font-bold text-stone-600 uppercase tracking-wider block">
                KaamSetu Operations Desk
              </span>
              <h2 className="text-sm font-bold text-stone-900">Admin Control Panel</h2>
            </div>

            <nav className="space-y-1">
              {adminNav.map((item) => {
                const Icon = item.icon;
                return (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    end={item.to === "/admin/dashboard"}
                    className={({ isActive }) =>
                      `flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
                        isActive
                          ? "bg-stone-900 text-white shadow-xs"
                          : "text-stone-600 hover:text-stone-900 hover:bg-stone-50"
                      }`
                    }
                  >
                    <div className="flex items-center gap-2">
                      <Icon className="w-4 h-4 shrink-0" />
                      <span>{item.label}</span>
                    </div>
                    {item.badge > 0 && (
                      <span className={`text-[10px] px-2 py-0.5 rounded-full ${item.badgeColor}`}>
                        {item.badge}
                      </span>
                    )}
                  </NavLink>
                );
              })}
            </nav>

            <div className="mt-6 pt-4 border-t border-stone-100 text-xs text-stone-500 bg-stone-50 p-3 rounded-xl">
              <div className="font-semibold text-stone-800 mb-1">Demo Mode State</div>
              <p className="text-[11px] leading-relaxed">
                All changes made by admin (status updates, dispute closures, verifications) persist locally in browser storage.
              </p>
            </div>
          </aside>

          {/* Admin Main Body */}
          <main className="flex-1 min-w-0">
            {children}
          </main>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default AdminLayout;
