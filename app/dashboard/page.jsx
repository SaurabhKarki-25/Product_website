"use client";

import React, { useState, useMemo, useEffect, useCallback } from "react";
import ProtectedRoute from "../components/Protectedroute";
import DashboardNavbar from "../components/DashboardNavbar"; // Assuming this is your responsive version
import { jsPDF } from "jspdf";
import { useRouter } from "next/navigation";
import { Search, X } from "lucide-react"; // Import for the search panel

// =========================================================================
// 🚀 1. CUSTOM HOOK FOR DEBOUNCING (Performance Improvement)
// =========================================================================
const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};

// =========================================================================
// 2. MAIN DASHBOARD COMPONENT
// =========================================================================
export default function Dashboard() {
  const router = useRouter();

  const [rawSearch, setRawSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);

  // Debounce the raw search input by 300ms
  const debouncedSearch = useDebounce(rawSearch, 300);

  // ================== PRODUCT DATA (Same as before) ==================
  const products = [
    // TOP DEALS
    { id: 1, name: "Nike Air Max 270", brand: "Nike", category: "Sneakers", segment: "topDeals", price: 7899, mrp: 9999, discount: "21% off", color: "Black/White", size: 42, img: "https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg", tag: "Trending" },
    { id: 2, name: "Adidas Superstar Classic", brand: "Adidas", category: "Sneakers", segment: "topDeals", price: 5599, mrp: 6999, discount: "20% off", color: "White/Black", size: 41, img: "https://images.pexels.com/photos/2529158/pexels-photo-2529158.jpeg", tag: "Best Seller" },
    { id: 3, name: "Puma Smash V2", brand: "Puma", category: "Sneakers", segment: "topDeals", price: 3299, mrp: 4499, discount: "26% off", color: "Navy Blue", size: 42, img: "https://images.pexels.com/photos/19090/pexels-photo.jpg", tag: "Budget Pick" },
    { id: 4, name: "Nike Court Vision", brand: "Nike", category: "Sneakers", segment: "topDeals", price: 5499, mrp: 6999, discount: "21% off", color: "White", size: 43, img: "https://images.pexels.com/photos/3622615/pexels-photo-3622615.jpeg", tag: "Hot Deal" },
    { id: 5, name: "Adidas Daily 3.0", brand: "Adidas", category: "Sneakers", segment: "topDeals", price: 5199, mrp: 6499, discount: "20% off", color: "Grey", size: 42, img: "https://images.pexels.com/photos/8485186/pexels-photo-8485186.jpeg", tag: "Editor's Choice" },
    { id: 6, name: "Converse All Star High", brand: "Converse", category: "Sneakers", segment: "topDeals", price: 3899, mrp: 4999, discount: "22% off", color: "Black", size: 41, img: "https://images.pexels.com/photos/1598505/pexels-photo-1598505.jpeg", tag: "Classic" },
    // RUNNING / SPORTS
    { id: 7, name: "Nike Revolution 6", brand: "Nike", category: "Sports", segment: "running", price: 4999, mrp: 6499, discount: "23% off", color: "Red", size: 43, img: "https://images.pexels.com/photos/1401796/pexels-photo-1401796.jpeg", tag: "Running" },
    { id: 8, name: "Adidas Duramo SL 2.0", brand: "Adidas", category: "Sports", segment: "running", price: 4599, mrp: 5999, discount: "23% off", color: "Blue", size: 42, img: "https://images.pexels.com/photos/2529159/pexels-photo-2529159.jpeg", tag: "Training" },
    { id: 9, name: "ASICS Gel-Excite 9", brand: "ASICS", category: "Sports", segment: "running", price: 5999, mrp: 7499, discount: "20% off", color: "Grey", size: 44, img: "https://images.pexels.com/photos/786003/pexels-photo-786003.jpeg", tag: "Comfort" },
    { id: 10, name: "Skechers Go Run Pulse", brand: "Skechers", category: "Sports", segment: "running", price: 5099, mrp: 6399, discount: "20% off", color: "Black", size: 42, img: "https://images.pexels.com/photos/1464623/pexels-photo-1464623.jpeg", tag: "Cushion" },
    { id: 11, name: "Under Armour Surge 3", brand: "Under Armour", category: "Sports", segment: "running", price: 5699, mrp: 6999, discount: "18% off", color: "White/Blue", size: 43, img: "https://images.pexels.com/photos/2529157/pexels-photo-2529157.jpeg", tag: "Performance" },
    { id: 12, name: "Reebok Energy Runner", brand: "Reebok", category: "Sports", segment: "running", price: 4499, mrp: 5999, discount: "25% off", color: "Grey/Orange", size: 41, img: "https://images.pexels.com/photos/325117/pexels-photo-325117.jpeg", tag: "Lightweight" },
    // CASUAL
    { id: 13, name: "Vans Old Skool", brand: "Vans", category: "Sneakers", segment: "casual", price: 4599, mrp: 5999, discount: "23% off", color: "Black/White", size: 42, img: "https://images.pexels.com/photos/292999/pexels-photo-292999.jpeg", tag: "Classic" },
    { id: 14, name: "Converse Chuck Taylor Low", brand: "Converse", category: "Sneakers", segment: "casual", price: 3999, mrp: 4999, discount: "20% off", color: "White", size: 41, img: "https://images.pexels.com/photos/2529158/pexels-photo-2529158.jpeg", tag: "Iconic" },
    { id: 15, name: "Skechers Street Uno", brand: "Skechers", category: "Sneakers", segment: "casual", price: 5299, mrp: 6699, discount: "20% off", color: "Red", size: 42, img: "https://images.pexels.com/photos/2529149/pexels-photo-2529149.jpeg", tag: "Comfort" },
    { id: 16, name: "Puma Smash Mid", brand: "Puma", category: "Sneakers", segment: "casual", price: 3799, mrp: 4999, discount: "24% off", color: "Black", size: 41, img: "https://images.pexels.com/photos/1598508/pexels-photo-1598508.jpeg", tag: "Daily Wear" },
    { id: 17, name: "Adidas Court Rallye", brand: "Adidas", category: "Sneakers", segment: "casual", price: 4899, mrp: 5999, discount: "18% off", color: "Navy", size: 42, img: "https://images.pexels.com/photos/631313/pexels-photo-631313.jpeg", tag: "Premium" },
    { id: 18, name: "Nike Court Royale", brand: "Nike", category: "Sneakers", segment: "casual", price: 4599, mrp: 5499, discount: "16% off", color: "White", size: 42, img: "https://images.pexels.com/photos/2120021/pexels-photo-2120021.jpeg", tag: "Everyday" },
    // PREMIUM
    { id: 19, name: "Air Jordan 1 Mid", brand: "Nike Jordan", category: "Sneakers", segment: "premium", price: 12999, mrp: 14999, discount: "13% off", color: "Red/Black", size: 43, img: "https://images.pexels.com/photos/4753998/pexels-photo-4753998.jpeg", tag: "Premium" },
    { id: 20, name: "Nike Air Force 1 Triple White", brand: "Nike", category: "Sneakers", segment: "premium", price: 8999, mrp: 9999, discount: "10% off", color: "White", size: 42, img: "https://images.pexels.com/photos/2529149/pexels-photo-2529149.jpeg", tag: "Icon" },
    { id: 21, name: "Air Jordan 4 Retro", brand: "Nike Jordan", category: "Sneakers", segment: "premium", price: 19999, mrp: 23999, discount: "16% off", color: "Blue/Grey", size: 44, img: "https://images.pexels.com/photos/1598506/pexels-photo-1598506.jpeg", tag: "Collector" },
    { id: 22, name: "Nike Air VaporMax 3", brand: "Nike", category: "Sneakers", segment: "premium", price: 15999, mrp: 17999, discount: "12% off", color: "Black", size: 42, img: "https://images.pexels.com/photos/37351/running-shoes.jpg", tag: "Soft Air" },
    { id: 23, name: "Yeezy Boost 350 V2", brand: "Adidas Yeezy", category: "Sneakers", segment: "premium", price: 21999, mrp: 24999, discount: "12% off", color: "Cream", size: 43, img: "https://images.pexels.com/photos/1598504/pexels-photo-1598504.jpeg", tag: "Limited" },
    { id: 24, name: "Nike Air Max Plus 3", brand: "Nike", category: "Sneakers", segment: "premium", price: 14999, mrp: 16999, discount: "12% off", color: "Blue/Black", size: 44, img: "https://images.pexels.com/photos/1407359/pexels-photo-1407359.jpeg", tag: "Top Rated" },
  ];

  // =========================================================================
  // ⚡ 3. OPTIMIZED FILTERING with useMemo
  // =========================================================================
  const filteredProducts = useMemo(() => {
    // Only run this expensive filter when products, debouncedSearch, or category changes.
    const searchLower = debouncedSearch.toLowerCase();
    
    return products.filter((item) => {
      const matchCategory = category === "All" ? true : item.category === category;
      
      const matchSearch =
        item.name.toLowerCase().includes(searchLower) ||
        item.brand.toLowerCase().includes(searchLower);
      
      return matchCategory && matchSearch;
    });
  }, [products, debouncedSearch, category]);

  // Grouping logic is fast as it uses the pre-filtered array
  const bySegment = useCallback((segment) =>
    filteredProducts.filter((item) => item.segment === segment),
    [filteredProducts]
  );

  // ================== CART LOGIC ==================
  const addToCart = (item) => {
    setCart((prev) => {
      const exists = prev.find((p) => p.id === item.id);
      if (exists) {
        return prev.map((p) =>
          p.id === item.id ? { ...p, qty: p.qty + 1 } : p
        );
      }
      return [...prev, { ...item, qty: 1 }];
    });
  };

  // Cart total also uses useMemo for optimization
  const cartTotal = useMemo(() => 
    cart.reduce((sum, item) => sum + item.price * item.qty, 0),
    [cart]
  );

  const sendWhatsAppOrder = () => {
    if (!cart.length) return;
    // ... (unchanged WhatsApp logic)
    const phone = "916396088269";
    let msg = `🧾 *Your ShoeStore Order*\n\n`;

    cart.forEach((item, index) => {
      msg += `${index + 1}. *${item.name}* (${item.brand})\n`;
      msg += `   Category: ${item.category}\n`;
      msg += `   Qty: ${item.qty}\n`;
      msg += `   Price: ₹${item.price} x ${item.qty} = ₹${item.price * item.qty}\n`;
      msg += `   Image: ${item.img}\n\n`;
    });

    msg += `------------------------\n`;
    msg += `*Total:* ₹${cartTotal}\n`;
    msg += `------------------------\n\n`;
    msg += `📍 Please share your *Name*, *Address* & *Phone Number*.\n`;
    msg += `🙏 Thank you for shopping with *ShoeStore*!`;

    window.open(
      `https://wa.me/${phone}?text=${encodeURIComponent(msg)}`,
      "_blank"
    );
  };

  const downloadPDF = () => {
    if (!cart.length) return;
    // ... (unchanged PDF logic)
    const doc = new jsPDF();
    let y = 20;

    doc.setFontSize(18);
    doc.text("ShoeStore Invoice", 20, y);
    y += 10;

    doc.setFontSize(12);
    doc.text(`Date: ${new Date().toLocaleString()}`, 20, y);
    y += 10;

    cart.forEach((item, idx) => {
      doc.text(
        `${idx + 1}. ${item.name} (${item.brand}) - Qty: ${item.qty}  - ₹${item.qty * item.price}`,
        20,
        y
      );
      y += 8;
    });

    y += 6;
    doc.text(`------------------------------`, 20, y);
    y += 10;
    doc.setFontSize(14);
    doc.text(`Total: ₹${cartTotal}`, 20, y);

    doc.save("shoestore_invoice.pdf");
  };
  // =========================================================================

  // ================== SECTION COMPONENTS ==================
  const Card = ({ item }) => (
    <div
      key={item.id}
      className="min-w-[160px] max-w-[160px] sm:min-w-[200px] sm:max-w-[200px] bg-[#041625]/80 
               border border-cyan-500/20 rounded-2xl p-3 sm:p-4
               shadow-[0_0_15px_rgba(0,255,255,0.15)]
               hover:shadow-[0_0_35px_rgba(0,255,255,0.5)]
               transition-all hover:-translate-y-2 
               hover:scale-[1.03] relative overflow-hidden"
    >
      {item.tag && (
        <span className="absolute top-2 left-2 bg-cyan-500/20 
                         text-cyan-200 text-[9px] sm:text-[10px] px-2 py-1 
                         rounded-full border border-cyan-400/60">
          {item.tag}
        </span>
      )}

      <div className="w-full h-28 sm:h-32 flex justify-center items-center">
        <img
          src={item.img}
          alt={item.name}
          className="w-auto h-full object-contain rounded-xl"
        />
      </div>

      <p className="text-[11px] text-white/70 mt-1">{item.brand}</p>

      <p className="text-sm sm:text-base font-semibold text-white line-clamp-2 mt-1">
        {item.name}
      </p>

      <div className="flex items-center gap-2 mt-1">
        <span className="text-cyan-300 font-bold text-base sm:text-lg">
          ₹{item.price}
        </span>
        <span className="text-white/40 text-[10px] sm:text-xs line-through">
          ₹{item.mrp}
        </span>
        <span className="text-green-400 text-[9px] sm:text-[10px]">
          {item.discount}
        </span>
      </div>

      <p className="text-[10px] sm:text-[11px] text-white/50">
        Size {item.size} • {item.color}
      </p>

      <button
        onClick={() => addToCart(item)}
        className="mt-2 sm:mt-3 w-full bg-cyan-500/20 border border-cyan-400 
                   text-cyan-200 text-xs sm:text-sm py-1.5 sm:py-2 rounded-lg 
                   hover:bg-cyan-500/30 transition-all"
      >
        Add to Cart
      </button>
    </div>
  );

  const HeroSection = () => (
    <section className="w-full bg-gradient-to-r from-[#041625] via-[#021018] to-[#041625] text-white px-4 sm:px-6 md:px-10 pt-6 pb-10 rounded-b-3xl shadow-[0_20px_40px_rgba(0,0,0,0.5)]">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-8 text-center md:text-left">
        {/* Left */}
        <div className="flex-1">
          <p className="text-xs sm:text-sm uppercase tracking-[0.3em] text-cyan-300 mb-2">
            Exclusive Drop
          </p>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            Step into <span className="text-cyan-400">Premium Comfort</span>.
          </h1>
          <p className="text-white/70 mb-6 max-w-xl mx-auto md:mx-0 text-sm sm:text-base">
            Discover curated collections of sneakers, running shoes and daily
            wear kicks – inspired by real marketplace store layouts.
          </p>
          <div className="flex flex-wrap justify-center md:justify-start gap-3">
            <button
              onClick={() => {
                const el = document.getElementById("top-deals");
                if (el) el.scrollIntoView({ behavior: "smooth" });
              }}
              className="px-5 py-2.5 rounded-xl bg-cyan-500 text-black text-sm sm:text-base font-semibold shadow-[0_0_25px_rgba(0,255,255,0.6)] hover:scale-[1.03] transition-transform"
            >
              Shop Top Deals
            </button>
            <button
              onClick={() => {
                const el = document.getElementById("premium");
                if (el) el.scrollIntoView({ behavior: "smooth" });
              }}
              className="px-5 py-2.5 rounded-xl border border-cyan-400 text-cyan-300 text-sm sm:text-base hover:bg-cyan-500/10 transition-all"
            >
              Explore Premium
            </button>
          </div>
        </div>

        {/* Right */}
        <div className="flex-1 flex justify-center">
          <div className="relative w-56 h-56 sm:w-64 sm:h-64 md:w-72 md:h-72 rounded-full bg-gradient-to-tr from-cyan-500/40 via-transparent to-purple-500/30 flex items-center justify-center shadow-[0_0_45px_rgba(0,255,255,0.5)]">
            <img
              src="https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg"
              className="w-44 h-44 sm:w-52 sm:h-52 md:w-60 md:h-60 object-cover rounded-full border-4 border-[#041625]"
              alt="Hero shoe"
            />
            <div className="absolute -bottom-3 -right-3 bg-[#041625] border border-cyan-400 rounded-xl px-3 py-1.5 text-[11px] text-cyan-200 shadow-[0_0_20px_rgba(0,255,255,0.4)]">
              ⭐ Top Rated Collection
            </div>
          </div>
        </div>
      </div>
    </section>
  );

  const SectionRow = ({ id, title, subtitle, items }) => {
    if (!items.length) return null;

    return (
      <section id={id} className="max-w-7xl mx-auto mt-8 sm:mt-10 px-4">
        <div className="flex justify-between items-end mb-3">
          <div>
            <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-cyan-300">
              {title}
            </h2>
            {subtitle && (
              <p className="text-[11px] sm:text-xs md:text-sm text-white/60 mt-1">
                {subtitle}
              </p>
            )}
          </div>
        </div>

        <div className="flex gap-3 sm:gap-4 overflow-x-auto pb-3 hide-scrollbar">
          {items.map((item) => (
            <Card key={item.id} item={item} />
          ))}
        </div>
      </section>
    );
  };
  
  // =========================================================================
  // ⚡ 4. DEDICATED SEARCH PANEL/RESULTS
  // =========================================================================
  const SearchPanel = () => {
    if (!debouncedSearch) return null;

    return (
      <section className="max-w-7xl mx-auto mt-8 sm:mt-10 px-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl md:text-2xl font-bold text-cyan-400">
            Search Results for "{debouncedSearch}"
          </h2>
          <button
            onClick={() => setRawSearch("")}
            className="flex items-center gap-1 text-sm text-red-400 hover:text-red-300 transition-colors"
          >
            Clear Search <X size={16} />
          </button>
        </div>

        <div className="bg-[#041625] border border-cyan-500/30 rounded-xl p-4 sm:p-6 min-h-[200px]">
          {filteredProducts.length === 0 ? (
            <div className="text-center py-10">
              <Search size={32} className="text-white/40 mx-auto mb-3" />
              <p className="text-white/70 text-lg">
                No results found for "{debouncedSearch}".
              </p>
              <p className="text-sm text-white/50 mt-1">
                Try searching for a different brand or shoe name.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 sm:gap-6 justify-items-center">
              {filteredProducts.map((item) => (
                <Card key={item.id} item={item} />
              ))}
            </div>
          )}
        </div>
      </section>
    );
  };
  // =========================================================================

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-[#020d14] text-white pb-16">
        {/* NAVBAR */}
        {/* Pass rawSearch to Navbar for immediate visual feedback on input */}
        <DashboardNavbar
          search={rawSearch} 
          setSearch={setRawSearch}
          category={category}
          setCategory={setCategory}
          cart={cart}
          setShowCart={setShowCart}
          router={router}
        />

        {/* PAGE CONTENT (padding-top for fixed navbar) */}
        <main className="pt-24 sm:pt-24 md:pt-24 space-y-6 sm:space-y-8">
          
          {/* HERO */}
          {!debouncedSearch && <HeroSection />}

          {/* SEARCH PANEL: Shows up when search is active */}
          {debouncedSearch ? (
            <SearchPanel />
          ) : (
            // STORE SECTIONS: Only show sections when search is inactive
            <>
              <SectionRow
                id="top-deals"
                title="Top Deals on Sneakers"
                subtitle="Handpicked offers on classic & trending sneakers."
                items={bySegment("topDeals")}
              />

              <SectionRow
                id="sports"
                title="Running & Sports Shoes"
                subtitle="Performance shoes for running, gym and outdoor training."
                items={bySegment("running")}
              />

              <SectionRow
                id="casual"
                title="Casual & Everyday Sneakers"
                subtitle="Comfortable daily wear sneakers for college and street style."
                items={bySegment("casual")}
              />

              <SectionRow
                id="premium"
                title="Premium & Jordan Collection"
                subtitle="Iconic silhouettes and premium drops for sneakerheads."
                items={bySegment("premium")}
              />
            </>
          )}

          {/* CART PANEL */}
          {showCart && (
            <div className="fixed inset-x-4 top-24 md:top-24 md:right-6 md:left-auto bg-[#03131b] border border-cyan-500/40 rounded-xl w-auto md:w-80 p-4 shadow-[0_0_25px_rgba(0,255,255,0.4)] z-50">
              <h2 className="text-base sm:text-lg font-semibold text-cyan-300 mb-3">
                Your Cart
              </h2>

              {cart.length === 0 ? (
                <p className="text-white/60 text-sm">No items added yet.</p>
              ) : (
                <>
                  <div className="max-h-64 overflow-y-auto pr-1">
                    {cart.map((item) => (
                      <div
                        key={item.id}
                        className="flex items-center gap-3 border-b border-white/10 pb-2 mb-2"
                      >
                        <img
                          src={item.img}
                          className="w-10 h-10 rounded-md object-cover"
                          alt={item.name}
                        />
                        <div className="flex-1">
                          <p className="text-xs font-semibold">{item.name}</p>
                          <p className="text-[10px] text-white/60">
                            Qty: {item.qty} • {item.brand}
                          </p>
                        </div>
                        <p className="text-xs text-cyan-300">
                          ₹{item.qty * item.price}
                        </p>
                      </div>
                    ))}
                  </div>

                  <div className="mt-2 text-right text-sm text-cyan-300 font-semibold">
                    Total: ₹{cartTotal}
                  </div>

                  <button
                    onClick={sendWhatsAppOrder}
                    className="w-full mt-3 bg-cyan-500/20 border border-cyan-400 rounded-lg p-2 text-xs text-cyan-200 hover:bg-cyan-500/30"
                  >
                    Proceed Order on WhatsApp
                  </button>

                  <button
                    onClick={downloadPDF}
                    className="w-full mt-2 bg-[#041625] border border-cyan-300/50 rounded-lg p-2 text-xs text-white/90 hover:bg-cyan-500/10"
                  >
                    Download Invoice (PDF)
                  </button>
                </>
              )}
            </div>
          )}

          {/* Global style for hiding scrollbars on rows */}
          <style>{`
            .hide-scrollbar::-webkit-scrollbar { display: none; }
            .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
          `}</style>
        </main>
      </div>
    </ProtectedRoute>
  );
}