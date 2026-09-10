const express = require('express');
const router = express.Router();
const Room = require('../models/Room');
const ServiceRequest = require('../models/ServiceRequest');
const { protect, authorizeRoles } = require('../middleware/authMiddleware');

router.use(protect);

// @route   GET /api/housekeeping/cleaning-rooms
// @desc    Get all rooms with CLEANING or MAINTENANCE status
// @access  Private (Housekeeping, Manager, Admin, Receptionist)
router.get('/cleaning-rooms', authorizeRoles('housekeeping', 'manager', 'admin', 'receptionist'), async (req, res) => {
  try {
    const rooms = await Room.find({ status: { $in: ['CLEANING', 'MAINTENANCE'] } }).sort({ roomNumber: 1 });
    res.json(rooms);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   POST /api/housekeeping/clean/:roomId
// @desc    Mark room as cleaned (CLEANING -> AVAILABLE)
// @access  Private (Housekeeping, Manager, Admin)
router.post('/clean/:roomId', authorizeRoles('housekeeping', 'manager', 'admin'), async (req, res) => {
  try {
    const room = await Room.findById(req.params.roomId);
    if (!room) return res.status(404).json({ message: 'Room not found' });

    room.status = 'AVAILABLE';
    room.maintenanceNote = '';
    await room.save();

    res.json({
      message: `Room ${room.roomNumber} has been cleaned and is now AVAILABLE for guests.`,
      room
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   POST /api/housekeeping/maintenance
// @desc    Raise a maintenance ticket for a room (e.g., AC defect)
// @access  Private (Housekeeping, Receptionist, Manager, Admin)
router.post('/maintenance', authorizeRoles('housekeeping', 'receptionist', 'manager', 'admin'), async (req, res) => {
  try {
    const { roomId, description } = req.body;
    if (!roomId || !description) {
      return res.status(400).json({ message: 'Room ID and issue description are required' });
    }

    const room = await Room.findById(roomId);
    if (!room) return res.status(404).json({ message: 'Room not found' });

    room.status = 'MAINTENANCE';
    room.maintenanceNote = description;
    await room.save();

    const ticket = await ServiceRequest.create({
      roomId: room._id,
      type: 'MAINTENANCE',
      title: `Maintenance Request for Room ${room.roomNumber}`,
      description,
      status: 'PENDING'
    });

    res.status(201).json({
      message: `Maintenance ticket reported for Room ${room.roomNumber}`,
      room,
      ticket
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   POST /api/housekeeping/resolve-maintenance/:roomId
// @desc    Resolve maintenance issue (MAINTENANCE -> CLEANING or AVAILABLE)
// @access  Private (Manager, Housekeeping, Admin)
router.post('/resolve-maintenance/:roomId', authorizeRoles('manager', 'housekeeping', 'admin'), async (req, res) => {
  try {
    const room = await Room.findById(req.params.roomId);
    if (!room) return res.status(404).json({ message: 'Room not found' });

    room.status = 'CLEANING'; // Send to cleaning after repair
    room.maintenanceNote = '';
    await room.save();

    res.json({
      message: `Maintenance resolved for Room ${room.roomNumber}. Sent to CLEANING queue.`,
      room
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
