const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
const User = require('../models/userModel');

// ... (CORS and body-parser middleware setup)

router.post('/login', async (req, res) => {
  try {
    const { gmail, password } = req.body;

    // Find the user by email
    const user = await User.findOne({ gmail });

    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // For simplicity, compare the provided password directly with the user's password
    if (password !== user.password) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Generate a JWT token
    const token = jwt.sign({ userId: user._id }, 'your-secret-key', { expiresIn: '1h' });

    res.status(200).json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

router.post('/findFullName', async (req, res) => {
  try {
    const { gmail, password } = req.body;

    // Find the user by email and password
    const user = await User.findOne({ gmail, password });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Return the user's full_name
    res.status(200).json({ full_name: user.full_name });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;