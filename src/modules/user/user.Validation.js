import Joi from 'joi';

export const userschema = {
    body:Joi.object({
        fN:Joi.string().required().min(3).max(20),
        lN:Joi.string().required().min(3).max(20),
        email:Joi.string().required().email(),
        pass:Joi.string().required().min(3).max(10),// .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
        recoveryEmail:Joi.string().email(),         
        DOB:Joi.date(), 
        moNum:Joi.string().pattern(new RegExp('^01[0125][0-9]{8}$')).messages({'msg': `add a valid Phone number .`}),
        role:Joi.string().valid('user', 'Company_HR'),
        status:Joi.string().valid('online', 'offline')
    
    
    })
}

export const updateschema = {
    body:Joi.object({
        fN:Joi.string().min(3).max(20),
        lN:Joi.string().min(3).max(20),
        email:Joi.string().email(),
        pass:Joi.string().min(3).max(10),// .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
        recoveryEmail:Joi.string().email(),         
        DOB:Joi.date(), 
        moNum:Joi.string().pattern(new RegExp('^01[0125][0-9]{8}$')).messages({'msg': `add a valid Phone number .`}),
        role:Joi.string().valid('user', 'Company_HR'),
        status:Joi.string().valid('online', 'offline')
    
    })
}
export const sigenInSchema ={
    body:Joi.object({
        moNum:Joi.string().pattern(new RegExp('^01[0125][0-9]{8}$')).messages({'msg': `add a valid Phone number .`}),
        email:Joi.string().email(),
        pass:Joi.string().required().min(3).max(10),
    }).min(2).message('must add email or mobile number ')
}


export const passschema = {
    body:Joi.object({
        pass:Joi.string().required().min(3).max(10)
    })
}


export const recEmailSchema = {
    params:Joi.object({
        recoveryEmail:Joi.string().email(),         
    })
}