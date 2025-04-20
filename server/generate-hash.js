// server/generate-hash.js
const bcrypt = require('bcrypt');

async function generateHash(password) {
  const hashed = await bcrypt.hash(password, 10);
  console.log('Hashed password:', hashed);
}

generateHash('123456'); // ← сюда вставь нужный тебе пароль
