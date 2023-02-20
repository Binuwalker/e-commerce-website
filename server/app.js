const express = require('express');
const errorMiddileware = require('./middlewares/error')
const cookieParser = require('cookie-parser');
const app = express();

const products = require('./routes/product')
const auth = require('./routes/auth');
const order = require('./routes/order');

app.use(express.json());
app.use(cookieParser());

app.use('/api/v1/', products)
app.use('/api/v1/', auth)
app.use('/api/v1/', order)

app.use(errorMiddileware)

module.exports = app;