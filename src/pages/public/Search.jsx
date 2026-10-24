// src/pages/public/Search.jsx
import React, { useState, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import Header from "../../components/layout/Header";
import Footer from "../../components/layout/Footer";
import WorkerCard from "../../components/cards/WorkerCard";
import { useAppData } from "../../context/AppDataContext";
import {
  Search as SearchIcon,
  MapPin,
  Filter,
  X,
  SlidersHorizontal,
  RotateCcw,
  Sparkles
} from "lucide-react";

export const Search = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { data } = useAppData();

  const [query, setQuery] = useState(() => searchParams.get("q") || "");
  const [selectedCategory, setSelectedCategory] = useState(() => searchParams.get("category") || "");
  const [locality, setLocality] = useState(() => searchParams.get("location") || "");
  const [maxRate, setMaxRate] = useState(500);
  const [minRating, setMinRating] = useState(0);
  const [minExperience, setMinExperience] = useState(0);
  const [sortBy, setSortBy] = useState("relevance");

  // Trust filter checkboxes
  const [filterIdChecked, setFilterIdChecked] = useState(false);
  const [filterAddressChecked, setFilterAddressChecked] = useState(false);
  const [filterBgChecked, setFilterBgChecked] = useState(false);
  const [filterRepeatClients, setFilterRepeatClients] = useState(false);

  // Mobile filter drawer state
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  const categories = data.serviceCategories || [];
  const workers = data.workers || [];

  const clearAllFilters = () => {
    setQuery("");
    setSelectedCategory("");
    setLocality("");
    setMaxRate(500);
    setMinRating(0);
    setMinExperience(0);
    setFilterIdChecked(false);
    setFilterAddressChecked(false);
    setFilterBgChecked(false);
    setFilterRepeatClients(false);
    setSortBy("relevance");
    setSearchParams({});
  };

  const filteredWorkers = useMemo(() => {
    return workers
      .filter((w) => {
        // Query match (name, skill, service)
        if (query.trim()) {
          const q = query.toLowerCase();
          const matchName = w.name.toLowerCase().includes(q);
          const matchService = w.primaryService.toLowerCase().includes(q);
          const matchSkills = (w.additionalSkills || []).some((s) => s.toLowerCase().includes(q));
          if (!matchName && !matchService && !matchSkills) return false;
        }

        // Category filter
        if (selectedCategory && w.primaryService.toLowerCase() !== selectedCategory.toLowerCase()) {
          return false;
        }

        // Locality filter
        if (locality.trim()) {
          const loc = locality.toLowerCase();
          const matchesLoc = (w.locations || []).some((l) => l.toLowerCase().includes(loc));
          if (!matchesLoc) return false;
        }

        // Price range
        if (w.ratePerHour > maxRate) return false;

        // Rating
        if (minRating > 0 && w.rating < minRating) return false;

        // Experience
        if (minExperience > 0 && w.experienceYears < minExperience) return false;

        // Trust filters
        if (filterIdChecked && !w.trustBadges?.some((b) => b.id === "id_checked" && b.verified)) {
          return false;
        }
        if (filterAddressChecked && !w.trustBadges?.some((b) => b.id === "address_checked" && b.verified)) {
          return false;
        }
        if (filterBgChecked && !w.trustBadges?.some((b) => b.id === "bg_check" && b.verified)) {
          return false;
        }
        if (filterRepeatClients && (w.repeatCustomers || 0) < 15) {
          return false;
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === "rating") return b.rating - a.rating;
        if (sortBy === "experience") return b.experienceYears - a.experienceYears;
        if (sortBy === "price_asc") return a.ratePerHour - b.ratePerHour;
        if (sortBy === "price_desc") return b.ratePerHour - a.ratePerHour;
        return (b.repeatCustomers || 0) - (a.repeatCustomers || 0);
      });
  }, [
    workers,
    query,
    selectedCategory,
    locality,
    maxRate,
    minRating,
    minExperience,
    filterIdChecked,
    filterAddressChecked,
    filterBgChecked,
    filterRepeatClients,
    sortBy,
  ]);

  const FilterControls = () => (
    <>
      <div className="flex items-center justify-between pb-3 border-b border-stone-100">
        <div className="flex items-center gap-1.5 font-bold text-stone-900 text-sm">
          <Filter className="w-4 h-4 text-emerald-600" />
          <span>Filter Professionals</span>
        </div>
        <button
          onClick={clearAllFilters}
          className="text-xs text-stone-500 hover:text-stone-900 flex items-center gap-1"
        >
          <RotateCcw className="w-3 h-3" />
          <span>Clear</span>
        </button>
      </div>

      {/* Category Filter */}
      <div>
        <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-2">
          Service Category
        </label>
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="w-full text-xs p-2.5 bg-stone-50 border border-stone-200 rounded-xl outline-hidden focus:ring-2 focus:ring-emerald-500"
        >
          <option value="">All Categories ({categories.length})</option>
          {categories.map((c) => (
            <option key={c.id} value={c.name}>
              {c.name}
            </option>
          ))}
        </select>
      </div>

      {/* Trust Status Checkboxes */}
      <div>
        <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-2.5">
          Explainable Trust Level
        </label>
        <div className="space-y-2 text-xs">
          <label className="flex items-center gap-2 cursor-pointer text-stone-700 hover:text-stone-900">
            <input
              type="checkbox"
              checked={filterIdChecked}
              onChange={(e) => setFilterIdChecked(e.target.checked)}
              className="w-4 h-4 text-emerald-600 rounded border-stone-300 focus:ring-emerald-500"
            />
            <span>Govt Identity Document Checked</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer text-stone-700 hover:text-stone-900">
            <input
              type="checkbox"
              checked={filterAddressChecked}
              onChange={(e) => setFilterAddressChecked(e.target.checked)}
              className="w-4 h-4 text-emerald-600 rounded border-stone-300 focus:ring-emerald-500"
            />
            <span>Residential Address Verified</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer text-stone-700 hover:text-stone-900">
            <input
              type="checkbox"
              checked={filterBgChecked}
              onChange={(e) => setFilterBgChecked(e.target.checked)}
              className="w-4 h-4 text-emerald-600 rounded border-stone-300 focus:ring-emerald-500"
            />
            <span>Background Record on File</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer text-stone-700 hover:text-stone-900">
            <input
              type="checkbox"
              checked={filterRepeatClients}
              onChange={(e) => setFilterRepeatClients(e.target.checked)}
              className="w-4 h-4 text-emerald-600 rounded border-stone-300 focus:ring-emerald-500"
            />
            <span>15+ Repeat Household Clients</span>
          </label>
        </div>
      </div>

      {/* Price Range Slider */}
      <div>
        <div className="flex items-center justify-between text-xs font-bold text-stone-700 mb-1">
          <span>Maximum Rate:</span>
          <span className="text-emerald-700 font-extrabold text-sm">₹{maxRate}/hr</span>
        </div>
        <input
          type="range"
          min="200"
          max="500"
          step="20"
          value={maxRate}
          onChange={(e) => setMaxRate(Number(e.target.value))}
          className="w-full accent-emerald-600"
        />
        <div className="flex justify-between text-[10px] text-stone-400 mt-0.5">
          <span>₹200/hr</span>
          <span>₹500/hr</span>
        </div>
      </div>

      {/* Minimum Rating */}
      <div>
        <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-2">
          Minimum Rating
        </label>
        <div className="grid grid-cols-4 gap-1.5">
          {[0, 4.0, 4.5, 4.8].map((rating) => (
            <button
              key={rating}
              type="button"
              onClick={() => setMinRating(rating)}
              className={`py-1.5 text-xs font-medium rounded-lg border text-center transition-all ${
                minRating === rating
                  ? "bg-stone-900 text-white font-semibold"
                  : "bg-white text-stone-700 border-stone-200 hover:bg-stone-50"
              }`}
            >
              {rating === 0 ? "Any" : `${rating}★`}
            </button>
          ))}
        </div>
      </div>

      {/* Minimum Experience */}
      <div>
        <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-2">
          Experience
        </label>
        <div className="grid grid-cols-4 gap-1.5">
          {[0, 3, 5, 8].map((exp) => (
            <button
              key={exp}
              type="button"
              onClick={() => setMinExperience(exp)}
              className={`py-1.5 text-xs font-medium rounded-lg border text-center transition-all ${
                minExperience === exp
                  ? "bg-stone-900 text-white font-semibold"
                  : "bg-white text-stone-700 border-stone-200 hover:bg-stone-50"
              }`}
            >
              {exp === 0 ? "Any" : `${exp}+ yrs`}
            </button>
          ))}
        </div>
      </div>
    </>
  );

  return (
    <div className="min-h-screen flex flex-col bg-stone-50">
      <Header />

      {/* Top Search Bar */}
      <div className="bg-white border-b border-stone-200 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
            <div className="md:col-span-5 relative">
              <SearchIcon className="w-4 h-4 text-stone-400 absolute left-3 top-3.5" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search by worker name, skill, or service..."
                className="w-full text-sm pl-9 pr-4 py-2.5 bg-stone-50 border border-stone-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-emerald-500 outline-hidden"
              />
            </div>

            <div className="md:col-span-4 relative">
              <MapPin className="w-4 h-4 text-stone-400 absolute left-3 top-3.5" />
              <input
                type="text"
                value={locality}
                onChange={(e) => setLocality(e.target.value)}
                placeholder="Locality or city (e.g. Delhi, Pune)..."
                className="w-full text-sm pl-9 pr-4 py-2.5 bg-stone-50 border border-stone-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-emerald-500 outline-hidden"
              />
            </div>

            <div className="md:col-span-3 flex items-center gap-2">
              <button
                type="button"
                onClick={() => setMobileFilterOpen(true)}
                className="lg:hidden flex-1 py-2.5 px-3 bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-semibold rounded-xl flex items-center justify-center gap-1.5"
              >
                <SlidersHorizontal className="w-4 h-4" />
                <span>Filters</span>
              </button>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full py-2.5 px-3 bg-stone-50 border border-stone-200 rounded-xl text-xs font-medium text-stone-800 focus:bg-white outline-hidden"
              >
                <option value="relevance">Sort: Most Trusted / Repeat Clients</option>
                <option value="rating">Sort: Highest Customer Rating</option>
                <option value="experience">Sort: Most Experienced</option>
                <option value="price_asc">Sort: Price (Low to High)</option>
                <option value="price_desc">Sort: Price (High to Low)</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Layout with Sidebar Filters */}
      <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-1">
        <div className="flex gap-8">
          {/* Desktop Filter Panel */}
          <aside className="hidden lg:block w-72 shrink-0 bg-white rounded-2xl border border-stone-200 p-5 shadow-xs space-y-6 self-start">
            <FilterControls />
          </aside>

          {/* Results Grid */}
          <main className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-semibold text-stone-800">
                Found <strong>{filteredWorkers.length}</strong> service professionals
              </span>

              {(selectedCategory || locality || query || filterIdChecked || filterAddressChecked || filterBgChecked) && (
                <button
                  onClick={clearAllFilters}
                  className="text-xs text-rose-600 hover:underline font-medium"
                >
                  Reset all filters
                </button>
              )}
            </div>

            {filteredWorkers.length === 0 ? (
              <div className="bg-white rounded-2xl border border-stone-200 p-12 text-center">
                <Sparkles className="w-12 h-12 text-stone-300 mx-auto mb-3" />
                <h3 className="text-base font-bold text-stone-900 mb-1">
                  No service workers matched your criteria
                </h3>
                <p className="text-xs text-stone-500 max-w-sm mx-auto mb-4">
                  Try broadening your budget range, resetting trust filters, or changing locality.
                </p>
                <button
                  type="button"
                  onClick={clearAllFilters}
                  className="px-4 py-2 bg-emerald-600 text-white text-xs font-semibold rounded-xl hover:bg-emerald-700 transition-colors"
                >
                  Clear Filters & Show All
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredWorkers.map((worker) => (
                  <WorkerCard key={worker.id} worker={worker} />
                ))}
              </div>
            )}
          </main>
        </div>
      </div>

      {/* Mobile Filter Drawer */}
      {mobileFilterOpen && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/50 backdrop-blur-xs">
          <div className="bg-white w-full sm:max-w-md max-h-[85vh] overflow-y-auto rounded-t-3xl sm:rounded-3xl p-6 space-y-6 shadow-2xl animate-in slide-in-from-bottom duration-200">
            <div className="flex items-center justify-between pb-2 border-b border-stone-100">
              <span className="font-bold text-stone-900 text-base">Filter Search</span>
              <button
                type="button"
                onClick={() => setMobileFilterOpen(false)}
                className="p-1 text-stone-400 hover:text-stone-700 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <FilterControls />

            <button
              type="button"
              onClick={() => setMobileFilterOpen(false)}
              className="w-full py-3 bg-emerald-600 text-white font-bold text-xs rounded-xl shadow-xs"
            >
              Apply Filters ({filteredWorkers.length} results)
            </button>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default Search;
