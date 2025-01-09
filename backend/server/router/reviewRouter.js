const express = require('express');
const { createReview, getReviewsByProduct, updateReview, deleteReview, getReviewCountByProduct } = require('../controllers/reviewController');
const authMiddleware = require('../middlewares/auth-middleware'); 

const router = express.Router();

router.post('/product/:productId/reviews', authMiddleware, createReview); // Create review
router.get('/product/:productId/reviews', getReviewsByProduct); // Fetch reviews for a product
router.put('/:id', authMiddleware, updateReview); // Update review
router.delete('/:id', authMiddleware, deleteReview); // Delete review
router.get('/product/:productId/reviews/count', getReviewCountByProduct); // Get review count

module.exports = router;
