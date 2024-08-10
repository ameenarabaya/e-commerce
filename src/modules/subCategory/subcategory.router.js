import { Router } from "express";
import * as subController from './subcategory.controller.js';
import { auth } from "../../middleWare/auth.js";
import uploadFile, { filesExtensions } from "../../utls/fileUpload.js";
import asyncHandelr from "../../utls/catcherrorfunction.js";
import { endPoint } from "./subCategory.role.js";
const router = Router({mergeParams:true});

router.post('/',auth(endPoint.create),uploadFile(filesExtensions.image).single('image'),asyncHandelr(subController.create));
router.get('/', asyncHandelr(subController.getAll));
router.get('/getActive',auth(endPoint.getActive),asyncHandelr(subController.getActive));
router.get('/:Id',auth(endPoint.getActive),asyncHandelr(subController.getDetails));
router.patch('/:id',auth(endPoint.create),uploadFile(filesExtensions.image).single('image'),asyncHandelr(subController.update));
router.delete('/:id',auth(endPoint.create),asyncHandelr(subController.destroy));
export default router;