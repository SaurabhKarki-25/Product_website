// src/components/products/SectionRow.js

import React from 'react';
import ProductCard from './ProductCard';

export default function SectionRow({ id, title, subtitle, items, addToCart }) {
  if (!items.length) return null;

  return (
    <section id={id} className="max-w-7xl mx-auto mt-8 sm:mt-10 px-4">
      <div className="flex justify-between items-end mb-3">
        <div>
          <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-cyan-300">
            {title}
          </h2>
          {subtitle && (
            <p className="text-[11px] sm:text-xs md:text-sm text-white/60 mt-1">
              {subtitle}
            </p>
          )}
        </div>
      </div>

      <div className="flex gap-3 sm:gap-4 overflow-x-auto pb-3 hide-scrollbar">
        {items.map((item) => (
          <ProductCard key={item.id} item={item} addToCart={addToCart} />
        ))}
      </div>
    </section>
  );
}