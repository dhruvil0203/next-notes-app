const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');

// Load both .env.local (higher priority) and .env
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });
dotenv.config({ path: path.resolve(process.cwd(), '.env') });

const MONGODB_URL = process.env.MONGODB_URI;

async function testConnection() {
  if (!MONGODB_URL) {
    console.error('ERROR: MONGODB_URI is not defined in .env or .env.local');
    process.exit(1);
  }

  console.log('URI scheme:', MONGODB_URL.startsWith('mongodb+srv') ? 'SRV (mongodb+srv://)' : 'Standard (mongodb://)');
  console.log('Testing connection to Atlas...');

  try {
    await mongoose.connect(MONGODB_URL, {
      serverSelectionTimeoutMS: 10000,
      socketTimeoutMS: 45000,
    });
    console.log('✅ Successfully connected to MongoDB!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Failed to connect to MongoDB:', error.message);
    process.exit(1);
  }
}

testConnection();
