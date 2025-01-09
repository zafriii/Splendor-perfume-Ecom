 const Cart = require('../models/cartModel'); // Assuming you have a Cart model
 const Checkout = require('../models/checkoutModel');
 const mongoose = require('mongoose');

exports.addToCart = async (req, res) => {
  const { productId, name, price, image, quantity, stock } = req.body;

  // Validate required fields
  if (!stock && stock !== 0) {
    return res.status(400).json({ message: 'Stock is required' });
  }
  if (!quantity || quantity <= 0) {
    return res.status(400).json({ message: 'Invalid quantity' });
  }

  console.log('Request body:', req.body);

  try {
    const existingCartItem = await Cart.findOne({ userId: req.user.id, productId });

    if (existingCartItem) {
      const updatedQuantity = existingCartItem.quantity + quantity;

      if (updatedQuantity > stock) {
        return res.status(400).json({
          message: ` ${stock - existingCartItem.quantity} items are available in stock`,
        });
      }

      existingCartItem.quantity = updatedQuantity;
      await existingCartItem.save();
      return res.status(200).json({ message: 'Cart updated successfully', updatedCartItem: existingCartItem });
    }

    if (quantity > stock) {
      return res.status(400).json({ message: `Only ${stock} items are available in stock` });
    }

    const newCartItem = new Cart({ userId: req.user.id, productId, name, price, image, quantity, stock });
    await newCartItem.save();

    res.status(201).json({ message: 'Product added to cart successfully', newCartItem });
  } catch (error) {
    console.error('Error adding product to cart:', error.message, error.stack);
    res.status(500).json({ message: 'Error adding product to cart', error: error.message });
  }
};



exports.getCart = async (req, res) => {
  try {
    const cartItems = await Cart.find({ userId: req.user.id });

    // Calculate the total quantity of items in the cart
    const totalQuantity = cartItems.reduce((total, item) => {
      return total + item.quantity; // Sum up the quantity of each item
    }, 0);

    res.status(200).json({ cartItems, totalQuantity });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching cart items', error });
  }
};



exports.removeFromCart = async (req, res) => {
  const { cartItemId } = req.params; // Use cartItemId to delete the item
  
  try {
    const deletedCartItem = await Cart.findOneAndDelete({
      _id: cartItemId,
      userId: req.user.id, // Ensure the item belongs to the logged-in user
    });

    if (!deletedCartItem) {
      return res.status(404).json({ message: 'Cart item not found' });
    }

    res.status(200).json({ message: 'Cart item deleted successfully', deletedCartItem });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting cart item', error });
  }
};

exports.increaseQuantity = async (req, res) =>{
  try {
    const cartId = req.params.id;
    const cartItem = await Cart.findById(cartId);

    if (!cartItem) {
        return res.status(404).json({ message: 'Cart item not found' });
    }

    cartItem.quantity += 1;
    await cartItem.save();

    const updatedCart = await Cart.find({ user: req.user.id });
    res.status(200).json({ cartItems: updatedCart });
} catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
}
}


exports.decreaseQuantity = async (req, res) =>{
  try {
    const cartId = req.params.id;
    const cartItem = await Cart.findById(cartId);

    if (!cartItem) {
        return res.status(404).json({ message: 'Cart item not found' });
    }

    if (cartItem.quantity > 1) {
        cartItem.quantity -= 1; // Decrement quantity only if > 1
        await cartItem.save();
    } else {
        return res.status(400).json({ message: 'Quantity cannot be less than 1' });
    }

    const updatedCart = await Cart.find({ user: req.user.id });
    res.status(200).json({ cartItems: updatedCart });
} catch (error) {
    console.error('Error decrementing cart item:', error);
    res.status(500).json({ message: 'Error updating quantity', error });
}
}

exports.clearCart = async (req, res) => {
  try {
    // Remove all items from the cart for the logged-in user
    const result = await Cart.deleteMany({ userId: req.user.id });

    // Check if there were any items to delete
    if (result.deletedCount === 0) {
      return res.status(404).json({ message: 'No items found in the cart to delete' });
    }

    res.status(200).json({
      message: 'Cart cleared successfully',
      deletedCount: result.deletedCount, // Optional: Indicates the number of deleted items
    });
  } catch (error) {
    console.error('Error clearing cart:', error.message);
    res.status(500).json({ message: 'Error clearing cart', error: error.message });
  }
};

exports.proceedToCheckout = async (req, res) => {
  try {
    const userId = req.user.id;

    // Fetch all cart items for the user
    const cartItems = await Cart.find({ userId });

    if (cartItems.length === 0) {
      return res.status(400).json({ message: 'Cart is empty. Add items before proceeding to checkout.' });
    }

    // Calculate the subtotal
    const subtotal = cartItems.reduce((total, item) => {
      return total + item.price * item.quantity;
    }, 0);

    const deliveryCharge = 100; // Fixed delivery charge
    const totalPrice = subtotal + deliveryCharge;

    // Create a new checkout record
    const checkoutData = new Checkout({
      userId,
      cartItems,
      subtotal,
      deliveryCharge,
      totalPrice,
      checkoutDate: new Date(),
    });

    await checkoutData.save();

    // Optionally, clear the cart after checkout
    await Cart.deleteMany({ userId });

    res.status(201).json({ message: 'Checkout successful', checkoutData });
  } catch (error) {
    console.error('Error during checkout:', error.message, error.stack);
    res.status(500).json({ message: 'Error during checkout', error: error.message });
  }
};


exports.getCheckoutDetails = async (req, res) => {
  try {
    const userId = req.user.id; // Assuming user ID is available in req.user (after authentication)
    
    // Fetch checkout data for the specific user (latest checkout)
    const checkoutData = await Checkout.findOne({ userId })
      .sort({ checkoutDate: -1 }) // Get the latest checkout record
      .populate('userId', 'name email') // Optionally populate the user details (name, email)
      .exec();

    if (!checkoutData) {
      return res.status(404).json({ message: 'No checkout data found for this user.' });
    }

    // Extract cartItems from checkoutData
    const cartItems = checkoutData.cartItems;

    // Format the response to return the checkout details
    res.status(200).json({
      message: 'Checkout details retrieved successfully',
      checkoutDetails: {
        userId: checkoutData.userId,
        cartItems: cartItems,
        subtotal: checkoutData.subtotal,
        deliveryCharge: checkoutData.deliveryCharge,
        totalPrice: checkoutData.totalPrice,
        checkoutDate: checkoutData.checkoutDate,
      }
    });

  } catch (error) {
    console.error('Error retrieving checkout details:', error);
    res.status(500).json({ message: 'Error retrieving checkout details', error: error.message });
  }
};
