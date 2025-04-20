const express = require('express');
const router = express.Router();
const db = require('../db');

// 📦 Получить все товары
router.get('/', async (req, res) => {
  try {
    const category = req.query.category;
    let query = 'SELECT * FROM product';
    let params = [];

    if (category) {
      query += ' WHERE category_id = ?';
      params.push(category);
    }

    const [rows] = await db.query(query, params);
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Ошибка при получении товаров' });
  }
});

// 📦 Получить товар по ID
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const [rows] = await db.query('SELECT * FROM product WHERE product_id = ?', [id]);

    if (rows.length === 0) {
      return res.status(404).json({ error: 'Товар не найден' });
    }

    res.json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Ошибка при получении товара' });
  }
});

module.exports = router;
