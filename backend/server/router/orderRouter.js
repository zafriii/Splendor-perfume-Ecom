const express = require('express');
const router = express.Router();
const {
  createOrder,
  updateOrderStatus,
  getAllOrders,
  getOrderById,
  getOrdersByUserId,
  deleteOrder,
  confirmPayment
} = require('../controllers/orderController');  // Import controller functions
const authMiddleware = require('../middlewares/auth-middleware'); 

// Route to create an order
router.post('/', authMiddleware, createOrder);


// router.post('/confirm-payment', confirmPayment);

// Route to update the order status
// router.put('/:orderId/status', updateOrderStatus);

// Route to get all orders
router.get('/', getAllOrders);

// Route to get a specific order by ID
// router.get('/:orderId', getOrderById);

// // Route to get orders by user ID
// router.get('/:userId', authMiddleware, getOrdersByUserId);

router.get('/:userId', authMiddleware,  getOrdersByUserId);

// Route to delete an order by ID
router.delete('/:orderId', deleteOrder);


module.exports = router;
