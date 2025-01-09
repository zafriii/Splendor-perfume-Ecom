import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../store/Auth';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Showmsg from './Showmsg';
import './member.css';

const Member = () => {
    const { user, isLoggedin } = useAuth(); // Get user from useAuth hook
    const [memberData, setMemberData] = useState(null); // State to hold member data
    const [shouldRedirect, setShouldRedirect] = useState(false);
    const [showmsg, setShowmsg] = useState({ message: '', type: '' }); // State for Showmsg

    const navigate = useNavigate();

    const fetchMemberData = async () => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                setShowmsg({ message: 'Please log in to access membership.', type: 'error' });
                return;
            }

            const response = await axios.get('http://localhost:5000/api/member', {
                headers: { Authorization: `Bearer ${token}` }
            });

            if (response.data.member) {
                setMemberData(response.data.member); // Set member data if exists
            } else {
                setMemberData(null); // No member data found
            }
        } catch (error) {
            console.error('Error fetching member data:', error);
            // setShowmsg({ message: 'Failed to fetch membership data.', type: 'error' });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!isLoggedin) {
            setShouldRedirect(true);
            return;
        }

        if (shouldRedirect) {
            window.location.href = '/login';
            return null;
        }

        const token = localStorage.getItem('token');
        if (!token) {
            setShowmsg({ message: 'Please log in to add a member.', type: 'error' });
            return;
        }

        try {
            const response = await axios.post(
                'http://localhost:5000/api/member',
                {
                    email: user?.email || '',
                    name: user?.username || '',
                    phone: user?.phone || ''
                },
                {
                    headers: { Authorization: `Bearer ${token}` }
                }
            );

            setShowmsg({ message: 'Member added successfully!', type: 'success' });
            setMemberData(response.data.member); // Update member data
        } catch (error) {
            console.error('Error adding member:', error);
            setShowmsg({ message: 'Failed to add member. Please try again.', type: 'error' });
        }
    };

    const closeMessage = () => {
        setShowmsg({ message: '', type: '' });
    };

    useEffect(() => {
        AOS.init({ duration: 1000 });
        if (isLoggedin) {
            fetchMemberData(); // Fetch member data on mount
        }
    }, [isLoggedin]);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
      
        const day = date.getDate();
        const month = date.toLocaleString('default', { month: 'short' }); 
        const year = date.getFullYear();
      
        return `${day} ${month}, ${year}`;
      };

    return (
        <>
            <Showmsg
                message={showmsg.message}
                type={showmsg.type}
                onClose={closeMessage}
            />

            <div className="member" data-aos="fade-up">
                {memberData ? (
                    <div className="coupon-card">
                        <h3>You're now a member at Splendor</h3>
                        <p className='join'>Joined since {formatDate(memberData.createdAt)} </p>
                        <p>Your Coupon Code:</p>
                        <div className="coupon-code">{memberData.couponCode || 'DISCOUNT10'}</div>
                        <p>Use this coupon on your next purchase to get a discount!</p>
                    </div>
                ) : (
                    <div className="member-section">
                        <h3>Get your membership</h3>
                        <p>Get 10% off on your purchase</p>

                        <form onSubmit={handleSubmit}>
                            <input
                                type="email"
                                name="email"
                                value={user?.email || ''}
                                placeholder="Email"
                                readOnly
                                required
                            />

                            <input
                                type="text"
                                name="name"
                                placeholder="Name"
                                value={user?.username || ''}
                                readOnly
                                required
                            />

                            <input
                                type="text"
                                name="phone"
                                placeholder="Phone"
                                value={user?.phone || ''}
                                readOnly
                                required
                            />

                            <div className="member-btns">
                                <button className="submit-member" type="submit">
                                    Be a Member
                                </button>
                            </div>
                        </form>
                    </div>
                )}
            </div>
        </>
    );
};

export default Member;
