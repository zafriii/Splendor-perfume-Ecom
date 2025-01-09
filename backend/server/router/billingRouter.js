// routes/checkoutRoutes.js
const express = require('express');
const { createBilling, getBillingByUserId } = require('../controllers/billingController');
const authMiddleware = require('../middlewares/auth-middleware');

const router = express.Router();

// Route to save checkout and billing details
router.post('/', authMiddleware, createBilling);

// Route to fetch checkout details by user ID
router.get('/', authMiddleware, getBillingByUserId);

module.exports = router;
