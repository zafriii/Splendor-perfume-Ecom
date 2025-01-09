import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaStar } from "react-icons/fa"; // React icons for stars
import "./rating.css";

function RatingSystem({ productId }) {
  const [userRating, setUserRating] = useState(null); // User's selected rating
  const [hover, setHover] = useState(null); // Hover effect for stars
  const [averageRating, setAverageRating] = useState(0); // Average rating
  const [totalRatings, setTotalRatings] = useState(0); // Total number of ratings
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Fetch product ratings and user rating on mount
  useEffect(() => {
    const fetchRatings = async () => {
      try {
        // Fetch the average rating and total ratings for the product
        const response = await axios.get(`http://localhost:5000/api/rating/${productId}`);
        const avgRating = response.data.averageRating;
        const total = response.data.totalRatings;

        // Ensure averageRating is a valid number
        setAverageRating(!isNaN(avgRating) ? Number(avgRating) : 0);
        setTotalRatings(!isNaN(total) ? Number(total) : 0);
        
        // Fetch the user's rating for this product
        const userRatingResponse = await axios.get(
          `http://localhost:5000/api/rating/user/${productId}`,
          { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
        );

        // Set user's rating if found
        setUserRating(userRatingResponse.data.userRating);
      } catch (error) {
        console.error("Error fetching ratings:", error.response?.data || error.message);
      }
    };

    fetchRatings();
  }, [productId]);

  // Submit user rating
  const handleRatingSubmit = async (rating) => {
    if (!rating) return;

    setIsSubmitting(true);
    try {
      const token = localStorage.getItem("token"); // Assuming you store user token
      await axios.post(
        `http://localhost:5000/api/rating/${productId}`,
        { rating },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      // Fetch updated ratings
      const response = await axios.get(`http://localhost:5000/api/rating/${productId}`);
      const avgRating = response.data.averageRating;
      const total = response.data.totalRatings;

      // Ensure the averageRating is a valid number
      setAverageRating(!isNaN(avgRating) ? Number(avgRating) : 0);
      setTotalRatings(!isNaN(total) ? Number(total) : 0);
      setUserRating(rating); // Update the user's rating
    } catch (error) {
      console.error("Error submitting rating:", error.response?.data || error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="rating-container">
      <h3>Rate this Product</h3>
      <div className="stars">
        {[1, 2, 3, 4, 5].map((star) => (
          <FaStar
            key={star}
            size={30}
            className={`star ${star <= (hover || userRating) ? "filled" : ""}`}
            onMouseEnter={() => setHover(star)}
            onMouseLeave={() => setHover(null)}
            onClick={() => handleRatingSubmit(star)}
          />
        ))}
      </div>
      {isSubmitting && <p>Submitting your rating...</p>}

      <div className="rating-summary">
        <p>
          <strong>
            Average Rating: {!isNaN(averageRating) ? averageRating.toFixed(1) : "N/A"}
          </strong>
          ({totalRatings === 1 ? "1 rating" : `${totalRatings} ratings`})
          <span>
            {[1, 2, 3, 4, 5].map((star) => (
              <FaStar
                key={star}
                size={20}
                className={`star ${star <= averageRating ? "filled" : ""}`}
              />
            ))}
          </span>
        </p>
      </div>
    </div>
  );
}

export default RatingSystem;
