import slugify from 'slugify'
import cloudinary from '../../utls/cloudinary.js';
import subCategoryModel from '../../../DB/models/subCategory.model.js';
import CategoryModel from '../../../DB/models/category.model.js';

export const create = async(req,res)=>{
    try{
        const category = await CategoryModel.findById(req.body.categoryId);
if(!category) 
    return res.status(404).json({message:"category not found"})
 if(await CategoryModel.findOne({name:req.body.name})) 
     return res.satuts(409).json({message:"category name is used"})

req.body.name = req.body.name.toLowerCase();
req.body.slug = slugify(req.body.name);
let {secure_url,public_id} = await cloudinary.uploader.upload(req.file.path,{folder:`${process.env.APP_NAME}/subCategories`}).catch((err)=> console.log(err));
 req.body.image = {secure_url,public_id};
 req.body.createdBy = req.user._id;
 req.body.updatedBy = req.user._id;
 let subcategory = await subCategoryModel.create(req.body);
 return res.json({message:"success",subcategory});
    } catch(err){
        return res.json(err.stack)
    }
}
export const getAll = async(req,res)=>{
  const {id} = req.params;
    const subCategories = await subCategoryModel.find({categoryId:id});
    return res.json({subCategories});
}
export const getActive = async(req,res)=>{
    const subcategories = await subCategoryModel.find({status:'Active'});
    return res.json({subcategories});
}
export const getDetails = async(req,res)=>{
    const {Id} = req.params;
    const category = await subCategoryModel.findById(Id);
    if(!category) return res.json({message:"category not found"})
    return res.json({category});
}
export const update = async(req,res)=>{
    const {id} = req.params;
    try{
        const category = await subCategoryModel.findById(id);
if(!category) 
    return res.status(404).json({message:"category not found"})
category.name = req.body.name.toLowerCase();
if(!await CategoryModel.findOne({name:req.body.name})) 
category.slug = slugify(req.body.name.toLowerCase());

if(req.file){
let {secure_url,public_id} = await cloudinary.uploader.upload(req.file.path,{folder:`${process.env.APP_NAME}/subCategories`}).catch((err)=> console.log(err));
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
          const deletedCategory = await subCategoryModel.findByIdAndDelete(id);
          return res.json({message:"success"});
    }