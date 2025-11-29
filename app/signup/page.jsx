"use client";

import React, { useState } from "react";
import bcrypt from "bcryptjs";
import { useRouter } from "next/navigation";

export default function Signup() {
  const router = useRouter();
  const [form, setForm] = useState({ name: "", email: "", password: "" });

  const handleSignup = (e) => {
    e.preventDefault();

    const salt = bcrypt.genSaltSync(10);
    const hashed = bcrypt.hashSync(form.password, salt);

    const user = {
      name: form.name,
      email: form.email,
      password: hashed,
    };

    localStorage.setItem("user", JSON.stringify(user));
    alert("Signup Successful!");
    router.push("/login");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#020d14] relative overflow-hidden">

      {/* --- Neon Glow Background --- */}
      <div className="absolute w-[500px] h-[500px] bg-cyan-500/20 blur-[150px] rounded-full top-10 left-10 animate-pulse"></div>
      <div className="absolute w-[400px] h-[400px] bg-blue-500/20 blur-[130px] rounded-full bottom-10 right-10 animate-pulse"></div>

      {/* --- Shining overlay --- */}
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-cyan-500/5 to-transparent animate-[shine_6s_linear_infinite]"></div>

      {/* --- Signup Card --- */}
      <div
        className="
        relative backdrop-blur-xl border border-cyan-500/20 bg-white/5 
        p-10 rounded-2xl w-[90%] max-w-md shadow-[0_0_30px_rgba(0,255,255,0.2)]
        animate-fadeIn
      "
      >

        <h1 className="text-4xl font-bold text-cyan-400 mb-8 text-center drop-shadow-[0_0_10px_cyan]">
          Create Account
        </h1>

        <form onSubmit={handleSignup} className="flex flex-col gap-5">

          {/* Name */}
          <input
            type="text"
            placeholder="Full Name"
            required
            className="
              w-full p-3 px-4 rounded-xl bg-[#041625]/60 border border-cyan-500/30 
              text-white focus:border-cyan-400 outline-none transition-all duration-300
              shadow-[0_0_10px_rgba(0,255,255,0.1)]
              hover:shadow-[0_0_18px_rgba(0,255,255,0.3)]
            "
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />

          {/* Email */}
          <input
            type="email"
            placeholder="Email Address"
            required
            className="
              w-full p-3 px-4 rounded-xl bg-[#041625]/60 border border-cyan-500/30 
              text-white focus:border-cyan-400 outline-none transition-all duration-300
              shadow-[0_0_10px_rgba(0,255,255,0.1)]
              hover:shadow-[0_0_18px_rgba(0,255,255,0.3)]
            "
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />

          {/* Password */}
          <input
            type="password"
            placeholder="Password"
            required
            className="
              w-full p-3 px-4 rounded-xl bg-[#041625]/60 border border-cyan-500/30 
              text-white focus:border-cyan-400 outline-none transition-all duration-300
              shadow-[0_0_10px_rgba(0,255,255,0.1)]
              hover:shadow-[0_0_18px_rgba(0,255,255,0.3)]
            "
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />

          {/* Signup Button */}
          <button
            type="submit"
            className="
              mt-4 w-full p-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600
              text-lg font-semibold text-white tracking-wide
              shadow-[0_0_20px_rgba(0,255,255,0.4)]
              hover:shadow-[0_0_30px_rgba(0,255,255,0.7)]
              transition-all duration-300 relative overflow-hidden
            "
          >
            <span className="relative z-10">Sign Up</span>

            {/* Shine Animation */}
            <div
              className="
                absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent 
                translate-x-[-100%] hover:translate-x-[200%]
                transition-transform duration-700
              "
            ></div>
          </button>
        </form>

        {/* Already Have Account */}
        <p className="text-white/60 text-center mt-6">
          Already have an account?{" "}
          <span
            className="text-cyan-400 cursor-pointer hover:underline"
            onClick={() => router.push("/login")}
          >
            Login
          </span>
        </p>

      </div>

      {/* Custom Animations */}
      <style>{`
        @keyframes shine {
          0% {transform: translateX(-100%);}
          100% {transform: translateX(200%);}
        }

        @keyframes fadeIn {
          from {opacity: 0; transform: translateY(20px);}
          to {opacity: 1; transform: translateY(0);}
        }

        .animate-fadeIn {
          animation: fadeIn 1s ease-out forwards;
        }
      `}</style>
    </div>
  );
}
