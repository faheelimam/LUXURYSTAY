const express = require('express');
const router = express.Router();
const Feedback = require('../models/Feedback');
const { protect } = require('../middleware/authMiddleware');

// @route   POST /api/feedback
// @desc    Submit guest feedback/rating
// @access  Private (Guest, User)
router.post('/', protect, async (req, res) => {
  try {
    const { rating, comment, bookingId } = req.body;
    if (!rating || !comment) {
      return res.status(400).json({ message: 'Rating and review comment are required' });
    }

    const feedback = await Feedback.create({
      guestId: req.user._id,
      guestName: req.user.name,
      bookingId: bookingId || null,
      rating: Number(rating),
      comment
    });

    res.status(201).json({
      message: 'Thank you for your feedback!',
      feedback
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   GET /api/feedback
// @desc    Get all guest feedbacks
// @access  Public / Private
router.get('/', async (req, res) => {
  try {
    const feedbacks = await Feedback.find().sort({ createdAt: -1 });
    res.json(feedbacks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
