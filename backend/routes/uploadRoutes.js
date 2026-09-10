const express = require('express');
const router = express.Router();
const { upload } = require('../config/cloudinary');
const { protect, authorizeRoles } = require('../middleware/authMiddleware');

// @route   POST /api/upload/room-image
// @desc    Upload a room image to Cloudinary
// @access  Private (Admin & Manager)
router.post(
  '/room-image',
  protect,
  authorizeRoles('admin', 'manager'),
  (req, res, next) => {
    // Run multer upload and catch its errors properly
    upload.single('image')(req, res, (err) => {
      if (err) {
        console.error('[Upload Error]:', err);
        return res.status(400).json({
          message: err.message || 'Image upload failed',
          detail: err.code || 'UPLOAD_ERROR'
        });
      }
      next();
    });
  },
  (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ message: 'No image file provided. Make sure field name is "image".' });
      }

      console.log('[Cloudinary Upload Success]:', req.file.path);

      // multer-storage-cloudinary puts secure URL in req.file.path
      res.json({
        message: 'Image uploaded successfully to Cloudinary',
        imageUrl: req.file.path,
        publicId: req.file.filename
      });
    } catch (error) {
      console.error('[Upload Handler Error]:', error);
      res.status(500).json({ message: 'Image upload failed', error: error.message });
    }
  }
);

module.exports = router;
