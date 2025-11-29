"use client";

import { useState, useRef, useEffect } from "react";
import {
  Menu,
  X,
  Search,
  ShoppingCart,
  User,
  LogOut,
} from "lucide-react";

export default function ResponsiveShoeNavbar({
  search = "",
  setSearch = () => {},
  cart = [],
  setShowCart = () => {},
  router,
}) {
  const [openSearch, setOpenSearch] = useState(false);
  const [showMenu, setShowMenu] = useState(false); // Controls the mobile drawer
  const drawerRef = useRef(null);

  const handleLogout = () => {
    localStorage.removeItem("loggedIn");
    localStorage.removeItem("user");
    router.push("/");
  };

  // Utility class for common icon styling
  const iconStyle = "text-cyan-300 hover:text-cyan-100 cursor-pointer transition-colors duration-200";

  // --- Mobile Drawer Logic (Click/Escape outside) ---
  useEffect(() => {
    const handleClickOutside = (event) => {
      // Check if click is outside the drawer AND outside the menu icon itself
      if (drawerRef.current && !drawerRef.current.contains(event.target) && !document.querySelector('.menu-icon').contains(event.target)) {
        setShowMenu(false);
      }
    };

    const handleEscapeKey = (event) => {
      if (event.key === 'Escape') {
        setShowMenu(false);
      }
    };

    if (showMenu) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleEscapeKey);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscapeKey);
    };
  }, [showMenu]);
  // --------------------------------------------------

  return (
    <header className="fixed top-0 left-0 w-full z-40 bg-[#041625] border-b border-cyan-500/30 shadow-lg">
      <nav className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        
        {/* LOGO */}
        <div
          className="text-cyan-300 text-xl font-bold tracking-wide cursor-pointer hover:text-cyan-100 transition-colors duration-200"
          onClick={() => router.push("/")}
        >
          ShoeStore
        </div>

        {/* DESKTOP NAV (Search, Cart, Profile, Logout) */}
        <div className="hidden md:flex items-center gap-5">

          {/* Search */}
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

          {/* Cart */}
          <div
            className="relative cursor-pointer"
            onClick={() => setShowCart((prev) => !prev)}
          >
            <ShoppingCart size={26} className={iconStyle} />
            {cart.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-cyan-500 text-black rounded-full w-5 h-5 text-xs flex items-center justify-center font-semibold">
                {cart.length}
              </span>
            )}
          </div>

          {/* Profile */}
          <User
            size={26}
            className={iconStyle}
            onClick={() => router.push("/profile")}
          />

          {/* Logout */}
          <button
            onClick={handleLogout}
            className="text-sm px-4 py-2 border border-red-500/50 text-red-400 rounded-lg hover:bg-red-500/10 hover:text-red-300 transition-all duration-200"
          >
            Logout
          </button>
        </div>

        {/* MOBILE ICONS (Search, Menu) */}
        <div className="md:hidden flex items-center gap-4">

          {/* Search icon toggle */}
          <Search
            size={26}
            className={iconStyle}
            onClick={() => setOpenSearch((o) => !o)}
          />

          {/* Hamburger Menu icon */}
          <Menu
            size={28}
            className={`${iconStyle} menu-icon`} // Added class for click handler
            onClick={() => setShowMenu(true)}
          />
        </div>
      </nav>

      {/* MOBILE SEARCH BAR (Animated slide-down) */}
      <div 
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          openSearch ? 'max-h-20 border-t border-cyan-500/20' : 'max-h-0'
        }`}
      >
        <div className="px-4 py-3 bg-[#041625]">
          <input
            type="text"
            placeholder="Search shoes..."
            className="w-full bg-[#0b2330] text-white px-4 py-2 rounded-lg border border-cyan-500/50 text-sm outline-none placeholder:text-cyan-400/60 focus:border-cyan-400 transition-colors duration-200"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>
      
      {/* 🚀 MOBILE DRAWER / SIDE-SHEET MENU */}
      {showMenu && (
        <>
          {/* Backdrop (Darkens screen) */}
          <div 
            className="fixed inset-0 bg-black/60 z-45 transition-opacity duration-300"
            onClick={() => setShowMenu(false)}
          ></div>

          {/* Drawer Content (Slides in from the right) */}
          <div 
            ref={drawerRef}
            className={`fixed top-0 right-0 h-full w-64 bg-[#03151f] border-l border-cyan-500/40 shadow-2xl z-50 transform transition-transform duration-300 ease-in-out ${
              showMenu ? 'translate-x-0' : 'translate-x-full'
            }`}
          >
            <div className="p-4 flex flex-col h-full">
              
              {/* Header and Close Button */}
              <div className="flex justify-between items-center mb-6 pb-2 border-b border-cyan-500/20">
                <span className="text-lg font-bold text-cyan-300">Menu</span>
                <X 
                  size={24} 
                  className={iconStyle} 
                  onClick={() => setShowMenu(false)} 
                />
              </div>

              {/* Menu Items */}
              <div className="flex flex-col gap-2">
                
                {/* Cart - BACKGROUND BLACK APPLIED HERE */}
                <button
                  onClick={() => {
                    setShowCart((prev) => !prev);
                    setShowMenu(false);
                  }}
                  className="w-full flex items-center justify-between px-3 py-3 text-white/90 text-base font-medium **bg-black** hover:bg-cyan-500/20 rounded-lg transition-colors duration-200"
                >
                  <span className="flex items-center gap-3">
                    <ShoppingCart size={20} className="text-cyan-300" />
                    Cart
                  </span>
                  {cart.length > 0 && (
                    <span className="bg-cyan-500 text-black rounded-full w-6 h-6 text-xs flex items-center justify-center font-semibold">
                      {cart.length}
                    </span>
                  )}
                </button>

                {/* Profile - BACKGROUND BLACK APPLIED HERE */}
                <button
                  onClick={() => {
                    router.push("/profile");
                    setShowMenu(false);
                  }}
                  className="w-full flex items-center gap-3 px-3 py-3 text-white/90 text-base font-medium **bg-black** hover:bg-cyan-500/20 rounded-lg transition-colors duration-200"
                >
                  <User size={20} className="text-cyan-300" />
                  Profile
                </button>
              </div>

              {/* Logout (Stuck to the bottom) - BACKGROUND BLACK APPLIED HERE */}
              <div className="mt-auto pt-4 border-t border-cyan-500/20">
                <button
                  onClick={() => {
                    setShowMenu(false);
                    handleLogout();
                  }}
                  className="w-full flex items-center gap-3 px-3 py-3 text-red-400 text-base font-medium **bg-black** hover:bg-red-500/20 rounded-lg transition-colors duration-200"
                >
                  <LogOut size={20} />
                  Logout
                </button>
              </div>

            </div>
          </div>
        </>
      )}
    </header>
  );
}