const express = require("express")
const app = express();
const cors = require("cors");
const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")
const connectDB = require('./models/dbConnection');
const Hotel = require("./models/HotelSchema");
const Ngo = require("./models/NgoSchema");
const Volunteer = require("./models/VolunteerSchema");

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

app.post('/register/ngo',async(req,res)=>{
    try{
        const {ngo_name,registration_no,contact_no,email,password,address} = req.body;
        const ngo_exist = await Ngo.findOne({ registration_no})

        if(ngo_exist){
            return res.status(400).json({message:"NGO already exist!!"})
        }

        const hashedpassword = await bcrypt.hash(password,8)

        const newNgo = new Ngo({ngo_name,registration_no,contact_no,email,password:hashedpassword,address});
        await newNgo.save();
        console.log("NGO created")

        return res.status(200).json({message:"NGO registered successfully!!"})
    }
    catch(error){
        console.error(error);
        return res.status(500).json({ error: error.message });
    }
})

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

app.listen(port,()=>{
    console.log("server started")
})
