import jwt from "jsonwebtoken";
import { usermodel } from "../../db/models/user.js";


export const auz = (roles = []) => {

    return async (req, res, next) => {
        const {role} = req.authUser


        if (!roles.includes(role)) {
            return next(new Error("you dont have  permission ", { cause: 400 }))

        }
        next()
    };

};
