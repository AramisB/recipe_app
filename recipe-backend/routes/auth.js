const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const jwt = require('jsonwebtoken');
const User = require('../models/Users'); // Ensure this path is correct

// Multer configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../public/uploads')); // Updated path
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 2 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type. Only JPEG, PNG, and GIF are allowed.'));
    }
  },
});

// Routes
router.post('/register', async (req, res) => {
  // Registration logic
});

router.post('/login', async (req, res) => {
  // Login logic
});

router.post('/profile', upload.single('profilePic'), async (req, res) => {
  try {
    const { age, sex } = req.body;
    const profilePic = req.file ? `/uploads/${req.file.filename}` : undefined;
    // Update user profile logic
    res.json({ message: 'Profile updated successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// JWT Secret
const jwtSecret = process.env.JWT_SECRET;
if (!jwtSecret) {
  throw new Error('JWT_SECRET is not set in the .env file');
}

module.exports = router;
