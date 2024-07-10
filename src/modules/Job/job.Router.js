import { Router } from "express";
import { AddJob, deleteJob, getJobsAndCompany, getJobSpcCompany, getMatchJobs, UpdateJob } from "./Job.Contoler.js";
import { auz } from "../../middleware/authorize.Mw.js";
import { auth } from "../../middleware/auth.MW.js";

export const jobRouter = Router();

jobRouter.post('/',auth(), auz(["Company_HR"]),AddJob);
jobRouter.put('/:jobId',auth(), auz(["Company_HR"]),UpdateJob);
jobRouter.delete('/:jobId',auth(), auz(["Company_HR"]),deleteJob);
jobRouter.get('/',auth(), auz(["Company_HR","user"]),getJobsAndCompany);
jobRouter.get('/:comName',auth(), auz(["Company_HR","user"]),getJobSpcCompany);
jobRouter.get('/filter/all', auth(), auz(["Company_HR","user"]), getMatchJobs);






