const express = require('express');
const router = express.Router();

// Временный маршрут (тестовый)
router.get('/', (req, res) => {
  res.json({ message: 'Auth route работает!' });
});

module.exports = router;
