import React, { useState } from "react";
import Data from "../Data";
import './perfumefind.css'
import { useAuth } from "../store/Auth";
import { FaArrowRight } from "react-icons/fa";

const PerfumeFinder = () => {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [result, setResult] = useState(null);

  const { user, isLoggedin } = useAuth();

  const questions = [
    {
      id: "outfit",
      question: "Who is this perfume for?",
      options: ["Men", "Women"],
    },
    {
      id: "price",
      question: "What is your price range?",
      options: ["Budget (Under 2000)", "Mid-Range (2000 - 3500)", "Luxury (Above 3500)"],
    },
    {
      id: "fragrance",
      question: "What type of fragrance do you prefer?",
      options: ["Oud", "Floral", "Amber", "Fresh", "Spicy"],
    },
    {
      id: "occasion",
      question: "What occasion are you buying this perfume for?",
      options: ["Office/University", "Party/Date", "Special Occasion"],
    },
  ];

  const handleAnswer = (questionId, answer) => {
    setAnswers({ ...answers, [questionId]: answer });
    if (step < questions.length - 1) {
      setStep(step + 1);
    } else {
      findPerfume();
    }
  };

  const findPerfume = () => {
    const { outfit, price, fragrance, occasion } = answers;

    // Determine the type of perfume based on the selected occasion
    let requiredType = "";
    if (occasion === "Party/Date") {
      requiredType = "Strong";
    } else if (occasion === "Special Occasion") {
      requiredType = "Moderate";
    } else if (occasion === "Office/University") {
      requiredType = "Mild";
    }

    // Filter perfumes based on the selected answers
    const filteredPerfumes = Data.filter((perfume) => {
      const matchesOutfit = outfit ? perfume.outfit === outfit : true;
      const matchesPrice =
        price === "Budget (Under 2000)"
          ? perfume.price <= 2000
          : price === "Mid-Range (2000 - 3500)"
          ? perfume.price >= 2000 && perfume.price <= 3500
          : perfume.price > 3500;
      const matchesFragrance =
        fragrance
          ? perfume.name.toLowerCase().includes(fragrance.toLowerCase()) ||
            perfume.description.toLowerCase().includes(fragrance.toLowerCase())
          : true;
      const matchesOccasion = occasion ? perfume.type === occasion : true;
      const matchesType = requiredType ? perfume.type === requiredType : true;

      return matchesOutfit && matchesPrice && matchesFragrance && matchesOccasion && matchesType;
    });

    // Select a random perfume if multiple match
    const selectedPerfume = filteredPerfumes[Math.floor(Math.random() * filteredPerfumes.length)];
     setResult(selectedPerfume || "Sorry No matching perfume found ! You can visit our collection.");




  };

  return (
    


        <div className="perfume-find">

          <h2>Perfume Recommendation</h2>

        <div className="prefer">

        {isLoggedin ? (
        <>
            <h2>Hey, <span>{user.username} !</span></h2>
            <p>Let us know your prefrence so that we can recommend you a perfume from our <a href="/products">collection <FaArrowRight /></a></p>
        </>
          ) : (
            <>
            <h2>Hey!</h2>
            <p>Let us know your prefrence so that we can suggest you a perfume from our <a href="/products">collection <FaArrowRight /></a></p>
            </>
        )}

        </div>

        <div className="perfume-finder-container">
          <h2>Perfume Recommender</h2>
        {!result ? (
            <div className="question-container">
            <h3>{questions[step].question}</h3>
            {questions[step].options.map((option) => (
                <button
                key={option}
                onClick={() => handleAnswer(questions[step].id, option)}
                className="option-button"
                >
                {option}
                </button>
            ))}
            </div>
        ) : typeof result === "string" ? (
            <h3 className="no-match">{result}</h3>
        ) : (

            <div className="result-container">
            <h2>We recommend :</h2>
            
            <div className="rec-product">
            <h3>{result.name}</h3>
            <p>Brand: {result.brand}</p>
            <p>Price: ${result.price}</p>
            <img
                src={result.image}
                alt={result.name}
                className="result-image"
            />
            </div>

            <div className="view-product-link">

            <a href={`/singleproduct/${result.id}`}>
            View this product
            </a>
            
            </div>
          
            </div>
        )}
        </div>

        </div>



  );
};

export default PerfumeFinder;
