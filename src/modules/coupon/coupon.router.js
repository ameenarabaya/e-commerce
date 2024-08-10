import { Router } from "express";
const router = Router();
import * as controller from './coupon.controller.js';
import asyncHandelr from "../../utls/catcherrorfunction.js";
router.post('/',asyncHandelr(controller.create));
export default router;