import { usermodel } from "../../../db/models/user.js"
import bcrypt from "bcrypt"
import jwt from 'jsonwebtoken'
import { asynchandler } from "../../middleware/asynchandler.MW.js"
import { sendEmail } from "../../services/sendEmail.service.js"

//SignUp 

export const SignUp = asynchandler(async (req, res, next) => {

    const { fN, lN, email, pass, recoveryEmail, DOB, moNum, role, status } = req.body

    const hash = bcrypt.hashSync(pass, +process.env.SALT_ROUNDS)

    const newUser = { fN, lN, email, pass: hash, recoveryEmail, DOB, moNum, role, status }

    const checkEmail = await usermodel.findOne({ email })
    const checkNumber = await usermodel.findOne({ moNum })

    //send email for user 
    await sendEmail(email, "confirm email", "now you have account in jobs APP")

    //check email and phone  uniqe
    if (checkEmail == null && checkNumber == null) {
        const user = await usermodel.create(newUser);
        res.json({ msg: "user added", user: { id: user._id, fN, lN, email } })
    }
    else {
        return next(new Error("you have account", { cause: 400 }))

    }

})


//sigenIn

export const sigenIn = asynchandler(async (req, res, next) => {

    const { email, pass, moNum } = req.body


    const user = await usermodel.findOne({ $or: [{ email }, { moNum }] });

    if (!user) {
        return next(new Error("  Invalid credentials1", { cause: 400 }))
    }
    const isMatch = bcrypt.compareSync(pass, user.pass)

    if (!isMatch) {
        return next(new Error("  Invalid credentials2", { cause: 400 }))
    }

    else {
        await usermodel.findByIdAndUpdate({ _id: user._id }, { status: "online" });

        const token = jwt.sign({ _id: user._id }, process.env.LOGIN_SECRET, { expiresIn: '1d' });

        //update status to online

        return res.json({ "msg ": "login sucssed ", token })

    }
})


// 3. update account can update ( email , mobileNumber , recoveryEmail , DOB , lastName , firstName)
export const updateAccount = asynchandler(async (req, res, next) => {

    const { fN, lN, DOB, recoveryEmail, email, moNum } = req.body
    const newdata = { fN, lN, DOB, recoveryEmail, email, moNum }

    const checkNewEmail = await usermodel.findOne({ email });
    const checkmoNum = await usermodel.findOne({ moNum });


    if (!checkNewEmail && !checkmoNum) {
        const { _id } = req.user;

        const user = await usermodel.findByIdAndUpdate({ _id }, newdata, { new: true });

        return res.json({ msg: "done updated ", user })

    }
    else {
        return next(new Error("  invalid email (this email have another account)", { cause: 400 }))
    }

});


//4 Delete account

export const DeleteAccount = asynchandler(async (req, res, next) => {
    const { _id } = req.authUser;

    const user = await usermodel.findByIdAndDelete({ _id });

    return res.json({ msg: "user deleted " })

});



//5 Get user account data 
export const getUserData = asynchandler(async (req, res, next) => {

    const { _id } = req.authUser;

    const user = await usermodel.findOne({ _id });

    return res.json({ msg: "user data ", user })

})

// 6 Get profile data for another user 
export const GetAnotherProfile = asynchandler(async (req, res, next) => {
    const anotherUserId = req.params._id;


    const user = await usermodel.find({ _id: anotherUserId }).select({ "_id": 0, "pass": 0 });

    return res.json({ msg: " data for another user ", user: user })

})

//7- Update password 
export const UpdatePas = asynchandler(async (req, res, next) => {

    const { pass } = req.body;

    const hash = bcrypt.hashSync(pass, 8);

    const { _id } = req.authUser;

    const user = await usermodel.findOneAndUpdate({ _id }, { pass: hash }, { new: true }).select({ 'pass': 0 });

    return res.json({ msg: "password updated ", user: user })
})


//8 Forget password (make sure of your data security specially the OTP and the newPassword )

export const ForgetPass = asynchandler(async (req, res, next) => {

    const { email } = req.body

    //CHECK USER HAVE ACCOUNT IN MY DB
    const user = await usermodel.findOne({ email });

    if (!user) {
        return next(new Error(" YOU DONT HAVE AN ACCOUNT", { cause: 400 }))
    }

    else {
        //send email with otp to user 
        const otp = Math.floor(100000 + Math.random() * 900000);
        sendEmail(email, 'update password', `opt : ${otp}`)

        //update password with otp
        const user = await usermodel.findOneAndUpdate({ email }, { pass: otp }, { new: true }).select({ 'pass': 0 });

        return res.json({ "msg ": "send otp to your email login with it and update your password " })

    }
})

// 9 Get all accounts associated to a specific recovery Email 
export const accountRecoveryEmail = asynchandler(async (req, res, next) => {

    const { recoveryEmail } = req.params;

    const user = await usermodel.find({ recoveryEmail }).select({ 'pass': 0 });

    if (user == null) {
        next(new Error("no account with this recoveryEmail", { cause: 400 }))
    }
    else {
        return res.json({ msg: " all account ", user })

    }
}
)