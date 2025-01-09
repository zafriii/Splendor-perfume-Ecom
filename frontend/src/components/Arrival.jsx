import React, {useEffect} from 'react'
import './arrival.css'
import AOS from 'aos';
import 'aos/dist/aos.css';

function Arrival() {
    useEffect(() => {
        AOS.init({ duration: 1000 });
      }, []);

  return (
    <div className="arrival">
    <div className="arrival-card">
            <div className="arrival-image-container">
                <img src="images/salwar.png" alt="Red Computer Mouse" />
            </div>
            <div className="product-details" data-aos="fade-left">
                <h2>Arriving soon!</h2>
                <h3>Green-Ash Salwar</h3>
                <p>Experience the elegance and comfort of our Green-Ash Salwar, perfect for any occasion.</p>
                {/* <button className="buy-now-button">Buy Now <span>→</span></button> */}
            </div>
        </div>

        </div>
  )
}

export default Arrival