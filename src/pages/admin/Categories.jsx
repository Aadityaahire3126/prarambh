// src/pages/admin/Categories.jsx
import React from "react";
import AdminLayout from "../../components/layout/AdminLayout";
import { useAppData } from "../../context/AppDataContext";
import { Layers, Sparkles } from "lucide-react";

export const AdminCategories = () => {
  const { data } = useAppData();
  const categories = data.serviceCategories || [];

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <span className="text-xs font-bold text-stone-500 uppercase tracking-wider">
            Marketplace Catalog
          </span>
          <h1 className="text-2xl font-extrabold text-stone-900 mt-0.5">
            Service Categories & Base Rate Benchmarks ({categories.length})
          </h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {categories.map((cat) => (
            <div key={cat.id} className="bg-white p-5 rounded-3xl border border-stone-200 shadow-xs space-y-3 text-xs">
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold">
                  <Sparkles className="w-5 h-5" />
                </div>
                <span className="text-emerald-800 bg-emerald-100 font-semibold px-2 py-0.5 rounded-full text-[10px]">
                  {cat.workerCount} Active Partners
                </span>
              </div>

              <div>
                <h3 className="font-bold text-stone-900 text-sm">{cat.name}</h3>
                <p className="text-stone-500 text-[11px] mt-0.5 leading-relaxed">{cat.tagline}</p>
              </div>

              <div className="pt-2 border-t border-stone-100 flex items-center justify-between">
                <span className="text-stone-400">Benchmark Rate:</span>
                <span className="font-bold text-stone-900">{cat.avgRate}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminCategories;
