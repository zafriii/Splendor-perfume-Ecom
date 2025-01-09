const Review = require('../models/reviewModel');

// Create a review for a specific product
const createReview = async (req, res) => {
  try {
    const { productId } = req.params; // Product ID from route parameters
    // const { content, rating } = req.body; // Review content and rating
    const { content} = req.body; // Review content and rating

    // const review = new Review({
    //   content,
    //   rating,
    //   product: parseInt(productId, 10), // Ensure product ID is stored as a number
    //   user: req.user._id, // Associate with the logged-in user
    // });

    const review = new Review({
        content,
        product: parseInt(productId, 10), // Ensure product ID is stored as a number
        user: req.user._id, // Associate with the logged-in user
      });
  

    await review.save();
    res.status(201).json({ message: 'Review added successfully', review });
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error });
  }
};

// Get all reviews for a specific product
const getReviewsByProduct = async (req, res) => {
  try {
    const { productId } = req.params;

    const reviews = await Review.find({ product: parseInt(productId, 10) }) // Match numeric product ID
      .populate('user', 'username') // Populate user details (e.g., username)
      .sort({ createdAt: -1 }); // Sort reviews by newest first

    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error });
  }
};

// Count reviews for a specific product
const getReviewCountByProduct = async (req, res) => {
  try {
    const { productId } = req.params;

    const reviewCount = await Review.countDocuments({ product: parseInt(productId, 10) });

    res.status(200).json({ count: reviewCount });
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error });
  }
};



const updateReview = async (req, res) => { // Changed updateBlog to updateReview
    try {
      const { content } = req.body;
      const review = await Review.findById(req.params.id);

      console.log('Review ID:', req.params.id); 
  
      if (!review) {
        return res.status(404).json({ error: 'Review not found' });
      }
  
      // Check if the logged-in user is the owner
      if (review.user.toString() !== req.user.id) {
        return res.status(403).json({ error: 'Unauthorized action' });
      }
  
      review.content = content || review.content;
  
      const updatedReview = await review.save();
      res.json(updatedReview);
    } catch (error) {
      console.error('Error updating review:', error);
      res.status(500).json({ error: 'Server error' });
    }
  };
  
  const deleteReview = async (req, res) => { // Changed deleteBlog to deleteReview
    try {
      const review = await Review.findOneAndDelete({ _id: req.params.id, user: req.user._id });
  
      if (!review) {
        return res.status(404).json({ message: 'Review not found' });
      }
  
      res.status(200).json({ message: 'Review deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Server Error', error });
    }
  };



module.exports = {
  createReview,
  getReviewsByProduct,
  getReviewCountByProduct,
  updateReview,
  deleteReview,
};
