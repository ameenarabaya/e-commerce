import { Router } from "express";
import { endPoint } from "./order.role.js";
import * as controller from './order.controller.js';
import { auth } from "../../middleWare/auth.js";
import asyncHandelr from "../../utls/catcherrorfunction.js";

const router = Router();
router.post('/',auth(endPoint.create),asyncHandelr(controller.createOrder));
router.get('/',auth(endPoint.getAllOrders),asyncHandelr(controller.getAllOrders));
router.get('/userOrder',auth(endPoint.getAllOrders),asyncHandelr(controller.getUserOrder));
router.patch('/changeStatus/:id',auth(endPoint.getAllOrders),asyncHandelr(controller.changeStatus));
export default router;