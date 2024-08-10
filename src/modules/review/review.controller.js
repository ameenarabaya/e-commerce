import orderModel from "../../../DB/models/order.model.js";
import ProductModel from "../../../DB/models/product.model.js";
import reviewModel from "../../../DB/models/review.model.js";
import cloudinary from "../../utls/cloudinary.js";

export const create  = async(req,res)=>{
    const {productId} = req.params;
    if(!await ProductModel.findById(productId)){
   return res.status(404).json({message:"product not found"});
    } 
    const order = await orderModel.find({ userId:req.user._id  , 'products.productId':productId });
   
    if(!order){
     return res.json({message:"you can't make review in this product"});
    }

    const{secure_url,public_id} = await cloudinary.uploader.upload(req.file.path,{
        folder:`${process.env.APP_NAME}/${productId}/reviews`
    }).catch((error)=> console.log(error))
 req.body.image = {secure_url,public_id};
 req.body.userId = req.user._id;
 req.body.productId = productId;
 const review  = await reviewModel.create(req.body);
 return res.json(review)
}