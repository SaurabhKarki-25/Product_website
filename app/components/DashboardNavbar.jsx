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
  const [openSearch, setOpenSearch] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("loggedIn");
    localStorage.removeItem("user");
    window.location.replace("/");
  };

  return (
    <header className="fixed top-0 left-0 w-full z-40 bg-[#041625]/85 backdrop-blur-xl border-b border-cyan-500/30">
      <nav className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        
        {/* LOGO */}
        <div
          className="text-cyan-300 text-xl font-bold tracking-wide cursor-pointer"
          onClick={() => router.push("/")}
        >
          ShoeStore
        </div>

        {/* DESKTOP (unchanged) */}
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

        {/* MOBILE ICONS */}
        <div className="md:hidden flex items-center gap-4">

          {/* Search icon */}
          <Search
            size={26}
            className="text-cyan-300 cursor-pointer"
            onClick={() => setOpenSearch((o) => !o)}
          />

          {/* Hamburger → opens small menu */}
          <Menu
            size={28}
            className="text-cyan-300 cursor-pointer"
            onClick={() => setShowMenu((o) => !o)}
          />
        </div>
      </nav>

      {/* MOBILE SEARCH BAR */}
      {openSearch && (
        <div className="md:hidden bg-[#041b25] border-t border-cyan-500/20 px-4 py-3">
          <input
            type="text"
            placeholder="Search shoes..."
            className="w-full bg-[#0b2330] text-white px-4 py-2 rounded-lg border border-cyan-500/30 text-sm outline-none"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      )}

      {/* ⭐ FLOATING MOBILE MENU ⭐ */}
      {showMenu && (
        <div className="md:hidden fixed bottom-20 right-5 bg-[#03151f] border border-cyan-500/30 rounded-2xl p-4 w-40 shadow-xl animate-popup">
          
          {/* CART */}
          <button
            onClick={() => {
              setShowCart((prev) => !prev);
              setShowMenu(false);
            }}
            className="w-full flex items-center gap-2 text-left px-3 py-2 text-white/90 text-sm hover:bg-cyan-500/10 rounded-lg"
          >
            <ShoppingCart size={18} className="text-cyan-300" />
            Cart
          </button>

          {/* PROFILE */}
          <button
            onClick={() => {
              router.push("/profile");
              setShowMenu(false);
            }}
            className="w-full flex items-center gap-2 text-left px-3 py-2 text-white/90 text-sm hover:bg-cyan-500/10 rounded-lg"
          >
            <User size={18} className="text-cyan-300" />
            Profile
          </button>

          {/* LOGOUT */}
          <button
            onClick={() => {
              setShowMenu(false);
              handleLogout();
            }}
            className="w-full flex items-center gap-2 text-left px-3 py-2 text-red-400 text-sm hover:bg-red-500/10 rounded-lg"
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>
      )}

      {/* ANIMATIONS */}
      <style>{`
        @keyframes popup {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-popup { animation: popup 0.25s ease-out; }
      `}</style>
    </header>
  );
}
