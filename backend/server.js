const express = require("express")
const app = express();
const cors = require("cors");
const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")
const connectDB = require('./models/dbConnection');
const Hotel = require("./models/HotelSchema");
const Ngo = require("./models/NgoSchema");
const Volunteer = require("./models/VolunteerSchema");
const FoodRequest = require("./models/FoodRequest");
const mongoose = require('mongoose')

app.use(cors({
    origin: 'http://localhost:3000', 
    credentials: true 
  }));

  connectDB()

app.use(express.json()); 

const port = 5000;
const JWT_sceret = "code_maniac";

app.post('/register/hotel',async(req,res)=>{
    try{
        const {hotel_name,foodLicense,contact, email,password,address,location: { lat, lng }} = req.body;
        console.log(hotel_name)
        console.log(req.body)
        const hotel_exist = await Hotel.findOne({foodLicense })
        
        console.log(hotel_exist)
        if(hotel_exist){
            return res.status(400).json({message:"Hotel already exist!!"})
        }

        const hashedpassword = await bcrypt.hash(password,8)

        const newHotel = new Hotel({hotel_name,foodLicense,contact, email,password:hashedpassword,address,location: { lat, lng }});
        await newHotel.save();
        console.log("user created")

        return res.status(200).json({message:"hotel registered successfully!!"})
    }
    catch(error){
        console.error(error);
        return res.status(500).json({ error: error.message });
    }
})

// app.post('/register/ngo',async(req,res)=>{
//     try{
//         const {ngoName,registrationNo,contact, email,password,address,location: { lat, lng }} = req.body;
//         console.log(req.body);
//         const ngo_exist = await Ngo.findOne({ registrationNo});

//         if(ngo_exist){
//             return res.status(400).json({message:"NGO already exist!!"})
//         }

//         const hashedpassword = await bcrypt.hash(password,8)

//         const newNgo = new Ngo({ngoName,registrationNo,contact, email,password:hashedpassword,address,location: { lat, lng }});
//         await newNgo.save();
//         console.log("NGO created")

//         return res.status(200).json({message:"NGO registered successfully!!"})
//     }
//     catch(error){
//         console.error(error);
//         return res.status(500).json({ error: error.message });
//     }
// })


app.post("/register/ngo", async (req, res) => {
    try {
        const { ngoName, registrationNo, contact, email, password, address, location } = req.body;
        console.log(req.body)
        // Check if NGO already exists
        const ngoExist = await Ngo.findOne({ registrationNo });
        if (ngoExist) return res.status(400).json({ message: "NGO already exists!" });

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 8);

        // Store location as [longitude, latitude] for GeoJSON compatibility
        const newNgo = new Ngo({
            ngoName,
            registrationNo,
            contact,
            email,
            password: hashedPassword,
            address,
            location: { type: "Point", coordinates: [parseFloat(location.lng), parseFloat(location.lat)] }
        });

        await newNgo.save();
        console.log("NGO created");

        res.status(201).json({ message: "NGO registered successfully!" });
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ error: error.message });
    }
});


app.post('/register/volunteer',async(req,res)=>{
    try{
        const {name,email,password,contact_no} = req.body;
        const volunteer_exist = await Hotel.findOne({ email})

        if(volunteer_exist){
            return res.status(400).json({message:"Volunteer already exist!!"})
        }

        const hashedpassword = await bcrypt.hash(password,8)

        const newVolunteer = new Volunteer({name,email,password:hashedpassword,contact_no});
        await newVolunteer.save();
        console.log("Volunteer created")

        return res.status(200).json({message:"Volunteer registered successfully!!"}) 
    }
    catch(error){
        console.error(error);
        return res.status(500).json({ error: error.message });
    }
})

app.post('/login', async (req, res) => {
    try {
      const { email, password, role } = req.body;
      let user = null; // Declare user outside the conditions
        console.log(role)
      if (role === "hotel") {
        user = await Hotel.findOne({ email });
        console.log(user)
      } else if (role === "ngo") {
        user = await Ngo.findOne({ email });
      } else {
        user = await Volunteer.findOne({ email });
      }
  
      if (user) {
        return res.status(200).json({ message: "Login successful!!" ,userId:user._id});
      } 
  
      return res.status(400).json({ message: "Invalid credentials" });
  
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: error.message });
    }
    
  });

const findNearbyNGOs = async (hotelLocation) => {
    return await Ngo.find({
        location: {
            $near: {
                $geometry: {
                    type: "Point",
                    coordinates: hotelLocation, // [longitude, latitude]
                },
                $maxDistance: 10000 // 10 km (10,000 meters)
            }
        }
    });
};

// Route to create a food request and notify nearby NGOs
app.post("/dashboard/hotel/:hotelId/make_request", async (req, res) => {
    try {
        const { food_name, food_quantity, pickup_time } = req.body;
        const { hotelId } = req.params;
        console.log(hotelId)

        if (!food_name || !food_quantity || !pickup_time) {
            return res.status(400).json({ message: "All fields are required" });
        }

        // Find the hotel to get its location
        const hotel = await Hotel.findById(hotelId);
        console.log(hotel)
        if (!hotel || !hotel.location || !hotel.location.lng || !hotel.location.lat) {
            return res.status(404).json({ message: "Hotel not found or location missing" });
        }

        const hotelLocation = [hotel.location.lng, hotel.location.lat]; // Convert to [longitude, latitude]
        console.log(hotelLocation)
        // Find nearby NGOs
        const nearbyNGOs = await findNearbyNGOs(hotelLocation);
        console.log(nearbyNGOs)
        const ngoIds = nearbyNGOs.map(ngo => ngo._id);
        console.log(ngoIds)
        if (ngoIds.length === 0) {
            return res.status(404).json({ message: "No NGOs found within 10 km" });
        }

        // Create a new food request
        const newRequest = new FoodRequest({
            hotelId,
            food_name,
            food_quantity,
            pickup_time,
            nearbyNGO: ngoIds,
            status: "pending"
        });

        await newRequest.save();
        res.status(201).json({
            message: "Food request created successfully and sent to nearby NGOs",
            request: newRequest,
            notifiedNGOs: nearbyNGOs
        });

    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

// app.get('/dashboard/ngo/:ngoId/all_requests',async(req,res) =>{
//     try {
//         const { ngoId } = req.params;
//         console.log(ngoId)

//         const foodRequests = await FoodRequest.find({ nearbyNGO: ngoId })
//             .populate("hotelId", "hotel_name address contact") 
//             .populate("nearbyNGO", "ngoName email contact"); 

//         if (!foodRequests.length) {
//             return res.status(404).json({ message: "No food requests found for this NGO" });
//         }
//         console.log(foodRequests)
//         res.status(200).json({ requests: foodRequests });

//     } catch (error) {
//         console.error("Error fetching food requests:", error);
//         res.status(500).json({ message: "Internal server error" });
//     }
// })


app.get('/dashboard/ngo/:ngoId/all_requests', async (req, res) => {
    try {
        const { ngoId } = req.params;
        console.log("Received NGO ID:", ngoId);

        // Validate NGO ID
        if (!mongoose.Types.ObjectId.isValid(ngoId)) {
            return res.status(400).json({ message: "Invalid NGO ID format" });
        }

        const foodRequests = await FoodRequest.find({ nearbyNGO: ngoId })
            .populate("hotelId", "hotel_name address contact") 
            .populate("nearbyNGO", "ngoName email contact"); 

        if (!foodRequests.length) {
            return res.status(404).json({ message: "No food requests found for this NGO" });
        }

        console.log("Fetched Requests:", foodRequests);
        res.status(200).json({ requests: foodRequests });

    } catch (error) {
        console.error("Error fetching food requests:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

app.listen(port,()=>{
    console.log("server started")
})
