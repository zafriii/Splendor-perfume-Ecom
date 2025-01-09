const Order = require('../models/orderModel');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const createOrder = async (req, res) => {
  const {
    userId,
    cartItems,
    subtotal,
    deliveryCharge,
    totalPrice,
    billingDetails,
    paymentMethod,
    discount, // Receive the discount percentage
  } = req.body;

  const orderData = {
    userId,
    cartItems,
    subtotal,
    deliveryCharge,
    totalPrice,
    billingDetails,
    paymentMethod,
    orderStatus: "completed", // Set initial status as pending
  };

  try {
    // Create the order in the database first
    const newOrder = new Order(orderData);
    const savedOrder = await newOrder.save();

    if (paymentMethod === "prePayment") {
      // Calculate the discount factor
      const discountFactor = 1 - (discount || 0); // Default to no discount

      // Adjust item prices with the discount factor
      const lineItems = cartItems.map((item) => {
        const discountedPrice = Math.round(item.price * discountFactor * 100); // Apply discount
        return {
          price_data: {
            currency: "bdt", // Replace with your currency code
            product_data: {
              name: item.name,
              images: [item.image],
              description: "Discount applied automatically", // Add product images if available
            },
            unit_amount: discountedPrice, // Use discounted price
          },
          quantity: item.quantity,
        };
      });

      // Include the delivery charge in Stripe checkout
      if (deliveryCharge > 0) {
        lineItems.push({
          price_data: {
            currency: "bdt",
            product_data: {
              name: "Delivery Charge",
            },
            unit_amount: Math.round(deliveryCharge * 100), // Convert to cents/paisa
          },
          quantity: 1,
        });
      }

      // Create a Stripe checkout session
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: lineItems,
        mode: "payment",
        success_url: `http://localhost:5173/order`,
        cancel_url: `http://localhost:5173/order-cancel`,
      });

      return res.status(200).json({ id: session.id });
    }

    res.status(201).json(savedOrder);
  } catch (error) {
    console.error("Error creating order:", error);
    res.status(500).json({ error: "Error creating order" });
  }
};

// Update order status
const updateOrderStatus = async (req, res) => {
  const { orderId } = req.params;
  const { orderStatus } = req.body;

  try {
    const validStatuses = ['pending', 'processing', 'completed', 'cancelled'];
    if (!validStatuses.includes(orderStatus)) {
      return res.status(400).json({ error: 'Invalid order status' });
    }

    const updatedOrder = await Order.findByIdAndUpdate(orderId, { orderStatus }, { new: true });
    if (!updatedOrder) {
      return res.status(404).json({ error: 'Order not found' });
    }

    res.status(200).json(updatedOrder);
  } catch (error) {
    console.error('Error updating order status:', error);
    res.status(500).json({ error: 'Error updating order status' });
  }
};

// Get all orders
const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate('userId', 'name email');
    res.status(200).json(orders);
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({ error: 'Error fetching orders' });
  }
};

// Get order by ID
const getOrderById = async (req, res) => {
  const { orderId } = req.params;

  try {
    const order = await Order.findById(orderId).populate('userId', 'name email');
    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }
    res.status(200).json(order);
  } catch (error) {
    console.error('Error fetching order:', error);
    res.status(500).json({ error: 'Error fetching order' });
  }
};


const getOrdersByUserId = async (req, res) => {
  const { userId } = req.params; // Get userId from the URL params

  try {
    const orders = await Order.find({ userId });
    res.status(200).json(orders);
  } catch (error) {
    console.error('Error fetching user orders:', error);
    res.status(500).json({ error: 'Error fetching user orders' });
  }
};


// Delete order by ID
const deleteOrder = async (req, res) => {
  const { orderId } = req.params;

  try {
    const deletedOrder = await Order.findByIdAndDelete(orderId);
    if (!deletedOrder) {
      return res.status(404).json({ error: 'Order not found' });
    }
    res.status(200).json({ message: 'Order deleted successfully' });
  } catch (error) {
    console.error('Error deleting order:', error);
    res.status(500).json({ error: 'Error deleting order' });
  }
};


module.exports = {
  createOrder,
  updateOrderStatus,
  getAllOrders,
  getOrderById,
  getOrdersByUserId,
  deleteOrder,
  
};
