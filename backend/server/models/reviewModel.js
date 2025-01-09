const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      required: true,
    },
    product: {
        type: Number, // Since your book data uses `id` as a number
        required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Review', reviewSchema);


