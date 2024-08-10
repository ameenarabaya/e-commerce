import { Router } from "express";
import * as controller from './user.controller.js';
import { auth } from "../../middleWare/auth.js";
import { endPoint } from "./user.role.js";
import asyncHandelr from "../../utls/catcherrorfunction.js";
const router = Router();
router.get('/',auth(endPoint.getUserDetailes),asyncHandelr( controller.getUserDetailes));
export default router;