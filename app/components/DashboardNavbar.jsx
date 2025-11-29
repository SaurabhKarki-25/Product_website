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
  category = "All", // Not used in component, but kept for signature
  setCategory = () => {}, // Not used in component, but kept for signature
  cart = [],
  setShowCart = () => {},
  router,
}) {
  const [openSearch, setOpenSearch] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("loggedIn");
    localStorage.removeItem("user");
    // Using router.push("/") is generally better than window.location.replace for Next.js if available
    router.push("/"); 
  };

  // Utility class for transition to apply to multiple icons/buttons
  const iconTransition = "text-cyan-300 hover:text-cyan-100 cursor-pointer transition-colors duration-200";

  return (
    <header className="fixed top-0 left-0 w-full z-40 bg-[#041625]/85 backdrop-blur-xl border-b border-cyan-500/30">
      <nav className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        
        {/* LOGO */}
        <div
          className="text-cyan-300 text-xl font-bold tracking-wide cursor-pointer hover:text-cyan-100 transition-colors duration-200"
          onClick={() => router.push("/")}
        >
          ShoeStore
        </div>

        {/* DESKTOP */}
        <div className="hidden md:flex items-center gap-5">

          {/* Search Bar - Added transition for smoothness */}
          <div className="flex items-center bg-[#041b25] border border-cyan-500/30 px-3 py-2 rounded-lg w-64 focus-within:border-cyan-400 transition-colors duration-200">
            <Search size={18} className="text-cyan-300 mr-2" />
            <input
              type="text"
              placeholder="Search shoes..."
              className="bg-transparent outline-none text-sm text-white w-full placeholder:text-cyan-400/60"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          {/* Cart - Uses shared transition utility */}
          <div
            className="relative cursor-pointer"
            onClick={() => setShowCart((prev) => !prev)}
          >
            <ShoppingCart size={26} className={iconTransition} />
            {cart.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-cyan-500 text-black rounded-full w-5 h-5 text-xs flex items-center justify-center font-semibold">
                {cart.length}
              </span>
            )}
          </div>

          {/* Profile - Uses shared transition utility */}
          <User
            size={26}
            className={iconTransition}
            onClick={() => router.push("/profile")}
          />

          {/* Logout - Slightly refined hover/focus states */}
          <button
            onClick={handleLogout}
            className="text-xs px-3 py-2 border border-red-500/50 text-red-400 rounded-lg hover:bg-red-500/10 hover:text-red-300 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-red-500/50"
          >
            Logout
          </button>
        </div>

        {/* MOBILE ICONS */}
        <div className="md:hidden flex items-center gap-4">

          {/* Search icon - Uses shared transition utility */}
          <Search
            size={26}
            className={iconTransition}
            onClick={() => setOpenSearch((o) => !o)}
          />

          {/* Hamburger/Close icon - Uses shared transition utility */}
          {showMenu ? (
            <X
              size={28}
              className={iconTransition}
              onClick={() => setShowMenu(false)}
            />
          ) : (
            <Menu
              size={28}
              className={iconTransition}
              onClick={() => setShowMenu(true)}
            />
          )}
        </div>
      </nav>

      {/* MOBILE SEARCH BAR */}
      {openSearch && (
        <div className="md:hidden bg-[#041b25] border-t border-cyan-500/20 px-4 py-3 transition-all duration-300 ease-in-out">
          <input
            type="text"
            placeholder="Search shoes..."
            className="w-full bg-[#0b2330] text-white px-4 py-2 rounded-lg border border-cyan-500/50 text-sm outline-none placeholder:text-cyan-400/60 focus:border-cyan-400 transition-colors duration-200"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      )}

      {/* ⭐ FLOATING MOBILE MENU ⭐ */}
      {showMenu && (
        <>
          {/* Optional: Add an overlay to close the menu on tap outside */}
          <div 
            className="fixed inset-0 z-45" 
            onClick={() => setShowMenu(false)} 
          />

          <div className="md:hidden fixed bottom-20 right-5 bg-[#03151f] border border-cyan-500/30 rounded-2xl p-2 w-40 shadow-xl z-50 animate-popup">
            
            {/* CART */}
            <button
              onClick={() => {
                setShowCart((prev) => !prev);
                setShowMenu(false);
              }}
              className="w-full flex items-center gap-3 text-left px-3 py-2 text-white/90 text-sm font-medium hover:bg-cyan-500/20 rounded-xl transition-colors duration-200"
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
              className="w-full flex items-center gap-3 text-left px-3 py-2 text-white/90 text-sm font-medium hover:bg-cyan-500/20 rounded-xl transition-colors duration-200"
            >
              <User size={18} className="text-cyan-300" />
              Profile
            </button>

            <hr className="my-1 border-cyan-500/10" />

            {/* LOGOUT */}
            <button
              onClick={() => {
                setShowMenu(false);
                handleLogout();
              }}
              className="w-full flex items-center gap-3 text-left px-3 py-2 text-red-400 text-sm font-medium hover:bg-red-500/20 rounded-xl transition-colors duration-200"
            >
              <LogOut size={18} />
              Logout
            </button>
          </div>
        </>
      )}

      {/* ANIMATIONS */}
      <style>{`
        /* Keep original animation, or replace with a CSS transition for complex movement */
        @keyframes popup {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-popup { animation: popup 0.25s ease-out; }
      `}</style>
    </header>
  );
}