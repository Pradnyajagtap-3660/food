// import React, { useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// const NGORegistrationPage = () => {
//   const navigate = useNavigate();
//   const [ngoDetails, setNgoDetails] = useState({
//     email: "",
//     password: "",
//     ngoName: "",
//     contact: "",
//     address: "",
//     registrationNo: "",
//     location: { lat: "", lng: "" }, // Latitude and Longitude to be saved
//   });

//   const [addressSuggestions, setAddressSuggestions] = useState([]);

//   // Handle input changes for form fields
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setNgoDetails({ ...ngoDetails, [name]: value });

//     // Fetch address suggestions when the user types in the address field
//     if (name === "address") {
//       fetchAddressSuggestions(value);
//     }
//   };

//   // Fetch address suggestions using OpenStreetMap's Nominatim API
//   const fetchAddressSuggestions = async (query) => {
//     if (query.length < 3) {
//       setAddressSuggestions([]); // Clear suggestions if input is less than 3 characters
//       return;
//     }
   
//     try {
//         const response = await axios.get(
//           `https://nominatim.openstreetmap.org/search?format=json&q=${query}&countrycodes=in`
//         );
  
//         setAddressSuggestions(response.data);
//       } catch (error) {
//         console.error("Error fetching address suggestions:", error);
//       }
//     };
//   // Handle when a user selects an address from the suggestions list
//   const handleAddressSelect = (address) => {
//     // Save the selected address and its coordinates (latitude and longitude)
//     setNgoDetails({
//       ...ngoDetails,
//       address: address.display_name,
//       location: { lat: address.lat, lng: address.lon },
//     });

//     // Clear address suggestions after selection
//     setAddressSuggestions([]);
//   };

//   // Handle form submission (this would be where you send the data to the server)
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const { ngoName,registrationNo,contact, email,password,address,location: { lat, lng } } = ngoDetails;
//     try {
//       const response = await axios.post("http://localhost:5000/register/ngo", {
//         ngoName,registrationNo,contact, email,password,address,location: { lat, lng }
//       });

//       console.log(response.data.message==="NGO registered successfully!!");
      
//       alert("sucessful registration!!");
//       navigate('/login');
//     } catch (err) {
//       console.error(err);
//       alert(e)
      
//     }

//   };

//   return (
//     <div style={containerStyle}>
//       <h2 style={titleStyle}>NGO Registration</h2>

//       <form onSubmit={handleSubmit} style={formStyle}>

//       <label>NGO Name:</label>
//         <input
//           type="text"
//           name="ngoName"
//           value={ngoDetails.ngoName}
//           onChange={handleChange}
//           required
//           style={inputStyle}
//         />

// <label>Registration Number:</label>
//         <input
//           type="text"
//           name="registrationNo"
//           value={ngoDetails.registrationNo}
//           onChange={handleChange}
//           required
//           style={inputStyle}
//         />
//            <label>Contact Number:</label>
//         <input
//           type="tel"
//           name="contact"
//           value={ngoDetails.contact}
//           onChange={handleChange}
//           required
//           style={inputStyle}
//         />
//         <label>Email:</label>
//         <input
//           type="email"
//           name="email"
//           value={ngoDetails.email}
//           onChange={handleChange}
//           required
//           style={inputStyle}
//         />

//         <label>Password:</label>
//         <input
//           type="password"
//           name="password"
//           value={ngoDetails.password}
//           onChange={handleChange}
//           required
//           style={inputStyle}
//         />
       

//         {/* Address Input */}
//         <label>Full Address:</label>
//         <input
//           type="text"
//           name="address"
//           value={ngoDetails.address}
//           onChange={handleChange}
//           required
//           style={inputStyle}
//         />

//         {/* Show Address Suggestions */}
//         {addressSuggestions.length > 0 && (
//           <ul style={suggestionsStyle}>
//             {addressSuggestions.map((address, index) => (
//               <li
//                 key={index}
//                 onClick={() => handleAddressSelect(address)}
//                 style={suggestionItemStyle}
//               >
//                 {address.display_name}
//               </li>
//             ))}
//           </ul>
//         )}

//         <p style={{ marginTop: "10px", fontWeight: "bold" }}>
//           {/* Show the auto-filled coordinates */}
//           {/* Latitude: {ngoDetails.location.lat}, Longitude: {ngoDetails.location.lng} */}
//         </p>

//         <button type="submit" style={buttonStyle} >
//           Register NGO
//         </button>
//       </form>
//     </div>
//   );
// };

// // 📌 Styling
// const containerStyle = {
//   maxWidth: "800px",
//   margin: "40px auto",
//   padding: "30px",
//   backgroundColor: "#640505",
//   color: "white",
//   borderRadius: "10px",
//   fontFamily: "Arial, sans-serif",
// };

// const titleStyle = {
//   textAlign: "center",
//   marginBottom: "20px",
//   fontSize: "24px",
// };

// const formStyle = {
//   display: "flex",
//   flexDirection: "column",
// };

// const inputStyle = {
//   width: "95%",
//   padding: "12px",
//   marginBottom: "20px",
//   borderRadius: "5px",
//   border: "1px solid #ddd",
//   fontSize: "16px",
//   marginTop: "10px",
// };

// const suggestionsStyle = {
//   backgroundColor: "white",
//   color: "#333",
//   borderRadius: "5px",
//   padding: "10px",
//   listStyleType: "none",
//   maxHeight: "150px",
//   overflowY: "auto",
//   position: "absolute",
//   width: "100%",
//   zIndex: 10,
// };

// const suggestionItemStyle = {
//   padding: "8px",
//   cursor: "pointer",
//   borderBottom: "1px solid #ddd",
//   fontSize: "14px",
// };

// const buttonStyle = {
//   backgroundColor: "#e89309",
//   color: "white",
//   padding: "12px",
//   border: "transparent",
//   borderRadius: "5px",
//   width: "100%",
//   fontSize: "16px",
//   fontWeight: "bold",
//   cursor: "pointer",
// };

// export default NGORegistrationPage;

import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const NgoRegister = () => {
  const navigate = useNavigate();
  const [ngoDetails, setNgoDetails] = useState({
    email: "",
    password: "",
    ngoName: "",
    contact: "",
    address: "",
    registrationNo: "",
    location: { lat: "", lng: "" }, // Store lat/lng properly
  });

  const [addressSuggestions, setAddressSuggestions] = useState([]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "lat" || name === "lng") {
      setNgoDetails({
        ...ngoDetails,
        location: { ...ngoDetails.location, [name]: value },
      });
    } else {
      setNgoDetails({ ...ngoDetails, [name]: value });

      if (name === "address") {
        fetchAddressSuggestions(value);
      }
    }
  };

  // Fetch Address Suggestions using OpenStreetMap API
  const fetchAddressSuggestions = async (query) => {
    if (query.length < 3) {
      setAddressSuggestions([]);
      return;
    }
    try {
      const response = await axios.get(
        `https://nominatim.openstreetmap.org/search?format=json&q=${query}&countrycodes=in`
      );
      console.log(response)
      setAddressSuggestions(response.data);
    } catch (error) {
      console.error("Error fetching address suggestions:", error);
    }
  };

  // Handle Address Selection
//   const handleAddressSelect = (address) => {
//     setNgoDetails({
//       ...ngoDetails,
//       address: address.display_name,
//       location: { lat: address.lat, lng: address.lon },
//     });
//     setAddressSuggestions([]); // Clear address suggestions after selection
//   }; 
const handleAddressSelect = (address) => {
    setNgoDetails({
      ...ngoDetails,
      address: address.display_name,
      location: {
        lat: parseFloat(address.lat),  // Convert to number
        lng: parseFloat(address.lon),  // Convert to number
      },
    });
  };
  

  // Handle Form Submission
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const { ngoName, registrationNo, contact, email, password, address, location } = ngoDetails;

//       // Ensure lat/lng are converted to numbers
//       const lat = parseFloat(location.lat);
//       const lng = parseFloat(location.lng);

//       const response = await axios.post("http://localhost:5000/register/ngo", {
//         ngoName,
//         registrationNo,
//         contact,
//         email,
//         password,
//         address,
//         location: { lat, lng },
//       });

//       if (response.status === 201) {
//         alert("Successful registration!");
//         navigate("/login");
//       }
//     } catch (err) {
//       console.error("Registration error:", err);
//       alert("Error: " + (err.response?.data?.message || err.message));
//     }
//   };

const handleSubmit = async (e) => {
    e.preventDefault();
  
    const { ngoName, registrationNo, contact, email, password, address, location } = ngoDetails;
  
    const lat = parseFloat(location.lat);
    const lng = parseFloat(location.lng);
  
    try {
      const response = await axios.post("http://localhost:5000/register/ngo", {
        ngoName,
        registrationNo,
        contact,
        email,
        password,
        address,
        location: { lat, lng },  // Ensure numbers are sent
      });
  
      if (response.status === 201) {
        alert("Successful registration!");
        navigate("/login");
      }
    } catch (err) {
      console.error("Registration error:", err);
      alert("Error: " + (err.response?.data?.message || err.message));
    }
  };
  

  return (
    <div style={containerStyle}>
      <h2 style={titleStyle}>NGO Registration</h2>

      <form onSubmit={handleSubmit} style={formStyle}>
        <label>NGO Name:</label>
        <input type="text" name="ngoName" value={ngoDetails.ngoName} onChange={handleChange} required style={inputStyle} />

        <label>Registration Number:</label>
        <input type="text" name="registrationNo" value={ngoDetails.registrationNo} onChange={handleChange} required style={inputStyle} />

        <label>Contact Number:</label>
        <input type="tel" name="contact" value={ngoDetails.contact} onChange={handleChange} required style={inputStyle} />

        <label>Email:</label>
        <input type="email" name="email" value={ngoDetails.email} onChange={handleChange} required style={inputStyle} />

        <label>Password:</label>
        <input type="password" name="password" value={ngoDetails.password} onChange={handleChange} required style={inputStyle} />

        <label>Full Address:</label>
        <input type="text" name="address" value={ngoDetails.address} onChange={handleChange} required style={inputStyle} />

        {addressSuggestions.length > 0 && (
          <ul >
            {addressSuggestions.map((address, index) => (
              <li key={index} onClick={() => handleAddressSelect(address)} >
                {address.display_name}
              </li>
            ))}
          </ul>
        )}

        <button type="submit" style={buttonStyle}>Register NGO</button>
      </form>
    </div>
  );
};

// 🎨 Styling
const containerStyle = { maxWidth: "800px", margin: "40px auto", padding: "30px", backgroundColor: "#640505", color: "white", borderRadius: "10px", fontFamily: "Arial, sans-serif" };
const titleStyle = { textAlign: "center", marginBottom: "20px", fontSize: "24px" };
const formStyle = { display: "flex", flexDirection: "column" };
const inputStyle = { width: "95%", padding: "12px", marginBottom: "20px", borderRadius: "5px", border: "1px solid #ddd", fontSize: "16px" };
const buttonStyle = { backgroundColor: "#e89309", color: "white", padding: "12px", borderRadius: "5px", width: "100%", fontSize: "16px", fontWeight: "bold", cursor: "pointer" };

export default NgoRegister;
