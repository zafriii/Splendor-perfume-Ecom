import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../store/Auth'; // Assuming this is the correct path for your custom hook
import './orderdetails.css'

const Orderdetails = () => {
  const [orders, setOrders] = useState([]);  // State to store orders
  const [loading, setLoading] = useState(true);  // State for loading
  const [error, setError] = useState(null);  // State for error handling
  const { user, isLoggedin } = useAuth();  // Using your custom auth hook

  
  useEffect(() => {
    if (!user) {
      console.log('User is not logged in yet.');
      return;  // Skip the API call if user is not logged in
    }
  
    const fetchOrders = async () => {
      setLoading(true);  // Start loading state
  
      try {
        console.log('User:', user);  // Now you'll be sure 'user' is available here
  
        const token = localStorage.getItem('token');
        if (!token) {
          setError('Authentication token missing');
          setLoading(false);
          return;
        }
  
        // Fetch orders from backend
        const response = await axios.get(
          `http://localhost:5000/api/order/${user._id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
  
        console.log('API Response:', response.data); // Log the response
  
        // Check if the response is an array
        if (Array.isArray(response.data)) {
          setOrders(response.data);  // Set the response data to orders
          console.log('Orders State Updated:', response.data);
        } else {
          setOrders([]);  // Default to an empty array if not an array
          setError('Unexpected response format');
        }
      } catch (error) {
        console.error('Error fetching orders:', error);
        setError('Failed to fetch orders');
      } finally {
        setLoading(false);  // End loading state
      }
    };
  
    fetchOrders();  // Fetch orders when the component mounts
  }, [user]);





  // Render based on loading and error states
  if (loading) return <div className="loader">Loading...</div>;
  if (error) return <div>{error}</div>;

  // Render orders if available
  return (
   

<div className="order-page">
  
  {orders.length > 0 ? (

    <>

  <h2> <span className='username'>{user.username},</span>  Your Orders ({orders.length})</h2>

    <table className="order-table">
      <thead>
        <tr>
          <th className="order-id-column">Order ID</th>
          <th>Payment Method</th>
          <th>Order Status</th>
          <th>Order Date</th>
          <th>Billing Details</th>
          <th>Cart Items</th>
          <th>Subtotal</th>
          <th>Delivery Charge</th>
          <th>Total Price</th>
        </tr>
      </thead>
      <tbody>
        {orders.map((order) => (
          <tr key={order._id}>
            <td className="order-id-column">{order._id}</td>
            <td>{order.paymentMethod}</td>
            <td>{order.orderStatus}</td>
            <td>{new Date(order.orderDate).toLocaleString()}</td>
            <td>
              <ul>
                <li>Name: {order.billingDetails.name}</li>
                <li>Phone: {order.billingDetails.phone}</li>
                <li>Email: {order.billingDetails.email}</li>
                <li>City: {order.billingDetails.city}</li>
                <li>Address: {order.billingDetails.address}</li>
              </ul>
            </td>
            <td>
              <ul>
                {order.cartItems.map((item, index) => (
                  <li key={index}>
                    {item.name} - {item.quantity} x {item.price} tk
                  </li>
                ))}
              </ul>
            </td>
            <td>{order.subtotal} tk</td>
            <td>{order.deliveryCharge} tk</td>
            <td>{order.totalPrice} tk</td>
          </tr>
        ))}
      </tbody>
    </table>

    </>
  ) : (
    <p className='no-orders'>You have no orders.</p>
  )}
</div>


  );
};

export default Orderdetails;
