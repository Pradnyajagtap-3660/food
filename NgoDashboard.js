import React, { useState, useEffect } from "react";
import axios from "axios";
import "./hosp2.css";
import { useParams } from "react-router-dom";

const NgoDashboard = () => {
    const {ngoId} = useParams(); // Replace with actual logged-in NGO ID
    console.log(ngoId)
    const [requests, setRequests] = useState([]);
    
    useEffect(() => {
        fetchRequests();
    }, []);

    // Fetch all requests for the NGO
    const fetchRequests = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/dashboard/ngo/${ngoId}/all_requests`);
            console.log(response)
            setRequests(response.data.requests);
        } catch (error) {
            console.error("Error fetching requests:", error);
        }
    };

    // Accept a food request
    const acceptRequest = async (requestId) => {
        try {
            await axios.put(`http://localhost:5000/requests/${requestId}/accept`);
            alert("Request Accepted!");
            fetchRequests(); // Refresh the list after accepting
        } catch (error) {
            console.error("Error accepting request:", error);
        }
    };

    return (
        <div>
            <div className="search-bar">
                <div className="logo">
                    <img className="img-logo" src="/images/Screenshot_2024-09-24_210649-removebg-preview.png" alt="QuickSend logo" />
                    <h1 className="Foodbridge">FoodBridge</h1>
                </div>
                <div className="search-head">
                    <input className="search-input" placeholder="Search..." />
                    <div className="account">
                        <img className="login-top" src="/images/account-removebg-preview.png" alt="Login" />
                        <select className="logout-option">
                            <option value="">Account</option>
                            <option value="logout">Logout</option>
                        </select>
                    </div>
                </div>
            </div>

            <div className="sidebar">
                <ul className="sidebar-menu">
                    <div className="dashboard">
                        <img className="dashboardimg" src="/images/dashboard.png" alt="Dashboard" />
                        <li className="li-outer">Dashboard</li>
                    </div>

                    <div className="dashboard">
                        <img className="templateimg" src="/images/home.png" alt="Template" />
                        <li className="li-outer" style={{ cursor: "pointer" }}>Home</li>
                    </div>

                    <div className="dashboard">
                        <img className="campaignimg" src="/images/campaign-removebg-preview (1).png" alt="Campaign" />
                        <li className="li-outer" style={{ cursor: "pointer" }}>Connection</li>
                    </div>
                </ul>
            </div>

            <div className="background-style">
                <h1 className="register">Your Connections!</h1>
                
                <div className="request-list">
                    {requests.length === 0 ? (
                        <p>No food requests available.</p>
                    ) : (
                        requests.map((request) => (
                            <div key={request._id} className="request-card">
                               <h2><strong>Hotel:</strong> {request.hotelId.hotel_name}</h2> 
                               <p><strong>Food Name:</strong>{request.food_name}</p>
                                <p><strong>Quantity:</strong> {request.food_quantity}</p>
                                <p><strong>Pickup Time:</strong> {request.pickup_time}</p>
                                <p><strong>Status:</strong> {request.status}</p>
                                
                                <button 
                                    className="accept-button" 
                                    onClick={() => acceptRequest(request._id)}
                                    disabled={request.status === "accepted"}
                                >
                                    {request.status === "accepted" ? "Accepted" : "Accept"}
                                </button>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

export default NgoDashboard;
