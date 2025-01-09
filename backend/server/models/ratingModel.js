const mongoose = require('mongoose');

const ProductRatingSchema = new mongoose.Schema(
  {
    productId: {
      type: Number, // Assuming your product ID is numeric
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User', // Assuming a User model exists
      required: true,
    },
    rating: {
      type: Number,
      min: 1,
      max: 5, // Ratings from 1 to 5 stars
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('ProductRating', ProductRatingSchema);
