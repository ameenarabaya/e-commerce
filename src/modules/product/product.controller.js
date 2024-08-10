import slugify from "slugify";
import CategoryModel from "../../../DB/models/category.model.js";
import subCategoryModel from "../../../DB/models/subCategory.model.js";
import cloudinary from '../../utls/cloudinary.js';
import ProductModel from "../../../DB/models/product.model.js";
import { pagentation } from "../../utls/pagination.js";

export const create = async(req,res)=>{
   const {name,price,discount,categoryId,subCategoryId} = req.body;
   const category = await CategoryModel.findById(categoryId);
   if(!category) return res.json({message:"category not found"});
   const subcategory = await subCategoryModel.findOne({_id:subCategoryId,categoryId:categoryId});
   if(!subcategory) return res.json({message:"category not found"});

   req.body.slug = slugify(name);
   req.body.finlePrice = price - ((price * (discount || 0)) /100);
   
   let {secure_url,public_id} = await cloudinary.uploader.upload(req.files.image[0].path,
    {folder:`${process.env.APP_NAME}/products/${name}`})
    req.body.image = {secure_url,public_id};

req.body.subImages = [];
for(let file of req.files.subImages){
    let {secure_url,public_id} = await cloudinary.uploader.upload(file.path,
        {folder:`${process.env.APP_NAME}/products/${name}/subImages`})
        req.body.subImages.push({secure_url,public_id});
}
const product = await ProductModel.create(req.body);
return res.json({message:"success",product})
}
export const getproduct = async(req,res)=>{
    const {id} = req.params;

    const product = await ProductModel.findById(id).populate('reviews');
    return res.json(product)
}
export const getAllProduct = async(req,res)=>{

    const {skip,limit } = pagentation(req.query.page,req.query.limit);
    let queryObject  = {...req.query};
    let excludeFields = ['page','limit','sort','fields'];
    excludeFields.map((ele)=>{
        delete queryObject[ele];
    })
    queryObject =JSON.stringify(queryObject);
    queryObject=queryObject.replace(/in|gt|gte|nin|eq|lte|lt/g,match => `$${match}`)
    queryObject = JSON.parse(queryObject);
    const mongoosequery =  ProductModel.find(queryObject).skip(skip).limit(limit);
    if(req.query.search){
        mongoosequery.find({
            $or:[
                {name:{$regex :req.query.search}},
                {description:{$regex :req.query.search}}
            ]
        })
    }
    /*.populate({
    path:'reviews',
    populate:{
         path: 'userId',
        select:'userName -_id'
    }
    }); */
    const count = await ProductModel.estimatedDocumentCount();
    mongoosequery.select(req.query.fields);
    let products = await mongoosequery.sort(req.query.sort);
    products = products.map((product)=>{
        return{
            ...product.toObject(),
            subImages : product.subImages.map((img)=>img.secure_url),
            image:product.image.secure_url
}
    })
    return res.json({message:"success",products,count})
}