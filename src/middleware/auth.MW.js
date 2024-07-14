import jwt  from "jsonwebtoken";
import { usermodel } from "../../db/models/user.js";


export const auth = ()=>{
    return async(req,res,next)=>{
 try {
         
    const {token } = req.headers;

    if(!token)
    {
        res.json("  no token please sigen in")
    }
    
    if(!token.startsWith('hana_'))
    {
        res.json("  invalid token ")
    }
    
    const originaltoken = token.split('hana_')[1];
    const data =  jwt.verify(originaltoken,process.env.LOGIN_SECRET);
    if(!data?._id)
    {
        res.json("  invalid token ")
    
    }
    const user = await usermodel.findById({_id:data._id})
    if(!user)
        {
            res.json("  this user not found ")
        
        }
    req.user= user
   next()
    

 } catch (error) {
    res.json(error.message)
 
 }

        
    }


}


























// import jwt from "jsonwebtoken";
// import { usermodel } from "../../db/models/user.js";


// export const auth = () => {

//     return async (req, res, next) => {
//         try { 
//               // destruct token from headers
//         const { token } = req.headers;
//         // check if token is exists
//         if (!token) {
//             return res.json({ mg: "login because token is required  " });
//         }

//         if (!token.startsWith("hana_")) {
//             return res.json({ mg: "token is required " });

//         }
//         const originalToken = token.split("hana_")[1];
//         // verify token
//         const data = jwt.verify(originalToken,"jobapp");

//         // check if token payload has userId
//         if (!data?._id) {
//             return res.json({ mg: "Invalid token payload" });

//             // return next(new ErrorClass("Invalid token payload", 400, "Invalid token payload") );
//         }
//         // find user by userId
//         const isUserExists = await usermodel.findById(data?._id);
//         if (!isUserExists) {
//             return res.json({ mg: "invalid data" });

//             //return next(new ErrorClass("User not found", 404, "User not found"));
//         }
//         // add the user data in req object
//         req.authUser = isUserExists;
//         next();
//     } catch (error) {
//         return res.json({ catcherror: error });
    
//        }
//     };
   
// };
