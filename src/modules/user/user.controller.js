import UserModel from "../../../DB/models/user.model.js";
export const getUserDetailes = async(req,res)=>{
    const user = await UserModel.findById(req.user._id);
     res.json(user);
}