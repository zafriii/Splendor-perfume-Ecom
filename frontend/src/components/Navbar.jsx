
// import React, { useState, useEffect } from 'react';
// import { NavLink } from 'react-router-dom';
// import './navbar.css';
// import { IoIosCart } from 'react-icons/io';
// import { MdOutlineWbSunny } from "react-icons/md";
// import { IoMoonOutline } from "react-icons/io5";
// import { useAuth } from '../store/Auth';
// import axios from 'axios'; // For API requests

// function Navbar({ darkMode, toggleDarkMode }) {
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const [cartItems, setCartItems] = useState([]);
//   const [cartCount, setCartCount] = useState(0);
//   const { isLoggedin } = useAuth();

//   const toggleMenu = () => {
//     setIsMenuOpen(!isMenuOpen);
//   };


//  // Function to fetch cart items
//  const fetchCartItems = async () => {
//   try {
//       const token = localStorage.getItem('token');
//       const response = await axios.get('http://localhost:5000/api/cart', {
//           headers: {
//               Authorization: `Bearer ${token}`,
//           },
//       });
//       setCartItems(response.data.cartItems);
//   } catch (error) {
//       console.error('Error fetching cart items:', error.response?.data || error.message);
//   }
// };

// // Function to update cart count
// const updateCartCount = () => {
//   console.log('Cart items:', cartItems); // Log the cart items array
//   const count = cartItems.reduce((total, item) => total + (item.quantity || 0), 0); // Ensure quantity exists
//   setCartCount(count);
//   fetchCartItems();
// };

// // useEffect to fetch cart items when user logs in
// useEffect(() => {
//   if (isLoggedin) {
//       fetchCartItems();
//   }
// }, [isLoggedin]);

// // useEffect to update cart count whenever cartItems changes
// useEffect(() => {
//   updateCartCount();
// }, [cartItems]);







//   const { LogoutUser } = useAuth();

//   const handleLogout = () => {
//     LogoutUser();
//     toggleMenu();
//   };

//   return (
//     <div className="nav">
//       <div className="nav-logo">
//         <NavLink to='/'>
//           <h1>Splendor</h1>
//         </NavLink>
//       </div>

//       <div className={`nav-links ${isMenuOpen ? 'open' : ''}`}>
//         {/* <NavLink to="/" onClick={toggleMenu}>Home</NavLink> */}
//         {/* <NavLink to="/about" onClick={toggleMenu}>About</NavLink> */}
//         <NavLink to="/products" onClick={toggleMenu}>Products</NavLink>
//         <NavLink to="/find_perfume" onClick={toggleMenu}>Recommender</NavLink>
        
//         {isLoggedin && (
//           <NavLink to="/wishlist" onClick={toggleMenu}>Wishlist</NavLink>
//         )}
//       </div>

//       <div className='modes'>
//         <button onClick={toggleDarkMode} className="theme-toggle-btn">
//           {darkMode ? <MdOutlineWbSunny /> : <IoMoonOutline />}
//         </button>

//         <NavLink to="/cart" onClick={toggleMenu} className='cart-icon'>
//           <IoIosCart className="nav-icon" />
//           <span className="cart-count">{cartCount}</span>
//         </NavLink>

//         {isLoggedin ? (
//           <NavLink to="/login">
//             <button className="log-button" onClick={handleLogout}>
//               <span>Logout</span>
//             </button>
//           </NavLink>
//         ) : (
//           <NavLink to="/login">
//             <button className="log-button" onClick={toggleMenu}>
//               <span>Login</span>
//             </button>
//           </NavLink>
//         )}
//       </div>

//       <div className="menu-toggle" onClick={toggleMenu}>
//         <div className={`bar ${isMenuOpen ? 'open' : ''}`} />
//         <div className={`bar ${isMenuOpen ? 'open' : ''}`} />
//         <div className={`bar ${isMenuOpen ? 'open' : ''}`} />
//       </div>
//     </div>
//   );
// }

// export default Navbar;







import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import './navbar.css';
import { IoIosCart } from 'react-icons/io';
import { MdOutlineWbSunny } from "react-icons/md";
import { IoMoonOutline } from "react-icons/io5";
import { IoPersonCircle } from 'react-icons/io5'; // Profile Icon
import { IoIosLogOut } from "react-icons/io";
import { useAuth } from '../store/Auth';
import axios from 'axios'; // For API requests

function Navbar({ darkMode, toggleDarkMode }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const { isLoggedin, user, LogoutUser } = useAuth();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Function to fetch cart items
  const fetchCartItems = async () => {
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
    }
  };

  // Function to update cart count
  const updateCartCount = () => {
    const count = cartItems.reduce((total, item) => total + (item.quantity || 0), 0); // Ensure quantity exists
    setCartCount(count);
    fetchCartItems();
  };

  // useEffect to fetch cart items when user logs in
  useEffect(() => {
    if (isLoggedin) {
      fetchCartItems();
    }
  }, [isLoggedin]);

  // useEffect to update cart count whenever cartItems changes
  useEffect(() => {
    updateCartCount();
  }, [cartItems]);

  // Handle Logout
  const handleLogout = () => {
    LogoutUser();
    setIsDropdownVisible(false); // Close dropdown on logout
  };

  // Toggle dropdown visibility
  const toggleDropdown = () => {
    setIsDropdownVisible(prev => !prev);
  };

  return (
    <div className="nav">
      <div className="nav-logo">
        <NavLink to='/'>
          <h1>Splendor</h1>
        </NavLink>
      </div>

      <div className={`nav-links ${isMenuOpen ? 'open' : ''}`}>
        <NavLink to="/products" onClick={toggleMenu}>Products</NavLink>
        <NavLink to="/find_perfume" onClick={toggleMenu}>Recommender</NavLink>

        {isLoggedin && (
          <>
            <NavLink to="/wishlist" onClick={toggleMenu}>Wishlist</NavLink>
            <NavLink to="/order_details" onClick={toggleMenu}>Your Orders</NavLink>
          </>
        )}
      </div>

      <div className='modes'>
        <button onClick={toggleDarkMode} className="theme-toggle-btn">
          {darkMode ? <MdOutlineWbSunny /> : <IoMoonOutline />}
        </button>

        <NavLink to="/cart" onClick={toggleMenu} className='cart-icon'>
          <IoIosCart className="nav-icon" />
          <span className="cart-count">{cartCount}</span>
        </NavLink>

        {isLoggedin ? (
          <div className="profile-dropdown-container">
            <div className="profile-icon" onClick={toggleDropdown}>
              <IoPersonCircle className="profile-icon-img" />
            </div>

            {isDropdownVisible && (
              <div className="profile-dropdown">
                <NavLink to="/profile" className="dropdown-item">Profile </NavLink>
                <NavLink to="/login" onClick={handleLogout} className="dropdown-item">
                Logout <IoIosLogOut className='logout-icon' size={18}/>
                </NavLink>
              </div>
            )}
          </div>
        ) : (
          <NavLink to="/login">
            <button className="log-button" onClick={toggleMenu}>
              <span>Login</span>
            </button>
          </NavLink>
        )}
      </div>

      <div className="menu-toggle" onClick={toggleMenu}>
        <div className={`bar ${isMenuOpen ? 'open' : ''}`} />
        <div className={`bar ${isMenuOpen ? 'open' : ''}`} />
        <div className={`bar ${isMenuOpen ? 'open' : ''}`} />
      </div>
    </div>
  );
}

export default Navbar;
