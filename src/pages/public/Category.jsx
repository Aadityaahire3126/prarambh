// src/pages/public/Category.jsx
import React from "react";
import { useParams, Link } from "react-router-dom";
import Header from "../../components/layout/Header";
import Footer from "../../components/layout/Footer";
import WorkerCard from "../../components/cards/WorkerCard";
import { useAppData } from "../../context/AppDataContext";
import { Sparkles, ArrowLeft, PlusCircle, ShieldCheck } from "lucide-react";

export const Category = () => {
  const { category: categorySlug } = useParams();
  const { data } = useAppData();

  const categories = data.serviceCategories || [];
  const currentCategory =
    categories.find(
      (c) =>
        c.id === categorySlug ||
        c.name.toLowerCase().replace(/[^a-z0-9]/g, "-") === categorySlug?.toLowerCase()
    ) || categories[0];

  const matchingWorkers = (data.workers || []).filter(
    (w) =>
      w.categorySlug === currentCategory?.id ||
      w.primaryService.toLowerCase().includes(currentCategory?.name.toLowerCase())
  );

  return (
    <div className="min-h-screen flex flex-col bg-stone-50">
      <Header />

      <div className="bg-white border-b border-stone-200 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            to="/services"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-800 hover:text-emerald-950 mb-4"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to All Categories</span>
          </Link>

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider">
                Home Services Category
              </span>
              <h1 className="text-3xl font-extrabold text-stone-900 mt-1">
                {currentCategory?.name}
              </h1>
              <p className="text-sm text-stone-600 mt-1 max-w-2xl">
                {currentCategory?.tagline}
              </p>
            </div>

            <div className="flex items-center gap-3">
              <Link
                to={`/customer/post-requirement?category=${encodeURIComponent(currentCategory?.name || "")}`}
                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold rounded-xl shadow-xs transition-colors flex items-center gap-1.5"
              >
                <PlusCircle className="w-4 h-4" />
                <span>Post {currentCategory?.name} Requirement</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-bold text-stone-900">
            Verified Professionals in this Category ({matchingWorkers.length})
          </h2>
          <span className="text-xs text-stone-500">
            Showing transparent trust records
          </span>
        </div>

        {matchingWorkers.length === 0 ? (
          <div className="bg-white rounded-2xl border border-stone-200 p-12 text-center max-w-md mx-auto">
            <Sparkles className="w-10 h-10 text-stone-300 mx-auto mb-3" />
            <h3 className="text-base font-bold text-stone-800 mb-1">No profiles in this category yet</h3>
            <p className="text-xs text-stone-500 mb-4">
              We are currently onboarding verified professionals in this sector.
            </p>
            <Link
              to="/services"
              className="text-xs font-semibold text-emerald-700 hover:underline"
            >
              Browse other categories
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {matchingWorkers.map((worker) => (
              <WorkerCard key={worker.id} worker={worker} />
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default Category;
