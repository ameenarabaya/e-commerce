import { Router } from "express";
import * as controller from './auth.controller.js';
import { checkEmail } from "../../middleWare/checkEmail.js";
import { validation } from "../../middleWare/validation.js";
import * as authSchema from './auth.validation.js';
import asyncHandelr from "../../utls/catcherrorfunction.js";
import uploadFile, { filesExtensions } from "../../utls/fileUpload.js";
const router = Router();
router.post('/',validation(authSchema.signupSchema),checkEmail,asyncHandelr(controller.signUp));
router.post('/Excel',uploadFile(filesExtensions.excel).single('excel'),asyncHandelr(controller.addUserExcel))
router.get('/signIn',validation(authSchema.loginInSchema),asyncHandelr(controller.signIn));
export default router;