const jwt = require('jsonwebtoken');

module.exports = {
  generateToken: (data, JWT_SECRET, expires) => {
    return jwt.sign(data, JWT_SECRET, {
      algorithm: 'HS256',
      expiresIn: expires
    });
  },
  verifyToken: (token, JWT_SECRET) => {
    return jwt.verify(token, JWT_SECRET);
  },
};