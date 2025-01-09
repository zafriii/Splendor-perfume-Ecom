import React, {useEffect} from 'react'
import './collection.css';
import AOS from 'aos';
import 'aos/dist/aos.css';

const collections = [
  {
    title: "Vera Wang",
    text: "Starting at 3000 tk",
    buttonText: "Our Collection",
    image: "https://images.unsplash.com/photo-1593487568720-92097fb460fb?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    title: "Coco Channel",
    text: "Starting at 3000 tk",
    buttonText: "Our Collection",
    image: "https://images.unsplash.com/photo-1589782431327-ac8a63d965a2?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    title: "n5 Channel",
    text: "Starting at 3000 tk",
    buttonText: "Our Collection",
    image: "https://images.unsplash.com/photo-1594913365731-1d2af6286c12?q=80&w=1414&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
];

const Collection = () => {


  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);



  return (
    <section className="section collection" id="collection" aria-label="collection" data-section>
       <h2 className='collection-heading'>Our Collection</h2>
      <div className="collection-container">
        <ul className="collection-list">
          {collections.map((collection, index) => (
            <li key={index}>
              <div className="collection-card" data-aos="fade-up">
                <div className="card-image">
                  <img src={collection.image} alt={collection.title} />
                </div>
                <div className="card-content">
                  <h2 className="card-title">{collection.title}</h2>
                  <p className="card-text">{collection.text}</p>
                  <a href="/about" className="btn-link">
                    <span>{collection.buttonText}</span>

                  </a>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default Collection;