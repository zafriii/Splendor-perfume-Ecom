import React, {useEffect} from 'react'
import './eggshape.css'
import AOS from 'aos';
import 'aos/dist/aos.css';


function Eggshape() {


 useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);



  return (


<div className="eggshape-container" >


    <div className="eggshape-text" data-aos="fade-up">
          <h2>Fragrance is a word</h2>
          <h2>Perfume is a literature</h2>   

          <p>Exciting offer! Get a flat 25% discount on your favorite products. Shop now and save big! Don’t miss out—grab your favorites today! Save 25% on every purchase and enjoy luxury at its best. The clock is ticking— <button>Shop now</button> </p>
    </div>



    <div className="card1" data-aos="fade-up">
      <img
        src="https://images.unsplash.com/photo-1512777576244-b846ac3d816f?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" // Replace with actual image URL
        alt="Perfume Bottle 1"
        className="image"
      />
    </div>
    <div className="discount-badge" data-aos="fade-up">
        <span>25%</span>
        <p className='rotated'>Discount</p>
      </div>
    <div className="card highlight" data-aos="fade-up">
      
      <img
        src="https://images.unsplash.com/photo-1566977776052-6e61e35bf9be?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" // Replace with actual image URL
        alt="Perfume Bottle 2"
        className="image"
      />
    </div>
  </div>







  )
}

export default Eggshape