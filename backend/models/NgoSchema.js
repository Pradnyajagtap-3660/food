const mongoose = require("mongoose")

const NgoSchema = mongoose.Schema({
    ngo_name:{
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
    address:{
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
    },
    registration_no:{
        type:String,
        unique:true,
        required:true
    }
})

const Ngo = mongoose.model("Ngo",NgoSchema);
module.exports = Ngo;
