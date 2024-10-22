const express = require('express');
const router = express.Router();
const {
  createTransaction,
  getTransactions,
  getTransactionById,
  updateTransaction,
  deleteTransaction,
  getSummary,
} = require('../controllers/transactionController');

router.post('/transactions', createTransaction);
router.get('/transactions', getTransactions);
router.get('/transactions/:id', getTransactionById);
router.put('/transactions/:id', updateTransaction);
router.delete('/transactions/:id', deleteTransaction);
router.get('/summary', getSummary);

module.exports = router;
