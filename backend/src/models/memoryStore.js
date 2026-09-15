const bcrypt = require('bcryptjs');

const initialProducts = [
  {
    id: 'prod_1',
    _id: '66e1b7b0a1a2a3a4a5a6a701',
    name: 'iPhone 15 Pro Max',
    brand: 'Apple',
    category: 'Smartphones',
    description: 'Forged in titanium with the groundbreaking A17 Pro chip, customizable Action button, and the most versatile camera system ever on iPhone.',
    image: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&w=800&q=80',
    price: 349999,
    originalPrice: 389999,
    discount: 10,
    rating: 4.9,
    reviews: 124,
    stock: 25,
    createdAt: new Date('2025-01-10')
  },
  {
    id: 'prod_2',
    _id: '66e1b7b0a1a2a3a4a5a6a702',
    name: 'Samsung Galaxy A55 5G',
    brand: 'Samsung',
    category: 'Smartphones',
    description: 'Premium metal frame with a 6.6-inch Super AMOLED 120Hz display, 50MP triple camera system, and all-day 5000mAh battery life.',
    image: 'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?auto=format&fit=crop&w=800&q=80',
    price: 89999,
    originalPrice: 99999,
    discount: 10,
    rating: 4.7,
    reviews: 86,
    stock: 40,
    createdAt: new Date('2025-01-11')
  },
  {
    id: 'prod_3',
    _id: '66e1b7b0a1a2a3a4a5a6a703',
    name: 'Samsung Galaxy S24 Ultra',
    brand: 'Samsung',
    category: 'Smartphones',
    description: 'Welcome to the era of mobile AI. Built with titanium shield, 200MP camera with Quad Tele System, and integrated S Pen for effortless productivity.',
    image: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=800&q=80',
    price: 329999,
    originalPrice: 369999,
    discount: 11,
    rating: 4.8,
    reviews: 95,
    stock: 18,
    createdAt: new Date('2025-01-12')
  },
  {
    id: 'prod_4',
    _id: '66e1b7b0a1a2a3a4a5a6a704',
    name: 'Xiaomi Redmi Note 13 Pro+ 5G',
    brand: 'Xiaomi',
    category: 'Smartphones',
    description: 'Features a curved 1.5K 120Hz AMOLED display, flagship 200MP OIS camera, IP68 water resistance, and lightning-fast 120W HyperCharge.',
    image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=800&q=80',
    price: 64999,
    originalPrice: 74999,
    discount: 13,
    rating: 4.6,
    reviews: 73,
    stock: 35,
    createdAt: new Date('2025-01-13')
  },
  {
    id: 'prod_5',
    _id: '66e1b7b0a1a2a3a4a5a6a705',
    name: 'Apple AirPods Pro (2nd Gen, USB-C)',
    brand: 'Apple',
    category: 'Earbuds',
    description: 'Up to 2x more Active Noise Cancellation, Adaptive Audio, Transparency mode, and Personalized Spatial Audio with dynamic head tracking.',
    image: 'https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?auto=format&fit=crop&w=800&q=80',
    price: 54999,
    originalPrice: 64999,
    discount: 15,
    rating: 4.9,
    reviews: 210,
    stock: 50,
    createdAt: new Date('2025-01-14')
  },
  {
    id: 'prod_6',
    _id: '66e1b7b0a1a2a3a4a5a6a706',
    name: 'Sony WH-1000XM5 Wireless Headphones',
    brand: 'Sony',
    category: 'Accessories',
    description: 'Industry-leading noise cancellation with two processors and eight microphones, extraordinary sound engineered to perfection, and 30-hour battery life.',
    image: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=800&q=80',
    price: 79999,
    originalPrice: 89999,
    discount: 11,
    rating: 4.8,
    reviews: 168,
    stock: 22,
    createdAt: new Date('2025-01-15')
  },
  {
    id: 'prod_7',
    _id: '66e1b7b0a1a2a3a4a5a6a707',
    name: 'Apple Watch Series 9',
    brand: 'Apple',
    category: 'Smart Watches',
    description: 'Powerful S9 SiP, magic double-tap gesture control, brighter Always-On Retina display, and advanced health sensors including ECG and Blood Oxygen.',
    image: 'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?auto=format&fit=crop&w=800&q=80',
    price: 99999,
    originalPrice: 114999,
    discount: 13,
    rating: 4.8,
    reviews: 142,
    stock: 28,
    createdAt: new Date('2025-01-16')
  },
  {
    id: 'prod_8',
    _id: '66e1b7b0a1a2a3a4a5a6a708',
    name: 'Samsung Galaxy Watch6 Classic',
    brand: 'Samsung',
    category: 'Smart Watches',
    description: 'Iconic rotating bezel, refined stainless steel design, comprehensive sleep coaching, Body Composition analysis, and sapphire crystal glass.',
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80',
    price: 74999,
    originalPrice: 84999,
    discount: 12,
    rating: 4.7,
    reviews: 89,
    stock: 30,
    createdAt: new Date('2025-01-17')
  },
  {
    id: 'prod_9',
    _id: '66e1b7b0a1a2a3a4a5a6a709',
    name: 'Anker 737 Power Bank (PowerCore 24K)',
    brand: 'Anker',
    category: 'Power Banks',
    description: 'Ultra-powerful 140W two-way fast charging with 24,000mAh capacity and smart digital display showing input/output power and recharge time estimate.',
    image: 'https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?auto=format&fit=crop&w=800&q=80',
    price: 26999,
    originalPrice: 32999,
    discount: 18,
    rating: 4.9,
    reviews: 112,
    stock: 45,
    createdAt: new Date('2025-01-18')
  },
  {
    id: 'prod_10',
    _id: '66e1b7b0a1a2a3a4a5a6a710',
    name: 'Anker 65W GaN Fast Wall Charger',
    brand: 'Anker',
    category: 'Chargers',
    description: 'Compact 3-port fast wall charger with GaN technology. Powers MacBook, iPad, iPhone, and Android devices simultaneously at maximum speed.',
    image: 'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?auto=format&fit=crop&w=800&q=80',
    price: 8999,
    originalPrice: 11999,
    discount: 25,
    rating: 4.8,
    reviews: 175,
    stock: 65,
    createdAt: new Date('2025-01-19')
  },
  {
    id: 'prod_11',
    _id: '66e1b7b0a1a2a3a4a5a6a711',
    name: 'JBL Charge 5 Portable Bluetooth Speaker',
    brand: 'JBL',
    category: 'Speakers',
    description: 'Bold JBL Original Pro Sound with long-excursion driver and dual passive radiators. IP67 waterproof & dustproof with 20 hours of playtime and built-in powerbank.',
    image: 'https://images.unsplash.com/photo-1545454675-3531b543be5d?auto=format&fit=crop&w=800&q=80',
    price: 34999,
    originalPrice: 39999,
    discount: 12,
    rating: 4.7,
    reviews: 130,
    stock: 20,
    createdAt: new Date('2025-01-20')
  },
  {
    id: 'prod_12',
    _id: '66e1b7b0a1a2a3a4a5a6a712',
    name: 'Baseus 100W USB-C to USB-C Braided Cable',
    brand: 'Baseus',
    category: 'Cables',
    description: 'Heavy-duty 2-meter nylon braided cable with integrated E-Marker chip, 100W PD high-speed charging, and 480Mbps fast data transmission.',
    image: 'https://images.unsplash.com/photo-1541689592655-f5f52825a3b8?auto=format&fit=crop&w=800&q=80',
    price: 2499,
    originalPrice: 3499,
    discount: 28,
    rating: 4.6,
    reviews: 84,
    stock: 100,
    createdAt: new Date('2025-01-21')
  },
 
];

class MemoryStore {
  constructor() {
    this.products = [...initialProducts];
    this.users = [
      {
        _id: '66e1b7b0a1a2a3a4a5a6a801',
        id: '66e1b7b0a1a2a3a4a5a6a801',
        name: 'Demo Customer',
        username: 'demouser',
        email: 'demo@example.com',
        passwordHash: bcrypt.hashSync('password123', 10),
        createdAt: new Date()
      }
    ];
    this.orders = [];
  }

  // Products
  getProducts({ keyword, category, brand, sort }) {
    let result = [...this.products];

    if (keyword && keyword.trim() !== '') {
      const kw = keyword.toLowerCase().trim();
      result = result.filter(
        (p) =>
          (p.name && p.name.toLowerCase().includes(kw)) ||
          (p.brand && p.brand.toLowerCase().includes(kw)) ||
          (p.category && p.category.toLowerCase().includes(kw)) ||
          (p.description && p.description.toLowerCase().includes(kw))
      );
    }

    if (category && category.trim() !== '' && category.toLowerCase() !== 'all') {
      result = result.filter(
        (p) => (p.category || '').toLowerCase() === category.toLowerCase().trim()
      );
    }

    if (brand && brand.trim() !== '' && brand.toLowerCase() !== 'all') {
      result = result.filter(
        (p) => (p.brand || '').toLowerCase() === brand.toLowerCase().trim()
      );
    }

    if (sort === 'price_asc') {
      result.sort((a, b) => a.price - b.price);
    } else if (sort === 'price_desc') {
      result.sort((a, b) => b.price - a.price);
    } else if (sort === 'rating') {
      result.sort((a, b) => (b.rating || 0) - (a.rating || 0));
    } else if (sort === 'newest') {
      result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    }

    return result;
  }

  getProductById(id) {
    return this.products.find((p) => p.id === id || p._id === id);
  }

  createProduct(data) {
    const newId = 'prod_' + Date.now();
    const product = {
      ...data,
      id: newId,
      _id: newId,
      createdAt: new Date()
    };
    this.products.unshift(product);
    return product;
  }

  updateProduct(id, data) {
    const idx = this.products.findIndex((p) => p.id === id || p._id === id);
    if (idx === -1) return null;
    this.products[idx] = { ...this.products[idx], ...data };
    return this.products[idx];
  }

  deleteProduct(id) {
    const idx = this.products.findIndex((p) => p.id === id || p._id === id);
    if (idx === -1) return false;
    this.products.splice(idx, 1);
    return true;
  }

  // Users
  findUserByEmail(email) {
    return this.users.find((u) => u.email.toLowerCase() === email.toLowerCase());
  }

  findUserByUsername(username) {
    return this.users.find((u) => u.username.toLowerCase() === username.toLowerCase());
  }

  findUserById(id) {
    return this.users.find((u) => u.id === id || u._id === id);
  }

  async createUser({ name, username, email, password }) {
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);
    const id = 'user_' + Date.now();
    const user = {
      id,
      _id: id,
      name,
      username,
      email,
      passwordHash,
      createdAt: new Date()
    };
    this.users.push(user);
    return user;
  }

  async comparePassword(candidatePassword, passwordHash) {
    return await bcrypt.compare(candidatePassword, passwordHash);
  }

  // Orders
  createOrder(data) {
    const id = 'ord_' + Math.floor(100000 + Math.random() * 900000);
    const order = {
      ...data,
      id,
      _id: id,
      status: 'Pending',
      createdAt: new Date()
    };
    this.orders.unshift(order);
    return order;
  }

  getOrdersByUser(userId) {
    return this.orders.filter(
      (o) => o.user?.toString() === userId?.toString()
    );
  }

  getOrderById(id) {
    return this.orders.find((o) => o.id === id || o._id === id);
  }
}

const memoryStore = new MemoryStore();
module.exports = memoryStore;
