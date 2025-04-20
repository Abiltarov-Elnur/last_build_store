require('dotenv').config();
const express = require('express');
const app = express();

app.use(express.static('public'));

const path = require('path');


// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Статические файлы
app.use(express.static(path.join(__dirname, '../public')));

// Подключаем роуты (только если они корректны)
/*const authRoutes = require('./routes/auth');*/
/*const productRoutes = require('./routes/products');*/
const clientRoutes = require('./routes/client.routes');
const sellerRoutes = require('./routes/seller.routes');
const productRoutes = require('./routes/product.routes');
const orderRoutes = require('./routes/order.routes');
const chequeRoutes = require('./routes/cheque.routes');
const adminRoutes = require('./routes/admin.routes');
const authRoutes = require('./routes/auth.routes');




app.use('/api/auth', authRoutes);
app.use('/api/admins', adminRoutes);
app.use('/api/cheques', chequeRoutes);
app.use('/api/orders', orderRoutes);
/*app.use('/api/auth', authRoutes);*/
/*app.use('/api/products', productRoutes);*/
app.use('/api/clients', clientRoutes);
app.use('/api/sellers', sellerRoutes);
app.use('/api/products', productRoutes);


// Запуск
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Сервер запущен на http://localhost:${PORT}`);
});




/*
ничего не понятно, у меня базовый курсовой проект, может сделаем обычный вход через пороли и по ролям нужным нам, без хеширования и всякой сложной трепетни?
и если мы облегчим мне работу, то что делать с таблицами users в wordbench и файлом authMiddleware.js, auth.routes.js
*/