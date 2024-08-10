import { Router } from "express";
import * as productController from './product.controller.js'
import { endPoint } from "../categories/category.role.js";
import uploadFile, { filesExtensions } from "../../utls/fileUpload.js";
import { auth } from "../../middleWare/auth.js";
import reviewRouter from '../review/review.router.js'
import asyncHandelr from "../../utls/catcherrorfunction.js";
import { validation } from "../../middleWare/validation.js";
import * as schema from './product.validation.js'
const router = Router();
router.use('/:productId/review',reviewRouter);
router.post('/',auth(endPoint.create),uploadFile(filesExtensions.image).fields([
    {name:'image' , maxCount:1},
    {name :'subImages' , maxCount:5},
]),asyncHandelr( productController.create));
router.get('/',asyncHandelr(productController.getAllProduct));
router.get('/:id',auth(endPoint.get),asyncHandelr(productController.getproduct));
export default router;