// import React, { useState, useEffect } from 'react';
// import './Slider.css';
// import SlideData from './SlideData';
// import { NavLink } from 'react-router-dom';
// import AOS from 'aos';
// import 'aos/dist/aos.css';

// function Slider() {
//     const [currentIndex, setCurrentIndex] = useState(0);

//     const nextSlide = () => {
//         setCurrentIndex((prevIndex) =>
//             prevIndex === SlideData.length - 1 ? 0 : prevIndex + 1
//         );
//     };

//     const prevSlide = () => {
//         setCurrentIndex((prevIndex) =>
//             prevIndex === 0 ? SlideData.length - 1 : prevIndex - 1
//         );
//     };

//     useEffect(() => {
//         const intervalId = setInterval(() => {
//             nextSlide();
//         }, 3000); 
//         return () => {
//             clearInterval(intervalId);
//             }
//     }, [currentIndex]); 

//     useEffect(() => {
//         AOS.init({ duration: 1000 });
//       }, []);

//     return (
//         <>
       
//         <div className="slider">

//             <div className="slider-container">
                
//                 <button className="prev" onClick={prevSlide}>
//                     &#10094;
//                 </button>
//                 {SlideData.map((curElem, index) => {
//                     const { id, image } = curElem;
//                     return (
//                         <div
//                             className={`popular-card-container fade ${
//                                 index === currentIndex ? 'slide active' : 'slide'
//                             }`}
//                             key={id}
//                         >


//                             <div className="circle "></div>    


//                             <div className="slider-data">

//                             <div className="slider-image-container fade" data-aos="fade-up">
//                                 <img src={image} alt={`Slide ${index}`} />
//                             </div>

//                             <div className="slider-text" data-aos="fade-up">
                                
//                             <h2>Welcome to Splendor</h2>
//                             <p>Splendor Women's Fashion Wear: Unleashing Timeless Style and Sophistication</p>

//                             <NavLink to='/products'><button>Shop Now</button></NavLink>

//                             </div>
                            
//                             </div>

//                             <div className="circle2 "></div>
                                                      
//                         </div>


//                     );
//                 })}
//                 <button className="next" onClick={nextSlide}>
//                     &#10095;
//                 </button>
//             </div>
//         </div>
//         </>
//     );
// }

// export default Slider;










