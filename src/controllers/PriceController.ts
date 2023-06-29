import { Request, Response } from 'express';
import axios from 'axios';
import { Price } from '../models/index';
const TIMEOUT_DURATION = 30000;

class PriceController {
    public async getPrice(_req: Request, res: Response): Promise<void> {
        try {
            //Consultar tasas a Coingecko
            const response = await axios.get(process.env.COINGECKO_API_URL!, {
                params: {
                    ids: 'bitcoin,tether,ethereum,binancecoin',
                    vs_currencies: 'usd,eur',
                },
                timeout: TIMEOUT_DURATION
            });

            const usdtPrice = parseFloat(response.data.tether.usd);
            const euroPrice = usdtPrice / parseFloat(response.data.tether.eur);
            const btcPrice = response.data.bitcoin.usd;
            const ethPrice = response.data.ethereum.usd;
            const bnbPrice = response.data.binancecoin.usd;
            if (
                isNaN(btcPrice) ||
                isNaN(ethPrice) ||
                isNaN(bnbPrice) ||
                isNaN(usdtPrice) ||
                isNaN(euroPrice)
            ) {

                const prices = await Price.findAll({
                    where: { symbol: ['BTC', 'ETH', 'BNB', 'USDT', 'EURO', 'VES'] },
                    order: [['createdAt', 'DESC']],
                    limit: 1,
                });

                const vesConsult = await Price.findAll({
                    where: { symbol: ['VES'] },
                    order: [['createdAt', 'DESC']],
                    limit: 1,
                });
    
                var vesPrice;
    
                if (vesConsult.length != 0){
                    vesPrice = vesConsult.find((price: any) => price.symbol === 'VES')?.value;
                } else {
                    vesPrice = 100000;
                }

                if (prices.length === 0) {

                    res.status(500).json({ error: 'Error al obtener el precio' });

                } else {

                    const btcPrice = prices.find((price: any) => price.symbol === 'BTC')?.value;
                    const ethPrice = prices.find((price: any) => price.symbol === 'ETH')?.value;
                    const bnbPrice = prices.find((price: any) => price.symbol === 'BNB')?.value;
                    const usdtPrice = prices.find((price: any) => price.symbol === 'USDT')?.value;
                    const euroPrice = prices.find((price: any) => price.symbol === 'EURO')?.value;
                    const vesPrice = prices.find((price: any) => price.symbol === 'VES')?.value;

                    res.json({ btcPrice, ethPrice, bnbPrice, usdtPrice, euroPrice, vesPrice });
                }

                throw new Error('No se pudo obtener el precio de Coingecko');
            }

            const vesConsult = await Price.findAll({
                where: { symbol: ['VES'] },
                order: [['createdAt', 'DESC']],
                limit: 1,
            });

            var vesPrice;

            if (vesConsult.length != 0){
                vesPrice = vesConsult.find((price: any) => price.symbol === 'VES')?.value;
            } else {
                vesPrice = 100000;
            }       

            await Price.bulkCreate([
                { symbol: 'BTC', value: btcPrice },
                { symbol: 'ETH', value: ethPrice },
                { symbol: 'BNB', value: bnbPrice },
                { symbol: 'USDT', value: usdtPrice },
                { symbol: 'EURO', value: euroPrice },
            ]);

            res.json({ btcPrice, ethPrice, bnbPrice, usdtPrice, euroPrice, vesPrice });

        } catch (error: any) {

            console.error('Error al obtener el precio desde Binance:', error.message);
            try {
                const prices = await Price.findAll({
                    where: { symbol: ['BTC', 'ETH', 'BNB', 'USDT', 'EURO', 'VES'] },
                    order: [['createdAt', 'DESC']],
                    limit: 1,
                });

                const vesConsult = await Price.findAll({
                    where: { symbol: ['VES'] },
                    order: [['createdAt', 'DESC']],
                    limit: 1,
                });
    
                var vesPrice;
    
                if (vesConsult.length != 0){
                    vesPrice = vesConsult.find((price: any) => price.symbol === 'VES')?.value;
                } else {
                    vesPrice = 100000;
                }

                console.log({ prices })

                if (prices.length === 0) {
                    res.status(500).json({ error: 'Error al obtener el precio' });
                } else {
                    const btcPrice = prices.find((price: any) => price.symbol === 'BTC')?.value;
                    const ethPrice = prices.find((price: any) => price.symbol === 'ETH')?.value;
                    const bnbPrice = prices.find((price: any) => price.symbol === 'BNB')?.value;
                    const usdtPrice = prices.find((price: any) => price.symbol === 'USDT')?.value;
                    const euroPrice = prices.find((price: any) => price.symbol === 'EURO')?.value;
                    const vesPrice = prices.find((price: any) => price.symbol === 'VES')?.value;

                    res.json({ btcPrice, ethPrice, bnbPrice, usdtPrice, euroPrice, vesPrice });
                }
            } catch (error: any) {
                res.status(500).json({ data: false, status: 500, msg: error.message, success: false })
            }
        }
    }
    public async getPriceBySymbol(req: Request, res: Response): Promise<void> {
        try {
            const { symbol } = req.params;

            // Consultar el precio por símbolo
            const prices = await Price.findAll({
                where: { symbol: symbol },
                order: [['createdAt', 'DESC']],
                limit: 1,
            });

            res.json({ prices })

            if (!prices) {
                res.status(404).json({ message: 'Precio no encontrado' });
            }

            res.json(prices);
        } catch (error: any) {
            console.error('Error al consultar el precio:', error);
            res.status(500).json({ data: false, status: 500, msg: error.message, success: false });
        }
    }
    public async savePrice(req: Request, res: Response): Promise<void> {
        try {
            const { symbol, value } = req.body;

            // Crear un nuevo precio
            const price = await Price.create({ symbol, value });

            res.status(201).json(price);
        } catch (error) {
            console.error('Error al guardar el precio:', error);
            res.status(500).json({ message: 'Error al guardar el precio' });
        }
    }
}

export default new PriceController();