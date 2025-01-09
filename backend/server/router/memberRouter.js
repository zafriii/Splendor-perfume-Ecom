const express = require('express');
const router = express.Router();
const { createMember, getMember } = require('../controllers/memberController');
const authMiddleware = require('../middlewares/auth-middleware'); 

// Add a product to the cart
router.post('/', authMiddleware, createMember);

router.get('/', authMiddleware, getMember);

module.exports = router;