const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const seedInitialData = require('./utils/seed');

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect Database & Seed Initial Admin/Rooms
connectDB().then(() => {
  if (require('mongoose').connection.readyState === 1) {
    seedInitialData();
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

// Start Server
const PORT = process.env.PORT || 5000;
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

