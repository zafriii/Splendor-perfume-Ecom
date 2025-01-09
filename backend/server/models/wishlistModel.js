const mongoose = require('mongoose');

const WishSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  productId: {
    type: Number, // Since your book data uses `id` as a number
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
  image: {
    type: String, // Store the image URL as a string
    required: true,
  },

}, { timestamps: true });

module.exports = mongoose.model('Wish', WishSchema);
