const ProductRating = require('../models/ratingModel');

// Create or Update Rating
exports.createOrUpdateRating = async (req, res) => {
  const { productId } = req.params;
  const { rating } = req.body;
  const userId = req.user._id;

  // Validate input
  if (!productId || !rating) {
    return res.status(400).json({ message: 'Product ID and rating are required' });
  }
  if (rating < 1 || rating > 5) {
    return res.status(400).json({ message: 'Rating must be between 1 and 5' });
  }

  try {
    // Check if the user has already rated this product
    const existingRating = await ProductRating.findOne({ productId, userId });

    if (existingRating) {
      // Update the existing rating
      existingRating.rating = rating;
      await existingRating.save();
      return res.status(200).json({ message: 'Rating updated successfully' });
    }

    // Create a new rating
    const newRating = new ProductRating({ productId, userId, rating });
    await newRating.save();

    res.status(201).json({ message: 'Rating submitted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error submitting rating', error });
  }
};

// Get Average Rating for a Product
exports.getAverageRating = async (req, res) => {
  const { productId } = req.params;

  try {
    // Calculate the average rating for the given product
    const ratings = await ProductRating.aggregate([
      { $match: { productId: parseInt(productId) } },
      { $group: { _id: '$productId', averageRating: { $avg: '$rating' }, totalRatings: { $sum: 1 } } },
    ]);

    if (ratings.length === 0) {
      return res.status(404).json({ message: 'No ratings found for this product' });
    }

    res.status(200).json({
      productId,
      averageRating: ratings[0].averageRating.toFixed(2), // Rounded to 2 decimal places
      totalRatings: ratings[0].totalRatings,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching average rating', error });
  }
};




exports.getUserRating = async (req, res) => {
  const { productId } = req.params;
  const userId = req.user._id; // Assuming user authentication has been handled

  try {
    // Find the rating for the specific product and user
    const userRating = await ProductRating.findOne({
      productId: parseInt(productId),
      userId,
    });

    if (!userRating) {
      return res.status(404).json({ message: 'No rating found for this product from the user' });
    }

    res.status(200).json({
      productId,
      userRating: userRating.rating,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching user rating', error });
  }
};






