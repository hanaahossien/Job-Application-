import { Router } from "express";
import { Addcompaney , deletecompaney, Getompanydata, SearchComByName, updatecompaney } from "./companey.control.js";
import { auz } from "../../middleware/authorize.Mw.js";
import { auth } from "../../middleware/auth.MW.js";
import { validationMw } from "../../middleware/validation.MW.js";
import { addComschema } from "./companey.Validation.js";

export const comRouter = Router()

comRouter.post('/',validationMw(addComschema), auth(), auz(["Company_HR"]), Addcompaney);
comRouter.put('/', validationMw(addComschema),auth(), auz(["Company_HR"]), updatecompaney);
comRouter.delete('/', auth(), auz(["Company_HR"]), deletecompaney);
comRouter.get('/:_id', auth(), auz(["Company_HR"]), Getompanydata);
comRouter.get('/seach/:comName', auth(), auz(["Company_HR","user"]), SearchComByName);


