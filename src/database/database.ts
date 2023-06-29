import { Sequelize } from "sequelize";
import config from '../config/config';

export const sequelize = new Sequelize(`${config.DATABASE_NAME}`, `${config.DATABASE_USER}`, `${config.DATABASE_PASS}`, {
    host: `${config.DATABASE_URL}`,
    port: 5432,
    dialect: 'postgres'
})