import express from 'express';
//const router = express.Router();
import { sql } from '../config/db.js';
//import {getTransactionsbyUserId, getSummaryByUserId, createTransaction, deleteTransaction} from '../controllers/transactionsController.js';

export async function getTransactionsbyUserId(req,res)
{
     try {
            const { userId } = req.params;
            const transactions = await sql`SELECT * FROM transactions WHERE user_id = ${userId} ORDER BY created_at DESC` ;
            res.status(200).json(transactions);
        } catch (error) {
            console.error('Error fetching transactions:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
}

export async function createTransaction(req, res) {
const { user_id, title, amount, category } = req.body;
    if (!user_id || !title || !amount || !category) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    // Validate amount
    

    // Insert transaction into the database
    try {
        const result = await sql`INSERT INTO transactions (user_id, title, amount, category) VALUES (${user_id}, ${title}, ${amount}, ${category}) RETURNING *`;
        res.status(201).json(result[0]);
    } catch (error) {
        console.error('Error inserting transaction:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }

}
 export async function deleteTransaction(req, res) {
const { id } = req.params;
    // Validate ID
    if (isNaN(parseInt(id))) {
        return res.status(400).json({ message: 'invalid Transaction id' });
    }

    // Delete transaction from the database
    try {
        const result = await sql`DELETE FROM transactions WHERE id = ${id} RETURNING *`;
        if (result.length === 0) {
            return res.status(404).json({ error: 'Transaction not found' });
        }
        res.status(200).json({ message: 'Transaction deleted successfully', transaction: result[0] });
    } catch (error) {
        console.error('Error deleting transaction:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }

 }

 export async function getSummaryByUserId(req, res) {
   const { userId } = req.params;
    // Validate userId
    if (!userId) {
        return res.status(400).json({ error: 'User ID is required' });
    }

    // Fetch summary from the database
    try {
        const expensesResult = await sql`SELECT COALESCE(SUM(amount),0) as expenses FROM transactions WHERE user_id = ${userId} AND amount < 0`;
        const incomeResult = await sql`SELECT COALESCE(SUM(amount),0) as income FROM transactions WHERE user_id = ${userId} AND amount > 0`;
        const balanceResult = await sql`SELECT COALESCE(SUM(amount),0) as balance FROM transactions WHERE user_id = ${userId}`;
       // const summary = await sql`SELECT category, SUM(amount) as total FROM transactions WHERE user_id = ${userId} GROUP BY category`;
        res.status(200).json({
            balance: balanceResult[0].balance,
            income: incomeResult[0].income,
            expenses: expensesResult[0].expenses,
           
        });
    } catch (error) {
        console.error('Error fetching summary:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }  

 }
