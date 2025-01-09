import React from 'react'
import { NavLink } from 'react-router-dom';
import Slider from 'react-slick'; // Import the slider
import "slick-carousel/slick/slick.css"; // Slick styles
import "slick-carousel/slick/slick-theme.css"; // Slick theme styles
import './Info.css';


function Info() {
    const settings = {
        dots: true, // Show navigation dots
        infinite: true, // Infinite loop
        speed: 500, // Transition speed
        slidesToShow: 1, // Show one slide at a time
        slidesToScroll: 1, // Scroll one slide at a time
        autoplay: true, // Auto slide
        autoplaySpeed: 3000, // Time between slides
    };

    return (
        <>
        <section className='inner'>
            
            <Slider {...settings} className="image-slider">              
                <div>
                    <img className="slider-image" src="/images/remove.png" alt="Slide 1" />
                </div>              
                <div>
                    <img className="slider-image" src="/images/remove2.png" alt="Slide 1" />
                </div>
                  <div>
                    <img className="slider-image" src="/images/remove3.png" alt="Slide 1" />
                </div>
            </Slider>


            {/* <div className="slider-container">
            <Slider {...settings} className="image-slider">
                <div>
                <img className="slider-image" src="/images/remove.png" alt="Slide 1" />
                </div>
                <div>
                <img className="slider-image" src="/images/remove2.png" alt="Slide 2" />
                </div>
                <div>
                <img className="slider-image" src="/images/remove3.png" alt="Slide 3" />
                </div>
            </Slider>
            <div className="glass-arrow">
                <i className="arrow-icon">&darr;</i>
            </div>
            </div> */}









            {/* Text Content */}
            <div className="text-overlay1">
                <div className='info1'>
                    <div className="banner1">
                        <span className="banner_text1">WELCOME TO SPLENDOR !</span>
                    </div>
                    <div className='content1'>
                    We aspire to make luxurious fragrances affordable & available for everyone.
                    Our mission is to bring premium scents within reach, so you can indulge in sophistication and elegance without compromise.
                    </div>
                    {/* <div className='content_text'>
                        Your body does a lot for you, and your caring therapist can help you return the favor in a way that benefits both your physical and mental wellness.
                    </div> */}
                    <button className='order1'>
                    <NavLink to='/products'>Shop Now</NavLink>
                    </button>
                </div>
            </div>
        </section>
        </>
    )
}

export default Info