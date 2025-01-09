// import React, { useState , useEffect} from 'react';
// import './bills.css';
// import { NavLink } from 'react-router-dom';


// function Bill() {

//     const [formData, setFormData] = useState({
//         name: '',
//         city: '',
//         road: '',
//         phone: ''
//     });

//     const [submittedData, setSubmittedData] = useState([]);

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setFormData(prevState => ({
//             ...prevState,
//             [name]: value
//         }));
//     };

//     // const handleSubmit = (e) => {
//     //     e.preventDefault();
//     //     setSubmittedData(prevData => [...prevData, formData]);
//     //     setFormData({
//     //         name: '',
//     //         city: '',
//     //         road: '',
//     //         phone: ''
//     //     });
//     // };

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         const formDataWithPayment = { ...formData, bkashChecked, creditCardChecked };
//         setSubmittedData(prevData => [...prevData, formDataWithPayment]);
//         setFormData({
//             name: '',
//             city: '',
//             road: '',
//             phone: ''
//         });
//         setBkashChecked(false); // Reset checkbox states
//         setCreditCardChecked(false);
//     };

//     const handleDelete = (index) => {
//         setSubmittedData(prevData => prevData.filter((_, i) => i !== index));
//     };

//     const [bkashChecked, setBkashChecked] = useState(false);
//     const [creditCardChecked, setCreditCardChecked] = useState(false);


//     const handleBkashChange = () => {
//         setBkashChecked(!bkashChecked);
//     };

//     const handleCreditCardChange = () => {
//         setCreditCardChecked(!creditCardChecked);
//     };



//     return (
//         <div className="bills">
//             <div className="bill-container">
//                 <h2 className="detail-msg">Billing Details</h2>

//                 <form id="signupForm" onSubmit={handleSubmit}>
//                     <div className="details">
//                         <div className="input-data">
//                             <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required />
//                             <div className="underline"></div>
//                             <label htmlFor="name">Customer's Name</label>
//                         </div>
//                     </div>

//                     <div className="details">
//                         <div className="input-data">
//                             <input type="text" id="city" name="city" value={formData.city} onChange={handleChange} required />
//                             <div className="underline"></div>
//                             <label htmlFor="city">City</label>
//                         </div>
//                     </div>

//                     <div className="details">
//                         <div className="input-data">
//                             <input type="text" id="road" name="road" value={formData.road} onChange={handleChange} required />
//                             <div className="underline"></div>
//                             <label htmlFor="road">Address</label>
//                         </div>
//                     </div>

//                     <div className="details">
//                         <div className="input-data">
//                             <input type="text" id="phone" name="phone" value={formData.phone} onChange={handleChange} required />
//                             <div className="underline"></div>
//                             <label htmlFor="phone">Phone No</label>
//                         </div>
//                     </div>



//                     <div className="half-payment">
//                         <label>
//                             <input type="checkbox" checked={bkashChecked} onChange={handleBkashChange} />
//                             Bkash (Half Payment)
//                         </label>
//                         <label>
//                             <input type="checkbox" checked={creditCardChecked} onChange={handleCreditCardChange} />
//                             Credit Card (Half Payment)
//                         </label>
//                     </div>

                   

//                     <div className="submit">
//                         <input type="submit" value="Submit" />
//                     </div>
//                 </form>
//             </div>
            
//             <div className="submitted-data">
//                 <h2>Customer Billing Details</h2>
//                 <ul>
//                     {submittedData.map((data, index) => (
//                         <li key={index}>
//                             <p>Customer's Name: {data.name}</p>
//                             <p>City: {data.city}</p>
//                             <p>Address: {data.road}</p>
//                             <p>Phone No: {data.phone}</p>

//                             {data.bkashChecked && <p>Advance half Payment: Bkash </p>}
//                             {data.creditCardChecked && <p>Advance half Payment: Credit Card </p>}

//                             <div className="sub-btns">

//                             <button onClick={() => handleDelete(index)}>Delete</button>

//                             <NavLink className="confirm" to='/order'>Confirm Order</NavLink>

//                             </div>
                            
//                         </li>
//                     ))}
//                 </ul>
//         </div>
//         </div>
//     );
// }

// export default Bill;









import React, { useState , useEffect} from 'react';
import './bills.css';
import { NavLink } from 'react-router-dom';


function Bill() {

    const [formData, setFormData] = useState({
        name: '',
        city: '',
        road: '',
        phone: ''
    });

    const [submittedData, setSubmittedData] = useState([]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    // const handleSubmit = (e) => {
    //     e.preventDefault();
    //     setSubmittedData(prevData => [...prevData, formData]);
    //     setFormData({
    //         name: '',
    //         city: '',
    //         road: '',
    //         phone: ''
    //     });
    // };

    const handleSubmit = (e) => {
        e.preventDefault();
        const formDataWithPayment = { ...formData, bkashChecked, creditCardChecked };
        setSubmittedData(prevData => [...prevData, formDataWithPayment]);
        setFormData({
            name: '',
            city: '',
            road: '',
            phone: ''
        });
        setBkashChecked(false); // Reset checkbox states
        setCreditCardChecked(false);
    };

    const handleDelete = (index) => {
        setSubmittedData(prevData => prevData.filter((_, i) => i !== index));
    };

    const [bkashChecked, setBkashChecked] = useState(false);
    const [creditCardChecked, setCreditCardChecked] = useState(false);


    const handleBkashChange = () => {
        setBkashChecked(!bkashChecked);
    };

    const handleCreditCardChange = () => {
        setCreditCardChecked(!creditCardChecked);
    };



    return (
        <div className="bills">
            <div className="bill-container">
                <h2 className="detail-msg">Billing Details</h2>

                <form id="signupForm" onSubmit={handleSubmit}>
                    <div className="details">
                        <div className="input-data">
                            <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required />
                            <div className="underline"></div>
                            <label htmlFor="name">Customer's Name</label>
                        </div>
                    </div>

                    <div className="details">
                        <div className="input-data">
                            <input type="text" id="city" name="city" value={formData.city} onChange={handleChange} required />
                            <div className="underline"></div>
                            <label htmlFor="city">City</label>
                        </div>
                    </div>

                    <div className="details">
                        <div className="input-data">
                            <input type="text" id="road" name="road" value={formData.road} onChange={handleChange} required />
                            <div className="underline"></div>
                            <label htmlFor="road">Address</label>
                        </div>
                    </div>

                    <div className="details">
                        <div className="input-data">
                            <input type="text" id="phone" name="phone" value={formData.phone} onChange={handleChange} required />
                            <div className="underline"></div>
                            <label htmlFor="phone">Phone No</label>
                        </div>
                    </div>



                    <div className="half-payment">
                        <label>
                            <input type="checkbox" checked={bkashChecked} onChange={handleBkashChange} />
                            Bkash (Half Payment)
                        </label>
                        <label>
                            <input type="checkbox" checked={creditCardChecked} onChange={handleCreditCardChange} />
                            Credit Card (Half Payment)
                        </label>
                    </div>

                   

                    <div className="submit">
                        <input type="submit" value="Submit" />
                    </div>
                </form>
            </div>
            
            <div className="submitted-data">
                <h2>Customer Billing Details</h2>
                <ul>
                    {submittedData.map((data, index) => (
                        <li key={index}>
                            <p>Customer's Name: {data.name}</p>
                            <p>City: {data.city}</p>
                            <p>Address: {data.road}</p>
                            <p>Phone No: {data.phone}</p>

                            {data.bkashChecked && <p>Advance half Payment: Bkash </p>}
                            {data.creditCardChecked && <p>Advance half Payment: Credit Card </p>}

                            <div className="sub-btns">

                            <button onClick={() => handleDelete(index)}>Delete</button>

                            <NavLink className="confirm" to='/order'>Confirm Order</NavLink>

                            </div>
                            
                        </li>
                    ))}
                </ul>
        </div>
        </div>
    );
}

export default Bill;