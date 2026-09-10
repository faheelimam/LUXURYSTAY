const mongoose = require('mongoose');

const MONGODB_ATLAS_URI = 'mongodb+srv://alyssarcher32_db_user:JmN5OVK4hSa0r7Hb@cluster0.zeiw0oy.mongodb.net/luxurystay?retryWrites=true&w=majority&appName=Cluster0';

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

const connectDB = async () => {
  const uri = process.env.MONGODB_URI || MONGODB_ATLAS_URI;

  if (cached.conn && mongoose.connection.readyState === 1) {
    return cached.conn;
  }

  if (!cached.promise) {
    const isSrv = uri.includes('mongodb+srv');
    const opts = {
      serverSelectionTimeoutMS: 15000,
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

