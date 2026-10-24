// src/pages/admin/Customers.jsx
import React, { useState } from "react";
import AdminLayout from "../../components/layout/AdminLayout";
import { useAppData } from "../../context/AppDataContext";
import { UserCheck, MapPin, Search } from "lucide-react";

export const AdminCustomers = () => {
  const { data } = useAppData();
  const [search, setSearch] = useState("");

  const customers = data.customers || [];
  const bookings = data.bookings || [];

  const filtered = customers.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.city.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <span className="text-xs font-bold text-stone-500 uppercase tracking-wider">
            Customer Directory
          </span>
          <h1 className="text-2xl font-extrabold text-stone-900 mt-0.5">
            Registered Households ({customers.length})
          </h1>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-stone-200">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by customer name or city..."
            className="w-full text-xs p-2.5 bg-stone-50 border border-stone-200 rounded-xl outline-hidden focus:bg-white focus:ring-2 focus:ring-emerald-500"
          />
        </div>

        <div className="bg-white rounded-3xl border border-stone-200 shadow-xs overflow-hidden">
          <table className="w-full text-left text-xs">
            <thead className="bg-stone-50 text-stone-400 font-semibold border-b border-stone-100">
              <tr>
                <th className="py-3 px-4">Customer</th>
                <th className="py-3 px-4">Locality & City</th>
                <th className="py-3 px-4">Contact Privacy</th>
                <th className="py-3 px-4">Active Bookings</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100 text-stone-700">
              {filtered.map((c) => {
                const customerBookings = bookings.filter((b) => b.customerId === c.id);

                return (
                  <tr key={c.id} className="hover:bg-stone-50/60 transition-colors">
                    <td className="py-3.5 px-4 font-bold text-stone-900">
                      <div>{c.name}</div>
                      <span className="text-[10px] text-stone-400 font-mono">{c.id}</span>
                    </td>
                    <td className="py-3.5 px-4">
                      <div>{c.locality}</div>
                      <span className="text-stone-400 text-[11px]">{c.city}</span>
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="text-stone-500">{c.phone}</span>
                      <span className="text-[10px] text-emerald-700 block font-medium">Masked on Public</span>
                    </td>
                    <td className="py-3.5 px-4 font-bold text-emerald-800">
                      {customerBookings.length} bookings
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminCustomers;
