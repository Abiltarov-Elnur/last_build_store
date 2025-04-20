const express = require('express');
const router = express.Router();
const db = require('../db');

// Получить все заказы
router.get('/', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM `order`');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Получить заказ по ID
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const [rows] = await db.query('SELECT * FROM `order` WHERE order_id = ?', [id]);
    if (rows.length === 0) {
      return res.status(404).json({ message: 'Заказ не найден' });
    }
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Создать заказ
router.post('/', async (req, res) => {
  const { status, date, seller_id, client_id, product_product_id } = req.body;
  try {
    const [result] = await db.query(
      'INSERT INTO `order` (status, date, seller_id, client_id, product_product_id) VALUES (?, ?, ?, ?, ?)',
      [status, date, seller_id, client_id, product_product_id]
    );
    res.status(201).json({ id: result.insertId });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Обновить заказ
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { status, date, seller_id, client_id, product_product_id } = req.body;
  try {
    await db.query(
      'UPDATE `order` SET status = ?, date = ?, seller_id = ?, client_id = ?, product_product_id = ? WHERE order_id = ?',
      [status, date, seller_id, client_id, product_product_id, id]
    );
    res.json({ message: 'Заказ обновлён' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Удалить заказ
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await db.query('DELETE FROM `order` WHERE order_id = ?', [id]);
    res.json({ message: 'Заказ удалён' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;



