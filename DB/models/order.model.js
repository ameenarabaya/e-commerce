import { Schema, Types, model } from "mongoose";

const orderSchema = new Schema({
userId :{
    type:Types.ObjectId,
    ref:'User',
    required:true
},
products:[{
productName:{type:String, required:true},
unitPrice:{type:Number, required:true},
finalPrice:{type:Number, required:true},
productId:{type:Types.ObjectId,ref:'Product'},
quantity:{type:Number, default:1} ,
discount:{type:Number} 
}],
couponId:{
type:Types.ObjectId,
ref:'Coupon',
},
finalPrice:{
    type:Number
},
Address:{
    type:String
},
phoneNumber:{
    type:Number
},
paymentType:{
    type:String,
    enum:['cash','cart'],
    default:'cash'
},
status:{
    type:String,
    enum:['pending','onway','delivered','cancelled'],
    default:'pending'
},
updatedBy:{
    type:Types.ObjectId,
    ref:'User'
},
notes:{
    type:String
},
rejectedReason:{
    types:String,
},
couponName:{
    type:String
}
});

const orderModel = model('Order',orderSchema);
export default orderModel;