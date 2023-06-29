import express from 'express'
import cors from 'cors'
import moment from 'moment'
import { sequelize } from './database/database';
import './models/index'

import config from './config/config';

const app = express()

async function main() {
  try {
    await sequelize.sync({})
      .then(() => {
        console.log('Base de datos y tablas creadas con éxito.');
      })
      .catch((error) => {
        console.error('Error al crear la base de datos:', error);
      });
    app.use(express.urlencoded({ extended: false }));
    app.use(express.json());

    app.use(cors({
      'allowedHeaders': ['sessionId', 'Content-Type', 'Authorization'],
      'exposedHeaders': ['sessionId'],
      'origin': '*',
      'methods': 'GET,HEAD,PUT,PATCH,POST,DELETE',
      'preflightContinue': false,
    }));

    const PORT = config.PORT

    app.get('/', (_, res) => {
      res.send({
        date: moment().format('YYYY-MM-DD[T]HH:mm:ss.SSSZ')
      });
    });

    app.use('/api/v1/', require('./routes/index'));

    app.listen(PORT, () => {
      console.log(`escuchando el puerto ${PORT}`);
    })
  } catch (e) {
    console.log("Unable to connect to the database", e)
  }
}

main()