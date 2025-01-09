import React, { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
// import './paymentForm.css'; // Optional: Add your custom styling

const PaymentForm = ({ amount }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsProcessing(true);
    setError(null);

    // Get a reference to the CardElement
    const card = elements.getElement(CardElement);

    // If stripe or card is not ready, return early
    if (!stripe || !card) {
      return;
    }

    // Create a payment method and confirm the payment
    try {
      const { error, paymentIntent } = await stripe.confirmCardPayment(
        'your-client-secret-here', // Replace with the actual client secret
        {
          payment_method: {
            card,
            billing_details: {
              name: 'Customer Name', // You can replace this with your user's name
              email: 'customer@example.com', // You can replace this with your user's email
            },
          },
        }
      );

      if (error) {
        setError(error.message);
      } else if (paymentIntent.status === 'succeeded') {
        console.log('Payment successful!');
        // Add logic to handle payment success (e.g., show success message, save order, etc.)
      }
    } catch (err) {
      setError('Payment failed. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="payment-form">
      <h3>Complete your payment</h3>
      <div className="card-element-container">
        <CardElement />
      </div>

      {error && <p className="error-message">{error}</p>}

      <button type="submit" disabled={!stripe || isProcessing}>
        {isProcessing ? 'Processing...' : `Pay ${amount} BDT`}
      </button>
    </form>
  );
};

export default PaymentForm;
