import express from 'express'
const app = express();
import price from './PriceRoutes';

app.use(price)

module.exports = app;