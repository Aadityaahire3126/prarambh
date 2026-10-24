// src/pages/public/Login.jsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "../../components/layout/Header";
import Footer from "../../components/layout/Footer";
import { useAuth } from "../../context/AuthContext";
import { useToast } from "../../components/notifications/ToastProvider";
import { ShieldCheck, User, Sparkles, Lock, ArrowRight } from "lucide-react";

export const Login = () => {
  const { loginAsRole, loginCustom } = useAuth();
  const { addToast } = useToast();
  const navigate = useNavigate();

  const [emailOrPhone, setEmailOrPhone] = useState("");
  const [password, setPassword] = useState("");
  const [selectedRole, setSelectedRole] = useState("customer");

  const handleCustomLogin = (e) => {
    e.preventDefault();
    loginCustom({
      email: emailOrPhone || `${selectedRole}@kaamsetu.demo`,
      name: emailOrPhone.split("@")[0] || `Demo ${selectedRole}`,
      role: selectedRole,
    });
    addToast(`Logged in as ${selectedRole.toUpperCase()}`, "success");
    navigate(`/${selectedRole}/dashboard`);
  };

  const handleQuickLogin = (role) => {
    loginAsRole(role);
    addToast(`Logged in as ${role.toUpperCase()}`, "success");
    navigate(`/${role}/dashboard`);
  };

  return (
    <div className="min-h-screen flex flex-col bg-stone-50">
      <Header />

      <main className="flex-1 max-w-md w-full mx-auto px-4 py-12 flex flex-col justify-center">
        <div className="bg-white rounded-3xl border border-stone-200 p-8 shadow-sm space-y-6">
          <div className="text-center space-y-1">
            <div className="w-12 h-12 bg-emerald-100 text-emerald-700 rounded-2xl flex items-center justify-center mx-auto mb-2 font-bold">
              <ShieldCheck className="w-7 h-7" />
            </div>
            <h1 className="text-2xl font-extrabold text-stone-900">Sign In to KaamSetu</h1>
            <p className="text-xs text-stone-500">
              Access your bookings, safety check-in, or operations console
            </p>
          </div>

          {/* Quick Demo Access Bar */}
          <div className="bg-emerald-50/70 border border-emerald-200 p-4 rounded-2xl space-y-2.5">
            <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-900">
              <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
              <span>Instant One-Click Demo Access</span>
            </div>
            <p className="text-[11px] text-emerald-800 leading-relaxed">
              No real passwords needed. Click any persona below to explore the prototype:
            </p>
            <div className="grid grid-cols-3 gap-2 pt-1">
              <button
                type="button"
                onClick={() => handleQuickLogin("customer")}
                className="py-2 px-2 bg-white text-emerald-900 text-xs font-semibold rounded-xl border border-emerald-200 hover:bg-emerald-100 transition-colors text-center shadow-2xs"
              >
                Customer
              </button>
              <button
                type="button"
                onClick={() => handleQuickLogin("worker")}
                className="py-2 px-2 bg-white text-blue-900 text-xs font-semibold rounded-xl border border-blue-200 hover:bg-blue-100 transition-colors text-center shadow-2xs"
              >
                Worker
              </button>
              <button
                type="button"
                onClick={() => handleQuickLogin("admin")}
                className="py-2 px-2 bg-white text-purple-900 text-xs font-semibold rounded-xl border border-purple-200 hover:bg-purple-100 transition-colors text-center shadow-2xs"
              >
                Admin Ops
              </button>
            </div>
          </div>

          {/* Simulated Login Form */}
          <form onSubmit={handleCustomLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                Demo Role
              </label>
              <div className="grid grid-cols-3 gap-2">
                {["customer", "worker", "admin"].map((role) => (
                  <button
                    key={role}
                    type="button"
                    onClick={() => setSelectedRole(role)}
                    className={`py-2 text-xs font-semibold rounded-xl border capitalize transition-all ${
                      selectedRole === role
                        ? "bg-stone-900 text-white border-stone-900"
                        : "bg-stone-50 text-stone-700 border-stone-200 hover:bg-stone-100"
                    }`}
                  >
                    {role}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                Email or Mobile Number
              </label>
              <input
                type="text"
                value={emailOrPhone}
                onChange={(e) => setEmailOrPhone(e.target.value)}
                placeholder="e.g. rohit.mehta@example.com"
                className="w-full text-xs p-3 border border-stone-300 rounded-xl outline-hidden focus:ring-2 focus:ring-emerald-500 bg-stone-50 focus:bg-white"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                Password (Simulated)
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full text-xs p-3 border border-stone-300 rounded-xl outline-hidden focus:ring-2 focus:ring-emerald-500 bg-stone-50 focus:bg-white"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white font-bold text-xs rounded-xl shadow-xs transition-colors flex items-center justify-center gap-2"
            >
              <span>Sign In to {selectedRole.toUpperCase()}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          <div className="text-center text-xs text-stone-500 pt-2 border-t border-stone-100">
            <span>Don't have a profile yet? </span>
            <Link to="/signup" className="text-emerald-700 font-semibold hover:underline">
              Create an Account
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Login;
