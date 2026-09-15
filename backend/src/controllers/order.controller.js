const mongoose = require('mongoose');
const Order = require('../models/order.model');
const Product = require('../models/product.model');
const memoryStore = require('../models/memoryStore');

const isDbConnected = () => mongoose.connection.readyState === 1;

// @desc    Create a new order
// @route   POST /api/orders
// @access  Private
exports.createOrder = async (req, res, next) => {
  try {
    const {
      customerName,
      phone,
      email,
      address,
      city,
      postalCode,
      notes,
      products,
      totalAmount
    } = req.body;

    if (!customerName || !phone || !address || !city || !postalCode) {
      return res.status(400).json({
        success: false,
        message: 'Please provide all delivery details: Name, Phone, Address, City, and Postal Code.'
      });
    }

    if (!products || !Array.isArray(products) || products.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'No order items found. Your cart is empty.'
      });
    }

    let calculatedTotal = 0;
    const formattedProducts = [];

    for (const item of products) {
      const productId = item.product || item.id || item._id;
      const quantity = Math.max(1, Number(item.quantity) || 1);
      const price = Number(item.price);

      if (!productId || isNaN(price)) {
        return res.status(400).json({
          success: false,
          message: 'Invalid product details encountered in order request.'
        });
      }

      calculatedTotal += price * quantity;
      formattedProducts.push({
        product: productId,
        name: item.name,
        price,
        quantity
      });
    }

    const finalTotal = totalAmount ? Number(totalAmount) : calculatedTotal;
    const userId = req.user._id || req.user.id;

    const orderData = {
      user: userId,
      customerName: customerName.trim(),
      phone: phone.trim(),
      email: email ? email.trim().toLowerCase() : req.user.email,
      address: address.trim(),
      city: city.trim(),
      postalCode: postalCode.trim(),
      notes: notes ? notes.trim() : '',
      products: formattedProducts,
      totalAmount: finalTotal,
      status: 'Pending'
    };

    if (!isDbConnected()) {
      const order = memoryStore.createOrder(orderData);
      return res.status(201).json({
        success: true,
        message: 'Your order has been placed successfully!',
        order
      });
    }

    const order = await Order.create(orderData);

    res.status(201).json({
      success: true,
      message: 'Your order has been placed successfully!',
      order
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get logged in user orders
// @route   GET /api/orders/my-orders
// @access  Private
exports.getMyOrders = async (req, res, next) => {
  try {
    const userId = req.user._id || req.user.id;

    if (!isDbConnected()) {
      const orders = memoryStore.getOrdersByUser(userId);
      return res.status(200).json({
        success: true,
        count: orders.length,
        orders
      });
    }

    const orders = await Order.find({ user: userId }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: orders.length,
      orders
    });
  } catch (error) {
    const userId = req.user._id || req.user.id;
    const orders = memoryStore.getOrdersByUser(userId);
    res.status(200).json({
      success: true,
      count: orders.length,
      orders
    });
  }
};

// @desc    Get order by ID
// @route   GET /api/orders/:id
// @access  Private
exports.getOrderById = async (req, res, next) => {
  try {
    const userId = req.user._id || req.user.id;

    if (!isDbConnected()) {
      const order = memoryStore.getOrderById(req.params.id);
      if (!order) return res.status(404).json({ success: false, message: 'Order not found.' });
      return res.status(200).json({ success: true, order });
    }

    const order = await Order.findById(req.params.id).populate('products.product');

    if (!order) {
      const memOrder = memoryStore.getOrderById(req.params.id);
      if (memOrder) return res.status(200).json({ success: true, order: memOrder });
      return res.status(404).json({ success: false, message: 'Order not found.' });
    }

    if (order.user.toString() !== userId.toString()) {
      return res.status(403).json({
        success: false,
        message: 'You are not authorized to view this order.'
      });
    }

    res.status(200).json({
      success: true,
      order
    });
  } catch (error) {
    next(error);
  }
};
