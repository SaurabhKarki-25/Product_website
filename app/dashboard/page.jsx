// src/app/dashboard/page.js

"use client";

import React, { useState, useMemo, useEffect, useCallback } from "react";
import ProtectedRoute from "../components/Protectedroute"; // Adjust path as necessary
import DashboardNavbar from "../components/DashboardNavbar"; // Renamed component
import CartPanel from "../components/CartPanel";
import SectionRow from "../components/products/SectionRow";
import FilterStrip from "../components/products/FilterStrip.js";
import { jsPDF } from "jspdf";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";


// --- CUSTOM HOOK FOR DEBOUNCING (Performance) ---
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

// --- PRODUCT DATA (Moved here for easy access, but could be a JSON file) ---
const products = [
    // TOP DEALS
    { id: 1, name: "Nike Air Max 270", brand: "Nike", category: "Sneakers", segment: "topDeals", price: 7899, mrp: 9999, discount: "21% off", color: "Black/White", size: 42, img: "https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg", tag: "Trending" },
    { id: 2, name: "Adidas Superstar Classic", brand: "Adidas", category: "Sneakers", segment: "topDeals", price: 5599, mrp: 6999, discount: "20% off", color: "White/Black", size: 41, img: "https://images.pexels.com/photos/2529158/pexels-photo-2529158.jpeg", tag: "Best Seller" },
    { id: 3, name: "Puma Smash V2", brand: "Puma", category: "Sneakers", segment: "topDeals", price: 3299, mrp: 4499, discount: "26% off", color: "Navy Blue", size: 42, img: "https://images.pexels.com/photos/19090/pexels-photo.jpg", tag: "Budget Pick" },
    // ... (rest of the product array)
    { id: 4, name: "Nike Court Vision", brand: "Nike", category: "Sneakers", segment: "topDeals", price: 5499, mrp: 6999, discount: "21% off", color: "White", size: 43, img: "https://images.pexels.com/photos/3622615/pexels-photo-3622615.jpeg", tag: "Hot Deal" },
    { id: 5, name: "Adidas Daily 3.0", brand: "Adidas", category: "Sneakers", segment: "topDeals", price: 5199, mrp: 6499, discount: "20% off", color: "Grey", size: 42, img: "https://images.pexels.com/photos/8485186/pexels-photo-8485186.jpeg", tag: "Editor's Choice" },
    { id: 6, name: "Converse All Star High", brand: "Converse", category: "Sneakers", segment: "topDeals", price: 3899, mrp: 4999, discount: "22% off", color: "Black", size: 41, img: "https://images.pexels.com/photos/1598505/pexels-photo-1598505.jpeg", tag: "Classic" },
    { id: 7, name: "Nike Revolution 6", brand: "Nike", category: "Sports", segment: "running", price: 4999, mrp: 6499, discount: "23% off", color: "Red", size: 43, img: "https://images.pexels.com/photos/1401796/pexels-photo-1401796.jpeg", tag: "Running" },
    { id: 8, name: "Adidas Duramo SL 2.0", brand: "Adidas", category: "Sports", segment: "running", price: 4599, mrp: 5999, discount: "23% off", color: "Blue", size: 42, img: "https://images.pexels.com/photos/2529159/pexels-photo-2529159.jpeg", tag: "Training" },
    { id: 9, name: "ASICS Gel-Excite 9", brand: "ASICS", category: "Sports", segment: "running", price: 5999, mrp: 7499, discount: "20% off", color: "Grey", size: 44, img: "https://images.pexels.com/photos/786003/pexels-photo-786003.jpeg", tag: "Comfort" },
    { id: 10, name: "Skechers Go Run Pulse", brand: "Skechers", category: "Sports", segment: "running", price: 5099, mrp: 6399, discount: "20% off", color: "Black", size: 42, img: "https://images.pexels.com/photos/1464623/pexels-photo-1464623.jpeg", tag: "Cushion" },
    { id: 11, name: "Under Armour Surge 3", brand: "Under Armour", category: "Sports", segment: "running", price: 5699, mrp: 6999, discount: "18% off", color: "White/Blue", size: 43, img: "https://images.pexels.com/photos/2529157/pexels-photo-2529157.jpeg", tag: "Performance" },
    { id: 12, name: "Reebok Energy Runner", brand: "Reebok", category: "Sports", segment: "running", price: 4499, mrp: 5999, discount: "25% off", color: "Grey/Orange", size: 41, img: "https://images.pexels.com/photos/325117/pexels-photo-325117.jpeg", tag: "Lightweight" },
    { id: 13, name: "Vans Old Skool", brand: "Vans", category: "Sneakers", segment: "casual", price: 4599, mrp: 5999, discount: "23% off", color: "Black/White", size: 42, img: "https://images.pexels.com/photos/292999/pexels-photo-292999.jpeg", tag: "Classic" },
    { id: 14, name: "Converse Chuck Taylor Low", brand: "Converse", category: "Sneakers", segment: "casual", price: 3999, mrp: 4999, discount: "20% off", color: "White", size: 41, img: "https://images.pexels.com/photos/2529158/pexels-photo-2529158.jpeg", tag: "Iconic" },
    { id: 15, name: "Skechers Street Uno", brand: "Skechers", category: "Sneakers", segment: "casual", price: 5299, mrp: 6699, discount: "20% off", color: "Red", size: 42, img: "https://images.pexels.com/photos/2529149/pexels-photo-2529149.jpeg", tag: "Comfort" },
    { id: 16, name: "Puma Smash Mid", brand: "Puma", category: "Sneakers", segment: "casual", price: 3799, mrp: 4999, discount: "24% off", color: "Black", size: 41, img: "https://images.pexels.com/photos/1598508/pexels-photo-1598508.jpeg", tag: "Daily Wear" },
    { id: 17, name: "Adidas Court Rallye", brand: "Adidas", category: "Sneakers", segment: "casual", price: 4899, mrp: 5999, discount: "18% off", color: "Navy", size: 42, img: "https://images.pexels.com/photos/631313/pexels-photo-631313.jpeg", tag: "Premium" },
    { id: 18, name: "Nike Court Royale", brand: "Nike", category: "Sneakers", segment: "casual", price: 4599, mrp: 5499, discount: "16% off", color: "White", size: 42, img: "https://images.pexels.com/photos/2120021/pexels-photo-2120021.jpeg", tag: "Everyday" },
    { id: 19, name: "Air Jordan 1 Mid", brand: "Nike Jordan", category: "Sneakers", segment: "premium", price: 12999, mrp: 14999, discount: "13% off", color: "Red/Black", size: 43, img: "https://images.pexels.com/photos/4753998/pexels-photo-4753998.jpeg", tag: "Premium" },
    { id: 20, name: "Nike Air Force 1 Triple White", brand: "Nike", category: "Sneakers", segment: "premium", price: 8999, mrp: 9999, discount: "10% off", color: "White", size: 42, img: "https://images.pexels.com/photos/2529149/pexels-photo-2529149.jpeg", tag: "Icon" },
    { id: 21, name: "Air Jordan 4 Retro", brand: "Nike Jordan", category: "Sneakers", segment: "premium", price: 19999, mrp: 23999, discount: "16% off", color: "Blue/Grey", size: 44, img: "https://images.pexels.com/photos/1598506/pexels-photo-1598506.jpeg", tag: "Collector" },
    { id: 22, name: "Nike Air VaporMax 3", brand: "Nike", category: "Sneakers", segment: "premium", price: 15999, mrp: 17999, discount: "12% off", color: "Black", size: 42, img: "https://images.pexels.com/photos/37351/running-shoes.jpg", tag: "Soft Air" },
    { id: 23, name: "Yeezy Boost 350 V2", brand: "Adidas Yeezy", category: "Sneakers", segment: "premium", price: 21999, mrp: 24999, discount: "12% off", color: "Cream", size: 43, img: "https://images.pexels.com/photos/1598504/pexels-photo-1598504.jpeg", tag: "Limited" },
    { id: 24, name: "Nike Air Max Plus 3", brand: "Nike", category: "Sneakers", segment: "premium", price: 14999, mrp: 16999, discount: "12% off", color: "Blue/Black", size: 44, img: "https://images.pexels.com/photos/1407359/pexels-photo-1407359.jpeg", tag: "Top Rated" },
];

export default function Dashboard() {
  const router = useRouter();

  const [rawSearch, setRawSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);

  const debouncedSearch = useDebounce(rawSearch, 300);

  // --- OPTIMIZED FILTERING ---
  const filteredProducts = useMemo(() => {
    const searchLower = debouncedSearch.toLowerCase();
    
    return products.filter((item) => {
      // 1. Filter by the selected category (from FilterStrip)
      const matchCategory = category === "All" || category === item.category || (category === item.segment && !debouncedSearch);
      
      // 2. Filter by search term
      const matchSearch =
        item.name.toLowerCase().includes(searchLower) ||
        item.brand.toLowerCase().includes(searchLower);
      
      return matchCategory && matchSearch;
    });
  }, [debouncedSearch, category]);

  const bySegment = useCallback((segment) =>
    filteredProducts.filter((item) => item.segment === segment),
    [filteredProducts]
  );

  const cartTotal = useMemo(() => 
    cart.reduce((sum, item) => sum + item.price * item.qty, 0),
    [cart]
  );

  // --- CART HANDLERS ---
  const addToCart = useCallback((item) => {
    setCart((prev) => {
      const exists = prev.find((p) => p.id === item.id);
      if (exists) {
        return prev.map((p) =>
          p.id === item.id ? { ...p, qty: p.qty + 1 } : p
        );
      }
      return [...prev, { ...item, qty: 1 }];
    });
    // Open cart for immediate feedback
    setShowCart(true); 
  }, []);

  const sendWhatsAppOrder = () => {
    if (!cart.length) return;
    const phone = "91XXXXXXXXXX";
    let msg = `🧾 *Your ShoeStore Order*\n\n`;
    cart.forEach((item, index) => {
      msg += `${index + 1}. *${item.name}* (${item.brand}) - Qty: ${item.qty}\n`;
    });
    msg += `\n*Total:* ₹${cartTotal.toLocaleString('en-IN')}\n`;
    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(msg)}`, "_blank");
  };

  const downloadPDF = () => {
    if (!cart.length) return;
    const doc = new jsPDF();
    let y = 20;
    doc.setFontSize(18);
    doc.text("ShoeStore Invoice", 20, y);
    // ... (rest of the PDF logic)
    doc.save("shoestore_invoice.pdf");
  };
  
  // --- SUB COMPONENTS (Kept here as they use primary state) ---
  const HeroSection = () => (
    <section className="w-full bg-gradient-to-r from-[#041625] via-[#021018] to-[#041625] text-white px-4 sm:px-6 md:px-10 pt-6 pb-10 rounded-b-3xl shadow-[0_20px_40px_rgba(0,0,0,0.5)]">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-8 text-center md:text-left">
        {/* Left */}
        <div className="flex-1">
          <p className="text-xs sm:text-sm uppercase tracking-[0.3em] text-cyan-300 mb-2">Exclusive Drop</p>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            Step into <span className="text-cyan-400">Premium Comfort</span>.
          </h1>
          <p className="text-white/70 mb-6 max-w-xl mx-auto md:mx-0 text-sm sm:text-base">
            Discover curated collections of sneakers, running shoes and daily wear kicks.
          </p>
          <div className="flex flex-wrap justify-center md:justify-start gap-3">
            <button
              onClick={() => { document.getElementById("top-deals").scrollIntoView({ behavior: "smooth" }); }}
              className="px-5 py-2.5 rounded-xl bg-cyan-500 text-black text-sm sm:text-base font-semibold shadow-[0_0_25px_rgba(0,255,255,0.6)] hover:scale-[1.03] transition-transform"
            >
              Shop Top Deals
            </button>
          </div>
        </div>

        {/* Right */}
        <div className="flex-1 flex justify-center">
          <div className="relative w-56 h-56 sm:w-64 sm:h-64 md:w-72 md:h-72 rounded-full bg-gradient-to-tr from-cyan-500/40 via-transparent to-purple-500/30 flex items-center justify-center shadow-[0_0_45px_rgba(0,255,255,0.5)]">
            <img src="https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg" className="w-44 h-44 sm:w-52 sm:h-52 md:w-60 md:h-60 object-cover rounded-full border-4 border-[#041625]" alt="Hero shoe" />
            <div className="absolute -bottom-3 -right-3 bg-[#041625] border border-cyan-400 rounded-xl px-3 py-1.5 text-[11px] text-cyan-200 shadow-[0_0_20px_rgba(0,255,255,0.4)]">
              ⭐ Top Rated Collection
            </div>
          </div>
        </div>
      </div>
    </section>
  );

  const SearchPanel = () => {
    if (!debouncedSearch) return null;
    
    // Filtered products are used directly here
    const results = filteredProducts.filter(item => item.name.toLowerCase().includes(debouncedSearch.toLowerCase()));

    return (
      <section className="max-w-7xl mx-auto mt-8 sm:mt-10 px-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl md:text-2xl font-bold text-cyan-400">
            Search Results for "{debouncedSearch}" ({results.length})
          </h2>
          <button
            onClick={() => setRawSearch("")}
            className="flex items-center gap-1 text-sm text-red-400 hover:text-red-300 transition-colors"
          >
            Clear Search <X size={16} />
          </button>
        </div>

        <div className="bg-[#041625] border border-cyan-500/30 rounded-xl p-4 sm:p-6">
          {results.length === 0 ? (
            <div className="text-center py-10">
              <Search size={32} className="text-white/40 mx-auto mb-3" />
              <p className="text-white/70 text-lg">
                No results found for "{debouncedSearch}".
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 sm:gap-6 justify-items-center">
              {results.map((item) => (
                <ProductCard key={item.id} item={item} addToCart={addToCart} />
              ))}
            </div>
          )}
        </div>
      </section>
    );
  };
  // -----------------------------------------------------------------------


  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-[#020d14] text-white pb-16">
        {/* NAVBAR */}
        <DashboardNavbar
          search={rawSearch} 
          setSearch={setRawSearch}
          cart={cart}
          showCart={showCart} 
          setShowCart={setShowCart}
          router={router}
        />

        {/* PAGE CONTENT */}
        <main className="pt-16 sm:pt-16 md:pt-16 space-y-6 sm:space-y-8">
          
          {/* HERO */}
          {!debouncedSearch && <HeroSection />}

          {/* FILTER STRIP (Only shown when not searching) */}
          {!debouncedSearch && <FilterStrip category={category} setCategory={setCategory} />}

          {/* Search Panel or Store Sections */}
          {debouncedSearch ? (
            <SearchPanel />
          ) : (
            // STORE SECTIONS
            <>
              <SectionRow
                id="top-deals"
                title="⚡ Top Deals & Flash Sales"
                subtitle="Limited-time prices on classic & trending sneakers."
                items={bySegment("topDeals")}
                addToCart={addToCart}
              />

              <SectionRow
                id="sports"
                title="Running & Sports Shoes"
                subtitle="Performance shoes for running, gym and outdoor training."
                items={bySegment("running")}
                addToCart={addToCart}
              />

              <SectionRow
                id="casual"
                title="Casual & Everyday Sneakers"
                subtitle="Comfortable daily wear sneakers for college and street style."
                items={bySegment("casual")}
                addToCart={addToCart}
              />

              <SectionRow
                id="premium"
                title="Premium & Jordan Collection"
                subtitle="Iconic silhouettes and premium drops for sneakerheads."
                items={bySegment("premium")}
                addToCart={addToCart}
              />
            </>
          )}

          {/* CART PANEL */}
          <CartPanel 
              cart={cart}
              cartTotal={cartTotal}
              showCart={showCart}
              setShowCart={setShowCart}
              sendWhatsAppOrder={sendWhatsAppOrder}
              downloadPDF={downloadPDF}
          />
        </main>

        <style>{`
          .hide-scrollbar::-webkit-scrollbar { display: none; }
          .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        `}</style>
      </div>
    </ProtectedRoute>
  );
}