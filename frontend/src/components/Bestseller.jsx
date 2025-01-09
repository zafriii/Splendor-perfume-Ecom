import React, {useEffect} from 'react'
import './bestseller.css'
import AOS from 'aos';
import 'aos/dist/aos.css';

function Bestseller() {

 useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);


  return (


    <section className="best-seller">
      <h2>Best Sellers</h2>
      <div className="card-container" data-aos="fade-up">
        <div className="card">
          <img src="https://images.deepai.org/art-image/56932ab73dd549778bb0307f8c5f0b20/perfume-name-royal-oud.jpg" alt="Product 1"/>
          <div className="card-details">
            <h3 className="product-name">Royal Oud</h3>
            <p className="price">4000 tk</p>
          </div>
        </div>
        <div className="card">
          <img src="https://images.unsplash.com/photo-1623742310401-d8057c3c43c8?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Product 2"/>
          <div className="card-details">
            <h3 className="product-name">Midnight velvet</h3>
            <p className="price">4300 tk</p>
          </div>
        </div>
        <div className="card">
          <img src="https://images.deepai.org/art-image/95378cad87c84b468bbb724649bb98eb/perfume-name-amber-assence.jpg" alt="Product 3"/>
          <div className="card-details">
            <h3 className="product-name">Amber essence</h3>
            <p className="price">4000 tk</p>
          </div>
        </div>
      </div>
    </section>



  )
}

export default Bestseller