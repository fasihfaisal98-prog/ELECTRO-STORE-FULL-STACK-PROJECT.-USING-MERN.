import React, { useState, useEffect } from 'react';
import { Search, X } from 'lucide-react';

export const SearchBar = ({ products = [], onSearch, placeholder = 'Search products, brands, categories...' }) => {
  const [searchTerm, setSearchTerm] = useState('');

  // Perform search whenever searchTerm or products array changes
  useEffect(() => {
    if (!onSearch) return;

    if (!searchTerm.trim()) {
      onSearch(products);
      return;
    }

    const term = searchTerm.toLowerCase().trim();
    const filtered = products.filter((product) => {
      const name = (product.name || '').toLowerCase();
      const brand = (product.brand || '').toLowerCase();
      const category = (product.category || '').toLowerCase();
      const description = (product.description || '').toLowerCase();

      return (
        name.includes(term) ||
        brand.includes(term) ||
        category.includes(term) ||
        description.includes(term)
      );
    });

    onSearch(filtered, term);
  }, [searchTerm, products]);

  const handleClear = () => {
    setSearchTerm('');
  };

  return (
    <div className="relative w-full max-w-xl mx-auto">
      <div className="relative flex items-center">
        <Search className="absolute left-4 w-5 h-5 text-slate-400 pointer-events-none" />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder={placeholder}
          className="w-full pl-12 pr-10 py-3 bg-white border border-slate-200 rounded-xl text-sm font-medium text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 shadow-sm transition-all"
        />
        {searchTerm && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute right-3.5 text-slate-400 hover:text-slate-600 p-0.5 rounded-full hover:bg-slate-100 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
};

export default SearchBar;
