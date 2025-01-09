import React, { useEffect, useState } from 'react';
import { useAuth } from '../store/Auth';
import './billingDetails.css';
import { NavLink, useNavigate } from 'react-router-dom';
import axios from 'axios';
import {loadStripe} from '@stripe/stripe-js';
import ConfirmModal from './ConfirmModal';

const BillingDetailsPage = () => {
  const [billingDetails, setBillingDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState('cashOnDelivery'); // Default payment method
  const [couponCode, setCouponCode] = useState('');  // State for coupon code
  const [discount, setDiscount] = useState(0);  // State for the discount
  const [finalTotalPrice, setFinalTotalPrice] = useState(0); // Final price after discount
  const [isMember, setIsMember] = useState(false); // State to track if the user is a member
  const { user } = useAuth();
  const navigate = useNavigate();

  // Modal state
  const [showModal, setShowModal] = useState(false);
  const [confirming, setConfirming] = useState(false);

  // Fetch billing details and member status after the component mounts
  useEffect(() => {
    const getBillingDetails = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/billing_details', {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`, // Include token for authorization
          },
        });

        const data = await response.json();

        if (response.ok) {
          setBillingDetails(data.billingDetails);
          setFinalTotalPrice(data.billingDetails.totalPrice); // Initialize final total price
        } else {
          setError(data.message || 'Failed to fetch billing details');
        }
      } catch (err) {
        setError('Error fetching billing details');
      } finally {
        setLoading(false);
      }
    };

    const checkMemberStatus = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          setIsMember(false);
          return;
        }

        const response = await axios.get('http://localhost:5000/api/member', {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (response.data.member) {
          setIsMember(true);
        } else {
          setIsMember(false);
        }
      } catch (error) {
        console.error('Error fetching member status:', error);
        setIsMember(false);
      }
    };

    getBillingDetails();
    checkMemberStatus();
  }, [user]);

  // Handle coupon code input change
  const handleCouponChange = (e) => {
    setCouponCode(e.target.value);
  };

  // Handle apply coupon code
  const handleApplyCoupon = () => {
    if (!isMember) {
      setError('You must be a member to apply a coupon code');
      return;
    }

    let newDiscount = 0;
    let newTotalPrice = billingDetails.totalPrice;

    // Check for valid coupon code and apply discount
    if (couponCode === 'DISCOUNT10') {
      newDiscount = 0.1; // 10% discount
      newTotalPrice -= newTotalPrice * newDiscount;
    } else {
      setError('Invalid coupon code');
    }

    setDiscount(newDiscount);
    setFinalTotalPrice(newTotalPrice);
    setCouponCode('')
  };

  // Handle payment method change
  const handlePaymentMethodChange = (e) => {
    setPaymentMethod(e.target.value);  // Update payment method state
  };

  

 
  const handleConfirmOrder = async () => {
    setConfirming(true); // Show "Confirming..." in the button
  
    const orderData = {
      userId: user._id,
      cartItems: billingDetails.cartItems,
      subtotal: billingDetails.subtotal,
      deliveryCharge: billingDetails.deliveryCharge,
      totalPrice: finalTotalPrice,
      discount: discount,
      billingDetails: {
        name: billingDetails.billingDetails.name,
        phone: billingDetails.billingDetails.phone,
        email: billingDetails.billingDetails.email,
        city: billingDetails.billingDetails.city,
        address: billingDetails.billingDetails.address,
      },
      paymentMethod: paymentMethod,
    };
  
    try {
      const response = await fetch("http://localhost:5000/api/order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(orderData),
      });
  
      const data = await response.json();
  
      if (paymentMethod === "prePayment" && data.id) {
        const stripe = await loadStripe("pk_test_51QeHGOJeTHHpZyoZhVKDqWMka0v17CjEPl1xJoMlgFNU8vxQPPXYWqEZEpTWxvZrQDtYcRhKc4fLCImsV44m0Z6m0008A5T2mc");
        const result = await stripe.redirectToCheckout({ sessionId: data.id });
  
        if (result.error) {
          console.error(result.error.message);
        }
      } else if (response.ok) {
        navigate("/order", { state: { orderId: data._id } });
      } else {
        setError(data.message || "Failed to create order");
      }
    } catch (err) {
      setError("Error creating order");
    } finally {
      setConfirming(false); // Hide "Confirming..." after completion
      setShowModal(false); // Close the modal
    }
  };
  




  if (loading) {
    return <div className="loader">Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="billing-details-container">
      {billingDetails && (
        <div className="billing-details">
          <div className="billing-details-left">
            <h2>Billing Information</h2>
            <p><strong>Name:</strong> {billingDetails.billingDetails.name}</p>
            <p><strong>Phone:</strong> {billingDetails.billingDetails.phone}</p>
            <p><strong>Email:</strong> {billingDetails.billingDetails.email}</p>
            <p><strong>City:</strong> {billingDetails.billingDetails.city}</p>
            <p><strong>Address:</strong> {billingDetails.billingDetails.address}</p>

            <div className="apply-coupon">
              <h3>Enter your coupon code</h3>
              <div className="coupon-code">
                <input
                  type="text"
                  value={couponCode}
                  onChange={handleCouponChange}
                  placeholder="Enter Coupon Code"
                  disabled={!isMember} // Disable input if not a member
                />
                <button onClick={handleApplyCoupon} disabled={!isMember}>Apply</button>
              </div>
              {!isMember && <p className='be-member'>You must be a member to apply a coupon code. <a href='/membership'>Be a member</a></p>}
              {isMember && <p className='member-coupon'> Coupon code : DISCOUNT10</p>}
            </div>

            <div className="payment">
              <h3>Select Payment Method</h3>
              <div className="payment-options">
                <label>
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="cashOnDelivery"
                    checked={paymentMethod === 'cashOnDelivery'}
                    onChange={handlePaymentMethodChange}
                  />
                  Cash on Delivery
                </label>
                <label>
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="prePayment"
                    checked={paymentMethod === 'prePayment'}
                    onChange={handlePaymentMethodChange}
                  />
                  Pre-Payment (via Stripe)
                </label>
              </div>
            </div>
          </div>

          <div className="billing-details-right">
            <h3>Cart Information</h3>
            {billingDetails.cartItems && billingDetails.cartItems.length > 0 ? (
              <ul>
                {billingDetails.cartItems.map((item, index) => (
                  <li key={index}>
                    <div>
                      <img src={item.image} alt={item.name} />
                    </div>
                    <p><strong>Product Name:</strong> {item.name}</p>
                    <p><strong>Product ID:</strong> {item.productId}</p>
                    <p><strong>Price:</strong> {item.price} tk</p>
                    <p><strong>Quantity:</strong> {item.quantity}</p>
                    <p><strong>Total Price:</strong> {item.price * item.quantity} tk</p>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No items in the cart</p>
            )}

            {billingDetails && (
              <div className="billing-details-price">
                <p><strong>Sub Total Price:</strong> {billingDetails.totalPrice} tk</p>
                <p><strong>Delivery Charge:</strong> {billingDetails.deliveryCharge} tk</p>
                {discount > 0 && (
                  <div className="discount-info">
                    <p> <strong>Discount Applied:</strong> {discount * 100}%</p>
                    <p><strong>Total Price After Discount:</strong> {finalTotalPrice} tk</p>
                  </div>
                )}
                <p><strong>Checkout Date:</strong> {new Date(billingDetails.checkoutDate).toLocaleString()}</p>
              </div>
            )}
          </div>
        </div>
      )}

      <div className="billing-details-button">
        {/* <button onClick={handleConfirmOrder}>Confirm Order</button> */}
        <button onClick={() => setShowModal(true)}>Confirm Order</button>
      </div>


      <ConfirmModal
        show={showModal}
        confirming={confirming} // Pass the confirming state
        message="Are you sure you want to confirm your order?"
        onConfirm={handleConfirmOrder}
        onCancel={() => setShowModal(false)}
      />


    </div>
  );
};

export default BillingDetailsPage;













