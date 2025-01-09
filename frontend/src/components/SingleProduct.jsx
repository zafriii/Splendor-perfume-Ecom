import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Data from '../Data';
import './singleproduct.css';
import Star from './Star';
import axios from 'axios';
import Showmsg from './Showmsg';
import { NavLink } from 'react-router-dom';
import { FaStar } from "react-icons/fa";

function SingleProduct() {
    const { id } = useParams();
    const [cart, setCart] = useState(JSON.parse(localStorage.getItem('cart')) || []);
    const [quantity, setQuantity] = useState(1); // Initialize quantity to 1
    const [message, setMessage] = useState(''); // State for message
    const [msgType, setMsgType] = useState(''); // State for message type (success/error)
    const [isInWishlist, setIsInWishlist] = useState(false); // Track if product is in wishlist

    const product = Data.find(product => product.id === parseInt(id));

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart));
    }, [cart]);

    useEffect(() => {
        // Check if the product is already in the wishlist
        const token = localStorage.getItem("token");
        if (token) {
            axios.get("http://localhost:5000/api/wishes", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then(response => {
                const wishList = response.data;
                const isProductInWishlist = wishList.some(item => item.productId === product.id);
                setIsInWishlist(isProductInWishlist);
            })
            .catch(error => console.error("Error checking wishlist:", error));
        }
    }, [product.id]);

    const addToCart = async () => {
        if (product.stock <= 0) {
            setMessage("This product is out of stock.");
            setMsgType('error');
            return;
        }

        const token = localStorage.getItem("token"); // Get the user's token
        const cartData = {
            productId: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            quantity: quantity,
            stock: product.stock,
        };

        try {
            const response = await axios.post('http://localhost:5000/api/cart/add', cartData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            setMessage(response.data.message);
            setMsgType('success');

        } catch (error) {
            if (error.response) {
                if (error.response.status === 400) {
                    
                    if (error.response.data.message === "Product already in your cart") {
                        setMessage("Product already in your cart. Do you want to update the quantity?");
                        setMsgType('info');  
                    } else {
                        setMessage( error.response.data.message);
                        setMsgType('error');
                    }
                } else {
                    setMessage("An error occurred: " + error.message);
                    setMsgType('error');
                }
            }
        }
    };



    const incrementQuantity = () => {
        if (quantity < product.stock) {
            setQuantity(quantity + 1);
        } else {
            setMessage("Out of stock");
            setMsgType('error');
        }
    };

    const decrementQuantity = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1);
        }
    };

    const handleWish = async (product) => {
        try {
            const token = localStorage.getItem("token"); // Get the user's token

            // Prepare the data to send
            const wishData = {
                productId: product.id,
                name: product.name,
                price: product.price,
                image: product.image, // Assuming `product.image` is a URL or base64 encoded string
            };

            // Send the data in a POST request
            const response = await axios.post(
                "http://localhost:5000/api/wishes",
                wishData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            setMessage(response.data.message);
            setMsgType('success');
            setIsInWishlist(true); // Update the state to reflect product is in wishlist
        } catch (error) {
            if (error.response && error.response.status === 400) {
                setMessage("Product already in your wish list");
                setMsgType('error');
            } else {
                setMessage("An error occurred: " + error.message);
                setMsgType('error');
            }
        }
    };

    if (!product) {
        return <div>Product not found</div>;
    }


    const [reviewCount, setReviewCount] = useState(0);

    useEffect(() => {
        fetchReviewCount();
    }, []);


    const fetchReviewCount = async () => {
        try {
            const response = await axios.get(
                `http://localhost:5000/api/review/product/${id}/reviews/count`
            );
            setReviewCount(response.data.count);
        } catch (error) {
            console.error('Error fetching review count:', error);
        }
    };

    const [averageRating, setAverageRating] = useState(0); // Average rating
    const [totalRatings, setTotalRatings] = useState(0); // Total number of ratings

    useEffect(() => {
        const fetchRatings = async () => {
          try {
            const response = await axios.get(`http://localhost:5000/api/rating/${id}`);
            const avgRating = response.data.averageRating;
            const total = response.data.totalRatings;
    
            // Ensure averageRating is a valid number
            setAverageRating(!isNaN(avgRating) ? Number(avgRating) : 0);
            setTotalRatings(!isNaN(total) ? Number(total) : 0);
          } catch (error) {
            console.error("Error fetching ratings:", error.response?.data || error.message);
          }
        };
    
        fetchRatings();
      }, [id]);



    return (
        <div className="single-product">
            <Showmsg message={message} type={msgType} onClose={() => setMessage('')} />

            <div className="single-img">
                <img src={product.image} alt={product.name}></img>
            </div>
            <div className="single-data">
                <h1>{product.name}</h1>
                <div className="star-rating"> 

                <div className="rating-summary">
                        <p>
                        <strong> Average Rating:  {!isNaN(averageRating) ? averageRating.toFixed(1) : "N/A"}</strong> 
                        ({totalRatings === 1 ? " 1 rating" : ` ${totalRatings} ratings`})
                        <span>{[1, 2, 3, 4, 5].map((star) => (
                            <FaStar
                            key={star}
                            size={20}
                            className={`star ${star <= averageRating ? "filled" : ""}`}
                            />
                        ))}</span>
                        </p>
                    
                    </div>
                    <p className='review-cnt'>
                        (<NavLink to={`/reviews/${id}`}>
                            {reviewCount} customer reviews - <span className='see-review'>see reviews</span>
                        </NavLink>)
                    </p>
                </div>
                <p> <strong>Price :</strong> {product.price}</p>
                <p> <strong>Deal of the day :</strong> {product.dealOfTheDayPrice}</p>
                <p> <strong>Brand :</strong> {product.brand}</p>
                <p> <strong>Category :</strong> {product.outfit}</p>
                <p>{product.description}</p>
                <p><strong>Availability :</strong> {product.availability}</p>
                <div className="quantity-controls">
                    <button onClick={decrementQuantity}>-</button>
                    <span>{quantity}</span>
                    <button onClick={incrementQuantity}>+</button>
                </div>
                <div className="single-btn">
                <button onClick={addToCart}>Add to Cart</button>

                <button 
                    onClick={() => handleWish(product)} 
                    className={`wish-button ${isInWishlist ? 'added' : ''}`}>
                    {isInWishlist ? 'Added to Wishlist' : 'Add to Wishlist'}
                </button>
                
                </div>
            </div>
        </div>
    );
}

export default SingleProduct;
