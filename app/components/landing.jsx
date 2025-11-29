"use client";

import React from "react";
import { CheckCircle, Star, Zap, Wind, Shield, Heart } from "lucide-react";

export function Landing() {
  const productImages = [
    "/hero-section.jpg",
    "/hero-section2.jpg",
    "/herosection2.jpg",
    "/herosection3.webp",
  ];

  function handleWhatsAppOrder() {
    const name = document.getElementById("fullName").value;
    const size = document.getElementById("shoeSize").value;
    const color = document.getElementById("shoeColor").value;

    const randomMessages = [
      "Nice shoes! Can I get an offer code?",
      "Hey! I want to know more about this sneaker!",
      "These shoes look awesome! Any discounts today?",
      "AEROX looking fire! Any best price available?",
      "Love this design! Can you share an offer?",
    ];

    const randomMessage =
      randomMessages[Math.floor(Math.random() * randomMessages.length)];

    const finalMessage = `
Hello! I want to order AEROX VELOCITY 👟

Name: ${name || "Not provided"}
Size: ${size || "Not selected"}
Color: ${color || "Not selected"}

Message: ${randomMessage}
`;

    const phoneNumber = "916396088269"; // 91 + your number

    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
      finalMessage
    )}`;

    window.open(url, "_blank");
  }

  return (
    <div className="w-full overflow-hidden bg-gradient-to-b from-[#040B1A] to-[#0A1F33]" >
      {/* Hero Section */}
      <section
        className="min-h-screen flex items-center justify-center px-4 sm:px-6 scroll-mt-24 lg:px-8 py-12 sm:py-20 relative overflow-hidden "
        id="home" 
      >
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500 rounded-full blur-3xl opacity-10"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500 rounded-full blur-3xl opacity-5"></div>
        </div>

        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 items-center relative z-10">
          {/* Left Content */}
          <div className="flex flex-col justify-center space-y-6 sm:space-y-8">
            <div className="inline-flex items-center space-x-2 w-fit px-4 py-2 glass rounded-full">
              <span className="text-xs sm:text-sm font-semibold text-cyan-400">
                NEW RELEASE
              </span>
              <Zap className="w-4 h-4 text-cyan-400" />
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold leading-tight gradient-text">
              AEROX VELOCITY™
            </h1>

            <p className="text-base sm:text-lg text-gray-300 leading-relaxed max-w-lg">
              Next-generation athletic footwear engineered for unbeatable
              performance. Experience the future of speed, comfort, and
              sustainability.
            </p>

            {/* Stats Bar */}
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 pt-4">
              <div className="flex items-center space-x-3">
                <div className="text-xs sm:text-sm font-semibold text-cyan-400">
                  50% Lighter
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="text-xs sm:text-sm font-semibold text-cyan-400">
                  3x Durable
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="text-xs sm:text-sm font-semibold text-cyan-400">
                  99% Eco Material
                </div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button className="bg-cyan-400 text-black hover:bg-cyan-300 font-semibold transition-all duration-300 w-full sm:w-auto px-6 py-3 rounded-lg">
                Buy Now
              </button>

              <button className="border border-cyan-400 text-cyan-400 hover:bg-cyan-400/10 font-semibold transition-all duration-300 w-full sm:w-auto px-6 py-3 rounded-lg">
                Explore Collection
              </button>
            </div>
          </div>

          {/* Right Image */}
          <div className="group bg-[#0A1F33] p-4 rounded-2xl border border-cyan-500/20 transition-all duration-500 hover:-translate-y-3 hover:shadow-2xl hover:shadow-cyan-500/30">
            <div className="overflow-hidden rounded-xl">
              <img
                src="/hero-section.jpg"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 group-hover:-translate-y-2"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="px-4 sm:px-6 lg:px-8 py-16 sm:py-24 scroll-mt-24" id="features">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-center mb-12 sm:mb-16">
            <span className="gradient-text">Engineered for Excellence</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: Shield,
                title: "Carbon-Fiber Sole",
                desc: "Lightweight yet incredibly durable",
              },
              {
                icon: Wind,
                title: "Ultra Airflow Mesh",
                desc: "Maximum breathability and comfort",
              },
              {
                icon: Zap,
                title: "Dynamic Cushion Boost",
                desc: "Energy return with every step",
              },
              {
                icon: Shield,
                title: "Anti-Slip Stabilizers",
                desc: "Premium grip in any condition",
              },
            ].map((feature, idx) => (
              <div
                key={idx}
                className="glass glass-hover rounded-2xl p-6 sm:p-8 border border-cyan-500/20 group cursor-pointer"
              >
                <feature.icon className="w-8 h-8 sm:w-10 sm:h-10 text-cyan-400 mb-4 group-hover:scale-110 transition-transform" />
                <h3 className="text-lg sm:text-xl font-bold text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm sm:text-base text-gray-400">
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Technology Section */}
      <section className="px-4 sm:px-6 lg:px-8 py-16 sm:py-24 scroll-mt-24"  id="technology">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 items-center">
            <div className="group bg-[#0A1F33] p-4 rounded-2xl border border-cyan-500/20 transition-all duration-500 hover:-translate-y-3 hover:shadow-2xl hover:shadow-cyan-500/30">
              <div className="overflow-hidden rounded-xl">
                <img
                  src="/hero-section2.jpg"
                  className="w-full h-120 object-cover transition-transform duration-700 group-hover:scale-110 group-hover:-translate-y-2"
                />
              </div>
            </div>

            <div className="space-y-6 sm:space-y-8">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold">
                <span className="gradient-text">The Future</span> of Footwear
              </h2>

              {[
                {
                  title: "Shock Absorption Tech",
                  desc: "Advanced gel-polymer blend dissipates impact",
                },
                {
                  title: "FlexMotion Engineering",
                  desc: "Adaptive flex zones for natural movement",
                },
                {
                  title: "AeroFoam Comfort Layer",
                  desc: "Ultra-responsive cushioning system",
                },
              ].map((tech, idx) => (
                <div key={idx} className="flex gap-4">
                  <CheckCircle className="w-6 h-6 text-cyan-400 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-lg sm:text-xl font-bold text-white mb-1">
                      {tech.title}
                    </h3>
                    <p className="text-sm sm:text-base text-gray-400">
                      {tech.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Best Sellers Section */}
      <section className="px-4 sm:px-6 lg:px-8 py-16 sm:py-24 scroll-mt-24" id="bestsellers">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-center mb-12 sm:mb-16">
            <span className="gradient-text">Best Sellers</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((item, index) => (
              <div
                key={item}
                className="
    relative
    group
    rounded-2xl 
    p-6 sm:p-8 
    flex flex-col items-center text-center 
    border border-cyan-500/20 
    bg-gradient-to-br from-[#061726]/60 via-[#0A253A]/80 to-[#071828]/60 
    backdrop-blur-xl 
    overflow-hidden

    shadow-[0_0_20px_rgba(0,255,255,0.15)]
    hover:shadow-[0_0_45px_rgba(0,255,255,0.40)]
    transition-all duration-500
    hover:-translate-y-3
    cursor-pointer
  "
              >
                {/* Outer Glow Halo */}
                <div
                  className="
    absolute -inset-1 
    bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 
    opacity-0 group-hover:opacity-25 
    blur-2xl rounded-3xl 
    transition-all duration-700
  "
                ></div>

                {/* Inner Shine Layer */}
                <div
                  className="
    absolute inset-0 
    bg-gradient-to-b from-white/5 to-transparent 
    opacity-0 group-hover:opacity-10 
    transition-all duration-700
  "
                ></div>

                {/* Image Container */}
                <div className="relative w-48 h-48 sm:w-56 sm:h-56 mb-6 overflow-hidden rounded-xl">
                  {/* Image Glow Behind */}
                  <div
                    className="
      absolute inset-0 
      bg-gradient-to-r from-cyan-500/20 to-blue-500/20 
      blur-3xl 
      opacity-0 group-hover:opacity-40 
      transition-all duration-700
    "
                  ></div>

                  {/* Image */}
                  <img
                    src={productImages[index]}
                    alt={`Sneaker ${item}`}
                    className="
        w-full h-full 
        object-cover 
        transition-all duration-700 
        group-hover:scale-125 
        group-hover:rotate-1
      "
                  />
                </div>

                {/* Title */}
                <h3 className="text-lg sm:text-xl font-extrabold text-cyan-300 drop-shadow-lg mb-2 tracking-wide">
                  AEROX {item}
                </h3>

                {/* Subtitle */}
                <p className="text-sm text-gray-300 mb-6 tracking-wide">
                  Performance Series
                </p>

                {/* Button */}
                <button
                  className="
      w-full 
      bg-gradient-to-r from-cyan-400 to-blue-400 
      text-black font-semibold text-sm py-2 rounded-lg 
      transition-all duration-300 
      hover:from-cyan-300 hover:to-blue-300 
      hover:shadow-[0_0_15px_rgba(0,255,255,0.65)]
      hover:scale-105
    "
                >
                  View Details
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About The Brand */}
      <section className="px-4 sm:px-6 lg:px-8 py-16 sm:py-24 scroll-mt-24" id="about">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-center mb-12 sm:mb-16">
            The Future of <span className="gradient-text">Footwear</span>
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12">
            <div className="space-y-6">
              <p className="text-base sm:text-lg text-gray-300 leading-relaxed">
                At AEROX, we're not just creating sneakers—we're pioneering the
                future of athletic footwear. Every pair represents years of
                research, innovation, and dedication to excellence.
              </p>

              {[
                "Sustainable materials sourced responsibly",
                "Athlete-tested prototypes and designs",
                "Award-winning design team since 2020",
              ].map((highlight, idx) => (
                <div key={idx} className="flex gap-3">
                  <Heart className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-1" />
                  <span className="text-base sm:text-lg text-gray-300">
                    {highlight}
                  </span>
                </div>
              ))}
            </div>

            <div className="group bg-[#0A1F33] p-4 rounded-2xl border border-cyan-500/20 transition-all duration-500 hover:-translate-y-3 hover:shadow-2xl hover:shadow-cyan-500/30">
              <div className="overflow-hidden rounded-xl">
                <img
                  src="/hero-section2.jpg"
                  className="w-full h-80 object-cover transition-transform duration-700 group-hover:scale-110 group-hover:-translate-y-2"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Customer Reviews */}
      <section className="px-4 sm:px-6 lg:px-8 py-16 sm:py-24 scroll-mt-24" id="reviews">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-center mb-12 sm:mb-16">
            <span className="gradient-text">What Athletes Say</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Alex Chen",
                role: "Professional Runner",
                glow: "from-cyan-400 via-blue-500 to-purple-500",
                text: "The best sneakers I've ever worn. Lightweight and incredibly responsive.",
              },
              {
                name: "Jordan Miles",
                role: "Basketball Player",
                glow: "from-pink-400 via-purple-500 to-indigo-500",
                text: "AEROX changed my game. The support and comfort are unmatched.",
              },
              {
                name: "Sarah Johnson",
                role: "Fitness Enthusiast",
                glow: "from-green-400 via-teal-500 to-cyan-500",
                text: "Sustainable AND high-performance? Sign me up for life.",
              },
            ].map((review, idx) => (
              <div
                key={idx}
                className="
            relative group 
            rounded-3xl p-8 
            bg-[#071A2C]/60 
            backdrop-blur-xl 
            border border-white/10 
            overflow-hidden
            transition-all duration-500
            hover:-translate-y-3
            hover:shadow-[0_0_40px_rgba(0,255,255,0.3)]
            cursor-pointer
          "
              >
                {/* Animated Glow Border */}
                <div
                  className={`
              absolute inset-0 rounded-3xl opacity-0 
              group-hover:opacity-40 
              blur-2xl transition-all duration-700
              bg-gradient-to-r ${review.glow}
            `}
                ></div>

                {/* Shine Sweep Effect */}
                <div
                  className="
              absolute inset-0 opacity-0 group-hover:opacity-20 
              bg-gradient-to-br from-white/10 to-transparent 
              animate-pulse-slow
            "
                ></div>

                {/* Stars */}
                <div className="flex gap-1 mb-4 relative z-10">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-5 h-5 fill-cyan-400 text-cyan-400 drop-shadow-[0_0_6px_#22d3ee]"
                    />
                  ))}
                </div>

                {/* Review Text */}
                <p className="text-base sm:text-lg text-gray-300 mb-6 relative z-10 leading-relaxed">
                  "{review.text}"
                </p>

                {/* User */}
                <div className="flex items-center gap-3 relative z-10">
                  <div
                    className={`
                w-12 h-12 rounded-full 
                bg-gradient-to-br ${review.glow}
                shadow-lg shadow-cyan-500/30
              `}
                  ></div>

                  <div>
                    <p className="font-bold text-white text-sm sm:text-base">
                      {review.name}
                    </p>
                    <p className="text-xs sm:text-sm text-gray-400">
                      {review.role}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact/Order Section */}
      {/* Contact/Order Section */}
      <section className="px-4 sm:px-6 lg:px-8 py-16 sm:py-24 scroll-mt-24" id="contact">
        <div
          className="
      max-w-2xl mx-auto 
      rounded-3xl p-8 sm:p-12 
      border border-cyan-500/30 
      bg-gradient-to-br from-[#041625]/80 via-[#06213A]/80 to-[#04101F]/70 
      backdrop-blur-2xl 
      relative overflow-hidden 
      shadow-[0_0_40px_rgba(0,255,255,0.15)]
      transition-all duration-500
      hover:shadow-[0_0_70px_rgba(0,255,255,0.35)]
      hover:-translate-y-2
    "
        >
          {/* Glowing Animated Background */}
          <div className="absolute -top-20 -right-20 w-60 h-60 bg-cyan-500/20 blur-3xl rounded-full animate-pulse-slow"></div>
          <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-blue-500/20 blur-3xl rounded-full animate-pulse-slow"></div>

          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-2">
            Ready to Experience <span className="gradient-text">AEROX</span>?
          </h2>
          <p className="text-center text-gray-400 mb-8 sm:mb-12">
            Get your pair today and join the revolution.
          </p>

          <form className="space-y-6">
            {/* Full Name */}
            <div>
              <label className="block text-sm font-semibold text-white mb-2">
                Full Name
              </label>
              <input
                type="text"
                id="fullName"
                placeholder="Your name"
                className="
            w-full px-4 py-3 
            bg-[#0F2A42]/60 
            border border-cyan-500/30 
            rounded-lg text-white placeholder-gray-500 
            focus:outline-none 
            focus:border-cyan-400 
            focus:ring-1 focus:ring-cyan-400/50 
            transition-all 
            hover:border-cyan-300
            hover:shadow-[0_0_15px_rgba(0,255,255,0.35)]
          "
              />
            </div>

            {/* Size + Color Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Size */}
              <div>
                <label className="block text-sm font-semibold text-white mb-2">
                  Size
                </label>
                <select
                  id="shoeSize"
                  className="
              w-full px-4 py-3 
              bg-[#0F2A42]/60 
              border border-cyan-500/30 rounded-lg text-white
              focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400/50 
              hover:border-cyan-300 transition-all
            "
                >
                  <option>Select Size</option>
                  {[6, 7, 8, 9, 10, 11, 12, 13].map((size) => (
                    <option key={size} value={size}>
                      US {size}
                    </option>
                  ))}
                </select>
              </div>

              {/* Color */}
              <div>
                <label className="block text-sm font-semibold text-white mb-2">
                  Color
                </label>
                <select
                  id="shoeColor"
                  className="
              w-full px-4 py-3 
              bg-[#0F2A42]/60 
              border border-cyan-500/30 rounded-lg text-white
              focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400/50 
              hover:border-cyan-300 transition-all
            "
                >
                  <option>Pearl White</option>
                  <option>Midnight Black</option>
                  <option>Neon Cyan</option>
                  <option>Electric Blue</option>
                </select>
              </div>
            </div>

            {/* WhatsApp Order Button */}
            <button
              type="button"
              className="
          w-full 
          bg-gradient-to-r from-cyan-400 to-blue-400
          text-black font-semibold text-base h-12 rounded-lg
          hover:from-cyan-300 hover:to-blue-300 
          hover:shadow-[0_0_25px_rgba(0,255,255,0.5)]
          transition-all duration-300
        "
              onClick={() => handleWhatsAppOrder()}
            >
              Order on WhatsApp
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}
