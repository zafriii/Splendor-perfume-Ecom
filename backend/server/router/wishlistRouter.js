const express = require('express');
const router = express.Router();
const { addWish, getWishes, deleteWish } = require('../controllers/wishlistController');
const authMiddleware = require('../middlewares/auth-middleware'); // Middleware to authenticate user

// Add a bookmark
router.post('/', authMiddleware, addWish);

// Get all bookmarks
router.get('/', authMiddleware, getWishes);

// router.delete('/:productId', authMiddleware, deleteWish);

router.delete('/:wishId', authMiddleware, deleteWish);

module.exports = router;
