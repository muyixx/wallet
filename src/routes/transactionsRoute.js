import express from 'express';
const router = express.Router();
import { sql } from '../config/db.js';
import {getTransactionsbyUserId, getSummaryByUserId, createTransaction, deleteTransaction} from '../controllers/transactionsController.js';

router.delete("/:id", deleteTransaction);
router.get("/summary/:userId", getSummaryByUserId);
router.get("/:userId", getTransactionsbyUserId);
router.post("/", createTransaction);


router.get('/', async (req, res) => {
    res.send('Welcome to the Expense Tracker API');

}); 
export default router;