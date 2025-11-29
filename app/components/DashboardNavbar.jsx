"use client";

import { useState } from "react";
import {
  Menu,
  X,
  Search,
  ShoppingCart,
  User,
  LogOut,
} from "lucide-react";

export default function DashboardNavbar({
  search = "",
  setSearch = () => {},
  category = "All",
  setCategory = () => {},
  cart = [],
  setShowCart = () => {},
  router,
}) {
  const [openMenu, setOpenMenu] = useState(false);
  const [openSearch, setOpenSearch] = useState(false);

  const categories = ["All", "Sports", "Sneakers"];

  const handleLogout = () => {
    localStorage.removeItem("loggedIn");
    localStorage.removeItem("user");
    window.location.replace("/");
  };

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-[#041625]/85 backdrop-blur-xl border-b border-cyan-500/30">
      <nav className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        
        {/* LOGO */}
        <div
          className="text-cyan-300 text-xl font-bold tracking-wide cursor-pointer"
          onClick={() => router.push("/")}
        >
          ShoeStore
        </div>

        {/* Desktop Right Side */}
        <div className="hidden md:flex items-center gap-5">
          {/* Search */}
          <div className="flex items-center bg-[#041b25] border border-cyan-500/30 px-3 py-2 rounded-lg w-64">
            <Search size={18} className="text-cyan-300 mr-2" />
            <input
              type="text"
              placeholder="Search shoes..."
              className="bg-transparent outline-none text-sm text-white w-full"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          {/* Categories */}
          <div className="flex items-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={`px-3 py-2 rounded-lg text-sm border ${
                  category === cat
                    ? "border-cyan-300 text-cyan-300 bg-cyan-500/10"
                    : "border-white/20 text-white/70 hover:border-cyan-300"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Cart */}
          <div
            className="relative cursor-pointer"
            onClick={() => setShowCart((prev) => !prev)}
          >
            <ShoppingCart size={26} className="text-cyan-300" />
            {cart.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-cyan-500 text-black rounded-full w-5 h-5 text-xs flex items-center justify-center">
                {cart.length}
              </span>
            )}
          </div>

          {/* Profile */}
          <User
            size={26}
            className="text-cyan-300 cursor-pointer"
            onClick={() => router.push("/profile")}
          />

          {/* Logout */}
          <button
            onClick={handleLogout}
            className="text-xs px-3 py-2 border border-red-500/50 text-red-400 rounded-lg hover:bg-red-500/10 transition"
          >
            Logout
          </button>
        </div>

        {/* Mobile Icons */}
        <div className="md:hidden flex items-center gap-4">
          {/* Cart */}
          <div
            className="relative cursor-pointer"
            onClick={() => setShowCart((prev) => !prev)}
          >
            <ShoppingCart size={26} className="text-cyan-300" />
            {cart.length > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 text-[10px] bg-cyan-500 text-black rounded-full flex items-center justify-center">
                {cart.length}
              </span>
            )}
          </div>

          {/* Hamburger Menu */}
          <button onClick={() => setOpenMenu((o) => !o)}>
            {openMenu ? (
              <X size={28} className="text-cyan-300" />
            ) : (
              <Menu size={28} className="text-cyan-300" />
            )}
          </button>
        </div>
      </nav>

      {/* MOBILE MENU DRAWER */}
      {openMenu && (
        <div className="md:hidden bg-[#03151f]/95 border-t border-cyan-500/20 px-4 py-4 space-y-4 animate-slideDown">
          {/* Search Input */}
          <div className="flex items-center bg-[#041b25] border border-cyan-500/30 px-3 py-2 rounded-lg">
            <Search size={18} className="text-cyan-300 mr-2" />
            <input
              type="text"
              placeholder="Search shoes..."
              className="bg-transparent outline-none text-sm text-white w-full"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          {/* Categories */}
          <div>
            <p className="text-white/60 text-xs mb-1">Categories</p>
            <div className="flex gap-2 overflow-x-auto hide-scrollbar pb-1">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setCategory(cat)}
                  className={`px-4 py-2 whitespace-nowrap rounded-lg text-sm border ${
                    category === cat
                      ? "border-cyan-300 text-cyan-300 bg-cyan-500/10"
                      : "border-white/30 text-white/70"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Profile + Logout */}
          <div className="flex flex-col gap-2 pt-2">
            <button
              onClick={() => router.push("/profile")}
              className="flex items-center gap-2 px-4 py-2 bg-[#04202c] border border-cyan-500/20 rounded-lg text-sm text-white hover:bg-cyan-500/10 transition"
            >
              <User size={18} className="text-cyan-300" />
              Profile
            </button>

            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 bg-[#2c0000] border border-red-500/50 rounded-lg text-sm text-red-400 hover:bg-red-500/10 transition"
            >
              <LogOut size={18} />
              Logout
            </button>
          </div>
        </div>
      )}

      {/* ANIMATION */}
      <style>{`
        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-slideDown { animation: slideDown 0.25s ease-out; }
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { scrollbar-width: none; }
      `}</style>
    </header>
  );
}
