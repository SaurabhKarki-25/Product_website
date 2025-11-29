"use client";

import React, { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import Link from "next/link";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [active, setActive] = useState("home");
  const [isShrunk, setIsShrunk] = useState(false);

  const menuItems = [
    { label: "Home", link: "home" },
    { label: "Features", link: "features" },
    { label: "Best Sellers", link: "bestsellers" },
    { label: "Reviews", link: "reviews" },
    { label: "Contact", link: "contact" },
  ];

  // Smooth scroll
  const smoothScroll = (targetY, duration = 800) => {
    const startY = window.scrollY;
    const diff = targetY - startY;
    let startTime = null;

    const easeInOut = (t) =>
      t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

    const animation = (currentTime) => {
      if (!startTime) startTime = currentTime;
      const time = currentTime - startTime;
      const progress = Math.min(time / duration, 1);

      window.scrollTo(0, startY + diff * easeInOut(progress));

      if (progress < 1) requestAnimationFrame(animation);
    };

    requestAnimationFrame(animation);
  };

  // Track scroll + active links
  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + 200;

      menuItems.forEach((item) => {
        const element = document.getElementById(item.link);

        if (element) {
          const top = element.offsetTop;
          const bottom = top + element.offsetHeight;

          if (scrollPos >= top && scrollPos < bottom) {
            setActive(item.link);
          }
        }
      });

      setIsShrunk(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed w-full top-0 z-50 transition-all duration-300
        backdrop-blur-xl bg-[#041625]/60 border-b border-cyan-500/20
        shadow-[0_0_20px_rgba(0,255,255,0.15)]
        ${isShrunk ? "h-14" : "h-20"}
      `}
    >
      <nav className="max-w-7xl mx-auto px-6 flex items-center justify-between h-full">
        
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold text-cyan-400 tracking-wide">
          PremiumShop
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden md:flex items-center gap-10">
          {menuItems.map((item) => (
            <li key={item.link}>
              <button
                onClick={() => {
                  const element = document.getElementById(item.link);
                  if (element) smoothScroll(element.offsetTop - 120);
                }}
                className={`transition-all text-lg ${
                  active === item.link
                    ? "text-cyan-400 font-semibold"
                    : "text-white/80 hover:text-cyan-300"
                }`}
              >
                {item.label}
              </button>
            </li>
          ))}

          {/* ONLY LOGIN BUTTON */}
          <li>
            <Link
              href="/login"
              className="text-white/80 hover:text-cyan-300 transition-all text-lg"
            >
              Login
            </Link>
          </li>
        </ul>

        {/* Mobile menu toggle */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-cyan-300"
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </nav>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-[black]/90 backdrop-blur-md border-t border-cyan-500/20 shadow-lg">
          <ul className="flex flex-col py-4 px-6 gap-6">
            {menuItems.map((item) => (
              <li key={item.link}>
                <button
                  onClick={() => {
                    const element = document.getElementById(item.link);
                    if (element) smoothScroll(element.offsetTop - 120);
                    setIsOpen(false);
                  }}
                  className={`block text-left text-lg ${
                    active === item.link
                      ? "text-cyan-400 font-semibold"
                      : "text-white/80 hover:text-cyan-300"
                  }`}
                >
                  {item.label}
                </button>
              </li>
            ))}

            {/* ONLY LOGIN */}
            <li>
              <Link
                href="/login"
                onClick={() => setIsOpen(false)}
                className="text-white/80 hover:text-cyan-300 text-lg"
              >
                Login
              </Link>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
