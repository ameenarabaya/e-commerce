import UserModel from "../../DB/models/user.model.js"
import { errorApp } from "../utls/ErrorClass.js";

export const checkEmail = async(req,res,next)=>{
const user = await UserModel.findOne({email:req.body.email});
if(user){
    return next(new errorApp('email is already exist',409));
}
next();
}