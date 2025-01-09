import React, { useEffect, useState } from 'react';
import { useAuth } from '../store/Auth';
import './checkout.css';
import { NavLink, useNavigate } from 'react-router-dom';

const CheckoutPage = () => {
  const [checkoutDetails, setCheckoutDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null); // Added success message state

  const { user } = useAuth();

  const navigate = useNavigate();

  const [billingDetails, setBillingDetails] = useState({
    name: '',
    phone: '',
    email: '',
    city: '',
    address: '',
  });

  const [formError, setFormError] = useState(null);

  // Populate billing details after user data is available
  useEffect(() => {
    if (user) {
      setBillingDetails((prevDetails) => ({
        ...prevDetails,
        phone: user.phone || '',
        email: user.email || '',
      }));
    }
  }, [user]);

  // Fetch checkout details
  useEffect(() => {
    const getCheckoutDetails = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/cart/checkout', {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });

        const data = await response.json();

        if (response.ok) {
          setCheckoutDetails(data.checkoutDetails);
        } else {
          setError(data.message || 'Failed to fetch checkout details');
        }
      } catch (err) {
        setError('Error fetching checkout details');
      } finally {
        setLoading(false);
      }
    };

    getCheckoutDetails();
  }, []);

  const handleBillingChange = (e) => {
    const { name, value } = e.target;
    setBillingDetails({
      ...billingDetails,
      [name]: value,
    });
  };

  const handleSubmitBillingDetails = async (e) => {
    e.preventDefault();

    // Validate form inputs
    if (!billingDetails.name || !billingDetails.phone || !billingDetails.email || !billingDetails.city || !billingDetails.address) {
      setFormError('Please fill in all fields');
      return;
    }

    const payload = {
      userId: user.id,
      cartItems: checkoutDetails?.cartItems || [],
      subtotal: checkoutDetails?.subtotal || 0,
      deliveryCharge: checkoutDetails?.deliveryCharge || 0,
      totalPrice: checkoutDetails?.totalPrice || 0,
      billingDetails,
    };

    console.log('Payload being sent:', payload);

    try {
      const response = await fetch('http://localhost:5000/api/billing_details', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();
      console.log('Response data:', data);

      if (response.ok) {
        setSuccessMessage('Checkout saved successfully!');
        setFormError(null); // Clear error
        navigate('/billing_details');
      } else {
        setFormError(data.message || 'Failed to save checkout details');
      }
    } catch (error) {
      setFormError('Error submitting checkout details');
    }
  };

  if (loading) {
    return <div className="loader">Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="checkout-container">
      <div className="checkout-details">
        <h2>Checkout Details</h2>

        {checkoutDetails && (
          <ul>
            {checkoutDetails.cartItems.map((item) => (
              <li key={item.productId}>
                <img src={item.image} alt={item.name} width={50} />
                <div>
                  <p>{item.name}</p>
                  <p>Price: {item.price} tk</p>
                  <p>Quantity: {item.quantity}</p>
                </div>
              </li>
            ))}
          </ul>
        )}

        <p>
          <strong>Total:</strong> {checkoutDetails?.subtotal} tk
        </p>
        <p>
          <strong>Delivery Charge:</strong> {checkoutDetails?.deliveryCharge} tk
        </p>
        <p>
          <strong>Sub Total Price:</strong> {checkoutDetails?.totalPrice} tk
        </p>
        <p>
          <strong>Checkout Date:</strong>{' '}
          {new Date(checkoutDetails?.checkoutDate).toLocaleString()}
        </p>
      </div>

      <div className="billing-form">
        <h2>Customer Billing Details</h2>
        <form onSubmit={handleSubmitBillingDetails}>
          {formError && <div className="error-message">{formError}</div>}
          {successMessage && <div className="success-message">{successMessage}</div>}

          <div>
            <label htmlFor="name">Full Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Enter name..."
              value={billingDetails.name}
              onChange={handleBillingChange}
              required
            />
          </div>

          <div>
            <label htmlFor="phone">Phone Number:</label>
            <input
              type="text"
              id="phone"
              name="phone"
              value={billingDetails.phone}
              readOnly
              required
            />
          </div>

          <div>
            <label htmlFor="email">Email Address:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={billingDetails.email}
              readOnly
              required
            />
          </div>

          <div>
            <label htmlFor="city">City:</label>
            <input
              type="text"
              id="city"
              name="city"
              placeholder="Enter city..."
              value={billingDetails.city}
              onChange={handleBillingChange}
              required
            />
          </div>

          <div>
            <label htmlFor="address">Address:</label>
            <input
              id="address"
              name="address"
              placeholder="Enter address..."
              value={billingDetails.address}
              onChange={handleBillingChange}
              required
            />
          </div>

            <button onClick={handleSubmitBillingDetails}>Submit</button>
        </form>
      </div>
    </div>
  );
};

export default CheckoutPage;
