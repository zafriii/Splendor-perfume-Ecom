// import React from 'react'
// import Slider from "react-slick";
// import "slick-carousel/slick/slick.css"; 
// import "slick-carousel/slick/slick-theme.css";
// import './cardslide.css'

// function CardSlide() {

//     const settings = {
//         dots: true,
//         infinite: true,
//         speed: 500,
//         slidesToShow: 3,
//         slidesToScroll: 1
//       };


//   return (
//     <div className='feature'>  
//         <h2>Our Collections</h2>
//     <Slider {...settings}>
//       {data.map((d, index) => (
//         <div key={index} className="feature-card">
//           <div className='card'>
//             <img src={d.img} alt=""/>           
//             <p>{d.name}</p>
//           </div>

//         </div>
//       ))}
//     </Slider>
       
//   </div>
//   )
// }


// const data = [
//     {
//       name: `Stylish Tops`,
//       img: `images/topsbox.png`,
      
//     },
//     {
//       name: `Beautiful Sarees`,
//       img: `images/Geosarees.png`,
     
//     },
//     {
//       name: `Fitting Jeans`,
//       img: `images/jeansf.png`,
      
//     },
//     {
//       name: `Lavish Lehenga`,
//       img: `images/lehenga2.png`,
      
//     },
//     {
//       name: `Beautiful Salwar Kameej`,
//       img: `images/kameej.png`,
       
//     },
    
//   ];
  

// export default CardSlide






import React, {useEffect} from 'react'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import './cardslide.css'
import AOS from 'aos';
import 'aos/dist/aos.css';

function CardSlide() {

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 768, // at 768px or below
                settings: {
                    slidesToShow: 1, // show 1 slide
                    slidesToScroll: 1
                }
            },
            {
                breakpoint: 1024, // at 1024px or below
                settings: {
                    slidesToShow: 2, // show 2 slides
                    slidesToScroll: 1
                }
            }
        ]
    };

    useEffect(() => {
        AOS.init({ duration: 1000 });
      }, []);

    return (
        <div className='feature'>  
            <h2>Our Collections</h2>
            <Slider {...settings}>
                {data.map((d, index) => (
                    <div key={index} className="feature-card">
                        <div className='card' data-aos="fade-up">
                            <img src={d.img} alt={d.name} />
                            <p>{d.name}</p>
                        </div>
                    </div>
                ))}
            </Slider>
            .
        </div>
    );
}

const data = [
    {
        name: `Stylish Tops`,
        img: `images/topsbox.png`,
    },
    {
        name: `Beautiful Sarees`,
        img: `images/Geosarees.png`,
    },
    {
        name: `Fitting Jeans`,
        img: `images/jeansf.png`,
    },
    {
        name: `Lavish Lehenga`,
        img: `images/lehenga2.png`,
    },
    {
        name: `Beautiful Salwar Kameej`,
        img: `images/kameej.png`,
    }
];

export default CardSlide;
