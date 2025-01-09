import React, {useEffect} from 'react'
import './box.css'
import AOS from 'aos';
import 'aos/dist/aos.css';
import { NavLink } from 'react-router-dom';


function Box() {

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (

    <>


    <div className="box-main" data-aos="fade-up">

    <div className="box-texts">

    <h1>Choose your favourite perfume</h1>

    <p>Ensure your spending is worthy. Elevate your senses and redefine luxury with fragrances crafted to inspire confidence, joy, and individuality. At the heart of our mission is the desire to inspire confidence, spark joy, and elevate every moment with timeless, enchanting aromas designed for all.</p>

    
    <button className='order1'>
      <NavLink to='/products'>View Details</NavLink>
    </button>

    </div>



    <div className='box'>
       
        <div className="box1">
    
        </div>
     
        <div className="box2">
           
        </div>

    </div>

    </div>
        

    </>
  )
}

export default Box