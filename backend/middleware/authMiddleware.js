const jwt = require('jsonwebtoken');
const config = require('../config');

function authenticateToken(req, res, next) {
  const token = req.headers.authorization.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Authentication token missing' });
  }

  jwt.verify(token, config.secretKey, (error, decodedToken) => {
    if (error) {
      return res.status(401).json({ message: 'Invalid token' });
    }
    req.user = decodedToken;
    next();
  });
}

module.exports = {
  authenticateToken,
};
