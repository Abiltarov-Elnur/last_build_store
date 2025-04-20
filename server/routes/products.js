const express = require('express');
const router = express.Router();
const db = require('../db');

// GET /api/products — получить все товары
router.get('/', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM product');
    res.json(rows);
  } catch (err) {
    console.error('Ошибка при получении товаров:', err);
    res.status(500).json({ error: 'Ошибка сервера' });
  }
});

module.exports = router;
