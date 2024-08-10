import jwt from 'jsonwebtoken'
import UserModel from '../../DB/models/user.model.js';
import { errorApp } from '../utls/ErrorClass.js';

export const roles = {
User:'User',
Admin:'Admin'
}

export  const auth = (accessRole = [])=>{
    return async(req,res,next)=>{
const {authorization} = req.headers;
if(!authorization.startsWith(process.env.BERARTOKEN)){
    return next(new errorApp('invalid token',403));
}
const token = authorization.split(process.env.BERARTOKEN)[1];
 let decoded = jwt.verify(token,process.env.SIGNITURE);
 let user = await UserModel.findById(decoded.id).select("userName role");
 if(!accessRole.includes(user.role)){
    return next(new errorApp('not auth user',403));
 }
 req.user = user;
     next();
    }
}