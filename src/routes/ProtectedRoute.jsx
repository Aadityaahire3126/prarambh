// src/routes/ProtectedRoute.jsx
import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { ShieldCheck, UserCheck, Briefcase, Sparkles, ArrowRight } from "lucide-react";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";

export const ProtectedRoute = ({ allowedRoles }) => {
  const { user, loginAsRole } = useAuth();
  const navigate = useNavigate();

  const primaryRole = allowedRoles?.[0] || "customer";

  if (!user || (allowedRoles && !allowedRoles.includes(user.role))) {
    return (
      <div className="min-h-screen flex flex-col bg-stone-50">
        <Header />
        <main className="flex-1 max-w-md w-full mx-auto px-4 py-16 flex flex-col justify-center">
          <div className="bg-white rounded-3xl border border-stone-200 p-8 shadow-sm space-y-6 text-center">
            <div className="w-14 h-14 bg-emerald-100 text-emerald-700 rounded-2xl flex items-center justify-center mx-auto font-bold">
              <ShieldCheck className="w-8 h-8" />
            </div>

            <div className="space-y-1">
              <h2 className="text-2xl font-extrabold text-stone-900">
                Demo Portal Access
              </h2>
              <p className="text-xs text-stone-500">
                This section requires <strong className="capitalize">{primaryRole}</strong> demo perspective.
              </p>
            </div>

            <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 text-xs text-emerald-950 text-left space-y-2">
              <div className="flex items-center gap-1.5 font-bold">
                <Sparkles className="w-4 h-4 text-emerald-600" />
                <span>Simulated Role Session</span>
              </div>
              <p className="text-emerald-800 leading-relaxed text-[11px]">
                Click below to instantly initialize a demo {primaryRole} session without passwords:
              </p>
            </div>

            <button
              type="button"
              onClick={() => loginAsRole(primaryRole)}
              className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white font-bold text-xs rounded-xl shadow-xs transition-colors flex items-center justify-center gap-2"
            >
              <span>Continue as {primaryRole.toUpperCase()}</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <div className="pt-2">
              <button
                type="button"
                onClick={() => navigate("/")}
                className="text-xs text-stone-400 hover:text-stone-700 underline"
              >
                Return to Public Homepage
              </button>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return <Outlet />;
};

export default ProtectedRoute;
