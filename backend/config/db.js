const mongoose = require('mongoose');

const connectDB = async () => {
  const uri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/luxurystay';
  try {
    const isSrv = uri.includes('mongodb+srv');
    const conn = await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 5000,
      ...(isSrv ? { tls: true, tlsAllowInvalidCertificates: true } : {})
    });
    console.log(`[MongoDB Connected]: ${conn.connection.host}`);
  } catch (error) {
    console.error(`[MongoDB Connection Warning]: ${error.message}`);
    // If Atlas connection fails (e.g. IP whitelist / network block), attempt local fallback
    if (uri.includes('mongodb+srv')) {
      try {
        console.log('[MongoDB]: Attempting fallback to local MongoDB instance...');
        const localConn = await mongoose.connect('mongodb://127.0.0.1:27017/luxurystay', {
          serverSelectionTimeoutMS: 3000
        });
        console.log(`[MongoDB Local Connected]: ${localConn.connection.host}`);
      } catch (localErr) {
        console.error(`[MongoDB Local Fallback Warning]: ${localErr.message}`);
      }
    }
  }
};

module.exports = connectDB;
