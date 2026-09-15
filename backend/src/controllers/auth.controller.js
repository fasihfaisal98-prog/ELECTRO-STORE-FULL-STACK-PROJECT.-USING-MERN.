const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const User = require('../models/user.model');
const memoryStore = require('../models/memoryStore');

const isDbConnected = () => mongoose.connection.readyState === 1;

const sendTokenResponse = (user, statusCode, res, message = 'Success') => {
  const userId = user._id || user.id;
  const token = jwt.sign(
    { id: userId },
    process.env.JWT_SECRET || 'supersecretjwtkey_ecommerce_2025_safe_token_very_secure_string',
    { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
  );

  const cookieOptions = {
    expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax'
  };

  res.status(statusCode).cookie('token', token, cookieOptions).json({
    success: true,
    message,
    token,
    user: {
      id: userId,
      _id: userId,
      name: user.name,
      username: user.username,
      email: user.email,
      createdAt: user.createdAt
    }
  });
};

// @desc    Register a new user
// @route   POST /api/auth/signup
// @access  Public
exports.signup = async (req, res, next) => {
  try {
    const { name, username, email, password, confirmPassword } = req.body;

    if (!name || !username || !email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide all required fields: name, username, email, and password.'
      });
    }

    if (confirmPassword && password !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message: 'Passwords do not match. Please verify and try again.'
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: 'Password must be at least 6 characters long.'
      });
    }

    if (!isDbConnected()) {
      if (memoryStore.findUserByEmail(email)) {
        return res.status(400).json({ success: false, message: 'An account with this email already exists.' });
      }
      if (memoryStore.findUserByUsername(username)) {
        return res.status(400).json({ success: false, message: 'This username is already taken.' });
      }
      const user = await memoryStore.createUser({ name, username, email, password });
      return sendTokenResponse(user, 201, res, 'Account created successfully!');
    }

    const existingEmail = await User.findOne({ email: email.toLowerCase().trim() });
    if (existingEmail) {
      return res.status(400).json({ success: false, message: 'An account with this email already exists.' });
    }

    const existingUsername = await User.findOne({ username: username.toLowerCase().trim() });
    if (existingUsername) {
      return res.status(400).json({ success: false, message: 'This username is already taken.' });
    }

    const user = await User.create({
      name: name.trim(),
      username: username.toLowerCase().trim(),
      email: email.toLowerCase().trim(),
      password
    });

    sendTokenResponse(user, 201, res, 'Account created successfully!');
  } catch (error) {
    next(error);
  }
};

// @desc    Authenticate user & login
// @route   POST /api/auth/login
// @access  Public
exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Please provide both email and password.' });
    }

    if (!isDbConnected()) {
      const user = memoryStore.findUserByEmail(email);
      if (!user) {
        return res.status(401).json({ success: false, message: 'Invalid email or password.' });
      }
      const isMatch = await memoryStore.comparePassword(password, user.passwordHash);
      if (!isMatch) {
        return res.status(401).json({ success: false, message: 'Invalid email or password.' });
      }
      return sendTokenResponse(user, 200, res, 'Logged in successfully!');
    }

    const user = await User.findOne({ email: email.toLowerCase().trim() });
    if (!user) {
      // Check demo user
      const memUser = memoryStore.findUserByEmail(email);
      if (memUser) {
        const isMatch = await memoryStore.comparePassword(password, memUser.passwordHash);
        if (isMatch) return sendTokenResponse(memUser, 200, res, 'Logged in successfully!');
      }
      return res.status(401).json({ success: false, message: 'Invalid email or password.' });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: 'Invalid email or password.' });
    }

    sendTokenResponse(user, 200, res, 'Logged in successfully!');
  } catch (error) {
    next(error);
  }
};

// @desc    Log user out
// @route   POST /api/auth/logout
// @access  Public
exports.logout = async (req, res, next) => {
  try {
    res.cookie('token', 'none', {
      expires: new Date(Date.now() + 5 * 1000),
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax'
    });

    res.status(200).json({ success: true, message: 'Logged out successfully.' });
  } catch (error) {
    next(error);
  }
};

// @desc    Get current user
// @route   GET /api/auth/me
// @access  Private
exports.getMe = async (req, res, next) => {
  try {
    res.status(200).json({ success: true, user: req.user });
  } catch (error) {
    next(error);
  }
};
