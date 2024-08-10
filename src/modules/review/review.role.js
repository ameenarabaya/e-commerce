import { roles } from "../../middleWare/auth.js";
export const endPoint = {
    create:[roles.Admin],
}