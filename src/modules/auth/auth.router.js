import { Router } from "express";
import * as controller from './auth.controller.js';
import { checkEmail } from "../../middleWare/checkEmail.js";
import { validation } from "../../middleWare/validation.js";
import * as authSchema from './auth.validation.js';
const router = Router();
router.post('/',validation(authSchema.signupSchema),checkEmail,controller.signUp);
router.get('/signIn',validation(authSchema.loginInSchema),controller.signIn);
export default router;