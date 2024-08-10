import { roles } from "../../middleWare/auth.js";

export const endPoint = {
    create:[roles.User,roles.Admin],
    getAllOrders:[roles.Admin,roles.User],
}