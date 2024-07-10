import { ApplicationModel } from "../../../db/models/Application.js";
import { comModel } from "../../../db/models/companey.js";
import { jobModel } from "../../../db/models/Job.js";
import { asynchandler } from "../../middleware/asynchandler.MW.js";

//1 - Add company 
export const Addcompaney = asynchandler(

    async (req, res, next) => {
        const { comName, des, industry, address, numOfEmp, comEmail, HR_id } = req.body;

        const checkname = await comModel.findOne({ comName });
        if (checkname) {
            return next(new Error(" this companey name already found in website", { cause: 400 }))

        }

        const newCom = { comName, des, industry, address, numOfEmp, comEmail, HR_id }
        const com = await comModel.create(newCom);
        res.json({ "dat": "added new companey", companey: com._id })
    }
);




//2 - Update company data
export const updatecompaney = asynchandler(async (req, res, next) => {

    const { comName, des, industry, address, numOfEmp, comEmail, HR_id } = req.body;

    const newdata = { comName, des, industry, address, numOfEmp, comEmail, HR_id }

    const { _id } = req.authUser;

    const companey = await comModel.findOneAndUpdate({ HR_id: _id }, newdata)
    return res.json({ msg: " done ", companey })

})

// 3 - Delete company data

export const deletecompaney = asynchandler(async (req, res, next) => {

    const { _id } = req.authUser;

    await comModel.findOneAndDelete({ HR_id: _id })
    return res.json({ msg: " deleted  " })

})


// 4-Get company data 

export const Getompanydata = asynchandler(async (req, res, next) => {

    const { _id } = req.params;

    const company = await comModel.findById({ _id });
    //check this company found
    if (!company) {
        return next(new Error(" this id not found for companey", { cause: 400 }))
    }
    const jobs = await jobModel.find({ addedBy: _id });
    const compAndJobs = { company, jobs }



    return res.json({ msg: " all data  ", compAndJobs })

})

// 5- Search for a company with a name. 

export const SearchComByName = asynchandler(async (req, res, next) => {

    const { comName } = req.params;

    const company = await comModel.find({ comName: { $regex: comName } });

    //check  found any search result
    if (company.length == 0) {
        return next(new Error(" No search result", { cause: 400 }))
    }
    return res.json({ msg: "  Search result ", company })

})



//6- Get all applications for specific Job
export const getAllApplications = asynchandler(async (req, res, next) => {
    
    const { _id } = req.authUser;

    const company = await ApplicationModel.find({ jobId: _id });

    //check  found any search result
    if (company.length == 0) {
        return next(new Error(" No search result", { cause: 400 }))
    }
    return res.json({ msg: "  Search result ", company })

})
