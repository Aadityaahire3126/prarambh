import React, { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import {
  ShieldCheck,
  Bell,
  Menu,
  X,
  User,
  LogOut,
  ChevronDown,
  Sparkles,
  ArrowRight,
  Briefcase,
  Home as HomeIcon,
  Search as SearchIcon,
  Settings,
  HelpCircle
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { useAppData } from "../../context/AppDataContext";
import { useLanguage } from "../../context/LanguageContext";

export const Header = () => {
  const { user, loginAsRole, logout } = useAuth();
  const { data } = useAppData();
  // const { addToast } = useToast(); // Toast removed
  const navigate = useNavigate();

// Use language context
  const { t, toggleLanguage, lang } = useLanguage();

  // Navigation links using translations
  const navLinks = [
    { to: '/', label: t('navHome'), exact: true },
    { to: '/services', label: t('navServices') },
    { to: '/search', label: t('navFindWorkers') },
    { to: '/how-it-works', label: t('navHowItWorks') },
    { to: '/trust-and-safety', label: t('navTrustSafety') },
    { to: '/help', label: t('navHelp') },
  ];
  const [roleDropdownOpen, setRoleDropdownOpen] = useState(false);
  // Added mobile menu state
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  const notifications = data.notifications || [];
  const unreadCount = notifications.filter((n) => !n.read).length;

  const handleRoleChange = (role) => {
    loginAsRole(role);
    setRoleDropdownOpen(false);
    setMobileMenuOpen(false);
    if (role === "customer") navigate("/customer/dashboard");
    else if (role === "worker") navigate("/worker/dashboard");
    else if (role === "admin") navigate("/admin/dashboard");
  };

  const navLinkClass = ({ isActive }) =>
    `text-sm font-medium transition-colors hover:text-emerald-700 py-1 ${
      isActive ? "text-emerald-700 border-b-2 border-emerald-600 font-semibold" : "text-stone-700"
    }`;

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-stone-200">
      

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="w-10 h-10 rounded-xl bg-emerald-600 flex items-center justify-center text-white shadow-sm group-hover:bg-emerald-700 transition-colors">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xl font-bold tracking-tight text-stone-900 group-hover:text-emerald-800 transition-colors">
                Kaam<span className="text-emerald-700">Setu</span>
              </span>
              <span className="hidden sm:block text-[10px] text-stone-600 tracking-wide font-medium">
                Trusted Help • Safer Homes • Fairer Work
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
                      <nav className="hidden md:flex items-center space-x-6">
              {navLinks.map((link, idx) => (
                <NavLink key={idx} to={link.to} end={link.exact} className={navLinkClass}>
                  {link.label}
                </NavLink>
              ))}
            </nav>

 {/* Right Action & Demo Role Switcher */}
          <div className="flex items-center gap-3">
            {/* Demo Role Switcher Dropdown */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setRoleDropdownOpen(!roleDropdownOpen)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-800 border border-emerald-300 hover:bg-emerald-100 transition-all shadow-2xs"
              >
                <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                <span className="capitalize">{user ? `${user.role}: ${user.name.split(" ")[0]}` : "Demo Role"}</span>
                <ChevronDown className="w-3.5 h-3.5 opacity-60" />
              </button>


              {roleDropdownOpen && (
                <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-xl border border-stone-200 py-2 z-50 animate-in fade-in zoom-in-95 duration-100">
                  <div className="px-3 py-1.5 border-b border-stone-100 text-[11px] font-semibold text-stone-600 uppercase tracking-wider">
                    Switch Demo Perspective
                  </div>

                  <button
                    onClick={() => handleRoleChange("customer")}
                    className={`w-full text-left px-3.5 py-2 text-xs flex items-center justify-between hover:bg-stone-50 ${
                      user?.role === "customer" ? "bg-emerald-50 text-emerald-900 font-semibold" : "text-stone-700"
                    }`}
                  >
                    <div>
                      <div className="font-medium">Customer (Rohit Mehta)</div>
                      <div className="text-[10px] text-stone-500">Post requirements, track bookings</div>
                    </div>
                    {user?.role === "customer" && <span className="w-2 h-2 rounded-full bg-emerald-600" />}
                  </button>

                  <button
                    onClick={() => handleRoleChange("worker")}
                    className={`w-full text-left px-3.5 py-2 text-xs flex items-center justify-between hover:bg-stone-50 ${
                      user?.role === "worker" ? "bg-emerald-50 text-emerald-900 font-semibold" : "text-stone-700"
                    }`}
                  >
                    <div>
                      <div className="font-medium">Worker (Asha Sharma)</div>
                      <div className="text-[10px] text-stone-500">Safety check-in, jobs, earnings</div>
                    </div>
                    {user?.role === "worker" && <span className="w-2 h-2 rounded-full bg-emerald-600" />}
                  </button>

                  <button
                    onClick={() => handleRoleChange("admin")}
                    className={`w-full text-left px-3.5 py-2 text-xs flex items-center justify-between hover:bg-stone-50 ${
                      user?.role === "admin" ? "bg-emerald-50 text-emerald-900 font-semibold" : "text-stone-700"
                    }`}
                  >
                    <div>
                      <div className="font-medium">Admin / Operations Lead</div>
                      <div className="text-[10px] text-stone-500">Verify workers, safety alerts</div>
                    </div>
                    {user?.role === "admin" && <span className="w-2 h-2 rounded-full bg-emerald-600" />}
                  </button>

                  <div className="border-t border-stone-100 mt-1 pt-1">
                    <button
                      onClick={() => {
                        logout();
                        setRoleDropdownOpen(false);
                        navigate("/");
                      }}
                      className="w-full text-left px-3.5 py-1.5 text-xs text-stone-600 hover:bg-stone-50 flex items-center gap-1.5"
                    >
                      <LogOut className="w-3.5 h-3.5" />
                      <span>Guest / Public Mode</span>
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Notifications Bell */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setNotificationsOpen(!notificationsOpen)}
                className="p-2 text-stone-600 hover:text-stone-900 hover:bg-stone-100 rounded-full transition-colors relative"
                title="Demo Notifications"
              >
                <Bell className="w-5 h-5" />
                {unreadCount > 0 && (
                  <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-rose-600 rounded-full border-2 border-white" />
                )}
              </button>
               {notificationsOpen && (
                <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-xl border border-stone-200 py-2 z-50 animate-in fade-in zoom-in-95 duration-100">
                  <div className="px-4 py-2 border-b border-stone-100 flex items-center justify-between">
                    <span className="text-xs font-bold text-stone-900">Notifications ({unreadCount} new)</span>
                    <span className="text-[10px] text-stone-600">Simulated alerts</span>
                  </div>
                  <div className="max-h-72 overflow-y-auto divide-y divide-stone-100">
                    {notifications.length === 0 ? (
                      <p className="p-4 text-xs text-stone-500 text-center">No notifications yet.</p>
                    ) : (
                      notifications.map((n) => (
                        <div key={n.id} className="p-3 hover:bg-stone-50 text-xs">
                          <div className="flex items-center justify-between font-semibold text-stone-900 mb-0.5">
                            <span>{n.title}</span>
                            <span className="text-[10px] text-stone-500 font-normal">{n.createdAt.split(",")[1]}</span>
                          </div>
                          <p className="text-stone-600 text-xs leading-relaxed">{n.message}</p>
                          {n.link && (
                            <Link
                              to={n.link}
                              onClick={() => setNotificationsOpen(false)}
                              className="inline-block mt-1 text-[11px] font-semibold text-emerald-800 hover:underline"
                            >
                              View details →
                            </Link>
                          )}
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Role Dashboard Link or Auth Buttons */}
            {user ? (
              <div className="hidden sm:flex items-center gap-2">
                <Link
                  to={`/${user.role}/dashboard`}
                  className="px-3.5 py-1.5 text-xs font-semibold bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg shadow-xs transition-colors flex items-center gap-1.5"
                >
                  <HomeIcon className="w-3.5 h-3.5" />
                  <span>Dashboard</span>
                </Link>
              </div>
            ) : (
              <div className="hidden sm:flex items-center gap-2">
                <Link
                  to="/login"
                  className="px-3 py-1.5 text-xs font-medium text-stone-700 hover:text-stone-900 hover:bg-stone-100 rounded-lg transition-colors"
                >
                  Log In
                </Link>
                <Link
                  to="/search"
                  className="px-3.5 py-1.5 text-xs font-semibold bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg shadow-xs transition-colors"
                >
                  Find Trusted Help
                </Link>
              </div>
            )}

            {/* Mobile Menu Button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-stone-600 hover:text-stone-900 hover:bg-stone-100 rounded-lg"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-stone-200 px-4 pt-2 pb-6 space-y-3">
          <div className="flex flex-col space-y-2">
            <Link
              to="/"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg text-sm font-medium text-stone-700 hover:bg-stone-100"
            >
              Home
            </Link>
            <Link
              to="/services"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg text-sm font-medium text-stone-700 hover:bg-stone-100"
            >
              All Services
            </Link>
            <Link
              to="/search"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg text-sm font-medium text-stone-700 hover:bg-stone-100"
            >
              Find Workers
            </Link>
            <Link
              to="/how-it-works"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg text-sm font-medium text-stone-700 hover:bg-stone-100"
            >
              How It Works
            </Link>
            <Link
              to="/trust-and-safety"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg text-sm font-medium text-stone-700 hover:bg-stone-100"
            >
              Trust & Safety
            </Link>
            <Link
              to="/help"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg text-sm font-medium text-stone-700 hover:bg-stone-100"
            >
              Help Centre
            </Link>
          </div>

          <div className="pt-3 border-t border-stone-100">
            <span className="text-xs font-semibold text-stone-500 uppercase tracking-wider block mb-2">
              Demo Roles
            </span>
            <div className="grid grid-cols-3 gap-2">
              <button
                onClick={() => handleRoleChange("customer")}
                className="py-2 text-xs font-semibold bg-emerald-50 text-emerald-800 rounded-lg border border-emerald-200"
              >
                Customer
              </button>
              <button
                onClick={() => handleRoleChange("worker")}
                className="py-2 text-xs font-semibold bg-blue-50 text-blue-800 rounded-lg border border-blue-200"
              >
                Worker
              </button>
              <button
                onClick={() => handleRoleChange("admin")}
                className="py-2 text-xs font-semibold bg-purple-50 text-purple-800 rounded-lg border border-purple-200"
              >
                Admin
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;