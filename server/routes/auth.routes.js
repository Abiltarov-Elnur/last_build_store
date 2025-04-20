const express = require('express');
const router = express.Router();
const db = require('../db');

// Простой вход
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Проверка в client
    let [rows] = await db.query('SELECT * FROM client WHERE email = ? AND password = ?', [email, password]);
    if (rows.length > 0) {
      return res.json({ role: 'client', user: rows[0] });
    }

    // Проверка в seller
    [rows] = await db.query('SELECT * FROM seller WHERE email = ? AND password = ?', [email, password]);
    if (rows.length > 0) {
      return res.json({ role: 'seller', user: rows[0] });
    }

    // Проверка в admin
    [rows] = await db.query('SELECT * FROM admin WHERE email = ? AND password = ?', [email, password]);
    if (rows.length > 0) {
      return res.json({ role: 'admin', user: rows[0] });
    }

    // Не найдено
    res.status(401).json({ error: 'Неверный email или пароль' });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Ошибка при входе' });
  }
});

module.exports = router;
