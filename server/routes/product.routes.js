const express = require('express');
const router = express.Router();
const db = require('../db');

// Получить все продукты
router.get('/', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM product');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Получить продукт по ID
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const [rows] = await db.query('SELECT * FROM product WHERE product_id = ?', [id]);
    if (rows.length === 0) {
      return res.status(404).json({ message: 'Продукт не найден' });
    }
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Создать продукт
router.post('/', async (req, res) => {
  const { name_of_prod, price, type_of_prod, count } = req.body;
  try {
    const [result] = await db.query(
      'INSERT INTO product (name_of_prod, price, type_of_prod, count) VALUES (?, ?, ?, ?)',
      [name_of_prod, price, type_of_prod, count]
    );
    res.status(201).json({ id: result.insertId });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Обновить продукт
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { name_of_prod, price, type_of_prod, count } = req.body;
  try {
    await db.query(
      'UPDATE product SET name_of_prod = ?, price = ?, type_of_prod = ?, count = ? WHERE product_id = ?',
      [name_of_prod, price, type_of_prod, count, id]
    );
    res.json({ message: 'Продукт обновлён' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Удалить продукт
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await db.query('DELETE FROM product WHERE product_id = ?', [id]);
    res.json({ message: 'Продукт удалён' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
