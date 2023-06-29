import express from 'express';
import { ApiPrice } from '../controllers';

const router = express.Router();

router.get('/price', ApiPrice.getPrice);
router.get('/price/:symbol', ApiPrice.getPriceBySymbol);
router.post('/savePrice', ApiPrice.savePrice);

export default router;