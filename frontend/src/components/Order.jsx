import React from 'react';
import { FaCheckCircle } from 'react-icons/fa'; // Import tick mark icon
import './order.css'; // Add the CSS file for styling

function Order() {
  return (
    <div className='order'>

      

      <h2>Thanks for Ordering!</h2>
      <p>Delivery: Within 5 days</p>
      
      <div className='order-icon-container'>
        <FaCheckCircle className="order-icon" />
      </div>

      <div className="order-details">
        <p>Your order has been placed successfully! We'll notify you once it's on its way.</p>
      </div>
      
      
    </div>
  );
}

export default Order;
