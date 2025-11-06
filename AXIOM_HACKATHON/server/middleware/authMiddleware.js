import jwt from 'jsonwebtoken';
import User from '../models/User.js';

// Protect routes - verify JWT token
export const protect = async (req, res, next) => {
  let token;

  // Check for token in Authorization header
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      // Get token from header
      token = req.headers.authorization.split(' ')[1];

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Get user from token
      req.user = await User.findById(decoded.id).select('-password');

      if (!req.user) {
        return res.status(401).json({
          success: false,
          message: 'User not found',
        });
      }

      next();
    } catch (error) {
      console.error('Auth middleware error:', error);
      return res.status(401).json({
        success: false,
        message: 'Not authorized, token failed',
      });
    }
  }

  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'Not authorized, no token',
    });
  }
};

// Restrict to doctors only
export const doctorOnly = (req, res, next) => {
  if (req.user && req.user.isDoctor) {
    next();
  } else {
    res.status(403).json({
      success: false,
      message: 'Access denied. Doctors only.',
    });
  }
};

// Restrict to patients only
export const patientOnly = (req, res, next) => {
  if (req.user && !req.user.isDoctor) {
    next();
  } else {
    res.status(403).json({
      success: false,
      message: 'Access denied. Patients only.',
    });
  }
};
