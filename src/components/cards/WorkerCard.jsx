// src/components/cards/WorkerCard.jsx
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Star, MapPin, Heart, ArrowRight, ShieldCheck, Clock, Users } from "lucide-react";
import { useAppData } from "../../context/AppDataContext";
import { TrustBadge } from "../badges/TrustBadge";

export const WorkerCard = ({ worker, onBook }) => {
  const navigate = useNavigate();
  const { isFavourite, toggleFavourite } = useAppData();
  const fav = isFavourite(worker.id);

  return (
    <div className="bg-white rounded-2xl border border-stone-200 shadow-sm hover:shadow-md transition-all duration-200 flex flex-col justify-between overflow-hidden group">
      {/* Card Header & Avatar */}
      <div className="p-5">
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex items-center gap-3.5">
            <div className="relative">
              
              {worker.trustBadges?.some((b) => b.id === "id_checked" && b.verified) && (
                <span
                  title="Government Identity Verified"
                  className="absolute -bottom-1 -right-1 bg-emerald-500 text-white p-1 rounded-full shadow-xs"
                >
                  <ShieldCheck className="w-3.5 h-3.5" />
                </span>
              )}
            </div>

            <div>
              <div className="flex items-center gap-2">
                <Link
                  to={`/workers/${worker.id}`}
                  className="font-semibold text-stone-900 text-lg hover:text-emerald-700 transition-colors"
                >
                  {worker.name}
                </Link>
              </div>
              <p className="text-sm font-medium text-emerald-800">{worker.primaryService}</p>
              <p className="text-xs text-stone-500">{worker.experienceYears} yrs experience</p>
            </div>
          </div>

          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              toggleFavourite(worker.id);
            }}
            title={fav ? "Remove from favourites" : "Save to favourites"}
            className={`p-2 rounded-full border transition-all ${
              fav
                ? "bg-rose-50 text-rose-600 border-rose-200"
                : "bg-stone-50 text-stone-400 border-stone-200 hover:text-stone-700"
            }`}
          >
            <Heart className={`w-4 h-4 ${fav ? "fill-rose-600" : ""}`} />
          </button>
        </div>

        {/* Rating and Trust Stats */}
        <div className="flex items-center flex-wrap gap-2 py-2 border-y border-stone-100 text-xs text-stone-700 mb-3 bg-stone-50/60 -mx-5 px-5">
          <div className="flex items-center gap-1 font-semibold text-stone-900">
            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-500" />
            <span>{worker.rating}</span>
            <span className="text-stone-400 font-normal">({worker.completedBookings} jobs)</span>
          </div>
          <span className="text-stone-300">•</span>
          <div className="flex items-center gap-1 text-teal-800 font-medium">
            <Clock className="w-3.5 h-3.5" />
            <span>{worker.attendanceScore}% Punctual</span>
          </div>
          <span className="text-stone-300">•</span>
          <div className="flex items-center gap-1 text-purple-800 font-medium">
            <Users className="w-3.5 h-3.5" />
            <span>{worker.repeatCustomers} Repeats</span>
          </div>
        </div>

        {/* Localities & Bio excerpt */}
        <div className="text-xs text-stone-600 space-y-1.5 mb-3">
          <div className="flex items-center gap-1.5 text-stone-500">
            <MapPin className="w-3.5 h-3.5 text-stone-400 shrink-0" />
            <span className="truncate">{worker.locations?.slice(0, 2).join(", ")}</span>
          </div>
          <p className="line-clamp-2 text-stone-600 text-xs leading-relaxed">
            {worker.bio}
          </p>
        </div>

        {/* Trust Badges Bar */}
        <div className="flex flex-wrap gap-1.5 pt-1">
          {worker.trustBadges?.slice(0, 3).map((badge) => (
            <TrustBadge
              key={badge.id}
              badgeId={badge.id}
              customLabel={badge.label}
              verified={badge.verified}
              size="sm"
            />
          ))}
          {worker.trustBadges?.length > 3 && (
            <span className="text-[11px] text-stone-500 self-center font-medium">
              +{worker.trustBadges.length - 3} more
            </span>
          )}
        </div>
      </div>

      {/* Card Footer: Pricing and Actions */}
      <div className="px-5 py-3.5 bg-stone-50/80 border-t border-stone-100 flex items-center justify-between">
        <div>
          <span className="text-xs text-stone-500 block">Standard Rate</span>
          <span className="text-base font-bold text-stone-900">
            ₹{worker.ratePerHour}
            <span className="text-xs font-normal text-stone-500">/hr</span>
          </span>
        </div>

        <div className="flex items-center gap-2">
          <Link
            to={`/workers/${worker.id}`}
            className="text-xs font-semibold text-stone-700 hover:text-stone-900 px-3 py-2 rounded-lg border border-stone-200 hover:bg-white transition-colors"
          >
            Profile
          </Link>
          <button
            type="button"
            onClick={() => {
              if (onBook) {
                onBook(worker);
              } else {
                navigate(`/workers/${worker.id}#book`);
              }
            }}
            className="text-xs font-semibold bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white px-3.5 py-2 rounded-lg shadow-xs transition-colors flex items-center gap-1"
          >
            <span>Book Now</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default WorkerCard;
