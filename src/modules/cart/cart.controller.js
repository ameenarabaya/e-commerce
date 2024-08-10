import cartModel from "../../../DB/models/cart.model.js";

export const create = async(req,res)=>{
const {productId} = req.body;
const cart = await cartModel.findOne({userId:req.user._id});
if(!cart){
    const newCart = await cartModel.create({userId:req.user._id ,
    products:[{ productId: productId}]
    })
    return res.json({message:"success",newCart})
}
for(let i=0; i<cart.products.length;i++)
    if(cart.products[i].productId == productId)
        return res.json({message:"product already exist"})

const Cart = await cartModel.findOneAndUpdate({userId:req.user._id},{$push:{products:{productId}}},{new:true})
return res.json({message:"success",Cart})
}
export const remove = async(req,res)=>{
   const {productId} = req.body;
   await cartModel.findOneAndUpdate({userId:req.user._id},{$pull:{products:{productId:productId}}});
   return res.json({message:"removed product success"})
    }

export const clearCart = async(req,res)=>{
        await cartModel.findOneAndUpdate({userId:req.user._id},{products:[]},{new:true});
        return res.json({message:"clear cart success"})
         }
         
export const changeQuntity = async(req,res)=>{
const {quantity,operator} = req.body;
const {id} = req.params;
let inc = (operator == "+") ?quantity : -quantity;
// return res.json(inc)
const cart = await cartModel.findOneAndUpdate({userId:req.user._id ,"products.productId":id},{$inc:{
    "products.$.quantity" :inc
}},{new:true})

return res.json({message:"success",cart})
}
    
