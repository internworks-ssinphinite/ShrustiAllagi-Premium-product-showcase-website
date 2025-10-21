// src/app.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');

const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');
const cartRoutes = require('./routes/cartRoutes');   // optional: create if not exist
const orderRoutes = require('./routes/orderRoutes'); // optional: create if not exist

const app = express();

app.use(cors({
  origin: process.env.FRONTEND_URL || '*',
  credentials: true
}));
app.use(express.json({ limit: '10mb' }));

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);

// if you don't have cartRoutes/orderRoutes yet, these will throw — remove them until created:
// app.use('/api/cart', cartRoutes);
// app.use('/api/orders', orderRoutes);

// basic health check
app.get('/', (req, res) => res.send('Shrusti backend (serverless) is up'));

module.exports = app;
