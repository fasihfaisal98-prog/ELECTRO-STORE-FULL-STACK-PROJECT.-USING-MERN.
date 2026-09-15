import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Star, ShoppingCart, ArrowRight, Check } from 'lucide-react';
import { useCart } from '../context/CartContext';

export const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const navigate = useNavigate();
  const [added, setAdded] = useState(false);

  if (!product) return null;

  const productId = product.id || product._id;
  const isOutOfStock = product.stock !== undefined && product.stock <= 0;

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (isOutOfStock) return;

    addToCart(product, 1);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  const handleOrderNow = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (isOutOfStock) return;

    addToCart(product, 1);
    navigate('/order');
  };

  return (
    <div className="group bg-white rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden relative">
      {/* Discount Badge */}
      {product.discount > 0 && (
        <span className="absolute top-3 left-3 z-10 bg-rose-500 text-white text-xs font-bold px-2.5 py-1 rounded-full shadow-sm">
          -{product.discount}% OFF
        </span>
      )}

      {/* Stock Status Badge */}
      <span
        className={`absolute top-3 right-3 z-10 text-[11px] font-semibold px-2.5 py-0.5 rounded-full backdrop-blur-md ${
          isOutOfStock
            ? 'bg-rose-100 text-rose-700 border border-rose-200'
            : 'bg-emerald-100/90 text-emerald-800 border border-emerald-200'
        }`}
      >
        {isOutOfStock ? 'Out of Stock' : 'In Stock'}
      </span>

      {/* Image Container with Link */}
      <Link
        to={`/product/${productId}`}
        className="block relative w-full pt-[75%] bg-slate-100 overflow-hidden cursor-pointer"
      >
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
          onError={(e) => {
            e.target.src =
              'https://images.unsplash.com/ph-5e560c06d30e?auto=format&fit=crop&w=800&q=80';
          }}
        />
      </Link>

      {/* Product Information */}
      <div className="p-5 flex flex-col flex-grow">
        {/* Brand & Category */}
        <div className="flex items-center justify-between text-xs text-slate-400 font-medium mb-1.5">
          <span className="uppercase tracking-wider text-blue-600 font-semibold">{product.brand}</span>
          <span>{product.category}</span>
        </div>

        {/* Product Title */}
        <Link to={`/product/${productId}`}>
          <h3 className="text-slate-800 font-bold text-base line-clamp-1 hover:text-blue-600 transition-colors">
            {product.name}
          </h3>
        </Link>

        {/* Rating & Reviews */}
        <div className="flex items-center gap-1.5 mt-2 mb-3">
          <div className="flex items-center text-amber-400">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-3.5 h-3.5 ${
                  i < Math.floor(product.rating || 0)
                    ? 'fill-amber-400 text-amber-400'
                    : 'text-slate-200'
                }`}
              />
            ))}
          </div>
          <span className="text-xs font-semibold text-slate-700">
            {product.rating ? product.rating.toFixed(1) : '5.0'}
          </span>
          <span className="text-xs text-slate-400">
            ({product.reviews || 0})
          </span>
        </div>

        {/* Price Section */}
        <div className="mt-auto pt-2 border-t border-slate-100 flex items-baseline gap-2 mb-4">
          <span className="text-lg font-extrabold text-slate-900">
            Rs. {Number(product.price).toLocaleString()}
          </span>
          {product.originalPrice && product.originalPrice > product.price && (
            <span className="text-xs text-slate-400 line-through">
              Rs. {Number(product.originalPrice).toLocaleString()}
            </span>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col gap-2">
          <div className="grid grid-cols-2 gap-2">
            <Link
              to={`/product/${productId}`}
              className="w-full text-center py-2 px-3 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors flex items-center justify-center gap-1"
            >
              View Details
            </Link>

            <button
              onClick={handleAddToCart}
              disabled={isOutOfStock}
              className={`w-full py-2 px-3 text-xs font-medium rounded-lg transition-all flex items-center justify-center gap-1.5 ${
                isOutOfStock
                  ? 'bg-slate-200 text-slate-400 cursor-not-allowed'
                  : added
                  ? 'bg-emerald-600 text-white'
                  : 'bg-blue-50 text-blue-700 hover:bg-blue-100 active:scale-95'
              }`}
            >
              {added ? (
                <>
                  <Check className="w-3.5 h-3.5" /> Added
                </>
              ) : (
                <>
                  <ShoppingCart className="w-3.5 h-3.5" /> Add to Cart
                </>
              )}
            </button>
          </div>

          <button
            onClick={handleOrderNow}
            disabled={isOutOfStock}
            className={`w-full py-2 px-3 text-xs font-bold text-white rounded-lg transition-all flex items-center justify-center gap-1.5 shadow-sm shadow-blue-500/20 ${
              isOutOfStock
                ? 'bg-slate-300 text-slate-500 cursor-not-allowed'
                : 'bg-blue-600 hover:bg-blue-700 active:scale-95'
            }`}
          >
            Order Now <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
