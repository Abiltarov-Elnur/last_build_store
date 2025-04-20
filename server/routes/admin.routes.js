const express = require('express');
const router = express.Router();
const db = require('../db');

// Получить всех админов
router.get('/', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM admin');
    res.json(rows);
  } catch (err) {
    console.error('Ошибка при получении админов:', err);
    res.status(500).json({ error: 'Ошибка сервера' });
  }
});

// Добавить админа
router.post('/', async (req, res) => {
  const { name, surname, telph, email, city, salary } = req.body;
  try {
    const [result] = await db.query(
      'INSERT INTO admin (name, surname, telph, email, city, salary) VALUES (?, ?, ?, ?, ?, ?)',
      [name, surname, telph, email, city, salary]
    );
    res.status(201).json({ message: 'Админ добавлен', id: result.insertId });
  } catch (err) {
    console.error('Ошибка при добавлении админа:', err);
    res.status(500).json({ error: 'Ошибка сервера' });
  }
});

module.exports = router;
