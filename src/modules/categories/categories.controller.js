import slugify from 'slugify'
import cloudinary from '../../utls/cloudinary.js';
import CategoryModel from '../../../DB/models/category.model.js';

export const createCategory = async(req,res)=>{
    try{
req.body.name = req.body.name.toLowerCase();
req.body.slug = slugify(req.body.name);
let {secure_url,public_id} = await cloudinary.uploader.upload(req.file.path,{folder:`${process.env.APP_NAME}/categories`}).catch((err)=> console.log(err));
 req.body.image = {secure_url,public_id};
 let category = await CategoryModel.create(req.body);
 return res.json({message:"success",category});
    } catch(err){
        return res.json(err.stack)
    }
}
export const getAll = async(req,res)=>{
    const categories = await CategoryModel.find({}).populate('subcategory');
    return res.json({categories});
}
export const getActive = async(req,res)=>{
    const categories = await CategoryModel.find({status:'Active'});
    return res.json({categories});
}
export const update = async(req,res)=>{
    const {id} = req.params;
    try{
        const category = await CategoryModel.findById(id);
if(!category) 
    return res.status(404).json({message:"category not found"})
category.name = req.body.name.toLowerCase();
if(!await CategoryModel.findOne({name:req.body.name})) 
category.slug = slugify(req.body.name.toLowerCase());

if(req.file){
let {secure_url,public_id} = await cloudinary.uploader.upload(req.file.path,{folder:`${process.env.APP_NAME}/categories`}).catch((err)=> console.log(err));
category.image  = {secure_url,public_id};
}
 category.updatedBy = req.user._id;
category.save();
 return res.json({message:"success",category});
    } catch(err){
        return res.json(err.stack)
    }
}

export const destroy = async(req,res)=>{
    const {id} = req.params;
    const category = await subCategoryModel.findById(id);
    if(!category)
         return res.json({message:"category not found"})

         await cloudinary.uploader.destroy(category.image.public_id) ;
          const deletedCategory = await CategoryModel.findByIdAndDelete(id);
          return res.json({message:"success"});
    }