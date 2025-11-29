"use client";

import { Search, ShoppingCart, User, LogOut } from "lucide-react";

export default function DashboardNavbar({
  search = "",
  setSearch = () => {},
  category = "All",
  setCategory = () => {},
  cart = [],
  setShowCart = () => {},
  router,
}) {
  return (
    <nav className="w-full bg-[#041625]/80 backdrop-blur-xl border-b border-cyan-500/20 px-8 py-4 flex items-center justify-between shadow-[0_0_20px_rgba(0,255,255,0.15)] sticky top-0 z-40">

      {/* Brand Logo */}
      <h1 className="text-3xl font-bold text-cyan-400 tracking-wide drop-shadow-[0_0_10px_cyan]">
        ShoeStore
      </h1>

      {/* Search Bar */}
      <div className="flex items-center bg-[#041625] border border-cyan-500/30 px-4 py-2 rounded-xl shadow-[0_0_10px_rgba(0,255,255,0.2)] w-72">
        <Search className="text-cyan-300 mr-2" size={20} />
        <input
          type="text"
          placeholder="Search shoes..."
          className="bg-transparent outline-none w-full text-white"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Right Side */}
      <div className="flex items-center gap-6">

        {/* Category Filters */}
        <div className="hidden md:flex gap-3">
          {["All", "Sports", "Sneakers"].map((cat) => (
            <button
              key={cat}
              className={`px-4 py-2 rounded-lg border text-sm transition-all ${
                category === cat
                  ? "border-cyan-400 text-cyan-400"
                  : "border-white/20 text-white/70 hover:text-cyan-300"
              }`}
              onClick={() => setCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Cart Button */}
        <div
          className="relative cursor-pointer"
          onClick={() => setShowCart((prev) => !prev)}
        >
          <ShoppingCart className="text-cyan-300" size={28} />

          {Array.isArray(cart) && cart.length > 0 && (
            <span className="absolute -top-2 -right-2 bg-cyan-500 text-black rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">
              {cart.length}
            </span>
          )}
        </div>

        {/* Profile Button */}
        <User
          size={30}
          className="text-cyan-300 cursor-pointer hover:text-cyan-200 transition-all"
          onClick={() => router.push("/profile")}
        />

        {/* LOGOUT BUTTON */}
        <button
          onClick={() => {
            localStorage.removeItem("loggedIn");
            localStorage.removeItem("user");
            router.replace("/login"); // safer redirect
          }}
          className="px-3 py-2 border border-red-500/50 text-red-400 rounded-lg
                     hover:bg-red-500/10 transition-all
                     shadow-[0_0_10px_rgba(255,0,0,0.2)] flex items-center gap-2 text-sm"
        >
          <LogOut size={18} />
          Logout
        </button>
      </div>
    </nav>
  );
}
