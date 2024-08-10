import { Schema, Types, model } from "mongoose";

const CartSchema = new Schema({
userId:{
    type:Types.ObjectId,
    ref:'User',
    required:true
},
products:[
    {
        productId:{type:Types.ObjectId , ref:'Product' , required:true},
        quantity:{type:Number , default:1}
    }
]
},{timestamps:true});

const cartModel = model('Cart',CartSchema);
export default cartModel;