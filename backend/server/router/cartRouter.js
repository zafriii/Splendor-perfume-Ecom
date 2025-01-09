const express = require('express');
const router = express.Router();
const { addToCart, getCart, removeFromCart, increaseQuantity, decreaseQuantity, clearCart, proceedToCheckout, getCheckoutDetails } = require('../controllers/cartController');
const authMiddleware = require('../middlewares/auth-middleware'); 

// Add a product to the cart
router.post('/add', authMiddleware, addToCart);

// Get the user's cart
// router.get('/:userId', authMiddleware, getCart);

router.get('/', authMiddleware, getCart);

// Remove a product from the cart
// router.delete('/remove', authMiddleware, removeFromCart);

router.delete('/remove/:cartItemId', authMiddleware, removeFromCart);

router.post('/increment/:id', authMiddleware, increaseQuantity);
router.post('/decrement/:id', authMiddleware, decreaseQuantity);

router.post('/checkout', authMiddleware, proceedToCheckout);
// router.get('/checkout/:cartId', authMiddleware, getCheckoutDetails);
router.get('/checkout', authMiddleware, getCheckoutDetails);

router.delete('/', authMiddleware, clearCart);

module.exports = router;
