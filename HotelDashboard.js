// import React, { useState } from 'react';
// import './hosp1.css';

// const HotelDashboard = () => {
//     const [firstname, setFirstname] = useState('');
//     const [lastname, setLastname] = useState('');
//     const [phonenumber, setPhonenumber] = useState('');
//     const [businessname, setBusinessname] = useState('');
    

//     return (
//         <div>
//             <div className='search-bar'>
//                 <div className='logo'>
                  
//                     <img className='img-logo' src="/images/logo.png"  alt='QuickSend logo' />
                    
                    
//                     <h1 className='Foodbridge'>Dashboard</h1>
//                 </div>
//                 <div className='search-head'>
//                     <input className='search-input' />
//                     <div className='account'>
//                         <img className='login-top' src='/images/profile.png' alt='Login' />
//                         <select className='logout-option'>
//                             <option value=''>Account</option>
//                             <option value='logout'>Logout</option>
//                         </select>
//                     </div>
//                 </div>
//             </div>

//             <div className='sidebar'>
//                 <ul className='sidebar-menu'>
                   

//                     <div className='dashboard'>
//                         <img className='templateimg' src="/images/home.png" />
//                         <li className='li-outer' style={{ cursor: 'pointer' }}>Home</li>
//                     </div>

//                     <div className='dashboard'>
//                         <img className='campaignimg' src='/images/connection.png'  />
//                         <li className='li-outer' style={{ cursor: 'pointer' }}>Connection</li>
//                     </div>
//                 </ul>
//             </div>

//             <div className='background-style'>
//                 <form className='form-container'>
//                     <h1 className='register'>Want to notify?</h1>
//                     <div>
//                         <label className='label'>Food type</label>
//                         <input className='input' type='text' value={firstname} />
//                     </div>
//                     <div>
//                         <label className='label'>Food quantity</label>
//                         <input className='input' type='text' value={lastname} />
//                     </div>
//                     <div>
//                         <label className='label'>Food prep time</label>
//                         <input className='input' type='text' value={phonenumber} />
//                     </div>
//                     <div>
//                         <label className='label'>Pick-up time</label>
//                         <input className='input' type='text' value={businessname} />
//                     </div>
                    
//                     <button type='submit' className='button'>Notify</button>
//                 </form>
//             </div>
//         </div>
//     );
// };

// export default HotelDashboard;

import React, { useState } from 'react';
import axios from 'axios';
import './hosp1.css';
import { useParams } from 'react-router-dom';

const HotelDashboard = () => {
    const {hotelId} = useParams()
    console.log(hotelId)
    const [foodName, setFoodName] = useState('');
    const [foodQuantity, setFoodQuantity] = useState('');
    const [pickupTime, setPickupTime] = useState('');
    const [message, setMessage] = useState('');

    const handleNotify = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`http://localhost:5000/dashboard/hotel/${hotelId}/make_request`, {
                 // Replace with dynamic hotelId
                food_name: foodName,
                food_quantity: foodQuantity,
                pickup_time: pickupTime
            });

            setMessage(response.data.message);
            setFoodName('');
            setFoodQuantity('');
            setPickupTime('');
        } catch (error) {
            setMessage("Error sending request. Try again.");
        }
    };

    return (
        <div>
            <div className='search-bar'>
                <div className='logo'>
                    <img className='img-logo' src="/images/logo.png" alt='QuickSend logo' />
                    <h1 className='Foodbridge'>Dashboard</h1>
                </div>
                <div className='search-head'>
                    <input className='search-input' placeholder="Search..." />
                    <div className='account'>
                        <img className='login-top' src='/images/profile.png' alt='Login' />
                        <select className='logout-option'>
                            <option value=''>Account</option>
                            <option value='logout'>Logout</option>
                        </select>
                    </div>
                </div>
            </div>

            <div className='sidebar'>
                <ul className='sidebar-menu'>
                    <div className='dashboard'>
                        <img className='templateimg' src="/images/home.png" alt="Home"/>
                        <li className='li-outer' style={{ cursor: 'pointer' }}>Home</li>
                    </div>

                    <div className='dashboard'>
                        <img className='campaignimg' src='/images/connection.png' alt="Connection" />
                        <li className='li-outer' style={{ cursor: 'pointer' }}>Connection</li>
                    </div>
                </ul>
            </div>

            <div className='background-style'>
                <form className='form-container' onSubmit={handleNotify}>
                    <h1 className='register'>Want to notify?</h1>
                    <div>
                        <label className='label'>Food type</label>
                        <input className='input' type='text' value={foodName} onChange={(e) => setFoodName(e.target.value)} required />
                    </div>
                    <div>
                        <label className='label'>Food quantity</label>
                        <input className='input' type='number' value={foodQuantity} onChange={(e) => setFoodQuantity(e.target.value)} required />
                    </div>
                    <div>
                        <label className='label'>Pick-up time</label>
                        <input className='input' type='text' value={pickupTime} onChange={(e) => setPickupTime(e.target.value)} required />
                    </div>
                    <button type='submit' className='button'>Notify</button>
                    {message && <p className="message">{message}</p>}
                </form>
            </div>
        </div>
    );
};

export default HotelDashboard;
