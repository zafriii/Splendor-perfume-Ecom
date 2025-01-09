import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../store/Auth';
import './cart.css';
import ConfirmModal from './ConfirmModal';
import { NavLink } from 'react-router-dom';
import { IoBagCheckOutline } from "react-icons/io5";
import { IoIosArrowRoundBack } from "react-icons/io";

function AddtoCart() {
    const [cartItems, setCartItems] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [currentCartId, setCurrentCartId] = useState(null);
    const [currentCartName, setCurrentCartName] = useState('');
    const { user, isLoggedin } = useAuth();
    const [loading, setLoading] = useState(false);
    const [cartLoading, setCartLoading] = useState(true);

    const fetchCartItems = async () => {
        setCartLoading(true);
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get('http://localhost:5000/api/cart', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setCartItems(response.data.cartItems);
        } catch (error) {
            console.error('Error fetching cart items:', error.response?.data || error.message);
        }finally {
            setCartLoading(false); // End cart loading
        }
    };

    useEffect(() => {
        if (isLoggedin) {
            fetchCartItems();
        }
    }, [isLoggedin]);



    const handleIncrement = async (cartId) => {
        setLoading(true); // Set loading to true
        try {
            const token = localStorage.getItem('token');
            const response = await axios.post(
                `http://localhost:5000/api/cart/increment/${cartId}`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            setCartItems(response.data.cartItems); // Update cart items
            
            fetchCartItems();
        } catch (error) {
            console.error("Error incrementing quantity:", error.response?.data || error.message);
        } finally {
            setLoading(false); // Set loading to false after completion
        }
    };
    
    // Decrement quantity
    const handleDecrement = async (cartId) => {
        setLoading(true); // Set loading to true
        try {
            const token = localStorage.getItem('token');
            const response = await axios.post(
                `http://localhost:5000/api/cart/decrement/${cartId}`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            setCartItems(response.data.cartItems); // Update cart items
            
            fetchCartItems();
        } catch (error) {
            console.error("Error decrementing quantity:", error.response?.data || error.message);
        } finally {
            setLoading(false); // Set loading to false after completion
        }
    };



    // Open confirmation modal for removal
    const handleDeleteClick = (cartId, cartName) => {
        setCurrentCartId(cartId);
        setCurrentCartName(cartName);
        setShowModal(true);
    };

    // Delete cart item
    const handleDelete = async () => {
        try {
            const token = localStorage.getItem('token');
            await axios.delete(`http://localhost:5000/api/cart/remove/${currentCartId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setCartItems((prevCartItems) =>
                prevCartItems.filter((item) => item._id !== currentCartId)
            );
            setShowModal(false); // Close modal after deletion
        } catch (error) {
            console.error('Error deleting cart item:', error.response?.data || error.message);
        }
    };

    // Close confirmation modal
    const handleCloseModal = () => {
        setShowModal(false);
    };



 const calculateTotalPrice = () => {
      const deliveryCharge = 100; // Delivery charge (fixed)
      const totalPrice = cartItems.reduce((total, item) => {
          return total + (item.price * item.quantity); // Price * Quantity for each item
      }, 0);
      return totalPrice + deliveryCharge; // Include delivery charge in the total
  };


  const calculatePrice = () => {
    const totalPrice = cartItems.reduce((total, item) => {
        return total + (item.price * item.quantity); // Price * Quantity for each item
    }, 0);
    return totalPrice  // Include delivery charge in the total
};


  const handleCheckout = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post('http://localhost:5000/api/cart/checkout', {}, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log('Checkout successful:', response.data);
      // Optionally redirect to a success page
    } catch (error) {
      console.error('Error during checkout:', error.response?.data || error.message);
    }
  };
  

  const clearCart = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5000/api/cart', {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      const data = await response.json();
      if (response.ok) {
        // alert(data.message);
        fetchCartItems();
        
      } else {
        alert(data.message || 'Failed to clear the cart');
      }
    } catch (error) {
      console.error('Error clearing cart:', error);
    }
  };
  
  

    return (


      <>
        {/* <div className="cart-page">
            {isLoggedin ? (
                <h2>
                    <span className="username">{user.username}</span>, Your Cart
                </h2>
            ) : (
                <h2>Login to see your cart</h2>
            )}

            {cartItems.length === 0 && user ? (
                <div className="empty-cart-container">
                    <p className="empty-cart">Your cart is empty.</p>
                </div>
            ) : (
                <div className="cart-container">
                    <table className="cart-table">
                        <thead>
                            <tr>
                                <th>Image</th>
                                <th>Name</th>
                                <th>Price</th>
                                <th>Quantity</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {cartItems.map((item) => (
                                <tr key={item._id}>
                                    <td>
                                        <img src={item.image} alt={item.name} className="cart-item-table-image" />
                                    </td>
                                    <td>{item.name}</td>
                                    <td>{item.price}</td>

                                    <td className='quantity'>
                                        <button
                                            className="quantity-button"
                                            onClick={() => handleDecrement(item._id)}
                                            disabled={loading} // Disable button when loading
                                        >
                                            {loading ? <span className="loading-text">Loading...</span> : "-"}
                                        </button>
                                        {item.quantity}
                                        <button
                                            className="quantity-button"
                                            onClick={() => handleIncrement(item._id)}
                                            disabled={loading} // Disable button when loading
                                        >
                                            {loading ? <span className="loading-text">Loading...</span> : "+"}
                                        </button>
                                    </td>


                            <td>
                                        <button
                                            className="item-delete-button"
                                            onClick={() => handleDeleteClick(item._id, item.name)}
                                        >
                                            Remove
                                        </button>
                                    </td>
                                                    


                                </tr>
                            ))}
                        </tbody>
                    </table>


                    <div className="total-price">
                    <p>Total: {calculatePrice()} tk</p>
                    <p>Delivery charge : 100 tk</p> 
                    <p>Sub Total: {calculateTotalPrice()} tk</p>



                    <div className="cart-btns">

                    <NavLink to='/products'>
                    <button className='shop-btn'> <IoIosArrowRoundBack size={25}/> Continue Shopping</button>
                    </NavLink>

                    <button onClick={clearCart}>Clear Cart</button>

                    </div>


                    <NavLink to='/checkout' onClick={handleCheckout}>
                    <button className='checkout-btn'>Proceed to checkout <IoBagCheckOutline className=' checkout-icon' size={18}/></button>
                    </NavLink>

                    
                    </div>

                </div>
            )}
            <ConfirmModal
                show={showModal}
                message={`Are you sure you want to remove "${currentCartName}" from your cart?`}
                onConfirm={handleDelete}
                onCancel={handleCloseModal}
            />

        </div>    */}









<div className="cart-page">
                {isLoggedin ? (
                    <h2>
                        <span className="username">{user.username}</span>, Your Cart
                    </h2>
                ) : (
                    <h2>Login to see your cart</h2>
                )}

                {cartLoading ? (
                    // Show loading spinner or text while cart items are being fetched
                    <div className="loading-container">
                        <p className="loader">Loading your cart items...</p>
                    </div>
                ) : cartItems.length === 0 ? (
                    <div className="empty-cart-container">
                        <p className="empty-cart">Your cart is empty.</p>
                    </div>
                ) : (
                    <div className="cart-container">
                        {/* Cart Table */}
                        <table className="cart-table">
                            <thead>
                                <tr>
                                    <th>Image</th>
                                    <th>Name</th>
                                    <th>Price</th>
                                    <th>Quantity</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {cartItems.map((item) => (
                                    <tr key={item._id}>
                                        <td>
                                            <img src={item.image} alt={item.name} className="cart-item-table-image" />
                                        </td>
                                        <td>{item.name}</td>
                                        <td>{item.price}</td>
                                        <td className="quantity">
                                            <button
                                                className="quantity-button"
                                                onClick={() => handleDecrement(item._id)}
                                                disabled={loading}
                                            >
                                                {loading ? <span className="loading-text">Loading...</span> : "-"}
                                            </button>
                                            {item.quantity}
                                            <button
                                                className="quantity-button"
                                                onClick={() => handleIncrement(item._id)}
                                                disabled={loading}
                                            >
                                                {loading ? <span className="loading-text">Loading...</span> : "+"}
                                            </button>
                                        </td>
                                        <td>
                                            <button
                                                className="item-delete-button"
                                                onClick={() => handleDeleteClick(item._id, item.name)}
                                            >
                                                Remove
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                        {/* Total Price and Buttons */}
                        <div className="total-price">
                            <p>Total: {calculatePrice()} tk</p>
                            <p>Delivery charge: 100 tk</p>
                            <p>Sub Total: {calculateTotalPrice()} tk</p>
                            <div className="cart-btns">
                                <NavLink to="/products">
                                    <button className="shop-btn">
                                        <IoIosArrowRoundBack size={25} /> Continue Shopping
                                    </button>
                                </NavLink>
                                <button onClick={clearCart}>Clear Cart</button>
                            </div>
                            <NavLink to="/checkout" onClick={handleCheckout}>
                                <button className="checkout-btn">
                                    Proceed to checkout <IoBagCheckOutline className="checkout-icon" size={18} />
                                </button>
                            </NavLink>
                        </div>
                    </div>
                )}
                <ConfirmModal
                    show={showModal}
                    message={`Are you sure you want to remove "${currentCartName}" from your cart?`}
                    onConfirm={handleDelete}
                    onCancel={handleCloseModal}
                />
            </div>





        </>
    );
}

export default AddtoCart;
















