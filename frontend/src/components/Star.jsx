import React from 'react'
import { FaStar, FaStarHalfAlt } from "react-icons/fa";
import { AiOutlineStar } from "react-icons/ai";
import './star.css'


function Star({stars, reviews}) {

const ratingStar = Array.from({length:5}, (elem, index) => {

    let number = index +0.5;

    return (
        <span key = {index}>

            {stars >= index +1 ?
            (<FaStar className="star-icon"/>)
            :stars>=number ? (<FaStarHalfAlt className="star-icon"/>):(
                <AiOutlineStar className="empty-icon"/>
            )}

        </span>
    )
})

  return (
    <>
    
            <div className="star-style">
                {ratingStar}
                {/* <p>({reviews} customer reviews )</p> */}
            </div>


    </>
  )
}

export default Star