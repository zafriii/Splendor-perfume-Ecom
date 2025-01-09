import React, {useEffect} from 'react'
import "./feature.css";
import { FaShoppingBag, FaTruck, FaHeadset, FaUndoAlt } from "react-icons/fa";
import AOS from 'aos';
import 'aos/dist/aos.css';

const Feature = () => {


useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);


  const features = [
    { icon: <FaShoppingBag />, title: "Easy For Shopping" },
    { icon: <FaTruck />, title: "Fast & Free Shipping" },
    { icon: <FaHeadset />, title: "24/7 Support" },
    { icon: <FaUndoAlt />, title: "Money Back Guarantee" },
  ];

  return (
    <section className="features-section">
      <h2>Why SPLENDOR?</h2>
      <div className="features-container" >
        {features.map((feature, index) => (
          <div className="feature-card" key={index} data-aos="fade-up">
            <div className="feature-icon">{feature.icon}</div>
            <p>{feature.title}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Feature;
