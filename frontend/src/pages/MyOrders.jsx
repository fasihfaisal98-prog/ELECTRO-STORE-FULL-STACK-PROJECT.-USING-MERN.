import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Package,
  Clock,
  CheckCircle,
  Truck,
  XCircle,
  ShoppingBag,
  ArrowRight,
  AlertCircle
} from 'lucide-react';
import { orderService } from '../services/orderService';
import Loading from '../components/Loading';

export const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await orderService.getMyOrders();
        if (data && data.orders) {
          setOrders(data.orders);
        }
      } catch (err) {
        setError(err.message || 'Unable to fetch your order history.');
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const getStatusBadge = (status) => {
    switch (status?.toLowerCase()) {
      case 'confirmed':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-blue-100 text-blue-800">
            <CheckCircle className="w-3.5 h-3.5" /> Confirmed
          </span>
        );
      case 'processing':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-800">
            <Clock className="w-3.5 h-3.5" /> Processing
          </span>
        );
      case 'shipped':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-indigo-100 text-indigo-800">
            <Truck className="w-3.5 h-3.5" /> Shipped
          </span>
        );
      case 'delivered':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800">
            <CheckCircle className="w-3.5 h-3.5" /> Delivered
          </span>
        );
      case 'cancelled':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-rose-100 text-rose-800">
            <XCircle className="w-3.5 h-3.5" /> Cancelled
          </span>
        );
      case 'pending':
      default:
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-slate-100 text-slate-700">
            <Clock className="w-3.5 h-3.5" /> Pending
          </span>
        );
    }
  };

  if (loading) {
    return <Loading fullScreen text="Retrieving your orders..." />;
  }

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="pb-4 border-b border-slate-200">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
          My Orders
        </h1>
        <p className="text-slate-500 text-xs mt-1">
          Review details and track the status of your past purchases
        </p>
      </div>

      {error && (
        <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2.5">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {orders.length === 0 ? (
        <div className="bg-white rounded-3xl p-12 text-center max-w-lg mx-auto border border-slate-200/80 shadow-sm my-8">
          <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Package className="w-8 h-8" />
          </div>
          <h3 className="text-lg font-bold text-slate-800 mb-1">No Orders Placed Yet</h3>
          <p className="text-slate-500 text-sm mb-6">
            You haven't completed any orders yet. Start exploring our catalog to make your first purchase!
          </p>
          <Link
            to="/shop"
            className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-md transition-all"
          >
            Start Shopping <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => {
            const orderId = order.id || order._id;
            const orderDate = new Date(order.createdAt).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'short',
              day: 'numeric'
            });

            return (
              <div
                key={orderId}
                className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm space-y-4"
              >
                {/* Header info */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-100 gap-3">
                  <div>
                    <span className="text-xs text-slate-400 font-medium">Order Reference:</span>
                    <h3 className="text-sm sm:text-base font-extrabold text-slate-900 font-mono">
                      #{orderId}
                    </h3>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="text-right sm:text-left">
                      <span className="text-xs text-slate-400 font-medium block">Order Date</span>
                      <span className="text-xs font-bold text-slate-700">{orderDate}</span>
                    </div>

                    <div>{getStatusBadge(order.status)}</div>
                  </div>
                </div>

                {/* Products in this order */}
                <div className="space-y-3 py-2">
                  {order.products?.map((item, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between text-sm py-1 border-b border-slate-50 last:border-0"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-slate-500 font-bold text-xs">
                          {idx + 1}
                        </div>
                        <div>
                          <p className="font-bold text-slate-800">{item.name}</p>
                          <p className="text-xs text-slate-400">
                            Qty: <strong className="text-slate-600">{item.quantity}</strong> &times; Rs. {Number(item.price).toLocaleString()}
                          </p>
                        </div>
                      </div>

                      <span className="font-extrabold text-slate-800">
                        Rs. {(item.price * item.quantity).toLocaleString()}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Footer with shipping address & total */}
                <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row justify-between sm:items-center gap-3 text-xs bg-slate-50 -mx-6 -mb-6 p-4 rounded-b-2xl">
                  <div className="text-slate-500">
                    <span className="font-bold text-slate-700">Delivered to: </span>
                    {order.customerName} &bull; {order.address}, {order.city} ({order.phone})
                  </div>

                  <div className="flex items-baseline gap-2">
                    <span className="font-bold text-slate-700">Total Paid/Due:</span>
                    <span className="text-base font-extrabold text-blue-600">
                      Rs. {Number(order.totalAmount).toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default MyOrders;
