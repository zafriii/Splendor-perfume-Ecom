const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  
  // Cart details
  cartItems: [
    {
      productId: { type: String, required: true },
      name: { type: String, required: true },
      price: { type: Number, required: true },
      quantity: { type: Number, required: true },
      image: { type: String },
    },
  ],
  
  // Pricing details
  subtotal: { type: Number, required: true },
  deliveryCharge: { type: Number, required: true },
  totalPrice: { type: Number, required: true },
  
  // Billing details
  billingDetails: {
    name: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: true },
    city: { type: String, required: true },
    address: { type: String, required: true },
  },

  // Payment method
  paymentMethod: {
    type: String,
    enum: ['cashOnDelivery', 'prePayment'],
    required: true,
  },

  // Payment details for pre-payment (Stripe)
  paymentDetails: {
    cardHolderName: { type: String },
    cardLast4Digits: { type: String },  // Store only the last 4 digits of the card
    paymentStatus: {
      type: String,
      enum: ['pending', 'completed', 'failed'],
      default: 'pending',
    },
    stripePaymentId: { type: String },  // Stripe payment ID
  },

  // Order status
  orderStatus: {
    type: String,
    enum: ['pending', 'processing', 'completed', 'cancelled'],
    default: 'pending',
  },

  // Date and time of order placement
  orderDate: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Order', OrderSchema);
