"use client";

import React, { useEffect, useState } from "react";
import { User, Mail, Phone, MapPin, Save, Upload } from "lucide-react";
import { useRouter } from "next/navigation";

export default function Profile() {
  const router = useRouter();

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    address: "",
    bio: "",
    image: "", // NEW FIELD
  });

  const [loading, setLoading] = useState(true);

  // Load user info from localStorage
  useEffect(() => {
    if (typeof window !== "undefined") {
      const loggedIn = localStorage.getItem("loggedIn");
      const userData = localStorage.getItem("user");

      if (loggedIn !== "true" || !userData) {
        router.push("/login");
      } else {
        setUser(JSON.parse(userData));
        setLoading(false);
      }
    }
  }, []);

  // PROFILE IMAGE UPLOAD
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onloadend = () => {
      setUser((prev) => ({ ...prev, image: reader.result }));
      localStorage.setItem(
        "user",
        JSON.stringify({ ...user, image: reader.result })
      );
    };

    reader.readAsDataURL(file);
  };

  // Update profile in localStorage
  const updateProfile = () => {
    localStorage.setItem("user", JSON.stringify(user));
    alert("Profile Updated Successfully!");
  };

  if (loading) return null;

  return (
    <div className="min-h-screen bg-[#020d14] text-white flex items-center justify-center px-4 relative overflow-hidden">

      {/* Background Glow Effects */}
      <div className="absolute w-[450px] h-[450px] bg-cyan-500/20 blur-[150px] rounded-full top-10 left-6 animate-pulse"></div>
      <div className="absolute w-[350px] h-[350px] bg-blue-600/20 blur-[150px] rounded-full bottom-10 right-6 animate-pulse"></div>

      {/* Profile Card */}
      <div className="relative bg-white/5 border border-cyan-500/20 backdrop-blur-xl p-10 rounded-3xl w-full max-w-2xl shadow-[0_0_35px_rgba(0,255,255,0.25)] animate-fadeIn">

        <h1 className="text-3xl font-bold text-cyan-400 drop-shadow-[0_0_10px_cyan] mb-6 text-center">
          My Profile
        </h1>

        {/* Profile Image */}
        <div className="w-full flex flex-col items-center mb-6 gap-3">
          <div className="w-32 h-32 rounded-full border-4 border-cyan-400 shadow-[0_0_20px_rgba(0,255,255,0.5)] overflow-hidden relative group cursor-pointer">

            <img
              src={
                user.image
                  ? user.image
                  : "https://i.imgur.com/4ZQZ4fE.png"
              }
              alt="Profile"
              className="w-full h-full object-cover"
            />

            {/* Image Upload Overlay */}
            <label className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center text-white cursor-pointer transition-all">
              <Upload size={26} className="text-cyan-300" />
              <input type="file" className="hidden" onChange={handleImageUpload} />
            </label>
          </div>

          <p className="text-white/60 text-sm">
            Click on the image to upload a new one
          </p>
        </div>

        {/* Profile Details */}
        <div className="flex flex-col gap-5">

          {/* Name */}
          <div>
            <label className="text-white/80 flex items-center gap-2 mb-1">
              <User size={18} className="text-cyan-300" /> Full Name
            </label>
            <input
              type="text"
              value={user.name}
              onChange={(e) => setUser({ ...user, name: e.target.value })}
              className="w-full p-3 rounded-lg bg-[#041625]/60 border border-cyan-500/40 text-white outline-none shadow-[0_0_10px_rgba(0,255,255,0.15)]"
            />
          </div>

          {/* Email */}
          <div>
            <label className="text-white/80 flex items-center gap-2 mb-1">
              <Mail size={18} className="text-cyan-300" /> Email Address
            </label>
            <input
              type="email"
              value={user.email}
              onChange={(e) => setUser({ ...user, email: e.target.value })}
              className="w-full p-3 rounded-lg bg-[#041625]/60 border border-cyan-500/40 text-white outline-none shadow-[0_0_10px_rgba(0,255,255,0.15)]"
            />
          </div>

          {/* Phone */}
          <div>
            <label className="text-white/80 flex items-center gap-2 mb-1">
              <Phone size={18} className="text-cyan-300" /> Phone Number
            </label>
            <input
              type="text"
              placeholder="Add phone number..."
              value={user.phone || ""}
              onChange={(e) => setUser({ ...user, phone: e.target.value })}
              className="w-full p-3 rounded-lg bg-[#041625]/60 border border-cyan-500/40 text-white outline-none shadow-[0_0_10px_rgba(0,255,255,0.15)]"
            />
          </div>

          {/* Address */}
          <div>
            <label className="text-white/80 flex items-center gap-2 mb-1">
              <MapPin size={18} className="text-cyan-300" /> Address
            </label>
            <input
              type="text"
              placeholder="Add your address..."
              value={user.address || ""}
              onChange={(e) => setUser({ ...user, address: e.target.value })}
              className="w-full p-3 rounded-lg bg-[#041625]/60 border border-cyan-500/40 text-white outline-none shadow-[0_0_10px_rgba(0,255,255,0.15)]"
            />
          </div>

          {/* Bio */}
          <div>
            <label className="text-white/80 flex items-center gap-2 mb-1">
              Bio / About You
            </label>
            <textarea
              placeholder="Write something about yourself..."
              value={user.bio || ""}
              onChange={(e) => setUser({ ...user, bio: e.target.value })}
              className="w-full h-24 p-3 rounded-lg bg-[#041625]/60 border border-cyan-500/40 text-white outline-none shadow-[0_0_10px_rgba(0,255,255,0.15)] resize-none"
            />
          </div>

          {/* Update Button */}
          <button
            onClick={updateProfile}
            className="mt-4 w-full bg-gradient-to-r from-cyan-500 to-blue-600 p-3 rounded-xl text-white text-lg font-semibold shadow-[0_0_20px_rgba(0,255,255,0.5)] hover:shadow-[0_0_35px_rgba(0,255,255,0.6)] transition-all flex items-center justify-center gap-2"
          >
            <Save size={20} /> Update Profile
          </button>
        </div>
      </div>

      {/* Animations */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.7s ease-out forwards;
        }
      `}</style>
    </div>
  );
}
