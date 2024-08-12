import cartModel from "../../../DB/models/cart.model.js"
import couponModel from "../../../DB/models/coupon.model.js";
import orderModel from "../../../DB/models/order.model.js";
import ProductModel from "../../../DB/models/product.model.js";
import UserModel from "../../../DB/models/user.model.js";
import Stripe from 'stripe';
const stripe = new Stripe(process.env.SECRETKEY);
import createInvoice from "../../utls/pdf.js";
import asyncHandelr from "../../utls/catcherrorfunction.js";
import { errorApp } from "../../utls/ErrorClass.js";

export const createOrder = async(req,res)=>{
    const {couponName} = req.body;

const cart = await cartModel.findOne({userId:req.user._id});

if(!cart || cart.products.length==0){
    return res.status(400).json({message:"cart is empty"})
}
if(couponName){
    const coupon = await couponModel.findOne({name:couponName})
if(coupon.expireDate < new Date()){
    return res.status(400).json({message:"coupon expired"});
}
if(coupon.usedBy.includes(req.user._id)){
    return res.status(409).json({message:"coupon already used"})
}
req.body.coupon = coupon;
}
req.body.products = cart.products;
let finalProductList = [];
let subTotal = 0;
for(let product of req.body.products){
    const checkProduct = await ProductModel.findOne({_id:product.productId,
        stock:{ $gte: product.quantity}});
        if(!checkProduct){
            return res.status(400).json({message:"product out of stock"});
        }
           product = product.toObject();
        product.productName = checkProduct.name;
        product.unitPrice = checkProduct.price;
        product.discount = checkProduct.discount;
        product.finalPrice =(checkProduct.price * product.quantity);
        subTotal += product.finalPrice;
        finalProductList.push(product);
}
 
if(!req.body.address){
    const user  = await UserModel.findOne({_id:req.user._id});
    req.body.Address= user.address;
}
if(! req.body.phoneNumber){
    const user  = await UserModel.findOne({_id:req.user._id});
    req.body.phoneNumber = user.phone;
}
const user  = await UserModel.findOne({_id:req.user._id});
// const session = await stripe.checkout.sessions.create({
// line_items:[{
//     price_data:{
//         currency:'USD',
//         unit_amount:subTotal - ((subTotal * req.body.coupon?.amount ||0 )/100),
//         product_data:{
//             name:user.userName,
//         },
//     },
//     quantity:1
// }],
// mode:'payment',
// success_url: `http://www.facebook.com`,
// cancel_url: `http://www.youtube.com`,
// })
const order = await orderModel.create({
    userId:req.user._id,
    products:finalProductList,
    finalPrice:subTotal - ((subTotal * req.body.coupon?.amount ||0 )/100),
    phoneNumber:req.body.phoneNumber,
    Address : req.body.Address,
    updatedBy:req.user._id
})
if(req.body.coupon){
    await couponModel.findByIdAndUpdate({_id:req.body.coupon._id},{
    $addToSet:{
        usedBy:req.user._id
    }
})
}
  if(order) {
const invoice = {
  shipping: {
    name: user.userName,
    address:order.Address,
    city: "jenin",
    state: "CA",
    country: "palestine",
    postal_code: 94111,
    phone:order.phoneNumber
  },
  items:order.products,
  subtotal: order.finalPrice,
  invoice_nr: order._id
};
 createInvoice(invoice, "invoice.pdf");
let cart =  await cartModel.findOneAndUpdate({userId:req.user._id},{products:[]},{new:true});
return res.json({message:"success",order});
}
return res.json(new errorApp("the order not completed",404));
}

export const getAllOrders = async(req,res)=>{
    const orders = await orderModel.find({$or:[
        {status:"pending"},
        {status:"confirmed"}
    ]})

    return res.json({message:"success",orders})
}

export const getUserOrder = async(req,res)=>{
    const order = await orderModel.find({userId:req.user._id});
    return res.json(order);
}
export const changeStatus = async(req,res)=>{
    const {id}= req.params;
    const {status}= req.body;
    const order = await orderModel.findOneAndUpdate({_id:id},{status},{new:true});
    return res.json(order);
}