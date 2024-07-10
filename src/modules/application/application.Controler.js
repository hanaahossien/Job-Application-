import { ApplicationModel } from "../../../db/models/Application";









//1 - Add application 
export const appApplication = asynchandler(async (req, res, next) => {

    const { jobId, userId, teqSkill, softskill, userResume } = req.body;


    const newapp = { jobId, userId, teqSkill, softskill, userResume }
    const app = await comModel.create(newapp);
    res.json({ "dat": "added new application", app })
}
);

