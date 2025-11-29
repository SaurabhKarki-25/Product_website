// src/components/CartPanel.js

import React from 'react';
import { X } from 'lucide-react';

export default function CartPanel({ cart, cartTotal, showCart, setShowCart, sendWhatsAppOrder, downloadPDF }) {
  if (!showCart) return null;

  return (
    <div 
      className="fixed inset-x-4 top-24 md:top-24 md:right-6 md:left-auto bg-[#03131b] border border-cyan-500/40 rounded-xl w-auto md:w-80 p-4 shadow-[0_0_25px_rgba(0,255,255,0.4)] z-50 
      transition-all duration-300 ease-out transform translate-y-0"
    >
      <h2 className="text-base sm:text-lg font-semibold text-cyan-300 mb-3">
        Your Cart
      </h2>
      <button onClick={() => setShowCart(false)} className="absolute top-4 right-4 text-white/50 hover:text-white transition-colors">
        <X size={20} />
      </button>

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
            Total: ₹{cartTotal.toLocaleString('en-IN')}
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
  );
}