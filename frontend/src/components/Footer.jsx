import React from 'react';
import './footer.css';
import { FaFacebookF } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { useAuth } from '../store/Auth';

const Footer = () => {


    const { isLoggedin } = useAuth();

    return (
        <section className="footer">
            <div className="upper-foot">
                <div className="footer-links">
                    <h4>Shop</h4>
                   
                    <a href="/">SPLENDOR HOME</a>
                    <a href="/products">FIND STORE</a>
                   
                    <p>Jail Road, Sylhet City, Bangladesh</p>
                    <p>Opening Hours: 01:00 PM - 11:00 PM (Mon - Sat), Closed on Fridays</p>
                    <p>Contact Us : +880 1714483770</p>
                    <p>Gmail : splendor24@gmail.com</p>
                    
                </div>
                <div className="footer-links">
                    <h4>CORPORATE INFO</h4>
                    <a href="/about">ABOUT SPLENDOR</a>
                    
                </div>
                <div className="footer-links">
                    <h4>HELP</h4>
                    <a href="customer_service">CUSTOMER SERVICE</a>
                    <a 
                        href={isLoggedin ? "/profile" : "/login"} 
                        className="join-now-link"
                        >
                        MY ACCOUNT
                    </a>
                    {/* <a href="/products">FIND STORE</a> */}
                    {/* <a href="#">GIFT CARD TERMS & CONDITION</a> */}
                    <a href="/contact">CONTACT</a>
                </div>
                <div className="footer-links">
                    <div className="become-member">
                        <h4>BECOME A MEMBER</h4>
                        {/* <a href="#">JOIN NOW & GET<br />10% OFF YOUR NEXT<br /> PURCHASE</a> */}
                        <a 
                        href={isLoggedin ? "/membership" : "/signup"} 
                        className="join-now-link"
                        >
                            JOIN NOW & GET<br />10% OFF YOUR NEXT<br /> PURCHASE
                        </a>
                        
                        <p>Follow us on social media</p>
                        <div className="social-icons">
                        
                                <FaFacebookF className='icon' size={35}/>
                                <FaInstagram className='icon' size={35}/>
                        </div>
                    </div>
                </div>
            </div>
            <div className="lower-foot">
                The content of this site is copyright-protected and is the property of Splendor Hennes & Mauritz AB. Splendor is committed to accessibility.<br />
                That commitment means Splendor embraces WCAG guidelines and supports assistive technologies such as screen readers.<br />
                If you are using a screen reader, magnifier, or other assistive technologies and are experiencing difficulties using this website, please call our TOLL-FREE support line (855-466-7467) for assistance.
                <p>© SPLENDOR  {new Date().getFullYear()} | All rights reserved</p> 
           
            </div>
        </section>
    );
};

export default Footer;
