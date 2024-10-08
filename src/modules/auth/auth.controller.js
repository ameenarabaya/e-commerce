import UserModel from "../../../DB/models/user.model.js";
import bcrypt from 'bcrypt'
import Joi from "joi";
import jwt from 'jsonwebtoken';
import xlsx  from "xlsx";
export const signUp = async(req,res)=>{
    let {userName,password,email} = req.body;
    const user = await UserModel.findOne({email})
    if(user) return res.json({message:"email already exist"})
    let hashedPassword =  bcrypt.hashSync(password, parseInt(process.env.SALT));
    req.body.password = hashedPassword;
    password = req.body.password
    let CreateUser = await UserModel.create({userName,email,password});
    return res.status(200).json({CreateUser});
}

export const addUserExcel = async(req,res)=>{
const workBook = xlsx.readFile(req.file.path);
const workSheet = workBook.Sheets[workBook.SheetNames[0]];
let users = xlsx.utils.sheet_to_json(workSheet);
 users.map(async(user)=>{
    user.password = user.password.toString();
    let hashedPassword = await bcrypt.hashSync(user.password, parseInt(process.env.SALT));
    user.password = hashedPassword;
    await UserModel.create(user);
})
return res.json({message:"success"})
}

export const signIn = async(req,res)=>{
    const {email,password} = req.body;
    let user = await UserModel.findOne({email});
    if(!user){
        return res.status(400).json({message:"user not found"})
    }
    let Checkpassword =  await bcrypt.compare(password,user.password);
   if(!Checkpassword) return res.json({message:"invalid data"});
    const token = jwt.sign({id:user._id,role:user.role},process.env.SIGNITURE)
    return res.status(200).json({message:"success",token});
}
