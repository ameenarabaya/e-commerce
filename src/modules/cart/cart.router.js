import { Router } from "express";
import { endPoint } from '../categories/category.role.js'
import * as controller from './cart.controller.js'
import { auth } from "../../middleWare/auth.js";
import asyncHandelr from "../../utls/catcherrorfunction.js";
const router = Router();
router.post('/',auth(endPoint.create),asyncHandelr(controller.create));
router.put('/',auth(endPoint.update),asyncHandelr(controller.remove));
router.put('/',auth(endPoint.update),asyncHandelr(controller.clearCart));
router.put('/:id',auth(endPoint.update),asyncHandelr(controller.changeQuntity));
export default router;