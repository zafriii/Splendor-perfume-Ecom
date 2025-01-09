const Wish = require('../models/wishlistModel');


exports.addWish = async (req, res) => {
    const { productId, name, price, image } = req.body; // Include the image URL here
  
    // Check if the image URL is provided
    if (!image) {
      return res.status(400).json({ message: 'Image URL is required' });
    }
  
    try {
      // Check if the product is already in the wish list for this user
      const existingWish = await Wish.findOne({
        userId: req.user.id,
        productId,
      });
  
      if (existingWish) {
        return res.status(400).json({ message: 'Product already in wish list' });
      }
  
      // Create a new wish with the image URL
      const newWish = new Wish({
        userId: req.user.id,
        productId,
        name,
        price,
        image, // Store the image URL directly
      });
  
      await newWish.save();
      res.status(201).json({ message: 'Wish added successfully', newWish });
    } catch (error) {
      res.status(500).json({ message: 'Error adding wish', error });
    }
  };
  



exports.getWishes = async (req, res) => {
    try {
      const wishes = await Wish.find({ userId: req.user.id });
      res.status(200).json({ wishes });
    } catch (error) {
      res.status(500).json({ message: 'Error fetching wishlist', error });
    }
  };
  



exports.deleteWish = async (req, res) => {
  const { wishId } = req.params; // Use wishId to delete the wish

  try {
    const deletedWish = await Wish.findOneAndDelete({
      _id: wishId,
      userId: req.user.id, // Ensure the wish belongs to the logged-in user
    });

    if (!deletedWish) {
      return res.status(404).json({ message: 'Wish not found' });
    }

    res.status(200).json({ message: 'Wish deleted successfully', deletedWish });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting wish', error });
  }
};
