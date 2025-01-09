const mongoose = require('mongoose');

const checkoutSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  cartItems: [
    {
        productId: {
            type: Number,
            required: true,
          },
    //   name: String,
    //   price: Number,
    //   quantity: Number,
    //   image: String,
    quantity: {
        type: Number,
        default: 1,
        required: true,
      },
      name: {
        type: String,
        required: true,
      },
      price: {
        type: Number,
        required: true,
      },
      image: {
        type: String,
        required: true,
      },
    },
  ],
  subtotal: {
    type: Number,
    required: true,
  },
  deliveryCharge: {
    type: Number,
    required: true,
  },
  totalPrice: {
    type: Number,
    required: true,
  },
  checkoutDate: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Checkout', checkoutSchema);

