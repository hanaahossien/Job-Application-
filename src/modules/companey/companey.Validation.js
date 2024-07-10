import Joi from 'joi';

export const addComschema = {
    body:Joi.object({
        comName:Joi.string().required().min(3).max(40),
        des:Joi.string().min(10).max(200).required(),
        industry:Joi.string().max(30).required(),
        address:Joi.string().required(),
        numOfEmp:Joi.number().min(11).max(20).required(),
        comEmail:Joi.string().email(),
        HR_id:Joi.string().required().length(24).hex()

    })
}


