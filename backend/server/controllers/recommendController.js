// controllers/ProductRecommendationController.js
const ProductRecommendation = require('../models/recommendModel');

exports.createRecommendation = async (req, res) => {
    // Extract productId from route parameters
    const { productId } = req.params;
  
    // Extract recommendation from the request body
    const { recommendation } = req.body;
  
    // Extract the userId from the token via req.user._id
    const userId = req.user._id;
  
    // Validate input fields
    if (!productId || !recommendation) {
      return res.status(400).json({ message: 'Product ID and Recommendation are required' });
    }
  
    if (!['yes', 'no'].includes(recommendation)) {
      return res.status(400).json({ message: 'Invalid recommendation value. Use "yes" or "no".' });
    }
  
    try {
      // Check if the user has already given a recommendation for this product
      const existingRecommendation = await ProductRecommendation.findOne({ productId, userId });
  
      if (existingRecommendation) {
        // If the recommendation already exists, update it
        existingRecommendation.recommendation = recommendation;
        await existingRecommendation.save();
        return res.status(200).json({ message: 'Recommendation updated successfully' });
      }
  
      // Create a new recommendation if one doesn't exist
      const newRecommendation = new ProductRecommendation({ productId, userId, recommendation });
      await newRecommendation.save();
  
      res.status(201).json({ message: 'Recommendation submitted successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Error submitting recommendation', error });
    }
  };
  
  



// Function to get the recommendation status based on the count of 'yes' and 'no'
exports.getRecommendationStatus = async (req, res) => {
  const { productId } = req.params;

  try {
    // Count the 'yes' and 'no' recommendations for the given product
    const yesCount = await ProductRecommendation.countDocuments({ productId, recommendation: 'yes' });
    const noCount = await ProductRecommendation.countDocuments({ productId, recommendation: 'no' });

    const recommendationStatus = yesCount > noCount ? 'recommended' : 'not recommended';

    res.status(200).json({
      productId,
      yesCount,
      noCount,
      recommendationStatus,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching recommendation status', error });
  }
};
