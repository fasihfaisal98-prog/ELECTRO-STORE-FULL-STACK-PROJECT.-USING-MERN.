import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { productService } from '../services/productService';
import ProductGrid from '../components/ProductGrid';
import SearchBar from '../components/SearchBar';
import Loading from '../components/Loading';
import { SlidersHorizontal, RotateCcw, Filter } from 'lucide-react';

export const Shop = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Filters state
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || 'All');
  const [selectedBrand, setSelectedBrand] = useState('All');
  const [sortBy, setSortBy] = useState('newest');
  const [searchQuery, setSearchQuery] = useState('');
  const [searchedProducts, setSearchedProducts] = useState(null);

  // Sync category state with URL param
  useEffect(() => {
    const cat = searchParams.get('category');
    if (cat) {
      setSelectedCategory(cat);
    }
  }, [searchParams]);

  // Fetch all products from API on mount
  useEffect(() => {
    const fetchCatalog = async () => {
      setLoading(true);
      try {
        const data = await productService.getProducts();
        if (data && data.products) {
          setProducts(data.products);
        }
      } catch (err) {
        setError(err.message || 'Failed to load catalog');
      } finally {
        setLoading(false);
      }
    };

    fetchCatalog();
  }, []);

  // Compute available categories and brands dynamically from loaded products
  const categories = useMemo(() => {
    const set = new Set(products.map((p) => p.category).filter(Boolean));
    return ['All', ...Array.from(set)];
  }, [products]);

  const brands = useMemo(() => {
    const set = new Set(products.map((p) => p.brand).filter(Boolean));
    return ['All', ...Array.from(set)];
  }, [products]);

  // Handle SearchBar callback
  const handleSearch = (filtered, term) => {
    setSearchQuery(term || '');
    setSearchedProducts(filtered);
  };

  // Filter and sort the products array
  const displayedProducts = useMemo(() => {
    let list = searchedProducts !== null ? searchedProducts : products;

    // Filter by Category
    if (selectedCategory && selectedCategory !== 'All') {
      list = list.filter(
        (p) => (p.category || '').toLowerCase() === selectedCategory.toLowerCase()
      );
    }

    // Filter by Brand
    if (selectedBrand && selectedBrand !== 'All') {
      list = list.filter(
        (p) => (p.brand || '').toLowerCase() === selectedBrand.toLowerCase()
      );
    }

    // Sort items
    const sorted = [...list];
    if (sortBy === 'price_asc') {
      sorted.sort((a, b) => Number(a.price) - Number(b.price));
    } else if (sortBy === 'price_desc') {
      sorted.sort((a, b) => Number(b.price) - Number(a.price));
    } else if (sortBy === 'rating') {
      sorted.sort((a, b) => Number(b.rating || 0) - Number(a.rating || 0));
    } else if (sortBy === 'newest') {
      sorted.sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0));
    }

    return sorted;
  }, [products, searchedProducts, selectedCategory, selectedBrand, sortBy]);

  const handleResetFilters = () => {
    setSelectedCategory('All');
    setSelectedBrand('All');
    setSortBy('newest');
    setSearchParams({});
  };

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/80 shadow-sm">
        <div className="max-w-3xl">
          <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">Online Store</span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-1">Explore Products</h1>
          <p className="text-slate-500 text-sm mt-2">
            Browse our full range of genuine electronic devices, flagship smartphones, and premium audio equipment.
          </p>
        </div>

        {/* Real-time SearchBar */}
        <div className="mt-6">
          <SearchBar
            products={products}
            onSearch={handleSearch}
            placeholder="Search by product name, brand, or category (e.g., iPhone, Anker, Watch)..."
          />
        </div>
      </div>

      {/* Control Bar: Filters & Sorting */}
      <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/80 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Filter Pickers */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-1.5 text-xs font-bold text-slate-500 uppercase tracking-wider pr-2">
            <Filter className="w-4 h-4 text-blue-600" /> Filters:
          </div>

          {/* Category Dropdown */}
          <select
            value={selectedCategory}
            onChange={(e) => {
              setSelectedCategory(e.target.value);
              if (e.target.value === 'All') {
                searchParams.delete('category');
                setSearchParams(searchParams);
              } else {
                setSearchParams({ category: e.target.value });
              }
            }}
            className="px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 hover:bg-slate-100 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500/20"
          >
            <option value="All">All Categories</option>
            {categories
              .filter((c) => c !== 'All')
              .map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
          </select>

          {/* Brand Dropdown */}
          <select
            value={selectedBrand}
            onChange={(e) => setSelectedBrand(e.target.value)}
            className="px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 hover:bg-slate-100 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500/20"
          >
            <option value="All">All Brands</option>
            {brands
              .filter((b) => b !== 'All')
              .map((b) => (
                <option key={b} value={b}>
                  {b}
                </option>
              ))}
          </select>

          {/* Reset button */}
          {(selectedCategory !== 'All' || selectedBrand !== 'All' || sortBy !== 'newest') && (
            <button
              onClick={handleResetFilters}
              className="flex items-center gap-1 text-xs text-rose-600 hover:text-rose-700 font-semibold px-2 py-1.5 rounded-lg hover:bg-rose-50 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" /> Clear
            </button>
          )}
        </div>

        {/* Sort Dropdown */}
        <div className="flex items-center gap-2 self-end md:self-auto">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Sort by:</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 hover:bg-slate-100 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500/20"
          >
            <option value="newest">Newest Arrivals</option>
            <option value="price_asc">Price: Low to High</option>
            <option value="price_desc">Price: High to Low</option>
            <option value="rating">Top Rated</option>
          </select>
        </div>
      </div>

      {/* Product Results Status & Count */}
      <div className="flex items-center justify-between text-xs font-semibold text-slate-500 px-1">
        <span>
          Showing <strong className="text-slate-800">{displayedProducts.length}</strong> items
          {selectedCategory !== 'All' && ` in "${selectedCategory}"`}
          {selectedBrand !== 'All' && ` by "${selectedBrand}"`}
          {searchQuery && ` matching "${searchQuery}"`}
        </span>
      </div>

      {/* Product Grid Area */}
      {loading ? (
        <Loading text="Loading products catalog..." />
      ) : error ? (
        <div className="p-8 text-center bg-rose-50 border border-rose-200 rounded-2xl text-rose-700 text-sm">
          {error}
        </div>
      ) : (
        <ProductGrid products={displayedProducts} />
      )}
    </div>
  );
};

export default Shop;
