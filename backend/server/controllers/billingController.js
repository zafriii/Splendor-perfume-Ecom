// controllers/checkoutController.js
const Billing = require('../models/billingModel');

exports.createBilling = async (req, res) => {
  try {
    const { userId, cartItems, subtotal, deliveryCharge, totalPrice, checkoutDate, billingDetails } = req.body;

    const billing = new Billing({
      userId : req.user.id,
      cartItems,
      subtotal,
      deliveryCharge,
      totalPrice,
      billingDetails,
      checkoutDate
    });

    await billing.save();

    res.status(201).json({ message: 'Billing details saved successfully', billing });
  } catch (error) {
    res.status(500).json({ message: 'Error saving Billing details', error: error.message });
  }
};



exports.getBillingByUserId = async (req, res) => {
  try {
    const userId = req.user.id; // Assuming user ID is available in req.user (after authentication)

    // Fetch the latest billing record for the user
    const latestBilling = await Billing.findOne({ userId })
      .sort({ checkoutDate: -1 }) // Sort by checkoutDate in descending order to get the latest billing
      .populate('userId', 'name email') // Optionally populate the user details (name, email)
      .exec();

    if (!latestBilling) {
      return res.status(404).json({ message: 'No billing details found for this user.' });
    }

    // Format the response to return the billing details
    res.status(200).json({
      message: 'Latest billing details fetched successfully',
      billingDetails: {
        userId: latestBilling.userId,
        cartItems: latestBilling.cartItems,
        subtotal: latestBilling.subtotal,
        deliveryCharge: latestBilling.deliveryCharge,
        totalPrice: latestBilling.totalPrice,
        checkoutDate: latestBilling.checkoutDate,
        billingDetails: latestBilling.billingDetails,
      }
    });

  } catch (error) {
    console.error('Error retrieving billing details:', error);
    res.status(500).json({ message: 'Error retrieving billing details', error: error.message });
  }
};

