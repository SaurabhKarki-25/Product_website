"use client";

import { useState } from "react";
import { Menu, X, Search, ShoppingCart, User, LogOut } from "lucide-react";

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
  const [profileMenu, setProfileMenu] = useState(false);

  const categories = ["All", "Sports", "Sneakers"];

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

        {/* DESKTOP CONTENT (UNCHANGED) */}
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

          {/* CART */}
          <div
            className="relative cursor-pointer"
            onClick={() => setShowCart((prev) => !prev)}
          >
            <ShoppingCart className="text-cyan-300" size={26} />
            {Array.isArray(cart) && cart.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-cyan-500 text-black rounded-full w-5 h-5 text-xs flex items-center justify-center font-semibold">
                {cart.length}
              </span>
            )}
          </div>

          {/* Profile Menu */}
          <div className="relative">
            <User
              className="text-cyan-300 cursor-pointer"
              size={26}
              onClick={() => setProfileMenu((prev) => !prev)}
            />

            {profileMenu && (
              <div className="absolute right-0 mt-2 bg-[#03151f] border border-cyan-500/20 rounded-lg w-40 shadow-xl py-2">
                <button
                  onClick={() => router.push("/profile")}
                  className="block w-full text-left px-4 py-2 text-white/90 hover:bg-cyan-500/10 text-sm"
                >
                  Profile
                </button>

                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-4 py-2 text-red-400 hover:bg-red-500/10 text-sm"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>

        {/* MOBILE BUTTONS */}
        <div className="md:hidden flex items-center gap-4">

          {/* Search Toggle */}
          <Search
            className="text-cyan-300 cursor-pointer"
            size={26}
            onClick={() => setOpenSearch((prev) => !prev)}
          />

          {/* Cart */}
          <div
            className="relative cursor-pointer"
            onClick={() => setShowCart((prev) => !prev)}
          >
            <ShoppingCart className="text-cyan-300" size={26} />
            {cart.length > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 text-[10px] bg-cyan-500 text-black rounded-full flex items-center justify-center">
                {cart.length}
              </span>
            )}
          </div>

          {/* Profile Dropdown */}
          <div className="relative">
            <User
              size={26}
              className="text-cyan-300 cursor-pointer"
              onClick={() => setProfileMenu((p) => !p)}
            />

            {profileMenu && (
              <div className="absolute right-0 mt-3 w-36 bg-[#03151f] border border-cyan-500/30 rounded-xl py-2 shadow-xl">

                <button
                  onClick={() => router.push("/profile")}
                  className="w-full text-left px-4 py-2 text-white/90 text-sm hover:bg-cyan-500/10"
                >
                  Profile
                </button>

                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 text-red-400 text-sm hover:bg-red-500/10"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* MOBILE SEARCH BAR (Slide Down) */}
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
    </header>
  );
}
