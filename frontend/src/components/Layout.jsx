import React from 'react'
import './layout.css'

function Layout() {
  return (
    <div className="container">
    <div className="box small">
      <p className="subtext">Regularly reviewing and analyzing expenses helps</p>
      <h2>75% of households</h2>
    </div>
    <div className="box medium">
      <h2>$3000+ Saved</h2>
      <p className="subtext">of income on dining out, utilities savings in 1yr.</p>
    </div>
    <div className="box small">
      <h2>24 hours</h2>
      <p className="subtext">
        Lorem ipsum dolor sit amet consectetur. Element elit amet volutpat tristique netus pellentesque ultrices arcu.
      </p>
    </div>
    <div className="box image-box">
      <img src="https://via.placeholder.com/150" alt="Household example" />
    </div>
    <div className="box image-box">
      <img src="https://via.placeholder.com/150" alt="Working on a laptop" />
    </div>
  </div>
  )
}

export default Layout