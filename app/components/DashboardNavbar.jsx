"use client";

import { Menu, X, ShoppingCart, User } from "lucide-react";
import { useState } from "react";

export default function DashboardNavbar({
  search,
  setSearch,
  category,
  setCategory,
  cart,
  setShowCart,
  router,
}) {
  const [open, setOpen] = useState(false);

  return (
    <header className="w-full fixed top-0 z-40 bg-[#041625]/80 backdrop-blur-xl border-b border-cyan-500/30">
      <nav className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">

        {/* Logo */}
        <div
          className="text-cyan-300 text-xl font-bold cursor-pointer"
          onClick={() => router.push("/")}
        >
          ShoeStore
        </div>

        {/* Desktop Icons */}
        <div className="hidden md:flex items-center gap-6">

          {/* Search */}
          <input
            type="text"
            placeholder="Search shoes..."
            className="px-4 py-2 rounded-lg bg-[#0b2a33] text-white border border-cyan-500/30 text-sm w-60"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          {/* Categories */}
          <div className="flex gap-2">
            {["All", "Sports", "Sneakers"].map((cat) => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={`px-3 py-2 rounded-lg text-sm border transition ${
                  category === cat
                    ? "text-cyan-300 border-cyan-300"
                    : "text-white/70 border-white/20 hover:border-cyan-300"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Cart */}
          <div
            className="relative cursor-pointer"
            onClick={() => setShowCart((p) => !p)}
          >
            <ShoppingCart className="text-cyan-300" size={28} />
            {cart.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-cyan-500 text-black rounded-full w-5 h-5 flex items-center justify-center text-xs">
                {cart.length}
              </span>
            )}
          </div>

          {/* Profile */}
          <User
            className="text-cyan-300 cursor-pointer"
            size={28}
            onClick={() => router.push("/profile")}
          />
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-cyan-300"
          onClick={() => setOpen(!open)}
        >
          {open ? <X size={28} /> : <Menu size={28} />}
        </button>
      </nav>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden bg-[#041625]/95 px-4 py-4 border-t border-cyan-500/20">
          
          {/* Search */}
          <input
            type="text"
            placeholder="Search shoes..."
            className="w-full px-4 py-2 mb-3 rounded-lg bg-[#0b2a33] text-white border border-cyan-500/30 text-sm"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          {/* Categories Horizontal Scroll */}
          <div className="flex gap-2 overflow-x-auto pb-2 hide-scrollbar">
            {["All", "Sports", "Sneakers"].map((cat) => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={`px-4 py-2 whitespace-nowrap rounded-lg text-sm border ${
                  category === cat
                    ? "text-cyan-300 border-cyan-300"
                    : "text-white/70 border-white/30"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Icons */}
          <div className="flex items-center justify-between mt-4">
            <div
              className="relative cursor-pointer"
              onClick={() => setShowCart((p) => !p)}
            >
              <ShoppingCart className="text-cyan-300" size={28} />
              {cart.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-cyan-500 text-black rounded-full w-5 h-5 flex items-center justify-center text-xs">
                  {cart.length}
                </span>
              )}
            </div>

            <User
              className="text-cyan-300 cursor-pointer"
              size={28}
              onClick={() => router.push("/profile")}
            />
          </div>
        </div>
      )}
    </header>
  );
}
