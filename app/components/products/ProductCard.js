// src/components/products/ProductCard.js

"use client";

import React from 'react';
import { ShoppingCart } from 'lucide-react';

export default function ProductCard({ item, addToCart }) {
  // Static star rating for visual polish
  const Rating = () => (
    <div className="flex items-center gap-1 mt-1">
      <span className="text-yellow-400 text-xs sm:text-sm">★★★★☆</span>
      <span className="text-white/50 text-[10px] sm:text-xs">(1,245)</span>
    </div>
  );

  return (
    <div
      key={item.id}
      className="min-w-[160px] max-w-[160px] sm:min-w-[200px] sm:max-w-[200px] bg-[#041625] 
               border border-cyan-500/20 rounded-xl p-3 sm:p-4
               shadow-[0_0_20px_rgba(0,0,0,0.5)] 
               hover:shadow-[0_0_35px_rgba(0,255,255,0.4)]
               transition-all duration-300 hover:scale-[1.03] relative group"
    >
      {/* Top Badges (FAssured/Premium) */}
      {(item.brand.includes("Nike") || item.brand.includes("Adidas")) && (
        <span className="absolute top-0 right-0 bg-green-600 text-white text-[9px] sm:text-[10px] px-2 py-0.5 rounded-bl-xl font-bold tracking-wider z-10">
          ✅ Verified
        </span>
      )}
      
      {/* Product Image with Interactive Hover */}
      <div className="w-full h-28 sm:h-32 flex justify-center items-center overflow-hidden rounded-lg relative">
        <img
          src={item.img}
          alt={item.name}
          className="w-auto h-full object-contain rounded-lg group-hover:scale-110 transition-transform duration-500"
        />
      </div>

      {/* Product Name & Brand */}
      <p className="text-[11px] text-white/70 mt-3 uppercase tracking-wider">{item.brand}</p>
      <p className="text-sm sm:text-base font-semibold text-white line-clamp-2">
        {item.name}
      </p>

      {/* Social Proof */}
      <Rating />

      {/* Price Details */}
      <div className="flex items-center gap-2 mt-1">
        <span className="text-cyan-400 font-bold text-base sm:text-xl">
          ₹{item.price.toLocaleString('en-IN')}
        </span>
        <span className="text-white/40 text-[10px] sm:text-xs line-through">
          ₹{item.mrp.toLocaleString('en-IN')}
        </span>
        <span className="text-green-400 text-[10px] sm:text-xs font-medium">
          {item.discount}
        </span>
      </div>

      {/* CTA Button */}
      <button
        onClick={() => addToCart(item)}
        className="mt-2 sm:mt-3 w-full bg-cyan-600 border border-cyan-400 
                   text-black text-sm py-2 rounded-lg 
                   hover:bg-cyan-500 hover:text-white font-semibold transition-all shadow-md flex items-center justify-center gap-2"
      >
        <ShoppingCart size={16} /> Add to Cart
      </button>
    </div>
  );
}