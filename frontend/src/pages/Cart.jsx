import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Trash2,
  Plus,
  Minus,
  ArrowRight,
  ShoppingBag,
  ShieldCheck,
  Truck,
  RotateCcw
} from 'lucide-react';
import { useCart } from '../context/CartContext';

export const Cart = () => {
  const { cart, removeFromCart, updateQuantity, clearCart, totalItems, totalPrice } = useCart();
  const navigate = useNavigate();

  if (cart.length === 0) {
    return (
      <div className="max-w-2xl mx-auto py-16 px-4 text-center">
        <div className="w-20 h-20 bg-blue-50 text-blue-600 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-inner">
          <ShoppingBag className="w-10 h-10" />
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-2">
          Your Cart is Empty
        </h2>
        <p className="text-slate-500 text-sm max-w-md mx-auto mb-8 leading-relaxed">
          Looks like you haven't added any products to your shopping bag yet. Explore our latest flagship devices and accessories!
        </p>
        <Link
          to="/shop"
          className="inline-flex items-center gap-2 px-8 py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm rounded-xl shadow-md shadow-blue-500/20 transition-all hover:scale-105 active:scale-95"
        >
          Explore Catalog <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    );
  }

  const shippingCost = totalPrice >= 50000 ? 0 : 499;
  const grandTotal = totalPrice + shippingCost;

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            Shopping Cart
          </h1>
          <p className="text-slate-500 text-xs mt-1">
            You have {totalItems} item{totalItems !== 1 ? 's' : ''} in your bag
          </p>
        </div>
        <button
          onClick={clearCart}
          className="self-start sm:self-auto text-xs font-semibold text-rose-600 hover:text-rose-700 hover:underline flex items-center gap-1.5"
        >
          <Trash2 className="w-4 h-4" /> Empty Cart
        </button>
      </div>

      {/* Cart Grid: Items List + Order Summary Sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* Items List */}
        <div className="lg:col-span-2 space-y-4">
          {cart.map((item) => {
            const itemId = item.id || item._id;
            const itemSubtotal = item.price * item.quantity;

            return (
              <div
                key={itemId}
                className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/80 shadow-sm flex flex-col sm:flex-row items-center gap-5"
              >
                {/* Product Thumbnail */}
                <Link
                  to={`/product/${itemId}`}
                  className="w-24 h-24 sm:w-28 sm:h-28 rounded-xl bg-slate-100 overflow-hidden shrink-0 border border-slate-100 block"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover object-center"
                    onError={(e) => {
                      e.target.src =
                        'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80';
                    }}
                  />
                </Link>

                {/* Details */}
                <div className="flex-1 w-full space-y-1 text-center sm:text-left">
                  <span className="text-[11px] font-bold text-blue-600 uppercase tracking-wider">
                    {item.brand}
                  </span>
                  <Link to={`/product/${itemId}`}>
                    <h3 className="text-base font-bold text-slate-800 hover:text-blue-600 line-clamp-1 transition-colors">
                      {item.name}
                    </h3>
                  </Link>
                  <p className="text-xs text-slate-400">
                    Unit Price: Rs. {Number(item.price).toLocaleString()}
                  </p>
                </div>

                {/* Quantity Controls */}
                <div className="flex items-center gap-3">
                  <div className="flex items-center border border-slate-200 rounded-xl overflow-hidden bg-slate-50">
                    <button
                      type="button"
                      onClick={() => updateQuantity(itemId, item.quantity - 1)}
                      className="p-2 hover:bg-slate-200 text-slate-600 transition-colors"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="w-10 text-center text-xs font-bold text-slate-800">
                      {item.quantity}
                    </span>
                    <button
                      type="button"
                      onClick={() => updateQuantity(itemId, item.quantity + 1)}
                      className="p-2 hover:bg-slate-200 text-slate-600 transition-colors"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Remove Button */}
                  <button
                    onClick={() => removeFromCart(itemId)}
                    className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                    title="Remove item"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                {/* Subtotal */}
                <div className="text-right sm:min-w-[110px]">
                  <span className="text-xs text-slate-400 block sm:hidden">Subtotal:</span>
                  <span className="text-base font-extrabold text-slate-900">
                    Rs. {itemSubtotal.toLocaleString()}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Order Summary Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-sm space-y-6">
          <h2 className="text-lg font-extrabold text-slate-900 pb-3 border-b border-slate-100">
            Order Summary
          </h2>

          <div className="space-y-3 text-sm">
            <div className="flex justify-between text-slate-600">
              <span>Items Total ({totalItems})</span>
              <span className="font-semibold text-slate-900">
                Rs. {totalPrice.toLocaleString()}
              </span>
            </div>

            <div className="flex justify-between text-slate-600">
              <span>Delivery Charges</span>
              <span className="font-semibold text-slate-900">
                {shippingCost === 0 ? (
                  <span className="text-emerald-600 font-bold uppercase text-xs">Free</span>
                ) : (
                  `Rs. ${shippingCost}`
                )}
              </span>
            </div>

            {shippingCost > 0 && (
              <p className="text-[11px] text-blue-600 bg-blue-50 p-2.5 rounded-xl">
                Add Rs. {(50000 - totalPrice).toLocaleString()} more to qualify for Free Shipping!
              </p>
            )}

            <div className="pt-4 border-t border-slate-100 flex justify-between items-baseline">
              <span className="text-base font-bold text-slate-900">Grand Total</span>
              <span className="text-2xl font-extrabold text-blue-600">
                Rs. {grandTotal.toLocaleString()}
              </span>
            </div>
          </div>

          <button
            onClick={() => navigate('/order')}
            className="w-full py-4 bg-blue-600 hover:bg-blue-700 active:scale-95 text-white font-bold text-sm rounded-xl shadow-lg shadow-blue-500/20 transition-all flex items-center justify-center gap-2"
          >
            Proceed to Order <ArrowRight className="w-4 h-4" />
          </button>

          {/* Quick Assurance */}
          <div className="pt-4 border-t border-slate-100 space-y-2 text-xs text-slate-500">
            <div className="flex items-center gap-2">
              <Truck className="w-4 h-4 text-slate-400" />
              <span>Doorstep Cash on Delivery</span>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-slate-400" />
              <span>100% Genuine brand guarantee</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
