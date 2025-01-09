import React, {useEffect} from 'react'
import './banner.css';
import AOS from 'aos';
import 'aos/dist/aos.css';


const BannerSection = () => {

 useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);



  return (


    <div className="banner-section">

    <h2 className='banner-heading'>Shop By Categories</h2>

    <div className="banner" data-aos="fade-up">

       

      <div className="banner-cards" >
        <div className="banner-cards-content">
          <h2 className="banner-cards-subtitle">New Collection</h2>
          <h2 className="h2 banner-cards-title">Fragrances designed to enhance every individual’s</h2>
          <a href="/products" className="btn btn-secondary">
           For Men
          </a>
        </div>

      </div>



      <div className="banner-cards" >
        <div className="banner-cards-content">
          <h2 className="banner-cards-subtitle">New Collection</h2>
          <h2 className="h2 banner-cards-title"> Fragrances designed to enhance every individual’s</h2>
          <a href="/products" className="btn btn-secondary">
           For Women
          </a>
        </div>

      </div>
      </div>

    </div>
  );
};

export default BannerSection;