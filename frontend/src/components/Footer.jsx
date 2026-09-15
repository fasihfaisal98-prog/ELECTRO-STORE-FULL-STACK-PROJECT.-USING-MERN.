import React from 'react';
import { Link } from 'react-router-dom';
import {
  ShoppingBag,
  ShieldCheck,
  Truck,
  RotateCcw,
  Headphones,
  Mail,
  Heart
} from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-12 mt-20 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Value Highlights Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-12 border-b border-slate-800">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-blue-500/10 text-blue-400 flex items-center justify-center shrink-0">
              <Truck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-white font-bold text-sm">Free Express Shipping</h4>
              <p className="text-slate-400 text-xs mt-0.5">On all orders over Rs. 50,000</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-blue-500/10 text-blue-400 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-white font-bold text-sm">100% Genuine Warranty</h4>
              <p className="text-slate-400 text-xs mt-0.5">Authentic products guaranteed</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-blue-500/10 text-blue-400 flex items-center justify-center shrink-0">
              <RotateCcw className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-white font-bold text-sm">7-Day Easy Returns</h4>
              <p className="text-slate-400 text-xs mt-0.5">Hassle-free replacement policy</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-blue-500/10 text-blue-400 flex items-center justify-center shrink-0">
              <Headphones className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-white font-bold text-sm">24/7 Dedicated Support</h4>
              <p className="text-slate-400 text-xs mt-0.5">Instant customer assistance</p>
            </div>
          </div>
        </div>

        {/* Links Grid */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10 py-12 border-b border-slate-800">
          {/* Brand Column */}
          <div className="md:col-span-2">
            <Link to="/" className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <span className="font-extrabold text-xl tracking-tight text-white">
                Electro<span className="text-blue-500">Store</span>
              </span>
            </Link>
            <p className="text-slate-400 text-sm mt-4 leading-relaxed max-w-sm">
              Your premier destination for authentic flagship smartphones, wearable technology, audio gear, and cutting-edge electronic accessories.
            </p>
            <div className="mt-6 flex items-center gap-3 text-xs text-slate-400">
              <span className="flex items-center gap-1">
                <Mail className="w-4 h-4 text-blue-400" /> support@electrostore.com
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-bold text-sm mb-4 uppercase tracking-wider">Quick Links</h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/" className="hover:text-white transition-colors">Home</Link>
              </li>
              <li>
                <Link to="/shop" className="hover:text-white transition-colors">All Products</Link>
              </li>
              <li>
                <Link to="/cart" className="hover:text-white transition-colors">Shopping Cart</Link>
              </li>
              <li>
                <Link to="/my-orders" className="hover:text-white transition-colors">Track Orders</Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="text-white font-bold text-sm mb-4 uppercase tracking-wider">Categories</h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/shop?category=Smartphones" className="hover:text-white transition-colors">Smartphones</Link>
              </li>
              <li>
                <Link to="/shop?category=Smart+Watches" className="hover:text-white transition-colors">Smart Watches</Link>
              </li>
              <li>
                <Link to="/shop?category=Earbuds" className="hover:text-white transition-colors">Earbuds & Audio</Link>
              </li>
              <li>
                <Link to="/shop?category=Chargers" className="hover:text-white transition-colors">Chargers & Power</Link>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className="text-white font-bold text-sm mb-4 uppercase tracking-wider">Help & Policy</h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <span className="text-slate-400">Payment: Cash on Delivery</span>
              </li>
              <li>
                <span className="text-slate-400">Doorstep Delivery</span>
              </li>
              <li>
                <span className="text-slate-400">Privacy Policy</span>
              </li>
              <li>
                <span className="text-slate-400">Terms of Service</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>&copy; {new Date().getFullYear()} ElectroStore MERN. All rights reserved.</p>
          <p className="flex items-center gap-1">
            Built with <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" /> for modern e-commerce
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
