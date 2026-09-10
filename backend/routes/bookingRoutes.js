const express = require('express');
const router = express.Router();
const Booking = require('../models/Booking');
const Room = require('../models/Room');
const Bill = require('../models/Bill');
const ServiceRequest = require('../models/ServiceRequest');
const { protect, authorizeRoles } = require('../middleware/authMiddleware');

// Helper to generate unique booking number
const generateBookingNumber = () => {
  return 'LXS-' + Math.floor(100000 + Math.random() * 900000);
};

// @route   POST /api/bookings
// @desc    Create a new booking (Guest or Receptionist)
// @access  Private (Guest, Receptionist, Admin, Manager)
router.post('/', protect, async (req, res) => {
  try {
    const { roomId, checkInDate, checkOutDate, specialRequests } = req.body;

    if (!roomId || !checkInDate || !checkOutDate) {
      return res.status(400).json({ message: 'Room ID, check-in, and check-out dates are required' });
    }

    const room = await Room.findById(roomId);
    if (!room) return res.status(404).json({ message: 'Selected room not found' });

    // ✅ Block booking if room is not available
    if (room.status !== 'AVAILABLE') {
      const statusMessages = {
        RESERVED:    'This room is already reserved by another guest.',
        OCCUPIED:    'This room is currently occupied.',
        CLEANING:    'This room is being cleaned and not yet ready.',
        MAINTENANCE: 'This room is under maintenance.'
      };
      return res.status(400).json({
        message: statusMessages[room.status] || 'This room is not available for booking.'
      });
    }

    const start = new Date(checkInDate);
    const end = new Date(checkOutDate);
    const diffTime = Math.abs(end - start);
    const totalNights = Math.max(1, Math.ceil(diffTime / (1000 * 60 * 60 * 24)));
    const roomPriceTotal = room.pricePerNight * totalNights;

    const booking = await Booking.create({
      bookingNumber: generateBookingNumber(),
      guestId: req.user._id,
      roomId: room._id,
      checkInDate: start,
      checkOutDate: end,
      totalNights,
      pricePerNight: room.pricePerNight,
      totalAmount: roomPriceTotal,
      status: 'CONFIRMED',
      specialRequests: specialRequests || ''
    });

    // ✅ Mark room as RESERVED immediately after booking
    room.status = 'RESERVED';
    await room.save();

    res.status(201).json(booking);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   POST /api/bookings/:id/cancel
// @desc    Cancel a booking — releases room back to AVAILABLE
// @access  Private (Guest = own booking, Admin/Manager/Receptionist = any)
router.post('/:id/cancel', protect, async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) return res.status(404).json({ message: 'Booking not found' });

    // Guests can only cancel their own bookings
    if (req.user.role === 'guest' && String(booking.guestId) !== String(req.user._id)) {
      return res.status(403).json({ message: 'You can only cancel your own bookings.' });
    }

    if (booking.status === 'CHECKED_IN') {
      return res.status(400).json({ message: 'Cannot cancel an active check-in. Please check out first.' });
    }
    if (booking.status === 'CANCELLED') {
      return res.status(400).json({ message: 'This booking is already cancelled.' });
    }

    // Release room back to AVAILABLE
    await Room.findByIdAndUpdate(booking.roomId, { status: 'AVAILABLE' });

    booking.status = 'CANCELLED';
    await booking.save();

    res.json({ message: 'Booking cancelled successfully. Room is now available.', booking });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


// @route   GET /api/bookings/my-bookings
// @desc    Get current guest's bookings
// @access  Private (Guest)
router.get('/my-bookings', protect, async (req, res) => {
  try {
    const bookings = await Booking.find({ guestId: req.user._id })
      .populate('roomId')
      .sort({ createdAt: -1 });
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   GET /api/bookings
// @desc    Get all bookings (Staff view)
// @access  Private (Admin, Manager, Receptionist)
router.get('/', protect, authorizeRoles('admin', 'manager', 'receptionist'), async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate('guestId', 'name email phone')
      .populate('roomId')
      .sort({ createdAt: -1 });
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   POST /api/bookings/:id/checkin
// @desc    Receptionist performs Guest Check-In
// @access  Private (Receptionist, Admin, Manager)
router.post('/:id/checkin', protect, authorizeRoles('admin', 'manager', 'receptionist'), async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) return res.status(404).json({ message: 'Booking not found' });

    if (booking.status === 'CHECKED_IN') {
      return res.status(400).json({ message: 'Guest is already checked in' });
    }

    const room = await Room.findById(booking.roomId);
    if (!room) return res.status(404).json({ message: 'Associated room not found' });

    // Update room status to OCCUPIED
    room.status = 'OCCUPIED';
    await room.save();

    booking.status = 'CHECKED_IN';
    booking.checkedInAt = new Date();
    await booking.save();

    res.json({
      message: `Guest successfully checked into Room ${room.roomNumber}`,
      booking,
      room
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   POST /api/bookings/:id/checkout
// @desc    Receptionist performs Guest Check-Out (Triggers Bill Generation & Room -> CLEANING)
// @access  Private (Receptionist, Admin, Manager)
router.post('/:id/checkout', protect, authorizeRoles('admin', 'manager', 'receptionist'), async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id).populate('guestId').populate('roomId');
    if (!booking) return res.status(404).json({ message: 'Booking not found' });

    // Find any room service charges incurred during stay
    const serviceRequests = await ServiceRequest.find({
      roomId: booking.roomId._id,
      status: 'COMPLETED'
    });

    const totalServiceCharges = serviceRequests.reduce((acc, req) => acc + (req.price || 0), 0);

    const roomCharge = booking.totalAmount;
    const taxAmount = Math.round((roomCharge + totalServiceCharges) * 0.10); // 10% tax
    const grandTotal = roomCharge + totalServiceCharges + taxAmount;

    // Check if bill already exists or create new
    let bill = await Bill.findOne({ bookingId: booking._id });
    if (!bill) {
      bill = await Bill.create({
        invoiceNumber: 'INV-' + Math.floor(100000 + Math.random() * 900000),
        bookingId: booking._id,
        guestId: booking.guestId._id,
        roomId: booking.roomId._id,
        roomCharges: roomCharge,
        serviceCharges: totalServiceCharges,
        taxAmount,
        totalAmount: grandTotal,
        paymentStatus: 'PAID',
        paymentMethod: 'CASH',
        paidAt: new Date(),
        items: [
          { description: `Accommodation (${booking.totalNights} Night(s) - ${booking.roomId.roomType})`, amount: roomCharge },
          ...serviceRequests.map((sr) => ({ description: sr.title, amount: sr.price })),
          { description: 'Hotel Service & Taxes (10%)', amount: taxAmount }
        ]
      });
    } else {
      bill.paymentStatus = 'PAID';
      bill.paymentMethod = 'CASH';
      bill.paidAt = new Date();
      await bill.save();
    }

    // Update Room status to CLEANING
    await Room.findByIdAndUpdate(booking.roomId._id, { status: 'CLEANING' });

    // Update Booking status to CHECKED_OUT
    booking.status = 'CHECKED_OUT';
    booking.checkedOutAt = new Date();
    await booking.save();

    res.json({
      message: `Guest checked out from Room ${booking.roomId.roomNumber}. Room status updated to CLEANING.`,
      booking,
      bill
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
