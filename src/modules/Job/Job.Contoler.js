
import { comModel } from "../../../db/models/companey.js";
import { jobModel } from "../../../db/models/Job.js";
import { asynchandler } from "../../middleware/asynchandler.MW.js";


//1 - Add Job 
export const AddJob = asynchandler(
    async (req, res, next) => {

        //const { jobId, userId, teqSkill, softskill, userResume } = req.body;

        const { JobT, jobLoc, workingTime, Level, jobDes, teqSkill, softskill, addedBy } = req.body;

        const newjob = { JobT, jobLoc, workingTime, Level, jobDes, teqSkill, softskill, addedBy };

        const data = await jobModel.create(newjob);

        res.json({ "msg": "added new job", data })
    }
);


//2 -Update Job

export const UpdateJob = asynchandler(
    async (req, res, next) => {

        const { JobT, jobLoc, workingTime, Level, jobDes, teqSkill, softskill, addedBy } = req.body;

        const updatedata = { JobT, jobLoc, workingTime, Level, jobDes, teqSkill, softskill, addedBy };
        const jobId = req.params.jobId
        //  const iduser = req.authUser._id;

        const data = await jobModel.findOneAndUpdate({ _id: jobId }, updatedata, { new: true });

        //check job found in db
        if (!data) {
            return next(new Error("this job id not found", { cause: 400 }))
        }
        res.json({ "msg": "updated sucssed ", data })
    }
);


//3 -delete Job

export const deleteJob = asynchandler(
    async (req, res, next) => {

        const jobId = req.params.jobId
        // const iduser = req.authUser._id;

        const data = await jobModel.findOneAndDelete({ _id: jobId });

        if (!data) {
            return next(new Error("this job id not found", { cause: 400 }))
        }
        res.json({ "msg": "deleted sucssed" })
    }
);

// 4- Get all Jobs with their company’s information.

export const getJobsAndCompany = asynchandler(
    async (req, res, next) => {

        const iduser = req.authUser._id;

        const data = await jobModel.find().populate('addedBy');

        if (!data) {
            return next(new Error("no jobs data", { cause: 400 }))
        }
        res.json({ "msg": "All Jobs", data })
    }
);




// 5- Get all Jobs for a specific company.

export const getJobSpcCompany = asynchandler(
    async (req, res, next) => {

        const { comName } = req.params;

        //get hr id from cpmpany model
        const company = await comModel.find({ comName });
        const id = company[0]._id
        if (company.length == 0) {
            return next(new Error("no jobs for this company", { cause: 400 }))
        }

        const data = await jobModel.find({ addedBy: id });



        res.json({ "msg": "All Jobs for this company", data, id })
    }
);





//6 -Get all Jobs that match the following filters 


export const getMatchJobs = asynchandler(async (req, res, next) => {

    const { workingTime } = req.query;
    const { Level } = req.query;
    const { jobLoc } = req.query;
    const { JobT } = req.query;

    const jobs = await jobModel.find({ $or: [{ workingTime }, { Level }, { jobLoc }, { JobT }] });

    //check  found any search result
    if (jobs.length == 0) {
        return next(new Error(" No search result", { cause: 400 }))
    }
    return res.json({ msg: "  Search result ", jobs })

})
