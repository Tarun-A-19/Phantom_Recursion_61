import express from 'express';
import User from '../models/User.js';

const router = express.Router();

// Test route to check database connection
router.get('/test', async (req, res) => {
  try {
    // Try to find any user (just to test the connection)
    const users = await User.find({}).limit(1);
    res.json({
      message: 'Database connection successful!',
      usersCount: users.length
    });
  } catch (error) {
    console.error('Database error:', error);
    res.status(500).json({
      message: 'Error connecting to database',
      error: error.message
    });
  }
});

export default router;
