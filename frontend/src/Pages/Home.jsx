import React from 'react'
// import Slider from '../components/Slider'
// import Feature from '../components/Feature'
import Box from '../components/Box'
import Discount from '../components/Newsletter'
import Info from '../components/Info'
import Collection from '../components/Collection'
import BannerSection from '../components/BannerSection'
import Eggshape from '../components/Eggshape'
import Feature from '../components/Feature'
import Newsletter from '../components/Newsletter'
import Bestseller from '../components/Bestseller'




function Home() {
  return (
    <div>

      <Info/>   
      <Collection/>
      <BannerSection/>
      <Bestseller/>
      <Box/>
      <Eggshape/>
      <Feature/>
      <Newsletter/>
   
    
      
    </div>
  )
}

export default Home