// import React, { useState, useEffect } from 'react';
// import { useParams } from 'react-router-dom';
// import axios from 'axios';
// import { FaPen } from 'react-icons/fa';
// import { AiFillDelete } from 'react-icons/ai';
// import ConfirmModal from './ConfirmModal';
// import { useAuth } from '../store/Auth';
// import Data from '../Data';
// import './review.css';
// import Comments from './Comments';

// function Reviewpage() {
//   const { id } = useParams(); // Product ID from URL
//   const [reviews, setReviews] = useState([]);
//   const [newReview, setNewReview] = useState('');
//   const [editingReview, setEditingReview] = useState(null);
//   const [editContent, setEditContent] = useState('');
//   const [reviewCount, setReviewCount] = useState(0);
//   const [showConfirmModal, setShowConfirmModal] = useState(false);
//   const [deleteId, setDeleteId] = useState(null);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [isSubmitting, setIsSubmitting] = useState(false); // Loading state for submit button
//   const { user, isLoggedin } = useAuth();

//   // Find the product by ID
//   const productId = parseInt(id, 10);
//   const product = Data.find((product) => product.id === productId);

//   useEffect(() => {
//     fetchReviews();
//     fetchReviewCount();
//   }, [productId]);

//   const fetchReviews = async () => {
//     try {
//       const response = await axios.get(`http://localhost:5000/api/review/product/${id}/reviews`);
//       setReviews(response.data);
//     } catch (error) {
//       console.error('Error fetching reviews:', error);
//     }
//   };

//   const fetchReviewCount = async () => {
//     try {
//       const response = await axios.get(`http://localhost:5000/api/review/product/${id}/reviews/count`);
//       setReviewCount(response.data.count);
//     } catch (error) {
//       console.error('Error fetching review count:', error);
//     }
//   };

//   const handleCreateReview = async () => {
//     if (!newReview.trim()) return; // Avoid empty reviews
//     setIsSubmitting(true);
//     try {
//       const token = localStorage.getItem('token');
//       const response = await axios.post(
//         `http://localhost:5000/api/review/product/${id}/reviews`,
//         { content: newReview },
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
//       setReviews((prevReviews) => [...prevReviews, response.data]);
//       setNewReview('');
//       fetchReviewCount();
//       fetchReviews();
//     } catch (error) {
//       console.error('Error creating review:', error);
//     } finally {
//       setIsSubmitting(false);
//     }
//   };






//   const handleEditReview = async (reviewId) => {
//     try {
//       const token = localStorage.getItem('token');
//       const response = await axios.put(
//         `http://localhost:5000/api/review/${reviewId}`,
//         { content: editContent },
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
//       setReviews(
//         reviews.map((review) =>
//           review._id === reviewId ? { ...review, content: response.data.content } : review
//         )
//       );
//       setEditingReview(null);
//       setEditContent('');
//     } catch (error) {
//       console.error('Error editing review:', error);
//     }
//   };

//   const handleDeleteReview = async (reviewId) => {
//     try {
//       const token = localStorage.getItem('token');
//       await axios.delete(`http://localhost:5000/api/review/${reviewId}`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setReviews(reviews.filter((review) => review._id !== reviewId));
//       fetchReviewCount();
//     } catch (error) {
//       console.error('Error deleting review:', error);
//     }
//   };

//   const requestDeleteReview = (id) => {
//     setDeleteId(id);
//     setShowConfirmModal(true);
//   };

//   const confirmDeleteReview = async () => {
//     try {
//       const token = localStorage.getItem('token');
//       await axios.delete(`http://localhost:5000/api/review/${deleteId}`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setReviews((prevReviews) => prevReviews.filter((review) => review._id !== deleteId));
//       setShowConfirmModal(false);
//       fetchReviewCount();
//     } catch (error) {
//       console.error('Error deleting review:', error);
//     }
//   };

//   const cancelDeleteReview = () => {
//     setShowConfirmModal(false);
//   };

//   const filteredReviews = reviews.filter((review) =>
//     review.content && review.content.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   // Format date and calculate time ago
//   const formatDate = (dateString) => {
//     const date = new Date(dateString);
//     const day = date.getDate();
//     const month = date.toLocaleString('default', { month: 'short' });
//     const year = date.getFullYear();
//     return `${day} ${month}, ${year}`;
//   };

//   const timeAgo = (date) => {
//     const now = new Date();
//     const postDate = new Date(date);
//     const diffInMs = now - postDate;

//     const seconds = Math.floor(diffInMs / 1000);
//     const minutes = Math.floor(diffInMs / (1000 * 60));
//     const hours = Math.floor(diffInMs / (1000 * 60 * 60));
//     const days = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

//     if (days > 0) return `${days} day${days > 1 ? 's' : ''} ago`;
//     if (hours > 0) return `${hours} hour${hours > 1 ? 's' : ''} ago`;
//     if (minutes > 0) return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
//     return `${seconds} second${seconds > 1 ? 's' : ''} ago`;
//   };

//   const [commentCount, setCommentCount] = useState(0); 
//   const handleCommentCountUpdate = (newCount) => {
//     setCommentCount(newCount);
//   };


//   return (
//     <div className="review-page">
//       <h2>Product Reviews</h2>
//       <hr />

//       <div className="info-create">
//         <div className="product-img">
//           <img src={product.image} alt={product.name} />
//         </div>

//         <div className="info-review">
//           <div className="review-product-info">
//             <p><strong>Product: </strong>{product.name}</p>
//             <p><strong>Price:</strong> {product.price} tk</p>
//           </div>

//           <div className="create-review">
//             {isLoggedin ? (
//               <>
//                 <h3>Leave a Review about <span>{product.name}</span></h3>
//                 <textarea
//                   placeholder={isLoggedin ? `Write your review, ${user.username}...` : "Write your review..."}
//                   value={newReview}
//                   onChange={(e) => setNewReview(e.target.value)}
//                 />
//                 <button onClick={handleCreateReview} disabled={isSubmitting}>
//                   {isSubmitting ? 'Submitting...' : 'Submit Review'}
//                 </button>
//               </>
//             ) : (
//               <button onClick={() => { window.location.href = '/login'; }}>
//                 Submit Review
//               </button>
//             )}
//           </div>
//         </div>
//       </div>

//       <div className="review-no">
//         <h3>Total Reviews ({reviewCount})</h3>
//       </div>

//       <div className="review-search-container">
//         <input
//           type="text"
//           placeholder="Search reviews..."
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//         />
//       </div>

//       <div className="reviews">
//         {filteredReviews.length === 0 ? (
//           <p>No reviews yet.</p>
//         ) : (
//           filteredReviews.map((review) => (
//             <div key={review._id} className="review">
//               {editingReview === review._id ? (
//                 <>
//                   <textarea
//                     value={editContent}
//                     onChange={(e) => setEditContent(e.target.value)}
//                   />
//                   <button onClick={() => handleEditReview(review._id)}>Save</button>
//                   <button onClick={() => setEditingReview(null)}>Cancel</button>
//                 </>
//               ) : (
//                 <>
//                   <div className="post">
//                     <p className="poster"><strong>Reviewed by:</strong> <span>{review.user.username}</span></p>
//                     <div className="date">
//                       <p className="date">{timeAgo(review.createdAt)}</p>
//                     </div>
//                   </div>
//                   <p>{review.content}</p>


//                   <Comments reviewId={review._id} postAuthorId={review.user._id} onCommentCountUpdate={handleCommentCountUpdate} />


//                   <div className="review-actions">
//                     {isLoggedin && user.username === review.user.username && (
//                       <>
//                         <button
//                           onClick={() => {
//                             setEditingReview(review._id);
//                             setEditContent(review.content);
//                           }}
//                         >
//                           <FaPen />
//                         </button>
//                         <button onClick={() => requestDeleteReview(review._id)}>
//                           <AiFillDelete />
//                         </button>
//                       </>
//                     )}
//                   </div>
//                 </>
//               )}
//             </div>
//           ))
//         )}

     


//       </div>

//       <ConfirmModal
//         show={showConfirmModal}
//         message="Are you sure you want to delete this review?"
//         onConfirm={confirmDeleteReview}
//         onCancel={cancelDeleteReview}
//       />
//     </div>
//   );
// }

// export default Reviewpage;



















// import React, { useState, useEffect } from 'react';
// import { useParams } from 'react-router-dom';
// import axios from 'axios';
// import { FaPen } from 'react-icons/fa';
// import { AiFillDelete } from 'react-icons/ai';
// import ConfirmModal from './ConfirmModal';
// import { useAuth } from '../store/Auth';
// import Data from '../Data';
// import './review.css';
// import Comments from './Comments';

// function Reviewpage() {
//   const { id } = useParams(); // Product ID from URL
//   const [reviews, setReviews] = useState([]);
//   const [newReview, setNewReview] = useState('');
//   const [editingReview, setEditingReview] = useState(null);
//   const [editContent, setEditContent] = useState('');
//   const [reviewCount, setReviewCount] = useState(0);
//   const [showConfirmModal, setShowConfirmModal] = useState(false);
//   const [deleteId, setDeleteId] = useState(null);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [isSubmitting, setIsSubmitting] = useState(false); // Loading state for submit button
//   const { user, isLoggedin } = useAuth();

//     // Recommendation state
//     const [recommendation, setRecommendation] = useState(null);
//     const [yesCount, setYesCount] = useState(0);
//     const [noCount, setNoCount] = useState(0);

//   // Find the product by ID
//   const productId = parseInt(id, 10);
//   const product = Data.find((product) => product.id === productId);

//   useEffect(() => {
//     fetchReviews();
//     fetchReviewCount();
//     fetchRecommendationStatus();
//   }, [productId]);

//   const fetchReviews = async () => {
//     try {
//       const response = await axios.get(`http://localhost:5000/api/review/product/${id}/reviews`);
//       setReviews(response.data);
//     } catch (error) {
//       console.error('Error fetching reviews:', error);
//     }
//   };

//   const fetchReviewCount = async () => {
//     try {
//       const response = await axios.get(`http://localhost:5000/api/review/product/${id}/reviews/count`);
//       setReviewCount(response.data.count);
//     } catch (error) {
//       console.error('Error fetching review count:', error);
//     }
//   };

//   const handleCreateReview = async () => {
//     if (!newReview.trim()) return; // Avoid empty reviews
//     setIsSubmitting(true);
//     try {
//       const token = localStorage.getItem('token');
//       const response = await axios.post(
//         `http://localhost:5000/api/review/product/${id}/reviews`,
//         { content: newReview },
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
//       setReviews((prevReviews) => [...prevReviews, response.data]);
//       setNewReview('');
//       fetchReviewCount();
//       fetchReviews();
//     } catch (error) {
//       console.error('Error creating review:', error);
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   const handleEditReview = async (reviewId) => {
//     try {
//       const token = localStorage.getItem('token');
//       const response = await axios.put(
//         `http://localhost:5000/api/review/${reviewId}`,
//         { content: editContent },
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
//       setReviews(
//         reviews.map((review) =>
//           review._id === reviewId ? { ...review, content: response.data.content } : review
//         )
//       );
//       setEditingReview(null);
//       setEditContent('');
//     } catch (error) {
//       console.error('Error editing review:', error);
//     }
//   };

//   const handleDeleteReview = async (reviewId) => {
//     try {
//       const token = localStorage.getItem('token');
//       await axios.delete(`http://localhost:5000/api/review/${reviewId}`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setReviews(reviews.filter((review) => review._id !== reviewId));
//       fetchReviewCount();
//     } catch (error) {
//       console.error('Error deleting review:', error);
//     }
//   };

//   const requestDeleteReview = (id) => {
//     setDeleteId(id);
//     setShowConfirmModal(true);
//   };

//   const confirmDeleteReview = async () => {
//     try {
//       const token = localStorage.getItem('token');
//       await axios.delete(`http://localhost:5000/api/review/${deleteId}`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setReviews((prevReviews) => prevReviews.filter((review) => review._id !== deleteId));
//       setShowConfirmModal(false);
//       fetchReviewCount();
//     } catch (error) {
//       console.error('Error deleting review:', error);
//     }
//   };

//   const cancelDeleteReview = () => {
//     setShowConfirmModal(false);
//   };

//   const filteredReviews = reviews.filter((review) =>
//     review.content && review.content.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   // Format date and calculate time ago
//   const formatDate = (dateString) => {
//     const date = new Date(dateString);
//     const day = date.getDate();
//     const month = date.toLocaleString('default', { month: 'short' });
//     const year = date.getFullYear();
//     return `${day} ${month}, ${year}`;
//   };

//   const timeAgo = (date) => {
//     const now = new Date();
//     const postDate = new Date(date);
//     const diffInMs = now - postDate;

//     const seconds = Math.floor(diffInMs / 1000);
//     const minutes = Math.floor(diffInMs / (1000 * 60));
//     const hours = Math.floor(diffInMs / (1000 * 60 * 60));
//     const days = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

//     if (days > 0) return `${days} day${days > 1 ? 's' : ''} ago`;
//     if (hours > 0) return `${hours} hour${hours > 1 ? 's' : ''} ago`;
//     if (minutes > 0) return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
//     return `${seconds} second${seconds > 1 ? 's' : ''} ago`;
//   };

//   const [commentCount, setCommentCount] = useState(0); 
//   const handleCommentCountUpdate = (newCount) => {
//     setCommentCount(newCount);
//   };


//   const fetchRecommendationStatus = async () => {
//     try {
//       const response = await axios.get(`http://localhost:5000/api/recommend/${id}`);
//       setYesCount(response.data.yesCount);
//       setNoCount(response.data.noCount);
//     } catch (error) {
//       console.error('Error fetching recommendation status:', error);
//     }
//   };

  


//   const handleRecommendation = async (value) => {
//     setRecommendation(value); // Update the recommendation state in the component
//     try {
//       const token = localStorage.getItem('token'); // Get the JWT token from localStorage
//        // This is the product ID you're recommending
  
//       // Send a POST request with the productId in the URL and recommendation in the body
//       await axios.post(
//         `http://localhost:5000/api/recommend/${id}`,  // URL with productId as route parameter
//         { recommendation: value },  // Send the recommendation in the request body
//         {
//           headers: { 
//             Authorization: `Bearer ${token}`  // Attach the Authorization header with the JWT token
//           }
//         }
//       );
  
//       // Fetch the updated recommendation status or update the UI after successful submission
//       fetchRecommendationStatus();
  
//     } catch (error) {
//       console.error('Error submitting recommendation:', error);
//     }
//   };
  
  
 

//   const recommendationStatus = yesCount === 0 && noCount === 0 
//   ? 'No recommendation yet' 
//   : yesCount > noCount 
//     ? 'recommended' 
//     : 'not recommended';


//   return (
//     <div className="review-page">
//       <h2>Product Reviews</h2>
//       <hr />

//       <div className="info-create">
//         <div className="product-img">
//           <img src={product.image} alt={product.name} />
//         </div>

//         <div className="info-review">
//           <div className="review-product-info">
//             <p><strong>Product: </strong>{product.name}</p>
//             <p><strong>Price:</strong> {product.price} tk</p>

//             <div>
//               <p><strong>Do you recommend this product?</strong></p>
//               <label>
//                 <input 
//                   type="radio" 
//                   name="recommendation" 
//                   value="yes" 
//                   checked={recommendation === 'yes'} 
//                   onChange={() => handleRecommendation('yes')} 
//                 />
//                 Yes
//               </label>
//               <label>
//                 <input 
//                   type="radio" 
//                   name="recommendation" 
//                   value="no" 
//                   checked={recommendation === 'no'} 
//                   onChange={() => handleRecommendation('no')} 
//                 />
//                 No
//               </label>
//             </div>
//             <p><strong>Status: </strong>{recommendationStatus}</p>
          


//           </div>

//           <div className="create-review">
//             {isLoggedin ? (
//               <>
//                 <h3>Leave a Review about <span>{product.name}</span></h3>
//                 <textarea
//                   placeholder={isLoggedin ? `Write your review, ${user.username}...` : "Write your review..."}
//                   value={newReview}
//                   onChange={(e) => setNewReview(e.target.value)}
//                 />
//                 <button onClick={handleCreateReview} disabled={isSubmitting}>
//                   {isSubmitting ? 'Submitting...' : 'Submit Review'}
//                 </button>
//               </>
//             ) : (
//               <button onClick={() => { window.location.href = '/login'; }}>
//                 Submit Review
//               </button>
//             )}
//           </div>
//         </div>
//       </div>

//       <div className="review-no">
//         <h3>Total Reviews ({reviewCount})</h3>
//       </div>

//       <div className="review-search-container">
//         <input
//           type="text"
//           placeholder="Search reviews..."
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//         />
//       </div>

//       <div className="reviews">
//         {filteredReviews.length === 0 ? (
//           <p>No reviews yet.</p>
//         ) : (
//           filteredReviews.map((review) => (
//             <div key={review._id} className="review">
//               {editingReview === review._id ? (
//                 <>
//                   <textarea
//                     value={editContent}
//                     onChange={(e) => setEditContent(e.target.value)}
//                   />
//                   <button onClick={() => handleEditReview(review._id)}>Save</button>
//                   <button onClick={() => setEditingReview(null)}>Cancel</button>
//                 </>
//               ) : (
//                 <>
//                   <div className="post">
//                     <p className="poster"><strong>Reviewed by:</strong> <span>{review.user.username}</span></p>
//                     <div className="date">
//                       <p className="date">{timeAgo(review.createdAt)}</p>
//                     </div>
//                   </div>
//                   <p>{review.content}</p>


//                   <Comments reviewId={review._id} postAuthorId={review.user._id} onCommentCountUpdate={handleCommentCountUpdate} />


//                   <div className="review-actions">
//                     {isLoggedin && user.username === review.user.username && (
//                       <>
//                         <button
//                           onClick={() => {
//                             setEditingReview(review._id);
//                             setEditContent(review.content);
//                           }}
//                         >
//                           <FaPen />
//                         </button>
//                         <button onClick={() => requestDeleteReview(review._id)}>
//                           <AiFillDelete />
//                         </button>
//                       </>
//                     )}
//                   </div>
//                 </>
//               )}
//             </div>
//           ))
//         )}

     


//       </div>

//       <ConfirmModal
//         show={showConfirmModal}
//         message="Are you sure you want to delete this review?"
//         onConfirm={confirmDeleteReview}
//         onCancel={cancelDeleteReview}
//       />
//     </div>
//   );
// }

// export default Reviewpage;















import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { FaPen } from 'react-icons/fa';
import { AiFillDelete } from 'react-icons/ai';
import ConfirmModal from './ConfirmModal';
import { useAuth } from '../store/Auth';
import Data from '../Data';
import './review.css';
import Comments from './Comments';
import RatingSystem from './RatingSystem';

function Reviewpage() {
  const { id } = useParams(); // Product ID from URL
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState('');
  const [editingReview, setEditingReview] = useState(null);
  const [editContent, setEditContent] = useState('');
  const [reviewCount, setReviewCount] = useState(0);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false); // Loading state for submit button
  const { user, isLoggedin } = useAuth();

    // Recommendation state
    const [recommendation, setRecommendation] = useState(null);
    const [yesCount, setYesCount] = useState(0);
    const [noCount, setNoCount] = useState(0);

  // Find the product by ID
  const productId = parseInt(id, 10);
  const product = Data.find((product) => product.id === productId);

  useEffect(() => {
    fetchReviews();
    fetchReviewCount();
    fetchRecommendationStatus();
  }, [productId]);

  const fetchReviews = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/review/product/${id}/reviews`);
      setReviews(response.data);
    } catch (error) {
      console.error('Error fetching reviews:', error);
    }
  };

  const fetchReviewCount = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/review/product/${id}/reviews/count`);
      setReviewCount(response.data.count);
    } catch (error) {
      console.error('Error fetching review count:', error);
    }
  };

  const handleCreateReview = async () => {
    if (!newReview.trim()) return; // Avoid empty reviews
    setIsSubmitting(true);
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        `http://localhost:5000/api/review/product/${id}/reviews`,
        { content: newReview },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setReviews((prevReviews) => [...prevReviews, response.data]);
      setNewReview('');
      fetchReviewCount();
      fetchReviews();
    } catch (error) {
      console.error('Error creating review:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEditReview = async (reviewId) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.put(
        `http://localhost:5000/api/review/${reviewId}`,
        { content: editContent },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setReviews(
        reviews.map((review) =>
          review._id === reviewId ? { ...review, content: response.data.content } : review
        )
      );
      setEditingReview(null);
      setEditContent('');
    } catch (error) {
      console.error('Error editing review:', error);
    }
  };

  const handleDeleteReview = async (reviewId) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:5000/api/review/${reviewId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setReviews(reviews.filter((review) => review._id !== reviewId));
      fetchReviewCount();
    } catch (error) {
      console.error('Error deleting review:', error);
    }
  };

  const requestDeleteReview = (id) => {
    setDeleteId(id);
    setShowConfirmModal(true);
  };

  const confirmDeleteReview = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:5000/api/review/${deleteId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setReviews((prevReviews) => prevReviews.filter((review) => review._id !== deleteId));
      setShowConfirmModal(false);
      fetchReviewCount();
    } catch (error) {
      console.error('Error deleting review:', error);
    }
  };

  const cancelDeleteReview = () => {
    setShowConfirmModal(false);
  };

  const filteredReviews = reviews.filter((review) =>
    review.content && review.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Format date and calculate time ago
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.toLocaleString('default', { month: 'short' });
    const year = date.getFullYear();
    return `${day} ${month}, ${year}`;
  };

  const timeAgo = (date) => {
    const now = new Date();
    const postDate = new Date(date);
    const diffInMs = now - postDate;

    const seconds = Math.floor(diffInMs / 1000);
    const minutes = Math.floor(diffInMs / (1000 * 60));
    const hours = Math.floor(diffInMs / (1000 * 60 * 60));
    const days = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

    if (days > 0) return `${days} day${days > 1 ? 's' : ''} ago`;
    if (hours > 0) return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    if (minutes > 0) return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
    return `${seconds} second${seconds > 1 ? 's' : ''} ago`;
  };

  const [commentCount, setCommentCount] = useState(0); 
  const handleCommentCountUpdate = (newCount) => {
    setCommentCount(newCount);
  };


  const fetchRecommendationStatus = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/recommend/${id}`);
      setYesCount(response.data.yesCount);
      setNoCount(response.data.noCount);
    } catch (error) {
      console.error('Error fetching recommendation status:', error);
    }
  };

  


  const handleRecommendation = async (value) => {
    setRecommendation(value); // Update the recommendation state in the component
    try {
      const token = localStorage.getItem('token'); // Get the JWT token from localStorage
       // This is the product ID you're recommending
  
      // Send a POST request with the productId in the URL and recommendation in the body
      await axios.post(
        `http://localhost:5000/api/recommend/${id}`,  // URL with productId as route parameter
        { recommendation: value },  // Send the recommendation in the request body
        {
          headers: { 
            Authorization: `Bearer ${token}`  // Attach the Authorization header with the JWT token
          }
        }
      );
  
      // Fetch the updated recommendation status or update the UI after successful submission
      fetchRecommendationStatus();
  
    } catch (error) {
      console.error('Error submitting recommendation:', error);
    }
  };
  

  const recommendationStatus = yesCount === 0 && noCount === 0 
  ? 'No recommendation yet' 
  : yesCount > noCount 
    ? 'recommended' 
    : 'not recommended';


  const recommendationPercentage = yesCount + noCount > 0
  ? Math.round((yesCount / (yesCount + noCount)) * 100)
  : 0;


  return (
    <div className="review-page">
      <h2>Product Reviews</h2>
      <hr />

      <div className="info-create">
        <div className="product-img">
          <img src={product.image} alt={product.name} />
        </div>

        <div className="info-review">
          <div className="review-product-info">
            <p><strong>Product: </strong>{product.name}</p>
            <p><strong>Price:</strong> {product.price} tk</p>

            <RatingSystem productId={productId} />

            <div className='recommend'>
              <p><strong>Do you recommend this product?</strong></p>
              <label>
                <input 
                  type="radio" 
                  name="recommendation" 
                  value="yes" 
                  checked={recommendation === 'yes'} 
                  onChange={() => handleRecommendation('yes')} 
                />
                Yes
              </label>
              <label>
                <input 
                  type="radio" 
                  name="recommendation" 
                  value="no" 
                  checked={recommendation === 'no'} 
                  onChange={() => handleRecommendation('no')} 
                />
                No
              </label>
            </div>
      
            <p><strong>Status: </strong><span className={yesCount > noCount ? 'recommended' : (yesCount === 0 && noCount === 0 ? 'no-recommendation' : 'not-recommended')}>
              {recommendationStatus}
          </span></p>


            <div>
              <p><strong>Recommendation Percentage: </strong>{recommendationPercentage}%</p>
              <div className="progress-bar">
                <div
                  className="progress-bar-fill"
                  style={{ width: `${recommendationPercentage}%` }}
                ></div>
              </div>
            </div>
          


          </div>

        
          <div className="create-review">
            <h3>Leave a Review about <span>{product.name}</span></h3>
            
            <textarea
              placeholder={isLoggedin ? `Write your review, ${user.username}...` : "Write your review..."}
              value={newReview}
              onChange={(e) => setNewReview(e.target.value)}
              disabled={!isLoggedin} 
            />
            
            <button
              onClick={() => {
                if (isLoggedin) {
                  handleCreateReview(); 
                } else {
                  window.location.href = '/login'; 
                }
              }}
              disabled={!isLoggedin && !newReview.trim()} 
            >
              {isSubmitting ? 'Submitting...' : isLoggedin ? 'Submit Review' : 'Log in to Submit'}
            </button>
          </div>



        </div>

      </div>

      <div className="review-no">
        <h3>Total Reviews ({reviewCount})</h3>
      </div>

      <div className="review-search-container">
        <input
          type="text"
          placeholder="Search reviews..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="reviews">
        {filteredReviews.length === 0 ? (
          <p>No reviews yet.</p>
        ) : (
          filteredReviews.map((review) => (
            <div key={review._id} className="review">
              {editingReview === review._id ? (
                <>
                  <textarea
                    value={editContent}
                    onChange={(e) => setEditContent(e.target.value)}
                  />
                  <button onClick={() => handleEditReview(review._id)}>Save</button>
                  <button onClick={() => setEditingReview(null)}>Cancel</button>
                </>
              ) : (
                <>
                  <div className="post">
                    <p className="poster"><strong>Reviewed by:</strong> <span>{review.user.username}</span></p>
                    <div className="date">
                      <p className="date">{timeAgo(review.createdAt)}</p>
                    </div>
                  </div>
                  <p>{review.content}</p>


                  <Comments reviewId={review._id} postAuthorId={review.user._id} onCommentCountUpdate={handleCommentCountUpdate} />


                  <div className="review-actions">
                    {isLoggedin && user.username === review.user.username && (
                      <>
                        <button
                          onClick={() => {
                            setEditingReview(review._id);
                            setEditContent(review.content);
                          }}
                        >
                          <FaPen />
                        </button>
                        <button onClick={() => requestDeleteReview(review._id)}>
                          <AiFillDelete />
                        </button>
                      </>
                    )}
                  </div>
                </>
              )}
            </div>
          ))
        )}
      </div>

      <ConfirmModal
        show={showConfirmModal}
        message="Are you sure you want to delete this review?"
        onConfirm={confirmDeleteReview}
        onCancel={cancelDeleteReview}
      />
    </div>
  );
}

export default Reviewpage;


