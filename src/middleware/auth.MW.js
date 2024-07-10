import jwt from "jsonwebtoken";
import { usermodel } from "../../db/models/user.js";


export const auth = () => {

    return async (req, res, next) => {
        try { 
              // destruct token from headers
        const { token } = req.headers;
        // check if token is exists
        if (!token) {
            return res.json({ mg: "login because token is required  " });
        }

        if (!token.startsWith("hana_")) {
            return res.json({ mg: "token is required " });

        }
        const originalToken = token.split("hana_")[1];
        // verify token
        const data = jwt.verify(originalToken,"jobapp");

        // check if token payload has userId
        if (!data?._id) {
            return res.json({ mg: "Invalid token payload" });

            // return next(new ErrorClass("Invalid token payload", 400, "Invalid token payload") );
        }
        // find user by userId
        const isUserExists = await usermodel.findById(data?._id);
        if (!isUserExists) {
            return res.json({ mg: "invalid data" });

            //return next(new ErrorClass("User not found", 404, "User not found"));
        }
        // add the user data in req object
        req.authUser = isUserExists;
        next();
    } catch (error) {
        return res.json({ catcherror: error });
    
       }
    };
   
};
