// import React, { useState, useEffect } from 'react';
// import { NavLink, useParams } from 'react-router-dom';
// import SideBar from './SideBar';
// import Data from '../Data';
// import './products.css';
// import AOS from 'aos';
// import 'aos/dist/aos.css';
// import { BiSearch } from 'react-icons/bi';
// import axios from 'axios';

// function Products() {
//     const [currentPage, setCurrentPage] = useState(1);
//     const [searchTerm, setSearchTerm] = useState('');
//     const [suggestions, setSuggestions] = useState([]); // State for suggestions
//     const [selectedOutfit, setSelectedOutfit] = useState('');
//     const [selectedBrand, setSelectedBrand] = useState('');
//     const [sortByPrice, setSortByPrice] = useState('');
//     const [cart, setCart] = useState(JSON.parse(localStorage.getItem('cart')) || []);
//     const productsPerPage = 12;
//     const { id } = useParams();

//     useEffect(() => {
//         localStorage.setItem('cart', JSON.stringify(cart));
//     }, [cart]);

//     // const addToCart = (selectedProduct) => {
//     //     const existingProductIndex = cart.findIndex(item => item.id === selectedProduct.id);
//     //     if (existingProductIndex !== -1) {
//     //         const updatedCart = [...cart];
//     //         updatedCart[existingProductIndex].quantity += 1; // Increment the quantity
//     //         setCart(updatedCart);
//     //     } else {
//     //         setCart([...cart, { ...selectedProduct, quantity: 1 }]); // Add with initial quantity 1
//     //     }
//     // };


//     const addToCart = async (selectedProduct) => {
//         try {
//             const response = await axios.post(
//                 'http://localhost:5000/api/cart/add', // Replace with your actual backend URL
//                 {
//                     productId: selectedProduct.id,
//                     name: selectedProduct.name,
//                     price: selectedProduct.price,
//                     image: selectedProduct.image,
//                     quantity: 1, // Default quantity
//                     stock: selectedProduct.stock, // Ensure stock is included
//                 },
//                 {
//                     headers: {
//                         Authorization: `Bearer ${localStorage.getItem('token')}`, // Replace with your actual auth token retrieval logic
//                     },
//                 }
//             );
    
//             if (response.status === 201) {
//                 alert('Product added to cart successfully!');
//                 console.log('Cart response:', response.data);
//             } else {
//                 alert(response.data.message || 'Failed to add product to cart.');
//             }
//         } catch (error) {
//             console.error('Error adding to cart:', error.response?.data || error.message);
//             alert(error.response?.data?.message || 'Something went wrong!');
//         }
//     };


//     const handleSearch = (e) => {
//         const value = e.target.value;
//         setSearchTerm(value);
//         setCurrentPage(1);

//         // Update suggestions based on the search term
//         if (value.trim() !== '') {
//             const filteredSuggestions = Data.filter(product =>
//                 product.name.toLowerCase().includes(value.toLowerCase())
//             ).slice(0, 5); // Limit to 5 suggestions
//             setSuggestions(filteredSuggestions);
//         } else {
//             setSuggestions([]);
//         }
//     };

//     const handleSuggestionClick = (suggestion) => {
//         setSearchTerm(suggestion.name); // Set the search input to the clicked suggestion
//         setSuggestions([]); // Clear suggestions
//     };

//     const handleOutfitFilter = (outfit) => {
//         setSelectedOutfit(outfit);
//         setCurrentPage(1);
//     };

//     const handleBrandFilter = (e) => {
//         setSelectedBrand(e.target.value);
//         setCurrentPage(1);
//     };

//     const handleSortByPrice = (e) => {
//         setSortByPrice(e.target.value);
//         setCurrentPage(1);
//     };

//     const clearFilters = () => {
//         setSearchTerm('');
//         setSelectedOutfit('');
//         setSelectedBrand('');
//         setSortByPrice('');
//         setCurrentPage(1);
//     };

//     const filteredProducts = Data
//         .filter(product =>
//             product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//             product.outfit.toLowerCase().includes(searchTerm.toLowerCase())
//         )
//         .filter(product => selectedOutfit === '' || product.outfit === selectedOutfit)
//         .filter(product => selectedBrand === '' || product.brand === selectedBrand)
//         .sort((a, b) => sortByPrice === 'lowToHigh' ? a.price - b.price : b.price - a.price);

//     const indexOfLastProduct = currentPage * productsPerPage;
//     const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
//     const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

//     const paginate = (pageNumber) => setCurrentPage(pageNumber);

//     const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

//     const brands = [...new Set(Data.map(product => product.brand))];

//     const filters = { brands };

//     useEffect(() => {
//         AOS.init({ duration: 1000 });
//     }, []);

//     return (

//         <SideBar
//             filters={filters}
//             handleSearch={handleSearch}
//             handleOutfitFilter={handleOutfitFilter}
//             handleBrandFilter={handleBrandFilter}
//             handleSortByPrice={handleSortByPrice}
//             paginate={paginate}
//             clearFilters={clearFilters}
//             currentPage={currentPage}
//             totalPages={totalPages}
//             searchTerm={searchTerm}
//             selectedOutfit={selectedOutfit}
//             selectedBrand={selectedBrand}
//             sortByPrice={sortByPrice}
//         >
//             <div className="products">
//                 <h2>Product List</h2>
//                 <div className="search-suggestions">
//                     <div className="search-container">
//                     <BiSearch className="search-icon" /> 
//                     <input
//                         className='search'
//                         type="text"      
//                         placeholder=" Search..."
//                         value={searchTerm}
//                         onChange={handleSearch}
//                     />
//                     </div>
//                     {suggestions.length > 0 && (
//                         <ul className="suggestions-list">
//                             {suggestions.map((suggestion) => (
//                                 <li
//                                     key={suggestion.id}
//                                     onClick={() => handleSuggestionClick(suggestion)}
//                                 >
//                                     {suggestion.name}
//                                 </li>
//                             ))}
//                         </ul>
//                     )}
//                 </div>
               
//                 <div className="product-list">
//                     {currentProducts.length > 0 ? (
//                         currentProducts.map((product) => (
//                             <div key={product.id} className="product-card">
//                                 <NavLink
//                                     to={`/singleproduct/${product.id}`}
//                                     state={{ product }}
//                                 >
//                                     <img src={product.image} alt={product.name} />
//                                     <h2>{product.name}</h2>
//                                     <p className="price">Price: {product.price}</p>
//                                 </NavLink>
//                                 <button
//                                     onClick={(e) => {
//                                         e.stopPropagation(); 
//                                         addToCart(product); 
//                                     }}
//                                 >
//                                     Buy Now
//                                 </button>
//                             </div>
//                         ))
//                     ) : (
//                         <div className="no-products">
//                             <p>No products found</p>
//                         </div>
//                     )}
//                 </div>

//             </div>

//         </SideBar>

//     );
// }

// export default Products;




import React, { useState, useEffect } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import SideBar from './SideBar';
import Data from '../Data';
import './products.css';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { BiSearch } from 'react-icons/bi';
import axios from 'axios';
import Showmsg from './Showmsg';

function Products() {
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');
    const [suggestions, setSuggestions] = useState([]); // State for suggestions
    const [selectedOutfit, setSelectedOutfit] = useState('');
    const [selectedBrand, setSelectedBrand] = useState('');
    const [sortByPrice, setSortByPrice] = useState('');
    const [cart, setCart] = useState(JSON.parse(localStorage.getItem('cart')) || []);
    const productsPerPage = 12;
    const { id } = useParams();
    const [message, setMessage] = useState(''); 
    const [msgType, setMsgType] = useState('');

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart));
    }, [cart]);

   

    // const addToCart = async (selectedProduct) => {
    //     try {
    //         const response = await axios.post(
    //             'http://localhost:5000/api/cart/add', // Replace with your actual backend URL
    //             {
    //                 productId: selectedProduct.id,
    //                 name: selectedProduct.name,
    //                 price: selectedProduct.price,
    //                 image: selectedProduct.image,
    //                 quantity: 1, // Default quantity
    //                 stock: selectedProduct.stock, // Ensure stock is included
    //             },
    //             {
    //                 headers: {
    //                     Authorization: `Bearer ${localStorage.getItem('token')}`, // Replace with your actual auth token retrieval logic
    //                 },
    //             }
    //         );
    
    //         if (response.status === 201) {
    //             alert('Product added to cart successfully!');
    //             console.log('Cart response:', response.data);
    //         } else {
    //             alert(response.data.message || 'Failed to add product to cart.');
    //         }
    //     } catch (error) {
    //         console.error('Error adding to cart:', error.response?.data || error.message);
    //         alert(error.response?.data?.message || 'Something went wrong!');
    //     }
    // };



    const addToCart = async (selectedProduct) => {
        try {
            const response = await axios.post(
                'http://localhost:5000/api/cart/add',
                {
                    productId: selectedProduct.id,
                    name: selectedProduct.name,
                    price: selectedProduct.price,
                    image: selectedProduct.image,
                    quantity: 1,
                    stock: selectedProduct.stock,
                },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                }
            );

            if (response.status === 201) {
                setMessage('Product added to cart successfully!');
                setMsgType('success');
            } else {
                setMessage(response.data.message || 'Failed to add product to cart.');
                setMsgType('error');
            }
        } catch (error) {
            setMessage(error.response?.data?.message || 'Something went wrong!');
            setMsgType('error');
        }
    };


    const handleSearch = (e) => {
        const value = e.target.value;
        setSearchTerm(value);
        setCurrentPage(1);

        // Update suggestions based on the search term
        if (value.trim() !== '') {
            const filteredSuggestions = Data.filter(product =>
                product.name.toLowerCase().includes(value.toLowerCase())
            ).slice(0, 5); // Limit to 5 suggestions
            setSuggestions(filteredSuggestions);
        } else {
            setSuggestions([]);
        }
    };

    const handleSuggestionClick = (suggestion) => {
        setSearchTerm(suggestion.name); // Set the search input to the clicked suggestion
        setSuggestions([]); // Clear suggestions
    };

    const handleOutfitFilter = (outfit) => {
        setSelectedOutfit(outfit);
        setCurrentPage(1);
    };

    const handleBrandFilter = (e) => {
        setSelectedBrand(e.target.value);
        setCurrentPage(1);
    };

    const handleSortByPrice = (e) => {
        setSortByPrice(e.target.value);
        setCurrentPage(1);
    };

    const clearFilters = () => {
        setSearchTerm('');
        setSelectedOutfit('');
        setSelectedBrand('');
        setSortByPrice('');
        setCurrentPage(1);
    };

    const filteredProducts = Data
        .filter(product =>
            product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            product.outfit.toLowerCase().includes(searchTerm.toLowerCase())
        )
        .filter(product => selectedOutfit === '' || product.outfit === selectedOutfit)
        .filter(product => selectedBrand === '' || product.brand === selectedBrand)
        .sort((a, b) => sortByPrice === 'lowToHigh' ? a.price - b.price : b.price - a.price);

    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

    const brands = [...new Set(Data.map(product => product.brand))];

    const filters = { brands };

    useEffect(() => {
        AOS.init({ duration: 1000 });
    }, []);

    return (

        <SideBar
            filters={filters}
            handleSearch={handleSearch}
            handleOutfitFilter={handleOutfitFilter}
            handleBrandFilter={handleBrandFilter}
            handleSortByPrice={handleSortByPrice}
            paginate={paginate}
            clearFilters={clearFilters}
            currentPage={currentPage}
            totalPages={totalPages}
            searchTerm={searchTerm}
            selectedOutfit={selectedOutfit}
            selectedBrand={selectedBrand}
            sortByPrice={sortByPrice}
        >
            <div className="products">
                <h2>Product List</h2>
                <div className="search-suggestions">
                    <div className="search-container">
                    <BiSearch className="search-icon" /> 
                    <input
                        className='search'
                        type="text"      
                        placeholder=" Search..."
                        value={searchTerm}
                        onChange={handleSearch}
                    />
                    </div>
                    {suggestions.length > 0 && (
                        <ul className="suggestions-list">
                            {suggestions.map((suggestion) => (
                                <li
                                    key={suggestion.id}
                                    onClick={() => handleSuggestionClick(suggestion)}
                                >
                                    {suggestion.name}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>

                <Showmsg message={message} type={msgType} onClose={() => setMessage('')} />
               
                <div className="product-list">
                    {currentProducts.length > 0 ? (
                        currentProducts.map((product) => (
                            <div key={product.id} className="product-card">
                                <NavLink
                                    to={`/singleproduct/${product.id}`}
                                    state={{ product }}
                                >
                                    <img src={product.image} alt={product.name} />
                                    <h2>{product.name}</h2>
                                    <p className="price">Price: {product.price}</p>
                                </NavLink>
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation(); 
                                        addToCart(product); 
                                    }}
                                >
                                    Buy Now
                                </button>
                            </div>
                        ))
                    ) : (
                        <div className="no-products">
                            <p>No products found</p>
                        </div>
                    )}
                </div>

            </div>

        </SideBar>

    );
}

export default Products;




