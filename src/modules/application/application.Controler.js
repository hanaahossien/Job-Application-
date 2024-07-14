import { ApplicationModel } from "../../../db/models/Application.js";
import { asynchandler } from "../../middleware/asynchandler.MW.js";









//1 - Add application 
export const appApplication = asynchandler(async (req, res) => {

    const { jobId, userId, teqSkill, softskill, userResume } = req.body;
    

    const newapp = { jobId, userId, teqSkill, softskill, userResume }
    const app = await ApplicationModel.create(newapp);
    
    res.json({ "dat": "added new application", app ,reslt: req.file

    })
}
);

