import React from 'react'
import './newsletter.css'

function Newsletter() {
  return (


      <>
  
      {/* <div className="news">
      <div className="news-text">
      <h2>Subscribe to our News Letter</h2> 
      <input type='text' placeholder='Enter your email'/>
      <button>Subscribe</button>
      </div>
      </div> */}


    <div className="news">
        <div className="news-text">
          <h2>Subscribe to our News Letter</h2>
          <div className="email-subscription">
            <input type="text" placeholder="Enter your email..." />
            <button>Subscribe</button>
          </div>
        </div>
      </div>



      </>


  )
}

export default Newsletter