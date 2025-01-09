const mongoose = require('mongoose');

const BillingSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  cartItems: [
    {
      productId: { type: String, required: true },
      name: { type: String, required: true },
      price: { type: Number, required: true },
      quantity: { type: Number, required: true },
      image: { type: String },
    },
  ],
  subtotal: { type: Number, required: true },
  deliveryCharge: { type: Number, required: true },
  totalPrice: { type: Number, required: true },
  checkoutDate: { type: Date, default: Date.now },
  billingDetails: {
    name: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: true },
    city: { type: String, required: true },
    address: { type: String, required: true },
  },
});

module.exports = mongoose.model('Billing', BillingSchema);
