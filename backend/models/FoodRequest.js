const mongoose = require("mongoose")

const FoodRequestSchema = mongoose.Schema({
    hotelId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Hotel'
    },
    assign_ngoId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Ngo'
    },
    assign_volunteerId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'volunteer'
    },
    status:{
        type:String,
        enum:["accpect","pending"]
    },
    food_name:{
        type:String,
        required:true,
    },
    food_quantity:{
        type:Number,
        required:true
    },
    pickup_time:{
        type:Number,
        required:true,
    },
    nearbyNGO:[{ type: mongoose.Schema.Types.ObjectId, ref: "Ngo" }]
    ,
    nearbyvolunteers:{
        type:[Number]
    }


})

const FoodRequest = mongoose.model("FoodRequest",FoodRequestSchema);
module.exports = FoodRequest;
