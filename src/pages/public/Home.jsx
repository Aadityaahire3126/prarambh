// src/pages/public/Home.jsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "../../components/layout/Header";
import Footer from "../../components/layout/Footer";
import WorkerCard from "../../components/cards/WorkerCard";
import { TrustBadge } from "../../components/badges/TrustBadge";
import { useAppData } from "../../context/AppDataContext";
import {
  ShieldCheck,
  Search,
  MapPin,
  Calendar,
  Sparkles,
  CheckCircle2,
  ArrowRight,
  HeartHandshake,
  Clock,
  Users,
  Shield,
  KeyRound,
  FileCheck2,
  Scale,
  PhoneCall,
  ChevronRight,
  HelpCircle
} from "lucide-react";

export const Home = () => {
  const navigate = useNavigate();
  const { data } = useAppData();

  const [searchCategory, setSearchCategory] = useState("");
  const [searchLocality, setSearchLocality] = useState("");
  const [searchDate, setSearchDate] = useState("");
  const [howItWorksTab, setHowItWorksTab] = useState("customer");

  const categories = data.serviceCategories || [];
  const featuredWorkers = (data.workers || []).slice(0, 3);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (searchCategory) params.set("category", searchCategory);
    if (searchLocality) params.set("location", searchLocality);
    if (searchDate) params.set("date", searchDate);
    navigate(`/search?${params.toString()}`);
  };

  const faqs = [
    {
      q: "What makes KaamSetu's verification different from a generic 'Verified' badge?",
      a: "Most platforms display a single, vague checkmark that gives false reassurance. KaamSetu breaks down trust evidence transparently into distinct badges: Identity Checked, Address Checked, Attendance Record, Repeat Customers, and Police/Criminal Background Check. We explicitly distinguish document review from criminal background checks and never promise impossible zero-risk.",
    },
    {
      q: "How does the Arrival OTP work for home safety?",
      a: "When a booking is confirmed, a private 4-digit code (such as 4821 in this demo) is shown only on the customer's screen. The visiting professional must enter this code upon reaching the doorstep to officially start the visit. This ensures both parties confirm the right person arrived at the right household.",
    },
    {
      q: "Are phone numbers and home addresses made public?",
      a: "Never. Public search cards and worker profiles never expose personal telephone numbers or private home addresses. Contact is managed via in-app protected chat until an active booking is mutually accepted.",
    },
    {
      q: "What is the Worker 'I am Safe' button and Safety Check-In Centre?",
      a: "Service workers, particularly women housekeepers and caregivers, face workplace safety risks. KaamSetu provides a dedicated Worker Safety Check-in screen where workers can log arrival, send 'I am Safe' check-in pings, and trigger priority operations assistance alerts without penalty.",
    },
    {
      q: "Can I book recurring domestic help as well as one-time repairs?",
      a: "Yes! KaamSetu supports both daily/weekly recurring domestic requirements (such as daily maid service, monthly cooks, and elder care) and on-demand one-time repairs (plumbing leaks, electrician diagnostics, AC cleaning).",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-stone-50">
      <Header />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-emerald-50/60 via-white to-stone-50 pt-12 pb-16 border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-100/80 text-emerald-900 text-xs font-semibold border border-emerald-200">
                <ShieldCheck className="w-4 h-4 text-emerald-700" />
                <span>Explainable Trust • Dignified Work • Fair Pay</span>
              </div>

              <h1 className="text-4xl sm:text-5xl font-extrabold text-stone-900 tracking-tight leading-tight">
                Trusted Help for Every Home.{" "}
                <span className="text-emerald-700 block">Safer for Both Sides.</span>
              </h1>

              <p className="text-base sm:text-lg text-stone-600 leading-relaxed max-w-2xl">
                Find home-service professionals with transparent profiles, clear booking details, and safety features designed for both households and workers.
              </p>

              {/* Service Search Bar */}
              <form
                onSubmit={handleSearchSubmit}
                className="bg-white p-3 sm:p-4 rounded-2xl shadow-lg border border-stone-200 grid grid-cols-1 sm:grid-cols-12 gap-3"
              >
                <div className="sm:col-span-5 relative">
                  <label className="block text-[11px] font-bold text-stone-500 uppercase tracking-wider mb-1">
                    Service Category
                  </label>
                  <div className="flex items-center gap-2 px-3 py-2 border border-stone-200 rounded-xl bg-stone-50 focus-within:bg-white focus-within:border-emerald-500">
                    <Search className="w-4 h-4 text-stone-400 shrink-0" />
                    <select
                      value={searchCategory}
                      onChange={(e) => setSearchCategory(e.target.value)}
                      className="w-full text-xs sm:text-sm bg-transparent outline-hidden text-stone-800"
                    >
                      <option value="">All Service Categories</option>
                      {categories.map((c) => (
                        <option key={c.id} value={c.name}>
                          {c.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="sm:col-span-4 relative">
                  <label className="block text-[11px] font-bold text-stone-500 uppercase tracking-wider mb-1">
                    Locality or PIN
                  </label>
                  <div className="flex items-center gap-2 px-3 py-2 border border-stone-200 rounded-xl bg-stone-50 focus-within:bg-white focus-within:border-emerald-500">
                    <MapPin className="w-4 h-4 text-stone-400 shrink-0" />
                    <input
                      type="text"
                      placeholder="e.g. Lajpat Nagar, Delhi"
                      value={searchLocality}
                      onChange={(e) => setSearchLocality(e.target.value)}
                      className="w-full text-xs sm:text-sm bg-transparent outline-hidden text-stone-800"
                    />
                  </div>
                </div>

                <div className="sm:col-span-3 flex items-end">
                  <button
                    type="submit"
                    className="w-full py-2.5 px-4 bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white font-semibold rounded-xl text-sm shadow-md transition-all flex items-center justify-center gap-1.5"
                  >
                    <span>Search</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </form>

              {/* Quick links & assurances */}
              <div className="flex flex-wrap items-center gap-4 text-xs text-stone-500 pt-1">
                <span className="font-semibold text-stone-700">Popular:</span>
                <Link to="/services/maid" className="hover:text-emerald-700 underline">Housekeeper</Link>
                <Link to="/services/cook" className="hover:text-emerald-700 underline">Cook</Link>
                <Link to="/services/plumber" className="hover:text-emerald-700 underline">Plumber</Link>
                <Link to="/services/electrician" className="hover:text-emerald-700 underline">Electrician</Link>
                <Link to="/services/deep_cleaning" className="hover:text-emerald-700 underline">Deep Cleaning</Link>
              </div>
            </div>

            {/* Right Hero Showcase Composition */}
            <div className="lg:col-span-5 relative">
              <div className="bg-white rounded-3xl p-6 shadow-xl border border-stone-200/80 space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-stone-100">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-emerald-500 animate-ping" />
                    <span className="text-xs font-bold text-stone-900">Explainable Trust in Action</span>
                  </div>
                  <span className="text-[11px] bg-emerald-50 text-emerald-800 font-semibold px-2 py-0.5 rounded-full border border-emerald-200">
                    Live Booking Demo
                  </span>
                </div>

                {/* Worker Spotlight Snapshot */}
                <div className="flex items-center gap-3.5 p-3 rounded-2xl bg-stone-50 border border-stone-200">
                  
                  <div>
                    <h4 className="font-bold text-stone-900 text-sm">Asha Sharma</h4>
                    <p className="text-xs text-emerald-800 font-medium">Maid & Housekeeping • South Delhi</p>
                    <div className="flex items-center gap-2 text-xs text-stone-500 mt-0.5">
                      <span className="font-semibold text-stone-900">4.8★</span>
                      <span>• 84 completed jobs</span>
                      <span>• 98% on-time</span>
                    </div>
                  </div>
                </div>

                {/* Trust Badges Display */}
                <div>
                  <span className="text-[11px] font-bold text-stone-500 uppercase tracking-wider block mb-2">
                    Verified Trust Evidence (Click to Inspect)
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    <TrustBadge badgeId="id_checked" customLabel="ID Checked" verified={true} size="sm" />
                    <TrustBadge badgeId="address_checked" customLabel="Address Verified" verified={true} size="sm" />
                    <TrustBadge badgeId="repeat_customers" customLabel="26 Repeat Clients" verified={true} size="sm" />
                    <TrustBadge badgeId="attendance_record" customLabel="98% Punctual" verified={true} size="sm" />
                    <TrustBadge badgeId="bg_check" customLabel="Background: In Progress" verified={false} size="sm" />
                  </div>
                </div>

                {/* Safety Check-in Simulation Snippet */}
                <div className="p-3 bg-stone-900 text-white rounded-xl text-xs space-y-2">
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="text-emerald-400 font-bold flex items-center gap-1">
                      <KeyRound className="w-3.5 h-3.5" />
                      Doorstep Arrival Code
                    </span>
                    <span className="font-mono bg-stone-800 px-2 py-0.5 rounded text-amber-300 font-bold tracking-widest">
                      4821
                    </span>
                  </div>
                  <p className="text-stone-300 text-[11px] leading-relaxed">
                    Worker presents OTP at door. Arrival timestamp recorded. No fake GPS trackers; genuine verified check-ins.
                  </p>
                </div>

                <div className="flex items-center justify-between pt-1">
                  <Link
                    to="/workers/w1"
                    className="text-xs font-semibold text-emerald-700 hover:text-emerald-800 flex items-center gap-1"
                  >
                    <span>View full sample profile</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                  <Link
                    to="/customer/post-requirement"
                    className="text-xs font-semibold bg-stone-900 text-white px-3 py-1.5 rounded-lg hover:bg-stone-800 transition-colors"
                  >
                    Post Requirement
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Service Categories Section */}
      <section className="py-16 bg-white border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10">
            <div>
              <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider">
                Comprehensive Home Care
              </span>
              <h2 className="text-3xl font-bold text-stone-900 mt-1">
                Explore Verified Service Categories
              </h2>
            </div>
            <Link
              to="/services"
              className="text-sm font-semibold text-emerald-700 hover:text-emerald-800 flex items-center gap-1 mt-2 sm:mt-0"
            >
              <span>View all 12 categories</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {categories.map((cat) => (
              <Link
                key={cat.id}
                to={`/services/${cat.id}`}
                className="p-5 rounded-2xl border border-stone-200 hover:border-emerald-300 hover:shadow-md transition-all duration-200 bg-stone-50/50 hover:bg-white group"
              >
                <div className="w-10 h-10 rounded-xl bg-emerald-100/70 text-emerald-800 flex items-center justify-center font-bold mb-3 group-hover:scale-105 transition-transform">
                  <Sparkles className="w-5 h-5 text-emerald-700" />
                </div>
                <h3 className="font-bold text-stone-900 text-base mb-1 group-hover:text-emerald-800 transition-colors">
                  {cat.name}
                </h3>
                <p className="text-xs text-stone-500 line-clamp-2 mb-3 leading-relaxed">
                  {cat.tagline}
                </p>
                <div className="flex items-center justify-between text-xs pt-2 border-t border-stone-100 text-stone-600">
                  <span className="font-semibold text-stone-800">{cat.avgRate}</span>
                  <span className="text-emerald-700 font-medium">{cat.workerCount} workers</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* The KaamSetu Transparent Trust Model */}
      <section className="py-16 bg-stone-50 border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider">
              No Generic Badges • No Unsupported Claims
            </span>
            <h2 className="text-3xl font-bold text-stone-900 mt-2">
              Explainable Trust, Not False Promises
            </h2>
            <p className="text-sm text-stone-600 mt-3 leading-relaxed">
              Every home services platform stamps a generic "Verified" badge without explaining what was checked. KaamSetu grounds trust in concrete, verifiable evidence tiers.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-xs space-y-3">
              <div className="p-3 bg-blue-50 text-blue-700 rounded-xl w-fit">
                <FileCheck2 className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-stone-900 text-lg">Documented Identity & Address</h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                We review submitted government identification and residential utility proofs. We explicitly clarify that identity check is <strong>not</strong> a criminal background clearance.
              </p>
              <div className="pt-2 text-xs text-blue-700 font-medium">
                Badge: <em>Identity Checked • Address Checked</em>
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-xs space-y-3">
              <div className="p-3 bg-emerald-50 text-emerald-700 rounded-xl w-fit">
                <Clock className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-stone-900 text-lg">Attendance & Repeat Clients</h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                Nothing demonstrates trust better than real retention. We show verified on-time arrival percentages and the exact count of households who hired a worker multiple times.
              </p>
              <div className="pt-2 text-xs text-emerald-700 font-medium">
                Badge: <em>98% Punctual • 26 Repeat Customers</em>
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-xs space-y-3">
              <div className="p-3 bg-purple-50 text-purple-700 rounded-xl w-fit">
                <Scale className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-stone-900 text-lg">Honest Criminal Check Stance</h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                A background check is only displayed if genuine police or court clearance documentation is verified. If not completed, it is clearly labeled "Pending" or "Not Initiated".
              </p>
              <div className="pt-2 text-xs text-purple-700 font-medium">
                Badge: <em>Criminal Record: Only If Validated</em>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works (Interactive Tabs for Customer vs Worker) */}
      <section className="py-16 bg-white border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider">
              Step-by-Step Experience
            </span>
            <h2 className="text-3xl font-bold text-stone-900 mt-1">
              How KaamSetu Works
            </h2>
            <div className="flex items-center justify-center gap-3 mt-4">
              <button
                type="button"
                onClick={() => setHowItWorksTab("customer")}
                className={`px-5 py-2 text-xs font-semibold rounded-full border transition-all ${
                  howItWorksTab === "customer"
                    ? "bg-emerald-600 text-white border-emerald-600 shadow-xs"
                    : "bg-white text-stone-600 border-stone-300 hover:bg-stone-50"
                }`}
              >
                For Households & Customers
              </button>
              <button
                type="button"
                onClick={() => setHowItWorksTab("worker")}
                className={`px-5 py-2 text-xs font-semibold rounded-full border transition-all ${
                  howItWorksTab === "worker"
                    ? "bg-stone-900 text-white border-stone-900 shadow-xs"
                    : "bg-white text-stone-600 border-stone-300 hover:bg-stone-50"
                }`}
              >
                For Service Professionals
              </button>
            </div>
          </div>

          {howItWorksTab === "customer" ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { step: "01", title: "Choose or Post Requirement", desc: "Browse 12 service categories or post custom requirements with date, time, and budget." },
                { step: "02", title: "Smart Suggested Matching", desc: "Our engine suggests verified workers based on skills, locality proximity, and budget." },
                { step: "03", title: "Inspect Explainable Evidence", desc: "Review identity checks, verified references, attendance rates, and repeat customer history." },
                { step: "04", title: "Protected Booking & Escrow", desc: "Request booking. Payment is held in simulated escrow and never released until job completion." },
                { step: "05", title: "Arrival OTP Verification", desc: "Share your private 4-digit doorstep OTP with the arriving worker to confirm visit start." },
                { step: "06", title: "Confirm & Honest Review", desc: "Confirm completion, release payment, and leave multi-criteria ratings on punctuality and quality." },
              ].map((item) => (
                <div key={item.step} className="p-5 rounded-2xl bg-stone-50 border border-stone-200 space-y-2">
                  <span className="text-emerald-700 font-mono font-bold text-lg">{item.step}</span>
                  <h3 className="font-bold text-stone-900 text-base">{item.title}</h3>
                  <p className="text-xs text-stone-600 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { step: "01", title: "Create Demo Profile", desc: "Add your primary service, secondary skills, preferred working hours, and hourly rate." },
                { step: "02", title: "Submit Verification", desc: "Upload simulated ID and address proofs to earn trust badges that attract quality households." },
                { step: "03", title: "Receive Matching Leads", desc: "Get notified of suitable bookings in your neighborhood with transparent rates and duties." },
                { step: "04", title: "Accept & Doorstep Check-In", desc: "Accept jobs, navigate to location, and verify arrival with customer's private OTP code." },
                { step: "05", title: "Safety Hub & 'I'm Safe' Pings", desc: "Use the Safety Check-in screen to send routine safety heartbeats or raise priority assistance." },
                { step: "06", title: "Timely Disbursal & Fair Reviews", desc: "Mark job completed, receive net earnings without hidden cuts, and report unfair reviews." },
              ].map((item) => (
                <div key={item.step} className="p-5 rounded-2xl bg-stone-50 border border-stone-200 space-y-2">
                  <span className="text-stone-900 font-mono font-bold text-lg">{item.step}</span>
                  <h3 className="font-bold text-stone-900 text-base">{item.title}</h3>
                  <p className="text-xs text-stone-600 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Featured Verified Professionals */}
      <section className="py-16 bg-stone-50 border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8">
            <div>
              <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider">
                Top Rated Service Partners
              </span>
              <h2 className="text-3xl font-bold text-stone-900 mt-1">
                Featured Verified Professionals
              </h2>
            </div>
            <Link
              to="/search"
              className="text-sm font-semibold text-emerald-700 hover:text-emerald-800 flex items-center gap-1 mt-2 sm:mt-0"
            >
              <span>Explore all professionals</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredWorkers.map((worker) => (
              <WorkerCard key={worker.id} worker={worker} />
            ))}
          </div>
        </div>
      </section>

      {/* Worker Dignity & Safety Charter Callout */}
      <section className="py-16 bg-emerald-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4">
              <span className="bg-emerald-800 text-emerald-200 text-xs uppercase font-bold tracking-wider px-3 py-1 rounded-full">
                KaamSetu Social Mission
              </span>
              <h2 className="text-3xl font-bold tracking-tight">
                Safer Workplaces & Fair Treatment for Domestic Help
              </h2>
              <p className="text-sm text-emerald-100 leading-relaxed max-w-2xl">
                In India, over 50 million domestic workers operate without contracts, fixed hours, or safety mechanisms. KaamSetu ensures transparent hours, documented scope of work, emergency safety check-ins, and protection against arbitrary wage cuts or harassment.
              </p>
              <div className="flex flex-wrap gap-4 pt-2">
                <div className="flex items-center gap-2 text-xs font-medium text-emerald-200">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Fair Pricing with zero surprise wage cuts</span>
                </div>
                <div className="flex items-center gap-2 text-xs font-medium text-emerald-200">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Dedicated Worker Safety Check-in screen</span>
                </div>
                <div className="flex items-center gap-2 text-xs font-medium text-emerald-200">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Two-way dispute mediation & dignity charter</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-4 flex flex-col gap-3 justify-center">
              <Link
                to="/worker/dashboard"
                className="w-full py-3 px-5 bg-white text-emerald-900 font-bold rounded-xl text-center shadow-lg hover:bg-emerald-50 transition-colors text-sm"
              >
                Enter Worker Demo Portal
              </Link>
              <Link
                to="/trust-and-safety"
                className="w-full py-3 px-5 bg-emerald-800/80 text-white font-medium rounded-xl text-center hover:bg-emerald-800 border border-emerald-700 transition-colors text-sm"
              >
                Read Trust & Safety Policy
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Frequently Asked Questions */}
      <section className="py-16 bg-white border-b border-stone-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider">
              Common Questions
            </span>
            <h2 className="text-3xl font-bold text-stone-900 mt-1">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <details
                key={idx}
                className="group border border-stone-200 rounded-2xl p-5 bg-stone-50/60 open:bg-white transition-all cursor-pointer"
              >
                <summary className="flex items-center justify-between font-bold text-stone-900 text-sm list-none">
                  <span>{faq.q}</span>
                  <ChevronRight className="w-4 h-4 text-stone-400 group-open:rotate-90 transition-transform" />
                </summary>
                <p className="mt-3 text-xs text-stone-600 leading-relaxed border-t border-stone-100 pt-3">
                  {faq.a}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;
