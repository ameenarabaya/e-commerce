import { Schema, Types,model } from "mongoose";

const reviewSchema = new Schema({
    content:{
        type:String,
        required:true
    },
    productId:{
        type:Types.ObjectId,
        ref:'Product',
        required:true
    },
    userId:{
        type:Types.ObjectId,
        ref:'User',
        required:true
    },
    image:{
        type:Object,  
    }
})

const reviewModel = model('Review',reviewSchema);
export default reviewModel;