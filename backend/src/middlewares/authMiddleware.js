const jwt = require('jsonwebtoken');
require('dotenv').config();

const authenticate = async (req, res, next) => {
  const bearer = req.headers.authorization;
  if (!bearer) return res.status(401).json({ message: 'Authorization required' });
  const token = bearer.split(' ')[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // { id, email }
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Invalid token' });
  }
};

module.exports = authenticate;
