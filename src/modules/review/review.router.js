import { Router } from "express";
import * as controller from './review.controller.js';
import { auth } from "../../middleWare/auth.js";
import { endPoint } from "./review.role.js";
import uploadFile, { filesExtensions } from "../../utls/fileUpload.js";
import asyncHandelr from "../../utls/catcherrorfunction.js";
const router = Router({mergeParams:true});
router.post('/',auth(endPoint.create),uploadFile(filesExtensions.image).single('image'),asyncHandelr( controller.create));
export default router;