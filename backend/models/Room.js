const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema(
  {
    roomNumber: {
      type: String,
      required: [true, 'Room number is required'],
      unique: true,
      trim: true
    },
    roomType: {
      type: String,
      required: [true, 'Room type is required'],
      // Removed enum restriction to allow flexible room types
    },
    pricePerNight: {
      type: Number,
      required: [true, 'Price per night is required']
    },
    capacity: {
      type: Number,
      default: 2
    },
    floor: {
      type: Number,
      default: 1
    },
    description: {
      type: String,
      default: 'Luxury suite with premium panoramic views and world-class amenities.'
    },
    amenities: [
      {
        type: String
      }
    ],
    image: {
      type: String,
      default: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1000&q=80'
    },
    status: {
      type: String,
      enum: ['AVAILABLE', 'RESERVED', 'OCCUPIED', 'CLEANING', 'MAINTENANCE'],
      default: 'AVAILABLE'
    },
    maintenanceNote: {
      type: String,
      default: ''
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Room', roomSchema);
