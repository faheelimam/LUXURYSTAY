const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema(
  {
    bookingNumber: {
      type: String,
      unique: true,
      required: true
    },
    guestId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    roomId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Room',
      required: true
    },
    checkInDate: {
      type: Date,
      required: true
    },
    checkOutDate: {
      type: Date,
      required: true
    },
    totalNights: {
      type: Number,
      required: true,
      default: 1
    },
    pricePerNight: {
      type: Number,
      required: true
    },
    totalAmount: {
      type: Number,
      required: true
    },
    status: {
      type: String,
      enum: ['PENDING', 'CONFIRMED', 'CHECKED_IN', 'CHECKED_OUT', 'CANCELLED'],
      default: 'CONFIRMED'
    },
    specialRequests: {
      type: String,
      default: ''
    },
    checkedInAt: {
      type: Date
    },
    checkedOutAt: {
      type: Date
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Booking', bookingSchema);
