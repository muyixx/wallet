import  express from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
dotenv.config();
import transactionsRoute from './src/routes/transactionsRoute.js';
import { sql } from './src/config/db.js';
import rateLimiter from './src/middleware/rateLimiter.js';

//const express = require('express');
const app = express();
const PORT = process.env.PORT;
//const bodyParser = require('body-parser')

//middleware
//app.use(express.json());
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());
//app.use(logger);
app.use(rateLimiter);
app.use("/api/transactions", transactionsRoute);

//app.use(express.json()); // Middleware to parse JSON bodies

async function initDb() {
    try {
        await sql`CREATE TABLE IF NOT EXISTS transactions (
            id SERIAL PRIMARY KEY,
            user_id VARCHAR(255) NOT NULL,
            title VARCHAR(255) NOT NULL,
            amount DECIMAL(10,2)  NOT NULL,
            category VARCHAR(255) NOT NULL,
            created_at  DATE NOT NULL DEFAULT CURRENT_DATE
        )`
        console.log('Database initialized successfully');
    } catch (error) {
        console.error('Error connecting to the database:', error);
        process.exit(1);
    }
}


initDb().then(() => {
   app.listen(5001, ()=>{
    console.log('Server is running on port 5001');
});
});



