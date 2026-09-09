import React from 'react';
import { Users, Truck, Database, IndianRupee } from 'lucide-react';

const stats = [
  { label: "Registered Farmers", value: "1.18 Cr+", icon: Users },
  { label: "Grain Procured (MT)", value: "241.56 L", icon: Truck },
  { label: "Total Payment (₹)", value: "69,111 Cr", icon: IndianRupee },
  { label: "Active Centers", value: "4,520", icon: Database },
];

const Statistics = () => {
  return (
    <section className="bg-white gov-border p-6 mt-8">
      <h2 className="text-xl font-bold text-center text-govGreen-900 mb-2">Procurement Statistics (Last 5 Years)</h2>
      <div className="w-16 h-1 bg-govSaffron-500 mx-auto mb-8"></div>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="flex flex-col items-center">
              <div className="p-3 bg-green-50 text-govGreen-700 rounded-full mb-3">
                <Icon size={32} />
              </div>
              <p className="text-2xl md:text-3xl font-extrabold text-gray-800 mb-1">{stat.value}</p>
              <p className="text-sm font-medium text-gray-500 uppercase tracking-wider">{stat.label}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Statistics;
