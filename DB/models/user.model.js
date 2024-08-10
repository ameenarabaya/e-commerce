import { Schema, model } from "mongoose";

const UserSchema = new Schema({
    userName:{
        type: String,
        require:true,
    },
    email:{
        type:String,
        require:true,
        unique:true
    },
    password:{
        type:String,
        require:true
    },
    confirmPassword:{
        type:Boolean,
        default:false
    },
    address:{
        type:String
    },
    image:{
        type:Object
    },
    phone:{
        type:String
    },
    gender:{
        type:String,
        enum:["Male","Female"]
    },
    status:{
        type:String,
        enum:['Active','NotActive'],
        default:'Active'
    },
    role:{
        type:String,
        enum:['User','Admin'],
        default:'User'
    },
    sendcode:{
        type:String,
        default:null
    }
},{timestamps:true})

const UserModel = model( 'User', UserSchema);
export default UserModel;
