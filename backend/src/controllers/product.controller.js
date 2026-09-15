const mongoose = require('mongoose');
const Product = require('../models/product.model');
const memoryStore = require('../models/memoryStore');

const isDbConnected = () => mongoose.connection.readyState === 1;

// @desc    Get all products with filtering, searching & sorting
// @route   GET /api/products
// @access  Public
exports.getProducts = async (req, res, next) => {
  try {
    const { keyword, category, brand, sort } = req.query;

    if (!isDbConnected()) {
      const products = memoryStore.getProducts({ keyword, category, brand, sort });
      return res.status(200).json({
        success: true,
        count: products.length,
        products
      });
    }

    let query = {};

    if (keyword && keyword.trim() !== '') {
      const searchRegex = new RegExp(keyword.trim(), 'i');
      query.$or = [
        { name: searchRegex },
        { brand: searchRegex },
        { category: searchRegex },
        { description: searchRegex }
      ];
    }

    if (category && category.trim() !== '' && category.toLowerCase() !== 'all') {
      query.category = { $regex: new RegExp(`^${category.trim()}$`, 'i') };
    }

    if (brand && brand.trim() !== '' && brand.toLowerCase() !== 'all') {
      query.brand = { $regex: new RegExp(`^${brand.trim()}$`, 'i') };
    }

    let sortOption = { createdAt: -1 };
    if (sort === 'price_asc') {
      sortOption = { price: 1 };
    } else if (sort === 'price_desc') {
      sortOption = { price: -1 };
    } else if (sort === 'rating') {
      sortOption = { rating: -1, reviews: -1 };
    } else if (sort === 'newest') {
      sortOption = { createdAt: -1 };
    }

    const products = await Product.find(query).sort(sortOption);

    res.status(200).json({
      success: true,
      count: products.length,
      products
    });
  } catch (error) {
    // If DB error, gracefully fallback to memoryStore
    const products = memoryStore.getProducts(req.query);
    res.status(200).json({
      success: true,
      count: products.length,
      products
    });
  }
};

// @desc    Get single product by ID
// @route   GET /api/products/:id
// @access  Public
exports.getProductById = async (req, res, next) => {
  try {
    if (!isDbConnected()) {
      const product = memoryStore.getProductById(req.params.id);
      if (!product) {
        return res.status(404).json({ success: false, message: 'Product not found.' });
      }
      return res.status(200).json({ success: true, product });
    }

    const product = await Product.findById(req.params.id);
    if (!product) {
      // Check in-memory store in case it's a seeded item
      const memProduct = memoryStore.getProductById(req.params.id);
      if (memProduct) return res.status(200).json({ success: true, product: memProduct });
      return res.status(404).json({ success: false, message: 'Product not found.' });
    }

    res.status(200).json({ success: true, product });
  } catch (error) {
    const product = memoryStore.getProductById(req.params.id);
    if (product) return res.status(200).json({ success: true, product });
    next(error);
  }
};

// @desc    Create a product (Admin ready)
// @route   POST /api/products
// @access  Public / Admin
exports.createProduct = async (req, res, next) => {
  try {
    const { name, brand, category, description, image, price, originalPrice, discount, rating, reviews, stock } = req.body;

    if (!name || !brand || !category || !description || !image || price === undefined) {
      return res.status(400).json({
        success: false,
        message: 'Please provide name, brand, category, description, image, and price.'
      });
    }

    const productData = {
      name,
      brand,
      category,
      description,
      image,
      price: Number(price),
      originalPrice: originalPrice ? Number(originalPrice) : Number(price),
      discount: discount ? Number(discount) : 0,
      rating: rating ? Number(rating) : 0,
      reviews: reviews ? Number(reviews) : 0,
      stock: stock !== undefined ? Number(stock) : 10
    };

    if (!isDbConnected()) {
      const product = memoryStore.createProduct(productData);
      return res.status(201).json({ success: true, message: 'Product created successfully.', product });
    }

    const product = await Product.create(productData);
    res.status(201).json({ success: true, message: 'Product created successfully.', product });
  } catch (error) {
    next(error);
  }
};

// @desc    Update product
// @route   PUT /api/products/:id
// @access  Public / Admin
exports.updateProduct = async (req, res, next) => {
  try {
    if (!isDbConnected()) {
      const product = memoryStore.updateProduct(req.params.id, req.body);
      if (!product) return res.status(404).json({ success: false, message: 'Product not found.' });
      return res.status(200).json({ success: true, message: 'Product updated successfully.', product });
    }

    const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!product) return res.status(404).json({ success: false, message: 'Product not found.' });
    res.status(200).json({ success: true, message: 'Product updated successfully.', product });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete product
// @route   DELETE /api/products/:id
// @access  Public / Admin
exports.deleteProduct = async (req, res, next) => {
  try {
    if (!isDbConnected()) {
      const success = memoryStore.deleteProduct(req.params.id);
      if (!success) return res.status(404).json({ success: false, message: 'Product not found.' });
      return res.status(200).json({ success: true, message: 'Product deleted successfully.' });
    }

    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) return res.status(404).json({ success: false, message: 'Product not found.' });
    res.status(200).json({ success: true, message: 'Product deleted successfully.' });
  } catch (error) {
    next(error);
  }
};
