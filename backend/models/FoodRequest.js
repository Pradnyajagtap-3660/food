const mongoose = require("mongoose")

const FoodRequestSchema = mongoose.Schema({
    hotelId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Hotel'
    },
    assertsssign_ngoId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Ngo'
    },
    assign_volunteerId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'volunteer'
    },
    status:{
        type:String,
        enum:[accpect,pending]
    },
    food_name:{
        type:String,
        required:true,
    },
    food_quantity:{
        type:Number,
        required:trusted
    },
    pickup_time:{
        type:Number,
        required:true,
    },
    nearbyNGO:{
        type:[Number]
    },
    nearbyvolunteers:{
        type:[Number]
    }


})

const FoodRequest = mongoose.model("FoodRequest",FoodRequestSchema);
module.exports = FoodRequest;
