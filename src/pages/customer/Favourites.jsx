// src/pages/customer/Favourites.jsx
import React from "react";
import { Link } from "react-router-dom";
import DashboardLayout from "../../components/layout/DashboardLayout";
import WorkerCard from "../../components/cards/WorkerCard";
import { useAppData } from "../../context/AppDataContext";
import { Heart, Search } from "lucide-react";

export const CustomerFavourites = () => {
  const { data } = useAppData();
  const favIds = data.favourites || [];
  const favouriteWorkers = (data.workers || []).filter((w) => favIds.includes(w.id));

  return (
    <DashboardLayout role="customer">
      <div className="space-y-6">
        <div>
          <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider">
            Quick Re-booking
          </span>
          <h1 className="text-2xl font-extrabold text-stone-900 mt-0.5">
            Saved Service Professionals ({favouriteWorkers.length})
          </h1>
          <p className="text-xs text-stone-500 mt-1">
            Keep your trusted domestic help and technical experts handy for quick re-hires.
          </p>
        </div>

        {favouriteWorkers.length === 0 ? (
          <div className="bg-white rounded-3xl border border-stone-200 p-12 text-center text-xs text-stone-500 max-w-md mx-auto space-y-3">
            <Heart className="w-12 h-12 text-stone-300 mx-auto" />
            <h3 className="font-bold text-stone-800 text-sm">No saved professionals yet</h3>
            <p className="leading-relaxed">
              When exploring worker profiles, click the heart icon to bookmark professionals you trust.
            </p>
            <Link
              to="/search"
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-emerald-600 text-white rounded-xl font-semibold"
            >
              <Search className="w-3.5 h-3.5" />
              <span>Browse Professionals</span>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {favouriteWorkers.map((worker) => (
              <WorkerCard key={worker.id} worker={worker} />
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default CustomerFavourites;
