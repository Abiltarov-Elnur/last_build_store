const express = require('express');
const router = express.Router(); // 💥 вот этой строчки не хватало!
const db = require('../db');


router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
      const [rows] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
      if (rows.length === 0) {
        return res.status(400).json({ error: 'Пользователь не найден' });
      }
  
      const user = rows[0];
  
      if (password !== user.password) {
        return res.status(400).json({ error: 'Неверный пароль' });
      }
  
      res.json({
        message: 'Успешный вход',
        role: user.role, // <-- Это важно
        user: {
          id: user.id,
          name: user.name,
          email: user.email
        }
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Ошибка на сервере' });
    }
  });

  module.exports = router;
