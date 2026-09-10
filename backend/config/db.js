const mongoose = require('mongoose');

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

const connectDB = async () => {
  const uri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/luxurystay';

  if (cached.conn && mongoose.connection.readyState === 1) {
    return cached.conn;
  }

  if (!cached.promise) {
    const isSrv = uri.includes('mongodb+srv');
    const opts = {
      serverSelectionTimeoutMS: 10000,
      ...(isSrv ? { tls: true, tlsAllowInvalidCertificates: true } : {})
    };

    cached.promise = mongoose.connect(uri, opts).then((mongooseInstance) => {
      console.log(`[MongoDB Connected]: ${mongooseInstance.connection.host}`);
      return mongooseInstance;
    });
  }

  try {
    cached.conn = await cached.promise;
  } catch (error) {
    cached.promise = null;
    console.error(`[MongoDB Connection Warning]: ${error.message}`);
    throw error;
  }

  return cached.conn;
};

module.exports = connectDB;

