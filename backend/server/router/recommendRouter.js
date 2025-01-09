// routes/ProductRecommendationRoutes.js
const express = require('express');
const router = express.Router();
const ProductRecommendationController = require('../controllers/recommendController');
const authMiddleware = require('../middlewares/auth-middleware')

// Route to create or update a recommendation
router.post('/:productId', authMiddleware, ProductRecommendationController.createRecommendation);

// Route to get recommendation status for a product
router.get('/:productId', ProductRecommendationController.getRecommendationStatus);

module.exports = router;
 