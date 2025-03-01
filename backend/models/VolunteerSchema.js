const mongoose = require("mongoose")

const VolunteerSchema = mongoose.Schema({
    full_name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
        unique:true
    },
    location:{
        lat:Number,
        lon:Number
    },
    contact_no:{
        type:Number,
        required:true,
        unique:true
    },
    role:{
        type:String
    }
})

const Volunteer = mongoose.model("Volunteer",VolunteerSchema);
module.exports = Volunteer;
