const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Room = require('../models/Room');
const Booking = require('../models/Booking');
const Bill = require('../models/Bill');
const { protect, authorizeRoles } = require('../middleware/authMiddleware');

// Apply protect middleware to all admin endpoints
router.use(protect);

// @route   POST /api/admin/create-staff
// @desc    Admin creates staff account (Manager, Receptionist, Housekeeping)
// @access  Private (Admin only)
router.post('/create-staff', authorizeRoles('admin'), async (req, res) => {
  try {
    const { name, email, password, role, phone } = req.body;

    if (!name || !email || !password || !role) {
      return res.status(400).json({ message: 'Please provide name, email, password, and role' });
    }

    if (!['manager', 'receptionist', 'housekeeping'].includes(role)) {
      return res.status(400).json({ message: 'Invalid staff role specified' });
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'User already exists with this email' });
    }

    const staff = await User.create({
      name,
      email,
      password,
      role,
      phone: phone || '',
      createdBy: req.user._id
    });

    res.status(201).json({
      message: `Staff account (${role}) created successfully`,
      staff: {
        _id: staff._id,
        name: staff.name,
        email: staff.email,
        role: staff.role,
        phone: staff.phone,
        createdAt: staff.createdAt
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   GET /api/admin/users
// @desc    Get all users / staff directory
// @access  Private (Admin only)
router.get('/users', authorizeRoles('admin'), async (req, res) => {
  try {
    const users = await User.find().select('-password').sort({ createdAt: -1 });
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   DELETE /api/admin/users/:id
// @desc    Delete a user / staff account
// @access  Private (Admin only)
router.delete('/users/:id', authorizeRoles('admin'), async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    if (user.role === 'admin') {
      return res.status(400).json({ message: 'Cannot delete primary admin account' });
    }
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   GET /api/admin/analytics
// @desc    Get system-wide overview metrics & comprehensive revenue telemetry
// @access  Private (Admin & Manager)
router.get('/analytics', authorizeRoles('admin', 'manager'), async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const staffCount = await User.countDocuments({ role: { $in: ['manager', 'receptionist', 'housekeeping'] } });
    const totalRooms = await Room.countDocuments();
    const availableRooms = await Room.countDocuments({ status: 'AVAILABLE' });
    const occupiedRooms = await Room.countDocuments({ status: 'OCCUPIED' });
    const cleaningRooms = await Room.countDocuments({ status: 'CLEANING' });
    const maintenanceRooms = await Room.countDocuments({ status: 'MAINTENANCE' });

    const totalBookings = await Booking.countDocuments();
    const activeBookings = await Booking.countDocuments({ status: 'CHECKED_IN' });
    
    // Revenue & Payment calculations (All transactions cash at counter)
    const allBills = await Bill.find()
      .populate('guestId', 'name email')
      .populate('roomId', 'roomNumber roomType')
      .sort({ paidAt: -1, createdAt: -1 });

    const totalRevenue = allBills.reduce((acc, bill) => acc + (bill.totalAmount || 0), 0);
    const roomRevenue = allBills.reduce((acc, bill) => acc + (bill.roomCharges || 0), 0);
    const serviceRevenue = allBills.reduce((acc, bill) => acc + (bill.serviceCharges || 0), 0);
    const taxCollected = allBills.reduce((acc, bill) => acc + (bill.taxAmount || 0), 0);

    res.json({
      users: { total: totalUsers, staff: staffCount },
      rooms: {
        total: totalRooms,
        available: availableRooms,
        occupied: occupiedRooms,
        cleaning: cleaningRooms,
        maintenance: maintenanceRooms,
        occupancyRate: totalRooms ? Math.round((occupiedRooms / totalRooms) * 100) : 0
      },
      bookings: { total: totalBookings, active: activeBookings },
      financials: {
        totalRevenue,
        roomRevenue,
        serviceRevenue,
        taxCollected,
        cashRevenue: totalRevenue,
        cashPaymentsCount: allBills.length,
        paidCount: allBills.length,
        averageFolio: allBills.length ? Math.round(totalRevenue / allBills.length) : 0,
        recentTransactions: allBills.slice(0, 10).map(b => ({
          _id: b._id,
          invoiceNumber: b.invoiceNumber,
          guestName: b.guestId?.name || 'Guest',
          guestEmail: b.guestId?.email,
          roomNumber: b.roomId?.roomNumber || 'N/A',
          roomType: b.roomId?.roomType,
          roomCharges: b.roomCharges,
          serviceCharges: b.serviceCharges,
          taxAmount: b.taxAmount,
          totalAmount: b.totalAmount,
          paymentMethod: 'CASH',
          paidAt: b.paidAt || b.updatedAt
        }))
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.patch('/rooms/:id/status', authorizeRoles('admin', 'manager'), async (req, res) => {
  try {
    const { status } = req.body;
    const validStatuses = ['AVAILABLE', 'OCCUPIED', 'CLEANING', 'MAINTENANCE'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ message: 'Invalid status value' });
    }
    const room = await Room.findByIdAndUpdate(req.params.id, { status }, { new: true });
    if (!room) return res.status(404).json({ message: 'Room not found' });
    res.json({ message: 'Room status updated', room });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
