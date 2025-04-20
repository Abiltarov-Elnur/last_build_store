const express = require('express');
const router = express.Router();
const db = require('../db');

// Получить все чеки
router.get('/', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM cheque');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Получить чек по ID
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const [rows] = await db.query('SELECT * FROM cheque WHERE cheque_id = ?', [id]);
    if (rows.length === 0) {
      return res.status(404).json({ message: 'Чек не найден' });
    }
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Создать чек
router.post('/', async (req, res) => {
  const { date, order_id } = req.body;
  try {
    const [result] = await db.query(
      'INSERT INTO cheque (date, order_id) VALUES (?, ?)',
      [date, order_id]
    );
    res.status(201).json({ id: result.insertId });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Обновить чек
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { date, order_id } = req.body;
  try {
    await db.query(
      'UPDATE cheque SET date = ?, order_id = ? WHERE cheque_id = ?',
      [date, order_id, id]
    );
    res.json({ message: 'Чек обновлён' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Удалить чек
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await db.query('DELETE FROM cheque WHERE cheque_id = ?', [id]);
    res.json({ message: 'Чек удалён' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
