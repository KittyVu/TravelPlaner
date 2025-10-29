import dotenv from 'dotenv';
import { Sequelize } from "sequelize";
dotenv.config();

export const dbCon = new Sequelize(
    `postgres://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}:5432/${process.env.DB_NAME}`, 
    {logging: false}
);