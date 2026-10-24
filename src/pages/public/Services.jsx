// src/pages/public/Services.jsx
import React from "react";
import { Link } from "react-router-dom";
import Header from "../../components/layout/Header";
import Footer from "../../components/layout/Footer";
import { useAppData } from "../../context/AppDataContext";
import { Sparkles, ArrowRight, ShieldCheck, Clock, CheckCircle } from "lucide-react";

export const Services = () => {
  const { data } = useAppData();
  const categories = data.serviceCategories || [];

  return (
    <div className="min-h-screen flex flex-col bg-stone-50">
      <Header />

      <div className="bg-white border-b border-stone-200 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider">
              Service Directory
            </span>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-stone-900 mt-1">
              All Home Services & Domestic Support
            </h1>
            <p className="text-sm text-stone-600 mt-2 leading-relaxed">
              Explore 12 dedicated domestic service categories. All service professionals on KaamSetu have documented identity reviews, verified attendance, and transparent rate disclosures.
            </p>
          </div>
        </div>
      </div>

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((cat) => (
            <div
              key={cat.id}
              className="bg-white rounded-2xl border border-stone-200 p-6 flex flex-col justify-between hover:border-emerald-300 hover:shadow-md transition-all group"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold">
                    <Sparkles className="w-6 h-6" />
                  </div>
                  {cat.popular && (
                    <span className="text-[10px] font-bold uppercase tracking-wider bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full">
                      High Demand
                    </span>
                  )}
                </div>

                <h3 className="text-xl font-bold text-stone-900 group-hover:text-emerald-700 transition-colors mb-2">
                  {cat.name}
                </h3>
                <p className="text-xs text-stone-600 leading-relaxed mb-4">
                  {cat.tagline}
                </p>

                <div className="space-y-1.5 py-3 border-y border-stone-100 text-xs text-stone-600">
                  <div className="flex items-center justify-between">
                    <span className="text-stone-400">Typical Pricing:</span>
                    <span className="font-semibold text-stone-900">{cat.avgRate}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-stone-400">Available Partners:</span>
                    <span className="font-medium text-emerald-700">{cat.workerCount} verified</span>
                  </div>
                </div>
              </div>

              <div className="pt-5 flex items-center justify-between">
                <Link
                  to={`/services/${cat.id}`}
                  className="text-xs font-semibold text-stone-700 hover:text-stone-900 flex items-center gap-1"
                >
                  <span>Category Details</span>
                </Link>
                <Link
                  to={`/search?category=${encodeURIComponent(cat.name)}`}
                  className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold rounded-lg shadow-2xs transition-colors flex items-center gap-1"
                >
                  <span>Find Workers</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Services;
