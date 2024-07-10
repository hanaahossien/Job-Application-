import { Router } from "express";
import { accountRecoveryEmail, DeleteAccount, ForgetPass, GetAnotherProfile, getUserData, sigenIn, SignUp, updateAccount, UpdatePas } from "./user.controler.js";
import { passschema, recEmailSchema, sigenInSchema, updateschema, userschema } from "./user.Validation.js";
import { validationMw } from "../../middleware/validation.MW.js";
import { auth } from "../../middleware/auth.MW.js";

export const userRouter = Router()
userRouter.delete('/account/:recoveryEmail',auth(),validationMw(recEmailSchema),accountRecoveryEmail)
userRouter.post('/',validationMw(userschema),SignUp);
userRouter.get('/login',validationMw(sigenInSchema),sigenIn);
userRouter.put('/',auth(),validationMw(passschema),UpdatePas) //v
userRouter.get('/getUserData',auth(),getUserData)
userRouter.delete('/DeleteAccount',auth(),DeleteAccount)
userRouter.patch('/updateAccount',auth(),validationMw(updateschema),updateAccount) //v
userRouter.get('/GetAnotherProfile/:_id',auth(),GetAnotherProfile)
userRouter.post('/forgetpass',ForgetPass) 




