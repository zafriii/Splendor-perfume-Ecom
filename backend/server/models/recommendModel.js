// models/ProductRecommendation.js
const mongoose = require('mongoose');

const ProductRecommendationSchema = new mongoose.Schema({
  productId: {
        type: Number, // Since your book data uses `id` as a number
        required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Assuming you have a User model
    required: true,
  },
  recommendation: {
    type: String,
    enum: ['yes', 'no'],
    required: true,
  }
}, { timestamps: true });

module.exports = mongoose.model('ProductRecommendation', ProductRecommendationSchema);
