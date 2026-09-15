import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Sparkles,
  Smartphone,
  Watch,
  Headphones,
  Zap,
  BatteryCharging,
  Speaker,
  CheckCircle2,
  TrendingUp,
  Award,
  Clock
} from 'lucide-react';
import { productService } from '../services/productService';
import ProductGrid from '../components/ProductGrid';
import Loading from '../components/Loading';

export const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await productService.getProducts();
        if (data && data.products) {
          setProducts(data.products);
        }
      } catch (err) {
        console.error('Failed to load products for homepage:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const categories = [
    { name: 'Smartphones', icon: Smartphone, count: '10+ Models', color: 'from-blue-500 to-indigo-500' },
    { name: 'Smart Watches', icon: Watch, count: 'Top Wearables', color: 'from-indigo-500 to-purple-500' },
    { name: 'Earbuds', icon: Headphones, count: 'Hi-Fi Audio', color: 'from-purple-500 to-pink-500' },
    { name: 'Chargers', icon: Zap, count: 'Fast GaN Tech', color: 'from-amber-500 to-orange-500' },
    { name: 'Power Banks', icon: BatteryCharging, count: 'Heavy Duty', color: 'from-emerald-500 to-teal-500' },
    { name: 'Speakers', icon: Speaker, count: 'Booming Bass', color: 'from-sky-500 to-blue-500' },
  ];

  // Slice featured and popular sets
  const featuredProducts = products.slice(0, 4);
  const popularProducts = products.slice(4, 8);

  return (
    <div className="space-y-16 sm:space-y-24">
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 text-white shadow-2xl">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(59,130,246,0.2),transparent_70%)]" />
        <div className="relative max-w-7xl mx-auto px-6 sm:px-12 py-16 sm:py-24 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-300 text-xs font-semibold tracking-wide">
              <Sparkles className="w-4 h-4 text-blue-400" /> NEXT-GEN TECH ARRIVALS
            </div>

            <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight leading-[1.1]">
              Shop Smart. <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-sky-300 to-indigo-300">
                Shop Easy.
              </span>
            </h1>

            <p className="text-slate-300 text-base sm:text-lg max-w-xl leading-relaxed">
              Discover authentic flagship smartphones, studio-grade audio, and high-performance electronic essentials with guaranteed genuine warranty and direct cash on delivery.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Link
                to="/shop"
                className="px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-2xl shadow-lg shadow-blue-600/30 transition-all hover:scale-105 active:scale-95 flex items-center gap-2.5"
              >
                Shop Now <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                to="/shop?category=Smartphones"
                className="px-8 py-4 bg-white/10 hover:bg-white/15 text-white font-bold rounded-2xl border border-white/10 backdrop-blur-md transition-all hover:scale-105 active:scale-95"
              >
                View Smartphones
              </Link>
            </div>

            {/* Quick social proof metrics */}
            <div className="grid grid-cols-3 gap-6 pt-6 border-t border-slate-800 text-slate-300">
              <div>
                <p className="text-2xl font-extrabold text-white">100%</p>
                <p className="text-xs text-slate-400">Genuine Tech</p>
              </div>
              <div>
                <p className="text-2xl font-extrabold text-white">Fast</p>
                <p className="text-xs text-slate-400">Home Delivery</p>
              </div>
              <div>
                <p className="text-2xl font-extrabold text-white">COD</p>
                <p className="text-xs text-slate-400">Pay on Arrival</p>
              </div>
            </div>
          </div>

          {/* Hero Visual Image Card */}
          <div className="relative lg:h-[460px] flex items-center justify-center">
            <div className="relative w-full max-w-md aspect-square rounded-3xl overflow-hidden shadow-2xl border border-white/10 bg-slate-800">
              <img
                src="https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=800&q=80"
                alt="Flagship Smartphone Showcase"
                className="w-full h-full object-cover object-center transform hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-80" />
              <div className="absolute bottom-6 left-6 right-6">
                <span className="bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                  Featured Release
                </span>
                <h3 className="text-xl font-bold text-white mt-2">Samsung Galaxy S24 Ultra</h3>
                <p className="text-slate-300 text-xs mt-1">Titanium frame, 200MP Quad Tele & Galaxy AI</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. PRODUCT CATEGORIES */}
      <section>
        <div className="flex items-end justify-between mb-8">
          <div>
            <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">Explore Catalog</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">Product Categories</h2>
          </div>
          <Link
            to="/shop"
            className="text-sm font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1 group"
          >
            All Categories <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map((cat, idx) => {
            const Icon = cat.icon;
            return (
              <Link
                key={idx}
                to={`/shop?category=${encodeURIComponent(cat.name)}`}
                className="group bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-md hover:border-blue-300 transition-all text-center flex flex-col items-center"
              >
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-tr ${cat.color} text-white flex items-center justify-center mb-3 shadow-md group-hover:scale-110 transition-transform`}>
                  <Icon className="w-7 h-7" />
                </div>
                <h4 className="font-bold text-slate-800 text-sm group-hover:text-blue-600 transition-colors">
                  {cat.name}
                </h4>
                <p className="text-xs text-slate-400 mt-0.5">{cat.count}</p>
              </Link>
            );
          })}
        </div>
      </section>

      {/* 3. FEATURED PRODUCTS */}
      <section>
        <div className="flex items-end justify-between mb-8">
          <div>
            <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">Handpicked For You</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">Featured Products</h2>
          </div>
          <Link
            to="/shop"
            className="text-sm font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1 group"
          >
            Browse All <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {loading ? (
          <Loading text="Loading featured gadgets..." />
        ) : (
          <ProductGrid products={featuredProducts.length > 0 ? featuredProducts : products} />
        )}
      </section>

      {/* 4. SPECIAL OFFERS BANNER */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-3xl p-8 sm:p-12 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="space-y-3 max-w-xl text-center md:text-left">
          <span className="bg-white/20 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
            Limited Time Promo
          </span>
          <h3 className="text-2xl sm:text-4xl font-extrabold leading-tight">
            Up to 28% Off on Premium Accessories & Chargers
          </h3>
          <p className="text-blue-100 text-sm">
            Upgrade your tech ecosystem with ultra-fast GaN chargers, durable braided cables, and power banks at unmatched discounts.
          </p>
        </div>
        <Link
          to="/shop?category=Accessories"
          className="px-8 py-3.5 bg-white text-blue-600 hover:bg-slate-100 font-bold rounded-xl shadow-md transition-all hover:scale-105 active:scale-95 shrink-0"
        >
          Claim Offers
        </Link>
      </section>

      {/* 5. POPULAR PRODUCTS */}
      <section>
        <div className="flex items-end justify-between mb-8">
          <div>
            <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">Top Sellers</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">Popular Gadgets</h2>
          </div>
          <Link
            to="/shop"
            className="text-sm font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1 group"
          >
            See More <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {loading ? (
          <Loading text="Loading popular items..." />
        ) : (
          <ProductGrid products={popularProducts.length > 0 ? popularProducts : products} />
        )}
      </section>

      {/* 6. WHY CHOOSE US & CUSTOMER BENEFITS */}
      <section className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200/80 shadow-sm">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">Trust & Reliability</span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">Why Choose ElectroStore?</h2>
          <p className="text-slate-500 text-sm mt-2">
            We provide seamless online shopping for all your digital gadget essentials with complete peace of mind.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100">
            <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center mb-4">
              <Award className="w-6 h-6" />
            </div>
            <h4 className="font-bold text-slate-900 text-base mb-2">Original Warranty</h4>
            <p className="text-slate-600 text-sm leading-relaxed">
              Every device is 100% genuine with authentic serial numbers and manufacturer backed replacement support.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100">
            <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center mb-4">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h4 className="font-bold text-slate-900 text-base mb-2">Simple Cash On Delivery</h4>
            <p className="text-slate-600 text-sm leading-relaxed">
              No complicated online payment forms or credit cards required. Inspect your package and pay cash right at your doorstep.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100">
            <div className="w-12 h-12 rounded-xl bg-indigo-100 text-indigo-600 flex items-center justify-center mb-4">
              <Clock className="w-6 h-6" />
            </div>
            <h4 className="font-bold text-slate-900 text-base mb-2">Super Fast Dispatch</h4>
            <p className="text-slate-600 text-sm leading-relaxed">
              Orders placed before 2 PM are packaged and dispatched on the same business day with verified courier tracking.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
