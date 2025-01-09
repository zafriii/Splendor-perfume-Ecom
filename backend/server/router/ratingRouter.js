const express = require('express');
const { createOrUpdateRating, getAverageRating, getUserRating } = require('../controllers/ratingController');
const authMiddleware = require('../middlewares/auth-middleware')

const router = express.Router();

// Create or update rating for a product
router.post('/:productId', authMiddleware, createOrUpdateRating);

// Get average rating for a product
router.get('/:productId', getAverageRating);


router.get('/user/:productId', authMiddleware, getUserRating)

module.exports = router;

