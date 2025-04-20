const express = require('express');
const router = express.Router();
const db = require('../db');

// Получить всех продавцов
router.get('/', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM seller');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Получить одного продавца по ID
router.get('/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const [rows] = await db.query('SELECT * FROM seller WHERE seller_id = ?', [id]);
    if (rows.length === 0) {
      res.status(404).json({ error: 'Продавец не найден' });
    } else {
      res.json(rows[0]);
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Добавить нового продавца
router.post('/', async (req, res) => {
  const { name, surname, telph, email, city, salary } = req.body;
  try {
    const [result] = await db.query(
      'INSERT INTO seller (name, surname, telph, email, city, salary) VALUES (?, ?, ?, ?, ?, ?)',
      [name, surname, telph, email, city, salary]
    );
    res.status(201).json({ message: 'Продавец добавлен', seller_id: result.insertId });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Обновить данные продавца
router.put('/:id', async (req, res) => {
  const id = req.params.id;
  const { name, surname, telph, email, city, salary } = req.body;
  try {
    const [result] = await db.query(
      'UPDATE seller SET name = ?, surname = ?, telph = ?, email = ?, city = ?, salary = ? WHERE seller_id = ?',
      [name, surname, telph, email, city, salary, id]
    );
    if (result.affectedRows === 0) {
      res.status(404).json({ error: 'Продавец не найден' });
    } else {
      res.json({ message: 'Данные продавца обновлены' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Удалить продавца
// Удалить продавца
router.delete('/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const [result] = await db.query('DELETE FROM seller WHERE seller_id = ?', [id]);
    if (result.affectedRows === 0) {
      res.status(404).json({ error: 'Продавец не найден' });
    } else {
      res.json({ message: 'Продавец удалён' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


module.exports = router;
