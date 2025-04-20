const db = require('./db');

async function testConnection() {
  try {
    const [rows] = await db.query('SELECT 1 + 1 AS result');
    console.log('✅ Успешное подключение к базе данных! Результат:', rows[0].result);
  } catch (err) {
    console.error('❌ Ошибка подключения к базе:', err.message);
  }
}

testConnection();
