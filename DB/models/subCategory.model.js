import { Schema, Types, model } from "mongoose";

const subCategorySchema = new Schema({
    name:{
        type: String,
        require:true,
    },
    slug:{
        type:String,
        require:true,
    },
    image:{
        type:Object
    },
    updatedBy:{
        type:Types.ObjectId,
        ref:'User'
    },
    createdBy:{
        type:Types.ObjectId,
        ref:'User'
    },
    status:{
        type:String,
        enum:['Active','NotActive'],
        default:'Active',
    },
    categoryId:
    {
        type:Types.ObjectId,
         ref:'Category',
         required:true
     }
},{timestamps:true})

const subCategoryModel = model( 'subCategory', subCategorySchema);
export default subCategoryModel;
