// controllers/transactionController.js
const Transaction = require('../models/Transaction');

// Create a new transaction
const createTransaction = async (req, res) => {
    const { type, category, amount, description } = req.body;
    try {
        const newTransaction = new Transaction({
            type,
            category,
            amount,
            description,
        });
        const savedTransaction = await newTransaction.save();
        res.status(201).json(savedTransaction);
    } catch (error) {
        console.error('Error creating transaction:', error);
        res.status(500).json({ message: 'Server Error', error });
    }
};

// Get all transactions
const getTransactions = async (req, res) => {
    try {
        const transactions = await Transaction.find();
        res.status(200).json(transactions);
    } catch (error) {
        console.error('Error retrieving transactions:', error);
        res.status(500).json({ message: 'Server Error', error });
    }
};

// Get a transaction by ID
const getTransactionById = async (req, res) => {
    const { id } = req.params;
    try {
        const transaction = await Transaction.findById(id);
        if (!transaction) {
            return res.status(404).json({ message: 'Transaction not found' });
        }
        res.status(200).json(transaction);
    } catch (error) {
        console.error('Error retrieving transaction:', error);
        res.status(500).json({ message: 'Server Error', error });
    }
};

// Update a transaction by ID
const updateTransaction = async (req, res) => {
    const { id } = req.params;
    const { type, category, amount, description } = req.body;
    try {
        const updatedTransaction = await Transaction.findByIdAndUpdate(
            id,
            { type, category, amount, description },
            { new: true }
        );
        if (!updatedTransaction) {
            return res.status(404).json({ message: 'Transaction not found' });
        }
        res.status(200).json(updatedTransaction);
    } catch (error) {
        console.error('Error updating transaction:', error);
        res.status(500).json({ message: 'Server Error', error });
    }
};

// Delete a transaction by ID
const deleteTransaction = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedTransaction = await Transaction.findByIdAndDelete(id);
        if (!deletedTransaction) {
            return res.status(404).json({ message: 'Transaction not found' });
        }
        res.status(204).send();
    } catch (error) {
        console.error('Error deleting transaction:', error);
        res.status(500).json({ message: 'Server Error', error });
    }
};

// Get a summary of transactions
const getSummary = async (req, res) => {
    try {
        const transactions = await Transaction.find();
        const totalIncome = transactions
            .filter(t => t.type === 'income')
            .reduce((acc, t) => acc + t.amount, 0);
        const totalExpenses = transactions
            .filter(t => t.type === 'expense')
            .reduce((acc, t) => acc + t.amount, 0);
        const balance = totalIncome - totalExpenses;

        res.status(200).json({
            totalIncome,
            totalExpenses,
            balance,
        });
    } catch (error) {
        console.error('Error getting summary:', error);
        res.status(500).json({ message: 'Server Error', error });
    }
};

module.exports = {
    createTransaction,
    getTransactions,
    getTransactionById,
    updateTransaction,
    deleteTransaction,
    getSummary,
};
