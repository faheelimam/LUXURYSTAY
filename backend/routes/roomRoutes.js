const express = require('express');
const router = express.Router();
const Room = require('../models/Room');
const { protect, authorizeRoles } = require('../middleware/authMiddleware');

// @route   GET /api/rooms
// @desc    Get all rooms (Public or search filtered)
// @access  Public
router.get('/', async (req, res) => {
  try {
    const { status, roomType } = req.query;
    let query = {};
    if (status) query.status = status;
    if (roomType) query.roomType = roomType;

    const rooms = await Room.find(query).sort({ roomNumber: 1 });
    res.json(rooms);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   GET /api/rooms/:id
// @desc    Get single room by ID
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const room = await Room.findById(req.params.id);
    if (!room) return res.status(404).json({ message: 'Room not found' });
    res.json(room);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   POST /api/rooms
// @desc    Create a new Room
// @access  Private (Admin & Manager)
router.post('/', protect, authorizeRoles('admin', 'manager'), async (req, res) => {
  try {
    const { roomNumber, roomType, pricePerNight, capacity, floor, description, amenities, image } = req.body;

    const existingRoom = await Room.findOne({ roomNumber });
    if (existingRoom) {
      return res.status(400).json({ message: `Room number ${roomNumber} already exists` });
    }

    const room = await Room.create({
      roomNumber,
      roomType,
      pricePerNight,
      capacity: capacity || 2,
      floor: floor || 1,
      description: description || 'Luxury suite with panoramic views.',
      amenities: amenities || ['Free Wi-Fi', 'King Bed', 'Ocean View', 'Smart TV', 'Jacuzzi'],
      image: image || 'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1000&q=80',
      status: 'AVAILABLE'
    });

    res.status(201).json(room);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   PUT /api/rooms/:id
// @desc    Update Room details
// @access  Private (Admin & Manager)
router.put('/:id', protect, authorizeRoles('admin', 'manager'), async (req, res) => {
  try {
    const room = await Room.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!room) return res.status(404).json({ message: 'Room not found' });
    res.json(room);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   PATCH /api/rooms/:id/status
// @desc    Update Room Status (AVAILABLE, OCCUPIED, CLEANING, MAINTENANCE)
// @access  Private (Admin, Manager, Receptionist, Housekeeping)
router.patch('/:id/status', protect, authorizeRoles('admin', 'manager', 'receptionist', 'housekeeping'), async (req, res) => {
  try {
    const { status, maintenanceNote } = req.body;
    if (!['AVAILABLE', 'OCCUPIED', 'CLEANING', 'MAINTENANCE'].includes(status)) {
      return res.status(400).json({ message: 'Invalid room status' });
    }

    const room = await Room.findById(req.params.id);
    if (!room) return res.status(404).json({ message: 'Room not found' });

    room.status = status;
    if (maintenanceNote !== undefined) room.maintenanceNote = maintenanceNote;
    await room.save();

    res.json(room);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   DELETE /api/rooms/:id
// @desc    Delete Room
// @access  Private (Admin only)
router.delete('/:id', protect, authorizeRoles('admin'), async (req, res) => {
  try {
    await Room.findByIdAndDelete(req.params.id);
    res.json({ message: 'Room removed successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
