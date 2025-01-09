import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../store/Auth';
import ConfirmModal from './ConfirmModal';
import './wishlist.css';

function WishlistPage() {
  const [wishlist, setWishlist] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [currentWishId, setCurrentWishId] = useState(null);
  const [currentWishName, setCurrentWishName] = useState('');
  const { user, isLoggedin } = useAuth();

  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:5000/api/wishes', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setWishlist(response.data.wishes);
      } catch (error) {
        console.error('Error fetching wishlist:', error.response?.data || error.message);
      }
    };

    fetchWishlist();
  }, []);

  // Open confirmation modal
  const handleDeleteClick = (wishId, wishName) => {
    setCurrentWishId(wishId);
    setCurrentWishName(wishName);
    setShowModal(true);
  };

  // Delete wishlist item function
  const handleDelete = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:5000/api/wishes/${currentWishId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setWishlist((prevWishlist) =>
        prevWishlist.filter((wish) => wish._id !== currentWishId)
      );
      setShowModal(false); // Close modal after deletion
    } catch (error) {
      console.error('Error deleting wishlist item:', error.response?.data || error.message);
    }
  };

  // Close modal
  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <>
      <div className="wishlist-page">
        {isLoggedin ? (
          <h2>
            <span className="username">{user.username}</span>, Your Wishlist
          </h2>
        ) : (
          <h2>Login to see your wishlist</h2>
        )}

        {/* Display wishlist count */}
        {isLoggedin && (
          <p className="wishlist-count">
            {wishlist.length === 0
              ? ''
              : `You have ${wishlist.length} item${wishlist.length > 1 ? 's' : ''} in your wishlist`}
          </p>
        )}

        <div className="wishlist-page">
          {wishlist.length === 0 && user ? (
            <div className="empty-wish-container">
              <p className="empty-wish">Your wishlist is empty.</p>
            </div>
          ) : (
            <div className="wishlist-container">
              {wishlist.map((wish) => (
                <div key={wish._id} className="wish-card">
                  <div className="wish-info">
                    <img src={wish.image} alt={wish.name} className="wish-item-image" />
                    <h3>{wish.name}</h3>
                    <p>{wish.price} tk</p>
                    <button
                      className="delete-button"
                      onClick={() => handleDeleteClick(wish._id, wish.name)}
                    >
                      Remove from Wishlist
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <ConfirmModal
        show={showModal}
        message={`Are you sure you want to remove "${currentWishName}" from your wishlist?`}
        onConfirm={handleDelete}
        onCancel={handleCloseModal}
      />
    </>
  );
}

export default WishlistPage;






