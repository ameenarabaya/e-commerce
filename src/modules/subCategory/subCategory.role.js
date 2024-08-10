import { roles } from "../../middleWare/auth.js"

export const endPoint = {
    create:[roles.Admin,roles.User],
    getActive:[roles.Admin,roles.User],
    update:[roles.Admin,roles.User],
    delete:[roles.Admin],
    active:[roles.User],
}