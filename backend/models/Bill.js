const mongoose = require('mongoose');

const billSchema = new mongoose.Schema(
  {
    invoiceNumber: {
      type: String,
      unique: true,
      required: true
    },
    bookingId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Booking',
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
    roomCharges: {
      type: Number,
      required: true
    },
    serviceCharges: {
      type: Number,
      default: 0
    },
    taxAmount: {
      type: Number,
      default: 0
    },
    totalAmount: {
      type: Number,
      required: true
    },
    paymentStatus: {
      type: String,
      enum: ['UNPAID', 'PAID'],
      default: 'UNPAID'
    },
    paymentMethod: {
      type: String,
      enum: ['CREDIT_CARD', 'CASH', 'ONLINE'],
      default: 'CREDIT_CARD'
    },
    items: [
      {
        description: String,
        amount: Number
      }
    ],
    paidAt: {
      type: Date
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Bill', billSchema);
