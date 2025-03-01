import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const HotelLogin = () => {
  const [loginDetails, setLoginDetails] = useState({
    email: "",
    password: "",
    role: "hotel", // Default role
  });

  const navigate = useNavigate();

  // Handle input change
  const handleChange = (e) => {
    setLoginDetails({ ...loginDetails, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password, role } = loginDetails;
    console.log(loginDetails)
  
    try {
      const response = await axios.post("http://localhost:5000/login", {
        email,
        password,
        role,
      });
      const id = response.data.userId;
      console.log(id)
      console.log(response.data.message === "Login successful!!"); // Corrected
      alert("Login Successful!");
      if(role=== "hotel"){
        navigate(`/dashboard/${role}/${id}/make_request`);
      }else if(role==="ngo"){
        navigate(`/dashboard/${role}/${id}/all_requests`);
      }
       // Redirect based on role
    } catch (err) {
      console.error("Login failed:", err);
      alert("Login failed. Please check your credentials.");
    }
  };
  

  return (
    <div style={containerStyle}>
      <h2 style={titleStyle}>🔑 Login</h2>

      <form onSubmit={handleSubmit} style={formStyle}>
        <label>Email:</label>
        <input
          type="email"
          name="email"
          value={loginDetails.email}
          onChange={handleChange}
          required
          style={inputStyle}
        />

        <label>Password:</label>
        <input
          type="password"
          name="password"
          value={loginDetails.password}
          onChange={handleChange}
          required
          style={inputStyle}
        />

        <label>Role:</label>
        <select name="role" value={loginDetails.role} onChange={handleChange} style={dropdownStyle}>
          <option value="hotel">Hotel</option>
          <option value="volunteer">Volunteer</option>
          <option value="ngo">NGO</option>
        </select>

        <button type="submit" style={buttonStyle}>Login</button>
      </form>
    </div>
  );
};

// Styles
const containerStyle = {
  maxWidth: "400px",
  margin: "40px auto",
  padding: "30px",
  backgroundColor: "#640505",
  color: "white",
  borderRadius: "10px",
  fontFamily: "Arial, sans-serif",
};

const titleStyle = {
  textAlign: "center",
  marginBottom: "20px",
  fontSize: "24px",
};

const dropdownStyle = {
    width: "98%",
  padding: "12px",
  marginBottom: "20px",
  borderRadius: "5px",
  border: "1px solid #ddd",
  fontSize: "16px",
  marginTop: "10px",
  };
  
const formStyle = {
  display: "flex",
  flexDirection: "column",
};

const inputStyle = {
  width: "95%",
  padding: "12px",
  marginBottom: "20px",
  borderRadius: "5px",
  border: "1px solid #ddd",
  fontSize: "16px",
  marginTop: "10px",
};

const buttonStyle = {
  backgroundColor: "#e89309",
  color: "white",
  padding: "12px",
  border: "transparent",
  borderRadius: "5px",
  width: "100%",
  fontSize: "16px",
  fontWeight: "bold",
  cursor: "pointer",
};

export default HotelLogin;