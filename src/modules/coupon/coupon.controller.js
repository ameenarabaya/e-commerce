import couponModel from "../../../DB/models/coupon.model.js"

export const create = async(req,res)=>{
    if(await couponModel.findOne({name:req.body.name})){
        return res.status(400).json({message:"Coupon already exists"})
    }

    req.body.expireDate = new Date(req.body.expireDate);
    const coupon = await couponModel.create(req.body);

    return res.json({message:"success" , coupon})
}