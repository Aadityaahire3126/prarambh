// src/pages/public/Signup.jsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "../../components/layout/Header";
import Footer from "../../components/layout/Footer";
import { useAuth } from "../../context/AuthContext";
import { useToast } from "../../components/notifications/ToastProvider";
import { ShieldCheck, UserCheck, Briefcase, ArrowRight } from "lucide-react";

export const Signup = () => {
  const { loginCustom } = useAuth();
  const { addToast } = useToast();
  const navigate = useNavigate();

  const [role, setRole] = useState("customer");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("Delhi NCR");
  const [primaryTrade, setPrimaryTrade] = useState("Maid / Housekeeper");

  const handleSignup = (e) => {
    e.preventDefault();
    loginCustom({
      name: fullName || (role === "customer" ? "Demo Customer" : "Demo Professional"),
      email: email || "newuser@kaamsetu.demo",
      role,
    });

    addToast(`Account registered as ${role.toUpperCase()}! Welcome to KaamSetu.`, "success");
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
            <h1 className="text-2xl font-extrabold text-stone-900">Join KaamSetu</h1>
            <p className="text-xs text-stone-500">
              Trusted help for households • Safe & dignified work for professionals
            </p>
          </div>

          <form onSubmit={handleSignup} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                I am registering as:
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setRole("customer")}
                  className={`p-3 rounded-2xl border text-left transition-all ${
                    role === "customer"
                      ? "border-emerald-600 bg-emerald-50 text-emerald-950 font-bold shadow-2xs"
                      : "border-stone-200 bg-stone-50 text-stone-600 hover:bg-stone-100"
                  }`}
                >
                  <UserCheck className="w-5 h-5 text-emerald-700 mb-1" />
                  <div className="text-xs">Household / Customer</div>
                  <div className="text-[10px] text-stone-500 font-normal">Need home services</div>
                </button>

                <button
                  type="button"
                  onClick={() => setRole("worker")}
                  className={`p-3 rounded-2xl border text-left transition-all ${
                    role === "worker"
                      ? "border-emerald-600 bg-emerald-50 text-emerald-950 font-bold shadow-2xs"
                      : "border-stone-200 bg-stone-50 text-stone-600 hover:bg-stone-100"
                  }`}
                >
                  <Briefcase className="w-5 h-5 text-emerald-700 mb-1" />
                  <div className="text-xs">Service Professional</div>
                  <div className="text-[10px] text-stone-500 font-normal">Looking for jobs</div>
                </button>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                Full Name
              </label>
              <input
                type="text"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="e.g. Anjali Sharma"
                className="w-full text-xs p-3 border border-stone-300 rounded-xl outline-hidden focus:ring-2 focus:ring-emerald-500 bg-stone-50 focus:bg-white"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                Email Address or Mobile
              </label>
              <input
                type="text"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="e.g. anjali@example.com"
                className="w-full text-xs p-3 border border-stone-300 rounded-xl outline-hidden focus:ring-2 focus:ring-emerald-500 bg-stone-50 focus:bg-white"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                City / Region
              </label>
              <select
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="w-full text-xs p-3 border border-stone-300 rounded-xl outline-hidden focus:ring-2 focus:ring-emerald-500 bg-stone-50 focus:bg-white"
              >
                <option value="Delhi NCR">Delhi NCR (Delhi, Gurgaon, Noida)</option>
                <option value="Mumbai">Mumbai & Navi Mumbai</option>
                <option value="Pune">Pune & Pimpri</option>
                <option value="Bengaluru">Bengaluru</option>
                <option value="Hyderabad">Hyderabad</option>
                <option value="Ahmedabad">Ahmedabad</option>
                <option value="Jaipur">Jaipur</option>
                <option value="Chandigarh">Chandigarh Tricity</option>
                <option value="Kolkata">Kolkata</option>
              </select>
            </div>

            {role === "worker" && (
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Primary Trade / Service
                </label>
                <select
                  value={primaryTrade}
                  onChange={(e) => setPrimaryTrade(e.target.value)}
                  className="w-full text-xs p-3 border border-stone-300 rounded-xl outline-hidden focus:ring-2 focus:ring-emerald-500 bg-stone-50 focus:bg-white"
                >
                  <option value="Maid / Housekeeper">Maid / Housekeeper</option>
                  <option value="Cook">Cook / Home Chef</option>
                  <option value="Babysitter / Childcare">Babysitter / Childcare</option>
                  <option value="Elderly Care">Elderly Care Attendant</option>
                  <option value="Plumber">Plumber</option>
                  <option value="Electrician">Electrician</option>
                  <option value="Carpenter">Carpenter</option>
                  <option value="Deep Cleaning">Deep Cleaning Specialist</option>
                  <option value="AC Technician">AC Technician</option>
                </select>
              </div>
            )}

            <button
              type="submit"
              className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-xs transition-colors flex items-center justify-center gap-2"
            >
              <span>Create Demo Account</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          <div className="text-center text-xs text-stone-500 pt-2 border-t border-stone-100">
            <span>Already have a profile? </span>
            <Link to="/login" className="text-emerald-700 font-semibold hover:underline">
              Sign In
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Signup;
