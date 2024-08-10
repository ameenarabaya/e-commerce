import { Schema, model,Types } from "mongoose";
const couponSchema = new Schema({
    name:{
        type:String,
        required:true,
        unique:true
    },
    amount:{
        type:Number,
        required:true
    },
    expireDate:{
        type:Date,
        required:true
    },
    usedBy:[
        {
            type:Types.ObjectId,
            ref:'User',
            // required:true
        }
    ],
    createdBy:{
        type:Types.ObjectId,
        ref:'User',
        // required:true
    }
},{timestamps:true});

const couponModel = model('Coupon',couponSchema);
export default couponModel;