import { Schema, Types, model } from "mongoose";

const CategorySchema = new Schema({
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
        default:'Active'
    },
},{timestamps:true
    ,toJSON:{virtuals:true},
    toObject:{virtuals:true}
})
CategorySchema.virtual("subcategory",{
    localField:"_id",
    foreignField:"categoryId",
    ref:"subCategory"
})
const CategoryModel = model( 'Category', CategorySchema);
export default CategoryModel;
