const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const seedInitialData = require('./utils/seed');
const path = require('path');
dotenv.config({ path: path.resolve(__dirname, '.env') });

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

let isSeeded = false;

// Ensure DB is connected before handling any API requests (crucial for Vercel serverless)
app.use(async (req, res, next) => {
  try {
    await connectDB();
    if (!isSeeded) {
      isSeeded = true;
      seedInitialData().catch((err) => console.error('[Seed Error]:', err.message));
    }
    next();
  } catch (error) {
    console.error('[DB Connection Middleware Error]:', error.message);
    res.status(500).json({ error: 'Database connection failed. Please ensure MONGODB_URI is configured and Atlas IP 0.0.0.0/0 is whitelisted.' });
  }
});

// API Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/admin', require('./routes/adminRoutes'));
app.use('/api/rooms', require('./routes/roomRoutes'));
app.use('/api/bookings', require('./routes/bookingRoutes'));
app.use('/api/housekeeping', require('./routes/housekeepingRoutes'));
app.use('/api/billing', require('./routes/billingRoutes'));
app.use('/api/feedback', require('./routes/feedbackRoutes'));
app.use('/api/upload', require('./routes/uploadRoutes'));

// Root test route
app.get('/', (req, res) => {
  res.json({
    system: 'LUXURYSTAY Hotel Management API',
    status: 'Active',
    version: '1.0.0',
    theme: { black: '#111111', white: '#FFFFFF', gold: '#C9A227' }
  });
});

// Start Server locally
const PORT = process.env.PORT || 5000;
if (require.main === module) {
  const server = app.listen(PORT, () => {
    console.log(`[LUXURYSTAY Server]: Running on http://localhost:${PORT}`);
  });


  server.on('error', (error) => {
    if (error.code === 'EADDRINUSE') {
      console.error(`[Error]: Port ${PORT} is already in use by another Node process.`);
      console.log(`[Hint]: Close existing process using Port ${PORT} or kill node task.`);
    } else {
      console.error(`[Server Error]:`, error);
    }
  });
}

module.exports = app;


