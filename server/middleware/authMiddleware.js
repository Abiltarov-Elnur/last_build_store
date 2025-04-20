const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET || 'supersecretkey';

function authMiddleware(req, res, next) {
  const token = req.headers.authorization?.split(' ')[1]; // "Bearer TOKEN"
  if (!token) return res.status(401).json({ error: 'Нет токена' });

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(403).json({ error: 'Недействительный токен' });
  }
}

module.exports = authMiddleware;
