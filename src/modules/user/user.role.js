import { roles } from "../../middleWare/auth.js";

export const endPoint = {
    getUserDetailes:[roles.Admin],
}