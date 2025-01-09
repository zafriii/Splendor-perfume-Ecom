// import { useState, useEffect } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'
// import Products from './components/Products'
// import {BrowserRouter, Routes, Route} from 'react-router-dom'
// import Home from './Pages/Home'
// import About from './Pages/About'
// import Contact from './Pages/Contact'
// import Cart from './Pages/Cart'
// import SingleProduct from './components/SingleProduct'
// import { MdOutlineWbSunny } from "react-icons/md";
// import { IoMoonOutline } from "react-icons/io5";
// import Navbar from './components/Navbar'

// function App() {
  

// const [darkMode, setDarkMode] = useState(() => {
//     // Check if a theme is saved in localStorage
//     const savedTheme = localStorage.getItem('theme');
//     return savedTheme ? JSON.parse(savedTheme) : false;
// });

// useEffect(() => {
//     // Save the theme to localStorage
//     localStorage.setItem('theme', JSON.stringify(darkMode));
// }, [darkMode]);

// const toggleDarkMode = () => {
//     setDarkMode(prevMode => !prevMode);
// };


//   return (
//     <>
      

  
//       <div className={darkMode ? 'dark-mode' : 'light-mode'}>


//       <BrowserRouter>

//       <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />


//             <Routes>                

//                 <Route path='/' element={<Home/>}/>
//                 <Route path='/about' element={<About/>}/>
//                 <Route path='/contact' element={<Contact/>}/>
//                 <Route path='/cart' element={<Cart/>}/>
//                 <Route path='/products' element={<Products/>}/>
//                 <Route path='/singleproduct/:id' element={<SingleProduct/>}/> 
                
//             </Routes>
         

//       </BrowserRouter>

//       </div>
      
      
//     </>
//   )
// }

// export default App



import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Products from './components/Products';
import Home from './Pages/Home';
import About from './Pages/About';
import Contact from './Pages/Contact';
import Cart from './Pages/Cart';
import SingleProduct from './components/SingleProduct';
import Navbar from './components/Navbar';
import { MdOutlineWbSunny } from "react-icons/md";
import { IoMoonOutline } from "react-icons/io5";
import Footer from './components/Footer';
import Bills from './components/Bills';
import Order from './components/Order';
import LoginForm from './components/LoginForm';
import RegForm from './components/RegForm';
import ForgotPassword from './components/ForgotPassword';
import ResetPassword from './components/ResetPassword';
import Wishlist from './components/Wishlist';
import CheckoutDetails from './components/CheckoutDetails';
import Feedback from './components/Feedback';
import Profile from './components/Profile';
import Updateprofile from './components/Updateprofile';
import BillingDetailsPage from './components/BillingDetailsPage';
import Reviewpage from './components/Reviewpage';
import PerfumeFinder from './components/PerfumeFinder';
import Member from './components/Member';
import Orderdetails from './components/Orderdetails';
import Ordercancel from './components/Ordercancel';


function App() {
  const [darkMode, setDarkMode] = useState(() => {
    // Check if a theme is saved in localStorage
    const savedTheme = localStorage.getItem('theme');
    return savedTheme ? JSON.parse(savedTheme) : false;
  });

  useEffect(() => {
    // Save the theme to localStorage
    localStorage.setItem('theme', JSON.stringify(darkMode));
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(prevMode => !prevMode);
  };

  return (
    <>
      <div className={darkMode ? 'dark-mode' : 'light-mode'}>
        <BrowserRouter>
          <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/about' element={<About />} />
            <Route path='/contact' element={<Contact />} />
            <Route path='/cart' element={<Cart />} />
            <Route path='/products' element={<Products />} />
            <Route path='/singleproduct/:id' element={<SingleProduct />} />
            <Route path='/bills' element={<Bills/>} />
            <Route path='/order' element={<Order/>} />
            <Route path='/login' element={<LoginForm/>} />
            <Route path='/signup' element={<RegForm/>} />
            <Route path='/forgot-password' element={<ForgotPassword/>} />
            <Route path="/reset-password/:resetToken" element={<ResetPassword/>}/>
            <Route path="/wishlist" element={<Wishlist/>}/>
            <Route path="/checkout" element={<CheckoutDetails/>}/>

            <Route path="/customer_service" element={<Feedback/>}/>
            <Route path="/profile" element={<Profile/>}/>
            <Route path="/update_profile" element={<Updateprofile/>}/>
            <Route path="/billing_details" element={<BillingDetailsPage/>}/>
            <Route path="reviews/:id" element={<Reviewpage/>}/>

            <Route path="/find_perfume" element={<PerfumeFinder/>}/>
            <Route path="/membership" element={<Member/>}/>

            <Route path="/order_details" element={<Orderdetails/>}/>

            <Route path="/order-cancel" element={<Ordercancel/>}/>



          </Routes>
          <Footer/>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
