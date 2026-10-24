// src/components/layout/Footer.jsx
import React from "react";
import { Link } from "react-router-dom";
import { ShieldCheck, Heart, AlertCircle, FileCheck2, Scale } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="bg-stone-900 text-stone-300 pt-12 pb-8 border-t border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-10 border-b border-stone-800">
          {/* Brand & Vision */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-xl bg-emerald-500 flex items-center justify-center text-white font-bold">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <span className="text-xl font-bold tracking-tight text-white">
                Kaam<span className="text-emerald-400">Setu</span>
              </span>
            </Link>
            <p className="text-xs text-stone-400 leading-relaxed">
              KaamSetu bridges Indian households with skilled domestic and technical service professionals through transparent, explainable trust verification and safer workplace workflows.
            </p>
            <div className="flex items-center gap-2 text-xs text-emerald-400 font-medium">
              <Scale className="w-4 h-4" />
              <span>Dedicated to Fair Pay & Dignified Work</span>
            </div>
          </div>

          {/* Core Services */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-3">
              Home Services
            </h4>
            <ul className="space-y-2 text-xs">
              <li><Link to="/services/maid" className="hover:text-emerald-400 transition-colors">Maid & Housekeeping</Link></li>
              <li><Link to="/services/cook" className="hover:text-emerald-400 transition-colors">Home Cooks & Chefs</Link></li>
              <li><Link to="/services/babysitter" className="hover:text-emerald-400 transition-colors">Babysitter & Childcare</Link></li>
              <li><Link to="/services/elderly_care" className="hover:text-emerald-400 transition-colors">Elderly & Senior Care</Link></li>
              <li><Link to="/services/plumber" className="hover:text-emerald-400 transition-colors">Plumbers & Sanitary</Link></li>
              <li><Link to="/services/electrician" className="hover:text-emerald-400 transition-colors">Electricians & Wiring</Link></li>
              <li><Link to="/services/deep_cleaning" className="hover:text-emerald-400 transition-colors">Deep Kitchen & Bathroom Cleaning</Link></li>
            </ul>
          </div>

          {/* Trust & Operations */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-3">
              Trust & Transparency
            </h4>
            <ul className="space-y-2 text-xs">
              <li><Link to="/trust-and-safety" className="hover:text-emerald-400 transition-colors">Evidence-Based Trust Badges</Link></li>
              <li><Link to="/how-it-works" className="hover:text-emerald-400 transition-colors">Arrival OTP & Safety Check-In</Link></li>
              <li><Link to="/trust-and-safety#criminal-checks" className="hover:text-emerald-400 transition-colors">ID Check vs. Criminal Record Policy</Link></li>
              <li><Link to="/trust-and-safety#privacy" className="hover:text-emerald-400 transition-colors">Masked Calling & Privacy Principles</Link></li>
              <li><Link to="/help" className="hover:text-emerald-400 transition-colors">Dispute Mediation & Replacement</Link></li>
              <li><Link to="/help" className="hover:text-emerald-400 transition-colors">Worker Grievance Redressal</Link></li>
            </ul>
          </div>

          {/* Portals & Demo Switch */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-3">
              Demo Access Portals
            </h4>
            <ul className="space-y-2 text-xs">
              <li><Link to="/customer/dashboard" className="hover:text-emerald-400 transition-colors">Customer Portal</Link></li>
              <li><Link to="/worker/dashboard" className="hover:text-emerald-400 transition-colors">Worker Portal</Link></li>
              <li><Link to="/worker/safety-checkin" className="hover:text-emerald-400 transition-colors">Safety Check-In Centre</Link></li>
              <li><Link to="/admin/dashboard" className="hover:text-emerald-400 transition-colors">Admin Operations Console</Link></li>
              <li><Link to="/admin/safety-alerts" className="hover:text-emerald-400 transition-colors">Safety Alerts Feed</Link></li>
            </ul>
          </div>
        </div>

        {/* Prototype Transparency Notice */}
        <div className="mt-8 pt-6 border-t border-stone-800/80 bg-stone-950/60 p-4 rounded-xl text-[11px] text-stone-400 space-y-2">
          <div className="flex items-center gap-2 text-amber-400 font-semibold">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>Demonstration Prototype Notice & Ethical Standards</span>
          </div>
          <p className="leading-relaxed">
            KaamSetu is a functional frontend prototype. All displayed worker profiles, customer records, verification documents, arrival OTPs (e.g. 4821), reviews, and payments are fictional demonstration data. We do not promise zero risk, guaranteed safety, or that unforeseen incidents can never happen. Identity checks verify documents submitted in the demo and are strictly distinguished from official police criminal background checks. No live emergency calls (112) or actual cellular SMS messages are dispatched from this browser environment.
          </p>
        </div>

        <div className="mt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-500 gap-2">
          <p>© {new Date().getFullYear()} KaamSetu Technologies (India). Prototype Edition.</p>
          <div className="flex items-center gap-4">
            <Link to="/trust-and-safety" className="hover:underline">Privacy Policy</Link>
            <Link to="/how-it-works" className="hover:underline">Terms of Service</Link>
            <Link to="/help" className="hover:underline">Worker Charter</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
