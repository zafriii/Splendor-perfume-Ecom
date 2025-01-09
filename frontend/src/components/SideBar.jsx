// import React, { useState, useEffect } from 'react';
// import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
// import { FaBarsStaggered } from "react-icons/fa6";
// import { BiSearch } from 'react-icons/bi';
// import { AnimatePresence, motion } from 'framer-motion';
// import { MdNavigateNext } from "react-icons/md";
// import { GrFormPrevious } from "react-icons/gr";
// import './sidebar.css'

// const SideBar = ({ children, filters, handleSearch, handleOutfitFilter, handleBrandFilter, handleSortByPrice, paginate, clearFilters, currentPage, totalPages, searchTerm, selectedOutfit, selectedBrand, sortByPrice }) => {
//     const [isOpen, setIsOpen] = useState(false);
//     const toggle = () => setIsOpen(!isOpen);

//     const inputAnimation = {
//         hidden: {
//             width: 0,
//             padding: 0,
//             transition: {
//                 duration: 0.8,
//             },
//         },
//         show: {
//             width: "140px",
//             padding: "5px 15px",
//             transition: {
//                 duration: 0.8,
//             },
//         },
//     };

//     const showAnimation = {
//         hidden: {
//             width: 0,
//             opacity: 0,
//             transition: {
//                 duration: 0.8,
//             },
//         },
//         show: {
//             opacity: 1,
//             width: "auto",
//             transition: {
//                 duration: 0.8,
//             },
//         },
//     };

//     return (
//         <div className="main-container">
//             <motion.div
//                 animate={{
//                     width: isOpen ? "250px" : "45px",
//                     transition: {
//                         duration: 0.5,
//                         type: "spring",
//                         damping: 10,
//                     },
//                 }}
//                 className={`sidebar `}
//             >
//                 <div className="top_section">
//                     <AnimatePresence>
//                         {isOpen && (
//                             <motion.h1
//                                 variants={showAnimation}
//                                 initial="hidden"
//                                 animate="show"
//                                 exit="hidden"
//                                 className="logo"
//                             >
//                                <p>Filters</p> 
//                             </motion.h1>
//                         )}
//                     </AnimatePresence>
//                     <div className="bars">
//                         <FaBarsStaggered onClick={toggle} />
//                     </div>
//                 </div>

                

//                 <div className="search">
//                     <div className="search_icon">
//                         <BiSearch />
//                     </div>
//                     <AnimatePresence>
//                         {isOpen && (
//                             <motion.input
//                                 initial="hidden"
//                                 animate="show"
//                                 exit="hidden"
//                                 variants={inputAnimation}
//                                 type="text"
//                                 placeholder="Search"
//                                 value={searchTerm}
//                                 onChange={handleSearch}
//                             />
//                         )}
//                     </AnimatePresence>
//                 </div>
//                 <AnimatePresence>
//                     {isOpen && (
//                         <motion.div
//                             variants={showAnimation}
//                             initial="hidden"
//                             animate="show"
//                             exit="hidden"
//                         >

//                         <div className="pagination">
                                
//                             <GrFormPrevious className='sideprev'/>
                                
//                                 {Array.from({ length: totalPages }, (_, index) => (
//                                     <button
//                                         key={index + 1}
//                                         onClick={() => paginate(index + 1)}
//                                         className={currentPage === index + 1 ? 'active' : ''}
//                                     >
//                                         {index + 1}
//                                     </button>
//                                 ))}
                                
//                                 <MdNavigateNext className='sidenext'/>
                                
//                             </div>

//                             <div className="filter">
//                                 <button className={selectedOutfit === '' ? 'active' : ''} onClick={() => handleOutfitFilter('')}>All</button>
//                                 <button className={selectedOutfit === 'Saree' ? 'active' : ''} onClick={() => handleOutfitFilter('Saree')}>Saree</button>
//                                 <button className={selectedOutfit === 'Jeans' ? 'active' : ''} onClick={() => handleOutfitFilter('Jeans')}>Jeans</button>
//                                 <button className={selectedOutfit === 'Salwar Kamij' ? 'active' : ''} onClick={() => handleOutfitFilter('Salwar Kamij')}>Salwar Kamij</button>
//                                 <button className={selectedOutfit === 'Frock' ? 'active' : ''} onClick={() => handleOutfitFilter('Frock')}>Frock</button>
//                                 <button className={selectedOutfit === 'Top' ? 'active' : ''} onClick={() => handleOutfitFilter('Top')}>Top</button>
//                                 <button className={selectedOutfit === 'Lehenga' ? 'active' : ''} onClick={() => handleOutfitFilter('Lehenga')}>Lehenga</button>
//                             </div>
//                             <div className="brand-filter">
//                                 <select value={selectedBrand} onChange={handleBrandFilter}>
//                                     <option value="">All Brands</option>
//                                     {filters.brands.map(brand => (
//                                         <option key={brand} value={brand}>{brand}</option>
//                                     ))}
//                                 </select>
//                             </div>
//                             <div className="sort-by-price">
//                                 <label>
//                                     <input
//                                         type="radio"
//                                         value="highToLow"
//                                         checked={sortByPrice === 'highToLow'}
//                                         onChange={handleSortByPrice}
//                                     />
//                                     High to Low
//                                 </label>
//                                 <label>
//                                     <input
//                                         type="radio"
//                                         value="lowToHigh"
//                                         checked={sortByPrice === 'lowToHigh'}
//                                         onChange={handleSortByPrice}
//                                     />
//                                     Low to High
//                                 </label>
//                             </div>
                            
//                             <div className="clear-filter">
//                             <button  onClick={clearFilters}>Clear Filters</button>
//                             </div>
                            
//                         </motion.div>
//                     )}
//                 </AnimatePresence>
//             </motion.div>
//             <main>{children}</main>
//         </div>
//     );
// };

// export default SideBar;








// import React, { useState, useEffect } from 'react';
// import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
// import { FaBarsStaggered } from "react-icons/fa6";
// import { BiSearch } from 'react-icons/bi';
// import { AnimatePresence, motion } from 'framer-motion';
// import { MdNavigateNext } from "react-icons/md";
// import { GrFormPrevious } from "react-icons/gr";
// import './sidebar.css'

// const SideBar = ({ children, filters, handleSearch, handleCategoryFilter, handleBrandFilter, handleSortByPrice, paginate, clearFilters, currentPage, totalPages, searchTerm, selectedCategory, selectedBrand, sortByPrice }) => {
//     const [isOpen, setIsOpen] = useState(false);
//     const toggle = () => setIsOpen(!isOpen);

//     const inputAnimation = {
//         hidden: {
//             width: 0,
//             padding: 0,
//             transition: {
//                 duration: 0.8,
//             },
//         },
//         show: {
//             width: "140px",
//             padding: "5px 15px",
//             transition: {
//                 duration: 0.8,
//             },
//         },
//     };

//     const showAnimation = {
//         hidden: {
//             width: 0,
//             opacity: 0,
//             transition: {
//                 duration: 0.8,
//             },
//         },
//         show: {
//             opacity: 1,
//             width: "auto",
//             transition: {
//                 duration: 0.8,
//             },
//         },
//     };

//     return (
//         <div className="main-container">
//             <motion.div
//                 animate={{
//                     width: isOpen ? "250px" : "45px",
//                     transition: {
//                         duration: 0.5,
//                         type: "spring",
//                         damping: 10,
//                     },
//                 }}
//                 className={`sidebar `}
//             >
//                 <div className="top_section">
//                     <AnimatePresence>
//                         {isOpen && (
//                             <motion.h1
//                                 variants={showAnimation}
//                                 initial="hidden"
//                                 animate="show"
//                                 exit="hidden"
//                                 className="logo"
//                             >
//                                <p>Filters</p> 
//                             </motion.h1>
//                         )}
//                     </AnimatePresence>
//                     <div className="bars">
//                         <FaBarsStaggered onClick={toggle} />
//                     </div>
//                 </div>

//                 <div className="search">
//                     <div className="search_icon">
//                         <BiSearch />
//                     </div>
//                     <AnimatePresence>
//                         {isOpen && (
//                             <motion.input
//                                 initial="hidden"
//                                 animate="show"
//                                 exit="hidden"
//                                 variants={inputAnimation}
//                                 type="text"
//                                 placeholder="Search"
//                                 value={searchTerm}
//                                 onChange={handleSearch}
//                             />
//                         )}
//                     </AnimatePresence>
//                 </div>
//                 <AnimatePresence>
//                     {isOpen && (
//                         <motion.div
//                             variants={showAnimation}
//                             initial="hidden"
//                             animate="show"
//                             exit="hidden"
//                         >

//                             <div className="pagination">
//                                 <GrFormPrevious className='sideprev'/>
                                
//                                 {Array.from({ length: totalPages }, (_, index) => (
//                                     <button
//                                         key={index + 1}
//                                         onClick={() => paginate(index + 1)}
//                                         className={currentPage === index + 1 ? 'active' : ''}
//                                     >
//                                         {index + 1}
//                                     </button>
//                                 ))}
                                
//                                 <MdNavigateNext className='sidenext'/>
//                             </div>

//                             <div className="filter">
//                                 {/* Category Filter */}
//                                 <button className={selectedCategory === '' ? 'active' : ''} onClick={() => handleCategoryFilter('')}>All Categories</button>
//                                 <button className={selectedCategory === 'Women' ? 'active' : ''} onClick={() => handleCategoryFilter('Women')}>Women</button>
//                                 <button className={selectedCategory === 'Men' ? 'active' : ''} onClick={() => handleCategoryFilter('Men')}>Men</button>
                                
//                             </div>

//                             <div className="brand-filter">
//                                 <select value={selectedBrand} onChange={handleBrandFilter}>
//                                     <option value="">All Brands</option>
//                                     {filters.brands.map(brand => (
//                                         <option key={brand} value={brand}>{brand}</option>
//                                     ))}
//                                 </select>
//                             </div>

//                             <div className="sort-by-price">
//                                 <label>
//                                     <input
//                                         type="radio"
//                                         value="highToLow"
//                                         checked={sortByPrice === 'highToLow'}
//                                         onChange={handleSortByPrice}
//                                     />
//                                     High to Low
//                                 </label>
//                                 <label>
//                                     <input
//                                         type="radio"
//                                         value="lowToHigh"
//                                         checked={sortByPrice === 'lowToHigh'}
//                                         onChange={handleSortByPrice}
//                                     />
//                                     Low to High
//                                 </label>
//                             </div>
                            
//                             <div className="clear-filter">
//                                 <button onClick={clearFilters}>Clear Filters</button>
//                             </div>
                            
//                         </motion.div>
//                     )}
//                 </AnimatePresence>
//             </motion.div>
//             <main>{children}</main>
//         </div>
//     );
// };

// export default SideBar;













import React, { useState, useEffect } from 'react';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import { FaBarsStaggered } from "react-icons/fa6";
import { BiSearch } from 'react-icons/bi';
import { AnimatePresence, motion } from 'framer-motion';
import { MdNavigateNext } from "react-icons/md";
import { GrFormPrevious } from "react-icons/gr";
import './sidebar.css'

const SideBar = ({ children, filters, handleSearch, handleOutfitFilter, handleBrandFilter, handleSortByPrice, paginate, clearFilters, currentPage, totalPages, searchTerm, selectedOutfit, selectedBrand, sortByPrice }) => {
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);

    const inputAnimation = {
        hidden: {
            width: 0,
            padding: 0,
            transition: {
                duration: 0.8,
            },
        },
        show: {
            width: "180px",
            padding: "5px 25px",
            transition: {
                duration: 0.8,
            },
        },
    };

    const showAnimation = {
        hidden: {
            width: 0,
            opacity: 0,
            transition: {
                duration: 0.8,
            },
        },
        show: {
            opacity: 1,
            width: "auto",
            transition: {
                duration: 0.8,
            },
        },
    };

    return (
        <div className="main-container">
            <motion.div
                animate={{
                    width: isOpen ? "240px" : "45px",
                    transition: {
                        duration: 0.5,
                        type: "spring",
                        damping: 10,
                    },
                }}
                className={`sidebar `}
            >
                <div className="top_section">
                    <AnimatePresence>
                        {isOpen && (
                            <motion.h1
                                variants={showAnimation}
                                initial="hidden"
                                animate="show"
                                exit="hidden"
                                className="logo"
                            >
                               <p>Filters</p> 
                            </motion.h1>
                        )}
                    </AnimatePresence>
                    <div className="bars">
                        <FaBarsStaggered onClick={toggle} />
                    </div>
                </div>

                

                {/* <div className="search">
                    <div className="search_icon">
                        <BiSearch />
                    </div>
                    <AnimatePresence>
                        {isOpen && (
                            <motion.input
                                initial="hidden"
                                animate="show"
                                exit="hidden"
                                variants={inputAnimation}
                                type="text"
                                placeholder="Search"
                                value={searchTerm}
                                onChange={handleSearch}
                            />
                        )}
                    </AnimatePresence>
                </div> */}
                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            variants={showAnimation}
                            initial="hidden"
                            animate="show"
                            exit="hidden"
                        >

                        <div className="pagination">
                                                  
                                {Array.from({ length: totalPages }, (_, index) => (
                                    <button
                                        key={index + 1}
                                        onClick={() => paginate(index + 1)}
                                        className={currentPage === index + 1 ? 'active' : ''}
                                    >
                                        {index + 1}
                                    </button>
                                ))}
                                
                            </div>

                            <div className="filter">
                                <button className={selectedOutfit === '' ? 'active' : ''} onClick={() => handleOutfitFilter('')}>All</button>
                                <button className={selectedOutfit === 'Men' ? 'active' : ''} onClick={() => handleOutfitFilter('Men')}>Men</button>
                                <button className={selectedOutfit === 'Women' ? 'active' : ''} onClick={() => handleOutfitFilter('Women')}>Women</button>
                                
                            </div>
                            <div className="brand-filter">
                                <select value={selectedBrand} onChange={handleBrandFilter}>
                                    <option value="">All Brands</option>
                                    {filters.brands.map(brand => (
                                        <option key={brand} value={brand}>{brand}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="sort-by-price">
                                <label>
                                    <input
                                        type="radio"
                                        value="highToLow"
                                        checked={sortByPrice === 'highToLow'}
                                        onChange={handleSortByPrice}
                                    />
                                    High to Low
                                </label>
                                <label>
                                    <input
                                        type="radio"
                                        value="lowToHigh"
                                        checked={sortByPrice === 'lowToHigh'}
                                        onChange={handleSortByPrice}
                                    />
                                    Low to High
                                </label>
                            </div>
                            
                            <div className="clear-filter">
                            <button  onClick={clearFilters}>Clear Filters</button>
                            </div>
                            
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>
            <main>{children}</main>
        </div>
    );
};

export default SideBar;






