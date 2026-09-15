const app = require('./app');
const connectDB = require('./config/db');
const Product = require('./models/product.model');
const memoryStore = require('./models/memoryStore');

const PORT = process.env.PORT || 5000;

// Auto-seed helper if MongoDB is empty
const autoSeedIfEmpty = async () => {
  try {
    const count = await Product.countDocuments();
    if (count === 0) {
      console.log('[Auto-seed]: No products found in MongoDB. Automatically populating initial catalog...');
      const seedItems = memoryStore.products.map(p => {
        const { id, _id, ...rest } = p;
        return rest;
      });
      await Product.insertMany(seedItems);
      console.log(`[Auto-seed]: Successfully seeded ${seedItems.length} products into MongoDB!`);
    } else {
      console.log(`[Database]: Found ${count} existing products in MongoDB.`);
    }
  } catch (err) {
    console.warn('[Auto-seed Warning]:', err.message);
  }
};

// Connect to MongoDB & verify catalog
connectDB().then(() => {
  setTimeout(autoSeedIfEmpty, 2500);
});

const server = app.listen(PORT, () => {
  console.log(`=========================================`);
  console.log(`🚀 Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
  console.log(`🌐 API Base URL: http://localhost:${PORT}/api`);
  console.log(`=========================================`);
});

process.on('unhandledRejection', (err) => {
  console.error(`Unhandled Rejection Error: ${err.message}`);
});
