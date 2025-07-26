const jwt = require('jsonwebtoken');
const logger = require('../utils/logger.utils');

const authenticateJWT = (req, res, next) => {  
  const token = req.header('Authorization')?.split(' ')[0]; // Extract token from header

  if (!token) {
    logger.error('No token provided');
    return res.status(401).json({ message: 'Access denied. No token provided.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_TOKEN); // Verify token with secret
    req.user = decoded;
    next();
  } catch (err) {
    logger.error('Invalid or expired token');
    return res.status(401).json({ message: 'Invalid or expired token.' });
  }
};

module.exports = authenticateJWT;
