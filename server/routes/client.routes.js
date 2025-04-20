const express = require('express');
const router = express.Router();
const db = require('../db');

// Получить всех клиентов
router.get('/', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM client');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Получить одного клиента по ID
router.get('/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const [rows] = await db.query('SELECT * FROM client WHERE client_id = ?', [id]);
    if (rows.length === 0) {
      res.status(404).json({ error: 'Клиент не найден' });
    } else {
      res.json(rows[0]);
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Добавить нового клиента
router.post('/', async (req, res) => {
  const { name, surname, telph, email, city } = req.body;
  try {
    const [result] = await db.query(
      'INSERT INTO client (name, surname, telph, email, city) VALUES (?, ?, ?, ?, ?)',
      [name, surname, telph, email, city]
    );
    res.status(201).json({ message: 'Клиент добавлен', client_id: result.insertId });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Обновить клиента по ID
router.put('/:id', async (req, res) => {
  const id = req.params.id;
  const { name, surname, telph, email, city } = req.body;
  try {
    const [result] = await db.query(
      'UPDATE client SET name = ?, surname = ?, telph = ?, email = ?, city = ? WHERE client_id = ?',
      [name, surname, telph, email, city, id]
    );
    if (result.affectedRows === 0) {
      res.status(404).json({ error: 'Клиент не найден' });
    } else {
      res.json({ message: 'Клиент обновлён' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Удалить клиента по ID
router.delete('/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const [result] = await db.query('DELETE FROM client WHERE client_id = ?', [id]);
    if (result.affectedRows === 0) {
      res.status(404).json({ error: 'Клиент не найден' });
    } else {
      res.json({ message: 'Клиент удалён' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
