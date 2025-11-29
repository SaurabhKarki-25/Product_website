// src/components/products/FilterStrip.js

import React from 'react';

const categories = [
  { name: "All Shoes", value: "All", icon: "👟" },
  { name: "Casual Sneakers", value: "Sneakers", icon: "🏙️" },
  { name: "Performance Sports", value: "Sports", icon: "🏃" },
  { name: "Premium Drops", value: "premium", icon: "✨" },
];

export default function FilterStrip({ category, setCategory }) {
  return (
    <section className="sticky top-[64px] z-30 w-full bg-[#020d14] border-b border-cyan-500/10 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 py-3 flex overflow-x-auto gap-4 hide-scrollbar">
        {categories.map((cat) => (
          <button
            key={cat.value}
            onClick={() => setCategory(cat.value)}
            className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 whitespace-nowrap
              ${category === cat.value
                ? 'bg-cyan-600 text-black shadow-cyan-500/50 shadow-md'
                : 'bg-[#041625] text-white/70 hover:text-cyan-300 border border-cyan-500/20'
              }`}
          >
            {cat.icon} {cat.name}
          </button>
        ))}
      </div>
    </section>
  );
}