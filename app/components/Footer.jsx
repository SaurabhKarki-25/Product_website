"use client";

import React from "react";
import { Instagram, Twitter, Linkedin } from "lucide-react";

export default function Footer() {
  return (
    <footer id = "Footer" className="border-t border-cyan-500/20 px-4 sm:px-6 lg:px-8 py-12 sm:py-16 bg-[#040B1A]/80 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto">
        {/* Top */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 sm:gap-12 mb-12">
          {/* Brand */}
          <div>
            <h3 className="font-bold text-lg sm:text-xl gradient-text mb-4">
              AEROX VELOCITY™
            </h3>
            <p className="text-sm text-gray-400">
              Next-generation athletic footwear – engineered for speed, comfort
              and sustainability.
            </p>
          </div>

          {/* Columns */}
          {[
            {
              title: "Product",
              links: ["Shoes", "Collections", "New Release", "Sale"],
            },
            {
              title: "Company",
              links: ["About", "Careers", "Press", "Sustainability"],
            },
            {
              title: "Support",
              links: ["Contact", "FAQ", "Shipping", "Returns"],
            },
          ].map((col, idx) => (
            <div key={idx}>
              <h4 className="font-semibold text-white mb-4 text-sm uppercase tracking-wide">
                {col.title}
              </h4>
              <ul className="space-y-2">
                {col.links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-sm text-gray-400 hover:text-cyan-400 transition-colors"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div className="border-t border-cyan-500/10 pt-8 sm:pt-10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-500">
            © {new Date().getFullYear()} AEROX VELOCITY™. All rights reserved.
          </p>

          <div className="flex items-center gap-5">
            <a
              href="#"
              className="text-gray-400 hover:text-cyan-400 transition-colors"
              aria-label="Instagram"
            >
              <Instagram className="w-5 h-5" />
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-cyan-400 transition-colors"
              aria-label="Twitter"
            >
              <Twitter className="w-5 h-5" />
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-cyan-400 transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
